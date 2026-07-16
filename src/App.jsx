import React, { useState, useEffect } from 'react';
import { BookOpen, Layers, CheckSquare, AppWindow, FolderOpen, Sun, Moon, Menu, X, LogIn, LogOut } from 'lucide-react';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, query, onSnapshot } from 'firebase/firestore';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        const q = query(collection(db, `users/${currentUser.uid}/starredCards`));
        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const cards = [];
          querySnapshot.forEach((docSnap) => {
            cards.push({ id: docSnap.id, ...docSnap.data() });
          });
          setStarredCards(cards);
        });
        return () => unsubscribeSnapshot();
      } else {
        setStarredCards([]);
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

        {/* Module Navigation (Vertical List) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1.5 scrollbar-hide">
          <p className="px-3 pb-2 text-xs font-bold text-tertiary uppercase tracking-wider">{activeGroup} Modules</p>
          {activeGroupModules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => { setActiveModuleId(mod.id); setActiveTab('notes'); setIsMobileMenuOpen(false); }}
              className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                activeModuleId === mod.id 
                  ? 'bg-indigo-600/10 text-indigo-500 font-bold border border-indigo-500/20 shadow-sm' 
                  : 'text-secondary hover:bg-surface-muted hover:text-primary border border-transparent'
              }`}
            >
              <FolderOpen size={16} className={activeModuleId === mod.id ? 'text-indigo-500' : 'text-tertiary'} /> 
              <span className="truncate">{mod.title}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content (Right Pane) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-background">
        
        {/* Mobile Header (Only visible on small screens) */}
        <header className="md:hidden bg-surface border-b border-subtle p-4 flex justify-between items-center z-10 sticky top-0 shadow-sm">
           <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-surface-muted border border-subtle rounded-lg text-primary">
             <Menu size={20} />
           </button>
           <div className="font-bold text-primary truncate max-w-[200px] text-sm">{activeModule.title}</div>
           <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 bg-surface-muted border border-subtle rounded-lg text-primary">
             {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
           </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-16 w-full max-w-5xl mx-auto scrollbar-hide pb-24">
          
          {/* Module Title Header */}
          <div className="mb-8 pt-4 md:pt-0 border-b border-subtle pb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3 leading-tight">{activeModule.title}</h2>
            <p className="text-tertiary flex items-center gap-2">
              <span className="bg-surface-muted px-2 py-1 rounded text-xs font-semibold uppercase">{activeGroup}</span>
              Structured Prep Module
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex bg-surface p-1.5 rounded-2xl border border-subtle shadow-sm w-full md:w-fit mb-8 overflow-x-auto scrollbar-hide sticky top-4 z-10 backdrop-blur-xl bg-surface/90">
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
