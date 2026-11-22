export interface OperationalDomain {
  id: string;
  name: string;
  category: string;
  color: string;
  description: string;
  systems: string[];
  connections: string[]; // Connected domain IDs
}

export type CapabilityState = 'understand' | 'anticipate' | 'orchestrate';

export interface CoreCapability {
  id: CapabilityState;
  step: string;
  title: string;
  headline: string;
  description: string;
  visualFocus: string;
  visualStateDescription: string;
  points: string[];
}

export interface ScenarioSignal {
  id: string;
  department: string;
  observation: string;
  detail: string;
  color: string;
}

export interface ScenarioIntervention {
  title: string;
  department: string;
  description: string;
  impact: string;
}
