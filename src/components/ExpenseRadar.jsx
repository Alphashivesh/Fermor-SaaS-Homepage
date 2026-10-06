import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CreditCard, Coffee, ShoppingBag, Zap, ShieldAlert, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function ExpenseRadar() {
  // State for Interactive Zombie Subscriptions
  const [subs, setSubs] = useState([
    { id: 1, name: 'Adobe Creative Cloud', amount: '₹4,230', status: 'Inactive 4 mos', state: 'idle' },
    { id: 2, name: 'Gym Membership', amount: '₹1,500', status: 'Inactive 2 mos', state: 'idle' },
    { id: 3, name: 'Disney+ Hotstar', amount: '₹899', status: 'Duplicate charge', state: 'idle' }
  ]);

  // State for Smart Budget Toggle
  const [budgetState, setBudgetState] = useState('idle'); // idle, loading, active

  const handleCancelSub = (id) => {
    setSubs(subs.map(s => s.id === id ? { ...s, state: 'loading' } : s));
    setTimeout(() => {
      setSubs(prev => prev.map(s => s.id === id ? { ...s, state: 'cancelled' } : s));
    }, 1500); // Simulate API call to cancel subscription
  };

  const handleSetBudget = () => {
    if (budgetState !== 'idle') return;
    setBudgetState('loading');
    setTimeout(() => setBudgetState('active'), 1200); // Simulate saving budget to database
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-16"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-bold text-rose-400 mb-6 uppercase tracking-wider">
          <ShieldAlert size={14} /> Leak Detection
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Stop bleeding money on <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">autopilot.</span>
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl">
          Fermor doesn't just track your net worth. It actively scans your linked accounts for forgotten subscriptions, hidden fees, and lifestyle inflation.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6"
      >
        {/* Large Feature Card: INTERACTIVE ZOMBIE SUBSCRIPTIONS */}
        <motion.div variants={itemVariants} className="md:col-span-8 bg-slate-900/50 border border-slate-700/60 rounded-3xl p-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-rose-500/20 transition-colors duration-500" />
          <h3 className="text-2xl font-bold text-white mb-2">Zombie Subscriptions</h3>
          <p className="text-slate-400 text-sm mb-8 max-w-md">We identified {subs.filter(s => s.state !== 'cancelled').length} recurring charges you haven't actively used in over 90 days.</p>
          
          <div className="space-y-3">
            <AnimatePresence>
              {subs.map((sub) => (
                <motion.div 
                  key={sub.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`flex items-center justify-between p-4 bg-slate-950/50 border rounded-2xl transition-colors ${sub.state === 'cancelled' ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 hover:border-rose-500/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${sub.state === 'cancelled' ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                      {sub.state === 'cancelled' ? <CheckCircle2 size={18} className="text-emerald-400" /> : <CreditCard size={18} className="text-slate-400" />}
                    </div>
                    <div>
                      <div className={`font-semibold text-sm transition-colors ${sub.state === 'cancelled' ? 'text-slate-400 line-through' : 'text-white'}`}>{sub.name}</div>
                      <div className={`text-xs font-medium transition-colors ${sub.state === 'cancelled' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {sub.state === 'cancelled' ? 'Successfully Cancelled' : sub.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`font-bold transition-colors ${sub.state === 'cancelled' ? 'text-slate-500' : 'text-slate-300'}`}>{sub.amount}</span>
                    
                    {sub.state === 'idle' && (
                      <button 
                        onClick={() => handleCancelSub(sub.id)}
                        className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-400 text-xs font-bold hover:bg-rose-500/20 hover:text-rose-300 transition-colors border border-rose-500/20"
                      >
                        Cancel
                      </button>
                    )}
                    {sub.state === 'loading' && (
                      <div className="px-4 py-2 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold flex items-center gap-2 border border-slate-700">
                        <Loader2 size={14} className="animate-spin" /> Canceling...
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Small Feature Card 1 */}
        <motion.div variants={itemVariants} className="md:col-span-4 bg-slate-900/50 border border-slate-700/60 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6">
              <Coffee size={24} className="text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Lifestyle Creep</h3>
            <p className="text-slate-400 text-sm">Your "Dining & Cafes" spending is up 42% compared to last month.</p>
          </div>
          <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-400 text-sm font-bold flex items-center justify-between">
            <span>₹14,250 this month</span>
            <AlertCircle size={18} />
          </div>
        </motion.div>

        {/* Small Feature Card 2 */}
        <motion.div variants={itemVariants} className="md:col-span-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Zap size={28} className="text-emerald-50 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2">See How It Works</h3>
            <p className="text-emerald-50 text-sm">Watch Fermor's AI correctly label 98% of Indian merchant transactions instantly.</p>
          </div>
          <button 
            onClick={() => window.dispatchEvent(new Event('open-video-modal'))}
            className="relative z-10 mt-8 w-full py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-bold backdrop-blur-sm transition-colors flex items-center justify-center gap-2"
          >
            Launch Interactive Demo <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Small Feature Card 3: INTERACTIVE BUDGET SETTER */}
        <motion.div 
          variants={itemVariants} 
          onClick={handleSetBudget}
          className={`md:col-span-8 border rounded-3xl p-8 flex items-center justify-between transition-all duration-300 ${budgetState === 'active' ? 'bg-sky-500/10 border-sky-500/30' : 'bg-slate-900/50 border-slate-700/60 hover:bg-slate-800/50 cursor-pointer group'}`}
        >
          <div className="flex items-center gap-6">
            <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-colors ${budgetState === 'active' ? 'bg-sky-500/20 border-sky-500/40' : 'bg-sky-500/10 border-sky-500/20'}`}>
              <ShoppingBag size={28} className="text-sky-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">Set Smart Budgets</h3>
              <p className={`text-sm transition-colors ${budgetState === 'active' ? 'text-sky-300' : 'text-slate-400'}`}>
                {budgetState === 'active' ? 'Strict budget limits activated successfully.' : 'Click to enable automated push notifications before you break your monthly limits.'}
              </p>
            </div>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${budgetState === 'active' ? 'bg-sky-500 text-slate-950 shadow-[0_0_15px_rgba(14,165,233,0.4)]' : 'bg-slate-800 text-slate-400 group-hover:bg-sky-500 group-hover:text-slate-950'}`}>
            {budgetState === 'loading' ? <Loader2 size={20} className="animate-spin" /> : budgetState === 'active' ? <CheckCircle2 size={20} /> : <ArrowRight size={20} />}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}