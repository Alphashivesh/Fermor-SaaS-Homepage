import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Building2, Wallet, Briefcase, Building, PiggyBank } from 'lucide-react';

const banks = [
  { name: 'HDFC Bank', icon: Building2, color: 'text-blue-500' },
  { name: 'Zerodha', icon: Briefcase, color: 'text-sky-500' },
  { name: 'State Bank of India', icon: Landmark, color: 'text-indigo-500' },
  { name: 'Groww', icon: Wallet, color: 'text-emerald-500' },
  { name: 'ICICI Bank', icon: Building, color: 'text-orange-500' },
  { name: 'EPFO Portal', icon: PiggyBank, color: 'text-rose-500' },
];

export default function IntegrationMarquee() {
  return (
    <section className="py-12 border-y border-slate-800/50 bg-[#0B0F19] overflow-hidden relative">
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0B0F19] to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent z-10" />
      
      <p className="text-center text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
        Syncs seamlessly via Account Aggregator with
      </p>

      <div className="flex w-[200%]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex gap-16 px-8 items-center"
        >
          {[...banks, ...banks, ...banks].map((bank, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
              <bank.icon size={24} className={bank.color} />
              <span className="text-lg font-bold text-slate-300">{bank.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}