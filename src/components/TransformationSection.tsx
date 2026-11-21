import React, { useState } from 'react';
import { Network, Zap, CheckCircle2, Activity, Layers, Sparkles } from 'lucide-react';

export const TransformationSection: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<'demand' | 'supply' | 'pricing'>('demand');

  const events = {
    demand: {
      name: 'Customer Demand Surges +40%',
      description: 'Marketing campaigns outperform expectations in mid-market enterprise tier.',
      propagation: [
        { dept: 'Marketing', change: 'Campaign throttled to target high-margin segments; budget auto-rebalanced.' },
        { dept: 'Sales', change: 'CRM automatically adjusts quoted SLA delivery from 3 to 6 days to prevent breaches.' },
        { dept: 'Supply Chain', change: 'Secondary supplier order activated ahead of time via dynamic API reserve.' },
        { dept: 'Operations', change: 'Shift schedules synchronized to match inbound logistics throughput.' },
        { dept: 'Finance', change: 'Real-time gross margin forecast updated with +$840k EBITDA expansion.' }
      ]
    },
    supply: {
      name: 'Critical Vendor Delay (+14 Days)',
      description: 'Key semiconductor component supplier experiences logistics bottleneck.',
      propagation: [
        { dept: 'Supply Chain', change: 'Disruption flagged immediately; alternative inventory routing engaged.' },
        { dept: 'Operations', change: 'Assembly lines rescheduled to prioritize components currently in stock.' },
        { dept: 'Sales', change: 'Reps notified of lead time buffer for affected SKUs with zero customer friction.' },
        { dept: 'Marketing', change: 'Ad spend pivoted to substitute product lines with plentiful inventory.' },
        { dept: 'Finance', change: 'Working capital requirements recalculated; zero emergency air-freight incurred.' }
      ]
    },
    pricing: {
      name: 'Strategic Pricing Realignment (+8%)',
      description: 'Executive team explores pricing adjustment to hedge against input inflation.',
      propagation: [
        { dept: 'Strategy', change: 'Scenario modeled across 1,400 enterprise accounts with elastic churn bounds.' },
        { dept: 'Sales', change: 'Contract discount floors updated across Salesforce CPQ with grandfathering.' },
        { dept: 'Customers', change: 'CSM team receives proactive retention playbooks for sensitive customer cohorts.' },
        { dept: 'Operations', change: 'Order volume projections adjusted by -3.2% with net margin expansion.' },
        { dept: 'Finance', change: '+$2.4M ARR addition verified with negligible impact on lifetime value.' }
      ]
    }
  };

  return (
    <section id="transformation" className="relative py-24 lg:py-32 bg-[#080a0f] border-b border-white/[0.06] overflow-hidden">
      {/* Background Cyan Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-950/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Exact Required Text */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE UNIFIED PARADIGM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            What if your entire company<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              worked as one system?
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Our platform brings your company's information, operations and intelligence together, creating one evolving understanding of how the organisation works.
          </p>
        </div>

        {/* Interactive Event Propagation Sandbox */}
        <div className="mb-20 rounded-2xl bg-gradient-to-b from-[#0f1420] to-[#090c13] border border-white/[0.08] p-6 lg:p-8 shadow-[0_12px_48px_rgba(0,0,0,0.6)]">
          
          {/* Top Bar: Event Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/[0.08] gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>ORGANISATIONAL EVENT PROPAGATION</span>
              </div>
              <p className="text-sm text-slate-300">
                Select a business event to witness how intelligence flows instantaneously across all departments:
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedEvent('demand')}
                className={`px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                  selectedEvent === 'demand'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                1. Demand Surge (+40%)
              </button>
              <button
                onClick={() => setSelectedEvent('supply')}
                className={`px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                  selectedEvent === 'supply'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                2. Vendor Delay (+14d)
              </button>
              <button
                onClick={() => setSelectedEvent('pricing')}
                className={`px-3 py-2 text-xs font-mono rounded-lg transition-all ${
                  selectedEvent === 'pricing'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/60 shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                    : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                3. Pricing Realignment (+8%)
              </button>
            </div>
          </div>

          {/* Interactive Graph & Real-Time Synchronized Responses */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Dynamic Network Diagram (5 cols) */}
            <div className="lg:col-span-5 relative p-6 rounded-xl bg-black/50 border border-white/[0.06] flex flex-col items-center justify-center min-h-[380px]">
              <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400/80 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>DYNAMIC CAUSAL GRAPH (LIVE)</span>
              </div>

              {/* Graphic Topology representation */}
              <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Center Core */}
                <div className="w-20 h-20 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.4)] z-10 text-center animate-pulse">
                  <span className="text-[10px] font-mono font-bold text-cyan-300">SYNAPSE</span>
                  <span className="text-[8px] font-mono text-cyan-400">CORE</span>
                </div>

                {/* Orbiting Dept Nodes */}
                {[
                  { name: 'Marketing', angle: 0, color: '#EC4899' },
                  { name: 'Sales', angle: 72, color: '#60A5FA' },
                  { name: 'Operations', angle: 144, color: '#F59E0B' },
                  { name: 'Finance', angle: 216, color: '#38BDF8' },
                  { name: 'Supply Chain', angle: 288, color: '#F97316' }
                ].map((node) => {
                  const rad = (node.angle * Math.PI) / 180;
                  const x = Math.cos(rad) * 105;
                  const y = Math.sin(rad) * 105;
                  return (
                    <div
                      key={node.name}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                      className="absolute w-14 h-14 rounded-full bg-[#0d121c] border flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                    >
                      <div
                        className="w-2 h-2 rounded-full mb-0.5"
                        style={{ backgroundColor: node.color }}
                      />
                      <span className="text-[9px] font-mono font-semibold text-slate-200">
                        {node.name.slice(0, 4)}
                      </span>
                    </div>
                  );
                })}

                {/* Connecting Web Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-128 -128 256 256">
                  {[0, 72, 144, 216, 288].map((angle, idx) => {
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * 105;
                    const y = Math.sin(rad) * 105;
                    return (
                      <g key={idx}>
                        <line x1="0" y1="0" x2={x} y2={y} stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.5" strokeDasharray="3 3" />
                        <circle cx={x * 0.5} cy={y * 0.5} r="2.5" fill="#38bdf8" className="animate-ping" />
                      </g>
                    );
                  })}
                </svg>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] font-mono text-slate-400">
                  Event: <strong className="text-white">{events[selectedEvent].name}</strong>
                </span>
              </div>
            </div>

            {/* Coordinated Real-time Propagations (7 cols) */}
            <div className="lg:col-span-7 space-y-2.5">
              <div className="text-xs font-mono text-cyan-400 mb-3 flex items-center justify-between">
                <span>SIMULTANEOUS AUTOMATED COORDINATION</span>
                <span className="text-slate-300">LATENCY: &lt; 200MS</span>
              </div>

              {events[selectedEvent].propagation.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-cyan-500/30 transition-all flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-md bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[10px] font-mono font-bold text-cyan-300">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300">
                        {item.dept}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Synchronized
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* The Three Cornerstone Pillars - Exact Required Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0f1420] to-[#0a0d14] border border-white/[0.08] relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
              PILLAR 01
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              One company.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No more departmental fiefdoms operating with contradictory data. From the frontline rep to the board room, every entity coordinates from identical operational reality.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0f1420] to-[#0a0d14] border border-cyan-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(56,189,248,0.1)] group hover:border-cyan-400 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center mb-6 text-cyan-300 group-hover:scale-110 transition-transform">
              <Network className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
              PILLAR 02
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              One connected reality.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              A dynamic, living causal graph that understands how supply chain shocks ripple into customer retention, and how marketing changes influence operating margins.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-b from-[#0f1420] to-[#0a0d14] border border-white/[0.08] relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
              PILLAR 03
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              One intelligence layer.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Autonomous causal reasoning, scenario simulation, and human-in-the-loop workflow dispatching that turns organizational intelligence into coordinated execution.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
