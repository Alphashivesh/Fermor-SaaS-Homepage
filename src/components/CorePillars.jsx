import React, { useState } from 'react';
import { Eye, Zap, TrendingUp, MessageSquare, Bot, AlertTriangle, ArrowRight } from 'lucide-react';

export default function CorePillars() {
  const [selectedPrompt, setSelectedPrompt] = useState(0);

  const aiPrompts = [
    {
      q: "Can I prepay ₹3,00,000 on my home loan without draining my emergency buffer?",
      a: "Yes. Your current liquid reserves are ₹8.5L (exceeding your 6-month safety threshold of ₹5.5L). Prepaying ₹3L today will save ₹5.12L in interest and shorten your loan tenure by 23 months."
    },
    {
      q: "Which subscriptions or hidden charges recurred this month?",
      a: "We detected 4 recurring debits totaling ₹4,890: Netflix Premium (₹649), AWS Cloud (₹2,100), Gym membership (₹1,500), and an inactive Hotstar recurring tier (₹641)."
    },
    {
      q: "Am I on track to reach ₹1 Crore by age 35?",
      a: "At your current monthly investment rate of ₹42,000 at an assumed 12% CAGR, you are projected to reach ₹1.08 Crore at age 34 years and 7 months."
    }
  ];

  return (
    <section id="pillars" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">The Framework</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Understand. Act. Grow.</h2>
        <p className="text-slate-400 mt-2 text-sm sm:text-base">
          A three-stage approach that takes personal finance from reactive stress to effortless clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Pillar 1 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 border border-emerald-500/20">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Understand</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Consolidate every asset class. No more manual spreadsheets or logging into five separate banking portals. Real-time net worth tracking in Indian Rupees.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-medium">
            Automatic categorization • EPF & PPF sync • Credit tracking
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-5 border border-sky-500/20">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Act</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Context-aware insights that find dead money. Detect dormant recurring subscriptions, interest rate spikes, and tax-loss harvesting windows automatically.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-medium">
            Proactive warnings • Expense leak detection • Debt payoff order
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-5 border border-purple-500/20">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Grow</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dynamically model your long-term goals. From early retirement (FIRE) to purchasing a home, stress-test your wealth against inflation and market corrections.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-medium">
            Goal-based SIPs • FIRE timeline forecasting • Rebalancing alerts
          </div>
        </div>
      </div>

      {/* AI Assistant Preview Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Ask Fermor AI Anything</h3>
            <p className="text-xs text-slate-400">Grounded in your actual financial telemetry, not generic platitudes.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {aiPrompts.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedPrompt(idx)}
              className={`text-xs px-3.5 py-2 rounded-xl transition text-left ${
                selectedPrompt === idx
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {item.q.substring(0, 35)}...
            </button>
          ))}
        </div>

        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
          <div className="text-xs font-semibold text-slate-400">User Query:</div>
          <div className="text-sm font-medium text-white">"{aiPrompts[selectedPrompt].q}"</div>
          <div className="text-xs font-semibold text-emerald-400 pt-2 border-t border-slate-800/80">
            Fermor Intelligence:
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {aiPrompts[selectedPrompt].a}
          </p>
        </div>
      </div>
    </section>
  );
}