import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, AlertCircle, BarChart3, Check } from 'lucide-react';
import { BUSINESS_SIGNALS } from '../data/enterpriseData';

export const BusinessScenario: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'what' | 'why' | 'next' | 'alternatives' | 'action'>('what');
  const [selectedStrategy, setSelectedStrategy] = useState<'a' | 'b'>('b');
  const [actionApproved, setActionApproved] = useState(false);

  const tabs = [
    { id: 'what', label: '1. What is happening' },
    { id: 'why', label: '2. Why it is happening' },
    { id: 'next', label: '3. What could happen next' },
    { id: 'alternatives', label: '4. Decision alternatives' },
    { id: 'action', label: '5. Action to consider' },
  ] as const;

  return (
    <section id="scenario" className="relative py-24 lg:py-32 bg-[#08090d] border-b border-white/[0.06] overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 right-1/3 w-[650px] h-[450px] bg-cyan-950/15 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Exact Required Text */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/40 text-cyan-400 text-xs font-mono font-medium mb-4">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>ENTERPRISE SCENARIO ANALYSIS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] mb-6">
            See the whole picture.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-white">
              Not just one department.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            When revenue starts declining, traditional companies treat symptoms in isolation: sales pushes discounts, marketing ramps ad budgets. Our platform reveals the cross-functional truth.
          </p>
        </div>

        {/* The 5 Interconnected Signals Overview Grid */}
        <div className="mb-10">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>SCENARIO CONTEXT: REVENUE STARTS DECLINING</span>
            <span className="text-red-400 font-semibold">5 CROSS-DEPARTMENTAL SIGNALS CONNECTED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {BUSINESS_SIGNALS.map((signal) => (
              <div
                key={signal.id}
                className="p-4 rounded-xl bg-[#0e121a] border border-white/[0.08] hover:border-cyan-500/40 transition-all shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40 uppercase">
                    {signal.department}
                  </span>
                  <div className={`flex items-center text-xs font-mono font-bold ${
                    signal.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
                  }`}>
                    {signal.delta}
                    {signal.direction === 'up' ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>

                <div className="text-xs font-semibold text-white mb-1 leading-snug">
                  {signal.name}
                </div>

                <div className="text-lg font-bold text-slate-200 font-mono mb-2">
                  {signal.metric}
                </div>

                <p className="text-[11px] text-slate-400 leading-tight">
                  {signal.causalLink}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Insight & Intervention Callout Cards - Exact Required Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Example Insight */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#121622] to-[#0a0e16] border border-cyan-500/30 shadow-[0_0_30px_rgba(56,189,248,0.1)] relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                SYNAPSE PLATFORM INSIGHT
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-white leading-snug">
              "Revenue decline is being reinforced by rising acquisition costs and fulfilment delays."
            </p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Root cause analysis proves that spending more on sales and marketing is actively accelerating customer churn until fulfillment capacity is stabilized.
            </p>
          </div>

          {/* Potential Intervention */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0e1824] to-[#09111c] border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] relative">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                POTENTIAL STRATEGIC INTERVENTION
              </span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-white leading-snug">
              "Improving fulfilment capacity before increasing acquisition spending may produce a better financial outcome."
            </p>
            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Simulation proves that reallocating $150k from ad spend to 2nd-shift warehouse staffing restores 99.4% SLA adherence within 12 days and preserves $1.4M ARR.
            </p>
          </div>

        </div>

        {/* 5-View Interactive Exploration Container */}
        <div className="rounded-2xl bg-[#0c1017] border border-white/[0.08] overflow-hidden shadow-2xl">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b border-white/[0.08] bg-[#090c12]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-3.5 text-xs font-mono font-semibold transition-all border-b-2 -mb-[2px] ${
                  activeTab === tab.id
                    ? 'border-cyan-400 text-cyan-300 bg-white/[0.03]'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Viewport */}
          <div className="p-6 sm:p-10">
            
            {/* VIEW 1: WHAT IS HAPPENING */}
            {activeTab === 'what' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    1. What is happening: Cross-Department Telemetry Anomaly
                  </h3>
                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Over the past 60 days, overall top-line revenue dipped 14.8%. Department leaders viewed their numbers in silos, missing the reinforcing feedback loop that connected paid marketing, warehouse strain, and customer renewals.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-xs font-mono text-slate-400">Marketing View</span>
                    <div className="text-base font-bold text-white mt-1">Lead Volume +22%</div>
                    <div className="text-xs text-amber-400 mt-0.5">CAC surged 38% ($2,480)</div>
                    <p className="text-[11px] text-slate-400 mt-2">Marketing assumes it is performing well because lead volume hit quota.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-xs font-mono text-slate-400">Operations View</span>
                    <div className="text-base font-bold text-white mt-1">Queue Delay +5.2 Days</div>
                    <div className="text-xs text-red-400 mt-0.5">Backlog 188% of Normal</div>
                    <p className="text-[11px] text-slate-400 mt-2">Warehouse is flooded with complex custom orders it cannot ship on time.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-xs font-mono text-slate-400">Customer Success View</span>
                    <div className="text-base font-bold text-white mt-1">Renewal Rate -18%</div>
                    <div className="text-xs text-red-400 mt-0.5">NPS dropped 34 points</div>
                    <p className="text-[11px] text-slate-400 mt-2">Enterprise buyers abandon contracts after missed delivery deadlines.</p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: WHY IT IS HAPPENING */}
            {activeTab === 'why' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    2. Why it is happening: The Reinforcing Causal Loop
                  </h3>
                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    The platform traces the multi-hop causal graph to identify the root cause: Marketing expanded targeting to meet MQL goals, driving demand for product variants that Operations had no stock for.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-black/50 border border-white/10 space-y-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-pink-950/40 border border-pink-800/40 text-center w-full md:w-48">
                      <div className="text-pink-400 font-bold">1. MARKETING</div>
                      <div className="text-slate-300 text-[11px]">Expands targeting to marginal personas</div>
                    </div>
                    <span className="text-slate-300 font-bold hidden md:block">→</span>
                    <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-800/40 text-center w-full md:w-48">
                      <div className="text-blue-400 font-bold">2. SALES</div>
                      <div className="text-slate-300 text-[11px]">Quotes standard turnaround on non-stock SKUs</div>
                    </div>
                    <span className="text-slate-300 font-bold hidden md:block">→</span>
                    <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800/40 text-center w-full md:w-48">
                      <div className="text-amber-400 font-bold">3. OPERATIONS</div>
                      <div className="text-slate-300 text-[11px]">Fulfillment backlog spikes to 7.8 days</div>
                    </div>
                    <span className="text-slate-300 font-bold hidden md:block">→</span>
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-center w-full md:w-48">
                      <div className="text-red-400 font-bold">4. CUSTOMERS</div>
                      <div className="text-slate-300 text-[11px]">Premium accounts churn due to delays</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs font-mono text-cyan-300 flex items-center justify-between">
                    <span>FEEDBACK ATTRIBUTION SCORE: 94.2% CERTAINTY</span>
                    <span>NEGATIVE SPIRAL DETECTED</span>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: WHAT COULD HAPPEN NEXT */}
            {activeTab === 'next' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    3. What could happen next: 90-Day Trajectory Projection
                  </h3>
                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    If leadership continues conventional siloed management (spending more on ads and demanding Sales discount harder), the company faces accelerating margin erosion.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/40">
                    <span className="text-xs font-mono text-red-400 uppercase tracking-wider block mb-2">
                      PATH A: UNMITIGATED CONVENTIONAL RESPONSE
                    </span>
                    <div className="text-2xl font-bold text-white mb-1">-$3.8M Net Margin</div>
                    <div className="text-xs text-red-300 mb-4">Churn rate accelerates to 28% within 90 days.</div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>• Ad spend escalates to $1.2M with diminishing returns</li>
                      <li>• Warehouse staff turnover reaches 35% due to overtime strain</li>
                      <li>• Emergency freight surcharges consume all remaining gross profit</li>
                    </ul>
                  </div>

                  <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/40">
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-2">
                      PATH B: SYNAPSE COORDINATED INTERVENTION
                    </span>
                    <div className="text-2xl font-bold text-white mb-1">+$1.6M Net Margin Recovery</div>
                    <div className="text-xs text-emerald-300 mb-4">Fulfillment SLA restored to 1.8 days in 14 days.</div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li>• Marketing pauses low-intent ads; focuses on high-stock SKUs</li>
                      <li>• Warehouse adds targeted 2nd shift triage capacity</li>
                      <li>• Retention rebounds to 94%; customer trust stabilized</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: DECISION ALTERNATIVES */}
            {activeTab === 'alternatives' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    4. What alternative decisions could change: Interactive Simulator
                  </h3>
                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Compare different strategic interventions across your organization before committing real capital or reallocating teams.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setSelectedStrategy('a')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedStrategy === 'a'
                        ? 'bg-cyan-950/30 border-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]'
                        : 'bg-black/30 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-slate-300">
                        Option A: Increase Ad Spend & Sales Commission (+25%)
                      </span>
                      {selectedStrategy === 'a' && <Check className="w-4 h-4 text-cyan-400" />}
                    </div>
                    <div className="text-xs text-slate-400 mb-3">
                      Conventional playbook: Try to sell out of the problem.
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-white/5">
                      <div>EBITDA: <span className="text-red-400">-12%</span></div>
                      <div>Fulfillment Lag: <span className="text-red-400">+11 Days</span></div>
                    </div>
                  </div>

                  <div
                    onClick={() => setSelectedStrategy('b')}
                    className={`p-5 rounded-xl border cursor-pointer transition-all ${
                      selectedStrategy === 'b'
                        ? 'bg-emerald-950/30 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'bg-black/30 border-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-emerald-300">
                        Option B: Cap Spend + Expand Fulfillment Buffer (Recommended)
                      </span>
                      {selectedStrategy === 'b' && <Check className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <div className="text-xs text-slate-400 mb-3">
                      Systemic solution: Align customer acquisition rate with delivery capability.
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-3 border-t border-white/5">
                      <div>EBITDA: <span className="text-emerald-400">+24%</span></div>
                      <div>Fulfillment Lag: <span className="text-emerald-400">1.8 Days</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 5: ACTION TO CONSIDER */}
            {activeTab === 'action' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    5. What action should be considered: Coordinated Execution Plan
                  </h3>
                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    The platform prepares atomic operational actions across all underlying systems, queued for executive sign-off:
                  </p>
                </div>

                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">Google Ads / Meta Marketing</div>
                        <div className="text-xs text-slate-400">Rebalance ad spend to high-inventory SKU catalog (-$140k/mo)</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">PENDING APPROVAL</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">SAP S/4HANA & WMS</div>
                        <div className="text-xs text-slate-400">Authorize secondary fulfillment partner capacity for Midwest hub</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">PENDING APPROVAL</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <div>
                        <div className="text-xs font-mono font-semibold text-white">Salesforce CPQ</div>
                        <div className="text-xs text-slate-400">Update dynamic lead time quotes to 5-day SLA buffer</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400">PENDING APPROVAL</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    AUTHORIZATION GOVERNANCE: DUAL-KEY EXECUTIVE AUDIT REQUIRED
                  </div>
                  <button
                    onClick={() => setActionApproved(true)}
                    disabled={actionApproved}
                    className={`px-6 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                      actionApproved
                        ? 'bg-emerald-500 text-black cursor-default'
                        : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg active:scale-[0.97]'
                    }`}
                  >
                    {actionApproved ? '✓ Dispatched to Systems' : 'Authorize Coordinated Action'}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Important Discretionary Disclaimer - Exact Required Content */}
          <div className="px-6 py-3 bg-[#080a0f] border-t border-white/[0.06] text-center">
            <p className="text-[11px] font-mono text-slate-300 flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-300" />
              <span>Important: This is an illustrative product demonstration, not a claim that the platform already achieves validated predictive accuracy.</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
