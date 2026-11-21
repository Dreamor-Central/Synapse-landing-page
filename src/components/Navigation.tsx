import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { SynapseLogo } from './SynapseLogo';

interface NavigationProps {
  onRequestDemo: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onRequestDemo }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', href: '#hero' },
    { label: 'Living Topology', href: '#living-topology' },
    { label: 'The Problem', href: '#problem' },
    { label: 'Transformation', href: '#transformation' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Vision', href: '#vision' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07080B]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.5)] py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity & Wordmark */}
            <a
              href="#hero"
              className="flex items-center group focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-lg p-0.5"
            >
              <SynapseLogo size="md" withSubtext={true} />
            </a>

            {/* Center Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md shadow-inner">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-150 ${
                    link.label === 'Living Topology'
                      ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 hover:bg-cyan-950/60'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onRequestDemo}
                className="relative inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-lg shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all duration-150 active:scale-[0.97]"
              >
                <span>Request a Demo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={onRequestDemo}
                className="sm:hidden px-3 py-1.5 text-xs font-semibold text-black bg-cyan-400 rounded-md"
              >
                Demo
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-white/[0.04] border border-white/[0.08]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (with Emil Kowalski ease-out) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#07080B]/95 backdrop-blur-xl pt-24 px-6 pb-8 flex flex-col justify-between border-b border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-3">
            <div className="text-[10px] font-mono tracking-widest text-slate-300 uppercase mb-2">
              Navigation Menu
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-lg font-medium text-slate-200 hover:text-cyan-400 py-2 border-b border-white/[0.05] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestDemo();
              }}
              className="w-full py-3.5 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.97]"
            >
              <span>Request an Executive Demo</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[11px] font-mono text-slate-300">
              SYNAPSE OS v1.0 • Enterprise Architecture
            </div>
          </div>
        </div>
      )}
    </>
  );
};

