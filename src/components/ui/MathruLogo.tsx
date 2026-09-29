'use client';

import React from 'react';

interface MathruLogoProps {
  variant?: 'full' | 'mark-only' | 'image';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  animateGlow?: boolean;
}

const sizeConfig = {
  sm: {
    markWidth: 32,
    markHeight: 28,
    imageHeight: 28,
    titleSize: 'text-lg',
    labsSize: 'text-[9px] tracking-[0.28em]',
    taglineSize: 'text-[7.5px] tracking-[0.2em]',
    dotSize: 'w-1.5 h-1.5',
    gap: 'gap-2.5',
  },
  md: {
    markWidth: 44,
    markHeight: 36,
    imageHeight: 38,
    titleSize: 'text-2xl',
    labsSize: 'text-[11px] tracking-[0.3em]',
    taglineSize: 'text-[8.5px] tracking-[0.22em]',
    dotSize: 'w-1.5 h-1.5',
    gap: 'gap-3',
  },
  lg: {
    markWidth: 58,
    markHeight: 48,
    imageHeight: 52,
    titleSize: 'text-3xl lg:text-4xl',
    labsSize: 'text-xs tracking-[0.32em]',
    taglineSize: 'text-[10px] tracking-[0.25em]',
    dotSize: 'w-2 h-2',
    gap: 'gap-4',
  },
  xl: {
    markWidth: 84,
    markHeight: 70,
    imageHeight: 72,
    titleSize: 'text-5xl lg:text-6xl',
    labsSize: 'text-sm tracking-[0.35em]',
    taglineSize: 'text-xs tracking-[0.3em]',
    dotSize: 'w-2.5 h-2.5',
    gap: 'gap-5',
  },
};

/**
 * 3D Sculptural Ribbon "M" Lettermark & Site Identity:
 * Cropped directly from the authentic corporate brand identity:
 * - Electric Azure / Cyan Blue outer curl
 * - Neon Emerald / Lime central crest
 * - Sunset Amber / Orange right wing
 */
export function MathruLogoMark({
  width = 44,
  height = 36,
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
      {/* Ambient Backlight Glow matching the brand's vibrant spectrum */}
      {withGlow && (
        <div
          className="absolute inset-0 pointer-events-none -z-10 rounded-full blur-md opacity-85 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(circle, rgba(0, 163, 255, 0.45) 0%, rgba(0, 210, 106, 0.3) 45%, rgba(255, 107, 0, 0.35) 85%, transparent 100%)',
            transform: 'scale(1.35)',
          }}
        />
      )}

      {/* Official 3D Ribbon Lettermark - site identity */}
      <img
        src="/brand/site-identity.png"
        alt="Mathru Labs Site Identity"
        width={width}
        height={height}
        className="h-full w-full object-contain drop-shadow-[0_4px_16px_rgba(0,112,243,0.45)] select-none transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

/**
 * Complete Mathru Labs Official Brand Lockup:
 * - Authentic 3D Sculptural Ribbon "M" site identity mark
 * - "Mathru" in metallic cyan-sheen bold typography
 * - "LABS" in wide-tracked futuristic uppercase
 * - "AI • SOFTWARE • AUTOMATION" with authentic 3D sphere dots
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

  if (variant === 'image') {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <img
          src="/brand/mathru-logo-full.png"
          alt="Mathru Labs Logo"
          style={{ height: config.imageHeight }}
          className="w-auto object-contain select-none"
        />
      </div>
    );
  }

  return (
    <div className={`group inline-flex items-center ${config.gap} ${className}`}>
      {/* 3D Ribbon Lettermark (Site Identity) */}
      <MathruLogoMark
        width={config.markWidth}
        height={config.markHeight}
        withGlow={true}
      />

      {/* Typography Lockup */}
      <div className="flex flex-col justify-center leading-none select-none">
        {/* Mathru + LABS Row */}
        <div className="flex items-baseline gap-2">
          <span
            className={`font-extrabold tracking-tight font-[var(--font-heading)] ${config.titleSize} bg-gradient-to-r from-white via-cyan-100 to-[#38BDF8] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(56,189,248,0.35)]`}
          >
            Mathru
          </span>
          <span
            className={`font-bold uppercase text-white/90 font-[var(--font-heading)] ${config.labsSize} border-l border-white/20 pl-2`}
          >
            LABS
          </span>
        </div>

        {/* Sub-tagline: AI 🔵 SOFTWARE 🟢 AUTOMATION */}
        {showTagline && (
          <div
            className={`mt-1.5 flex items-center gap-1.5 font-bold uppercase tracking-wider text-text-muted ${config.taglineSize}`}
          >
            <span className="text-[#38BDF8] transition-colors group-hover:text-white">AI</span>
            <span
              className={`inline-block ${config.dotSize} rounded-full bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] shadow-[0_0_6px_rgba(56,189,248,0.9)]`}
            />
            <span className="text-white/85 transition-colors group-hover:text-white">SOFTWARE</span>
            <span
              className={`inline-block ${config.dotSize} rounded-full bg-gradient-to-tr from-[#00A854] to-[#00D26A] shadow-[0_0_6px_rgba(0,210,106,0.9)]`}
            />
            <span className="text-[#00D26A] transition-colors group-hover:text-white">AUTOMATION</span>
          </div>
        )}
      </div>
    </div>
  );
}
