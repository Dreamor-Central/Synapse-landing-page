import React, { useState } from 'react';
import { Layers, Network, Compass, Sliders, CheckSquare, BrainCircuit, ChevronRight } from 'lucide-react';
import { CORE_CAPABILITIES } from '../data/enterpriseData';
import type { Capability } from '../types';

export const CapabilitiesSection: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<Capability>(CORE_CAPABILITIES[0]);

  const capabilityIcons = [
    Layers,         // Unified Intelligence
    Network,        // Operational Understanding
    Compass,        // Predictive Intelligence
    Sliders,        // Decision Simulation
    CheckSquare,    // Intelligent Orchestration
    BrainCircuit    // Continuous Learning
  ];

  return (
    <section id="capabilities" className="relative py-24 lg:py-32 bg-[#07080b] border-b border-white/[0.06] overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-blue-950/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Exact Required Text */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CORE ARCHITECTURAL SUBSTRATE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            Everything your organisation needs<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              to think and operate as one.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Engineered as a comprehensive operating system layer that bridges enterprise data fabrics, high-order causal graphs, stochastic decision sandboxes, and auditable operational dispatchers.
          </p>
        </div>

        {/* Editorial Showcase: Dual-Pane Architectural Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          
          {/* Left: Capability Navigation List (5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            {CORE_CAPABILITIES.map((cap, idx) => {
              const IconComp = capabilityIcons[idx];
              const isSelected = selectedCapability.id === cap.id;

              return (
                <div
                  key={cap.id}
                  onClick={() => setSelectedCapability(cap)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0f1522] border-cyan-500/60 shadow-[0_4px_24px_rgba(56,189,248,0.2)]'
                      : 'bg-[#0a0d14] border-white/[0.06] hover:bg-white/[0.03] hover:border-white/15'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-white/[0.04] text-slate-400 group-hover:text-slate-200'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 tracking-wider">
                        {cap.eyebrow}
                      </div>
                      <div className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors">
                        {cap.title}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${
                    isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Deep-Dive Dossier (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0b0f17] border border-white/[0.08] p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 blur-[80px] pointer-events-none rounded-full" />

              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40 font-semibold">
                    {selectedCapability.eyebrow}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    SUBSYSTEM DOSSIER
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400">{selectedCapability.telemetryMetric.label}:</span>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/30">
                    {selectedCapability.telemetryMetric.value}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2 font-sans">
                {selectedCapability.title}
              </h3>

              <p className="text-sm font-mono text-cyan-300 mb-6">
                "{selectedCapability.tagline}"
              </p>

              <p className="text-sm text-slate-300 leading-relaxed mb-8">
                {selectedCapability.description}
              </p>

              {/* Technical Specifications */}
              <div className="mb-8">
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Technical Architecture & Specifications:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedCapability.technicalArchitecture.map((spec, i) => (
                    <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                      <span className="text-xs text-slate-300 font-mono leading-snug">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational Outcome */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/20 to-transparent border border-cyan-500/20">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  STRATEGIC ENTERPRISE OUTCOME
                </span>
                <p className="text-xs text-slate-200 font-medium">
                  {selectedCapability.operationalOutcome}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* 6 Capabilities Editorial Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_CAPABILITIES.map((cap, idx) => (
            <div
              key={cap.id}
              className="p-6 rounded-2xl bg-[#0c1017] border border-white/[0.07] hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 font-semibold">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {cap.telemetryMetric.label}: <strong className="text-cyan-300">{cap.telemetryMetric.value}</strong>
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">
                  {cap.title}
                </h4>

                <p className="text-xs font-mono text-cyan-300/90 mb-3">
                  {cap.tagline}
                </p>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {cap.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
                Outcome: <span className="text-slate-300">{cap.operationalOutcome}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
