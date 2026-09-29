'use client';

import React from 'react';

interface MathruLogoProps {
  variant?: 'full' | 'mark-only' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  animateGlow?: boolean;
}

const sizeConfig = {
  sm: {
    markWidth: 28,
    markHeight: 24,
    titleSize: 'text-lg',
    labsSize: 'text-[9px] tracking-[0.25em]',
    taglineSize: 'text-[7px] tracking-[0.2em]',
    gap: 'gap-2',
  },
  md: {
    markWidth: 38,
    markHeight: 32,
    titleSize: 'text-xl lg:text-2xl',
    labsSize: 'text-[10px] tracking-[0.28em]',
    taglineSize: 'text-[8px] tracking-[0.22em]',
    gap: 'gap-2.5',
  },
  lg: {
    markWidth: 54,
    markHeight: 46,
    titleSize: 'text-3xl lg:text-4xl',
    labsSize: 'text-xs tracking-[0.32em]',
    taglineSize: 'text-[10px] tracking-[0.25em]',
    gap: 'gap-3.5',
  },
  xl: {
    markWidth: 76,
    markHeight: 64,
    titleSize: 'text-5xl lg:text-6xl',
    labsSize: 'text-sm tracking-[0.35em]',
    taglineSize: 'text-xs tracking-[0.3em]',
    gap: 'gap-4',
  },
};

/**
 * 3D Sculptural Ribbon "M" Lettermark matching the Mathru Labs corporate brand identity:
 * - Left Arch: Electric Azure / Cyan Blue
 * - Central Petal: Neon Emerald / Vivid Mint Green
 * - Right Leg: Sunset Warm Orange / Coral Amber
 */
export function MathruLogoMark({
  width = 38,
  height = 32,
  className = '',
  withGlow = true,
}: {
  width?: number;
  height?: number;
  className?: string;
  withGlow?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ width, height }}
    >
      {/* Ambient Backlight Glow matching the corporate reception mockup */}
      {withGlow && (
        <div
          className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-md opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 163, 255, 0.45) 0%, rgba(0, 210, 106, 0.3) 45%, rgba(255, 107, 0, 0.35) 85%, transparent 100%)',
            transform: 'scale(1.35)',
          }}
        />
      )}

      {/* Official 3D Ribbon Lettermark from authentic company brand artwork */}
      <img
        src="/brand/mathru-mark.png"
        alt="Mathru Labs Logo Mark"
        width={width}
        height={height}
        className="h-full w-full object-contain drop-shadow-[0_4px_16px_rgba(0,112,243,0.4)] select-none"
      />
    </div>
  );
}

/**
 * Complete Mathru Labs Official Brand Lockup:
 * - 3D Sculptural Ribbon "M" Mark
 * - "Mathru" in premium bold typography
 * - "LABS" in wide-tracked uppercase
 * - "AI | SOFTWARE | AUTOMATION" tagline with cyan dividers
 */
export function MathruLogo({
  variant = 'full',
  size = 'md',
  showTagline = true,
  className = '',
  animateGlow = false,
}: MathruLogoProps) {
  const config = sizeConfig[size];

  if (variant === 'mark-only') {
    return (
      <MathruLogoMark
        width={config.markWidth}
        height={config.markHeight}
        className={className}
        withGlow={animateGlow}
      />
    );
  }

  return (
    <div className={`group inline-flex items-center ${config.gap} ${className}`}>
      {/* 3D Ribbon Lettermark */}
      <MathruLogoMark
        width={config.markWidth}
        height={config.markHeight}
        withGlow={true}
        className="transition-transform duration-300 group-hover:scale-105"
      />

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center leading-none">
        {/* Mathru + LABS Row */}
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-bold tracking-tight text-white font-[var(--font-heading)] ${config.titleSize} transition-colors group-hover:text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.15)]`}
          >
            Mathru
          </span>
          <span
            className={`font-extrabold uppercase text-white/90 font-[var(--font-heading)] ${config.labsSize} border-l border-white/20 pl-1.5`}
          >
            LABS
          </span>
        </div>

        {/* Sub-tagline: AI | SOFTWARE | AUTOMATION */}
        {showTagline && (
          <div
            className={`mt-1 flex items-center gap-1 font-semibold uppercase text-text-muted ${config.taglineSize}`}
          >
            <span className="text-[#38BDF8] hover:text-white transition-colors">AI</span>
            <span className="text-white/30 text-[9px] font-normal">|</span>
            <span className="text-white/90 hover:text-white transition-colors">SOFTWARE</span>
            <span className="text-white/30 text-[9px] font-normal">|</span>
            <span className="text-[#00D26A] hover:text-white transition-colors">AUTOMATION</span>
          </div>
        )}
      </div>
    </div>
  );
}
