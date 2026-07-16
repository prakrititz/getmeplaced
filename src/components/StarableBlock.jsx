import React from 'react';
import { Star } from 'lucide-react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function StarableBlock({ children, moduleTitle, user, starredCards, blockId }) {
  const containerRef = React.useRef(null);
  const isCurrentlyStarred = user && starredCards.some(sc => sc.id === blockId);

  const handleStar = async (e) => {
    e.stopPropagation();
    if (!user) return alert("Please login to star notes.");
    const docRef = doc(db, `users/${user.uid}/starredCards`, blockId);
    if (isCurrentlyStarred) {
      await deleteDoc(docRef);
    } else {
      const clone = containerRef.current.cloneNode(true);
      const btn = clone.querySelector('.star-btn');
      if (btn) btn.remove();
      
      await setDoc(docRef, { 
        type: 'note', 
        html: clone.innerHTML, 
        moduleTitle: moduleTitle || 'Revision' 
      });
    }
  };

  return (
    <div className="relative group w-full" ref={containerRef}>
      <button 
        onClick={handleStar}
        className={`star-btn absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${isCurrentlyStarred ? 'opacity-100 text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' : 'text-secondary bg-surface-muted hover:bg-subtle'}`}
        title={isCurrentlyStarred ? "Unstar Note" : "Star Note"}
      >
        <Star size={16} fill={isCurrentlyStarred ? "currentColor" : "none"} />
      </button>
      {children}
    </div>
  );
}

