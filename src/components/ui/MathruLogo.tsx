'use client';

import React from 'react';
import { useLanguage } from '@/providers/LanguageProvider';

interface MathruLogoProps {
  variant?: 'full' | 'mark-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  animateGlow?: boolean;
}

const sizeConfig = {
  sm: {
    markHeight: 36,
    titleSize: 'text-xl',
    labsSize: 'text-[9.5px] tracking-[0.28em]',
    taglineSize: 'text-[7.5px] tracking-[0.2em]',
    gap: 'gap-2.5',
    textPaddingBottom: 'pb-0.5',
  },
  md: {
    markHeight: 46,
    titleSize: 'text-2xl',
    labsSize: 'text-[11px] tracking-[0.3em]',
    taglineSize: 'text-[8.5px] tracking-[0.22em]',
    gap: 'gap-3',
    textPaddingBottom: 'pb-1',
  },
  lg: {
    markHeight: 58,
    titleSize: 'text-3xl lg:text-4xl',
    labsSize: 'text-xs tracking-[0.32em]',
    taglineSize: 'text-[10px] tracking-[0.25em]',
    gap: 'gap-4',
    textPaddingBottom: 'pb-1.5',
  },
  xl: {
    markHeight: 76,
    titleSize: 'text-5xl lg:text-6xl',
    labsSize: 'text-sm tracking-[0.35em]',
    taglineSize: 'text-xs tracking-[0.3em]',
    gap: 'gap-5',
    textPaddingBottom: 'pb-2',
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
  height = 46,
  className = '',
  withGlow = true,
}: {
  height?: number;
  className?: string;
  withGlow?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{ height, width: height * 1.22 }}
    >
      {/* Ambient Backlight Glow matching brand palette */}
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

      {/* Official 3D Ribbon Lettermark */}
      <img
        src="/brand/site-identity.png"
        alt="Mathru Labs Site Identity"
        style={{ height, width: 'auto' }}
        className="h-full w-auto object-contain drop-shadow-[0_4px_16px_rgba(0,112,243,0.45)] select-none transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

/**
 * Complete Mathru Labs Official Brand Lockup:
 * - Authentic 3D Ribbon Mark anchored at the bottom baseline
 * - "Mathru" in metallic cyan-sheen bold typography
 * - "LABS" in wide-tracked uppercase
 * - "AI | SOFTWARE | AUTOMATION" with clean "|" vertical dividers
 */
export function MathruLogo({
  variant = 'full',
  size = 'md',
  showTagline = true,
  className = '',
  animateGlow = false,
}: MathruLogoProps) {
  const config = sizeConfig[size];
  let isTelugu = false;
  try {
    const langContext = useLanguage();
    isTelugu = langContext?.language === 'te';
  } catch {
    // Graceful fallback if used outside LanguageProvider
  }

  if (variant === 'mark-only') {
    return (
      <MathruLogoMark
        height={config.markHeight}
        className={className}
        withGlow={animateGlow}
      />
    );
  }

  return (
    <div className={`group inline-flex items-end ${config.gap} ${className}`}>
      {/* 3D Ribbon Lettermark (Site Identity) anchored to baseline */}
      <MathruLogoMark
        height={config.markHeight}
        withGlow={true}
      />

      {/* Typography Lockup aligned to bottom baseline */}
      <div className={`flex flex-col justify-end leading-none select-none ${config.textPaddingBottom}`}>
        {/* Mathru + LABS Row */}
        <div className="flex items-baseline gap-2">
          <span
            className={`font-extrabold tracking-tight font-[var(--font-heading)] ${config.titleSize} bg-gradient-to-b from-white via-[#E0F2FE] to-[#7DD3FC] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(56,189,248,0.35)]`}
          >
            Mathru
          </span>
          <span
            className={`font-bold uppercase text-white/90 font-[var(--font-heading)] ${config.labsSize} border-l border-white/20 pl-2`}
          >
            LABS
          </span>
        </div>

        {/* Sub-tagline: AI | SOFTWARE | AUTOMATION */}
        {showTagline && (
          <div
            className={`mt-1.5 flex items-center gap-1.5 font-bold uppercase tracking-wider text-text-muted ${config.taglineSize}`}
          >
            <span className="text-[#38BDF8] transition-colors group-hover:text-white">AI</span>
            <span className="text-[#0070F3] font-bold mx-0.5 select-none drop-shadow-[0_0_8px_rgba(0,112,243,0.8)]">|</span>
            <span className="text-white/90 transition-colors group-hover:text-white">
              {isTelugu ? 'సాఫ్ట్‌వేర్' : 'SOFTWARE'}
            </span>
            <span className="text-[#00D26A] font-bold mx-0.5 select-none drop-shadow-[0_0_8px_rgba(0,210,106,0.8)]">|</span>
            <span className="text-[#00D26A] transition-colors group-hover:text-white">
              {isTelugu ? 'ఆటోమేషన్' : 'AUTOMATION'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
