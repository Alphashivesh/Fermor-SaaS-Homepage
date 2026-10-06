import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { TrendingDown, Flame } from 'lucide-react';

export default function CostOfInaction() {
  const [lostWealth, setLostWealth] = useState(14250.00);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLostWealth(prev => prev + (Math.random() * 2.5 + 0.5));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* The Urgency Ticker */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 mb-6 uppercase tracking-wider">
            <Flame size={14} /> The Cost of Waiting
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Inflation is eating your cash <span className="text-rose-400">right now.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            While your money sits in dead savings accounts, hidden fees and 6% inflation are quietly destroying your purchasing power.
          </p>
          
          <div className="bg-slate-900/80 border border-rose-500/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[50px]" />
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <TrendingDown size={16} className="text-rose-400" /> Value Lost This Year
            </div>
            <motion.div 
              key={lostWealth}
              className="text-5xl font-extrabold text-white tracking-tight tabular-nums"
            >
              {formatINR(lostWealth)}
            </motion.div>
          </div>
        </div>

        {/* 3D Premium Card */}
        <div className="flex justify-center perspective-[1000px]">
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-80 h-[400px] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 shadow-2xl p-6 flex flex-col justify-between cursor-crosshair"
          >
            <motion.div 
              className="absolute inset-0 rounded-2xl pointer-events-none opacity-50 mix-blend-overlay"
              style={{
                background: useTransform(() => `radial-gradient(circle at ${x.get() + 160}px ${y.get() + 200}px, rgba(255,255,255,0.4) 0%, transparent 50%)`)
              }}
            />
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12 bg-slate-900 rounded-xl border border-slate-700 flex items-center justify-center font-bold text-emerald-400">F</div>
              <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">Fermor Black</span>
            </div>
            
            <div className="relative z-10">
              <div className="w-10 h-8 bg-gradient-to-r from-slate-300 to-slate-500 rounded-md mb-6 opacity-80" />
              <h3 className="text-xl font-bold text-white tracking-widest opacity-90 mb-4">4892 1034 5029 8831</h3>
              
              {/* UPDATED: Profile Image and User Details */}
              <div className="flex justify-between items-center mt-2 border-t border-slate-700/50 pt-4">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces" 
                    alt="Rohan Sharma" 
                    className="w-8 h-8 rounded-full border border-slate-600 object-cover"
                  />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Rohan Sharma</span>
                </div>
                <span className="text-xs font-medium text-slate-500">12/28</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}