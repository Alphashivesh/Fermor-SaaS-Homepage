import React, { useState } from 'react';
import { Calculator, ArrowRight, Zap } from 'lucide-react';

export default function InteractiveSimulator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(30000);
  const [years, setYears] = useState(15);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // Future Value Formula for Monthly SIP: P * [((1 + r)^n - 1) / r] * (1 + r)
  const monthlyRate = expectedReturn / 12 / 100;
  const totalMonths = years * 12;
  const investedAmount = monthlyInvestment * totalMonths;
  const futureValue = Math.round(
    monthlyInvestment *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate)
  );
  const estimatedWealthGained = futureValue - investedAmount;

  // Format INR nicely
  const formatINR = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section id="simulator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Wealth Engine</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
          Model Your Future, Don't Guess It.
        </h2>
        <p className="text-slate-400 mt-3 text-sm sm:text-base">
          Adjust the dials to see what disciplined, automated investing creates over time with Fermor’s smart rebalancing.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
        {/* Sliders Side */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-300">Monthly Contribution</label>
              <span className="text-emerald-400 font-bold font-mono text-base">{formatINR(monthlyInvestment)}</span>
            </div>
            <input
              type="range"
              min={5000}
              max={150000}
              step={5000}
              value={monthlyInvestment}
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>₹5,000/mo</span>
              <span>₹1,50,000/mo</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-300">Investment Horizon</label>
              <span className="text-emerald-400 font-bold font-mono text-base">{years} Years</span>
            </div>
            <input
              type="range"
              min={3}
              max={30}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>3 Years</span>
              <span>30 Years</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-300">Expected Annual Returns</label>
              <span className="text-emerald-400 font-bold font-mono text-base">{expectedReturn}%</span>
            </div>
            <input
              type="range"
              min={6}
              max={16}
              step={0.5}
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>6% (Conservative)</span>
              <span>16% (Aggressive)</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800/90 text-left">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projected Portfolio</span>
          <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1 mb-6">
            {formatINR(futureValue)}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-800/80 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Invested Principal</span>
              <span className="font-semibold text-slate-200">{formatINR(investedAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Estimated Wealth Gained</span>
              <span className="font-semibold text-emerald-400">+{formatINR(estimatedWealthGained)}</span>
            </div>
          </div>

          <a
            href="#waitlist"
            className="w-full mt-6 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition"
          >
            Lock in this plan with Fermor <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}