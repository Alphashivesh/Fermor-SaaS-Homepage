import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Landmark, ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const banks = [
  { id: 'hdfc', name: 'HDFC Bank', color: 'bg-blue-500' },
  { id: 'sbi', name: 'State Bank of India', color: 'bg-indigo-500' },
  { id: 'icici', name: 'ICICI Bank', color: 'bg-orange-500' },
  { id: 'axis', name: 'Axis Bank', color: 'bg-rose-500' },
  { id: 'kotak', name: 'Kotak Mahindra', color: 'bg-red-500' },
  { id: 'zerodha', name: 'Zerodha (Broker)', color: 'bg-sky-500' }
];

export default function BankLinkModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Select, 2: Connecting, 3: Success
  const [selectedBank, setSelectedBank] = useState(null);

  // Simulate an API connection flow when a bank is clicked
  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => setStep(3), 2500); // Simulate network latency
      return () => clearTimeout(timer);
    }
  }, [step]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(1);
        setSelectedBank(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setStep(2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B0F19]/80 backdrop-blur-sm"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-slate-900 border border-slate-700 shadow-2xl rounded-3xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-400" />
                <span className="text-sm font-semibold text-white">Fermor Secure Sync</span>
              </div>
              <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Dynamic Body */}
            <div className="p-6 relative min-h-[350px] flex flex-col">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: Select Institution */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                  >
                    <h3 className="text-xl font-bold text-white mb-2">Connect an institution</h3>
                    <p className="text-sm text-slate-400 mb-6">Fermor uses the RBI Account Aggregator framework to fetch read-only data.</p>
                    
                    <div className="relative mb-6">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Search for your bank or broker..." 
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {banks.map((bank) => (
                        <button
                          key={bank.id}
                          onClick={() => handleBankSelect(bank)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-slate-800 bg-slate-800/30 hover:bg-slate-800 hover:border-slate-700 transition-colors text-left group"
                        >
                          <div className={`w-8 h-8 rounded-lg ${bank.color} flex items-center justify-center shrink-0 shadow-inner`}>
                            <Landmark size={14} className="text-white" />
                          </div>
                          <span className="text-xs font-semibold text-slate-300 group-hover:text-white transition-colors">{bank.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Connecting Loading State */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-10"
                  >
                    <Loader2 size={48} className="text-emerald-500 animate-spin mb-6" />
                    <h3 className="text-lg font-bold text-white mb-2">Authenticating with {selectedBank?.name}</h3>
                    <p className="text-sm text-slate-400 max-w-[250px]">Establishing an encrypted, read-only token connection...</p>
                  </motion.div>
                )}

                {/* STEP 3: Success State */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5 }}
                    >
                      <CheckCircle2 size={56} className="text-emerald-500 mb-6" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">Accounts Synced</h3>
                    <p className="text-sm text-slate-400 max-w-[250px] mb-8">
                      Your {selectedBank?.name} data is now securely linked to your Fermor cockpit.
                    </p>
                    <button 
                      onClick={onClose}
                      className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
                    >
                      Return to Dashboard
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
            
            {/* Footer */}
            <div className="px-6 py-4 bg-slate-950 text-[10px] text-slate-500 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck size={12} />
              Protected by 256-bit banking encryption
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}