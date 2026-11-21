import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OPERATIONAL_DOMAINS } from '../data/enterpriseData';
import type { OperationalDomain } from '../types';

interface HeroThreeSceneProps {
  activeDomainId?: string;
  onSelectDomain?: (domain: OperationalDomain) => void;
}

interface DomainNode3D {
  domain: OperationalDomain;
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  glowMesh: THREE.Mesh;
  curveToCore: THREE.CatmullRomCurve3;
  packets: THREE.Vector3[];
  packetProgress: number[];
}

export const HeroThreeScene: React.FC<HeroThreeSceneProps> = ({
  activeDomainId,
  onSelectDomain
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedDomain, setSelectedDomain] = useState<OperationalDomain>(OPERATIONAL_DOMAINS[0]);
  const [hoveredDomain, setHoveredDomain] = useState<OperationalDomain | null>(null);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Sync internal state with prop
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

    // Detect WebGL capability
    try {
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
        return;
      }
    } catch {
      setWebGLSupported(false);
      return;
    }

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080b, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.5, 12);

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
    } catch {
      setWebGLSupported(false);
      return;
    }

    // LIGHTING - Clean architectural lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x38bdf8, 3, 20);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x0284c7, 0.6);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // CENTRAL INTELLIGENCE CORE
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing sphere
    const innerCoreGeo = new THREE.SphereGeometry(0.75, 32, 32);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    // Middle geometric faceted icosahedron
    const midCoreGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const midCoreMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      emissive: 0x0369a1,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.65,
      roughness: 0.2
    });
    const midCore = new THREE.Mesh(midCoreGeo, midCoreMat);
    coreGroup.add(midCore);

    // Outer lattice cage
    const outerCoreGeo = new THREE.DodecahedronGeometry(1.65, 0);
    const outerCoreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    const outerCore = new THREE.Mesh(outerCoreGeo, outerCoreMat);
    coreGroup.add(outerCore);

    // Orbiting equatorial rings
    const ringGeo = new THREE.RingGeometry(1.85, 1.9, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 2;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // OPERATIONAL DOMAIN NODES & CONNECTIONS
    const domainPositions = [
      new THREE.Vector3(3.6, 1.6, 0.4),    // Finance
      new THREE.Vector3(-3.2, 2.0, -0.8),  // People
      new THREE.Vector3(2.6, -2.0, 1.2),   // Customers
      new THREE.Vector3(-2.8, -1.8, 1.6),  // Operations
      new THREE.Vector3(3.8, -0.6, -1.4),  // Sales
      new THREE.Vector3(-1.6, 2.6, 1.4),   // Marketing
      new THREE.Vector3(-3.6, -0.4, -1.8), // Supply Chain
      new THREE.Vector3(0.8, 3.0, -1.0)    // Strategy
    ];

    const domainNodes: DomainNode3D[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];
    const linesGroup = new THREE.Group();
    scene.add(linesGroup);

    const packetsGroup = new THREE.Group();
    scene.add(packetsGroup);

    // Materials and geometry for data packets
    const packetGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.95
    });

    const packetMeshes: THREE.Mesh[] = [];

    OPERATIONAL_DOMAINS.forEach((domain, idx) => {
      const pos = domainPositions[idx] || new THREE.Vector3(3, 0, 0);
      const colorHex = parseInt(domain.color.replace('#', '0x'), 16);

      // Node mesh
      const nodeGeo = new THREE.OctahedronGeometry(0.38, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.7,
        roughness: 0.2,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { domain };
      scene.add(nodeMesh);
      interactiveMeshes.push(nodeMesh);

      // Node subtle aura halo
      const haloGeo = new THREE.RingGeometry(0.5, 0.54, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: colorHex,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.position.copy(pos);
      haloMesh.lookAt(camera.position);
      scene.add(haloMesh);

      // Bezier curve to central core
      const midPoint = new THREE.Vector3()
        .addVectors(pos, new THREE.Vector3(0, 0, 0))
        .multiplyScalar(0.5)
        .add(new THREE.Vector3(0, 0.3 * Math.sin(idx), 0.3 * Math.cos(idx)));

      const curve = new THREE.CatmullRomCurve3([
        pos,
        midPoint,
        new THREE.Vector3(0, 0, 0)
      ]);

      const points = curve.getPoints(36);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: colorHex,
        transparent: true,
        opacity: 0.35
      });
      const line = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(line);

      // Packets on this line
      const packets: THREE.Vector3[] = [];
      const packetProgress: number[] = [0.2, 0.6, 0.9];

      packetProgress.forEach((prog) => {
        const p = curve.getPoint(prog);
        packets.push(p);

        const pMesh = new THREE.Mesh(packetGeo, packetMat.clone());
        pMesh.position.copy(p);
        packetsGroup.add(pMesh);
        packetMeshes.push(pMesh);
      });

      domainNodes.push({
        domain,
        position: pos,
        mesh: nodeMesh,
        glowMesh: haloMesh,
        curveToCore: curve,
        packets,
        packetProgress
      });
    });

    // Inter-domain lateral connections (cross-silo intelligence links)
    const crossConnections: [number, number][] = [
      [0, 3], // Finance <-> Operations
      [0, 4], // Finance <-> Sales
      [5, 4], // Marketing <-> Sales
      [3, 6], // Operations <-> Supply Chain
      [1, 3], // People <-> Operations
      [2, 4], // Customers <-> Sales
      [7, 0], // Strategy <-> Finance
      [7, 1]  // Strategy <-> People
    ];

    crossConnections.forEach(([srcIdx, dstIdx]) => {
      const src = domainPositions[srcIdx];
      const dst = domainPositions[dstIdx];
      if (!src || !dst) return;

      const mid = new THREE.Vector3().addVectors(src, dst).multiplyScalar(0.5);
      const curve = new THREE.CatmullRomCurve3([src, mid, dst]);
      const points = curve.getPoints(24);
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.18
      });
      const crossLine = new THREE.Line(lineGeo, lineMat);
      linesGroup.add(crossLine);
    });

    // BACKGROUND DATA PARTICLES (Constellation)
    const particleCount = 450;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 4.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.045,
      transparent: true,
      opacity: 0.4
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // MOUSE PARALLAX & RAYCASTING
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      targetX = x * 1.5;
      targetY = y * 0.8;

      mouseVector.x = x;
      mouseVector.y = y;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData && hit.userData.domain) {
          setHoveredDomain(hit.userData.domain);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredDomain(null);
        container.style.cursor = 'default';
      }
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        if (hit.userData && hit.userData.domain) {
          handleDomainClick(hit.userData.domain);
        }
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleCanvasClick);

    // RESIZE OBSERVER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.05 : 0.6;

      // Mouse lerp damping (Emil Kowalski spring-like smoothness)
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX;
      camera.position.y = 2.5 + mouseY;
      camera.lookAt(0, 0, 0);

      // Core rotation
      coreGroup.rotation.y = elapsedTime * 0.15 * speed;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2 * speed) * 0.15;
      midCore.rotation.y = -elapsedTime * 0.25 * speed;
      outerCore.rotation.z = elapsedTime * 0.1 * speed;

      // Core pulse
      const pulse = 1 + Math.sin(elapsedTime * 2 * speed) * 0.06;
      innerCore.scale.set(pulse, pulse, pulse);

      // Domain nodes rotation & halo orientation
      domainNodes.forEach((node) => {
        node.mesh.rotation.y = elapsedTime * 0.5 * speed;
        node.mesh.rotation.x = elapsedTime * 0.3 * speed;
        node.glowMesh.lookAt(camera.position);

        // Highlight selected or hovered node
        const isSelected = selectedDomain.id === node.domain.id;
        const isHovered = hoveredDomain?.id === node.domain.id;

        if (isSelected || isHovered) {
          node.mesh.scale.set(1.45, 1.45, 1.45);
          node.glowMesh.scale.set(1.6, 1.6, 1.6);
          (node.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 1.4;
        } else {
          node.mesh.scale.set(1.0, 1.0, 1.0);
          node.glowMesh.scale.set(1.0, 1.0, 1.0);
          (node.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.7;
        }
      });

      // Data packets progression along splines
      let packetMeshIdx = 0;
      domainNodes.forEach((node) => {
        node.packetProgress.forEach((_, pIdx) => {
          node.packetProgress[pIdx] = (node.packetProgress[pIdx] + 0.003 * speed) % 1;
          const pos = node.curveToCore.getPoint(node.packetProgress[pIdx]);
          if (packetMeshes[packetMeshIdx]) {
            packetMeshes[packetMeshIdx].position.copy(pos);
            // Size packet depending on proximity to core
            const distToCore = pos.length();
            const s = Math.max(0.04, 0.1 - distToCore * 0.015);
            packetMeshes[packetMeshIdx].scale.set(s, s, s);
          }
          packetMeshIdx++;
        });
      });

      // Constellation slow rotation
      particles.rotation.y = elapsedTime * 0.02 * speed;
      particles.rotation.x = elapsedTime * 0.01 * speed;

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleCanvasClick);
      resizeObserver.disconnect();

      // Dispose geometries & materials
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
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [selectedDomain, hoveredDomain, handleDomainClick]);

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[720px] flex items-center justify-center select-none overflow-hidden" ref={containerRef}>
      {/* 3D WebGL Canvas */}
      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block z-0 outline-none"
          aria-label="3D visualization of the interconnected enterprise neural core and operational domains"
        />
      ) : (
        /* Graceful high-fidelity SVG/Canvas architectural fallback for environments without WebGL */
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-6 bg-[#080b11]">
          <svg className="w-full h-full max-w-xl max-h-xl select-none" viewBox="0 0 500 500">
            {/* Concentric orbital rings */}
            <circle cx="250" cy="250" r="190" fill="none" stroke="#ffffff" strokeOpacity="0.04" strokeDasharray="6 6" />
            <circle cx="250" cy="250" r="140" fill="none" stroke="#38bdf8" strokeOpacity="0.12" strokeDasharray="4 4" />
            <circle cx="250" cy="250" r="80" fill="none" stroke="#38bdf8" strokeOpacity="0.2" />

            {/* Central Intelligence Core */}
            <circle cx="250" cy="250" r="45" fill="#0c1322" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="28" fill="#0369a1" fillOpacity="0.4" stroke="#00e5ff" strokeWidth="1.5" />
            <circle cx="250" cy="250" r="12" fill="#38bdf8" />
            <text x="250" y="246" textAnchor="middle" fill="#f8fafc" fontSize="10" fontFamily="monospace" fontWeight="bold">SYNAPSE</text>
            <text x="250" y="258" textAnchor="middle" fill="#38bdf8" fontSize="8" fontFamily="monospace">CORE OS</text>

            {/* 8 Connected Operational Domains */}
            {OPERATIONAL_DOMAINS.map((domain, i) => {
              const angle = (i / OPERATIONAL_DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
              const x = 250 + Math.cos(angle) * 155;
              const y = 250 + Math.sin(angle) * 155;
              const isSelected = selectedDomain.id === domain.id;

              return (
                <g
                  key={domain.id}
                  onClick={() => handleDomainClick(domain)}
                  className="cursor-pointer transition-transform duration-200"
                >
                  {/* Connection Line to Core */}
                  <line
                    x1="250"
                    y1="250"
                    x2={x}
                    y2={y}
                    stroke={domain.color}
                    strokeWidth={isSelected ? 2 : 1}
                    strokeOpacity={isSelected ? 0.8 : 0.3}
                    strokeDasharray={isSelected ? 'none' : '3 3'}
                  />

                  {/* Flowing Data Indicator on Line */}
                  <circle
                    cx={250 + Math.cos(angle) * 90}
                    cy={250 + Math.sin(angle) * 90}
                    r={isSelected ? 3.5 : 2}
                    fill={domain.color}
                  />

                  {/* Domain Node Badge */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 28 : 22}
                    fill="#0d1117"
                    stroke={domain.color}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    filter={isSelected ? 'drop-shadow(0 0 8px rgba(56,189,248,0.5))' : 'none'}
                  />
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="middle"
                    fill={isSelected ? '#ffffff' : '#cbd5e1'}
                    fontSize={isSelected ? '9' : '8'}
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {domain.name.toUpperCase().slice(0, 5)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {/* Floating System HUD Overlay (Editorial Architectural Data Layer) */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0d121c]/80 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 absolute left-3" />
          <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
            NEURAL SUBSTRATE: 8 DOMAINS CONNECTED
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
            SYNCHRONOUS
          </span>
        </div>
      </div>

      {/* Interactive Domain Selector Strip (Bottom Right on 3D Viewport) */}
      <div className="absolute bottom-4 inset-x-4 md:inset-x-auto md:right-4 z-10 max-w-md pointer-events-auto">
        <div className="p-4 rounded-xl enterprise-glass shadow-2xl transition-all duration-300">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: selectedDomain.color }}
              />
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-slate-200">
                {selectedDomain.name} Domain Telemetry
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
              {selectedDomain.throughput}
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-3 leading-relaxed">
            {selectedDomain.description}
          </p>

          <div className="grid grid-cols-3 gap-2 mb-3">
            {selectedDomain.metrics.map((metric, i) => (
              <div key={i} className="p-2 rounded bg-black/40 border border-white/5">
                <div className="text-[10px] text-slate-400 font-mono truncate">{metric.label}</div>
                <div className="text-xs font-semibold text-slate-200 font-mono mt-0.5">{metric.value}</div>
              </div>
            ))}
          </div>

          {/* Quick domain switcher pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono text-slate-500 self-center mr-1">Inspect:</span>
            {OPERATIONAL_DOMAINS.map((domain) => (
              <button
                key={domain.id}
                onClick={() => handleDomainClick(domain)}
                className={`px-2 py-1 text-[11px] font-mono rounded transition-all duration-150 ${
                  selectedDomain.id === domain.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_8px_rgba(56,189,248,0.2)]'
                    : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {domain.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Spatial Coordinate Hint */}
      <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center gap-4 text-[10px] font-mono text-slate-300 pointer-events-none">
        <div>EULER: [0.15, 0.42, 0.08]</div>
        <div>LATENCY: &lt;14MS</div>
        <div>INTERACTION: DRAG TO ROTATE / CLICK NODE</div>
      </div>
    </div>
  );
};
