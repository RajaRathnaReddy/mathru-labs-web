import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Mathru Labs',
  description: 'Plain-language privacy policy explaining how Mathru Labs handles business and patient data securely.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-ink text-text-soft py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-amber hover:text-amber-dim transition-colors"
          >
            ← Back to Mathru Labs
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-heading mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Last updated: September 2026 • Effective immediately
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-text-muted">
          <section className="rounded-2xl border border-border-subtle bg-indigo/20 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-text-heading mb-3">
              1. Our Plain-Language Commitment
            </h2>
            <p className="text-text-soft">
              At Mathru Labs (&ldquo;Mathru&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), we treat your data the way we would want ours treated: with absolute privacy, discretion, and care. We design and build automation systems for healthcare, finance, real estate, and enterprise workflows. We never sell, monetize, or exploit your business data or your customers&apos; confidential information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              2. Information We Collect
            </h2>
            <p>
              When you use our website or reach out to us, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-text-soft">
              <li><strong>Contact Details:</strong> Your name, business name, phone number, and automation requirements submitted through our contact form or WhatsApp.</li>
              <li><strong>Technical Logs:</strong> Minimal anonymous connection logs (IP address, browser type, timestamp) standard for web security and abuse prevention.</li>
              <li><strong>Cookies:</strong> We do NOT use invasive advertising trackers, Facebook Pixels, or third-party behavioral profiling cookies.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              3. Client &amp; Patient Data in Automated Workflows
            </h2>
            <p>
              For clients engaging our automation and AI agent services (such as hospitals, diagnostic centers, and clinics):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-text-soft">
              <li>All patient details, diagnostic reports, and customer inquiries belong 100% to our client.</li>
              <li>Workflows are designed with zero cross-tenant data sharing.</li>
              <li>Automations run directly within the client&apos;s designated cloud or on-premise infrastructure whenever required.</li>
              <li>All communications in transit are encrypted via TLS 1.3, and databases at rest are encrypted with AES-256.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              4. How We Use Your Information
            </h2>
            <p>
              Information submitted through this website is used solely to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-text-soft">
              <li>Respond to your pilot inquiries and project questions.</li>
              <li>Schedule discovery discussions and technical architecture reviews.</li>
              <li>Fulfill our contractual obligations to your business.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              5. Data Storage and Indian DPDP Act Compliance
            </h2>
            <p>
              We operate in full compliance with the Digital Personal Data Protection (DPDP) Act, 2023 of India. Data submitted via web inquiries is retained for no longer than 180 days unless an active commercial relationship exists.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              6. Your Rights
            </h2>
            <p>
              You have the right at any time to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-text-soft">
              <li>Request a copy of any personal data we hold about you.</li>
              <li>Request the immediate rectification or permanent deletion of your contact records.</li>
              <li>Withdraw consent for any communication.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              7. Contact Us
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or your data, reach out to us at:
            </p>
            <p className="text-text-soft">
              <strong>Mathru Labs</strong><br />
              India<br />
              Website: <Link href="/" className="text-amber hover:underline">mathrulabs.com</Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
