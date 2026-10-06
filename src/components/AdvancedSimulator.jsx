import React, { useState, useMemo } from 'react';
import { Target, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdvancedSimulator() {
  const [sip, setSip] = useState(25000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  // Dynamically generate chart data based on slider inputs
  const chartData = useMemo(() => {
    const data = [];
    let totalInvested = 0;
    let totalWealth = 0;
    const monthlyRate = rate / 12 / 100;

    for (let i = 0; i <= years; i++) {
      if (i === 0) {
        data.push({ year: `Year 0`, invested: 0, wealth: 0 });
        continue;
      }
      totalInvested += sip * 12;
      // Compound interest formula for SIP
      const months = i * 12;
      totalWealth = sip * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
      
      data.push({
        year: `Year ${i}`,
        invested: Math.round(totalInvested),
        wealth: Math.round(totalWealth),
      });
    }
    return data;
  }, [sip, years, rate]);

  const finalData = chartData[chartData.length - 1];
  const formatINR = (val) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  
  // Custom Tooltip for the Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-2xl">
          <p className="text-slate-300 font-semibold mb-2">{label}</p>
          <p className="text-emerald-400 text-sm font-bold">Total Wealth: {formatINR(payload[0].value)}</p>
          <p className="text-slate-400 text-sm mt-1">Invested: {formatINR(payload[1].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="simulator" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[#0B132B] to-slate-900 border border-slate-700/60 rounded-[2.5rem] p-6 sm:p-12 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Controls - Left Side (Col span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                <Target className="text-emerald-400" size={28} /> Wealth Engine
              </h3>
              <p className="text-slate-400 text-sm">Real-time compounding visualization based on Indian market averages.</p>
            </div>

            <div className="space-y-6">
              {/* SIP Slider */}
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <div className="flex justify-between mb-3 text-sm">
                  <span className="font-semibold text-slate-300">Monthly SIP</span>
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{formatINR(sip)}</span>
                </div>
                <input 
                  type="range" min={5000} max={200000} step={5000} value={sip} 
                  onChange={(e) => setSip(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Years Slider */}
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <div className="flex justify-between mb-3 text-sm">
                  <span className="font-semibold text-slate-300">Time Horizon</span>
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{years} Years</span>
                </div>
                <input 
                  type="range" min={5} max={35} step={1} value={years} 
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Rate Slider */}
              <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800">
                <div className="flex justify-between mb-3 text-sm">
                  <span className="font-semibold text-slate-300">Expected CAGR</span>
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md">{rate}%</span>
                </div>
                <input 
                  type="range" min={8} max={18} step={0.5} value={rate} 
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Chart & Results - Right Side (Col span 7) */}
          <div className="lg:col-span-7 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-inner flex flex-col h-full">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">Projected Net Worth</div>
                <motion.div 
                  key={finalData.wealth}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight"
                >
                  {formatINR(finalData.wealth)}
                </motion.div>
              </div>
              <div className="text-right hidden sm:block">
                <div className="text-slate-400 text-xs font-semibold uppercase tracking-widest mb-1">Total Invested</div>
                <div className="text-xl font-bold text-slate-300">{formatINR(finalData.invested)}</div>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="flex-1 min-h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorWealth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" hide />
                  <YAxis hide domain={['dataMin', 'dataMax']} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area 
                    type="monotone" 
                    dataKey="wealth" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorWealth)" 
                    animationDuration={500}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="invested" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorInvested)" 
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
              <Info className="text-sky-400 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-slate-400 leading-relaxed">
                This projection assumes a constant annual growth rate. Real market returns will fluctuate. The <span className="text-sky-400 font-semibold">blue area</span> represents your invested capital, while the <span className="text-emerald-400 font-semibold">green area</span> shows the exponential power of compound interest.
              </p>
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}