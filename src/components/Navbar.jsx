import React, { useState } from 'react';
import { Menu, X, Sparkles, Search } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? "py-3" : "py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          layout
          className={`flex justify-between items-center transition-all duration-500 ${
            isScrolled 
              ? "bg-[#0B132B]/80 backdrop-blur-xl border border-slate-700/60 shadow-2xl rounded-2xl px-6 h-14 mx-4 sm:mx-0" 
              : "bg-transparent h-16"
          }`}
        >
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <span className="font-bold text-emerald-400 text-lg">F</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white hidden sm:block">fermor</span>
          </div>

          {/* Desktop Navigation & Search */}
          <div className="hidden md:flex items-center space-x-6">
            
            {/* Command Prompt Button */}
            <button 
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className="flex items-center gap-3 px-4 py-1.5 bg-slate-900/50 border border-slate-700/50 hover:border-emerald-500/50 rounded-lg text-sm text-slate-400 transition-colors group"
            >
              <Search size={14} className="group-hover:text-emerald-400 transition-colors" />
              <span>Search or ask AI...</span>
              <kbd className="ml-2 px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-300 font-sans font-semibold">⌘ K</kbd>
            </button>

            <a href="#cockpit" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Cockpit</a>
            <a href="#simulator" className="text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors">Wealth Engine</a>
            
            {/* FIXED EARLY ACCESS BUTTON */}
            <motion.a 
              href="#waitlist"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)] cursor-pointer"
            >
              <Sparkles size={16} />
              Early Access
            </motion.a>
          </div>

          {/* Mobile Menu Toggle & Mobile Search */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => window.dispatchEvent(new Event('open-command-palette'))}
              className="text-slate-400 hover:text-emerald-400"
            >
              <Search size={20} />
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-400 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-[#0B0F19]/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl">
          <div className="flex flex-col space-y-4">
            <a href="#cockpit" onClick={() => setIsOpen(false)} className="text-slate-300 font-medium hover:text-emerald-400 p-2">Cockpit</a>
            <a href="#simulator" onClick={() => setIsOpen(false)} className="text-slate-300 font-medium hover:text-emerald-400 p-2">Wealth Engine</a>
            <a href="#security" onClick={() => setIsOpen(false)} className="text-slate-300 font-medium hover:text-emerald-400 p-2">Security</a>
            
            {/* ADDED TO MOBILE MENU */}
            <a 
              href="#waitlist" 
              onClick={() => setIsOpen(false)} 
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-xl bg-emerald-500 text-slate-950 mt-2"
            >
              <Sparkles size={16} />
              Get Early Access
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}