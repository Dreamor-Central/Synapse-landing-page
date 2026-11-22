import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const [viewState, setViewState] = useState<'disconnected' | 'connected'>('disconnected');

  const departments = [
    {
      id: 'sales',
      name: 'Sales',
      color: '#38BDF8',
      siloView: 'Focused on bookings and quotas',
      siloBlindspot: 'Blind to warehouse capacity limits',
      connectedValue: 'Quotes verified against live fulfillment lead times'
    },
    {
      id: 'operations',
      name: 'Operations',
      color: '#F59E0B',
      siloView: 'Focused on daily queue throughput',
      siloBlindspot: 'No forewarning of inbound sales surges',
      connectedValue: 'Receives advance demand signals to balance resources'
    },
    {
      id: 'finance',
      name: 'Finance',
      color: '#818CF8',
      siloView: 'Reviews monthly accounting closes',
      siloBlindspot: 'Discovers margin erosion weeks after it occurs',
      connectedValue: 'Real-time visibility into operational cost drivers'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      color: '#EC4899',
      siloView: 'Tracks lead volume and ad clicks',
      siloBlindspot: 'Promotes products experiencing delivery backlogs',
      connectedValue: 'Directs ad spend toward high-margin, available inventory'
    }
  ];

  return (
    <section id="problem" className="relative py-24 lg:py-32 bg-[#07080B] border-b border-white/[0.06] overflow-hidden">
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-red-950/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-950/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-mono font-medium mb-4">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>THE ORGANISATIONAL CHALLENGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6 font-sans">
            Your business is connected.<br />
            <span className="text-slate-400">
              Your systems aren't.
            </span>
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <p>
              Sales, finance, marketing, and operations each have different information. But decisions in one department affect the entire organisation.
            </p>
            <p>
              When these systems remain disconnected, businesses struggle to understand the complete picture.
            </p>
            <p className="text-cyan-300 font-medium">
              SYNAPSE brings these pieces together.
            </p>
          </div>
        </div>

        {/* Interactive Visual Comparison: Disconnected vs Connected */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0e131d] via-[#090c13] to-[#07090e] border border-white/[0.08] p-6 lg:p-8 shadow-2xl">
          
          {/* Toggle Control */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-white/[0.08]">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                SYSTEM ARCHITECTURE COMPARISON
              </span>
              <div className="text-sm text-slate-200 font-medium">
                {viewState === 'disconnected' 
                  ? 'Traditional Enterprise: Isolated Tools & Departmental Blind Spots'
                  : 'SYNAPSE OS: Unified Representation & Shared Understanding'}
              </div>
            </div>

            <div className="inline-flex p-1 rounded-xl bg-black/60 border border-white/10 self-start sm:self-auto">
              <button
                onClick={() => setViewState('disconnected')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewState === 'disconnected'
                    ? 'bg-red-950/60 text-red-300 border border-red-800/50 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Disconnected Systems
              </button>
              <button
                onClick={() => setViewState('connected')}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  viewState === 'connected'
                    ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-700/60 shadow-[0_0_16px_rgba(56,189,248,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Connected with SYNAPSE
              </button>
            </div>
          </div>

          {/* Department Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => {
              const isDisconnected = viewState === 'disconnected';

              return (
                <div
                  key={dept.id}
                  className={`p-5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    isDisconnected
                      ? 'bg-[#090c12]/90 border-red-900/20 hover:border-red-800/40'
                      : 'bg-[#0b1018]/90 border-cyan-900/30 hover:border-cyan-500/40 shadow-[0_0_20px_rgba(56,189,248,0.06)]'
                  }`}
                >
                  <div>
                    {/* Header with department badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${dept.color}15`,
                          color: dept.color,
                          border: `1px solid ${dept.color}35`
                        }}
                      >
                        {dept.name.toUpperCase()}
                      </span>
                      
                      {isDisconnected ? (
                        <span className="text-[10px] font-mono text-red-400 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          SILOED
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                          SYNCHRONIZED
                        </span>
                      )}
                    </div>

                    {/* Department View Detail */}
                    <div className="mb-3">
                      <div className="text-[11px] font-mono uppercase text-slate-400 mb-1">
                        Operational Perspective:
                      </div>
                      <p className="text-sm font-semibold text-slate-200">
                        {dept.siloView}
                      </p>
                    </div>

                    {/* Consequence or Value */}
                    <div className="pt-3 border-t border-white/[0.06]">
                      {isDisconnected ? (
                        <div>
                          <div className="text-[11px] font-mono uppercase text-red-400 mb-1">
                            Critical Blind Spot:
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {dept.siloBlindspot}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-[11px] font-mono uppercase text-cyan-400 mb-1">
                            Unified Impact:
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {dept.connectedValue}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Visual Connection Status Bar */}
                  <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-400">Data Visibility:</span>
                    <span className={isDisconnected ? 'text-red-400 font-semibold' : 'text-cyan-400 font-semibold'}>
                      {isDisconnected ? 'Isolated (1 of 8)' : 'Complete (Enterprise)'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${viewState === 'disconnected' ? 'bg-red-400' : 'bg-cyan-400'}`} />
              {viewState === 'disconnected'
                ? 'Fragmented systems force teams to operate on outdated assumptions.'
                : 'SYNAPSE bridges existing software into one continuously updated operational reality.'}
            </span>
            <button
              onClick={() => setViewState(v => v === 'disconnected' ? 'connected' : 'disconnected')}
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
            >
              <span>Switch View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
