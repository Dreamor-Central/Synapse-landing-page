import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, RotateCcw, ArrowRight, Sparkles, Network, CheckCircle2 } from 'lucide-react';
import { ContinuousEnterprise3D } from './ContinuousEnterprise3D';
import { SCENARIO_SIGNALS, SCENARIO_INTERVENTIONS } from '../data/enterpriseData';

interface InteractiveBusinessScenarioProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestDemo: () => void;
}

export const InteractiveBusinessScenario: React.FC<InteractiveBusinessScenarioProps> = ({
  isOpen,
  onClose,
  onRequestDemo
}) => {
  const [currentStage, setCurrentStage] = useState<number>(1);
  const [revealedIndex, setRevealedIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive reveal timer for signals in stages 1 & 2
  useEffect(() => {
    if (!isOpen) {
      setCurrentStage(1);
      setRevealedIndex(0);
      return;
    }

    setRevealedIndex(0);
    const interval = setInterval(() => {
      setRevealedIndex(prev => {
        if (prev < 4) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 450);

    return () => clearInterval(interval);
  }, [currentStage, isOpen]);

  // Keyboard navigation: Left/Right arrows and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        if (currentStage < 5) setCurrentStage(s => s + 1);
      } else if (e.key === 'ArrowLeft') {
        if (currentStage > 1) setCurrentStage(s => s - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStage, onClose]);

  if (!isOpen) return null;

  const nextStage = () => {
    if (currentStage < 5) setCurrentStage(s => s + 1);
  };

  const prevStage = () => {
    if (currentStage > 1) setCurrentStage(s => s - 1);
  };

  const replay = () => {
    setCurrentStage(1);
    setRevealedIndex(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-gradient-to-b from-[#0a0e17] via-[#07090e] to-[#050608] border border-cyan-500/30 shadow-[0_20px_80px_rgba(0,0,0,0.85)] overflow-hidden my-12 animate-in fade-in duration-500"
    >
      {/* Top Experience Control Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black/40 backdrop-blur-md">
        
        {/* Left: Eyebrow & Context */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-[11px] font-mono text-cyan-300">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>ILLUSTRATIVE BUSINESS SCENARIO</span>
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Sales Growth & Fulfilment Bottleneck
          </span>
        </div>

        {/* Center: Stage Progress Tracker */}
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((stg) => (
            <button
              key={stg}
              onClick={() => setCurrentStage(stg)}
              aria-label={`Jump to stage ${stg}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                stg === currentStage
                  ? 'w-8 bg-cyan-400'
                  : stg < currentStage
                  ? 'w-4 bg-cyan-700/60'
                  : 'w-2 bg-white/10 hover:bg-white/20'
              }`}
            />
          ))}
          <span className="text-xs font-mono text-slate-400 ml-2">
            {currentStage === 5 ? 'COMPLETION' : `STAGE 0${currentStage} / 04`}
          </span>
        </div>

        {/* Right: Close Button */}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
          title="Close Experience (Esc)"
        >
          <span className="hidden sm:inline">Exit</span>
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Canvas Body: Split Layout with 3D Enterprise Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] items-stretch">
        
        {/* Left Column: Progressive Text Generation & Storytelling (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between relative z-10">
          
          {/* STAGE 01: THE SITUATION */}
          {currentStage === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                STAGE 01 // THE SITUATION
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
                Sales are growing.<br />
                <span className="text-amber-400">
                  But something is going wrong.
                </span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                A company is receiving more orders, but deliveries are becoming delayed and customer satisfaction is declining. The company initially sees these as separate operational problems.
              </p>

              {/* Progressive Signals Reveal */}
              <div className="space-y-3 pt-2">
                <div className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                  revealedIndex >= 1 ? 'bg-[#0f1420] border-cyan-500/40 opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 shrink-0 animate-ping" />
                  <div>
                    <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider mb-0.5">
                      Demand Signal
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Orders are increasing
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Commercial teams celebrate closing new customer accounts across regions.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                  revealedIndex >= 2 ? 'bg-[#151210] border-amber-500/40 opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0 animate-ping" />
                  <div>
                    <div className="text-xs font-mono text-amber-300 uppercase tracking-wider mb-0.5">
                      Operations Signal
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Deliveries are getting delayed
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Warehouse fulfillment lead times slip as processing lines reach capacity.
                    </p>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border transition-all duration-300 flex items-start gap-3.5 ${
                  revealedIndex >= 3 ? 'bg-[#160f14] border-red-500/40 opacity-100' : 'opacity-0'
                }`}>
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 shrink-0 animate-ping" />
                  <div>
                    <div className="text-xs font-mono text-red-300 uppercase tracking-wider mb-0.5">
                      Customer Sentiment Signal
                    </div>
                    <div className="text-sm font-semibold text-white">
                      Customer satisfaction is declining
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Delivery delays trigger support inquiries and frustrated client reviews.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 02: THE CONNECTIONS */}
          {currentStage === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                STAGE 02 // THE CONNECTIONS
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
                The problem is bigger<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
                  than one department.
                </span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                When departments operate independently, each sees only its own fragment of reality. But under the surface, decisions and constraints are tightly linked.
              </p>

              {/* 4 Connected Functional Perspectives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {SCENARIO_SIGNALS.map((sig, idx) => (
                  <div
                    key={sig.id}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      revealedIndex >= idx
                        ? 'bg-[#0c101a] border-white/15 opacity-100'
                        : 'opacity-0'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                        style={{
                          backgroundColor: `${sig.color}18`,
                          color: sig.color,
                          border: `1px solid ${sig.color}40`
                        }}
                      >
                        {sig.department.toUpperCase()}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Signal Connected
                      </span>
                    </div>

                    <div className="text-sm font-bold text-white mb-1">
                      {sig.observation}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {sig.detail}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-800/30 text-xs font-mono text-cyan-300 flex items-center gap-2">
                <Network className="w-4 h-4 shrink-0 text-cyan-400" />
                <span>Notice how the 3D network links these 4 departments in real time.</span>
              </div>
            </div>
          )}

          {/* STAGE 03: THE INSIGHT */}
          {currentStage === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                STAGE 03 // THE INSIGHT
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
                The problem isn't sales.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
                  It's the fulfilment capacity behind them.
                </span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                SYNAPSE combines these signals into a single cross-departmental understanding. Increasing demand, constrained fulfillment capacity, customer dissatisfaction, and rising operational pressure are interconnected symptoms of the same root constraint.
              </p>

              {/* The Key Takeaway Message Banner */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0e1524] to-[#090e18] border border-cyan-500/40 shadow-[0_0_30px_rgba(56,189,248,0.15)] relative overflow-hidden">
                <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>CORE ORGANISATIONAL TAKEAWAY</span>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white leading-snug">
                  SYNAPSE helps reveal what individual systems cannot show independently.
                </div>
                <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                  Instead of sales blaming logistics or finance slashing marketing budgets blindly, leadership sees the true relationship between incoming orders and delivery capacity.
                </p>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                * Illustrative scenario demonstrating connected cross-departmental reasoning.
              </div>
            </div>
          )}

          {/* STAGE 04: THE POSSIBILITIES */}
          {currentStage === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                STAGE 04 // THE POSSIBILITIES
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
                What if the company<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
                  could respond as one?
                </span>
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Rather than treating symptoms in isolation, SYNAPSE lets teams explore coordinated interventions across the business:
              </p>

              {/* 4 Interventions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {SCENARIO_INTERVENTIONS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#0a0e17] border border-white/10 hover:border-cyan-500/40 transition-colors"
                  >
                    <div className="text-[10px] font-mono text-cyan-400 uppercase mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                      <span>{item.department}</span>
                    </div>
                    <div className="text-xs font-bold text-white mb-1.5 leading-snug">
                      {item.title}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-2">
                      {item.description}
                    </p>
                    <div className="text-[10px] font-mono text-slate-300 pt-2 border-t border-white/[0.06]">
                      Outcome: <span className="text-slate-200">{item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Simulation demonstrates potential cross-functional outcomes prior to committing capital or resources.
              </div>
            </div>
          )}

          {/* STAGE 05: COMPLETION STATE */}
          {currentStage === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                SCENARIO SUMMARY // CONNECTED INTELLIGENCE
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight font-sans">
                One business.<br />
                Multiple moving parts.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
                  One connected understanding.
                </span>
              </h3>

              <p className="text-slate-300 text-base leading-relaxed">
                SYNAPSE OS brings the organisation into one connected intelligence environment.
              </p>

              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0d1422] to-[#070b12] border border-cyan-500/40 shadow-xl">
                <div className="text-sm font-semibold text-white mb-2">
                  Ready to see how this applies to your organisation?
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Experience how SYNAPSE connects your existing enterprise tools into a unified, predictive intelligence layer.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={onRequestDemo}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-semibold text-xs transition-all shadow-[0_0_24px_rgba(56,189,248,0.35)] cursor-pointer"
                  >
                    <span>Request a Demo</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={replay}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 text-xs font-mono transition-all border border-white/10 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Experience</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center justify-center px-4 py-3 text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Return to Overview</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Navigation & Pacing Controls */}
          <div className="pt-8 mt-6 border-t border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={prevStage}
                disabled={currentStage === 1}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                  currentStage === 1
                    ? 'opacity-40 cursor-not-allowed border-white/5 text-slate-600'
                    : 'border-white/10 hover:border-white/20 text-slate-300 hover:text-white bg-white/[0.03]'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStage < 5 ? (
                <button
                  onClick={nextStage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 shadow-sm transition-all cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={replay}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-white/[0.04] border border-white/10 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay</span>
                </button>
              )}
            </div>

            <div className="text-[11px] font-mono text-slate-500 hidden sm:block">
              Use arrow keys <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-300">→</kbd> to navigate
            </div>
          </div>

        </div>

        {/* Right Column: Synchronized 3D Enterprise Network Visualizer (5 Cols) */}
        <div className="lg:col-span-5 h-[340px] sm:h-[420px] lg:h-auto min-h-[380px] relative border-t lg:border-t-0 lg:border-l border-white/[0.08] bg-[#06080d] overflow-hidden">
          <ContinuousEnterprise3D
            mode={
              currentStage === 1 ? 'anticipate' :
              currentStage === 2 ? 'scenario' :
              currentStage === 3 ? 'scenario' :
              currentStage === 4 ? 'orchestrate' : 'understand'
            }
            interactive={true}
          />

          {/* Subtitle Telemetry Badge Overlay */}
          <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
            <div className="p-3 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md text-[11px] font-mono">
              <div className="text-cyan-400 font-semibold mb-0.5 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                {currentStage === 1 && 'STAGE 01: INDIVIDUAL SIGNALS OBSERVED'}
                {currentStage === 2 && 'STAGE 02: CROSS-DOMAIN CAUSAL LINKS DETECTED'}
                {currentStage === 3 && 'STAGE 03: ROOT FULFILMENT CONSTRAINT IDENTIFIED'}
                {currentStage === 4 && 'STAGE 04: MULTI-DEPARTMENT ACTIONS SYNCHRONIZED'}
                {currentStage === 5 && 'ENTERPRISE OPERATIONAL HARMONY RESTORED'}
              </div>
              <div className="text-slate-400 text-[10px]">
                {currentStage === 1 && 'Sales, Operations & Customers signals observed in parallel'}
                {currentStage === 2 && 'Neural filaments active across Sales ↔ Operations ↔ Customers ↔ Finance'}
                {currentStage === 3 && 'Unified representation synthesizes root cause behind delayed orders'}
                {currentStage === 4 && 'Directive waves dispatched across enterprise workflow targets'}
                {currentStage === 5 && 'Full enterprise continuous synchronization active'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

