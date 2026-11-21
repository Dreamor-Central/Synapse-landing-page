import React from 'react';
import { ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
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
    <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-16 bg-[#06070a] overflow-hidden">
      {/* Background Cyan Ambient Flare */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-950/20 via-blue-950/15 to-transparent blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Final CTA Container - Exact Required Text */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#0f1523] via-[#0a0e17] to-[#07090f] border border-cyan-500/30 p-8 sm:p-14 lg:p-20 text-center shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden mb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>THE INTELLIGENCE LAYER FOR MODERN ENTERPRISES</span>
          </div>

          {/* Headline - Exact required text */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] max-w-4xl mx-auto mb-6 font-sans">
            Give your company a<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
              unified intelligence.
            </span>
          </h2>

          {/* Supporting Text - Exact required text */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-10">
            Discover what becomes possible when your entire organisation operates with one connected understanding.
          </p>

          {/* Primary & Secondary CTAs - Exact required labels */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={onRequestDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-[0_0_30px_rgba(56,189,248,0.4)] active:scale-[0.97] transition-all"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollToSection('vision')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-semibold text-slate-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] rounded-xl active:scale-[0.97] transition-all"
            >
              <span>Explore Our Vision</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400/80" /> Enterprise-Grade Privacy & Security
            </span>
            <span>•</span>
            <span>Non-Invasive API Integration</span>
            <span>•</span>
            <span>Zero Data Exfiltration</span>
          </div>
        </div>

        {/* FOOTER - Exact Required Structure & Constraints */}
        <footer className="pt-12 border-t border-white/[0.08]">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12">
            
            {/* Logo / Brand (2 Cols) */}
            <div className="col-span-2">
              <div className="mb-4">
                <SynapseLogo size="md" withSubtext={true} />
              </div>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed mb-4">
                The intelligence and operating infrastructure that helps companies understand, anticipate and orchestrate their entire organisation.
              </p>
              <div className="text-[11px] font-mono text-slate-300">
                AI-Native Enterprise Operating System
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-4 font-semibold">
                Platform
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }} className="hover:text-white transition-colors">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#scenario" onClick={(e) => { e.preventDefault(); scrollToSection('scenario'); }} className="hover:text-white transition-colors">
                    Live Scenario
                  </a>
                </li>
                <li>
                  <a href="#transformation" onClick={(e) => { e.preventDefault(); scrollToSection('transformation'); }} className="hover:text-white transition-colors">
                    System Architecture
                  </a>
                </li>
              </ul>
            </div>

            {/* Capabilities Links */}
            <div>
              <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-4 font-semibold">
                Capabilities
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }} className="hover:text-white transition-colors">
                    Unified Intelligence
                  </a>
                </li>
                <li>
                  <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }} className="hover:text-white transition-colors">
                    Operational Understanding
                  </a>
                </li>
                <li>
                  <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }} className="hover:text-white transition-colors">
                    Predictive Intelligence
                  </a>
                </li>
                <li>
                  <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }} className="hover:text-white transition-colors">
                    Decision Simulation
                  </a>
                </li>
                <li>
                  <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }} className="hover:text-white transition-colors">
                    Intelligent Orchestration
                  </a>
                </li>
                <li>
                  <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }} className="hover:text-white transition-colors">
                    Continuous Learning
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-4 font-semibold">
                Company
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#vision" onClick={(e) => { e.preventDefault(); scrollToSection('vision'); }} className="hover:text-white transition-colors">
                    Vision
                  </a>
                </li>
                <li>
                  <button onClick={onRequestDemo} className="hover:text-white transition-colors text-left">
                    Briefing Center
                  </button>
                </li>
                <li>
                  <a href="#problem" onClick={(e) => { e.preventDefault(); scrollToSection('problem'); }} className="hover:text-white transition-colors">
                    Why Now
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal / Contact */}
            <div>
              <div className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-4 font-semibold">
                Legal & Trust
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <button onClick={onRequestDemo} className="hover:text-white transition-colors text-left">
                    Contact
                  </button>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert('SYNAPSE OS adheres to strict enterprise non-disclosure, SOC2 Type II compliance, and zero data retention outside your boundary.')}>
                    Privacy
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer" onClick={() => alert('Enterprise license terms govern all deployment instances and API integrations.')}>
                    Terms
                  </span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Attribution Bar (Strict constraint: no fake contact details or social profiles) */}
          <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-300">
            <div>
              © 2026 SYNAPSE OS. All rights reserved. Built with Antigravity.
            </div>
            <div>
              Enterprise Architecture Classification: Level 4 Autonomous Operating System
            </div>
          </div>
        </footer>

      </div>
    </section>
  );
};

