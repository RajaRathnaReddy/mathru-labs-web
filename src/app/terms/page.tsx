import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Mathru Labs',
  description: 'Terms of service and commercial guidelines for working with Mathru Labs.',
};

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-text-muted mb-8">
          Last updated: September 2026 • Effective immediately
        </p>

        <div className="space-y-8 text-sm leading-relaxed text-text-muted">
          <section className="rounded-2xl border border-border-subtle bg-indigo/20 p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-text-heading mb-3">
              1. Overview
            </h2>
            <p className="text-text-soft">
              Welcome to Mathru Labs. By accessing this marketing website or inquiring about our services, you agree to these clear and fair terms. We provide engineering and automation consulting, workflow development, AI assistant integration, and custom business application development.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              2. Intellectual Property &amp; Ownership
            </h2>
            <p className="text-text-soft">
              When you hire Mathru Labs to build a customized system:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-text-soft">
              <li><strong>Your IP:</strong> All custom business rules, domain workflows, customer databases, and proprietary business data remain 100% your property upon project settlement.</li>
              <li><strong>Zero Vendor Lock-in:</strong> We deliver clean, documented code and standard configurations (e.g., n8n workflows, Next.js applications, standard PostgreSQL / SQLite databases). You are free to self-host or maintain them independently.</li>
              <li><strong>Mathru IP:</strong> Reusable foundational libraries, open-source building blocks, and our trademark &ldquo;Mathru Labs&rdquo; remain the property of Mathru Labs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              3. Pilot Engagements &amp; Warranty
            </h2>
            <p className="text-text-soft">
              Our Pilot Programs are designed to prove tangible business return on investment. Each pilot is governed by a scoped Statement of Work (SOW) specifying deliverables, sprint cadence, and defined support periods (30 to 60 days). We do not guarantee outcomes outside agreed technical specifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              4. Governing Law &amp; Jurisdiction
            </h2>
            <p className="text-text-soft">
              These terms are governed by the laws of India. Any disputes arising out of or related to these terms or our services shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-text-heading">
              5. Contact &amp; Questions
            </h2>
            <p className="text-text-soft">
              For any questions regarding these terms, contact us through our website at <Link href="/" className="text-amber hover:underline">mathrulabs.com</Link>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
