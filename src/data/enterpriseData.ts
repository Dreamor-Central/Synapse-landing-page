import type { OperationalDomain, CoreCapability, ScenarioSignal, ScenarioIntervention } from '../types';

export const OPERATIONAL_DOMAINS: OperationalDomain[] = [
  {
    id: 'sales',
    name: 'Sales',
    category: 'Pipeline & Demand',
    color: '#38BDF8', // Sky Cyan
    description: 'Customer commitments, deal velocity, and inbound demand signals.',
    systems: ['CRM', 'Pipeline Management', 'Customer Interactions'],
    connections: ['operations', 'marketing', 'finance', 'customers']
  },
  {
    id: 'operations',
    name: 'Operations',
    category: 'Execution & Fulfilment',
    color: '#F59E0B', // Amber
    description: 'Fulfilment capacity, delivery lead times, and workflow constraints.',
    systems: ['WMS', 'Logistics', 'Service Queues'],
    connections: ['sales', 'supply-chain', 'customers', 'finance']
  },
  {
    id: 'customers',
    name: 'Customers',
    category: 'Experience & Retention',
    color: '#34D399', // Emerald
    description: 'Delivery feedback, satisfaction trends, and renewal health.',
    systems: ['Support Helpdesk', 'Customer Success', 'Feedback Loops'],
    connections: ['operations', 'sales', 'marketing']
  },
  {
    id: 'finance',
    name: 'Finance',
    category: 'Capital & Costs',
    color: '#818CF8', // Indigo
    description: 'Operational expenses, margin dynamics, and capital allocation.',
    systems: ['General Ledger', 'Billing', 'Financial Planning'],
    connections: ['operations', 'sales', 'strategy']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    category: 'Demand Generation',
    color: '#EC4899', // Pink
    description: 'Campaign activity, lead acquisition, and market positioning.',
    systems: ['Ad Channels', 'Automation', 'Analytics'],
    connections: ['sales', 'customers']
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    category: 'Inventory & Procurement',
    color: '#F97316', // Orange
    description: 'Component availability, vendor delivery schedules, and buffer stock.',
    systems: ['Procurement', 'Inventory Management'],
    connections: ['operations', 'finance']
  },
  {
    id: 'people',
    name: 'People',
    category: 'Organizational Capacity',
    color: '#A855F7', // Purple
    description: 'Team capacity, skill distribution, and workload balancing.',
    systems: ['HRIS', 'Staffing Management'],
    connections: ['operations', 'strategy']
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Leadership Alignment',
    color: '#00E5FF', // Electric Cyan
    description: 'Organizational goals, investment priorities, and cross-team alignment.',
    systems: ['Planning Tools', 'Executive Roadmaps'],
    connections: ['finance', 'people', 'operations', 'sales']
  }
];

export const CORE_CAPABILITIES: CoreCapability[] = [
  {
    id: 'understand',
    step: '01',
    title: 'UNDERSTAND',
    headline: 'See your business as an interconnected system.',
    description: 'See how your entire business works and how its different parts influence one another.',
    visualFocus: 'Continuous enterprise network illumination',
    visualStateDescription: 'The entire organisation becomes visible as a unified system, linking data streams across departments without replacing existing software.',
    points: [
      'Connects disparate software and data sources into a coherent picture',
      'Reveals hidden dependencies between seemingly separate business functions',
      'Provides a shared, continuously calibrated understanding of organisational reality'
    ]
  },
  {
    id: 'anticipate',
    step: '02',
    title: 'ANTICIPATE',
    headline: 'Identify emerging developments before they become crises.',
    description: 'Identify emerging problems and opportunities before they become bigger issues.',
    visualFocus: 'Predictive signal pathways and causal highlighting',
    visualStateDescription: 'Cross-functional pathways pulse with warning amber and purple highlights, showing leading indicators across departments before they surface in financial statements.',
    points: [
      'Surfaces leading operational indicators rather than relying on delayed reporting',
      'Traces how changes in one department quietly create ripple effects in another',
      'Gives leadership and team leads time to act proactively rather than reactively'
    ]
  },
  {
    id: 'orchestrate',
    step: '03',
    title: 'ORCHESTRATE',
    headline: 'Evaluate choices and coordinate action across teams.',
    description: 'Evaluate decisions, explore possible outcomes, and coordinate actions across your business.',
    visualFocus: 'Synchronized directive wavefronts and action ripple',
    visualStateDescription: 'Directive waves radiate outward from the core to all domain nodes, demonstrating synchronized action dispatch with human oversight.',
    points: [
      'Explore possible decisions and evaluate their consequences in a risk-free environment',
      'Align cross-departmental teams around shared operational priorities',
      'Coordinate execution across systems with role-based human oversight'
    ]
  }
];

export const SCENARIO_SIGNALS: ScenarioSignal[] = [
  {
    id: 'sig-sales',
    department: 'Sales',
    observation: 'Demand is increasing',
    detail: 'Order intake is climbing as new customer contracts are closed, but commitments are made without visibility into current warehouse constraints.',
    color: '#38BDF8'
  },
  {
    id: 'sig-ops',
    department: 'Operations',
    observation: 'Fulfilment capacity is under pressure',
    detail: 'Warehouse processing and delivery queues are stretched to their limits, causing fulfillment buffers to erode rapidly.',
    color: '#F59E0B'
  },
  {
    id: 'sig-cust',
    department: 'Customers',
    observation: 'Delivery delays are affecting satisfaction',
    detail: 'Shipment timelines slip beyond promised dates, leading to an influx of support inquiries and customer frustration.',
    color: '#34D399'
  },
  {
    id: 'sig-fin',
    department: 'Finance',
    observation: 'Operational inefficiencies may be increasing costs',
    detail: 'Emergency expediting, overtime, and handling delays quietly compress operating margins before invoices are reconciled.',
    color: '#818CF8'
  }
];

export const SCENARIO_INTERVENTIONS: ScenarioIntervention[] = [
  {
    title: 'Adjust sales commitments based on fulfilment capacity',
    department: 'Sales & Delivery',
    description: 'Dynamically calibrate delivery promises so quotes reflect actual fulfillment lead times.',
    impact: 'Prevents customer disappointment and restores delivery trust.'
  },
  {
    title: 'Prioritise high-impact orders',
    department: 'Operations & Logistics',
    description: 'Intelligently triage order fulfillment queues based on client commitments and operational urgency.',
    impact: 'Protects critical relationships and reduces delivery backlog friction.'
  },
  {
    title: 'Reallocate available operational resources',
    department: 'Resource Planning',
    description: 'Temporarily shift cross-trained team capacity and logistics buffers to bottlenecked stages.',
    impact: 'Eases fulfillment strain without uncontrolled emergency spending.'
  },
  {
    title: 'Coordinate decisions across departments',
    department: 'Cross-Functional Leadership',
    description: 'Ensure sales, operations, and finance share the same live operational picture.',
    impact: 'Eliminates departmental blind spots and enables the business to respond as one.'
  }
];
