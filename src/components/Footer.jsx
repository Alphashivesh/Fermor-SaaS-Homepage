import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer id="waitlist" className="border-t border-slate-800/80 bg-slate-950 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Waitlist Box */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 sm:p-12 rounded-3xl border border-slate-800 text-center mb-16 relative overflow-hidden">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to upgrade your financial life?
          </h3>
          <p className="text-slate-400 text-sm max-w-md mx-auto mt-2 mb-6">
            Join 4,200+ Indian professionals currently testing the Fermor private beta.
          </p>

          {subscribed ? (
            <div className="inline-flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-xl font-semibold text-sm">
              <Check size={18} /> You're on the priority waitlist! We'll reach out soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 justify-center max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 flex-1"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-sm font-bold transition"
              >
                Join Waitlist
              </button>
            </form>
          )}
        </div>

        {/* Directory & Copyright */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs text-slate-400 mb-12">
          <div>
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider">Free Calculators</h5>
            <ul className="space-y-2">
              <li><a href="#simulator" className="hover:text-emerald-400">SIP Calculator</a></li>
              <li><a href="#simulator" className="hover:text-emerald-400">Home Loan Prepayment</a></li>
              <li><a href="#simulator" className="hover:text-emerald-400">FIRE Retirement Modeler</a></li>
              <li><a href="#simulator" className="hover:text-emerald-400">Income Tax (New Regime)</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider">Product</h5>
            <ul className="space-y-2">
              <li><a href="#cockpit" className="hover:text-emerald-400">Net Worth Cockpit</a></li>
              <li><a href="#pillars" className="hover:text-emerald-400">Fermor AI Assistant</a></li>
              <li><a href="#pillars" className="hover:text-emerald-400">Expense Leaks</a></li>
              <li><a href="#security" className="hover:text-emerald-400">Security Architecture</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider">Company</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400">About Fermor</a></li>
              <li><a href="#" className="hover:text-emerald-400">Product Roadmap</a></li>
              <li><a href="#" className="hover:text-emerald-400">Careers</a></li>
              <li><a href="#" className="hover:text-emerald-400">Contact Team</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3 uppercase tracking-wider">Legal & Compliance</h5>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-emerald-400">Terms of Service</a></li>
              <li><a href="#" className="hover:text-emerald-400">Account Aggregator Notice</a></li>
              <li><a href="#" className="hover:text-emerald-400">Security Whitepaper</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 pt-8 border-t border-slate-900 gap-4">
          <p>© {new Date().getFullYear()} Fermor Technologies India Pvt. Ltd. All rights reserved.</p>
          <p>Designed for clarity, built for financial freedom.</p>
        </div>
      </div>
    </footer>
  );
}