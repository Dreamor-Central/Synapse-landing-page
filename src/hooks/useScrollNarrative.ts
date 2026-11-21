import { useState, useEffect } from 'react';

export type NarrativeStage = 
  | 'ambition'        // Stage 1: Hero - The Interconnected Vision
  | 'fragmentation'   // Stage 2: Problem - The Disconnected Silos
  | 'reconnection'    // Stage 3: Transformation - What If Everything Worked as One?
  | 'substrate'       // Stage 4: How It Works - 5-Stage Cognitive Operating Loop
  | 'causality'       // Stage 5: Business Scenario - Root-Cause Multi-Signal Attribution
  | 'capabilities'    // Stage 6: Capabilities - Core Architectural Subsystems
  | 'living_horizon'; // Stage 7: Vision & Final CTA - The Living, Self-Calibrating Enterprise

export interface NarrativeInfo {
  stage: NarrativeStage;
  stageNumber: number;
  totalStages: number;
  progress: number; // 0 to 1 overall page progress
  stageTitle: string;
  stageSubtitle: string;
  stageStateLabel: string;
}

export const NARRATIVE_STAGES_CONFIG: {
  id: NarrativeStage;
  num: number;
  sectionId: string;
  title: string;
  subtitle: string;
  stateLabel: string;
}[] = [
  {
    id: 'ambition',
    num: 1,
    sectionId: 'hero',
    title: 'The Interconnected Vision',
    subtitle: 'Unified Intelligence Layer',
    stateLabel: 'EQUILIBRIUM: UNIFIED LATTICE'
  },
  {
    id: 'fragmentation',
    num: 2,
    sectionId: 'problem',
    title: 'The Disconnected Silos',
    subtitle: 'Shattered Systems & Blindspots',
    stateLabel: 'DECOUPLING: 5 ISOLATED CLUSTERS'
  },
  {
    id: 'reconnection',
    num: 3,
    sectionId: 'transformation',
    title: 'Magnetic Reconnection',
    subtitle: 'What If Whole Company Worked as One?',
    stateLabel: 'RE-ALIGNMENT: NEURAL FILAMENTS ENGAGED'
  },
  {
    id: 'substrate',
    num: 4,
    sectionId: 'how-it-works',
    title: 'The 5-Stage Cognitive Loop',
    subtitle: 'Connect • Understand • Anticipate • Simulate • Orchestrate',
    stateLabel: 'OPERATING LOOP: REAL-TIME SUBSTRATE'
  },
  {
    id: 'causality',
    num: 5,
    sectionId: 'scenario',
    title: 'Root-Cause Multi-Signal Attribution',
    subtitle: 'Seeing Beyond Individual Department Symptoms',
    stateLabel: 'CAUSAL TELEMETRY: 5 CRISIS NODES TRACKED'
  },
  {
    id: 'capabilities',
    num: 6,
    sectionId: 'capabilities',
    title: 'Core Architectural Subsystems',
    subtitle: 'Six Capabilities of the Unified Enterprise OS',
    stateLabel: 'SUBSYSTEM MATRIX: ACTIVE ARCHITECTURE'
  },
  {
    id: 'living_horizon',
    num: 7,
    sectionId: 'vision',
    title: 'The Living Enterprise Horizon',
    subtitle: 'From Managing a Company to Intelligently Orchestrating One',
    stateLabel: 'LIVING SYSTEM: SELF-CALIBRATING CONSTELLATION'
  }
];

export function useScrollNarrative(): NarrativeInfo {
  const [activeStage, setActiveStage] = useState<NarrativeStage>('ambition');
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;
      setProgress(currentProgress);

      // Detect active section using positions
      const sections = NARRATIVE_STAGES_CONFIG.map((cfg) => {
        const el = document.getElementById(cfg.sectionId);
        if (!el) return { ...cfg, top: 0, bottom: 0, centerOffset: Infinity };
        const rect = el.getBoundingClientRect();
        return {
          ...cfg,
          top: rect.top + scrollY,
          bottom: rect.bottom + scrollY,
          centerOffset: Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2)
        };
      });

      // Find section currently occupying center of viewport
      let closest = sections[0];
      let minOffset = Infinity;

      sections.forEach((sec) => {
        if (sec.centerOffset < minOffset) {
          minOffset = sec.centerOffset;
          closest = sec;
        }
      });

      if (closest && closest.id !== activeStage) {
        setActiveStage(closest.id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeStage]);

  const currentConfig = NARRATIVE_STAGES_CONFIG.find((c) => c.id === activeStage) || NARRATIVE_STAGES_CONFIG[0];

  return {
    stage: activeStage,
    stageNumber: currentConfig.num,
    totalStages: NARRATIVE_STAGES_CONFIG.length,
    progress,
    stageTitle: currentConfig.title,
    stageSubtitle: currentConfig.subtitle,
    stageStateLabel: currentConfig.stateLabel
  };
}
