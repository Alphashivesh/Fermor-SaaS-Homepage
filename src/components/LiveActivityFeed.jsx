import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Activity, BellRing } from 'lucide-react';

const mockEvents = [
  { id: 1, icon: ArrowUpRight, color: 'text-emerald-400', bg: 'bg-emerald-500/10', title: 'Dividend Received', desc: '₹4,500 credited from ITC Ltd.' },
  { id: 2, icon: ShieldCheck, color: 'text-sky-400', bg: 'bg-sky-500/10', title: 'Security Scan Clean', desc: 'No leaked credentials found.' },
  { id: 3, icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10', title: 'Market Alert', desc: 'Nifty 50 is up 1.2% today.' },
  { id: 4, icon: BellRing, color: 'text-rose-400', bg: 'bg-rose-500/10', title: 'Expense Flagged', desc: 'Unusual ₹2,100 charge detected.' },
];

export default function LiveActivityFeed() {
  const [activeEvents, setActiveEvents] = useState([]);

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      // Add a new event to the feed
      setActiveEvents(prev => {
        const newEvent = mockEvents[currentIndex % mockEvents.length];
        const updated = [...prev, { ...newEvent, uniqueId: Date.now() }];
        // Keep only the 2 most recent notifications on screen
        if (updated.length > 2) updated.shift();
        return updated;
      });
      currentIndex++;
    }, 8000); // Pops up a new notification every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[60] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {activeEvents.map((event) => (
          <motion.div
            key={event.uniqueId}
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="flex items-center gap-3 bg-[#0B132B]/90 backdrop-blur-xl border border-slate-700/60 shadow-2xl p-3 rounded-2xl w-72 pointer-events-auto"
          >
            <div className={`p-2 rounded-xl ${event.bg} border border-slate-700/50 shrink-0`}>
              <event.icon size={18} className={event.color} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">{event.title}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{event.desc}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}