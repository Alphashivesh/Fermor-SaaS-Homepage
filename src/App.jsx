import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import IntegrationMarquee from './components/IntegrationMarquee'; // NEW
import CostOfInaction from './components/CostOfInaction'; // NEW
import FinancialCockpit from './components/FinancialCockpit';
import AIAssistant from './components/AIAssistant';
import ExpenseRadar from './components/ExpenseRadar';
import AdvancedSimulator from './components/AdvancedSimulator';
import TestimonialMarquee from './components/TestimonialMarquee';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import TrustSection from './components/TrustSection';
import Footer from './components/Footer';
import BankLinkModal from './components/BankLinkModal';
import TrialModal from './components/TrialModal';
import VideoModal from './components/VideoModal';
import CommandPalette from './components/CommandPalette';
import LiveActivityFeed from './components/LiveActivityFeed';
import FloatingDock from './components/FloatingDock'; // NEW
import AuroraBackground from './components/AuroraBackground';
import ProAdvisorMode from './components/ProAdvisorMode';
import MilestoneScheduler from './components/MilestoneScheduler';
import ResourceHub from './components/ResourceHub';
import ConnectionMap from './components/ConnectionMap';

export default function App() {
  const [isBankModalOpen, setIsBankModalOpen] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-400 relative overflow-x-hidden pb-24 md:pb-0">

      <AuroraBackground />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-[150] shadow-[0_0_10px_rgba(16,185,129,0.8)]"
        style={{ scaleX }}
      />

      {/* Global Overlays & Docks */}
      <FloatingDock />
      <VideoModal />
      <CommandPalette onOpenBankModal={() => setIsBankModalOpen(true)} />
      <BankLinkModal isOpen={isBankModalOpen} onClose={() => setIsBankModalOpen(false)} />
      <TrialModal isOpen={isTrialModalOpen} onClose={() => setIsTrialModalOpen(false)} />
      <LiveActivityFeed />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero onOpenBankModal={() => setIsBankModalOpen(true)} />
          <IntegrationMarquee />
          <CostOfInaction />
          <FinancialCockpit />

          {/* The 4 New Premium Features */}
          <ProAdvisorMode />
          <MilestoneScheduler />
          <ConnectionMap />

          <div id="ai-assistant">
            <AIAssistant />
          </div>

          <ExpenseRadar />
          <AdvancedSimulator />

          {/* The Material Hub */}
          <ResourceHub />

          <TestimonialMarquee />
          <Pricing onOpenTrialModal={() => setIsTrialModalOpen(true)} />
          <FAQ />
          <TrustSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}