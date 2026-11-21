import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Activity, Layers, PlayCircle } from 'lucide-react';
import { ContinuousEnterprise3D } from './ContinuousEnterprise3D';
import { OPERATIONAL_DOMAINS } from '../data/enterpriseData';
import type { OperationalDomain } from '../types';
import type { NarrativeStage } from '../hooks/useScrollNarrative';

interface HeroProps {
  onRequestDemo: () => void;
  currentStage?: NarrativeStage;
}

export const Hero: React.FC<HeroProps> = ({ onRequestDemo, currentStage = 'ambition' }) => {
  const [activeDomain, setActiveDomain] = useState<OperationalDomain>(OPERATIONAL_DOMAINS[0]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-36 pb-16 lg:pt-44 lg:pb-24 overflow-hidden border-b border-white/[0.06]">
      {/* Background Architectural Ambient Grid & Lighting */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-cyan-900/15 via-blue-950/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Visionary & Feynman-Simple Value Proposition (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>THE INTELLIGENCE LAYER FOR MODERN ENTERPRISES</span>
            </div>

            {/* Headline - Exact required text */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-sans">
              Your entire company.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                One intelligence.
              </span>
            </h1>

            {/* Supporting Text - Exact required text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-xl">
              Connect your organisation, understand how everything works together, anticipate what comes next and turn intelligence into action.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <button
                onClick={() => scrollToSection('living-topology')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-all duration-150 active:scale-[0.97]"
              >
                <span>Explore the Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('how-it-works')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transition-all duration-150 active:scale-[0.97]"
              >
                <PlayCircle className="w-4 h-4 text-cyan-400" />
                <span>See How It Works</span>
              </button>

              <button
                onClick={onRequestDemo}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 rounded-xl border border-cyan-800/40 transition-all duration-150 active:scale-[0.97]"
              >
                <span>Request Briefing</span>
              </button>
            </div>

            {/* Small supporting line - Exact required text */}
            <p className="text-xs font-mono text-slate-300 tracking-wide mb-8">
              One unified system for organisational understanding, prediction and execution.
            </p>

            {/* Credibility & Trust Markers */}
            <div className="pt-6 border-t border-white/[0.08] w-full grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400/80 shrink-0" />
                <span className="text-[11px] text-slate-400 leading-tight">SOC2 Type II & ISO 27001 Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400/80 shrink-0" />
                <span className="text-[11px] text-slate-400 leading-tight">Non-Invasive API Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400/80 shrink-0" />
                <span className="text-[11px] text-slate-400 leading-tight">Continuous Causal Calibration</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interconnected Enterprise Spatial Visualizer (7 Cols) */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl bg-gradient-to-b from-[#0c1017] to-[#07090e] border border-white/[0.09] shadow-[0_8px_40px_rgba(0,0,0,0.7)] overflow-hidden">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08] bg-[#090c12]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  <span className="text-xs font-mono text-slate-400 ml-2">
                    topology // enterprise-core-graph.live
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500">
                    REAL-TIME SYNC
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </div>

              {/* 3D Visualizer Canvas (Unobstructed, Clean Architecture) */}
              <div className="h-[460px] sm:h-[490px] w-full relative">
                <ContinuousEnterprise3D
                  currentStage={currentStage}
                  activeDomainId={activeDomain.id}
                  onSelectDomain={(d) => setActiveDomain(d)}
                />
              </div>

              {/* Dedicated Non-Overlapping Telemetry Console Dock */}
              <div className="p-4 sm:p-5 bg-[#080b10] border-t border-white/[0.08] space-y-3.5">
                
                {/* Active Domain Info Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeDomain.color }} />
                    <span className="text-sm font-bold text-white tracking-wide">
                      {activeDomain.name} Domain
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                      {activeDomain.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 px-2 py-0.5 rounded border border-cyan-800/50">
                      {activeDomain.throughput}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {activeDomain.latency}
                    </span>
                  </div>
                </div>

                {/* Key Metrics Strip (Clean, 3 Columns) */}
                <div className="grid grid-cols-3 gap-2">
                  {activeDomain.metrics.map((metric, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-black/50 border border-white/[0.06]">
                      <div className="text-[10px] font-mono text-slate-400 truncate">{metric.label}</div>
                      <div className="text-xs sm:text-sm font-semibold font-mono text-slate-100 mt-0.5">{metric.value}</div>
                    </div>
                  ))}
                </div>

                {/* Domain Selector Pill Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono text-slate-500 mr-1">CLUSTER:</span>
                  {OPERATIONAL_DOMAINS.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => setActiveDomain(domain)}
                      className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all duration-150 ${
                        activeDomain.id === domain.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(56,189,248,0.25)] font-semibold'
                          : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                      }`}
                    >
                      {domain.name}
                    </button>
                  ))}
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
