import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OPERATIONAL_DOMAINS } from '../data/enterpriseData';
import type { OperationalDomain } from '../types';
import { Play, Pause, ChevronLeft, ChevronRight, Compass, Radio } from 'lucide-react';

interface StoryBeat {
  id: number;
  stageLabel: string;
  headline: string;
  subheadline: string;
  narrative: string;
  diveFocus: string;
  telemetryState: string;
  statusColor: string;
  takeaway: string;
}

const STORY_BEATS: StoryBeat[] = [
  {
    id: 1,
    stageLabel: '01 // THE BIG PICTURE',
    headline: 'Your entire company. One intelligence.',
    subheadline: 'How Business Should Work',
    narrative: "When departments work together, everything moves faster. Finance, Sales, Operations, and Customer Support aren't separate worlds—they are parts of one living company. Leadership sees what is happening right now, without waiting for end-of-month reports.",
    diveFocus: 'Panoramic Company Overview',
    telemetryState: 'ORGANIZATION STATUS: CONNECTED & SYNCHRONIZED',
    statusColor: '#38bdf8',
    takeaway: 'Every team shares one accurate view of the business in real time, eliminating blind spots, guesswork, and surprises.'
  },
  {
    id: 2,
    stageLabel: '02 // THE SILO PROBLEM',
    headline: 'Connected by people. Disconnected by systems.',
    subheadline: 'Where Companies Lose Time and Money',
    narrative: 'In most companies, every team uses its own disconnected tools. Sales promises delivery dates that Operations cannot meet. Marketing spends budget promoting out-of-stock items. Finance discovers margin leaks weeks after the damage is done.',
    diveFocus: 'Isolated Operations & Finance Silos',
    telemetryState: 'SYSTEM ALERT: 5 TEAMS WORKING IN SILOS',
    statusColor: '#ef4444',
    takeaway: 'Disconnected software creates blind spots, communication bottlenecks, and conflicting numbers between departments.'
  },
  {
    id: 3,
    stageLabel: '03 // INSTANT CONNECTION',
    headline: 'Your systems start talking to each other.',
    subheadline: 'Zero Disruption to Your Daily Tools',
    narrative: 'You do not need to replace your existing software. Synapse OS sits on top of your current tools—connecting Salesforce, SAP, Jira, and Workday into one continuous data network without interrupting daily operations.',
    diveFocus: 'Cross-System Data Bridge',
    telemetryState: 'DATA LINK: ALL SYSTEMS CONNECTED IN REAL TIME',
    statusColor: '#00e5ff',
    takeaway: 'Keep using the software your team already knows. Synapse OS links their data together automatically in the background.'
  },
  {
    id: 4,
    stageLabel: '04 // ONE SINGLE TRUTH',
    headline: 'One continuously updated picture of reality.',
    subheadline: 'No More Conflicting Reports',
    narrative: 'No more arguing over whose spreadsheet is right. Synapse OS creates a single live picture of your company. When customer demand surges at 9 AM, Sales, Warehouse Logistics, and Treasury see the impact simultaneously.',
    diveFocus: 'Central Real-Time Intelligence Core',
    telemetryState: 'LIVE MEMORY: 100% COMPANY-WIDE SYNCHRONIZATION',
    statusColor: '#38bdf8',
    takeaway: 'Every department works from the exact same live reality, ending endless status meetings and outdated email threads.'
  },
  {
    id: 5,
    stageLabel: '05 // CAUSE & EFFECT',
    headline: 'See how one decision ripples across the company.',
    subheadline: 'Discovering Hidden Chain Reactions',
    narrative: 'A 5-day shipping delay does not just bother the warehouse—it drives angry customer support tickets, triggers order cancellations, and forces Marketing to spend 38% more on advertising to replace lost revenue. Synapse OS traces these hidden ripple effects so you can fix the root cause immediately.',
    diveFocus: 'Operations ➔ Support ➔ Marketing ➔ Finance Impact',
    telemetryState: 'ROOT-CAUSE ANALYSIS: 4-STAGE RIPPLE IDENTIFIED',
    statusColor: '#a855f7',
    takeaway: 'Identify and fix the hidden bottlenecks that quietly drain profits across unrelated departments.'
  },
  {
    id: 6,
    stageLabel: '06 // TEST BEFORE YOU COMMIT',
    headline: 'Simulate the future before spending a dollar.',
    subheadline: 'A Risk-Free Decision Sandbox',
    narrative: 'What happens if product demand jumps 40% next month? What if a supplier is three weeks late? Instead of guessing and hoping, simulate big business choices in a digital sandbox to see the effect on cash flow and delivery before you spend capital.',
    diveFocus: 'Live Scenario Simulation Sandbox',
    telemetryState: 'DECISION SIMULATION: 10,000 SCENARIOS TESTED IN SECONDS',
    statusColor: '#f59e0b',
    takeaway: 'Stress-test strategic decisions in a risk-free digital model before committing your budget and workforce.'
  },
  {
    id: 7,
    stageLabel: '07 // SYNCHRONIZED ACTION',
    headline: 'Turn decisions into coordinated action.',
    subheadline: 'All Teams Moving in Unison',
    narrative: 'Great strategies fail when teams execute them out of sync. Once leadership selects an action plan, Synapse OS dispatches clear updates and tasks across your tools in lockstep—with human dual-signoff and complete audit trails every step of the way.',
    diveFocus: 'Enterprise-Wide Coordinated Execution',
    telemetryState: 'EXECUTION ENGINE: ALL DEPARTMENTS IN HARMONY',
    statusColor: '#10b981',
    takeaway: 'Strategy does not get stalled in inboxes. Your entire organization acts with clarity, speed, and accountability.'
  }
];

// True 3D spatial coordinates for the 8 Operational Domains
const DOMAIN_POSITIONS_3D: Record<string, [number, number, number]> = {
  finance: [4.4, 1.2, -1.8],
  operations: [-3.8, 2.0, 1.5],
  sales: [3.4, -2.0, 2.4],
  marketing: [-3.2, -1.8, -2.4],
  people: [1.8, 3.6, 1.6],
  customers: [0.8, -3.4, 1.6],
  supply_chain: [-4.0, 0.2, -1.6],
  strategy: [2.6, 2.8, -2.4]
};

interface SpatialHUDPoint {
  id: string;
  name: string;
  label: string;
  sublabel: string;
  color: string;
  x: number;
  y: number;
  visible: boolean;
  scale: number;
}

export const PinnedStorytelling3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeBeatIndex, setActiveBeatIndex] = useState(0);
  const [selectedDomain, setSelectedDomain] = useState<OperationalDomain>(OPERATIONAL_DOMAINS[0]);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [webGLFailed, setWebGLFailed] = useState(false);

  // Touch gesture state for native mobile swipe support (iOS & Android)
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    // Horizontal swipe threshold: 40px with dominant horizontal intent
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        nextBeat();
      } else {
        prevBeat();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Screen-projected 3D spatial HUD callouts
  const [spatialHUDPoints, setSpatialHUDPoints] = useState<SpatialHUDPoint[]>([]);

  // Smooth scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.min(Math.max(currentScroll / totalScrollable, 0), 1);
      setScrollProgress(progress);

      const beatIdx = Math.min(
        Math.floor(progress * STORY_BEATS.length),
        STORY_BEATS.length - 1
      );
      setActiveBeatIndex(beatIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hands-free Auto-play narrative tour
  useEffect(() => {
    if (!isPlayingTour) return;
    const container = containerRef.current;
    if (!container) return;

    const totalScrollable = container.offsetHeight - window.innerHeight;
    const startScroll = container.offsetTop;
    const endScroll = startScroll + totalScrollable;

    if (window.scrollY < startScroll || window.scrollY >= endScroll - 30) {
      window.scrollTo({ top: startScroll, behavior: 'smooth' });
    }

    const timer = setInterval(() => {
      if (window.scrollY >= endScroll - 20) {
        setIsPlayingTour(false);
      } else {
        window.scrollBy({ top: 3.5, behavior: 'auto' });
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isPlayingTour]);

  const jumpToBeat = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const totalScrollable = container.offsetHeight - window.innerHeight;
    const targetScroll = container.offsetTop + (index / (STORY_BEATS.length - 1)) * totalScrollable;
    setActiveBeatIndex(index);
    setScrollProgress(index / (STORY_BEATS.length - 1));
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const prevBeat = () => {
    if (activeBeatIndex > 0) jumpToBeat(activeBeatIndex - 1);
  };

  const nextBeat = () => {
    if (activeBeatIndex < STORY_BEATS.length - 1) jumpToBeat(activeBeatIndex + 1);
  };

  // 3D Three.js Engine with Full Camera Flight Trajectories
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch {
      setWebGLFailed(true);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. SCENE & DYNAMIC CAMERA (RESPONSIVE FOV FOR MOBILE & DESKTOP)
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.026);

    const isMobileInit = window.innerWidth < 768;
    const initialFov = isMobileInit ? 60 : 46;
    const camera = new THREE.PerspectiveCamera(initialFov, window.innerWidth / window.innerHeight, 0.1, 120);
    camera.position.set(0, 2.5, 14);

    // 2. LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const corePointLight = new THREE.PointLight(0x38bdf8, 4.0, 35);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    const accentLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    accentLight1.position.set(8, 12, 10);
    scene.add(accentLight1);

    const accentLight2 = new THREE.DirectionalLight(0x818cf8, 0.8);
    accentLight2.position.set(-8, -6, -6);
    scene.add(accentLight2);

    // 3. AMBIENT VOLUMETRIC DATA PARTICLES
    const particleCount = 650;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8);
    const color2 = new THREE.Color(0x818cf8);
    const color3 = new THREE.Color(0x00e5ff);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 6 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      particlePositions[i3 + 2] = radius * Math.cos(phi);

      const mixedColor = color1.clone().lerp(i % 2 === 0 ? color2 : color3, Math.random());
      particleColors[i3] = mixedColor.r;
      particleColors[i3 + 1] = mixedColor.g;
      particleColors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });

    const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleCloud);

    // 4. CENTRAL INTELLIGENCE STRUCTURE (CEREBRO DYNAMICS SIGNATURE)
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing nucleus
    const innerNucleusGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const innerNucleusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false
    });
    const innerNucleus = new THREE.Mesh(innerNucleusGeo, innerNucleusMat);
    coreGroup.add(innerNucleus);

    // Mid faceted icosahedron
    const midCoreGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const midCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.9,
      roughness: 0.2
    });
    const midCore = new THREE.Mesh(midCoreGeo, midCoreMat);
    coreGroup.add(midCore);

    // Outer geodesic cage
    const outerCageGeo = new THREE.IcosahedronGeometry(1.9, 1);
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const outerCage = new THREE.Mesh(outerCageGeo, outerCageMat);
    coreGroup.add(outerCage);

    // Gyroscopic Ring 1
    const ring1Geo = new THREE.TorusGeometry(2.4, 0.02, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    coreGroup.add(ring1);

    // Gyroscopic Ring 2
    const ring2Geo = new THREE.TorusGeometry(2.9, 0.02, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.45 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    coreGroup.add(ring2);

    // Gyroscopic Ring 3
    const ring3Geo = new THREE.TorusGeometry(3.4, 0.02, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.35 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 3;
    coreGroup.add(ring3);

    // 5. 8 OPERATIONAL DOMAIN NODES (TRUE 3D CONSTELLATION)
    interface NodeMeshGroup {
      domain: OperationalDomain;
      basePos: THREE.Vector3;
      currPos: THREE.Vector3;
      targetPos: THREE.Vector3;
      group: THREE.Group;
      coreMesh: THREE.Mesh;
      shellMesh: THREE.Mesh;
      ringMesh: THREE.Mesh;
      curveToCore: THREE.CatmullRomCurve3;
      lineMesh: THREE.Line;
      packetProgress: number[];
      packetMeshes: THREE.Mesh[];
    }

    const domainNodes: NodeMeshGroup[] = [];

    OPERATIONAL_DOMAINS.forEach((domain) => {
      const coords = DOMAIN_POSITIONS_3D[domain.id] || [3, 0, 0];
      const basePos = new THREE.Vector3(coords[0], coords[1], coords[2]);
      const currPos = basePos.clone();
      const targetPos = basePos.clone();

      const group = new THREE.Group();
      group.position.copy(currPos);
      scene.add(group);

      const domainColor = new THREE.Color(domain.color);

      // Node inner core
      const coreGeo = new THREE.SphereGeometry(0.35, 24, 24);
      const coreMat = new THREE.MeshStandardMaterial({
        color: domainColor,
        emissive: domainColor,
        emissiveIntensity: 0.8,
        roughness: 0.3
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Node outer wireframe shell
      const shellGeo = new THREE.IcosahedronGeometry(0.55, 1);
      const shellMat = new THREE.MeshBasicMaterial({
        color: domainColor,
        wireframe: true,
        transparent: true,
        opacity: 0.4
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      group.add(shellMesh);

      // Node orbiting ring
      const nodeRingGeo = new THREE.TorusGeometry(0.72, 0.015, 12, 48);
      const nodeRingMat = new THREE.MeshBasicMaterial({
        color: domainColor,
        transparent: true,
        opacity: 0.5
      });
      const ringMesh = new THREE.Mesh(nodeRingGeo, nodeRingMat);
      ringMesh.rotation.x = Math.PI / 2;
      group.add(ringMesh);

      // 3D Spline Pathway to Central Core
      const midPoint = basePos.clone().multiplyScalar(0.5);
      midPoint.y += (Math.random() - 0.5) * 1.5;
      const curveToCore = new THREE.CatmullRomCurve3([
        basePos,
        midPoint,
        new THREE.Vector3(0, 0, 0)
      ]);

      const points = curveToCore.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: domainColor,
        transparent: true,
        opacity: 0.45
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      scene.add(lineMesh);

      // Flowing photon data packets
      const packetCount = 3;
      const packetProgress = [0.1, 0.45, 0.8];
      const packetMeshes: THREE.Mesh[] = [];

      for (let p = 0; p < packetCount; p++) {
        const pGeo = new THREE.SphereGeometry(0.065, 12, 12);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        scene.add(pMesh);
        packetMeshes.push(pMesh);
      }

      domainNodes.push({
        domain,
        basePos,
        currPos,
        targetPos,
        group,
        coreMesh,
        shellMesh,
        ringMesh,
        curveToCore,
        lineMesh,
        packetProgress,
        packetMeshes
      });
    });

    // 5b. INTER-DOMAIN NEURAL FILAMENTS (CONTINUOUS CONNECTED ENTERPRISE MESH)
    interface InterDomainFilament {
      fromNode: NodeMeshGroup;
      toNode: NodeMeshGroup;
      curve: THREE.CatmullRomCurve3;
      lineMesh: THREE.Line;
      packetProgress: number;
      packetMesh: THREE.Mesh;
    }
    const interFilaments: InterDomainFilament[] = [];

    const interDomainPairs = [
      ['finance', 'strategy'],
      ['strategy', 'people'],
      ['people', 'operations'],
      ['operations', 'supply_chain'],
      ['supply_chain', 'finance'],
      ['sales', 'marketing'],
      ['marketing', 'customers'],
      ['customers', 'sales'],
      ['sales', 'operations'],
      ['finance', 'sales']
    ];

    interDomainPairs.forEach(([idA, idB]) => {
      const nodeA = domainNodes.find(n => n.domain.id === idA);
      const nodeB = domainNodes.find(n => n.domain.id === idB);
      if (!nodeA || !nodeB) return;

      const mid = nodeA.basePos.clone().lerp(nodeB.basePos, 0.5);
      mid.multiplyScalar(1.15); // Arch gracefully outward

      const curve = new THREE.CatmullRomCurve3([
        nodeA.currPos.clone(),
        mid,
        nodeB.currPos.clone()
      ]);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const mat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending
      });
      const lineMesh = new THREE.Line(geo, mat);
      scene.add(lineMesh);

      const pGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const pMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff });
      const packetMesh = new THREE.Mesh(pGeo, pMat);
      scene.add(packetMesh);

      interFilaments.push({
        fromNode: nodeA,
        toNode: nodeB,
        curve,
        lineMesh,
        packetProgress: Math.random(),
        packetMesh
      });
    });

    // 6. CAUSAL DISCOVERY SPLINES (STAGE 5: MULTI-HOP HIGHLIGHT)
    // Operations -> Customers -> Sales -> Finance
    const causalSplineGroup = new THREE.Group();
    scene.add(causalSplineGroup);

    const causalPairs: [string, string][] = [
      ['operations', 'customers'],
      ['customers', 'sales'],
      ['sales', 'finance'],
      ['finance', 'marketing']
    ];

    const causalLines: THREE.Line[] = [];
    causalPairs.forEach(([fromId, toId]) => {
      const fromCoord = DOMAIN_POSITIONS_3D[fromId];
      const toCoord = DOMAIN_POSITIONS_3D[toId];
      if (!fromCoord || !toCoord) return;

      const p1 = new THREE.Vector3(...fromCoord);
      const p2 = new THREE.Vector3(...toCoord);
      const mid = p1.clone().lerp(p2, 0.5);
      mid.y += 1.2;

      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(32));
      const mat = new THREE.LineBasicMaterial({
        color: 0xa855f7, // Bright purple
        transparent: true,
        opacity: 0.0 // Ignited during Stage 5
      });
      const line = new THREE.Line(geo, mat);
      causalSplineGroup.add(line);
      causalLines.push(line);
    });

    // 7. SIMULATION & ORCHESTRATION SHOCKWAVE RINGS
    const shockwaveGeo = new THREE.RingGeometry(1, 1.08, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    const shockwaveRing = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveRing.rotation.x = Math.PI / 2;
    scene.add(shockwaveRing);

    // 8. CONTINUOUS CATMULL-ROM 3D CAMERA TRAJECTORY WAYPOINTS
    const camWaypoints = [
      new THREE.Vector3(0.0, 2.4, 14.5),       // 0.00: Stage 1 - Panoramic Macro View
      new THREE.Vector3(-1.2, 2.2, 11.2),      // 0.16: Approaching Department Constellation
      new THREE.Vector3(-2.8, 1.8, 5.2),       // 0.30: Stage 2 - Deep Dive inside Operations Silo
      new THREE.Vector3(-0.8, 1.5, 8.8),       // 0.44: Stage 3 - Reconnection Bank & Filaments
      new THREE.Vector3(0.0, 0.4, 3.4),        // 0.58: Stage 4 - Inside Central Cognitive Core
      new THREE.Vector3(-1.2, 4.4, 7.8),       // 0.72: Stage 5 - Sweeping Causal Ripple Flight
      new THREE.Vector3(0.3, 7.8, 11.4),       // 0.86: Stage 6 - High Isometric Simulation Horizon
      new THREE.Vector3(0.0, 2.2, 13.5),       // 1.00: Stage 7 - Triumphant Unified Equilibrium
    ];
    const cameraSpline = new THREE.CatmullRomCurve3(camWaypoints, false, 'centripetal', 0.5);

    // Look-At Waypoints (Seamless Look Target Tracking)
    const lookWaypoints = [
      new THREE.Vector3(0.0, 0.0, 0.0),        // 0.00: Core center
      new THREE.Vector3(-1.6, 1.0, 0.8),       // 0.16: Operations drift
      new THREE.Vector3(-3.8, 2.0, 1.5),       // 0.30: Focused on Operations cluster
      new THREE.Vector3(-0.6, 0.5, 0.0),       // 0.44: Magnetic filament convergence
      new THREE.Vector3(0.0, 0.0, -1.2),       // 0.58: Core depth perspective
      new THREE.Vector3(0.6, -0.4, 0.5),       // 0.72: Causal ripple spline
      new THREE.Vector3(0.0, 0.0, 0.0),        // 0.86: High altitude core view
      new THREE.Vector3(0.0, 0.0, 0.0),        // 1.00: Symmetrical enterprise center
    ];
    const lookSpline = new THREE.CatmullRomCurve3(lookWaypoints, false, 'centripetal', 0.5);

    // MOUSE PARALLAX
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = ((e.clientX / window.innerWidth) - 0.5) * 1.5;
      targetMouseY = ((e.clientY / window.innerHeight) - 0.5) * 1.0;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Touch gesture parallax for mobile (iOS & Android)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        targetMouseX = ((e.touches[0].clientX / window.innerWidth) - 0.5) * 1.0;
        targetMouseY = ((e.touches[0].clientY / window.innerHeight) - 0.5) * 0.8;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.aspect = aspect;
      if (aspect < 1.0) {
        // Mobile portrait: dynamically widen vertical FOV to preserve horizontal constellation bounds
        const targetHFov = (54 * Math.PI) / 180;
        const vFovRad = 2 * Math.atan(Math.tan(targetHFov / 2) / aspect);
        camera.fov = Math.min(Math.max((vFovRad * 180) / Math.PI, 50), 70);
      } else {
        camera.fov = 46;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION & CAMERA FLIGHT LOOP (BUTTERY-SMOOTH INERTIAL DAMPING)
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let targetScrollP = 0;
    let smoothScrollP = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.05 : 0.65;

      curMouseX += (targetMouseX - curMouseX) * 0.04;
      curMouseY += (targetMouseY - curMouseY) * 0.04;

      // READ LATEST SCROLL PROGRESS
      const containerEl = containerRef.current;
      if (containerEl) {
        const rect = containerEl.getBoundingClientRect();
        const total = containerEl.offsetHeight - window.innerHeight;
        if (total > 0) {
          targetScrollP = Math.min(Math.max(-rect.top / total, 0), 1);
        }
      }

      // INERTIAL DAMPING (EMIL KOWALSKI ACCELERATION / DECELERATION)
      const dampSpeed = prefersReducedMotion ? 0.3 : 0.065;
      smoothScrollP += (targetScrollP - smoothScrollP) * dampSpeed;
      const p = Math.min(Math.max(smoothScrollP, 0), 1);

      // EVALUATE SMOOTH CATMULL-ROM CAMERA FLIGHT (ADAPTIVE MOBILE FRAMING)
      const isMobileScreen = window.innerWidth < 768;
      const camPos = cameraSpline.getPointAt(p);
      const lookPos = lookSpline.getPointAt(p);

      const effectiveLookPos = lookPos.clone();
      if (isMobileScreen) {
        // Frame 3D constellation in the upper viewport on phones, leaving bottom clear for card
        effectiveLookPos.y -= 1.4;
      }

      camera.position.x = camPos.x + curMouseX;
      camera.position.y = camPos.y + curMouseY;
      camera.position.z = camPos.z * (isMobileScreen ? 1.18 : 1.0);
      camera.lookAt(effectiveLookPos);

      // CONTINUOUS HARMONIC DYNAMICS ACROSS STAGES
      // 1. Silo Decoupling envelope (smooth sine bell centered at stage 2 ~ 0.26)
      let siloEnvelope = 0;
      if (p > 0.12 && p < 0.42) {
        siloEnvelope = Math.sin(((p - 0.12) / 0.30) * Math.PI);
      }
      const expansionFactor = 1.0 + siloEnvelope * 0.85;

      // 2. Line opacity & packet speed continuous curves
      let lineOpacity = 0.45;
      let packetSpeedMult = 1.0;
      if (p < 0.14) {
        lineOpacity = 0.45;
        packetSpeedMult = 1.0;
      } else if (p < 0.36) {
        lineOpacity = THREE.MathUtils.lerp(0.45, 0.08, siloEnvelope);
        packetSpeedMult = THREE.MathUtils.lerp(1.0, 0.2, siloEnvelope);
      } else if (p < 0.52) {
        const t = (p - 0.36) / 0.16;
        lineOpacity = THREE.MathUtils.lerp(0.08, 0.85, t);
        packetSpeedMult = THREE.MathUtils.lerp(0.2, 3.2, t);
      } else if (p < 0.76) {
        lineOpacity = 0.55;
        packetSpeedMult = 1.6;
      } else {
        lineOpacity = 0.70;
        packetSpeedMult = 2.2;
      }

      // 3. Smooth Core Color Transitions
      const normalColor = new THREE.Color(0x38bdf8);
      const alertColor = new THREE.Color(0xef4444);
      const reconnColor = new THREE.Color(0x00e5ff);
      const emeraldColor = new THREE.Color(0x10b981);

      const coreTargetColor = normalColor.clone();
      if (p > 0.14 && p < 0.38) {
        coreTargetColor.lerp(alertColor, siloEnvelope);
      } else if (p >= 0.38 && p < 0.85) {
        const reconnWeight = Math.min((p - 0.38) / 0.15, 1.0);
        coreTargetColor.lerp(reconnColor, reconnWeight);
      } else if (p >= 0.85) {
        const emeraldWeight = Math.min((p - 0.85) / 0.12, 1.0);
        coreTargetColor.lerp(emeraldColor, emeraldWeight);
      }
      (innerNucleus.material as THREE.MeshBasicMaterial).color.copy(coreTargetColor);

      // Core rotations (speeds up during core dive at p ~ 0.58)
      const coreSpeedFactor = (p >= 0.48 && p < 0.68) ? 2.2 : 1.0;
      coreGroup.rotation.y = elapsedTime * 0.22 * speed * coreSpeedFactor;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.25 * speed) * 0.15;
      ring1.rotation.z = elapsedTime * 0.3 * speed * coreSpeedFactor;
      ring2.rotation.y = -elapsedTime * 0.25 * speed * coreSpeedFactor;
      ring3.rotation.x = elapsedTime * 0.2 * speed * coreSpeedFactor;

      // 4. Harmonic Resonant Breathing & Orbital Motion across all 8 Domain Nodes
      domainNodes.forEach((node, idx) => {
        const phase = idx * (Math.PI / 4);
        const breathX = Math.sin(elapsedTime * 0.8 + phase) * 0.12;
        const breathY = Math.cos(elapsedTime * 0.6 + phase) * 0.10;
        const breathZ = Math.sin(elapsedTime * 0.7 + phase * 1.5) * 0.08;

        node.targetPos.copy(node.basePos).multiplyScalar(expansionFactor);
        node.targetPos.x += breathX;
        node.targetPos.y += breathY;
        node.targetPos.z += breathZ;

        node.currPos.lerp(node.targetPos, 0.08);

        node.group.position.copy(node.currPos);
        node.shellMesh.rotation.y = elapsedTime * 0.6 * speed;
        node.ringMesh.rotation.z = elapsedTime * 0.4 * speed;

        // Recalculate 3D spline curve to core
        const mid = node.currPos.clone().multiplyScalar(0.5);
        node.curveToCore.points[0].copy(node.currPos);
        node.curveToCore.points[1].copy(mid);
        const pts = node.curveToCore.getPoints(36);
        node.lineMesh.geometry.setFromPoints(pts);
        (node.lineMesh.material as THREE.LineBasicMaterial).opacity = lineOpacity;

        // Advance photon data packets along 3D spline to core
        node.packetProgress.forEach((prog, pIdx) => {
          node.packetProgress[pIdx] = (prog + 0.0035 * speed * packetSpeedMult) % 1;
          const pos = node.curveToCore.getPoint(node.packetProgress[pIdx]);
          if (node.packetMeshes[pIdx]) {
            node.packetMeshes[pIdx].position.copy(pos);
            node.packetMeshes[pIdx].visible = lineOpacity > 0.08;
          }
        });
      });

      // 5. Update Inter-Domain Lateral Filaments (Living Connected System)
      interFilaments.forEach((fil) => {
        fil.curve.points[0].copy(fil.fromNode.currPos);
        const mid = fil.fromNode.currPos.clone().lerp(fil.toNode.currPos, 0.5).multiplyScalar(1.15);
        fil.curve.points[1].copy(mid);
        fil.curve.points[2].copy(fil.toNode.currPos);

        const pts = fil.curve.getPoints(24);
        fil.lineMesh.geometry.setFromPoints(pts);

        // Lateral filaments dim during silo decoupling, then glow strongly when unified
        const filOpacity = siloEnvelope > 0.3 ? 0.06 : THREE.MathUtils.lerp(0.25, 0.6, Math.max(0, p - 0.4));
        (fil.lineMesh.material as THREE.LineBasicMaterial).opacity = filOpacity;

        fil.packetProgress = (fil.packetProgress + 0.003 * speed * packetSpeedMult) % 1;
        const pPos = fil.curve.getPoint(fil.packetProgress);
        fil.packetMesh.position.copy(pPos);
        fil.packetMesh.visible = filOpacity > 0.08;
      });

      // 6. Causal Splines (Stage 5 highlight: Operations -> Customers -> Sales -> Finance)
      const causalOpacity = (p >= 0.62 && p < 0.78) ? Math.sin(((p - 0.62) / 0.16) * Math.PI) * 0.95 : 0.0;
      causalLines.forEach((line) => {
        (line.material as THREE.LineBasicMaterial).opacity = causalOpacity;
      });

      // 7. Simulation Shockwave Pulse (Stage 6 highlight)
      if (p >= 0.78 && p < 0.92) {
        const waveProgress = ((elapsedTime * 1.5) % 1);
        shockwaveRing.scale.setScalar(2.0 + waveProgress * 12.0);
        shockwaveMat.opacity = (1.0 - waveProgress) * 0.65;
        shockwaveRing.visible = true;
      } else {
        shockwaveRing.visible = false;
      }

      // ==========================================
      // SCREEN-PROJECTED 3D SPATIAL HUD CALLOUTS
      // ==========================================
      const hudPoints: SpatialHUDPoint[] = [];

      // Project Operations node
      const opNode = domainNodes.find(n => n.domain.id === 'operations');
      if (opNode) {
        const opScreen = opNode.currPos.clone().project(camera);
        if (opScreen.z < 1) {
          hudPoints.push({
            id: 'operations-hud',
            name: 'Operations Domain',
            label: p >= 0.14 && p < 0.32 ? 'CRITICAL: SILO ISOLATION' : 'TELEMETRY: 99.8% READY',
            sublabel: p >= 0.14 && p < 0.32 ? 'Disconnected from ERP/WMS' : 'Event Stream Active',
            color: p >= 0.14 && p < 0.32 ? '#ef4444' : '#00e5ff',
            x: (opScreen.x * 0.5 + 0.5) * window.innerWidth,
            y: (-opScreen.y * 0.5 + 0.5) * window.innerHeight,
            visible: true,
            scale: Math.max(0.7, 1.2 - opScreen.z)
          });
        }
      }

      // Project Finance node
      const finNode = domainNodes.find(n => n.domain.id === 'finance');
      if (finNode) {
        const finScreen = finNode.currPos.clone().project(camera);
        if (finScreen.z < 1) {
          hudPoints.push({
            id: 'finance-hud',
            name: 'Finance Domain',
            label: p >= 0.14 && p < 0.32 ? 'LEDGER VARIANCE: +14%' : 'LIQUIDITY RUNWAY: LIVE',
            sublabel: p >= 0.14 && p < 0.32 ? 'Reconciliation Lag: 42d' : '42.8k events/sec',
            color: p >= 0.14 && p < 0.32 ? '#ef4444' : '#38bdf8',
            x: (finScreen.x * 0.5 + 0.5) * window.innerWidth,
            y: (-finScreen.y * 0.5 + 0.5) * window.innerHeight,
            visible: true,
            scale: Math.max(0.7, 1.2 - finScreen.z)
          });
        }
      }

      // Project Core when diving into Act 4
      if (p >= 0.44 && p < 0.64) {
        const coreScreen = new THREE.Vector3(0, 0, 0).project(camera);
        if (coreScreen.z < 1) {
          hudPoints.push({
            id: 'core-hud',
            name: 'Central Intelligence Substrate',
            label: 'CANONICAL COGNITIVE FABRIC',
            sublabel: 'Zero-Copy Semantic Graph Live',
            color: '#00e5ff',
            x: (coreScreen.x * 0.5 + 0.5) * window.innerWidth,
            y: (-coreScreen.y * 0.5 + 0.5) * window.innerHeight,
            visible: true,
            scale: 1.0
          });
        }
      }

      setSpatialHUDPoints(hudPoints);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line || obj instanceof THREE.Points) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  const currentBeat = STORY_BEATS[activeBeatIndex] || STORY_BEATS[0];

  return (
    <div ref={containerRef} className="relative w-full h-[520vh] bg-[#07080b]">
      
      {/* STICKY FULL-VIEWPORT 3D THEATRE (RESPONSIVE DYNAMIC VIEWPORT HEIGHT FOR IOS & ANDROID) */}
      <div className="sticky top-0 h-screen min-h-[100dvh] w-full flex items-center justify-center overflow-hidden z-20">
        
        {/* Full-bleed Three.js 3D Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 outline-none touch-pan-y"
          aria-label="Interactive 3D scroll-driven flight through the enterprise organization"
        />

        {/* Fallback only if WebGL completely unsupported by system */}
        {webGLFailed ? (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="p-8 rounded-2xl bg-slate-900/80 border border-white/10 text-center max-w-md">
              <Compass className="w-10 h-10 text-cyan-400 mx-auto mb-3 animate-spin" />
              <h3 className="text-lg font-bold text-white mb-2">3D Hardware Accelerated View</h3>
              <p className="text-xs text-slate-400">Please enable WebGL in your browser settings to experience the continuous 3D camera flight.</p>
            </div>
          </div>
        ) : null}

        {/* Atmospheric Depth Gradients */}
        <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(ellipse_at_center,transparent_45%,#07080b_98%)]" />

        {/* SCREEN-PROJECTED 3D SPATIAL HUD CALLOUTS (ANCHORED DIRECTLY TO 3D NODES) */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          {spatialHUDPoints.map((point) => (
            <div
              key={point.id}
              className="absolute transition-transform duration-75 ease-out"
              style={{
                left: `${point.x}px`,
                top: `${point.y}px`,
                transform: `translate(-50%, -130%) scale(${point.scale})`,
                opacity: point.visible ? 1 : 0
              }}
            >
              <div className="flex flex-col items-center">
                {/* Holographic Badge */}
                <div
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border backdrop-blur-xl shadow-2xl flex items-center gap-1.5 sm:gap-2 whitespace-nowrap"
                  style={{
                    backgroundColor: 'rgba(7, 8, 11, 0.85)',
                    borderColor: `${point.color}60`,
                    boxShadow: `0 0 20px ${point.color}30`
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-ping"
                    style={{ backgroundColor: point.color }}
                  />
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-wider uppercase text-white">
                      {point.label}
                    </span>
                    <span className="text-[8px] sm:text-[9px] font-mono text-slate-400">
                      {point.sublabel}
                    </span>
                  </div>
                </div>
                {/* Connecting Anchor Stem */}
                <div
                  className="w-px h-4 sm:h-6"
                  style={{ backgroundColor: point.color, opacity: 0.6 }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: point.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* TOP STATUS FLIGHT TELEMETRY BAR (IOS & ANDROID SAFE-AREA INSET COMPLIANT) */}
        <div className="absolute top-2.5 sm:top-6 inset-x-3 sm:inset-x-6 z-20 flex items-center justify-between pointer-events-none pt-[env(safe-area-inset-top,0px)]">
          <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#0d121c]/90 border border-white/10 backdrop-blur-md shadow-2xl">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse shrink-0" />
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ backgroundColor: currentBeat.statusColor }}
            />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-200 truncate max-w-[130px] xs:max-w-[200px] sm:max-w-none">
              {currentBeat.telemetryState}
            </span>
            <span className="hidden xs:inline text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
              {currentBeat.stageLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-400 bg-[#0d121c]/90 px-2.5 py-1 rounded-full border border-white/10">
            <span className="text-cyan-400 font-bold">{Math.round(scrollProgress * 100)}%</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">0{currentBeat.id}/07</span>
          </div>
        </div>

        {/* FLOATING 3D CINEMATIC STORY COCKPIT (TOUCH-ENABLED RESPONSIVE SHEET) */}
        <div className="absolute inset-x-3 sm:inset-x-auto sm:left-10 bottom-3.5 sm:bottom-12 z-20 max-w-xl pointer-events-auto">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="p-3.5 sm:p-7 rounded-xl sm:rounded-2xl enterprise-glass border border-white/15 shadow-[0_16px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300"
          >
            
            {/* Stage Header & Context Indicator */}
            <div className="flex items-center justify-between pb-2 sm:pb-3 mb-2 sm:mb-4 border-b border-white/10">
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase flex items-center gap-1.5 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                {currentBeat.stageLabel}
              </span>
              <span className="text-[10px] sm:text-xs font-mono text-slate-400 truncate ml-2">
                {currentBeat.subheadline}
              </span>
            </div>

            {/* Fluid Emil Kowalski Crossfade Container for Story Content */}
            <div key={currentBeat.id} className="animate-stage-transition">
              {/* Headline */}
              <h2 className="text-base sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug sm:leading-tight mb-1.5 sm:mb-3 font-sans">
                {currentBeat.headline}
              </h2>

              {/* Communicative Narrative Explanation */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-2 sm:mb-4 line-clamp-3 sm:line-clamp-none">
                {currentBeat.narrative}
              </p>

              {/* Key Business Takeaway Callout */}
              <div className="p-2 sm:p-3.5 rounded-lg sm:rounded-xl bg-cyan-950/40 border border-cyan-800/40 text-[11px] sm:text-xs text-slate-300 flex items-start gap-2 sm:gap-3 mb-2.5 sm:mb-5 shadow-inner">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5 text-cyan-300 font-bold text-xs">
                  💡
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-cyan-300 font-semibold block text-[10px] sm:text-[11px] uppercase tracking-wider mb-0.5">
                    What this means for your business
                  </span>
                  <span className="text-slate-300 text-[11px] sm:text-xs leading-relaxed block line-clamp-2 sm:line-clamp-none">
                    {currentBeat.takeaway}
                  </span>
                </div>
              </div>
            </div>

            {/* Chapter Progression Bar with Continuous Live Ribbon */}
            <div className="space-y-1.5 sm:space-y-2 mb-2.5 sm:mb-4">
              <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  TRANSFORMATION JOURNEY:
                </span>
                <span className="text-cyan-300 font-bold">0{currentBeat.id} OF 07</span>
              </div>

              {/* Continuous Living Progress Ribbon */}
              <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(56,189,248,0.7)]"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>

              <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
                {STORY_BEATS.map((beat, idx) => (
                  <button
                    key={beat.id}
                    onClick={() => jumpToBeat(idx)}
                    title={`Jump to 0${beat.id}: ${beat.headline}`}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      activeBeatIndex === idx
                        ? 'bg-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.9)] scale-y-125'
                        : activeBeatIndex > idx
                        ? 'bg-slate-400/80 hover:bg-slate-300'
                        : 'bg-white/15 hover:bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Flight Navigation & Auto-Dive Controls */}
            <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/10">
              <button
                onClick={() => setIsPlayingTour(!isPlayingTour)}
                className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-[11px] sm:text-xs font-mono font-medium transition-colors ${
                  isPlayingTour
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
                }`}
              >
                {isPlayingTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isPlayingTour ? 'Pause Topology Tour' : 'Auto-Play Living Topology'}</span>
                <span className="sm:hidden">{isPlayingTour ? 'Pause' : 'Auto-Play'}</span>
              </button>

              <div className="flex items-center gap-1 sm:gap-1.5">
                <button
                  onClick={prevBeat}
                  disabled={activeBeatIndex === 0}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 border border-white/10 text-xs transition-transform active:scale-95"
                  title="Previous Stage"
                  aria-label="Previous Stage"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 px-1">
                  0{activeBeatIndex + 1} / 07
                </span>
                <button
                  onClick={nextBeat}
                  disabled={activeBeatIndex === STORY_BEATS.length - 1}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 text-slate-300 border border-white/10 text-xs transition-transform active:scale-95"
                  title="Next Stage"
                  aria-label="Next Stage"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM-RIGHT: INTERACTIVE DOMAIN TELEMETRY INSPECTOR */}
        <div className="absolute right-4 sm:right-10 bottom-8 sm:bottom-12 z-20 hidden md:block max-w-sm pointer-events-auto">
          <div className="p-4 rounded-xl bg-[#0d121c]/90 border border-white/10 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedDomain.color }} />
                <span className="text-xs font-mono font-semibold uppercase text-white">
                  {selectedDomain.name} Node
                </span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                {selectedDomain.throughput}
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-tight mb-3">
              {selectedDomain.description}
            </p>

            <div className="flex flex-wrap gap-1">
              {OPERATIONAL_DOMAINS.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDomain(d)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                    selectedDomain.id === d.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {d.name.slice(0, 4)}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};