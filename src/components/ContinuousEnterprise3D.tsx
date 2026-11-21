import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OPERATIONAL_DOMAINS } from '../data/enterpriseData';
import type { OperationalDomain } from '../types';
import type { NarrativeStage } from '../hooks/useScrollNarrative';

interface ContinuousEnterprise3DProps {
  currentStage: NarrativeStage;
  activeDomainId?: string;
  onSelectDomain?: (domain: OperationalDomain) => void;
  className?: string;
}

interface DomainNode3D {
  domain: OperationalDomain;
  basePosition: THREE.Vector3;
  currentPosition: THREE.Vector3;
  targetPosition: THREE.Vector3;
  mesh: THREE.Mesh;
  shellMesh: THREE.Mesh;
  ringMesh: THREE.Mesh;
  curveToCore: THREE.CatmullRomCurve3;
  lineMesh: THREE.Line;
  packetProgress: number[];
  packetMeshes: THREE.Mesh[];
}

export const ContinuousEnterprise3D: React.FC<ContinuousEnterprise3DProps> = ({
  currentStage,
  activeDomainId,
  onSelectDomain,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedDomain, setSelectedDomain] = useState<OperationalDomain>(OPERATIONAL_DOMAINS[0]);
  const [hoveredDomainId, setHoveredDomainId] = useState<string | null>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Sync prop changes
  useEffect(() => {
    if (activeDomainId) {
      const match = OPERATIONAL_DOMAINS.find(d => d.id === activeDomainId);
      if (match) setSelectedDomain(match);
    }
  }, [activeDomainId]);

  const handleDomainClick = useCallback((domain: OperationalDomain) => {
    setSelectedDomain(domain);
    if (onSelectDomain) {
      onSelectDomain(domain);
    }
  }, [onSelectDomain]);

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
      renderer.toneMappingExposure = 1.2;
    } catch {
      setWebGLSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.032);

    const isMobileHero = container.clientWidth < 640;
    const heroFov = isMobileHero ? 54 : 42;
    const camera = new THREE.PerspectiveCamera(
      heroFov,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, isMobileHero ? 14.0 : 12.0);

    // 2. LIGHTING RIG
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const corePointLight = new THREE.PointLight(0x38bdf8, 3.5, 30);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(6, 10, 8);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0284c7, 0.7);
    rimLight.position.set(-6, -6, -4);
    scene.add(rimLight);

    // 3. CENTRAL INTELLIGENCE CORE
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing nucleus
    const innerNucleusGeo = new THREE.SphereGeometry(0.8, 32, 32);
    const innerNucleusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95
    });
    const innerNucleus = new THREE.Mesh(innerNucleusGeo, innerNucleusMat);
    coreGroup.add(innerNucleus);

    // Mid faceted icosahedron
    const midFacetedGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const midFacetedMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.85,
      transparent: true,
      opacity: 0.8,
      roughness: 0.2
    });
    const midFacetedMesh = new THREE.Mesh(midFacetedGeo, midFacetedMat);
    coreGroup.add(midFacetedMesh);

    // Outer crystalline cage
    const outerCageGeo = new THREE.DodecahedronGeometry(1.8, 0);
    const outerCageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const outerCageMesh = new THREE.Mesh(outerCageGeo, outerCageMat);
    coreGroup.add(outerCageMesh);

    // Gyroscopic equatorial rings
    const ringGeo = new THREE.RingGeometry(2.1, 2.16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const gyroRing1 = new THREE.Mesh(ringGeo, ringMat);
    gyroRing1.rotation.x = Math.PI / 2;
    coreGroup.add(gyroRing1);

    const gyroRing2 = new THREE.Mesh(ringGeo, ringMat);
    gyroRing2.rotation.x = Math.PI / 3;
    gyroRing2.rotation.y = Math.PI / 6;
    coreGroup.add(gyroRing2);

    // 4. SURROUNDING OPERATIONAL DOMAIN NODES (WELL-SPACED 3D CONSTELLATION)
    const baseDomainPositions = [
      new THREE.Vector3(3.8, 1.4, 0.4),    // Finance
      new THREE.Vector3(-3.4, 2.2, -0.8),  // People
      new THREE.Vector3(2.8, -2.2, 1.2),   // Customers
      new THREE.Vector3(-3.0, -2.0, 1.6),  // Operations
      new THREE.Vector3(4.0, -0.8, -1.4),  // Sales
      new THREE.Vector3(-1.8, 2.8, 1.4),   // Marketing
      new THREE.Vector3(-4.0, -0.4, -1.8), // Supply Chain
      new THREE.Vector3(1.0, 3.4, -1.0)    // Strategy
    ];

    const domainNodes: DomainNode3D[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];

    OPERATIONAL_DOMAINS.forEach((domain, idx) => {
      const pos = baseDomainPositions[idx].clone();
      const colorHex = parseInt(domain.color.replace('#', '0x'), 16);

      // Node Diamond Core
      const nodeGeo = new THREE.OctahedronGeometry(0.42, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.85,
        roughness: 0.25
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { domainId: domain.id };
      scene.add(nodeMesh);
      interactiveMeshes.push(nodeMesh);

      // Node Outer Wireframe Shell
      const shellGeo = new THREE.IcosahedronGeometry(0.62, 1);
      const shellMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const shellMesh = new THREE.Mesh(shellGeo, shellMat);
      shellMesh.position.copy(pos);
      scene.add(shellMesh);

      // Node Orbiting Equatorial Ring
      const nodeRingGeo = new THREE.TorusGeometry(0.78, 0.015, 12, 48);
      const nodeRingMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.5
      });
      const ringMesh = new THREE.Mesh(nodeRingGeo, nodeRingMat);
      ringMesh.position.copy(pos);
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);

      // 3D Spline to Central Core
      const midPoint = pos.clone().multiplyScalar(0.5);
      midPoint.y += (Math.random() - 0.5) * 1.2;
      const curveToCore = new THREE.CatmullRomCurve3([
        pos,
        midPoint,
        new THREE.Vector3(0, 0, 0)
      ]);

      const points = curveToCore.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.45
      });
      const lineMesh = new THREE.Line(lineGeo, lineMat);
      scene.add(lineMesh);

      // Flowing photon packets
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
        basePosition: pos,
        currentPosition: pos.clone(),
        targetPosition: pos.clone(),
        mesh: nodeMesh,
        shellMesh,
        ringMesh,
        curveToCore,
        lineMesh,
        packetProgress,
        packetMeshes
      });
    });

    // MOUSE PARALLAX & RAYCASTING
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.5;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.0;

      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);

      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        const domainId = intersects[0].object.userData.domainId;
        setHoveredDomainId(domainId);
        container.style.cursor = 'pointer';
      } else {
        setHoveredDomainId(null);
        container.style.cursor = 'default';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouseVec, camera);

      const intersects = raycaster.intersectObjects(interactiveMeshes);
      if (intersects.length > 0) {
        const domainId = intersects[0].object.userData.domainId;
        const clicked = OPERATIONAL_DOMAINS.find(d => d.id === domainId);
        if (clicked) handleDomainClick(clicked);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        targetX = ((e.touches[0].clientX - rect.left) / rect.width - 0.5) * 1.5;
        targetY = ((e.touches[0].clientY - rect.top) / rect.height - 0.5) * 1.5;
      }
    };

    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container || !renderer) return;
      const isMobile = container.clientWidth < 640;
      camera.fov = isMobile ? 54 : 42;
      camera.position.z = isMobile ? 14.0 : 12.0;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.05 : 0.65;

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = 1.8 - mouseY * 0.5;
      camera.lookAt(0, 0, 0);

      // Core rotation
      coreGroup.rotation.y = elapsedTime * 0.25 * speed;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.3 * speed) * 0.12;
      gyroRing1.rotation.z = elapsedTime * 0.35 * speed;
      gyroRing2.rotation.y = -elapsedTime * 0.3 * speed;

      // Stage behavior (equilibrium vs fragmentation)
      const isFragmented = currentStage === 'fragmentation';
      const expansion = isFragmented ? 2.1 : 1.0;

      domainNodes.forEach((node) => {
        const isSelected = selectedDomain.id === node.domain.id;

        node.targetPosition.copy(node.basePosition).multiplyScalar(expansion);
        node.currentPosition.lerp(node.targetPosition, 0.06);

        node.mesh.position.copy(node.currentPosition);
        node.shellMesh.position.copy(node.currentPosition);
        node.ringMesh.position.copy(node.currentPosition);

        node.mesh.rotation.y = elapsedTime * 0.7 * speed;
        node.shellMesh.rotation.y = -elapsedTime * 0.4 * speed;
        node.ringMesh.rotation.z = elapsedTime * 0.5 * speed;

        // Scale selected node
        const targetScale = isSelected ? 1.25 : 1.0;
        node.mesh.scale.setScalar(targetScale);
        node.shellMesh.scale.setScalar(targetScale);

        // Update spline curve
        const midPoint = node.currentPosition.clone().multiplyScalar(0.5);
        node.curveToCore.points[0].copy(node.currentPosition);
        node.curveToCore.points[1].copy(midPoint);
        const pts = node.curveToCore.getPoints(36);
        node.lineMesh.geometry.setFromPoints(pts);

        // Spline opacity
        (node.lineMesh.material as THREE.LineBasicMaterial).opacity = isFragmented ? 0.08 : (isSelected ? 0.85 : 0.35);

        // Advance packet particles
        node.packetProgress.forEach((prog, pIdx) => {
          node.packetProgress[pIdx] = (prog + 0.0035 * speed * (isSelected ? 2.0 : 1.0)) % 1;
          const pos = node.curveToCore.getPoint(node.packetProgress[pIdx]);
          if (node.packetMeshes[pIdx]) {
            node.packetMeshes[pIdx].position.copy(pos);
            node.packetMeshes[pIdx].visible = !isFragmented;
          }
        });
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);

      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
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
  }, [selectedDomain, currentStage, handleDomainClick]);

  return (
    <div className={`relative w-full h-full select-none overflow-hidden ${className}`} ref={containerRef}>
      
      {/* 3D WebGL Canvas */}
      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 outline-none"
          aria-label="3D continuous enterprise neural core visualizer"
        />
      ) : (
        /* High-Craft Architectural SVG Fallback: Zero Overlap, Clean & Polished */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-4 bg-[#080b11]">
          <svg className="w-full h-full max-w-2xl max-h-full select-none" viewBox="0 0 640 480">
            <defs>
              <radialGradient id="heroCoreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="45%" stopColor="#0284c7" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#080b11" stopOpacity="0" />
              </radialGradient>
              <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Orbital Guide Rings with Micro-Ticks */}
            <circle cx="320" cy="240" r="195" fill="none" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="4 8" />
            <circle cx="320" cy="240" r="150" fill="none" stroke="#38bdf8" strokeOpacity="0.12" strokeDasharray="3 6" />
            <circle cx="320" cy="240" r="95" fill="none" stroke="#38bdf8" strokeOpacity="0.18" />

            {/* Central Synapse Intelligence Core */}
            <circle cx="320" cy="240" r="70" fill="url(#heroCoreGlow)" />
            <circle cx="320" cy="240" r="42" fill="#090d16" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="320" cy="240" r="26" fill="#0284c7" fillOpacity="0.3" stroke="#00e5ff" strokeWidth="1.5" />
            <circle cx="320" cy="240" r="10" fill="#38bdf8" />
            
            <text x="320" y="236" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="700" letterSpacing="0.12em">
              SYNAPSE
            </text>
            <text x="320" y="249" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace" letterSpacing="0.16em">
              INTELLIGENCE CORE
            </text>

            {/* 8 Operational Domain Nodes (Arranged with Generous 45° Radial Separation) */}
            {OPERATIONAL_DOMAINS.map((domain, i) => {
              const angle = (i / OPERATIONAL_DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 155;
              const x = 320 + Math.cos(angle) * radius;
              const y = 240 + Math.sin(angle) * radius;
              const isSelected = selectedDomain.id === domain.id;
              const isHovered = hoveredDomainId === domain.id;

              // Text position offset (placed slightly outside node to avoid ANY overlap)
              const labelRadius = radius + 32;
              const labelX = 320 + Math.cos(angle) * labelRadius;
              const labelY = 240 + Math.sin(angle) * labelRadius + 4;

              return (
                <g
                  key={domain.id}
                  onClick={() => handleDomainClick(domain)}
                  onMouseEnter={() => setHoveredDomainId(domain.id)}
                  onMouseLeave={() => setHoveredDomainId(null)}
                  className="cursor-pointer transition-all duration-200"
                >
                  {/* Connecting Neural Spline */}
                  <line
                    x1="320"
                    y1="240"
                    x2={x}
                    y2={y}
                    stroke={domain.color}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeOpacity={isSelected ? 0.85 : 0.25}
                    strokeDasharray={isSelected ? 'none' : '4 4'}
                  />

                  {/* Outer Pulsing Halo when active */}
                  {isSelected && (
                    <circle
                      cx={x}
                      cy={y}
                      r="28"
                      fill="none"
                      stroke={domain.color}
                      strokeWidth="1.5"
                      strokeOpacity="0.5"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Node Capsule Disc */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 18 : 14}
                    fill="#0a0e17"
                    stroke={domain.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    filter={isSelected || isHovered ? 'url(#nodeGlow)' : undefined}
                  />

                  {/* Inner Status Pip */}
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill={domain.color}
                  />

                  {/* Clean, Full Domain Name Badge (Positioned Radially to Prevent Overlap) */}
                  <g transform={`translate(${labelX}, ${labelY})`}>
                    <rect
                      x="-38"
                      y="-11"
                      width="76"
                      height="20"
                      rx="10"
                      fill="#070a10"
                      fillOpacity="0.9"
                      stroke={isSelected ? domain.color : 'rgba(255,255,255,0.1)'}
                      strokeWidth={isSelected ? '1.5' : '1'}
                    />
                    <text
                      x="0"
                      y="3"
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#94a3b8'}
                      fontSize="8.5"
                      fontFamily="monospace"
                      fontWeight={isSelected ? '700' : '500'}
                      letterSpacing="0.08em"
                    >
                      {domain.name.toUpperCase()}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Sleek Top-Left Status HUD Pill (Non-intrusive) */}
      <div className="absolute top-3 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0d121c]/90 border border-white/10 backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider uppercase text-slate-300">
            ENTERPRISE TOPOLOGY // {selectedDomain.name.toUpperCase()} NODE SELECTED
          </span>
        </div>
      </div>

    </div>
  );
};