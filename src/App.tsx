import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { PinnedStorytelling3D } from './components/PinnedStorytelling3D';
import { ProblemSection } from './components/ProblemSection';
import { TransformationSection } from './components/TransformationSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { BusinessScenario } from './components/BusinessScenario';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { VisionSection } from './components/VisionSection';
import { FinalCTASection } from './components/FinalCTASection';
import { DemoModal } from './components/DemoModal';

export const App: React.FC = () => {
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#07080B] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-clip">
      
      {/* SECTION 1: NAVIGATION */}
      <Navigation onRequestDemo={() => setDemoModalOpen(true)} />

      {/* MAIN STORYTELLING EXPERIENCE */}
      <main className="relative z-10 flex-1">
        
        {/* SECTION 2: HERO — THE BIG IDEA */}
        <Hero onRequestDemo={() => setDemoModalOpen(true)} />

        {/* SIGNATURE 3D LIVING TOPOLOGY ODYSSEY (PINNED SCENE) */}
        <section id="living-topology" className="relative">
          <PinnedStorytelling3D />
        </section>

        {/* SECTION 3: THE PROBLEM — DISCONNECTED SILOS & INTERACTIVE SURGE SIMULATION */}
        <ProblemSection />

        {/* SECTION 4: THE TRANSFORMATION — RECONNECTION & 3 PILLARS */}
        <TransformationSection />

        {/* SECTION 5: HOW IT WORKS — THE 5-STAGE OPERATING LOOP */}
        <HowItWorksSection />

        {/* SECTION 6: A CONCRETE BUSINESS EXAMPLE — MULTI-SIGNAL CAUSALITY & DECISION SANDBOX */}
        <BusinessScenario />

        {/* SECTION 7: CORE CAPABILITIES — EDITORIAL DOSSIER SHOWCASE */}
        <CapabilitiesSection />

        {/* SECTION 8: THE BIGGER VISION — LIVING ENTERPRISE HORIZON */}
        <VisionSection onRequestDemo={() => setDemoModalOpen(true)} />

        {/* SECTION 9: FINAL CTA & ENTERPRISE TRUST FOOTER */}
        <FinalCTASection onRequestDemo={() => setDemoModalOpen(true)} />
      </main>

      {/* Interactive Executive Demo Modal */}
      <DemoModal
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
      />
    </div>
  );
};

export default App;
