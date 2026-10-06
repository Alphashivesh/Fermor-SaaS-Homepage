import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "How does Fermor access my bank data?",
    a: "Fermor uses the RBI-approved Account Aggregator (AA) framework. This means we establish a secure, read-only connection to your banks. We cannot move your money, and you can revoke our access with a single click at any time."
  },
  {
    q: "Is my financial data sold to third parties?",
    a: "Never. Our business model relies on our Pro subscription, not on selling your data. We do not run ads, and we do not sell lead data to loan or credit card companies."
  },
  {
    q: "Can the AI Assistant execute trades for me?",
    a: "No. The AI Assistant acts as a copilot to provide insights, flag hidden expenses, and model scenarios. It does not have the authorization to execute trades, make transfers, or close accounts on your behalf."
  },
  {
    q: "What happens if I cancel my Pro subscription?",
    a: "If you cancel Fermor Pro, your account will instantly be downgraded to the Free tier at the end of your billing cycle. You will retain your historical net worth data, but lose access to the AI assistant and unlimited sync capabilities."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-slate-400">Everything you need to know about the product and billing.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span className="font-semibold text-white">{faq.q}</span>
              <motion.div
                animate={{ rotate: openIndex === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-slate-400 shrink-0 ml-4"
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-4">
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}