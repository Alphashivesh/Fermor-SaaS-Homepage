import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: "Rahul Sharma", role: "Software Engineer", text: "Fermor caught a ₹1,200 AWS charge I forgot about for 6 months. Paid for itself instantly." },
  { name: "Priya Desai", role: "Product Manager", text: "Finally, a net worth tracker that understands Indian EPF and PPF correctly. The UI is absolutely gorgeous." },
  { name: "Amit Patel", role: "Freelancer", text: "The AI assistant is insane. I asked if I could afford a new MacBook this month and it analyzed my exact cash flow." },
  { name: "Neha Gupta", role: "Doctor", text: "I threw away my complex Excel sheets. The live sync with my HDFC and Zerodha accounts is flawless." },
  { name: "Vikram Singh", role: "Startup Founder", text: "The FIRE timeline simulator changed how I look at my SIPs. Incredible visualization." }
];

export default function TestimonialMarquee() {
  return (
    <section className="py-20 border-y border-slate-800/80 bg-slate-900/20 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#0B0F19] to-transparent z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#0B0F19] to-transparent z-10" />

      <div className="text-center mb-12 relative z-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Trusted by 4,200+ Indian Professionals</h2>
      </div>

      <div className="flex w-[200%]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex gap-6 px-3"
        >
          {/* Double the array to create a seamless infinite loop */}
          {[...testimonials, ...testimonials].map((t, idx) => (
            <div key={idx} className="w-[350px] shrink-0 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={14} className="text-emerald-400 fill-emerald-400" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-slate-950 font-bold text-sm shadow-inner">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-bold text-sm">{t.name}</div>
                  <div className="text-slate-500 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}