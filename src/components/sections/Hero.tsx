'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/providers/LanguageProvider';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LivingWorkflowFallback } from '@/components/three/LivingWorkflowFallback';
import { motion } from 'framer-motion';
import { ArrowDown, MessageCircle, Sparkles, Shield, Zap, Layers } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

// Lazy-load the 3D scene — only on capable devices
const LivingWorkflow = dynamic(
  () => import('@/components/three/LivingWorkflow').then((mod) => ({ default: mod.LivingWorkflow })),
  {
    ssr: false,
    loading: () => <LivingWorkflowFallback />,
  }
);

export function Hero() {
  const { t } = useLanguage();
  const { canHandle3D, prefersReducedMotion } = useDeviceCapability();

  // Staggered text animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 25 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28"
    >
      {/* 1. Deep Multi-Layered Atmospheric Lighting Aurora (Mathru Brand Palette) */}
      <div className="absolute inset-0 -z-30 bg-[#070B14]" />
      
      {/* Radiant Atmospheric Top Glow Wash (Electric Blue & Cyan) — smooth non-circular fade */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[450px] opacity-25"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% -10%, #0066FF 0%, #00D2FF 35%, transparent 70%)',
        }}
      />

      {/* Emerald & Sunset Orange Side Ambient Washes — edge-anchored ellipses, no center hotspot */}
      <div
        className="pointer-events-none absolute top-10 left-0 -z-20 h-[500px] w-[500px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at 0% 40%, #00D26A 0%, transparent 65%)',
        }}
      />
      <div
        className="pointer-events-none absolute top-10 right-0 -z-20 h-[500px] w-[500px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse at 100% 40%, #FF6B00 0%, transparent 65%)',
        }}
      />

      {/* Central Atmospheric Gradient Glow — the warm radiant backdrop behind hero text */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-30 sm:opacity-25"
        style={{
          background: 'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(0,102,255,0.35) 0%, rgba(0,210,255,0.15) 30%, rgba(0,210,106,0.08) 55%, transparent 80%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-20 sm:opacity-15"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,107,0,0.2) 0%, rgba(255,107,0,0.05) 40%, transparent 70%)',
        }}
      />

      {/* High-Tech Grid Mesh Floor */}
      <div
        className="pointer-events-none absolute inset-0 -z-20 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      {/* Living Workflow — 3D or SVG based on device capability */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        {canHandle3D ? <LivingWorkflow /> : <LivingWorkflowFallback />}
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-4 text-center sm:px-6 lg:px-8"
        variants={prefersReducedMotion ? undefined : container}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'show'}
      >
        {/* Top Badge with " | " dividers matching brand identity */}
        <motion.div variants={prefersReducedMotion ? undefined : item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-text-soft bg-white/[0.05] border border-white/15 rounded-full backdrop-blur-xl shadow-lg shadow-black/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00D26A] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00D26A]" />
            </span>
            <span className="text-[#38BDF8]">{t.hero.badgePillAi || 'AI'}</span>
            <span className="text-[#0070F3] font-bold mx-0.5 drop-shadow-[0_0_8px_rgba(0,112,243,0.8)]">|</span>
            <span className="text-white/95">{t.hero.badgePillSoftware || 'SOFTWARE'}</span>
            <span className="text-[#00D26A] font-bold mx-0.5 drop-shadow-[0_0_8px_rgba(0,210,106,0.8)]">|</span>
            <span className="text-[#00D26A]">{t.hero.badgePillAutomation || 'AUTOMATION'}</span>
            <span className="hidden sm:inline text-white/30 font-light">·</span>
            <span className="hidden sm:inline text-white/60 font-medium lowercase">
              {t.hero.badgeTop}
            </span>
          </span>
        </motion.div>

        {/* High-Impact Main Headline */}
        <motion.h1
          variants={prefersReducedMotion ? undefined : item}
          className="text-4xl font-black tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.08] max-w-5xl mx-auto drop-shadow-md font-[var(--font-heading)]"
        >
          {t.hero.headlineMain}{' '}
          <span className="bg-gradient-to-r from-[#00D2FF] via-[#00D26A] to-[#FF6B00] bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,210,255,0.35)]">
            {t.hero.headlineGradient}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={prefersReducedMotion ? undefined : item}
          className="mt-6 mx-auto max-w-3xl text-base text-white/75 sm:text-xl leading-relaxed font-normal"
        >
          {t.hero.subline}
        </motion.p>

        {/* Primary CTA Buttons */}
        <motion.div
          variants={prefersReducedMotion ? undefined : item}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#industries"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('industries')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6600] to-[#FA6400] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#FF6600]/30 transition-all duration-300 hover:shadow-2xl hover:shadow-[#FF6600]/50 hover:scale-[1.03] active:scale-[0.98]"
          >
            <span>{t.hero.exploreIndustries}</span>
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Mathru Labs! I want to explore an AI OS and custom system for my business.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:border-[#00D26A]/50 hover:bg-[#00D26A]/15 hover:text-[#00D26A] active:scale-[0.98]"
          >
            <MessageCircle className="h-4 w-4 text-[#00D26A]" />
            <span>{t.hero.consultWhatsApp}</span>
          </a>
        </motion.div>

        {/* Trust Badges Strip */}
        <motion.div
          variants={prefersReducedMotion ? undefined : item}
          className="mt-8 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-white/60 font-mono"
        >
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-[#00D26A]" /> {t.hero.trustDataSovereignty}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-[#38BDF8]" /> {t.hero.trustPilot}
          </span>
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-[#FF6B00]" /> {t.hero.trustMultiBranch}
          </span>
        </motion.div>

        {/* Quick Industry Pills Bar */}
        <motion.div
          variants={prefersReducedMotion ? undefined : item}
          className="mt-12 flex flex-wrap items-center justify-center gap-2 text-xs"
        >
          <span className="text-white/40 font-mono font-medium mr-1">{t.hero.directSystemsFor}</span>
          {t.hero.pills.map((ind, i) => (
            <a
              key={i}
              href="#industries"
              className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-white/80 transition-all duration-200 hover:border-[#0070F3]/50 hover:text-white hover:bg-[#0070F3]/15 active:scale-95"
            >
              {ind}
            </a>
          ))}
          <a
            href="#industries"
            className="rounded-full bg-[#FF6600]/20 border border-[#FF6600]/40 px-3.5 py-1 font-bold text-[#FF6600] transition-all duration-200 hover:bg-[#FF6600] hover:text-white active:scale-95"
          >
            {t.hero.moreSectors}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
