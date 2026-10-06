import React, { useState, useEffect } from 'react';
import { Bot, User, Sparkles, Command, ArrowRight, Ban, Loader2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AIAssistant() {
  const [activePrompt, setActivePrompt] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [actionState, setActionState] = useState('idle'); // idle, loading, success

  const prompts = [
    {
      query: "Can I prepay ₹3L on my home loan right now?",
      response: "Yes. Your current liquid reserves are ₹8.5L (exceeding your 6-month safety threshold of ₹5.5L). Prepaying ₹3L today will save you ₹5.12L in interest and shorten your loan tenure by 23 months."
    },
    {
      query: "Analyze my monthly subscriptions.",
      response: "I found 4 recurring debits totaling ₹4,890 this month: Netflix (₹649), AWS Cloud (₹2,100), Gym (₹1,500), and an inactive Hotstar tier (₹641). I can block the Hotstar mandate for you right now.",
      action: {
        title: "Disney+ Hotstar",
        subtitle: "Mandate ID: HDF-99281 • ₹641/mo",
        btnText: "Block Future Charges"
      }
    },
    {
      query: "Am I on track for ₹1 Crore by age 35?",
      response: "Based on your current SIP rate of ₹42,000/mo and a conservative 12% CAGR, you are projected to hit ₹1.08 Crore at age 34 and 7 months. You are ahead of schedule."
    }
  ];

  // Reset states when switching prompts
  useEffect(() => {
    setActionState('idle');
    setIsTyping(true);
    setDisplayedText('');
    
    let i = 0;
    const fullText = prompts[activePrompt].response;
    
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 20); 

    return () => clearInterval(typingInterval);
  }, [activePrompt]);

  const handleAIAction = () => {
    setActionState('loading');
    setTimeout(() => setActionState('success'), 2000); // Simulate API call to bank
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Context */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 mb-6 uppercase tracking-wider">
            <Command size={14} /> Context-Aware AI
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ask questions. <br/> Get <span className="text-emerald-400">financial clarity.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Unlike generic chatbots, Fermor's intelligence is grounded in your actual bank telemetry. It knows your cash flow, your debts, and your goals.
          </p>
          
          <div className="space-y-3">
            {prompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setActivePrompt(idx)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between group ${
                  activePrompt === idx 
                    ? 'bg-slate-800 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]' 
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                }`}
              >
                <span className={`text-sm font-medium ${activePrompt === idx ? 'text-white' : 'text-slate-300'}`}>
                  "{p.query}"
                </span>
                <ArrowRight 
                  size={16} 
                  className={`transition-colors ${activePrompt === idx ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`} 
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Chat Terminal */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#0B132B]/90 backdrop-blur-xl border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl relative h-[450px] flex flex-col"
        >
          {/* Terminal Header */}
          <div className="bg-slate-900/80 border-b border-slate-700/50 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-4 text-xs font-medium text-slate-500">fermor-intelligence-engine</span>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`chat-${activePrompt}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {/* User Message */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                    <User className="text-slate-300" size={16} />
                  </div>
                  <div className="bg-slate-800 text-slate-200 text-sm px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700">
                    {prompts[activePrompt].query}
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Bot className="text-emerald-400" size={16} />
                  </div>
                  <div className="flex flex-col gap-3 max-w-[85%]">
                    <div className="bg-emerald-500/10 text-emerald-50 text-sm px-4 py-3 rounded-2xl rounded-tl-none border border-emerald-500/20 leading-relaxed shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                      {displayedText}
                      {isTyping && (
                        <motion.span 
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block w-1.5 h-4 ml-1 bg-emerald-400 align-middle" 
                        />
                      )}
                    </div>
                    
                    {/* Generative UI Component */}
                    {!isTyping && prompts[activePrompt].action && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-lg"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-white font-bold text-sm">{prompts[activePrompt].action.title}</h4>
                            <p className="text-slate-400 text-xs mt-0.5">{prompts[activePrompt].action.subtitle}</p>
                          </div>
                          <Ban className="text-rose-400 opacity-50" size={18} />
                        </div>
                        
                        {actionState === 'idle' && (
                          <button 
                            onClick={handleAIAction}
                            className="w-full py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-lg text-xs font-bold transition-colors"
                          >
                            {prompts[activePrompt].action.btnText}
                          </button>
                        )}
                        
                        {actionState === 'loading' && (
                          <div className="w-full py-2 bg-slate-800 text-slate-400 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border border-slate-700">
                            <Loader2 className="animate-spin" size={14} /> Processing via API...
                          </div>
                        )}
                        
                        {actionState === 'success' && (
                          <div className="w-full py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                            <CheckCircle2 size={14} /> Mandate Blocked
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}