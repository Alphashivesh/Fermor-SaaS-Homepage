import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calculator, MessageSquare, Landmark, X, ArrowRight } from 'lucide-react';

export default function CommandPalette({ onOpenBankModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Global Keyboard Listener for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Add this right below your existing keyboard useEffect!
  useEffect(() => {
    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener('open-command-palette', handleCustomOpen);
    return () => window.removeEventListener('open-command-palette', handleCustomOpen);
  }, []);

  const actions = [
    { id: 1, title: "Connect new bank account", icon: <Landmark size={18} />, action: () => { setIsOpen(false); onOpenBankModal(); }, category: "Integrations" },
    { id: 2, title: "Calculate FIRE timeline", icon: <Calculator size={18} />, action: () => { setIsOpen(false); document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' }); }, category: "Tools" },
    { id: 3, title: "Ask AI about expense leaks", icon: <MessageSquare size={18} />, action: () => { setIsOpen(false); document.getElementById('ai-assistant').scrollIntoView({ behavior: 'smooth' }); }, category: "Intelligence" },
  ];

  const filteredActions = actions.filter(action => 
    action.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Visual Hint for Users */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-full text-xs text-slate-400 shadow-xl pointer-events-none">
        Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-200 font-sans font-semibold">⌘ K</kbd> to open command menu
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0B0F19]/60 backdrop-blur-sm"
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="relative w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="flex items-center px-4 border-b border-slate-800">
                <Search size={20} className="text-emerald-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="What do you want to do?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none py-5 pl-4 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:ring-0 text-lg"
                />
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Action List */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredActions.length === 0 ? (
                  <div className="py-10 text-center text-slate-500 text-sm">
                    No results found for "{searchQuery}"
                  </div>
                ) : (
                  filteredActions.map((item) => (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/20 border border-transparent transition-all group text-left mb-1"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <div className="text-slate-200 font-medium group-hover:text-white transition-colors">{item.title}</div>
                          <div className="text-xs text-slate-500">{item.category}</div>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-slate-800 bg-slate-950/50 text-[10px] text-slate-500 flex justify-between items-center">
                <span>Search powered by Fermor Engine</span>
                <div className="flex gap-2">
                  <span><kbd className="bg-slate-800 px-1 rounded border border-slate-700">↑</kbd> <kbd className="bg-slate-800 px-1 rounded border border-slate-700">↓</kbd> to navigate</span>
                  <span><kbd className="bg-slate-800 px-1 rounded border border-slate-700">↵</kbd> to select</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}