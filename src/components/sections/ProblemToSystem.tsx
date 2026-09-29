'use client';

import { useState } from 'react';
import { useLanguage } from '@/providers/LanguageProvider';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SECTION_IDS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';

export function ProblemToSystem() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState<'both' | 'chaos' | 'system'>('both');

  // Target architectural outcomes (engineering benchmarks we design systems to hit, not fake retrospective client results)
  const targetOutcomes = [
    {
      category: 'Customer Response SLA',
      target: '< 30 Seconds',
      description: 'Immediate 24/7 automated acknowledgment, triage & FAQ handling on WhatsApp & Web.',
      status: 'Target SLA',
    },
    {
      category: 'Data Integrity & Accuracy',
      target: 'Zero Manual Re-Entry',
      description: 'Strict schema validation rules and direct system sync eliminate copy-paste human error.',
      status: 'Design Standard',
    },
    {
      category: 'Operational Follow-ups',
      target: '100% Scheduled Delivery',
      description: 'Automated background queues handle client reminders, report alerts & billing dispatches on time.',
      status: 'System Target',
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

        {/* Target Outcomes / What We Engineer For */}
        <div className="mt-12 rounded-2xl border border-border-subtle bg-indigo/30 p-6 sm:p-8 backdrop-blur-sm">
          <div className="mb-6 text-center">
            <span className="inline-block rounded-full bg-teal/10 border border-teal/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-teal">
              Target Outcomes · What We Aim For
            </span>
            <p className="mt-2 text-xs text-text-muted max-w-xl mx-auto">
              Measurable architectural benchmarks we design every custom system to achieve — clear engineering targets, not retrospective marketing claims.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {targetOutcomes.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl border border-border-subtle/60 bg-ink-light/50 p-5 text-left transition-all duration-200 hover:border-teal/30 hover:bg-ink-light/70"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-mono font-medium text-text-muted">
                    {item.category}
                  </span>
                  <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
                    {item.status}
                  </span>
                </div>
                <div className="text-lg font-bold tracking-tight text-white mb-1.5">
                  {item.target}
                </div>
                <p className="text-xs text-text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
