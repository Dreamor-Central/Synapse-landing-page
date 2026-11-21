import type { OperationalDomain, ProblemIsland, HowItWorksStage, BusinessSignal, Capability } from '../types';

export const OPERATIONAL_DOMAINS: OperationalDomain[] = [
  {
    id: 'finance',
    name: 'Finance',
    category: 'Capital & Treasury',
    color: '#38BDF8', // Cyan
    description: 'Real-time liquidity, unit economics, working capital, and margin variance across business lines.',
    systems: ['SAP S/4HANA', 'NetSuite', 'Anaplan', 'Stripe'],
    metrics: [
      { label: 'EBITDA Margin', value: '26.4%', trend: 'nominal', status: 'good' },
      { label: 'Working Capital', value: '$84.2M', trend: 'down', status: 'warning' },
      { label: 'Cash Flow Velocity', value: '1.4x', trend: 'nominal', status: 'good' }
    ],
    connections: ['operations', 'sales', 'strategy', 'supply-chain'],
    throughput: '42.8k events/sec',
    latency: '< 18ms'
  },
  {
    id: 'people',
    name: 'People',
    category: 'Talent & Capacity',
    color: '#818CF8', // Indigo
    description: 'Engineering capacity, recruitment velocity, organizational load, and skill distribution.',
    systems: ['Workday', 'Greenhouse', 'Lattice', 'CultureAmp'],
    metrics: [
      { label: 'Utilization Index', value: '88.2%', trend: 'up', status: 'warning' },
      { label: 'Time-to-Hire', value: '31 Days', trend: 'nominal', status: 'good' },
      { label: 'Attrition Risk', value: '3.1%', trend: 'nominal', status: 'good' }
    ],
    connections: ['operations', 'strategy', 'finance'],
    throughput: '8.4k events/sec',
    latency: '< 24ms'
  },
  {
    id: 'customers',
    name: 'Customers',
    category: 'Retention & Value',
    color: '#34D399', // Emerald
    description: 'Cohort retention, churn leading indicators, sentiment signals, and lifetime value.',
    systems: ['Segment', 'Snowflake', 'Gainsight', 'Zendesk'],
    metrics: [
      { label: 'Net Retention (NDR)', value: '118.5%', trend: 'nominal', status: 'good' },
      { label: 'CSAT Score', value: '4.82/5', trend: 'nominal', status: 'good' },
      { label: 'Expansion Rate', value: '+24%', trend: 'up', status: 'good' }
    ],
    connections: ['sales', 'marketing', 'operations', 'strategy'],
    throughput: '124.6k events/sec',
    latency: '< 12ms'
  },
  {
    id: 'operations',
    name: 'Operations',
    category: 'Execution & Throughput',
    color: '#F59E0B', // Amber
    description: 'Infrastructure latency, service level fulfillment, support ticket resolution, and workflow bottlenecks.',
    systems: ['Datadog', 'Jira Service', 'PagerDuty', 'ServiceNow'],
    metrics: [
      { label: 'SLA Adherence', value: '99.94%', trend: 'nominal', status: 'good' },
      { label: 'Fulfillment Cycle', value: '1.8 Days', trend: 'nominal', status: 'good' },
      { label: 'System Queue Depth', value: '412 ops', trend: 'down', status: 'good' }
    ],
    connections: ['finance', 'people', 'supply-chain', 'customers'],
    throughput: '310.2k events/sec',
    latency: '< 8ms'
  },
  {
    id: 'sales',
    name: 'Sales',
    category: 'Revenue Pipeline',
    color: '#60A5FA', // Blue
    description: 'Contract velocity, enterprise pipeline health, win rates, and regional quota distribution.',
    systems: ['Salesforce CRM', 'Clari', 'Gong', 'Highspot'],
    metrics: [
      { label: 'Qualified Pipeline', value: '$148.6M', trend: 'up', status: 'good' },
      { label: 'Win Rate', value: '34.2%', trend: 'nominal', status: 'good' },
      { label: 'Sales Cycle', value: '62 Days', trend: 'down', status: 'good' }
    ],
    connections: ['marketing', 'customers', 'finance', 'operations'],
    throughput: '19.4k events/sec',
    latency: '< 20ms'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    category: 'Demand & Acquisition',
    color: '#EC4899', // Pink
    description: 'Blended acquisition efficiency, pipeline contribution, campaign attribution, and market signals.',
    systems: ['Marketo', 'Google Ads', 'LinkedIn B2B', 'Meta API'],
    metrics: [
      { label: 'Blended CAC', value: '$1,840', trend: 'nominal', status: 'good' },
      { label: 'Pipeline Inbound', value: '$28.4M', trend: 'up', status: 'good' },
      { label: 'MQL to SQL Ratio', value: '42.1%', trend: 'nominal', status: 'good' }
    ],
    connections: ['sales', 'customers', 'finance'],
    throughput: '78.2k events/sec',
    latency: '< 15ms'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    category: 'Inventory & Logistics',
    color: '#F97316', // Orange
    description: 'Tier-1 vendor reliability, inventory safety stock, logistics freight times, and lead times.',
    systems: ['Oracle SCM', 'Manhattan Associates', 'Project44', 'SAP TM'],
    metrics: [
      { label: 'Inventory Turnover', value: '6.8x', trend: 'nominal', status: 'good' },
      { label: 'Vendor Fill Rate', value: '97.2%', trend: 'down', status: 'warning' },
      { label: 'In-Transit Buffer', value: '14.2 Days', trend: 'nominal', status: 'good' }
    ],
    connections: ['operations', 'finance', 'strategy'],
    throughput: '34.1k events/sec',
    latency: '< 22ms'
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Executive Alignment',
    color: '#A855F7', // Purple
    description: 'Long-term corporate capital allocation, strategic OKR tracking, and scenario probabilities.',
    systems: ['WorkBoard', 'Planview', 'Looker Core', 'Board Books'],
    metrics: [
      { label: 'Strategic Alignment', value: '94.0%', trend: 'nominal', status: 'good' },
      { label: 'Scenario Convergence', value: '91.8%', trend: 'up', status: 'good' },
      { label: 'CapEx Efficiency', value: '3.4x ROI', trend: 'nominal', status: 'good' }
    ],
    connections: ['finance', 'people', 'customers', 'operations', 'sales'],
    throughput: '4.2k events/sec',
    latency: '< 30ms'
  }
];

export const PROBLEM_ISLANDS: ProblemIsland[] = [
  {
    id: 'finance',
    name: 'Finance',
    toolset: 'ERP & Accounting (SAP, NetSuite, Excel)',
    isolatedView: 'Historical revenue, margin reports, and monthly expense close.',
    dataLatency: '30 to 45 days batch reconciliation',
    blindspot: 'Has no visibility into real-time operational capacity or customer churn leading indicators.',
    impactOnSurge: 'Discovers margin compression 45 days too late when expedited shipping invoices hit.',
    status: 'normal'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    toolset: 'Ad Platforms & Attribution (Google, LinkedIn, Marketo)',
    isolatedView: 'Lead volume, impressions, CTR, and top-of-funnel conversion.',
    dataLatency: '24 to 48 hours attribution reporting',
    blindspot: 'Assumes infinite warehouse inventory and instant fulfillment capability.',
    impactOnSurge: 'Doubles ad spend to capture surging demand, pulling in low-margin orders.',
    status: 'stressed'
  },
  {
    id: 'sales',
    name: 'Sales',
    toolset: 'CRM & Pipeline (Salesforce, Clari, Outreach)',
    isolatedView: 'Closed-won deals, quota attainment, and open opportunities.',
    dataLatency: 'Weekly forecast calls and manual rep updates',
    blindspot: 'Unaware that factory lines are already at 104% capacity limits.',
    impactOnSurge: 'Overpromises expedited 3-day deliveries to hit quarterly bonuses.',
    status: 'stressed'
  },
  {
    id: 'operations',
    name: 'Operations',
    toolset: 'SCM, WMS & Logistics (Oracle, Manhattan, Jira)',
    isolatedView: 'Warehouse throughput, truck schedules, and shipping backlogs.',
    dataLatency: 'Shift-by-shift batch reports',
    blindspot: 'Has zero forewarning about the inbound marketing traffic wave.',
    impactOnSurge: 'Warehouse bottlenecks collapse under 160% load; SLA breach rate surges.',
    status: 'critical'
  },
  {
    id: 'people',
    name: 'People',
    toolset: 'HRIS & Staffing (Workday, Greenhouse)',
    isolatedView: 'Headcount plan, open job requisitions, and payroll.',
    dataLatency: 'Monthly talent review reviews',
    blindspot: 'Cannot dynamically redistribute talent to triage operational backlogs.',
    impactOnSurge: 'Overtime costs surge 300%; staff burnout accelerates voluntary departures.',
    status: 'critical'
  }
];

export const HOW_IT_WORKS_STAGES: HowItWorksStage[] = [
  {
    step: '01',
    title: 'Connect',
    headline: 'Unified Organisational Data',
    description: 'Bring information from your existing systems into one connected environment — without replacing your tools.',
    details: [
      'Zero-lift native connectors for ERP, CRM, HRIS, Data Lakes, WMS, and custom APIs.',
      'Heterogeneous schema reconciliation and semantic normalization in real-time.',
      'Preserves existing permissions, enterprise security policies, and RBAC governance.'
    ],
    metricsPreview: [
      { label: 'Supported Integrations', value: '180+ Enterprise Connectors' },
      { label: 'Ingestion Latency', value: '< 250ms Global Pipeline' },
      { label: 'Data Fidelity', value: '100% Immutable Provenance' }
    ],
    systemCapability: 'Connects fragmented silos into one living operational substrate.'
  },
  {
    step: '02',
    title: 'Understand',
    headline: 'Cross-Department Causal Mapping',
    description: 'Discover relationships between departments, processes, resources, and business outcomes.',
    details: [
      'Constructs an evolving, continuously calibrated causal knowledge graph of the entire enterprise.',
      'Identifies hidden dependencies (e.g. how a 5% delay in fulfillment impacts Q3 customer renewals).',
      'Eliminates departmental blind spots with unified organizational semantics.'
    ],
    metricsPreview: [
      { label: 'Graph Entities', value: '4.2M Interconnected Nodes' },
      { label: 'Causal Edge Discovery', value: 'Continuous Inference' },
      { label: 'Dependency Visibility', value: '360° Cross-Functional' }
    ],
    systemCapability: 'Maps how every department silently influences every other department.'
  },
  {
    step: '03',
    title: 'Anticipate',
    headline: 'Predictive Organisational Intelligence',
    description: 'Identify emerging risks, opportunities, and possible future outcomes weeks before they appear in financial statements.',
    details: [
      'Detects leading indicators rather than relying on lagging quarterly accounting reports.',
      'Flags non-linear ripple effects across supply chain, customer sentiment, and cash burn.',
      'Quantifies confidence intervals and stochastic risk horizons across all business lines.'
    ],
    metricsPreview: [
      { label: 'Early Warning Lead Time', value: '14 to 45 Days Ahead' },
      { label: 'Predictive Trajectory', value: 'Rolling 90-Day Forecast' },
      { label: 'Anomaly Detection', value: 'Sub-minute Anomaly Alerts' }
    ],
    systemCapability: 'Forecasts organizational consequences before they become irreversible.'
  },
  {
    step: '04',
    title: 'Simulate',
    headline: 'Executive Decision Sandbox',
    description: 'Explore different decisions and understand their potential consequences before committing capital or personnel.',
    details: [
      'Run counterfactual simulations: "What if we increase marketing budget by 30% while vendor lead time slips 10 days?"',
      'Evaluate trade-offs between short-term margin, customer retention, and operational strain.',
      'Test multi-department interventions in a risk-free digital twin of your enterprise.'
    ],
    metricsPreview: [
      { label: 'Simulation Fidelity', value: 'Monte Carlo Stochastic Engine' },
      { label: 'Scenario Turnaround', value: '< 3.2 Seconds / Run' },
      { label: 'Sensitivity Analysis', value: 'Multi-variable Stress Testing' }
    ],
    systemCapability: 'Provides a pre-flight flight simulator for leadership and operations.'
  },
  {
    step: '05',
    title: 'Orchestrate',
    headline: 'Coordinated Workflow Execution',
    description: 'Turn decisions into coordinated actions across the organisation, with appropriate human oversight and permissions.',
    details: [
      'Dispatches unified operational directives across Salesforce, SAP, Jira, Slack, and Workday in lockstep.',
      'Human-in-the-loop executive authorization prevents unilateral or accidental system changes.',
      'Maintains complete cryptographically verifiable audit trails of all system-suggested actions.'
    ],
    metricsPreview: [
      { label: 'Action Dispatch', value: 'Multi-system Coordinated Push' },
      { label: 'Human Governance', value: 'Role-Based Dual Signoff' },
      { label: 'Execution Audit', value: 'Full Forensic Lineage' }
    ],
    systemCapability: 'Bridges executive strategy and frontline operational execution.'
  }
];

export const BUSINESS_SIGNALS: BusinessSignal[] = [
  {
    id: 'cac',
    department: 'Marketing',
    name: 'Customer Acquisition Cost',
    metric: '$2,480',
    delta: '+38%',
    direction: 'up',
    severity: 'warning',
    causalLink: 'Paid channels scaled aggressively into non-core target segments.'
  },
  {
    id: 'cvr',
    department: 'Sales',
    name: 'Conversion Rate',
    metric: '14.2%',
    delta: '-22%',
    direction: 'down',
    severity: 'critical',
    causalLink: 'Lower lead quality coupled with longer quoted lead times discouraged buyers.'
  },
  {
    id: 'fulfillment',
    department: 'Operations',
    name: 'Fulfillment Delays',
    metric: '7.8 Days',
    delta: '+5.2 days',
    direction: 'up',
    severity: 'critical',
    causalLink: 'Warehouse staffing shortages and warehouse capacity constraints reached ceiling.'
  },
  {
    id: 'retention',
    department: 'Customers',
    name: 'Customer Retention Rate',
    metric: '76.4%',
    delta: '-18%',
    direction: 'down',
    severity: 'critical',
    causalLink: 'Shipping delays and support ticket backlog drove high churn in premium accounts.'
  },
  {
    id: 'opex',
    department: 'Finance',
    name: 'Operating Costs',
    metric: '$14.2M/mo',
    delta: '+14%',
    direction: 'up',
    severity: 'warning',
    causalLink: 'Emergency air freight, overtime labor premiums, and customer concession credits.'
  }
];

export const CORE_CAPABILITIES: Capability[] = [
  {
    id: 'unified-intelligence',
    title: 'Unified Intelligence',
    eyebrow: '01 / FOUNDATION',
    tagline: 'Connect fragmented organisational information into one coherent picture.',
    description: 'Breaks down corporate data silos without forcing costly tool migrations. Continuously synthesizes heterogeneous enterprise databases, SaaS APIs, unstructured communications, and operational logs into a single canonical ontology.',
    technicalArchitecture: [
      'Semantic ontology ingestion pipeline',
      'Entity resolution across multi-vendor ERP/CRM records',
      'Automated schema drift adaptation & reconciliation',
      'Zero-copy federated data virtualization'
    ],
    operationalOutcome: 'Every executive and system reads from the exact same single source of corporate truth.',
    telemetryMetric: { label: 'Data Harmonization', value: '99.8%' }
  },
  {
    id: 'operational-understanding',
    title: 'Operational Understanding',
    eyebrow: '02 / REASONING',
    tagline: 'Understand how departments, workflows, people and resources interact.',
    description: 'Replaces static quarterly reporting with an organic, continuously updated understanding of organisational reality. Traces how headcount constraints in engineering cascade into delivery bottlenecks and ultimately cashflow fluctuations.',
    technicalArchitecture: [
      'High-cardinality causal Bayesian DAG networks',
      'Process mining telemetry extraction',
      'Cross-departmental latency profiling',
      'Systemic bottleneck detection engines'
    ],
    operationalOutcome: 'Reveals the hidden causal mechanisms that dictate operational velocity.',
    telemetryMetric: { label: 'Causal Correlation', value: '94.6%' }
  },
  {
    id: 'predictive-intelligence',
    title: 'Predictive Intelligence',
    eyebrow: '03 / ANTICIPATION',
    tagline: 'Identify patterns, anticipate changes and surface emerging risks and opportunities.',
    description: 'Surfaces non-obvious risks and opportunities weeks before they manifest in financial outcomes. Continuously projects operational trajectories across varying macroeconomic conditions and operational states.',
    technicalArchitecture: [
      'Multi-horizon stochastic trajectory projection',
      'Non-linear leading indicator synthesis',
      'Early-warning hazard scoring algorithms',
      'Dynamic confidence bound calibration'
    ],
    operationalOutcome: 'Shifts leadership posture from reactive fire-fighting to proactive strategic navigation.',
    telemetryMetric: { label: 'Early-Warning Horizon', value: '38 Days' }
  },
  {
    id: 'decision-simulation',
    title: 'Decision Simulation',
    eyebrow: '04 / EVALUATION',
    tagline: 'Explore alternative scenarios and evaluate potential consequences.',
    description: 'A pre-flight simulation engine for business strategy. Before approving a $10M CapEx program or shifting sales quotas, simulate the multi-order ramifications across inventory, working capital, and customer sentiment.',
    technicalArchitecture: [
      'Agent-based organizational simulation modeling',
      'Monte Carlo parametric stress testing',
      'Counterfactual outcome evaluation engines',
      'Dynamic resource constraint optimization'
    ],
    operationalOutcome: 'Exposes unintended cross-functional side effects before capital is committed.',
    telemetryMetric: { label: 'Simulation Latency', value: '< 2.4s' }
  },
  {
    id: 'intelligent-orchestration',
    title: 'Intelligent Orchestration',
    eyebrow: '05 / EXECUTION',
    tagline: 'Coordinate decisions and approved actions across business functions.',
    description: 'Translates high-level strategic decisions into coordinated operational actions across all business systems. Coordinates cross-departmental execution while maintaining strict role-based authorization and human oversight.',
    technicalArchitecture: [
      'Multi-target transactional workflow orchestration',
      'Cryptographic dual-key approval governance',
      'Rollback-ready operational atomic transactions',
      'Real-time SLA compliance tracking'
    ],
    operationalOutcome: 'Eliminates execution lag between boardroom decisions and frontline operations.',
    telemetryMetric: { label: 'Coordination Velocity', value: 'Instant' }
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    eyebrow: '06 / ADAPTATION',
    tagline: 'Use actual outcomes to improve the organisation’s understanding over time.',
    description: 'The operating system learns from every operational outcome, variance, and retrospective. As actual results differ from simulated projections, the underlying models recalibrate their weights automatically.',
    technicalArchitecture: [
      'Closed-loop variance attribution engine',
      'Bayesian parameter updating over actuals',
      'Institutional memory encoding & indexing',
      'Organizational resilience indexing'
    ],
    operationalOutcome: 'The enterprise becomes progressively smarter, more resilient, and more coordinated every single day.',
    telemetryMetric: { label: 'Model Recalibration', value: 'Real-time' }
  }
];
