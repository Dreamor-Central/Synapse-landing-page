export interface OperationalDomain {
  id: string;
  name: string;
  category: string;
  color: string;
  description: string;
  systems: string[];
  metrics: { label: string; value: string; trend: 'up' | 'down' | 'nominal'; status: 'good' | 'warning' | 'alert' }[];
  connections: string[]; // Connected domain IDs
  throughput: string;
  latency: string;
}

export interface ProblemIsland {
  id: string;
  name: string;
  toolset: string;
  isolatedView: string;
  dataLatency: string;
  blindspot: string;
  impactOnSurge: string;
  status: 'normal' | 'stressed' | 'critical';
}

export interface HowItWorksStage {
  step: string;
  title: string;
  headline: string;
  description: string;
  details: string[];
  metricsPreview: { label: string; value: string }[];
  systemCapability: string;
}

export interface BusinessSignal {
  id: string;
  department: string;
  name: string;
  metric: string;
  delta: string;
  direction: 'up' | 'down';
  severity: 'warning' | 'critical' | 'alert';
  causalLink: string;
}

export interface Capability {
  id: string;
  title: string;
  eyebrow: string;
  tagline: string;
  description: string;
  technicalArchitecture: string[];
  operationalOutcome: string;
  telemetryMetric: { label: string; value: string };
}

