import React, { useRef, useState } from 'react';
import { ShieldCheck, Lock, EyeOff, Server, Fingerprint, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

// Spotlight Card Component
const SpotlightCard = ({ children, className }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 transition-colors hover:bg-slate-900/60 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(16,185,129,0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function TrustSection() {
  return (
    <section id="security" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-400 mb-6 uppercase tracking-wider">
          <Fingerprint size={14} /> Zero-Knowledge Architecture
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          Your financial privacy is <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">non-negotiable.</span>
        </h2>
        <p className="text-slate-400 text-lg">
          Fermor operates on read-only principles. We never touch, move, or monetize your funds.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard className="md:col-span-2">
          <Lock size={28} className="text-emerald-400 mb-6" />
          <h3 className="text-2xl font-bold text-white mb-2">256-Bit Military Encryption</h3>
          <p className="text-slate-400 leading-relaxed max-w-md">
            All telemetry is encrypted end-to-end matching Tier-1 banking security requirements. Your data is scrambled before it ever leaves your device.
          </p>
        </SpotlightCard>

        <SpotlightCard>
          <EyeOff size={28} className="text-sky-400 mb-6" />
          <h3 className="text-xl font-bold text-white mb-2">No Ads. No Selling.</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            We never monetize your data or sell marketing leads to predatory loan agents. You are the customer, not the product.
          </p>
        </SpotlightCard>

        <SpotlightCard>
          <Server size={28} className="text-amber-400 mb-6" />
          <h3 className="text-xl font-bold text-white mb-2">RBI Account Aggregator</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Seamlessly connect verified accounts via RBI-licensed protocols with explicit, revocable user consent.
          </p>
        </SpotlightCard>

        <SpotlightCard className="md:col-span-2 flex flex-col justify-center items-center text-center">
          <Zap size={28} className="text-emerald-400 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Continuous Audits</h3>
          <p className="text-slate-400 text-sm">Our infrastructure is penetration-tested weekly by independent security firms to ensure zero vulnerabilities.</p>
        </SpotlightCard>
      </div>
    </section>
  );
}