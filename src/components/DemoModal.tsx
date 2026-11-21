import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Building, Mail, User } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    headcount: '1,000 - 5,000 employees',
    primaryChallenge: 'Cross-departmental visibility & causal prediction'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-2xl bg-[#0c1017] border border-white/[0.12] shadow-[0_24px_80px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#090d14]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
              EXECUTIVE BRIEFING // DEMO REGISTRATION
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                  Request an Architecture Briefing
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Join our technical product team for a dedicated demonstration tailored to your enterprise systems, data topography, and organizational scale.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    WORK EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="jane@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    ORGANISATION
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Acme Global Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1">
                    HEADCOUNT TIER
                  </label>
                  <select
                    value={formData.headcount}
                    onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                    className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option>500 - 1,000 employees</option>
                    <option>1,000 - 5,000 employees</option>
                    <option>5,000 - 20,000 employees</option>
                    <option>20,000+ global workforce</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1">
                  PRIMARY ORGANISATIONAL CHALLENGE
                </label>
                <select
                  value={formData.primaryChallenge}
                  onChange={(e) => setFormData({ ...formData, primaryChallenge: e.target.value })}
                  className="w-full px-3 py-2.5 bg-black/50 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option>Cross-departmental visibility & causal prediction</option>
                  <option>Decision simulation & executive risk modeling</option>
                  <option>Unified operational workflow orchestration</option>
                  <option>Continuous organizational learning across silos</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 rounded-xl shadow-[0_0_24px_rgba(56,189,248,0.35)] flex items-center justify-center gap-2 active:scale-[0.97] transition-all"
                >
                  <span>Submit Demo Request</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 pt-2 text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Non-Disclosure Protected
                </span>
                <span>•</span>
                <span>SOC2 Type II Assured</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-cyan-950/80 border border-cyan-500/60 flex items-center justify-center mx-auto text-cyan-400 shadow-[0_0_24px_rgba(56,189,248,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-1">
                  Briefing Request Confirmed
                </h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-slate-200">{formData.name}</strong>. Our enterprise engineering team will contact <strong className="text-cyan-300">{formData.email}</strong> within 1 business day with your dedicated simulation sandbox.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 rounded-lg transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
