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
  Send,
  Sparkles,
  Calendar,
  HeartHandshake,
  Users,
} from 'lucide-react';

export function ProblemToSystem() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'both' | 'chaos' | 'system'>('both');

  const guaranteeIcons = [Zap, ShieldCheck, Database];
  const guaranteeColors = [
    { badge: 'text-sky-400 bg-sky-500/10 border-sky-500/20', icon: 'text-sky-400 bg-sky-500/10' },
    { badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', icon: 'text-emerald-400 bg-emerald-500/10' },
    { badge: 'text-amber bg-amber/10 border-amber/20', icon: 'text-amber bg-amber/10' },
  ];

  const benchmarkIcons = [Send, Sparkles, Calendar, HeartHandshake];
  const benchmarkColors = [
    { border: 'hover:border-emerald-500/30', icon: 'bg-emerald-500/10 text-emerald-400' },
    { border: 'hover:border-sky-500/30', icon: 'bg-sky-500/10 text-sky-400' },
    { border: 'hover:border-amber/30', icon: 'bg-amber/10 text-amber' },
    { border: 'hover:border-purple-500/30', icon: 'bg-purple-500/10 text-purple-400' },
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
              {t.problem.sideBySide}
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
                      {t.problem.chaosBadge}
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
                  <span className="font-semibold text-red-400">{t.problem.consequenceLabel}</span> {t.problem.consequenceText}
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
                      {t.problem.systemBadge}
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
                  <span className="font-semibold text-teal">{t.problem.outcomeLabel}</span> {t.problem.outcomeText}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Battle-Tested Scale & Core Guarantees */}
        <div className="mt-14 rounded-3xl border border-border-subtle bg-gradient-to-b from-indigo/50 via-indigo/20 to-ink p-6 sm:p-10 backdrop-blur-md shadow-2xl">
          <div className="mb-8 text-center">
            <span className="inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-400">
              {t.problem.scaleBadge}
            </span>
            <h4 className="mt-3 text-2xl font-bold text-text-heading sm:text-3xl font-[var(--font-heading)]">
              {t.problem.scaleTitle}
            </h4>
            <p className="mt-2 text-sm text-text-muted max-w-2xl mx-auto">
              {t.problem.scaleDesc}
            </p>
          </div>

          {/* 3 Core Guarantees */}
          <div className="grid gap-6 sm:grid-cols-3">
            {t.problem.guarantees.map((item, idx) => {
              const Icon = guaranteeIcons[idx] || Zap;
              const color = guaranteeColors[idx] || guaranteeColors[0];
              return (
                <div
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border-subtle/70 bg-ink-light/50 p-6 text-left transition-all duration-300 hover:border-[#0070F3]/40 hover:bg-ink-light/80 hover:shadow-lg hover:shadow-[#0070F3]/5"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color.icon}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${color.badge}`}>
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

          {/* Featured Live Production Benchmark: Multi-Branch Scale */}
          <div className="mt-8 rounded-2xl border border-amber/25 bg-gradient-to-br from-amber/5 via-indigo/30 to-ink p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-amber font-semibold">
                    {t.problem.benchmarkBadge}
                  </span>
                </div>
                <h5 className="mt-1.5 text-lg sm:text-xl font-bold text-white font-[var(--font-heading)]">
                  {t.problem.benchmarkTitle}
                </h5>
                <p className="mt-1 text-xs text-text-muted max-w-2xl">
                  {t.problem.benchmarkDesc}
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-2 rounded-xl bg-amber/10 border border-amber/20 px-3.5 py-2 text-right">
                <Users className="h-4 w-4 text-amber" />
                <span className="text-xs font-bold text-amber font-mono">{t.problem.activeProfiles}</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {t.problem.benchmarkFeatures.map((feat, idx) => {
                const Icon = benchmarkIcons[idx] || Send;
                const style = benchmarkColors[idx] || benchmarkColors[0];
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border border-white/[0.06] bg-ink-light/40 p-4 transition-all duration-200 ${style.border} hover:bg-ink-light/70`}
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.icon} mb-3`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <h6 className="text-xs font-bold text-white mb-1.5">
                      {feat.title}
                    </h6>
                    <p className="text-[11px] text-text-muted leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
