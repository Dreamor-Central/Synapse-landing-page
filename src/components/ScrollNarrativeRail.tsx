import React from 'react';
import { NARRATIVE_STAGES_CONFIG, type NarrativeInfo } from '../hooks/useScrollNarrative';
import { Compass } from 'lucide-react';

interface ScrollNarrativeRailProps {
  narrativeInfo: NarrativeInfo;
}

export const ScrollNarrativeRail: React.FC<ScrollNarrativeRailProps> = ({ narrativeInfo }) => {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Desktop Narrative Rail (Right Margin) */}
      <aside
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-none select-none"
        aria-label="Scroll narrative progression"
      >
        {/* Floating Narrative HUD Badge */}
        <div className="pointer-events-auto p-3 rounded-xl enterprise-glass shadow-2xl max-w-[240px] text-right mb-2 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-end gap-1.5 text-[10px] font-mono text-cyan-400 mb-0.5">
            <Compass className="w-3 h-3 animate-spin [animation-duration:8s]" />
            <span>STAGE 0{narrativeInfo.stageNumber} OF 0{narrativeInfo.totalStages}</span>
          </div>
          <div className="text-xs font-bold text-white truncate">
            {narrativeInfo.stageTitle}
          </div>
          <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
            {narrativeInfo.stageSubtitle}
          </div>
          
          {/* Progress bar */}
          <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
              style={{ width: `${narrativeInfo.progress * 100}%` }}
            />
          </div>
        </div>

        {/* 7 Interactive Chapter Indicator Dots */}
        <div className="pointer-events-auto flex flex-col items-end gap-2.5 p-2 rounded-full bg-black/40 border border-white/[0.08] backdrop-blur-md">
          {NARRATIVE_STAGES_CONFIG.map((stage) => {
            const isActive = narrativeInfo.stage === stage.id;
            const isPassed = narrativeInfo.stageNumber > stage.num;

            return (
              <button
                key={stage.id}
                onClick={() => scrollToSection(stage.sectionId)}
                title={`${stage.num}. ${stage.title}`}
                className="group flex items-center gap-2 p-1 focus:outline-none"
              >
                {/* Hover Label */}
                <span className="hidden group-hover:block text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 text-cyan-300 border border-white/10 whitespace-nowrap">
                  0{stage.num} {stage.title}
                </span>

                {/* Dot */}
                <span
                  className={`block rounded-full transition-all duration-200 ${
                    isActive
                      ? 'w-3 h-3 bg-cyan-400 ring-4 ring-cyan-500/20 shadow-[0_0_10px_rgba(56,189,248,0.6)]'
                      : isPassed
                      ? 'w-2 h-2 bg-slate-400 group-hover:bg-cyan-300'
                      : 'w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-400'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </aside>

      {/* Floating Bottom Narrative Pill for Mobile / Tablet */}
      <div className="fixed bottom-4 left-4 right-4 z-40 xl:hidden pointer-events-none">
        <div className="pointer-events-auto mx-auto max-w-sm px-4 py-2.5 rounded-full bg-[#0a0d14]/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] text-slate-300">
              STAGE 0{narrativeInfo.stageNumber}: <strong className="text-white">{narrativeInfo.stageTitle}</strong>
            </span>
          </div>

          <div className="text-[10px] text-cyan-400">
            {Math.round(narrativeInfo.progress * 100)}%
          </div>
        </div>
      </div>
    </>
  );
};
