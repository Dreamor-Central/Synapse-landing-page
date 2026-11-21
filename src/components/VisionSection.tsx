import React from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

interface VisionProps {
  onRequestDemo: () => void;
}

export const VisionSection: React.FC<VisionProps> = ({ onRequestDemo }) => {
  return (
    <section id="vision" className="relative py-24 lg:py-36 bg-[#07080b] border-b border-white/[0.06] overflow-hidden">
      {/* Background Architectural Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-to-r from-blue-950/20 via-cyan-950/25 to-indigo-950/20 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Exact Required Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>THE STRATEGIC HORIZON</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-8 font-sans">
            From managing a company<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              to intelligently orchestrating one.
            </span>
          </h2>

          <div className="space-y-4 max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <p>
              We believe the next generation of enterprises will not simply use more software. They will operate through connected intelligence — systems that understand organisational reality, anticipate change and coordinate action.
            </p>
            <p className="text-cyan-300 font-semibold text-lg sm:text-xl">
              Our vision is to make every organisation more aware, adaptive and intelligent.
            </p>
          </div>
        </div>

        {/* Ambitious Restrained Visual: The Living Organisational Substrate */}
        <div className="mb-20 rounded-2xl bg-gradient-to-b from-[#0e131d] to-[#080b11] border border-white/[0.08] p-8 lg:p-12 shadow-[0_16px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
          
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
            <div>
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider block mb-1">
                ORGANISATIONAL EVOLUTION PARADIGM
              </span>
              <div className="text-sm text-slate-300 font-medium">
                The shift from passive documentation to living computational substrate
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>SYNAPSE OS KERNEL ACTIVE</span>
            </div>
          </div>

          {/* 3-Era Evolution Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            
            {/* Era 1 */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2">
                  1990 — 2005
                </span>
                <h3 className="text-lg font-bold text-slate-300 mb-2">
                  Siloed Record Systems
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Single-purpose mainframe databases. Accounting records and ERPs recorded historical transactions weeks after the fact. Companies operated through paper memos and delayed reporting.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-500 pt-3 border-t border-white/5">
                Latency: 30–60 Days • Visibility: Isolated
              </div>
            </div>

            {/* Era 2 */}
            <div className="p-6 rounded-xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                  2010 — 2024
                </span>
                <h3 className="text-lg font-bold text-slate-200 mb-2">
                  SaaS Fragmentation Sprawl
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Hundreds of specialized cloud point solutions. Teams became productive inside their silos, but organizational coordination fractured. Humans became the manual glue between disconnected dashboards.
                </p>
              </div>
              <div className="text-[11px] font-mono text-slate-400 pt-3 border-t border-white/5">
                Latency: 7–14 Days • Visibility: Fragmented
              </div>
            </div>

            {/* Era 3 */}
            <div className="p-6 rounded-xl bg-gradient-to-b from-cyan-950/40 via-blue-950/20 to-black border border-cyan-500/40 shadow-[0_0_30px_rgba(56,189,248,0.15)] flex flex-col justify-between relative">
              <div className="absolute -top-2.5 right-4 text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-400 text-black font-bold uppercase tracking-wider">
                CURRENT HORIZON
              </div>

              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-2">
                  2026+ // THE PRESENT
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  The AI-Native Enterprise OS
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  An organic, unified intelligence infrastructure. The enterprise functions as a single living organism with continuous causal understanding, simulation, and coordinated execution.
                </p>
              </div>
              <div className="text-[11px] font-mono text-cyan-300 pt-3 border-t border-cyan-500/20">
                Latency: &lt; 200 Milliseconds • Visibility: 360° Unified
              </div>
            </div>

          </div>

          {/* Living Substrate Conceptual Graphic */}
          <div className="mt-10 p-6 rounded-xl bg-black/50 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400 shrink-0">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  The Self-Calibrating Enterprise
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Continuously learning from variance, optimizing decisions, and compounding organizational memory.
                </div>
              </div>
            </div>

            <button
              onClick={onRequestDemo}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-md shrink-0 active:scale-[0.97] transition-all"
            >
              <span>Explore Architecture Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
