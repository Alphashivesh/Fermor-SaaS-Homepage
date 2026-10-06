import React from 'react';
import { motion } from 'framer-motion';
import { Server, Lock } from 'lucide-react';

export default function ConnectionMap() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto overflow-hidden">
      <div className="bg-[#0B132B]/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-10 relative flex flex-col items-center justify-center min-h-[400px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#0B132B]/0 to-transparent pointer-events-none" />
        
        {/* Central Hub */}
        <div className="relative z-10 w-24 h-24 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <Lock size={28} className="text-emerald-400 mb-1" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase">Fermor Hub</span>
        </div>

        {/* Animated Connecting Lines & Nodes */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400">
          <motion.path d="M 500 200 Q 300 100 150 200" fill="transparent" stroke="rgba(16,185,129,0.2)" strokeWidth="2" strokeDasharray="5,5" />
          <motion.path d="M 500 200 Q 700 100 850 200" fill="transparent" stroke="rgba(14,165,233,0.2)" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Moving Data Packets */}
          <motion.circle r="4" fill="#10b981" animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M 150 200 Q 300 100 500 200')" }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
          <motion.circle r="4" fill="#0ea5e9" animate={{ offsetDistance: ["0%", "100%"] }} style={{ offsetPath: "path('M 850 200 Q 700 100 500 200')" }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }} />
        </svg>

        <div className="absolute left-10 md:left-32 top-1/2 -translate-y-1/2 p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center gap-2">
          <Server size={20} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-300">Bank Auth</span>
        </div>
        <div className="absolute right-10 md:right-32 top-1/2 -translate-y-1/2 p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center gap-2">
          <Server size={20} className="text-slate-400" />
          <span className="text-xs font-bold text-slate-300">Broker API</span>
        </div>
      </div>
    </section>
  );
}