import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, CheckCircle2 } from 'lucide-react';

export default function ProAdvisorMode() {
  const [formData, setFormData] = useState({ 
    goal: 'Buy a House', 
    horizon: '5 Years', 
    risk: 'Aggressive' 
  });
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    { role: 'user', content: "I want to buy a house in 5 years. I'm willing to take high risks to get there faster." },
    { role: 'ai', content: "Understood. I've updated your structured plan with an Aggressive risk profile mapped to a 60-month horizon." }
  ]);

  // Handle Dropdown Changes and Trigger AI Response
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsTyping(true);
    
    // Simulate AI reacting to the form change
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [
        ...prev,
        { role: 'ai', content: `Got it. I have adjusted your ${field} parameter to "${value}". I am recalculating your SIP trajectory now.` }
      ]);
    }, 1200);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-slate-800/50">
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Meet your <span className="text-emerald-400">Pro Advisor.</span>
        </h2>
        <p className="text-slate-400 text-lg">Change the parameters below and watch the AI instantly adapt your plan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-slate-900/40 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
        
        {/* Left Side: Interactive Structured Plan */}
        <div className="space-y-6 bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
          <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-4 flex items-center justify-between">
            Structured Plan <CheckCircle2 size={18} className="text-emerald-400" />
          </h3>
          <div className="space-y-4">
            
            {/* Primary Goal Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Primary Goal</label>
              <select 
                value={formData.goal}
                onChange={(e) => handleChange('goal', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
              >
                <option value="Buy a House">Buy a House</option>
                <option value="Retire Early (FIRE)">Retire Early (FIRE)</option>
                <option value="Start a Business">Start a Business</option>
                <option value="Child's Education">Child's Education</option>
              </select>
            </div>

            {/* Time Horizon Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Time Horizon</label>
              <select 
                value={formData.horizon}
                onChange={(e) => handleChange('horizon', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
              >
                <option value="1 Year">1 Year (Short Term)</option>
                <option value="2 Years">2 Years (Mid Term)</option>
                <option value="5 Years">5 Years (Long Term)</option>
                <option value="10+ Years">10+ Years (Decade Strategy)</option>
              </select>
            </div>

            {/* Risk Profile Dropdown */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Risk Profile</label>
              <select 
                value={formData.risk}
                onChange={(e) => handleChange('risk', e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer appearance-none"
              >
                <option value="Conservative">Conservative (Low Yield, Safe)</option>
                <option value="Neutral">Neutral (Balanced Index)</option>
                <option value="Aggressive">Aggressive (High Equity Exposure)</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Side: Dynamic AI Chat */}
        <div className="flex flex-col gap-4 p-6 bg-[#0B132B]/80 rounded-2xl border border-slate-700/50 relative overflow-y-auto max-h-[400px]">
          <AnimatePresence>
            {chatHistory.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start gap-4 ${msg.role === 'ai' ? 'mt-2' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'ai' ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-slate-800 border-slate-700'}`}>
                  {msg.role === 'ai' ? <Bot size={14} className="text-emerald-400"/> : <User size={14} className="text-slate-300"/>}
                </div>
                <div className={`text-sm px-4 py-3 rounded-2xl rounded-tl-none border ${msg.role === 'ai' ? 'bg-emerald-500/10 text-emerald-50 border-emerald-500/20' : 'bg-slate-800 text-slate-200 border-slate-700'}`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4 mt-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30"><Bot size={14} className="text-emerald-400"/></div>
              <div className="bg-emerald-500/10 text-emerald-50 text-sm px-4 py-3 rounded-2xl rounded-tl-none border border-emerald-500/20">
                <span className="flex gap-1 items-center h-5"><motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1.5 h-1.5 bg-emerald-400 rounded-full"/></span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}