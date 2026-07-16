import React, { useState, useEffect } from 'react';
import { RotateCcw, ChevronRight, Star } from 'lucide-react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function FlashcardsView({ cards, moduleTitle, user, starredCards }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset when module changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [cards]);

  if (!cards || cards.length === 0) return <div className="text-center p-10 text-tertiary">No flashcards for this module yet.</div>;

  const currentCard = cards[currentIndex];
  // Simple deterministic ID generation based on the card front text
  const currentCardId = btoa(unescape(encodeURIComponent(currentCard.front))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 30);
  const isCurrentlyStarred = user && starredCards.some(sc => sc.id === currentCardId);

  const handleStar = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to star cards.");
      return;
    }
    const docRef = doc(db, `users/${user.uid}/starredCards`, currentCardId);
    if (isCurrentlyStarred) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { ...currentCard, type: 'flashcard', moduleTitle: moduleTitle || 'Revision' });
    }
  };

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev + 1) % cards.length), 150);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length), 150);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-tertiary mb-4 font-medium">Card {currentIndex + 1} of {cards.length}</div>
      
      <div 
        className="relative w-full max-w-lg h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <button 
          onClick={handleStar}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-colors ${isCurrentlyStarred ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' : 'text-secondary bg-surface-muted hover:bg-subtle'}`}
          title={isCurrentlyStarred ? "Unstar Card" : "Star Card"}
        >
          <Star size={20} fill={isCurrentlyStarred ? "currentColor" : "none"} />
        </button>
        <div className={`w-full h-full transition-transform duration-500 transform-style-3d relative ${isFlipped ? 'rotate-y-180' : ''}`}>
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-surface-muted border-2 border-strong rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg group-hover:border-indigo-500/50 transition-colors">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase mb-4">Question</p>
            <h3 className="text-2xl font-semibold text-primary">{cards[currentIndex].front}</h3>
            <p className="text-tertiary mt-8 text-sm flex items-center gap-1"><RotateCcw size={14}/> Click to flip</p>
          </div>
          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-indigo-700 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg rotate-y-180">
            <p className="text-sm text-indigo-600 dark:text-indigo-300 font-bold tracking-widest uppercase mb-4">Answer</p>
            <p className="text-xl font-medium text-white whitespace-pre-line leading-relaxed">{cards[currentIndex].back}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button onClick={prevCard} className="px-6 py-3 bg-surface-muted border border-strong rounded-xl text-secondary font-medium hover:bg-surface-muted transition-colors">
          Previous
        </button>
        <button onClick={nextCard} className="px-6 py-3 bg-indigo-600 rounded-xl text-white font-medium hover:bg-indigo-500 transition-colors">
          Next Card
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}

