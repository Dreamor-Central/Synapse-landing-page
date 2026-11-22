import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ContinuousEnterprise3D } from './ContinuousEnterprise3D';

interface HeroProps {
  onRequestDemo: () => void;
  onExploreCapabilities?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestDemo }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[85vh] lg:min-h-[760px] lg:max-h-[960px] pt-32 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-white/[0.06] flex items-center">
      {/* Background Architectural Subtle Ambient Lighting & Grid */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-cyan-950/20 via-blue-950/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:36px_36px] opacity-50" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Pure, Uncluttered Proposition (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-800/40 text-cyan-300 text-xs font-mono font-medium mb-6 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>THE AI-NATIVE ENTERPRISE OPERATING SYSTEM</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 font-sans">
              Your entire company.<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                One intelligence.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-xl">
              Connect your business. Understand how everything works together. Anticipate what's next. Make better decisions.
            </p>

            {/* Clear Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onRequestDemo}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-[0_0_28px_rgba(56,189,248,0.35)] transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                <span>Request a Demo</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToSection('problem')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl transition-all duration-150 active:scale-[0.98] cursor-pointer"
              >
                <span>See How It Works</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Subtle Value Note */}
            <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Unified Enterprise Context
              </span>
              <span>•</span>
              <span>Non-Invasive Architecture</span>
            </div>
          </div>

          {/* Right Column: Premium 3D Enterprise Network Visualization (6 Cols) */}
          <div className="lg:col-span-6 h-[380px] sm:h-[480px] lg:h-[540px] relative w-full rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-b from-[#0a0e17]/80 to-[#07090e]/90 shadow-2xl">
            <ContinuousEnterprise3D mode="hero" interactive={true} />
            
            {/* Minimal Ambient Legend */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-slate-400 pointer-events-none">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                CONNECTED ENTERPRISE NETWORK
              </span>
              <span className="text-slate-500 hidden sm:inline">INTERACTIVE 3D // ROTATE & EXPLORE</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
