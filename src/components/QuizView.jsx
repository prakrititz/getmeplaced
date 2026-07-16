import React, { useState } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export function QuizView({ questions, moduleTitle, user, starredCards }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  if (!questions || questions.length === 0) return <div className="text-center p-10 text-tertiary">No quiz questions for this module yet.</div>;

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelectedOpt(idx);
    setShowResult(true);
    if (idx === questions[currentQ].answer) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOpt(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="bg-surface rounded-2xl p-10 shadow-sm border border-subtle text-center animate-in fade-in duration-500 max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckSquare size={40} />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">Quiz Complete!</h2>
        <p className="text-tertiary mb-8 text-lg">You scored {score} out of {questions.length}</p>
        
        <div className="w-full bg-surface-muted rounded-full h-4 mb-8 overflow-hidden">
          <div 
            className="bg-indigo-500 h-4 rounded-full transition-all duration-1000" 
            style={{ width: (score / questions.length) * 100 + '%' }}
          ></div>
        </div>

        <button onClick={restartQuiz} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors">
          Retake Quiz
        </button>
      </div>
    );
  }

  const q = questions[currentQ];
  const currentCardId = btoa(unescape(encodeURIComponent(q.question))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 30);
  const isCurrentlyStarred = user && starredCards.some(sc => sc.id === currentCardId);

  const handleStar = async (e) => {
    e.stopPropagation();
    if (!user) {
      alert("Please login to star questions.");
      return;
    }
    const docRef = doc(db, `users/${user.uid}/starredCards`, currentCardId);
    if (isCurrentlyStarred) {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { ...q, type: 'quiz', moduleTitle: moduleTitle || 'Revision' });
    }
  };

  return (
    <div className="bg-surface rounded-2xl p-8 shadow-sm border border-subtle max-w-2xl mx-auto text-left animate-in fade-in slide-in-from-bottom-4 duration-500 relative group">
      <button 
        onClick={handleStar}
        className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 ${isCurrentlyStarred ? 'opacity-100 text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 hover:bg-yellow-200 dark:hover:bg-yellow-900/50' : 'text-secondary bg-surface-muted hover:bg-subtle'}`}
        title={isCurrentlyStarred ? "Unstar Question" : "Star Question"}
      >
        <Star size={20} fill={isCurrentlyStarred ? "currentColor" : "none"} />
      </button>

      <div className="flex justify-between items-center mb-8">
        <span className="text-sm font-bold text-tertiary tracking-wider uppercase">Question {currentQ + 1} of {questions.length}</span>
        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-full">Score: {score}</span>
      </div>

      <h2 className="text-xl font-bold text-primary mb-6">{q.question}</h2>

      <div className="space-y-3">
        {q.options.map((opt, idx) => {
          let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
          if (!showResult) btnClass += "border-strong hover:border-indigo-500 hover:bg-surface-muted text-secondary";
          else {
            if (idx === q.answer) btnClass += "border-emerald-500 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
            else if (idx === selectedOpt) btnClass += "border-red-500 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
            else btnClass += "border-subtle bg-surface-muted/50 text-tertiary opacity-50";
          }
          return (
            <button key={idx} onClick={() => handleSelect(idx)} disabled={showResult} className={btnClass}>
              <span className="font-medium mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-8 flex justify-end animate-in fade-in">
          <button onClick={nextQuestion} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition-colors flex items-center gap-2">
            {currentQ < questions.length - 1 ? 'Next Question' : 'View Results'} <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}

