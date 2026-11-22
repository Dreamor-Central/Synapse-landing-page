import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OPERATIONAL_DOMAINS } from '../data/enterpriseData';

export type VisualizationMode = 'hero' | 'understand' | 'anticipate' | 'orchestrate' | 'scenario';

interface ContinuousEnterprise3DProps {
  mode?: VisualizationMode;
  interactive?: boolean;
  className?: string;
}

interface DomainNode3D {
  id: string;
  name: string;
  color: number;
  basePos: THREE.Vector3;
  currentPos: THREE.Vector3;
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

export const ContinuousEnterprise3D: React.FC<ContinuousEnterprise3DProps> = ({
  mode = 'hero',
  interactive = true,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Keep a ref to mode so animation loop always reads latest without re-creating scene
  const modeRef = useRef<VisualizationMode>(mode);
  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

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
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
    } catch {
      setWebGLSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.028);

    const isMobile = container.clientWidth < 640;
    const camera = new THREE.PerspectiveCamera(
      isMobile ? 54 : 44,
      container.clientWidth / container.clientHeight,
      0.1,
      120
    );
    camera.position.set(0, 1.6, isMobile ? 14.5 : 12.2);

    // 2. LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x38bdf8, 3.8, 32);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.85);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0284c7, 0.7);
    rimLight.position.set(-6, -6, -4);
    scene.add(rimLight);

    // 3. CENTRAL INTELLIGENCE CORE
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Glowing inner nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // Mid faceted icosahedron
    const facetedGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const facetedMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2
    });
    const facetedMesh = new THREE.Mesh(facetedGeo, facetedMat);
    coreGroup.add(facetedMesh);

    // Outer crystalline geodesic cage
    const outerCageGeo = new THREE.DodecahedronGeometry(1.9, 0);
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.32
    });
    const outerCageMesh = new THREE.Mesh(outerCageGeo, outerCageMat);
    coreGroup.add(outerCageMesh);

    // Gyroscopic rings
    const ringGeo = new THREE.RingGeometry(2.2, 2.25, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // 4. COORDINATED SHOCKWAVE RING (Active in orchestrate mode)
    const shockwaveGeo = new THREE.RingGeometry(0.8, 0.88, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.0
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.rotation.x = Math.PI / 2;
    scene.add(shockwaveMesh);

    // 5. 8 SURROUNDING OPERATIONAL DOMAIN NODES
    const baseDomainPositions: [number, number, number][] = [
      [3.8, 1.4, 0.4],    // Sales
      [-3.4, -1.8, 1.4],  // Operations
      [2.6, -2.4, 1.2],   // Customers
      [3.6, -1.0, -1.6],  // Finance
      [-1.8, 2.8, 1.2],   // Marketing
      [-3.8, 0.4, -1.6],  // Supply Chain
      [1.4, 3.4, -0.8],   // People
      [-3.2, 2.0, -1.0]   // Strategy
    ];

    const domainNodes: DomainNode3D[] = [];

    OPERATIONAL_DOMAINS.forEach((domain, idx) => {
      const coords = baseDomainPositions[idx] || [3, 0, 0];
      const basePos = new THREE.Vector3(...coords);
      const colorHex = parseInt(domain.color.replace('#', '0x'), 16);

      const group = new THREE.Group();
      group.position.copy(basePos);
      scene.add(group);

      // Node Diamond Core
      const coreGeo = new THREE.OctahedronGeometry(0.38, 0);
      const coreMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.85,
        roughness: 0.25
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      group.add(coreMesh);

      // Node Outer Wireframe Shell
      const shellGeo = new THREE.IcosahedronGeometry(0.58, 1);
      const shellMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      group.add(shellMesh);

      // Node Orbiting Equatorial Ring
      const nodeRingGeo = new THREE.TorusGeometry(0.72, 0.015, 12, 48);
      const nodeRingMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.45
      });
      const ringMesh = new THREE.Mesh(nodeRingGeo, nodeRingMat);
      ringMesh.rotation.x = Math.PI / 2;
      group.add(ringMesh);

      // 3D Spline to Central Core
      const midPoint = basePos.clone().multiplyScalar(0.5);
      midPoint.y += (Math.random() - 0.5) * 1.0;
      const curveToCore = new THREE.CatmullRomCurve3([
        basePos,
        midPoint,
        new THREE.Vector3(0, 0, 0)
      ]);

      const points = curveToCore.getPoints(32);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.38
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      scene.add(lineMesh);

      // Flowing photon data packets
      const packetCount = 3;
      const packetProgress = [0.12, 0.46, 0.8];
      const packetMeshes: THREE.Mesh[] = [];

      for (let p = 0; p < packetCount; p++) {
        const pGeo = new THREE.SphereGeometry(0.06, 10, 10);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        scene.add(pMesh);
        packetMeshes.push(pMesh);
      }

      domainNodes.push({
        id: domain.id,
        name: domain.name,
        color: colorHex,
        basePos,
        currentPos: basePos.clone(),
        targetPos: basePos.clone(),
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

    // 6. LATERAL NEURAL FILAMENTS (Cross-Domain Web)
    const filamentPairs: [string, string][] = [
      ['sales', 'operations'],
      ['operations', 'customers'],
      ['customers', 'finance'],
      ['finance', 'sales'],
      ['marketing', 'sales'],
      ['supply-chain', 'operations'],
      ['people', 'operations'],
      ['strategy', 'finance']
    ];

    const filaments: { line: THREE.Line; idA: string; idB: string }[] = [];
    filamentPairs.forEach(([idA, idB]) => {
      const nodeA = domainNodes.find(n => n.id === idA);
      const nodeB = domainNodes.find(n => n.id === idB);
      if (!nodeA || !nodeB) return;

      const mid = nodeA.basePos.clone().lerp(nodeB.basePos, 0.5);
      mid.multiplyScalar(1.18);

      const curve = new THREE.CatmullRomCurve3([
        nodeA.basePos,
        mid,
        nodeB.basePos
      ]);

      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      const mat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending
      });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      filaments.push({ line, idA, idB });
    });

    // 7. AMBIENT PARTICLES
    const particleCount = 280;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const r = 5 + Math.random() * 16;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      particlePos[i3] = r * Math.sin(ph) * Math.cos(th);
      particlePos[i3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
      particlePos[i3 + 2] = r * Math.cos(ph);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.08,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    scene.add(particleCloud);

    // MOUSE / TOUCH PARALLAX
    let targetMouseX = 0;
    let targetMouseY = 0;
    let curMouseX = 0;
    let curMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.2;
      targetMouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.8;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      const rect = container.getBoundingClientRect();
      targetMouseX = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 1.0;
      targetMouseY = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 0.6;
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!container || !renderer) return;
      const isMob = container.clientWidth < 640;
      camera.fov = isMob ? 54 : 44;
      camera.position.z = isMob ? 14.5 : 12.2;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let shockwaveRadius = 1.0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.05 : 0.6;
      const currentMode = modeRef.current;

      // Parallax damping
      curMouseX += (targetMouseX - curMouseX) * 0.05;
      curMouseY += (targetMouseY - curMouseY) * 0.05;

      // Camera base positioning based on mode
      let targetCamX = curMouseX;
      let targetCamY = 1.6 - curMouseY * 0.5;
      let targetCamZ = isMobile ? 14.5 : 12.2;

      if (currentMode === 'anticipate' || currentMode === 'scenario') {
        // Subtle drift toward the Sales/Operations/Customer quadrant
        targetCamX += 0.8;
        targetCamY += -0.4;
        targetCamZ += -1.0;
      } else if (currentMode === 'orchestrate') {
        // Slightly higher isometric overview
        targetCamY += 1.2;
      }

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.position.z += (targetCamZ - camera.position.z) * 0.04;
      camera.lookAt(0, 0, 0);

      // Core rotation
      coreGroup.rotation.y = elapsedTime * 0.22 * speed;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.25 * speed) * 0.1;
      ring1.rotation.z = elapsedTime * 0.3 * speed;
      ring2.rotation.y = -elapsedTime * 0.25 * speed;

      // Shockwave ring animation (active in orchestrate mode)
      if (currentMode === 'orchestrate') {
        shockwaveRadius += 0.045 * speed;
        if (shockwaveRadius > 6.5) shockwaveRadius = 1.0;
        shockwaveMesh.scale.set(shockwaveRadius, shockwaveRadius, shockwaveRadius);
        const fade = Math.max(0, 1.0 - (shockwaveRadius - 1.0) / 5.5);
        shockwaveMat.opacity = fade * 0.65;
        shockwaveMesh.visible = true;
      } else {
        shockwaveMat.opacity = 0;
        shockwaveMesh.visible = false;
        shockwaveRadius = 1.0;
      }

      // Domain nodes animation
      domainNodes.forEach((node) => {
        // Node spinning
        node.coreMesh.rotation.y = elapsedTime * 0.6 * speed;
        node.shellMesh.rotation.y = -elapsedTime * 0.35 * speed;
        node.ringMesh.rotation.z = elapsedTime * 0.45 * speed;

        // Visual emphasis based on mode
        const isFocusNode = currentMode === 'anticipate' || currentMode === 'scenario'
          ? (node.id === 'sales' || node.id === 'operations' || node.id === 'customers' || node.id === 'finance')
          : true;

        const targetScale = isFocusNode ? (currentMode === 'anticipate' ? 1.22 : 1.0) : 0.75;
        node.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

        // Core spline opacity
        const baseOpacity = currentMode === 'understand' ? 0.55 : (isFocusNode ? 0.45 : 0.15);
        (node.lineMesh.material as THREE.LineBasicMaterial).opacity = baseOpacity;

        // Advance packet particles
        const packetSpeedMultiplier = isFocusNode && (currentMode === 'anticipate' || currentMode === 'orchestrate') ? 1.6 : 1.0;
        node.packetProgress.forEach((prog, pIdx) => {
          node.packetProgress[pIdx] = (prog + 0.0032 * speed * packetSpeedMultiplier) % 1;
          const pos = node.curveToCore.getPoint(node.packetProgress[pIdx]);
          if (node.packetMeshes[pIdx]) {
            node.packetMeshes[pIdx].position.copy(pos);
            node.packetMeshes[pIdx].visible = isFocusNode;
          }
        });
      });

      // Filaments opacity based on mode
      filaments.forEach((fil) => {
        const isScenarioFilament =
          (fil.idA === 'sales' && fil.idB === 'operations') ||
          (fil.idA === 'operations' && fil.idB === 'customers') ||
          (fil.idA === 'customers' && fil.idB === 'finance') ||
          (fil.idA === 'finance' && fil.idB === 'sales');

        let targetOpacity = 0.22;
        if (currentMode === 'understand') {
          targetOpacity = 0.42; // Fully illuminated web
        } else if (currentMode === 'anticipate' || currentMode === 'scenario') {
          targetOpacity = isScenarioFilament ? 0.85 : 0.08;
        } else if (currentMode === 'orchestrate') {
          targetOpacity = 0.35;
        }
        (fil.line.material as THREE.LineBasicMaterial).opacity = targetOpacity;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
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
  }, [interactive]);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`} ref={containerRef}>
      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 outline-none"
          aria-label="3D continuous enterprise neural network visualizer"
        />
      ) : (
        /* Minimal Clean Architectural SVG Fallback */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 bg-[#07080B]">
          <svg className="w-full h-full max-w-xl max-h-full" viewBox="0 0 600 450">
            <defs>
              <radialGradient id="fallbackGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#07080b" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="300" cy="225" r="70" fill="url(#fallbackGlow)" />
            <circle cx="300" cy="225" r="32" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="300" y="222" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="monospace" fontWeight="700" letterSpacing="0.1em">
              SYNAPSE
            </text>
            <text x="300" y="234" textAnchor="middle" fill="#38bdf8" fontSize="7" fontFamily="monospace" letterSpacing="0.15em">
              OPERATING SYSTEM
            </text>
            {OPERATIONAL_DOMAINS.map((domain, i) => {
              const angle = (i / OPERATIONAL_DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
              const x = 300 + Math.cos(angle) * 140;
              const y = 225 + Math.sin(angle) * 140;
              return (
                <g key={domain.id}>
                  <line x1="300" y1="225" x2={x} y2={y} stroke={domain.color} strokeWidth="1" strokeOpacity="0.35" />
                  <circle cx={x} cy={y} r="12" fill="#0a0e17" stroke={domain.color} strokeWidth="1.5" />
                  <text x={x} y={y + 3} textAnchor="middle" fill="#e2e8f0" fontSize="7" fontFamily="monospace" fontWeight="600">
                    {domain.name.substring(0, 4).toUpperCase()}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};
