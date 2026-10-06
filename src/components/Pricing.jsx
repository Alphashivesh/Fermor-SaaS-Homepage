import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Accept the new prop here
export default function Pricing({ onOpenTrialModal }) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          Simple, transparent <span className="text-emerald-400">pricing.</span>
        </h2>
        <p className="text-slate-400 text-lg mb-8">
          Start for free, upgrade when you need advanced AI intelligence and automated tax harvesting.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl relative">
          <button 
            onClick={() => setIsAnnual(false)} 
            className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-lg transition-colors ${!isAnnual ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Monthly
          </button>
          <button 
            onClick={() => setIsAnnual(true)} 
            className={`relative z-10 px-6 py-2.5 text-sm font-bold rounded-lg transition-colors ${isAnnual ? 'text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Annually <span className="text-emerald-400 text-xs ml-1">-20%</span>
          </button>
          <motion.div 
            className="absolute top-1 bottom-1 w-1/2 bg-slate-800 rounded-lg shadow-sm border border-slate-700"
            animate={{ left: isAnnual ? '50%' : '4px', width: 'calc(50% - 4px)' }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Basic Tier */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2">Fermor Basic</h3>
          <p className="text-slate-400 text-sm mb-6">Everything you need to track your net worth.</p>
          <div className="mb-8">
            <span className="text-4xl font-extrabold text-white">₹0</span>
            <span className="text-slate-500"> / forever</span>
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Link up to 3 bank accounts', 'Basic net worth tracking', 'Manual expense categorization', 'Standard email support'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="p-1 rounded-full bg-emerald-500/10 text-emerald-400"><Check size={14} /></div>
                {feature}
              </li>
            ))}
          </ul>
          {/* UPDATED: Triggers the Trial Modal */}
          <button 
            onClick={onOpenTrialModal}
            className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-colors flex items-center justify-center gap-2"
          >
            Get Free Access <ArrowRight size={16} />
          </button>
        </div>

        {/* Pro Tier */}
        <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative overflow-hidden flex flex-col">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400" />
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><Sparkles size={18} className="text-emerald-400"/> Fermor Pro</h3>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">Popular</span>
          </div>
          <p className="text-slate-400 text-sm mb-6">Advanced AI intelligence and automated growth.</p>
          <div className="mb-8">
            <span className="text-4xl font-extrabold text-white">₹{isAnnual ? '499' : '599'}</span>
            <span className="text-slate-500"> / month</span>
            {isAnnual && <div className="text-emerald-400 text-xs font-semibold mt-1">Billed ₹5,988 yearly</div>}
          </div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Unlimited account syncing (AA framework)', 'Context-aware AI financial assistant', 'Automated expense leak detection', 'Tax-loss harvesting alerts', 'Priority 24/7 support'].map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="p-1 rounded-full bg-emerald-500 text-slate-950"><Check size={14} /></div>
                {feature}
              </li>
            ))}
          </ul>
          {/* UPDATED: Triggers the Trial Modal */}
          <button 
            onClick={onOpenTrialModal}
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            Start 14-Day Free Trial <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}