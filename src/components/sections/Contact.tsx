'use client';

import { useState } from 'react';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useLanguage } from '@/providers/LanguageProvider';
import { SECTION_IDS, WHATSAPP_NUMBER } from '@/lib/constants';

const TELUGU_BUSINESS_OPTIONS = [
  'ఆసుపత్రులు & క్లినిక్స్',
  'డయాగ్నస్టిక్ సెంటర్లు & ల్యాబ్‌లు',
  'ఫార్మసీ & మెడికల్',
  'జిమ్స్ & ఫిట్‌నెస్ సెంటర్లు',
  'సెలూన్లు & స్పాలు',
  'షాపింగ్ మాల్స్ & మల్టీప్లెక్స్‌లు',
  'సూపర్‌మార్కెట్‌లు & కిరాణా',
  'ఎలక్ట్రానిక్స్ & ఉపకరణాల స్టోర్లు',
  'జ్యువెలరీ షోరూమ్‌లు',
  'ఆటోమొబైల్ డీలర్‌షిప్‌లు & సర్వీస్',
  'బ్యాంకులు, NBFCలు & రుణాలు',
  'ఇన్సూరెన్స్ & బీమా ఏజెన్సీలు',
  'లీగల్ సంస్థలు & న్యాయవాదులు',
  'చార్టర్డ్ అకౌంటెంట్ & టాక్స్ సంస్థలు',
  'రియల్ ఎస్టేట్ & ప్రాపర్టీస్',
  'బిల్డర్లు & నిర్మాణం',
  'ఇంటీరియర్ డిజైనర్లు & ఆర్కిటెక్ట్స్',
  'పాఠశాలలు & విద్యాసంస్థలు',
  'కోచింగ్ సెంటర్లు & అకాడమీలు',
  'ఎన్‌జీవోలు, ట్రస్ట్‌లు & కమ్యూనిటీలు',
  'హోటళ్లు & రిసార్ట్‌లు',
  'రెస్టారెంట్లు & కేఫ్‌లు',
  'ఈవెంట్ మేనేజ్‌మెంట్',
  'లాజిస్టిక్స్ & ట్రాన్స్‌పోర్ట్',
  'తయారీ రంగం & MSME',
  'ఇతర కస్టమ్ వ్యాపారం',
];

const ENGLISH_BUSINESS_OPTIONS = [
  'Hospitals & Clinics',
  'Diagnostic Centres & Labs',
  'Pharmacy',
  'Gyms & Fitness Centers',
  'Salons & Spas',
  'Shopping Malls',
  'Supermarkets & Grocery',
  'Electronics & Appliance Stores',
  'Jewellery Stores',
  'Automobile Dealerships & Service',
  'Banks, NBFCs & Finance',
  'Insurance Agencies',
  'Legal Firms',
  'Accounting & CA Firms',
  'Real Estate Agencies',
  'Builders & Construction',
  'Interior Designers',
  'Schools',
  'Coaching Centers',
  'NGOs & Trusts',
  'Hotels & Resorts',
  'Restaurants & Cafes',
  'Event Management',
  'Logistics & Transport',
  'Manufacturing & MSME',
  'Other / Custom Business',
];

export function Contact() {
  const { t, language } = useLanguage();
  const businessOptions = language === 'te' ? TELUGU_BUSINESS_OPTIONS : ENGLISH_BUSINESS_OPTIONS;
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState('sending');

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot check
    if (data.get('website')) {
      setFormState('success'); // Pretend success for bots
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          business: data.get('business'),
          phone: data.get('phone'),
          message: data.get('message'),
          website: data.get('website'),
        }),
      });

      if (response.ok) {
        setFormState('success');
        form.reset();
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  return (
    <SectionWrapper id={SECTION_IDS.contact}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.contact.badge}
          title={t.contact.title}
          description={t.contact.description}
        />

        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot — hidden from real users */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              className="absolute -left-[9999px] opacity-0 h-0 w-0"
              aria-hidden="true"
            />

            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-text-soft">
                {t.contact.form.name}
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                className="w-full rounded-xl border border-border-subtle bg-indigo/30 px-4 py-3 text-sm text-text-soft placeholder-text-muted/50 transition-colors focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/50"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-text-soft">
                {t.contact.form.email}
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                placeholder={t.contact.form.emailPlaceholder}
                className="w-full rounded-xl border border-border-subtle bg-indigo/30 px-4 py-3 text-sm text-text-soft placeholder-text-muted/50 transition-colors focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/50"
              />
            </div>

            <div>
              <label htmlFor="contact-business" className="mb-1.5 block text-sm font-medium text-text-soft">
                {t.contact.form.business}
              </label>
              <input
                type="text"
                id="contact-business"
                name="business"
                list="business-options"
                required
                placeholder={t.contact.businessPlaceholder}
                className="w-full rounded-xl border border-border-subtle bg-indigo/30 px-4 py-3 text-sm text-text-soft placeholder-text-muted/50 transition-colors focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/50"
              />
              <datalist id="business-options">
                {businessOptions.map((opt, idx) => (
                  <option key={idx} value={opt} />
                ))}
              </datalist>
            </div>

            <div>
              <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-text-soft">
                {t.contact.form.phone}
              </label>
              <input
                type="tel"
                id="contact-phone"
                name="phone"
                required
                className="w-full rounded-xl border border-border-subtle bg-indigo/30 px-4 py-3 text-sm text-text-soft placeholder-text-muted/50 transition-colors focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/50"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-text-soft">
                {t.contact.form.message}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                required
                className="w-full rounded-xl border border-border-subtle bg-indigo/30 px-4 py-3 text-sm text-text-soft placeholder-text-muted/50 transition-colors focus:border-amber/50 focus:outline-none focus:ring-1 focus:ring-amber/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={formState === 'sending'}
              className="w-full rounded-full bg-amber px-8 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-amber-dim disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formState === 'sending' ? t.contact.form.sending : t.contact.form.submit}
            </button>

            {formState === 'success' && (
              <p className="text-sm text-teal text-center">{t.contact.form.success}</p>
            )}
            {formState === 'error' && (
              <p className="text-sm text-red-400 text-center">{t.contact.form.error}</p>
            )}
          </form>

          {/* WhatsApp CTA */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-border-subtle bg-indigo/20 p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
              <svg className="h-8 w-8 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-semibold text-text-heading">
              {t.contact.whatsapp}
            </h3>
            <p className="mb-6 text-sm text-text-muted">
              {t.contact.whatsappHint}
            </p>

            {WHATSAPP_NUMBER ? (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-green-600"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.contact.whatsapp}
              </a>
            ) : (
              <p className="text-xs text-text-muted/60">
                WhatsApp number not configured
              </p>
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
