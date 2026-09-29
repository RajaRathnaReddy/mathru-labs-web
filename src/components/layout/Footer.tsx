'use client';

import { useLanguage } from '@/providers/LanguageProvider';
import { NAV_ITEMS, WHATSAPP_NUMBER } from '@/lib/constants';
import { MathruLogo } from '@/components/ui/MathruLogo';

export function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border-subtle bg-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <MathruLogo size="lg" showTagline={true} />
            </div>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed">
              {t.meta.description}
            </p>
            <p className="mt-4 text-sm text-text-muted">
              📍 {t.footer.location}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.sectionId}>
                  <button
                    onClick={() => scrollToSection(item.sectionId)}
                    className="text-sm text-text-muted transition-colors hover:text-text-soft"
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/privacy"
                  className="text-sm text-text-muted transition-colors hover:text-text-soft"
                >
                  {t.footer.privacy}
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="text-sm text-text-muted transition-colors hover:text-text-soft"
                >
                  {t.footer.terms}
                </a>
              </li>
              {WHATSAPP_NUMBER && (
                <li>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber transition-colors hover:text-amber-dim"
                  >
                    {t.nav.chatWhatsApp}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-border-subtle pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-text-muted">
              &copy; {currentYear} {t.footer.copyright}. All rights reserved.
            </p>
            <p className="text-xs text-text-muted/60">
              Built with care in India.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
