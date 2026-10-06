import React from 'react';
import { motion } from 'framer-motion';
import { Home, PieChart, Target, Shield, Search } from 'lucide-react';

export default function FloatingDock() {
  const dockItems = [
    { id: 'home', icon: Home, target: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { id: 'cockpit', icon: PieChart, target: () => document.getElementById('cockpit').scrollIntoView({ behavior: 'smooth' }) },
    { id: 'search', icon: Search, target: () => window.dispatchEvent(new Event('open-command-palette')) },
    { id: 'simulator', icon: Target, target: () => document.getElementById('simulator').scrollIntoView({ behavior: 'smooth' }) },
    { id: 'security', icon: Shield, target: () => document.getElementById('security').scrollIntoView({ behavior: 'smooth' }) },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] hidden md:flex items-center gap-2 p-2 bg-[#0B132B]/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl">
      {dockItems.map((item) => (
        <motion.button
          key={item.id}
          onClick={item.target}
          whileHover={{ scale: 1.2, y: -5, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors border border-transparent hover:border-emerald-500/20"
        >
          <item.icon size={20} />
        </motion.button>
      ))}
    </div>
  );
}