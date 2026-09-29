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

  // Comparison metrics for impact
  const metrics = [
    { label: 'Customer Response Time', before: '3–6 hours', after: '< 15 seconds' },
    { label: 'Operational & Order Errors', before: '12–18% manual leaks', after: '0% (Rules & AI validated)' },
    { label: 'Lead & Client Follow-ups', before: '35% dropped', after: '100% automated on time' },
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

        {/* Business Impact Metrics */}
        <div className="mt-12 rounded-2xl border border-border-subtle bg-indigo/30 p-6 sm:p-8 backdrop-blur-sm">
          <div className="mb-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber">
              Measurable Transformation
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {metrics.map((m, idx) => (
              <div key={idx} className="rounded-xl border border-border-subtle/60 bg-ink-light/50 p-4 text-center">
                <p className="text-xs font-medium text-text-muted">{m.label}</p>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <span className="text-xs text-red-400 line-through">{m.before}</span>
                  <span className="text-text-muted">→</span>
                  <span className="text-sm font-bold text-teal">{m.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
