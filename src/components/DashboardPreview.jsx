import React, { useState } from 'react';
import { Wallet, PieChart, ArrowUpRight, ArrowDownRight, Layers, HelpCircle, Activity } from 'lucide-react';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('networth');

  return (
    <section id="cockpit" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Cockpit top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-6">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">Live Simulation</span>
            <h2 className="text-2xl font-bold text-white mt-0.5">The Unified Financial Cockpit</h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('networth')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                activeTab === 'networth' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Net Worth
            </button>
            <button
              onClick={() => setActiveTab('allocation')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                activeTab === 'allocation' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Allocation
            </button>
            <button
              onClick={() => setActiveTab('cashflow')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                activeTab === 'cashflow' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Cash Flow
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {activeTab === 'networth' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs text-slate-400 font-medium">Total Net Worth</div>
                <div className="text-3xl font-extrabold text-white mt-1">₹48,24,500</div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                  <ArrowUpRight size={14} /> +₹1,42,000 this month (+3.0%)
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs text-slate-400 font-medium">Liquid Assets (Savings & FD)</div>
                <div className="text-2xl font-bold text-white mt-1">₹8,50,000</div>
                <div className="text-xs text-slate-500 mt-2">6.2 months emergency cover</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <div className="text-xs text-slate-400 font-medium">Active Liabilities (Home Loan)</div>
                <div className="text-2xl font-bold text-rose-400 mt-1">₹14,20,000</div>
                <div className="text-xs text-slate-500 mt-2">Next EMI due in 8 days</div>
              </div>
            </div>

            {/* Asset Breakdown Bars */}
            <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-medium">
                <span>Holdings Distribution</span>
                <span>Calculated across 4 banks & 2 brokers</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full flex overflow-hidden">
                <div style={{ width: '45%' }} className="bg-emerald-500" title="Mutual Funds & Equity (45%)" />
                <div style={{ width: '25%' }} className="bg-sky-500" title="EPF & PPF (25%)" />
                <div style={{ width: '20%' }} className="bg-amber-500" title="Cash & Bank (20%)" />
                <div style={{ width: '10%' }} className="bg-violet-500" title="Gold & Commodities (10%)" />
              </div>
              <div className="flex flex-wrap gap-4 mt-4 text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Equity & MFs: 45%</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-sky-500 inline-block"/> EPF / PPF: 25%</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"/> Bank Savings: 20%</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-violet-500 inline-block"/> Digital Gold: 10%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
              <h4 className="text-sm font-semibold text-white">Equity & Mutual Funds</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Nifty 50 Index Fund</span>
                  <span className="font-semibold text-white">₹12,40,000 <span className="text-xs text-emerald-400 ml-1">+14.2%</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Parag Parikh Flexi Cap</span>
                  <span className="font-semibold text-white">₹8,10,000 <span className="text-xs text-emerald-400 ml-1">+18.5%</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Direct Indian Stocks</span>
                  <span className="font-semibold text-white">₹5,20,000 <span className="text-xs text-emerald-400 ml-1">+9.8%</span></span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-4">
              <h4 className="text-sm font-semibold text-white">Fixed & Debt Portfolio</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Employees' Provident Fund (EPF)</span>
                  <span className="font-semibold text-white">₹9,50,000 <span className="text-xs text-slate-400 ml-1">8.25% p.a.</span></span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-slate-300">Public Provident Fund (PPF)</span>
                  <span className="font-semibold text-white">₹3,20,000 <span className="text-xs text-slate-400 ml-1">7.1% p.a.</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">HDFC Bank Fixed Deposit</span>
                  <span className="font-semibold text-white">₹4,00,000 <span className="text-xs text-slate-400 ml-1">7.2% p.a.</span></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'cashflow' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">Total Inflow (October)</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">+₹2,10,000</div>
              <div className="text-xs text-slate-500 mt-1">Salary + Dividends</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">Total Outflow & EMIs</div>
              <div className="text-2xl font-bold text-rose-400 mt-1">-₹98,400</div>
              <div className="text-xs text-slate-500 mt-1">Rent, Groceries, EMIs</div>
            </div>
            <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="text-xs text-slate-400">Net Investible Surplus</div>
              <div className="text-2xl font-bold text-sky-400 mt-1">₹1,11,600</div>
              <div className="text-xs text-slate-500 mt-1">53.1% Savings Rate</div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}