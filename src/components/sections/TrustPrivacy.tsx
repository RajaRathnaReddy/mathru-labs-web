'use client';

import Link from 'next/link';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { SECTION_IDS } from '@/lib/constants';
import { motion } from 'framer-motion';

export function TrustPrivacy() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id={SECTION_IDS.trust}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.trust.badge}
          title={t.trust.title}
        />

        <div className="mx-auto max-w-3xl">
          {/* Security Pillars Cards */}
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-text-heading">Encrypted End-to-End</p>
              <p className="text-[11px] text-text-muted mt-0.5">TLS 1.3 & AES-256 at rest</p>
            </div>

            <div className="rounded-2xl border border-amber/20 bg-amber/5 p-4 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-amber/10 text-amber">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-text-heading">Zero Data Resale</p>
              <p className="text-[11px] text-text-muted mt-0.5">Never shared or monetized</p>
            </div>

            <div className="rounded-2xl border border-teal/20 bg-teal/5 p-4 text-center">
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-text-heading">DPDP Act Ready</p>
              <p className="text-[11px] text-text-muted mt-0.5">Indian privacy compliance</p>
            </div>
          </div>

          {/* Promises list */}
          <div className="rounded-3xl border border-border-subtle bg-indigo/25 p-6 sm:p-8 backdrop-blur-sm">
            <ul className="space-y-4">
              {t.trust.promises.map((promise, i) => (
                <li key={i} className="flex items-start gap-3.5 text-text-soft">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-sm leading-relaxed">{promise}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 border-t border-border-subtle/50 pt-6">
              <Link
                href="/privacy"
                className="text-sm font-medium text-amber underline underline-offset-4 transition-colors hover:text-amber-dim"
              >
                {t.trust.privacyLink}
              </Link>
              <span className="text-text-muted/40">|</span>
              <Link
                href="/terms"
                className="text-sm font-medium text-amber underline underline-offset-4 transition-colors hover:text-amber-dim"
              >
                {t.trust.termsLink}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
