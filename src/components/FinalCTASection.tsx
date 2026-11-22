import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { SynapseLogo } from './SynapseLogo';

interface FinalCTAProps {
  onRequestDemo: () => void;
}

export const FinalCTASection: React.FC<FinalCTAProps> = ({ onRequestDemo }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="final-cta" className="relative pt-24 pb-12 lg:pt-32 lg:pb-16 bg-[#06070a] overflow-hidden">
      {/* Background Subtle Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-cyan-950/20 via-blue-950/10 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0f1523] via-[#0a0e17] to-[#07090f] border border-cyan-500/30 p-8 sm:p-14 lg:p-18 text-center shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden mb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>THE AI-NATIVE ENTERPRISE OPERATING SYSTEM</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6 font-sans">
            See your business as<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
              one connected system.
            </span>
          </h2>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Discover what becomes possible when your organisation can understand itself as a whole.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onRequestDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-[0_0_30px_rgba(56,189,248,0.4)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Enterprise Privacy & Security
            </span>
            <span>•</span>
            <span>Non-Invasive API Integration</span>
            <span>•</span>
            <span>Zero Data Disruption</span>
          </div>
        </div>

        {/* Minimal Professional Footer */}
        <footer className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <SynapseLogo size="sm" withSubtext={true} />
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <button onClick={() => scrollToSection('hero')} className="hover:text-white transition-colors cursor-pointer">
              Platform
            </button>
            <button onClick={() => scrollToSection('problem')} className="hover:text-white transition-colors cursor-pointer">
              The Problem
            </button>
            <button onClick={() => scrollToSection('capabilities')} className="hover:text-white transition-colors cursor-pointer">
              What Synapse Does
            </button>
            <button onClick={onRequestDemo} className="hover:text-cyan-300 transition-colors cursor-pointer">
              Request Demo
            </button>
          </div>

          <div className="text-xs font-mono text-slate-500">
            © {new Date().getFullYear()} SYNAPSE OS. All rights reserved.
          </div>
        </footer>

      </div>
    </section>
  );
};
