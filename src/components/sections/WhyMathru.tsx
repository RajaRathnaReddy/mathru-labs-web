'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useLanguage } from '@/providers/LanguageProvider';
import { SECTION_IDS } from '@/lib/constants';
import { motion } from 'framer-motion';

export function WhyMathru() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id={SECTION_IDS.whyMathru} className="relative overflow-hidden">
      {/* Warm ambient glow behind card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-amber/[0.04] blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber bg-amber/10 border border-amber/20 rounded-full">
            {t.whyMathru.badge}
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-text-heading sm:text-4xl lg:text-5xl leading-tight mb-8">
            {t.whyMathru.title}
          </h2>
        </motion.div>

        {/* Refined storytelling card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative mx-auto max-w-3xl rounded-3xl border border-amber/20 bg-gradient-to-b from-indigo/40 via-indigo/20 to-ink p-8 sm:p-12 text-left backdrop-blur-md shadow-2xl shadow-amber/5"
        >
          {/* Subtle amber quotation icon */}
          <div className="mb-6 text-amber/40">
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>

          <p className="text-lg sm:text-xl text-text-soft leading-relaxed font-normal">
            {t.whyMathru.story}
          </p>

          <div className="mt-8 flex items-center gap-4 border-t border-border-subtle/50 pt-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber/10 border border-amber/30 text-amber font-bold text-sm">
              M
            </div>
            <div>
              <p className="text-sm font-semibold text-text-heading">{t.whyMathru.philosophyTitle}</p>
              <p className="text-xs text-text-muted">{t.whyMathru.philosophySub}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
