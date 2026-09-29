'use client';

import dynamic from 'next/dynamic';
import { useLanguage } from '@/providers/LanguageProvider';
import { useDeviceCapability } from '@/hooks/useDeviceCapability';
import { LivingWorkflowFallback } from '@/components/three/LivingWorkflowFallback';
import { motion } from 'framer-motion';

// Lazy-load the 3D scene — only on capable devices
const LivingWorkflow = dynamic(
  () => import('@/components/three/LivingWorkflow').then(mod => ({ default: mod.LivingWorkflow })),
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
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background base gradient — deep architectural slate canvas */}
      <div className="absolute inset-0 bg-[#080C14]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080C14] via-[#0D1322] to-[#080C14]" />

      {/* Living Workflow — 3D or SVG based on device capability */}
      {canHandle3D ? <LivingWorkflow /> : <LivingWorkflowFallback />}

      {/* Clean vertical atmospheric gradient for flawless text readability */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#080C14]/60 via-transparent to-[#080C14]/90" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-4 pt-20 text-center sm:px-6 lg:px-8"
        variants={prefersReducedMotion ? undefined : container}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'show'}
      >
        <motion.div variants={prefersReducedMotion ? undefined : item} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-soft bg-white/[0.04] border border-white/10 rounded-full backdrop-blur-md shadow-sm">
            <span className="text-[#38BDF8]">AI</span>
            <span className="text-white/30">•</span>
            <span className="text-white/90">SOFTWARE</span>
            <span className="text-white/30">•</span>
            <span className="text-[#00D26A]">AUTOMATION</span>
          </span>
        </motion.div>

        <motion.h1
          variants={prefersReducedMotion ? undefined : item}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl mx-auto drop-shadow-sm"
        >
          {t.hero.headline.includes('intelligent systems') ? (
            <>
              {t.hero.headline.split('intelligent systems')[0]}
              <span className="text-gradient-brand">intelligent systems.</span>
            </>
          ) : (
            t.hero.headline
          )}
        </motion.h1>

        <motion.p
          variants={prefersReducedMotion ? undefined : item}
          className="mt-6 mx-auto max-w-2xl text-base text-text-muted sm:text-lg lg:text-xl leading-relaxed font-normal"
        >
          {t.hero.subline}
        </motion.p>

        <motion.div
          variants={prefersReducedMotion ? undefined : item}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#problem-system"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('problem-system')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF6600] to-[#FA6400] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#FF6600]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6600]/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            {t.hero.cta1}
            <svg
              className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-8 py-3.5 text-sm font-semibold text-text-soft backdrop-blur-md transition-all duration-300 hover:border-[#00D26A]/40 hover:bg-[#00D26A]/10 hover:text-[#00D26A] active:scale-[0.98]"
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.hero.cta2}
          </a>
        </motion.div>

        {/* All-Industry Quick Navigator */}
        <motion.div
          variants={prefersReducedMotion ? undefined : item}
          className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs"
        >
          <span className="text-text-muted font-medium mr-1">Tools &amp; CRMs for:</span>
          {[
            'Healthcare & Labs',
            'Retail & Supermarkets',
            'Banks & CA Firms',
            'Real Estate & Builders',
            'Automobile & EV',
            'Schools & Coaching',
            'Logistics & MSME',
          ].map((ind, i) => (
            <a
              key={i}
              href="#industries"
              className="rounded-full bg-white/[0.04] border border-white/[0.08] px-3 py-1 text-text-soft transition-all duration-200 hover:border-[#0070F3]/40 hover:text-white hover:bg-[#0070F3]/10 active:scale-95"
            >
              {ind}
            </a>
          ))}
          <a
            href="#industries"
            className="rounded-full bg-[#FF6600]/15 border border-[#FF6600]/35 px-3 py-1 font-semibold text-[#FF6600] transition-all duration-200 hover:bg-[#FF6600] hover:text-white active:scale-95"
          >
            +18 more sectors →
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={prefersReducedMotion ? undefined : item}
          className="mt-16"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="mx-auto h-6 w-6 text-text-muted/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
