import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { WhatSynapseDoes } from './components/WhatSynapseDoes';
import { FinalCTASection } from './components/FinalCTASection';
import { DemoModal } from './components/DemoModal';

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  useEffect(() => {
    // Handle initial hash routing
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#07080B] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-clip">
      
      {/* 01: GLOBAL NAVIGATION */}
      <Navigation onRequestDemo={() => setDemoModalOpen(true)} />

      {/* MAIN STORYTELLING EXPERIENCE */}
      <main className="relative z-10 flex-1">
        
        {/* SECTION 1: HERO — THE CENTRAL PROPOSITION & 3D ENTERPRISE NETWORK */}
        <Hero onRequestDemo={() => setDemoModalOpen(true)} />

        {/* SECTION 2: THE PROBLEM — DISCONNECTED SYSTEMS & SILOED BLIND SPOTS */}
        <ProblemSection />

        {/* SECTION 3: WHAT SYNAPSE DOES — 3 CAPABILITIES & OPTIONAL INLINE INTERACTIVE SCENARIO */}
        <WhatSynapseDoes onRequestDemo={() => setDemoModalOpen(true)} />

        {/* SECTION 4 & 5: FINAL CTA & MINIMAL ENTERPRISE FOOTER */}
        <FinalCTASection onRequestDemo={() => setDemoModalOpen(true)} />
      </main>

      {/* Executive Demo Registration Dialog */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
};

export default App;
