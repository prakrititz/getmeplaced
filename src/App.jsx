import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Layers, CheckSquare, AppWindow, FolderOpen, Sun, Moon, Menu, X, LogIn, LogOut, Square } from 'lucide-react';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc } from 'firebase/firestore';

// Data
import { courseModules } from './data/courseModules';
import { osModules } from './data/osModules';
import { dbmsModules } from './data/dbmsModules';
import { oopsModules } from './data/oopsModules';

// Components
import { NotesView } from './components/NotesView';
import { FlashcardsView } from './components/FlashcardsView';
import { QuizView } from './components/QuizView';

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeGroup, setActiveGroup] = useState('OS');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starredCards, setStarredCards] = useState([]);
  const [completedModules, setCompletedModules] = useState(new Set());

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        // Listen to starred cards
        const qCards = query(collection(db, `users/${currentUser.uid}/starredCards`));
        const unsubCards = onSnapshot(qCards, (querySnapshot) => {
          const cards = [];
          querySnapshot.forEach((docSnap) => {
            cards.push({ id: docSnap.id, ...docSnap.data() });
          });
          setStarredCards(cards);
        });

        // Listen to completed modules
        const qProgress = query(collection(db, `users/${currentUser.uid}/completedModules`));
        const unsubProgress = onSnapshot(qProgress, (querySnapshot) => {
          const completed = new Set();
          querySnapshot.forEach((docSnap) => {
            completed.add(docSnap.id);
          });
          setCompletedModules(completed);
        });

        return () => {
          unsubCards();
          unsubProgress();
        };
      } else {
        setStarredCards([]);
        setCompletedModules(new Set());
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleToggleComplete = useCallback(async (moduleId) => {
    if (!user) return;
    const ref = doc(db, `users/${user.uid}/completedModules`, moduleId);
    try {
      if (completedModules.has(moduleId)) {
        await deleteDoc(ref);
      } else {
        await setDoc(ref, { completedAt: new Date().toISOString() });
      }
    } catch (err) {
      console.error('Failed to toggle module complete:', err);
    }
  }, [user, completedModules]);
  
  const courseGroups = {
    'OS': osModules,
    'DBMS': dbmsModules,
    'OOPS': oopsModules,
    'Revision': [{ id: 'revision', title: 'Starred Flashcards', flashcards: starredCards }]
  };
  
  const activeGroupModules = courseGroups[activeGroup];
  
  const [activeModuleId, setActiveModuleId] = useState(courseGroups['OS'][0].id);
  const [activeTab, setActiveTab] = useState('notes');

  useEffect(() => {
    if (!activeGroupModules.find(m => m.id === activeModuleId)) {
      setActiveModuleId(activeGroupModules[0].id);
      setActiveTab('notes');
    }
  }, [activeGroup, activeGroupModules, activeModuleId]);

  // Apply theme to document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const activeModule = courseModules.find(m => m.id === activeModuleId) || activeGroupModules[0];

  // Progress stats for active group
  const groupModuleIds = activeGroupModules.map(m => m.id).filter(id => id !== 'revision');
  const groupCompleted = groupModuleIds.filter(id => completedModules.has(id)).length;
  const groupTotal = groupModuleIds.length;

  if (loading) {
    return (
      <div className="flex h-screen bg-background items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen bg-background items-center justify-center relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        
        <div className="bg-surface border border-subtle p-12 rounded-3xl shadow-xl max-w-md w-full text-center z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AppWindow className="text-indigo-600 dark:text-indigo-400" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-3">GetMePlaced</h1>
          <p className="text-secondary mb-8 leading-relaxed">Your ultimate structured prep guide. Sign in to access your notes, flashcards, and quizzes.</p>
          
          <button 
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-indigo-500/20"
          >
            <LogIn size={20} />
            Continue with Google
          </button>
        </div>
        
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-6 right-6 p-3 rounded-full bg-surface-muted hover:bg-subtle text-tertiary hover:text-primary transition-colors border border-subtle z-20"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-primary font-sans overflow-hidden">
      
      {/* Sidebar (Left Pane) - Desktop */}
      <aside className={`w-72 md:w-80 flex-shrink-0 bg-surface border-r border-subtle flex flex-col h-full z-20 absolute md:static transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        
        {/* Sidebar Header */}
        <div className="p-5 border-b border-subtle">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
              <BookOpen className="text-indigo-500" />
              Prep Guide
            </h1>
            <div className="flex gap-2 items-center">
              {/* Auth Button */}
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:hover:bg-rose-900/50 transition-colors border border-rose-200 dark:border-rose-900"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              ) : (
                <button 
                  onClick={handleLogin}
                  className="p-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-colors border border-indigo-200 dark:border-indigo-900"
                  title="Login with Google"
                >
                  <LogIn size={18} />
                </button>
              )}
              {/* Theme Toggle Button */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-surface-muted hover:bg-subtle text-tertiary hover:text-primary transition-colors border border-subtle"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {/* Mobile Close Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="md:hidden p-2 rounded-lg bg-surface-muted text-tertiary border border-subtle"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Group Navigation (OS/DBMS) */}
          <div className="flex bg-background p-1 rounded-xl border border-subtle w-full shadow-inner">
            {Object.keys(courseGroups).map((group) => (
              <button
                key={group}
                onClick={() => { setActiveGroup(group); setIsMobileMenuOpen(false); }}
                className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  activeGroup === group 
                    ? 'bg-indigo-600 text-white shadow' 
                    : 'text-tertiary hover:text-primary'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        {groupTotal > 0 && (
          <div className="px-5 py-3 border-b border-subtle bg-background/50">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-semibold text-tertiary uppercase tracking-wide">{activeGroup} Progress</span>
              <span className="text-xs font-bold text-indigo-500">{groupCompleted}/{groupTotal}</span>
            </div>
            <div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                style={{ width: groupTotal > 0 ? `${(groupCompleted / groupTotal) * 100}%` : '0%' }}
              />
            </div>
          </div>
        )}

        {/* Module Navigation (Vertical List) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
          <p className="px-3 pb-2 text-xs font-bold text-tertiary uppercase tracking-wider">{activeGroup} Modules</p>
          {activeGroupModules.map((mod) => {
            const isActive = activeModuleId === mod.id;
            const isDone = completedModules.has(mod.id);
            const isRevision = mod.id === 'revision';
            return (
              <div
                key={mod.id}
                className={`w-full flex items-center gap-2 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-indigo-600/10 border border-indigo-500/20 shadow-sm' 
                    : isDone
                      ? 'border border-transparent bg-emerald-500/5'
                      : 'border border-transparent hover:bg-surface-muted'
                }`}
              >
                {/* Checkbox - only for non-revision modules */}
                {!isRevision ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleToggleComplete(mod.id);
                    }}
                    className={`flex-shrink-0 ml-3 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      isDone
                        ? 'bg-emerald-500 border-emerald-500'
                        : isActive
                          ? 'border-indigo-400 hover:border-emerald-400'
                          : 'border-subtle hover:border-emerald-400'
                    }`}
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isDone && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ) : (
                  <FolderOpen size={16} className={`ml-3 flex-shrink-0 ${isActive ? 'text-indigo-500' : 'text-tertiary'}`} />
                )}
                {/* Clickable label area */}
                <button
                  onClick={() => { setActiveModuleId(mod.id); setActiveTab('notes'); setIsMobileMenuOpen(false); }}
                  className={`flex-1 text-left flex items-center gap-2 py-2.5 pr-3 min-w-0 ${
                    isActive ? 'text-indigo-500 font-bold' : isDone ? 'text-tertiary' : 'text-secondary hover:text-primary'
                  }`}
                >
                  <span className={`truncate flex-1 ${isDone && !isActive ? 'line-through decoration-emerald-500/50' : ''}`}>
                    {mod.title}
                  </span>
                  {isDone && !isRevision && (
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded-full flex-shrink-0">✓</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Main Content (Right Pane) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background">
        
        {/* Mobile Header (Only visible on small screens) */}
        <header className="md:hidden bg-surface border-b border-subtle p-3 flex justify-between items-center z-10 sticky top-0 shadow-sm">
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-surface-muted border border-subtle rounded-lg text-primary">
             <Menu size={20} />
           </button>
           <div className="font-bold text-primary truncate max-w-[160px] text-sm">{activeModule.title}</div>
           <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-surface-muted border border-subtle rounded-lg text-primary">
             {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
           </button>
        </header>

        {/* Mobile Tab Bar — sticky, prominent, always visible */}
        <div className="md:hidden sticky top-[57px] z-10 bg-surface/95 backdrop-blur-xl border-b border-subtle px-3 py-2.5 shadow-md">
          <div className="flex gap-2">
            <button 
              onClick={() => setActiveTab('notes')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'notes' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-surface-muted text-tertiary hover:text-primary'
              }`}
            >
              <BookOpen size={14} />
              Notes
            </button>
            <button 
              onClick={() => setActiveTab('flashcards')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'flashcards' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-surface-muted text-tertiary hover:text-primary'
              }`}
            >
              <Layers size={14} />
              Cards ({activeModule.id === 'revision' ? starredCards.filter(c => c.type === 'flashcard').length : (activeModule.flashcards ? activeModule.flashcards.length : 0)})
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'quiz' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'bg-surface-muted text-tertiary hover:text-primary'
              }`}
            >
              <CheckSquare size={14} />
              Quiz ({activeModule.id === 'revision' ? starredCards.filter(c => c.type === 'quiz').length : (activeModule.quiz ? activeModule.quiz.length : 0)})
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-16 w-full max-w-5xl mx-auto scrollbar-hide pb-24">
          
          {/* Module Title Header - desktop only */}
          <div className="hidden md:block mb-8 pt-4 md:pt-0 border-b border-subtle pb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 leading-tight">{activeModule.title}</h2>
            <p className="text-tertiary flex items-center gap-2">
              <span className="bg-surface-muted px-2 py-1 rounded text-xs font-semibold uppercase">{activeGroup}</span>
              Structured Prep Module
            </p>
          </div>

          {/* Tab Navigation - Desktop only */}
          <div className="hidden md:flex bg-surface p-1.5 rounded-2xl border border-subtle shadow-sm w-full md:w-fit mb-8 overflow-x-auto scrollbar-hide sticky top-4 z-10 backdrop-blur-xl bg-surface/90">
            <button 
              onClick={() => setActiveTab('notes')}
              className={`flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'notes' ? 'bg-indigo-600/10 shadow-sm text-indigo-500 font-bold border border-indigo-500/20' : 'text-tertiary hover:text-primary hover:bg-surface-muted'}`}
            >
              <BookOpen size={16} /> Notes {activeModule.id === 'revision' ? `(${starredCards.filter(c => c.type === 'note').length})` : ''}
            </button>
            <button 
              onClick={() => setActiveTab('flashcards')}
              className={`flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'flashcards' ? 'bg-indigo-600/10 shadow-sm text-indigo-500 font-bold border border-indigo-500/20' : 'text-tertiary hover:text-primary hover:bg-surface-muted'}`}
            >
              <Layers size={16} /> Flashcards ({activeModule.id === 'revision' ? starredCards.filter(c => c.type === 'flashcard').length : (activeModule.flashcards ? activeModule.flashcards.length : 0)})
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`flex whitespace-nowrap items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === 'quiz' ? 'bg-indigo-600/10 shadow-sm text-indigo-500 font-bold border border-indigo-500/20' : 'text-tertiary hover:text-primary hover:bg-surface-muted'}`}
            >
              <CheckSquare size={16} /> Quiz ({activeModule.id === 'revision' ? starredCards.filter(c => c.type === 'quiz').length : (activeModule.quiz ? activeModule.quiz.length : 0)})
            </button>
          </div>
          
          {/* Mobile Module Title — compact */}
          <div className="md:hidden mb-4 pt-2">
            <h2 className="text-xl font-bold text-primary leading-tight">{activeModule.title}</h2>
            <p className="text-tertiary text-xs mt-0.5">
              <span className="bg-surface-muted px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase">{activeGroup}</span>
              {' '}Structured Prep Module
            </p>
          </div>

          {/* Active Tab View */}
          <div className="min-h-[500px]">
            {activeTab === 'notes' && <NotesView module={activeModule} user={user} starredCards={starredCards} />}
            {activeTab === 'flashcards' && <FlashcardsView cards={activeModule.id === 'revision' ? starredCards.filter(c => c.type === 'flashcard') : activeModule.flashcards} moduleTitle={activeModule.title} user={user} starredCards={starredCards} key={`fc-${activeModule.id}`} />}
            {activeTab === 'quiz' && <QuizView questions={activeModule.id === 'revision' ? starredCards.filter(c => c.type === 'quiz') : activeModule.quiz} moduleTitle={activeModule.title} user={user} starredCards={starredCards} key={`qz-${activeModule.id}`} />}
          </div>
        </div>
      </main>
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
}
