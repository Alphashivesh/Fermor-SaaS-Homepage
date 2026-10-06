import React, { useState } from 'react';
import { Target, TrendingUp, Zap } from 'lucide-react';

export default function AdvancedSimulator() {
  const [sip, setSip] = useState(25000);
  const [years, setYears] = useState(15);
  
  // Assumed 12% returns
  const rate = 12 / 12 / 100;
  const months = years * 12;
  const invested = sip * months;
  const futureValue = Math.round(sip * ((Math.pow(1 + rate, months) - 1) / rate) * (1 + rate));
  const wealthGained = futureValue - invested;

  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <section id="simulator" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-gradient-to-br from-[#0B132B] to-slate-900 border border-slate-700/60 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Sliders */}
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                <Target className="text-emerald-400" size="{28}"/> The Wealth Engine
              </h3>
              <p className="text-slate-400 text-sm">See the exact mathematical path to your financial independence.</p>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-3 text-sm">
                  <span className="font-semibold text-slate-300">Monthly SIP</span>
                  <span className="font-bold text-emerald-400">{formatINR(sip)}</span>
                </div>
                <input 
                  type="range" min={5000} max={200000} step={5000} value={sip} 
                  onChange={(e) => setSip(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between mb-3 text-sm">
                  <span className="font-semibold text-slate-300">Time Horizon</span>
                  <span className="font-bold text-emerald-400">{years} Years</span>
                </div>
                <input 
                  type="range" min={5} max={35} step={1} value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Results Output */}
          <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-8 rounded-3xl text-center shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <div className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-2">Projected Net Worth</div>
            <div className="text-5xl font-extrabold text-white mb-8 tracking-tight">
              {formatINR(futureValue)}
            </div>

            <div className="space-y-4 text-sm text-left border-t border-slate-800 pt-6">
              <div className="flex justify-between items-center p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">Total Invested</span>
                <span className="font-bold text-white">{formatINR(invested)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="flex items-center gap-2 text-emerald-400 font-semibold"><TrendingUp size="{16}"/> Wealth Generated</span>
                <span className="font-bold text-emerald-400">+{formatINR(wealthGained)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}