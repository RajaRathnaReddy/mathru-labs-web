'use client';

import { useLanguage } from '@/providers/LanguageProvider';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SECTION_IDS } from '@/lib/constants';
import { motion } from 'framer-motion';

const ICONS: Record<string, React.ReactNode> = {
  workflow: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" />
    </svg>
  ),
  ai: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  crm: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  dashboard: (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
};

const CARD_TAGS = [
  ['Custom Internal Tools', 'n8n / Webhooks', 'Instant Sync'],
  ['WhatsApp AI Agents', 'Voice & Text', '24/7 Client Triage'],
  ['Custom CRMs & Portals', 'Any Business Entity', 'Multi-Tenant OS'],
  ['Live KPI Dashboards', 'ERP & Tally Sync', 'Real-Time Alerts'],
];

const CARD_THEMES = [
  {
    borderHover: 'hover:border-[#0066FF]/50',
    shadowHover: 'hover:shadow-[#0066FF]/10',
    cornerGradient: 'from-[#0066FF]/20',
    iconBg: 'bg-[#0066FF]/10',
    iconColor: 'text-[#38BDF8]',
    iconHoverBg: 'group-hover:bg-[#0066FF] group-hover:text-white',
    tagHoverColor: 'group-hover:text-[#38BDF8]',
  },
  {
    borderHover: 'hover:border-[#00D26A]/50',
    shadowHover: 'hover:shadow-[#00D26A]/10',
    cornerGradient: 'from-[#00D26A]/20',
    iconBg: 'bg-[#00D26A]/10',
    iconColor: 'text-[#00D26A]',
    iconHoverBg: 'group-hover:bg-[#00D26A] group-hover:text-ink',
    tagHoverColor: 'group-hover:text-[#00D26A]',
  },
  {
    borderHover: 'hover:border-[#FF6600]/50',
    shadowHover: 'hover:shadow-[#FF6600]/10',
    cornerGradient: 'from-[#FF6600]/20',
    iconBg: 'bg-[#FF6600]/10',
    iconColor: 'text-[#FF6600]',
    iconHoverBg: 'group-hover:bg-[#FF6600] group-hover:text-white',
    tagHoverColor: 'group-hover:text-[#FF6600]',
  },
  {
    borderHover: 'hover:border-[#0066FF]/40',
    shadowHover: 'hover:shadow-[0_8px_30px_rgba(0,102,255,0.12)]',
    cornerGradient: 'from-[#00D26A]/20',
    iconBg: 'bg-gradient-to-br from-[#0066FF]/20 via-[#00D26A]/20 to-[#FF6600]/20',
    iconColor: 'text-white',
    iconHoverBg: 'group-hover:bg-gradient-to-r group-hover:from-[#0066FF] group-hover:via-[#00D26A] group-hover:to-[#FF6600] group-hover:text-white',
    tagHoverColor: 'group-hover:text-white',
  },
];

export function WhatWeBuild() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id={SECTION_IDS.whatWeBuild}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.whatWeBuild.badge}
          title={t.whatWeBuild.title}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.whatWeBuild.cards.map((card, i) => {
            const theme = CARD_THEMES[i % CARD_THEMES.length];
            return (
              <motion.div
                key={i}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-b from-indigo/40 to-indigo/20 p-6 sm:p-7 backdrop-blur-sm transition-all duration-300 ${theme.borderHover} hover:shadow-xl ${theme.shadowHover}`}
              >
                {/* Subtle accent corner highlight */}
                <div
                  className={`absolute top-0 right-0 h-24 w-24 rounded-bl-full bg-gradient-to-bl ${theme.cornerGradient} via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div>
                  <div
                    className={`mb-5 flex h-13 w-13 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconColor} transition-all duration-300 ${theme.iconHoverBg} group-hover:scale-105`}
                  >
                    {ICONS[card.icon] || ICONS.workflow}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-text-heading">
                    {card.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Feature Chips */}
                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-border-subtle/50 pt-4">
                  {(CARD_TAGS[i] || []).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`rounded-md bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-text-muted transition-colors ${theme.tagHoverColor}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}
