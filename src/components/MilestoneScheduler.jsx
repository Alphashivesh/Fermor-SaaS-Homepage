import React from 'react';
import { motion } from 'framer-motion';
import { CalendarClock, ArrowRight } from 'lucide-react';

export default function MilestoneScheduler() {
  const milestones = [
    { month: 'Month 1', title: 'Portfolio Optimization', desc: 'AI rebalances your assets for tax efficiency.' },
    { month: 'Month 6', title: 'Mid-Year Review', desc: 'Automated check-in on your SIP growth.' },
    { month: 'Month 12', title: 'Tax Harvesting', desc: 'Offsetting gains against capital losses automatically.' },
  ];

  // Open a placeholder PDF in a new tab
  const openSchedulePDF = () => {
    window.open('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', '_blank');
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Automated Scheduling</h2>
          <p className="text-slate-400">Fermor schedules critical portfolio actions so you don't have to.</p>
        </div>
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mt-6 md:mt-0">
          <CalendarClock size={28} className="text-emerald-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {milestones.map((m, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 hover:border-emerald-500/30 transition-colors relative group"
          >
            <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full inline-block mb-4">{m.month}</div>
            <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{m.desc}</p>
            {/* UPDATED: Functional PDF Button */}
            <button 
              onClick={openSchedulePDF}
              className="flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-emerald-400 transition-colors"
            >
              View scheduled action <ArrowRight size={16} />
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}