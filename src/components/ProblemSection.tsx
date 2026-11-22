import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, Zap, Unlink, Network, ShieldAlert, Sparkles } from 'lucide-react';

interface DomainFlow {
  id: string;
  name: string;
  system: string;
  color: string;
  beforeHeadline: string;
  beforeBlindspot: string;
  afterHeadline: string;
  afterOutcome: string;
}

export const ProblemSection: React.FC = () => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  const domainFlows: DomainFlow[] = [
    {
      id: 'sales',
      name: 'Sales',
      system: 'CRM & Pipeline',
      color: '#38BDF8',
      beforeHeadline: 'Promises unfeasible 3-day delivery SLAs',
      beforeBlindspot: 'Blind to current factory line queues & warehouse inventory constraints.',
      afterHeadline: 'Quoted deliveries dynamically calibrated to live capacity',
      afterOutcome: 'Protects commercial commitments and eliminates surprise delivery delays.'
    },
    {
      id: 'operations',
      name: 'Operations',
      system: 'WMS & Logistics',
      color: '#F59E0B',
      beforeHeadline: 'Overwhelmed by unexpected order waves',
      beforeBlindspot: 'Zero advance forewarning when commercial campaigns double order intake.',
      afterHeadline: 'Receives synchronized advance demand signals weeks ahead',
      afterOutcome: 'Balances shift schedules smoothly with zero emergency air-freight penalties.'
    },
    {
      id: 'finance',
      name: 'Finance',
      system: 'ERP & Accounting',
      color: '#818CF8',
      beforeHeadline: 'Discovers margin compression 45 days late',
      beforeBlindspot: 'Historical monthly closes hide expedited fulfillment costs until damage is done.',
      afterHeadline: 'Real-time visibility into cross-department cost drivers',
      afterOutcome: 'Protects unit economics and gross margins before unbudgeted costs hit.'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      system: 'Ad Platforms',
      color: '#EC4899',
      beforeHeadline: 'Pours ad spend into stock-out product lines',
      beforeBlindspot: 'Scales top-of-funnel customer demand without inventory availability data.',
      afterHeadline: 'Campaign spend auto-aligns with available inventory',
      afterOutcome: 'Directs customer demand where the business has immediate capacity to fulfill.'
    }
  ];

  return (
    <section id="problem" className="relative py-24 lg:py-32 bg-[#07080B] border-b border-white/[0.06] overflow-hidden">
      {/* Background Volumetric Gradients */}
      <div className="absolute top-1/4 left-0 w-[550px] h-[550px] bg-red-950/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-cyan-950/20 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-mono font-medium mb-4 backdrop-blur-md">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>THE ORGANISATIONAL CHALLENGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-sans">
            Your business is connected.<br />
            <span className="text-slate-400">
              Your systems aren't.
            </span>
          </h2>

          <div className="space-y-3 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <p>
              Sales, finance, marketing, and operations each have different information. But decisions in one department affect the entire organisation.
            </p>
            <p>
              When these systems remain disconnected, businesses struggle to understand the complete picture.
            </p>
            <p className="text-cyan-300 font-semibold text-lg">
              SYNAPSE brings these pieces together.
            </p>
          </div>
        </div>

        {/* TRANSFORMATIVE DUAL-REALITY ARCHITECTURAL CANVAS */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0c0f17] via-[#080b12] to-[#05070c] border border-white/[0.1] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden p-6 sm:p-8 lg:p-10">
          
          {/* Top Transformation Header Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pb-8 mb-8 border-b border-white/[0.08]">
            {/* Left Header */}
            <div className="lg:col-span-5 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-800/50 flex items-center justify-center shrink-0">
                <Unlink className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase block">
                  BEFORE SYNAPSE // THE FRAGMENTED REALITY
                </span>
                <span className="text-sm font-semibold text-white">
                  Isolated Software Stacks & Departmental Blind Spots
                </span>
              </div>
            </div>

            {/* Center Transformation Indicator */}
            <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-700/50 text-[10px] font-mono text-cyan-300 shadow-[0_0_16px_rgba(56,189,248,0.25)]">
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
                <span>TRANSFORMATION</span>
              </div>
              <div className="h-4 w-px bg-gradient-to-b from-cyan-400 to-transparent my-1" />
            </div>

            {/* Right Header */}
            <div className="lg:col-span-5 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/40 border border-cyan-800/50 flex items-center justify-center shrink-0">
                <Network className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block">
                  WITH SYNAPSE // THE CONNECTED INTELLIGENCE
                </span>
                <span className="text-sm font-semibold text-white">
                  One Unified Representation of Organisational Reality
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Dual-Panel Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative">
            
            {/* LEFT PANEL: BEFORE SYNAPSE (5.5 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/30 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>Information Velocity: Days to Weeks Lag</span>
                </span>
                <span className="text-red-400 font-semibold">Fragmented</span>
              </div>

              {domainFlows.map((flow) => {
                const isHovered = activeHoverId === flow.id;

                return (
                  <div
                    key={`before-${flow.id}`}
                    onMouseEnter={() => setActiveHoverId(flow.id)}
                    onMouseLeave={() => setActiveHoverId(null)}
                    className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                      isHovered
                        ? 'bg-red-950/35 border-red-500/70 shadow-[0_0_24px_rgba(239,68,68,0.25)] translate-x-1'
                        : 'bg-[#090d14]/90 border-red-900/25 hover:border-red-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: flow.color }}
                        />
                        <span className="text-sm font-bold text-white tracking-wide">
                          {flow.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-slate-400 border border-white/5">
                        {flow.system}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-200 mb-3">
                      {flow.beforeHeadline}
                    </div>

                    <div className="p-3 rounded-lg bg-black/50 border border-red-900/30 flex items-start gap-2.5 text-xs">
                      <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider block mb-0.5 font-bold">
                          SYSTEMIC BLIND SPOT:
                        </span>
                        <span className="text-slate-300 leading-relaxed">
                          {flow.beforeBlindspot}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="p-4 rounded-xl bg-black/50 border border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Operational Friction:</span>
                <span className="text-red-400 font-semibold">Uncoordinated assumptions & preventable loss</span>
              </div>
            </div>

            {/* RIGHT PANEL: WITH SYNAPSE (6 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-cyan-950/25 border border-cyan-800/40 flex items-center justify-between text-xs font-mono text-slate-300">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Information Velocity: Continuous Synchrony</span>
                </span>
                <span className="text-cyan-400 font-semibold">One Intelligence</span>
              </div>

              {domainFlows.map((flow) => {
                const isHovered = activeHoverId === flow.id;

                return (
                  <div
                    key={`after-${flow.id}`}
                    onMouseEnter={() => setActiveHoverId(flow.id)}
                    onMouseLeave={() => setActiveHoverId(null)}
                    className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer relative overflow-hidden ${
                      isHovered
                        ? 'bg-cyan-950/35 border-cyan-400 shadow-[0_0_24px_rgba(56,189,248,0.28)] -translate-x-1'
                        : 'bg-[#090e18]/90 border-cyan-900/30 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: flow.color }}
                        />
                        <span className="text-sm font-bold text-white tracking-wide">
                          {flow.name} Connected
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40 font-semibold flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400" />
                        SYNCHRONIZED
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-cyan-200 mb-3">
                      {flow.afterHeadline}
                    </div>

                    <div className="p-3 rounded-lg bg-black/50 border border-cyan-900/40 flex items-start gap-2.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-wider block mb-0.5 font-bold">
                          CONNECTED OUTCOME:
                        </span>
                        <span className="text-slate-300 leading-relaxed">
                          {flow.afterOutcome}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-700/40 text-xs font-mono text-cyan-300 flex items-center justify-between">
                <span>Operational Harmony:</span>
                <span className="text-white font-semibold">Shared reality, predictive foresight & unified action</span>
              </div>
            </div>

          </div>

          {/* Bottom Transformative Conclusion Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Hover over any department to inspect its systemic transition. Delivered without manual data entry.</span>
            </span>
            <span className="text-cyan-400 flex items-center gap-1 font-semibold">
              <span>ZERO SOFTWARE REPLACEMENT — SITS ON TOP OF YOUR STACK</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
