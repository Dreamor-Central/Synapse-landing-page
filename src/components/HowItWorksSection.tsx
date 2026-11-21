import React, { useState } from 'react';
import { Database, GitFork, Compass, Sliders, CheckSquare, Shield, Cpu, Activity } from 'lucide-react';
import { HOW_IT_WORKS_STAGES } from '../data/enterpriseData';

export const HowItWorksSection: React.FC = () => {
  const [activeStageIdx, setActiveStageIdx] = useState(0);

  const activeStage = HOW_IT_WORKS_STAGES[activeStageIdx];

  // Icons corresponding to each stage
  const stageIcons = [
    Database,    // 01 Connect
    GitFork,     // 02 Understand
    Compass,     // 03 Anticipate
    Sliders,     // 04 Simulate
    CheckSquare  // 05 Orchestrate
  ];

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-[#07080b] border-b border-white/[0.06] overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-10 w-[600px] h-[400px] bg-blue-950/15 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Exact Required Text */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>THE 5-STAGE OPERATING SYSTEM LIFECYCLE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            From understanding your business<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              to improving it.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            A continuous, non-invasive operating loop that evolves from raw data ingestion into calibrated organizational understanding, predictive simulation, and coordinated execution.
          </p>
        </div>

        {/* Interactive Horizontal Connected Journey Track */}
        <div className="mb-12">
          <div className="relative">
            {/* Background connecting track line */}
            <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-8 right-8 h-0.5 bg-white/[0.08] z-0" />
            
            {/* Animated active progress line */}
            <div
              className="hidden md:block absolute top-1/2 -translate-y-1/2 left-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 z-0 transition-all duration-500"
              style={{
                width: `${(activeStageIdx / (HOW_IT_WORKS_STAGES.length - 1)) * 90}%`
              }}
            />

            {/* Stepper Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative z-10">
              {HOW_IT_WORKS_STAGES.map((stage, idx) => {
                const IconComponent = stageIcons[idx];
                const isActive = activeStageIdx === idx;
                const isPassed = activeStageIdx > idx;

                return (
                  <button
                    key={stage.step}
                    onClick={() => setActiveStageIdx(idx)}
                    className={`p-4 rounded-xl text-left transition-all duration-200 border relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#101726] border-cyan-500/60 shadow-[0_0_24px_rgba(56,189,248,0.25)] -translate-y-1'
                        : isPassed
                        ? 'bg-[#0a0e17] border-white/10 hover:border-white/20'
                        : 'bg-[#090c13] border-white/[0.06] hover:border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-mono font-bold ${
                        isActive ? 'text-cyan-400' : isPassed ? 'text-slate-400' : 'text-slate-300'
                      }`}>
                        {stage.step}
                      </span>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                        isActive
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'bg-white/[0.04] text-slate-400'
                      }`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white mb-0.5">
                        {stage.title}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 truncate">
                        {stage.headline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stage Interactive Viewport Container */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0f1422] to-[#090d16] border border-white/[0.08] p-6 sm:p-10 shadow-[0_16px_60px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Description (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40">
                    STAGE {activeStage.step} OF 05
                  </span>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                    {activeStage.headline}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                  {activeStage.step} — {activeStage.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6 font-medium">
                  {activeStage.description}
                </p>

                {/* Granular Architectural Features */}
                <div className="space-y-3 mb-8">
                  {activeStage.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-300 leading-normal">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Telemetry Metrics Strip */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-2">
                {activeStage.metricsPreview.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/5">
                    <div className="text-[10px] font-mono text-slate-400 truncate">{m.label}</div>
                    <div className="text-xs font-mono font-semibold text-cyan-300 mt-0.5 truncate">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Rich Visual Representation (7 Cols) */}
            <div className="lg:col-span-7">
              <div className="rounded-xl bg-[#06080d] border border-white/[0.08] p-5 shadow-2xl relative min-h-[420px] flex flex-col justify-between">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-slate-300">ARCHITECTURE // STAGE_{activeStage.step}_SUBSYSTEM</span>
                  </div>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    VERIFIED
                  </span>
                </div>

                {/* Stage-Specific Rich Visual Component */}
                <div className="py-6 flex-1 flex items-center justify-center">
                  
                  {/* STAGE 01: CONNECT VISUAL */}
                  {activeStageIdx === 0 && (
                    <div className="w-full space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {['SAP S/4HANA', 'Salesforce CRM', 'Workday HRIS', 'Snowflake Core', 'Oracle WMS', 'Datadog APM', 'Stripe Ledger', 'Kafka Stream'].map((sys, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs font-mono text-slate-300">{sys}</span>
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          </div>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-black border border-cyan-500/30 text-center">
                        <div className="text-xs font-mono text-cyan-300 mb-1">
                          CANONICAL SCHEMA ADAPTER LAYER
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Zero-copy bidirectional synchronization. Automatic schema drift adaptation. Zero tool replacement required.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* STAGE 02: UNDERSTAND VISUAL */}
                  {activeStageIdx === 1 && (
                    <div className="w-full space-y-4">
                      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08]">
                        <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
                          <span>DISCOVERED CAUSAL RELATIONSHIPS</span>
                          <span className="text-cyan-400">CONFIDENCE: 98.4%</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2 rounded bg-white/[0.02] flex items-center justify-between">
                            <span className="text-slate-300 font-mono">Operations Fulfillment SLA (-3d)</span>
                            <span className="text-cyan-400 font-mono">→ +18.2% LTV Retention</span>
                          </div>
                          <div className="p-2 rounded bg-white/[0.02] flex items-center justify-between">
                            <span className="text-slate-300 font-mono">Marketing Mid-Funnel CAC (+$420)</span>
                            <span className="text-amber-400 font-mono">→ -8.4% Gross Margin Lag</span>
                          </div>
                          <div className="p-2 rounded bg-white/[0.02] flex items-center justify-between">
                            <span className="text-slate-300 font-mono">Engineering Headcount Deficit</span>
                            <span className="text-red-400 font-mono">→ +5.4d Delivery Bottleneck</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-[11px] font-mono text-slate-400">
                        Dynamic Bayesian causal inference over 4.2M enterprise entities and multi-hop operational paths.
                      </div>
                    </div>
                  )}

                  {/* STAGE 03: ANTICIPATE VISUAL */}
                  {activeStageIdx === 2 && (
                    <div className="w-full space-y-4">
                      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08]">
                        <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4">
                          <span>EARLY HAZARD DETECTION (90-DAY PROJECTION)</span>
                          <span className="text-amber-400">+38 DAYS AHEAD OF P&L</span>
                        </div>
                        {/* Trajectory Simulation Graph */}
                        <div className="h-32 flex items-end gap-2 pb-2 border-b border-white/10">
                          {[30, 42, 55, 68, 74, 82, 70, 58, 44, 38, 29, 22].map((val, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                style={{ height: `${val}%` }}
                                className={`w-full rounded-t transition-all ${
                                  idx > 6 ? 'bg-cyan-500/80 shadow-[0_0_8px_rgba(56,189,248,0.3)]' : 'bg-slate-700/60'
                                }`}
                              />
                              <span className="text-[9px] font-mono text-slate-300">W{idx + 1}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <span className="w-2 h-2 rounded-full bg-slate-600" /> Past Trajectory
                        </span>
                        <span className="flex items-center gap-1.5 text-cyan-400">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Stochastic Forecast Window
                        </span>
                      </div>
                    </div>
                  )}

                  {/* STAGE 04: SIMULATE VISUAL */}
                  {activeStageIdx === 3 && (
                    <div className="w-full space-y-3">
                      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08]">
                        <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center justify-between">
                          <span>EXECUTIVE SCENARIO FORKING ENGINE</span>
                          <span className="text-slate-400">10,000 SIMULATIONS/SEC</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-800/40">
                            <span className="text-[10px] font-mono text-cyan-400 uppercase">Scenario A: Status Quo</span>
                            <div className="text-sm font-bold text-white mt-1">EBITDA: +12%</div>
                            <div className="text-[10px] text-slate-400 mt-1">SLA Breach Risk: 42%</div>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40">
                            <span className="text-[10px] font-mono text-emerald-400 uppercase">Scenario B: Rebalanced</span>
                            <div className="text-sm font-bold text-white mt-1">EBITDA: +28%</div>
                            <div className="text-[10px] text-emerald-400 mt-1">SLA Breach Risk: 2.1%</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-[11px] font-mono text-slate-400">
                        Monte Carlo multi-variable stress testing across supply chain buffers, working capital, and headcount.
                      </div>
                    </div>
                  )}

                  {/* STAGE 05: ORCHESTRATE VISUAL */}
                  {activeStageIdx === 4 && (
                    <div className="w-full space-y-3">
                      <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08]">
                        <div className="text-xs font-mono text-slate-400 mb-3 flex items-center justify-between">
                          <span>DISPATCHED OPERATIONAL ACTIONS</span>
                          <span className="text-emerald-400 font-mono">READY FOR EXEC SIGN-OFF</span>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400" />
                              <span className="text-slate-200">Rebalance Q3 Ad Spend ($180k)</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Target: Google Ads / Marketo</span>
                          </div>
                          <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400" />
                              <span className="text-slate-200">Shift Secondary Vendor Requisition</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Target: SAP SCM API</span>
                          </div>
                          <div className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-400" />
                              <span className="text-slate-200">Adjust Quoted SLA Floors to 5 Days</span>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">Target: Salesforce CPQ</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-2">
                        <span className="flex items-center gap-1 text-cyan-400">
                          <Shield className="w-3.5 h-3.5" /> Dual-Key Authorization Required
                        </span>
                        <span>IMMUTABLE AUDIT TRAIL</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Subsystem Statement Footer */}
                <div className="pt-3 border-t border-white/[0.06] text-xs text-slate-400 italic">
                  "{activeStage.systemCapability}"
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
