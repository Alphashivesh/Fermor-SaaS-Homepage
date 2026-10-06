import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight, Wallet, Activity, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FinancialCockpit() {
  const [activeTab, setActiveTab] = useState('networth');
  
  // Real-time Data States
  const [netWorth, setNetWorth] = useState(4824500);
  const [niftyValue, setNiftyValue] = useState(1240000);
  const [trend, setTrend] = useState('up'); // 'up' or 'down'

  // Format INR cleanly
  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  // Simulated WebSocket Data Feed
  useEffect(() => {
    const interval = setInterval(() => {
      // Create a random market fluctuation (0.01% to 0.05%)
      const volatility = (Math.random() * 0.0005) + 0.0001; 
      const isUp = Math.random() > 0.4; // 60% chance of market going up

      setTrend(isUp ? 'up' : 'down');

      setNetWorth(prev => {
        const change = prev * volatility;
        return isUp ? prev + change : prev - change;
      });

      setNiftyValue(prev => {
        const change = prev * (volatility * 1.5); // Equity is more volatile
        return isUp ? prev + change : prev - change;
      });
    }, 4000); // Ticks every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const contentVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(4px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -15, filter: "blur(4px)", transition: { duration: 0.3 } }
  };

  return (
    <section id="cockpit" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Your entire financial life, <span className="text-emerald-400">unified.</span>
        </h2>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
          Interact with the live simulation below. This is how Fermor consolidates scattered accounts into actionable intelligence.
        </p>
      </motion.div>

      <motion.div 
        layout
        className="bg-[#0B132B]/80 backdrop-blur-xl border border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-[0_0_40px_rgba(16,185,129,0.05)]"
      >
        
        {/* Control Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-700/50 pb-6">
          <div className="flex items-center gap-3">
            <div className="relative p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <Activity size={24} className="text-emerald-400" />
              {/* Pulsing Live Indicator */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white leading-tight">Live Telemetry</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">Active Sync</span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Stream connected via Account Aggregator</p>
            </div>
          </div>

          <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-slate-700/50 w-full sm:w-auto relative">
            {['networth', 'allocation', 'cashflow'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-lg capitalize transition-colors duration-300 ${
                  activeTab === tab ? 'text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBadge"
                    className="absolute inset-0 bg-emerald-500 rounded-lg -z-10 shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab === 'networth' ? 'Net Worth' : tab === 'allocation' ? 'Holdings' : 'Cash Flow'}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic State Content */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'networth' && (
              <motion.div key="networth" variants={contentVariants} initial="hidden" animate="visible" exit="exit">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 hover:border-emerald-500/30 transition-colors cursor-default">
                    <div className="text-sm font-medium text-slate-400 mb-2">Total Net Worth</div>
                    
                    {/* Live Ticking Number */}
                    <motion.div 
                      key={netWorth}
                      initial={{ color: trend === 'up' ? '#10b981' : '#f43f5e' }}
                      animate={{ color: '#ffffff' }}
                      transition={{ duration: 1 }}
                      className="text-4xl font-extrabold tracking-tight"
                    >
                      {formatINR(netWorth)}
                    </motion.div>
                    
                    <div className={`flex items-center gap-1.5 text-sm mt-3 font-bold inline-flex px-2 py-1 rounded-md transition-colors duration-500 ${trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
                      {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                      Live Market Sync
                    </div>
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50 cursor-default">
                    <div className="text-sm font-medium text-slate-400 mb-2">Liquid Assets</div>
                    <div className="text-3xl font-bold text-white tracking-tight">₹8,50,000</div>
                    <div className="text-xs text-slate-500 mt-3 font-medium">6.2 months emergency cover</div>
                  </motion.div>
                  
                  <motion.div whileHover={{ y: -5 }} className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50 cursor-default">
                    <div className="text-sm font-medium text-slate-400 mb-2">Active Liabilities</div>
                    <div className="text-3xl font-bold text-rose-400 tracking-tight">₹14,20,000</div>
                    <div className="text-xs text-slate-500 mt-3 font-medium">Home Loan • Next EMI in 8 days</div>
                  </motion.div>
                </div>

                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
                  <div className="flex justify-between items-center text-sm font-medium text-slate-300 mb-4">
                    <span>Asset Distribution</span>
                  </div>
                  <div className="h-4 w-full bg-slate-800 rounded-full flex overflow-hidden shadow-inner">
                    <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} transition={{ duration: 1, ease: "easeOut" }} className="bg-emerald-500" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '25%' }} transition={{ duration: 1, delay: 0.1, ease: "easeOut" }} className="bg-sky-500" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '20%' }} transition={{ duration: 1, delay: 0.2, ease: "easeOut" }} className="bg-amber-500" />
                    <motion.div initial={{ width: 0 }} animate={{ width: '10%' }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} className="bg-purple-500" />
                  </div>
                  <div className="flex flex-wrap gap-6 mt-5 text-sm font-medium text-slate-400">
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"/> Equity (45%)</span>
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.5)]"/> EPF/PPF (25%)</span>
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"/> Bank (20%)</span>
                    <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"/> Gold (10%)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'allocation' && (
              <motion.div key="allocation" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6">
                  <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                    <TrendingUp size={18} className="text-emerald-400" /> Market Linked
                  </h4>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                      <div>
                        <div className="font-semibold text-slate-200">Nifty 50 Index Fund</div>
                        <div className="text-xs text-slate-500 mt-1">Mutual Fund • Direct Growth</div>
                      </div>
                      <div className="text-right">
                        {/* Live Ticking Nifty Value */}
                        <motion.div 
                          key={niftyValue}
                          initial={{ color: trend === 'up' ? '#10b981' : '#f43f5e' }}
                          animate={{ color: '#ffffff' }}
                          transition={{ duration: 1 }}
                          className="font-bold text-white"
                        >
                          {formatINR(niftyValue)}
                        </motion.div>
                        <div className="text-xs font-bold text-emerald-400 mt-1">+14.2% XIRR</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-200">Direct Equities</div>
                        <div className="text-xs text-slate-500 mt-1">Zerodha Demat</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹5,20,000</div>
                        <div className="text-xs font-bold text-emerald-400 mt-1">+9.8% XIRR</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-800/20 border border-slate-700/50 rounded-2xl p-6">
                  <h4 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                    <Wallet size={18} className="text-sky-400" /> Fixed Income
                  </h4>
                  <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-slate-700/50 pb-4">
                      <div>
                        <div className="font-semibold text-slate-200">Employees' Provident Fund</div>
                        <div className="text-xs text-slate-500 mt-1">EPFO Portal</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹9,50,000</div>
                        <div className="text-xs font-bold text-slate-400 mt-1">8.25% p.a.</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-200">HDFC Fixed Deposit</div>
                        <div className="text-xs text-slate-500 mt-1">Matures in 14 months</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">₹4,00,000</div>
                        <div className="text-xs font-bold text-slate-400 mt-1">7.2% p.a.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'cashflow' && (
              <motion.div key="cashflow" variants={contentVariants} initial="hidden" animate="visible" exit="exit" className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 cursor-default">
                    <div className="text-sm font-medium text-slate-400 mb-2">Total Inflow (Oct)</div>
                    <div className="text-3xl font-bold text-emerald-400 tracking-tight">+₹2,10,000</div>
                    <div className="text-xs text-slate-500 mt-3 font-medium">Salary + Dividends</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-gradient-to-br from-rose-500/10 to-transparent border border-rose-500/20 cursor-default">
                    <div className="text-sm font-medium text-slate-400 mb-2">Total Outflow & EMIs</div>
                    <div className="text-3xl font-bold text-rose-400 tracking-tight">-₹98,400</div>
                    <div className="text-xs text-slate-500 mt-3 font-medium">Rent, Groceries, Home Loan</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 cursor-default">
                    <div className="text-sm font-medium text-slate-400 mb-2">Investible Surplus</div>
                    <div className="text-3xl font-bold text-sky-400 tracking-tight">₹1,11,600</div>
                    <div className="text-xs text-slate-500 mt-3 font-medium">53.1% Savings Rate</div>
                  </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}