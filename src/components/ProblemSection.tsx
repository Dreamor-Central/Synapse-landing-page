import React, { useState } from 'react';
import { AlertTriangle, Clock, Play, RefreshCw, EyeOff, Flame } from 'lucide-react';
import { PROBLEM_ISLANDS } from '../data/enterpriseData';

export const ProblemSection: React.FC = () => {
  const [eventTriggered, setEventTriggered] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const simulationSteps = [
    {
      step: 1,
      department: 'Marketing',
      title: 'Departmental Blind Spend',
      action: 'Marketing notices early surge in web traffic and doubles paid campaigns (+$250k spend).',
      consequence: 'Has zero insight into warehouse inventory levels or factory maintenance schedules.',
      departmentId: 'marketing',
      severity: 'warning'
    },
    {
      step: 2,
      department: 'Sales',
      title: 'Unexecutable Commitments',
      action: 'Sales pipeline closes 42 enterprise contracts with promised 3-day SLA delivery.',
      consequence: 'Sales reps celebrate quota attainment, completely unaware that inventory stockouts loom.',
      departmentId: 'sales',
      severity: 'warning'
    },
    {
      step: 3,
      department: 'Operations & SCM',
      title: 'Warehouse Gridlock & Crisis',
      action: 'Fulfillment queue exceeds 160% capacity. Backlog surges from 2 days to 26 days.',
      consequence: 'Operations is forced into emergency air-freight and 3x overtime labor to avoid defaults.',
      departmentId: 'operations',
      severity: 'critical'
    },
    {
      step: 4,
      department: 'Customers & People',
      title: 'Reputational Fracture',
      action: 'Key enterprise clients experience severe delivery delays. Support tickets jump 340%.',
      consequence: 'High-value customer retention drops 18%; warehouse staff suffers burnout and voluntary churn.',
      departmentId: 'people',
      severity: 'critical'
    },
    {
      step: 5,
      department: 'Finance',
      title: 'Delayed Financial Realization',
      action: '45 days later at month-end closing, Finance finally reconciles the expedited shipping invoices.',
      consequence: 'Gross margin collapses by 24%. Leadership is blindsided by preventable capital destruction.',
      departmentId: 'finance',
      severity: 'critical'
    }
  ];

  const handleTriggerEvent = () => {
    setEventTriggered(true);
    setActiveStep(1);
  };

  const handleReset = () => {
    setEventTriggered(false);
    setActiveStep(0);
  };

  return (
    <section id="problem" className="relative py-24 lg:py-32 bg-[#07080b] border-b border-white/[0.06] overflow-hidden">
      {/* Background Subtle Red/Amber Warning Atmosphere */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-red-950/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-mono font-medium mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>THE ORGANISATIONAL DILEMMA</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            Your company is connected by people.<br />
            <span className="text-slate-400">
              But disconnected by systems.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every department has its own tools, information and priorities. But business decisions rarely affect just one department.
          </p>
        </div>

        {/* Interactive Event Simulator Control Panel */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-[#0d121c] via-[#111723] to-[#0d121c] border border-white/[0.08] shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-2">
                <span>SCENARIO INJECTION:</span>
                <span className="text-cyan-400 font-semibold">"Customer demand increases."</span>
              </div>
              <p className="text-sm text-slate-300">
                Observe what happens when an everyday business event travels through disconnected corporate silos.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {!eventTriggered ? (
                <button
                  onClick={handleTriggerEvent}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all active:scale-[0.97]"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Simulate Demand Surge (+45%)</span>
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStep(prev => Math.min(prev + 1, 5))}
                    disabled={activeStep >= 5}
                    className="px-4 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:pointer-events-none rounded-lg"
                  >
                    Next Step ({activeStep}/5)
                  </button>
                  <button
                    onClick={handleReset}
                    className="p-2 text-slate-400 hover:text-white bg-white/[0.05] rounded-lg border border-white/10"
                    title="Reset Simulation"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stepper Progress Bar */}
          {eventTriggered && (
            <div className="pt-6">
              <div className="flex items-center justify-between text-xs font-mono mb-2 text-slate-400">
                <span>PROPAGATION HORIZON: DAY {activeStep * 9} OF 45</span>
                <span className="text-red-400 font-semibold">
                  {activeStep === 5 ? 'TOTAL MARGIN COMPRESSION DETECTED' : 'UNCOORDINATED IMPACT SPREADING'}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {simulationSteps.map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeStep >= s.step
                        ? s.severity === 'critical' ? 'bg-red-500' : 'bg-amber-400'
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>

              {/* Current Active Step Breakdown Callout */}
              {activeStep > 0 && (
                <div className="mt-4 p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800/60 uppercase">
                        Phase 0{activeStep}: {simulationSteps[activeStep - 1].department}
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {simulationSteps[activeStep - 1].title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {simulationSteps[activeStep - 1].action}
                    </p>
                    <p className="text-xs text-red-400/90 font-mono mt-1">
                      Consequence: {simulationSteps[activeStep - 1].consequence}
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end gap-1 text-[11px] font-mono text-slate-400 shrink-0">
                    <span className="text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Lag: {activeStep * 8}d
                    </span>
                    <span className="text-red-400 flex items-center gap-1">
                      <Flame className="w-3 h-3" /> Risk: Extreme
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Visual Storytelling: The 5 Disconnected Islands */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {PROBLEM_ISLANDS.map((island) => {
            const isStressed = eventTriggered && (
              (activeStep >= 1 && island.id === 'marketing') ||
              (activeStep >= 2 && island.id === 'sales') ||
              (activeStep >= 3 && island.id === 'operations') ||
              (activeStep >= 4 && island.id === 'people') ||
              (activeStep >= 5 && island.id === 'finance')
            );

            return (
              <div
                key={island.id}
                className={`p-5 rounded-xl border transition-all duration-300 relative flex flex-col justify-between ${
                  isStressed
                    ? 'bg-red-950/30 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.15)] -translate-y-1'
                    : 'bg-[#0d1117] border-white/[0.08] hover:border-white/20'
                }`}
              >
                {/* Walled Island Indicator */}
                <div>
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/[0.06]">
                    <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-200">
                      {island.name} Silo
                    </span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                      isStressed
                        ? 'bg-red-950 text-red-300 border-red-700/60'
                        : 'bg-white/[0.04] text-slate-400 border-white/[0.08]'
                    }`}>
                      {isStressed ? 'SYSTEM OVERLOAD' : 'ISOLATED'}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-cyan-400/80 mb-2 truncate">
                    {island.toolset}
                  </div>

                  <div className="text-xs text-slate-300 mb-3 leading-snug">
                    <span className="text-slate-400 block text-[10px] uppercase font-mono">Isolated View:</span>
                    {island.isolatedView}
                  </div>

                  <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[11px] text-slate-400 mb-3 leading-relaxed">
                    <span className="text-amber-400 font-mono block text-[10px] flex items-center gap-1 mb-0.5">
                      <EyeOff className="w-3 h-3" /> Blindspot:
                    </span>
                    {island.blindspot}
                  </div>
                </div>

                {/* Surge Consequence */}
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="text-[10px] font-mono text-slate-300 flex items-center justify-between">
                    <span>RECONCILIATION LAG:</span>
                    <span className="text-slate-300">{island.dataLatency}</span>
                  </div>
                  {isStressed && (
                    <div className="mt-2 text-[11px] text-red-300 font-medium bg-red-950/60 p-2 rounded border border-red-800/40">
                      {island.impactOnSurge}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Climax Statement - Exact Required Text */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#111622] to-[#0a0d14] border border-cyan-500/20 shadow-[0_0_50px_rgba(56,189,248,0.08)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          
          <div className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3">
            THE ROOT CAUSE
          </div>

          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-snug">
            The problem isn't a lack of data.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              It's the lack of a unified understanding of the business.
            </span>
          </h3>

          <p className="mt-4 text-sm text-slate-400 max-w-xl mx-auto">
            Traditional BI tools show historical charts. Point-to-point integrations pass dumb data payloads. What modern enterprises require is a singular cognitive substrate.
          </p>
        </div>

      </div>
    </section>
  );
};
