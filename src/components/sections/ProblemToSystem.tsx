'use client';

import { useState } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SECTION_IDS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  ShieldCheck,
  Database,
  MessageSquare,
  Sparkles,
  CalendarCheck,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export function ProblemToSystem() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'both' | 'chaos' | 'system'>('both');

  // Clear, human-understandable guarantees backed by real engineering and high-volume scale
  const operationalGuarantees = [
    {
      title: 'Instant 24/7 Response',
      highlight: '< 30 Seconds',
      badge: 'Speed Guarantee',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      icon: Zap,
      iconColor: 'text-sky-400 bg-sky-500/10',
      description:
        'Your customers never wait. Inquiries on WhatsApp and web are answered, triaged, and booked automatically — day or night.',
    },
    {
      title: 'Zero Lost Records & Leaks',
      highlight: '100% Accurate Data',
      badge: 'Reliability',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: ShieldCheck,
      iconColor: 'text-emerald-400 bg-emerald-500/10',
      description:
        'Stops human typing mistakes and scattered paper registers. Orders, patient records, and bills sync directly into one unified database.',
    },
    {
      title: 'Battle-Tested at Scale',
      highlight: '700,000+ Records Handled',
      badge: 'High-Volume Scale',
      badgeColor: 'text-amber bg-amber/10 border-amber/20',
      icon: Database,
      iconColor: 'text-amber bg-amber/10',
      description:
        'Not a prototype. Our automation engines power multi-branch networks managing 7 Lakh+ active members, daily WhatsApp broadcasts, AI milestone voice greetings, and months of follow-up history.',
    },
  ];

  return (
    <SectionWrapper id={SECTION_IDS.problem}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.problem.badge}
          title={t.problem.title}
          description={t.problem.description}
        />

        {/* View Toggle on Mobile */}
        <div className="mb-8 flex justify-center md:hidden">
          <div className="inline-flex rounded-full border border-border-subtle bg-indigo/40 p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveView('both')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeView === 'both'
                  ? 'bg-amber text-ink shadow-sm'
                  : 'text-text-muted hover:text-text-soft'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveView('chaos')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeView === 'chaos'
                  ? 'bg-red-500/80 text-white shadow-sm'
                  : 'text-text-muted hover:text-text-soft'
              }`}
            >
              {t.problem.chaos.title}
            </button>
            <button
              onClick={() => setActiveView('system')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                activeView === 'system'
                  ? 'bg-teal text-ink shadow-sm'
                  : 'text-text-muted hover:text-text-soft'
              }`}
            >
              {t.problem.system.title}
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Chaos Side */}
          <AnimatePresence mode="popLayout">
            {(activeView === 'both' || activeView === 'chaos') && (
              <motion.div
                key="chaos"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-950/20 via-indigo/20 to-ink p-6 sm:p-8 backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-red-500/10 blur-2xl" />
                
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-red-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400">
                      Fragmented & Manual
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-text-heading">
                      {t.problem.chaos.title}
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                </div>

                <ul className="space-y-4">
                  {t.problem.chaos.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 rounded-xl border border-red-500/10 bg-red-500/5 p-3.5 transition-all duration-300 hover:border-red-500/25 hover:bg-red-500/10"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-soft">{item}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-950/30 p-4 text-xs text-red-300/80">
                  <span className="font-semibold text-red-400">Consequence:</span> Leads drop off, staff is overwhelmed with repetitive calls, and customer trust erodes.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Connected System Side */}
          <AnimatePresence mode="popLayout">
            {(activeView === 'both' || activeView === 'system') && (
              <motion.div
                key="system"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl border border-teal/30 bg-gradient-to-br from-teal-950/20 via-indigo/30 to-ink p-6 sm:p-8 backdrop-blur-sm shadow-xl shadow-teal/5"
              >
                <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-teal/15 blur-2xl" />
                
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <span className="inline-block rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
                      Automated & Integrated
                    </span>
                    <h3 className="mt-2 text-2xl font-bold text-text-heading">
                      {t.problem.system.title}
                    </h3>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                  </div>
                </div>

                <ul className="space-y-4">
                  {t.problem.system.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 rounded-xl border border-teal/20 bg-teal/5 p-3.5 transition-all duration-300 hover:border-teal/40 hover:bg-teal/10"
                    >
                      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-soft">{item}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-teal/30 bg-teal-950/30 p-4 text-xs text-teal-200/90">
                  <span className="font-semibold text-teal">Outcome:</span> Zero lost customer leads, 24/7 autonomous WhatsApp responses, custom CRM tracking, and total executive visibility into daily operations.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Battle-Tested Scale & Core Guarantees */}
        <div className="mt-12 rounded-2xl border border-border-subtle bg-gradient-to-b from-indigo/40 via-indigo/20 to-ink p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              Real-World Scale & Reliability
            </span>
            <h4 className="mt-3 text-xl font-bold text-text-heading sm:text-2xl">
              Built for real business scale — from local clinics to 700,000+ records
            </h4>
            <p className="mt-2 text-sm text-text-muted max-w-2xl mx-auto">
              Whether you are a diagnostic lab handling 100 daily tests or an organization with hundreds of thousands of members, our custom software keeps operations instant, accurate, and completely automated.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {operationalGuarantees.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-xl border border-border-subtle/70 bg-ink-light/50 p-6 text-left transition-all duration-300 hover:border-border-subtle hover:bg-ink-light/80 hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.iconColor}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="text-2xl font-bold tracking-tight text-white mb-1 font-[var(--font-heading)]">
                      {item.highlight}
                    </div>

                    <h5 className="text-sm font-semibold text-text-soft mb-2">
                      {item.title}
                    </h5>

                    <p className="text-xs text-text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flagship Production Architecture Spotlight */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-[#0B1528] via-[#070D1A] to-ink p-6 sm:p-8 relative">
            {/* Ambient subtle glow */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-48 w-48 rounded-full bg-[#0070F3]/10 blur-3xl pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00D26A]/15 border border-[#00D26A]/30 px-3 py-0.5 text-[11px] font-bold tracking-wide text-[#00D26A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00D26A] animate-pulse" />
                    Live Production Architecture
                  </span>
                  <span className="text-xs text-text-muted font-mono">Mega-Scale Proof</span>
                </div>
                <h4 className="mt-2 text-xl sm:text-2xl font-bold text-white tracking-tight">
                  700,000+ Member Multi-Branch Community System
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-text-muted max-w-2xl leading-relaxed">
                  Automating the entire operational pipeline for a multi-branch faith & community network — from high-concurrency daily WhatsApp verses to AI voice-cloned milestone dispatches.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 backdrop-blur-sm">
                <Building2 className="h-6 w-6 text-[#38BDF8]" />
                <div className="text-left">
                  <div className="text-xs font-bold text-white">All Branches Unified</div>
                  <div className="text-[10px] text-text-muted font-mono">Zero Database Lag</div>
                </div>
              </div>
            </div>

            {/* 4 Pillars of the Live System */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 relative z-10">
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4.5 transition-all duration-200 hover:border-[#38BDF8]/40 hover:bg-[#38BDF8]/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] mb-3">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <h5 className="text-xs font-bold text-white mb-1.5">
                  Automated Daily Verses & Broadcasts
                </h5>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  High-capacity WhatsApp engine automatically dispatches daily morning verses, inspirational reflections, and event notices to massive member lists without manual delays.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4.5 transition-all duration-200 hover:border-[#FFB020]/40 hover:bg-[#FFB020]/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFB020]/10 text-[#FFB020] mb-3">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h5 className="text-xs font-bold text-white mb-1.5">
                  AI Avatar & Voice-Cloned Birthday Wishes
                </h5>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Generative AI pipeline automatically generates personalized video/audio birthday greetings using the leadership’s cloned voice and digital AI avatar, delivered each morning.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4.5 transition-all duration-200 hover:border-[#00D26A]/40 hover:bg-[#00D26A]/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00D26A]/10 text-[#00D26A] mb-3">
                  <Database className="h-4 w-4" />
                </div>
                <h5 className="text-xs font-bold text-white mb-1.5">
                  7 Lakh+ Multi-Branch Member CRM
                </h5>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Unified cloud database linking all branch campuses, preserving months of continuous follow-up records, family trees, and pastoral care history with sub-second lookups.
                </p>
              </div>

              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4.5 transition-all duration-200 hover:border-[#A855F7]/40 hover:bg-[#A855F7]/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A855F7]/10 text-[#A855F7] mb-3">
                  <CalendarCheck className="h-4 w-4" />
                </div>
                <h5 className="text-xs font-bold text-white mb-1.5">
                  Weekly Services & Care Workflow
                </h5>
                <p className="text-[11px] text-text-muted leading-relaxed">
                  Automates Sunday service check-ins, prayer request triage & ticketing, volunteer task dispatch, and multi-branch attendance analytics in real-time.
                </p>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.06] text-[11px] text-text-muted font-mono relative z-10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#00D26A]" /> 100% Automated Background Queues
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#38BDF8]" /> AI Voice Cloning & Generative Avatars
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#FFB020]" /> Multi-Branch Enterprise Concurrency
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
