'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { SECTION_IDS } from '@/lib/constants';
import { motion } from 'framer-motion';

export function PilotProgram() {
  const { t, language } = useLanguage();

  const handleSelectTier = (tierName: string) => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Pre-fill or hint message input
      const messageInput = document.getElementById('contact-message') as HTMLTextAreaElement | null;
      if (messageInput && !messageInput.value) {
        messageInput.value = language === 'te' 
          ? `నేను ${tierName} పైలట్ ప్రోగ్రామ్ గురించి మరింత సమాచారం తెలుసుకోవాలనుకుంటున్నాను.`
          : `I am interested in learning more about the ${tierName} Pilot Program.`;
        messageInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  };

  return (
    <SectionWrapper id={SECTION_IDS.pilot}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Pilot Open Status Banner */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-semibold text-teal backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-teal animate-pulse" />
            <span>Pilot Program Open • Welcoming Businesses Across All Industries</span>
          </div>
        </div>

        <SectionHeading
          badge={t.pilot.badge}
          title={t.pilot.title}
          description={t.pilot.description}
        />

        <div className="grid gap-8 lg:grid-cols-3 items-stretch">
          {t.pilot.tiers.map((tier, i) => {
            const isHighlight = tier.highlighted;

            return (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col justify-between rounded-3xl p-7 lg:p-8 backdrop-blur-sm transition-all duration-300 ${
                  isHighlight
                    ? 'border-2 border-amber/60 bg-gradient-to-b from-indigo/60 via-indigo/40 to-ink shadow-2xl shadow-amber/10'
                    : 'border border-border-subtle bg-indigo/20 hover:border-border-subtle/80'
                }`}
              >
                {isHighlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-amber px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink shadow-md">
                      Recommended
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-text-heading">
                      {tier.name}
                    </h3>
                    <p className="mt-1 text-xs text-amber font-medium">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-6 border-b border-border-subtle/50 pb-6">
                    <span className="text-xs text-text-muted">
                      Custom scope • Tailored for your business
                    </span>
                  </div>

                  <ul className="space-y-3.5">
                    {tier.features.map((feature, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-text-soft">
                        <div
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                            isHighlight ? 'bg-amber/20 text-amber' : 'bg-teal/20 text-teal'
                          }`}
                        >
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-border-subtle/40">
                  <button
                    onClick={() => handleSelectTier(tier.name)}
                    className={`w-full rounded-full py-3.5 text-sm font-semibold transition-all duration-300 active:scale-98 ${
                      isHighlight
                        ? 'bg-amber text-ink hover:bg-amber-dim shadow-lg shadow-amber/20'
                        : 'border border-border-subtle bg-white/5 text-text-soft hover:bg-white/10 hover:border-text-muted'
                    }`}
                  >
                    Apply for Pilot
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Commitment Promise */}
        <div className="mt-12 rounded-2xl border border-border-subtle/60 bg-ink-light/40 p-6 text-center text-xs text-text-muted sm:px-12">
          <p>
            🛡️ <strong className="text-text-soft">Zero Long-Term Lock-In:</strong> You own 100% of your workflows, database connections, and configurations. We prove ROI within the pilot period.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
