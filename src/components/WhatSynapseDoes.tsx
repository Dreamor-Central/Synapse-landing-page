import React, { useState, useRef } from 'react';
import { Eye, Compass, Sliders, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { ContinuousEnterprise3D, type VisualizationMode } from './ContinuousEnterprise3D';
import { CORE_CAPABILITIES } from '../data/enterpriseData';
import type { CapabilityState } from '../types';
import { InteractiveBusinessScenario } from './InteractiveBusinessScenario';

interface WhatSynapseDoesProps {
  onRequestDemo: () => void;
  openScenarioDirectly?: boolean;
}

export const WhatSynapseDoes: React.FC<WhatSynapseDoesProps> = ({
  onRequestDemo,
  openScenarioDirectly = false
}) => {
  const [activeCapability, setActiveCapability] = useState<CapabilityState>('understand');
  const [scenarioOpen, setScenarioOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('scenario') === 'open' || params.get('scenario') === 'true') {
        return true;
      }
    }
    return openScenarioDirectly;
  });
  const scenarioSectionRef = useRef<HTMLDivElement>(null);

  const capabilityIcons = {
    understand: Eye,
    anticipate: Compass,
    orchestrate: Sliders
  };

  const handleOpenScenario = () => {
    setScenarioOpen(true);
    setTimeout(() => {
      scenarioSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const activeCap = CORE_CAPABILITIES.find(c => c.id === activeCapability) || CORE_CAPABILITIES[0];

  return (
    <section id="capabilities" className="relative py-24 lg:py-32 bg-[#08090d] border-b border-white/[0.06] overflow-hidden">
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-950/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>WHAT SYNAPSE DOES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-sans">
            Understand what's happening.<br />
            See what's coming.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              Decide what to do.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            SYNAPSE provides three interconnected capabilities that help your organisation move from fragmented visibility to coordinated execution.
          </p>
        </div>

        {/* The 3 Core Capabilities & 3D Network State Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Left Column: 3 Interactive Capability Switchers (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            {CORE_CAPABILITIES.map((cap) => {
              const IconComp = capabilityIcons[cap.id];
              const isSelected = activeCapability === cap.id;

              return (
                <div
                  key={cap.id}
                  onClick={() => setActiveCapability(cap.id)}
                  className={`p-6 rounded-2xl border cursor-pointer transition-all duration-300 text-left ${
                    isSelected
                      ? 'bg-[#0f1522] border-cyan-500/60 shadow-[0_4px_30px_rgba(56,189,248,0.18)] -translate-y-0.5'
                      : 'bg-[#0a0d14]/80 border-white/[0.06] hover:bg-white/[0.03] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-white/[0.04] text-slate-400'
                      }`}>
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                        {cap.step} // {cap.title}
                      </span>
                    </div>

                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                    }`} />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
                    {cap.headline}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {cap.description}
                  </p>

                  {/* Bullet points visible on active card */}
                  {isSelected && (
                    <div className="pt-3 border-t border-white/[0.08] space-y-2 animate-in fade-in duration-300">
                      {cap.points.map((pt, i) => (
                        <div key={i} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Enterprise Visualizer Synchronized with Capability State (7 Cols) */}
          <div className="lg:col-span-7 h-[420px] sm:h-[480px] lg:h-[540px] relative w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-gradient-to-b from-[#0a0e16] to-[#07090e] shadow-2xl">
            <ContinuousEnterprise3D
              mode={activeCapability as VisualizationMode}
              interactive={true}
            />

            {/* Dynamic Status Overlay */}
            <div className="absolute top-4 left-4 right-4 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 border border-white/10 backdrop-blur-md text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="uppercase text-cyan-300 font-semibold">{activeCap.title}:</span>
                <span className="hidden sm:inline text-slate-400">{activeCap.visualFocus}</span>
              </div>
            </div>

            {/* Bottom State Explanation Pill */}
            <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
              <div className="p-3 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md text-[11px] text-slate-300 font-mono leading-relaxed">
                {activeCap.visualStateDescription}
              </div>
            </div>
          </div>

        </div>

        {/* 5.1 — THE SUBTLE INVITATION TO EXPLORE A BUSINESS SCENARIO */}
        <div ref={scenarioSectionRef} className="pt-8">
          {!scenarioOpen ? (
            <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0d131f] via-[#101726] to-[#0d131f] border border-cyan-500/25 shadow-xl text-center max-w-3xl mx-auto transition-all hover:border-cyan-500/40">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-4">
                <span>EXPLORE SYNAPSE IN ACTION</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 font-sans">
                Curious what this looks like in a real business?
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto mb-6">
                See how one business challenge can reveal connections across an entire organisation.
              </p>

              <button
                onClick={handleOpenScenario}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-cyan-300 hover:text-white bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/50 rounded-xl transition-all shadow-[0_0_20px_rgba(56,189,248,0.2)] active:scale-[0.98] cursor-pointer"
              >
                <span>Explore a Business Scenario</span>
                <ArrowRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          ) : (
            /* 5.2 & 5.3 — THE IMMERSIVE INLINE INTERACTIVE BUSINESS SCENARIO */
            <InteractiveBusinessScenario
              isOpen={scenarioOpen}
              onClose={() => setScenarioOpen(false)}
              onRequestDemo={onRequestDemo}
            />
          )}
        </div>

      </div>
    </section>
  );
};
