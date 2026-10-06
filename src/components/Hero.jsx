import React from 'react';
import { ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

// Notice we accept the onOpenBankModal prop here!
export default function Hero({ onOpenBankModal }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="relative pt-24 pb-16 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" 
      />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 mb-8 shadow-sm">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>RBI Account Aggregator Framework Ready</span>
        </motion.div>

        <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Stop managing apps. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Start building wealth.
          </span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          Connect your bank accounts, mutual funds, EPF, and loans in one unified cockpit. Let Fermor's intelligence find your money leaks automatically.
        </motion.p>

        {/* Call to Actions */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 relative z-20">
          
          {/* Bank Integration Button */}
          <MagneticButton 
            onClick={onOpenBankModal}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            Connect Your Accounts <ArrowRight size={18} />
          </MagneticButton>
          
          {/* NEW: Cinematic Video Modal Trigger */}
          <motion.button 
            onClick={() => window.dispatchEvent(new Event('open-video-modal'))}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-base transition-colors flex items-center justify-center gap-2"
          >
            <Activity size={18} className="text-emerald-400" />
            View Live Demo
          </motion.button>

        </motion.div>
      </motion.div>
    </section>
  );
}