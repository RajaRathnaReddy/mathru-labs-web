'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { SECTION_IDS } from '@/lib/constants';
import { motion } from 'framer-motion';

const STEP_ICONS = [
  // Understand
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>,
  // Design
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
  </svg>,
  // Build
  <svg key="3" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>,
  // Connect
  <svg key="4" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>,
  // Improve
  <svg key="5" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
  </svg>,
];

export function HowWeWork() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id={SECTION_IDS.howWeWork}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.howWeWork.badge}
          title={t.howWeWork.title}
        />

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {/* Vertical connecting line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-amber via-teal to-amber/30 md:left-8" />

          <div className="space-y-8 sm:space-y-10">
            {t.howWeWork.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative flex items-start gap-5 sm:gap-8"
              >
                {/* Step Node */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-amber/80 bg-ink text-amber shadow-lg shadow-amber/10 sm:h-16 sm:w-16">
                  {STEP_ICONS[i] || <span className="font-bold text-sm">{i + 1}</span>}
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-ink">
                    {i + 1}
                  </span>
                </div>

                {/* Content Card */}
                <div className="flex-1 rounded-2xl border border-border-subtle bg-indigo/25 p-5 sm:p-7 backdrop-blur-sm transition-all duration-300 hover:border-amber/30 hover:bg-indigo/40">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-text-heading">
                      {step.title}
                    </h3>
                    <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                      {t.howWeWork.phasePrefix} 0{i + 1}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
