import React from 'react';

interface SynapseLogoProps {
  size?: 'sm' | 'md' | 'lg';
  withSubtext?: boolean;
  className?: string;
}

export const SynapseLogo: React.FC<SynapseLogoProps> = ({
  size = 'md',
  withSubtext = true,
  className = ''
}) => {
  const iconSize = size === 'sm' ? 28 : size === 'lg' ? 44 : 36;

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      
      {/* Bespoke Synaptic Nexus Emblem */}
      <div
        className="relative shrink-0 rounded-xl bg-gradient-to-br from-[#0f172a] via-[#090d16] to-[#04060a] border border-cyan-500/30 p-1.5 shadow-[0_0_20px_rgba(56,189,248,0.22)] group-hover:border-cyan-400 group-hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] transition-all duration-300 flex items-center justify-center overflow-hidden"
        style={{ width: iconSize, height: iconSize }}
      >
        {/* Subtle Ambient Radial Light behind vector */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.3)_0%,transparent_70%)] opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Dynamic Architectural Vector Emblem */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 transition-transform duration-500 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="nexusGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="nexusGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id="coreGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Outer Hexagonal Crystalline Lattice */}
          <polygon
            points="18,3 30,10 30,24 18,31 6,24 6,10"
            fill="none"
            stroke="url(#nexusGrad1)"
            strokeWidth="1.2"
            strokeOpacity="0.45"
            strokeDasharray="2 2"
          />

          {/* Tri-Axial Synaptic Vectors (Converging to Center Core) */}
          {/* Vector 1: Top to Center */}
          <path
            d="M 18,6 L 18,18"
            stroke="url(#nexusGrad1)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Vector 2: Bottom-Right to Center */}
          <path
            d="M 28,23 L 18,18"
            stroke="url(#nexusGrad1)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Vector 3: Bottom-Left to Center */}
          <path
            d="M 8,23 L 18,18"
            stroke="url(#nexusGrad2)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Outer Synaptic Nodes */}
          <circle cx="18" cy="6" r="2.2" fill="#00e5ff" />
          <circle cx="28" cy="23" r="2.2" fill="#38bdf8" />
          <circle cx="8" cy="23" r="2.2" fill="#818cf8" />

          {/* Concentric Energy Ring */}
          <circle
            cx="18"
            cy="18"
            r="6.5"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeOpacity="0.6"
            strokeDasharray="3 3"
          />

          {/* Central Synaptic Nexus Core */}
          <circle
            cx="18"
            cy="18"
            r="3.2"
            fill="#ffffff"
            filter="url(#coreGlowFilter)"
          />
          <circle
            cx="18"
            cy="18"
            r="1.5"
            fill="#00e5ff"
          />
        </svg>

        {/* Live System Beacon Pulse */}
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#38bdf8]" />
      </div>

      {/* Typographic Brand Wordmark */}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className="font-sans font-bold tracking-[0.16em] text-white text-[15px] sm:text-[16px] group-hover:text-cyan-300 transition-colors">
            SYNAPSE
          </span>
          <span className="text-[9px] font-mono tracking-widest font-semibold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-[0_0_10px_rgba(56,189,248,0.25)]">
            OS
          </span>
        </div>
        {withSubtext && (
          <span className="text-[9px] font-mono tracking-[0.22em] text-slate-400 uppercase hidden sm:block mt-0.5">
            AI-Native Enterprise OS
          </span>
        )}
      </div>

    </div>
  );
};
