import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Mail, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TrialModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Email, 2: Loading, 3: Success
  const [email, setEmail] = useState('');

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setEmail('');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setStep(2);
    // Simulate API account creation latency
    setTimeout(() => setStep(3), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-md"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8 relative min-h-[380px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Email Capture */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex flex-col"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 shadow-inner">
                      <Sparkles size={24} className="text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Create your workspace</h3>
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                      Enter your email to start your free trial. No credit card required to begin.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com" 
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors flex items-center justify-center gap-2"
                      >
                        Continue <ArrowRight size={16} />
                      </button>
                    </form>
                    <p className="text-center text-xs text-slate-500 mt-6">
                      By continuing, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </motion.div>
                )}

                {/* STEP 2: Loading State */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <Loader2 size={48} className="text-emerald-500 animate-spin mb-6" />
                    <h3 className="text-lg font-bold text-white mb-2">Provisioning Workspace</h3>
                    <p className="text-sm text-slate-400 max-w-[250px]">Setting up your secure zero-knowledge environment...</p>
                  </motion.div>
                )}

                {/* STEP 3: Success State */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle2 size={56} className="text-emerald-500 mb-6" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">You're all set!</h3>
                    <p className="text-sm text-slate-400 mb-8">
                      We've sent a magic login link to <span className="text-white font-medium">{email}</span>. Click it to enter your new cockpit.
                    </p>
                    <button 
                      onClick={onClose}
                      className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors"
                    >
                      Close Window
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}