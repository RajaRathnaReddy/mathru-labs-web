import type { Metadata } from 'next';
import { Sora, Inter, Noto_Sans_Telugu } from 'next/font/google';
import { LanguageProvider } from '@/providers/LanguageProvider';
import { LenisProvider } from '@/providers/LenisProvider';
import { getOrganizationSchema } from '@/lib/structured-data';
import { SITE_URL } from '@/lib/constants';
import './globals.css';

const sora = Sora({
  variable: '--font-sora',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const notoSansTelugu = Noto_Sans_Telugu({
  variable: '--font-noto-sans-telugu',
  subsets: ['telugu'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Mathru Labs — AI Tools, Custom Software & CRMs for Every Industry',
  description:
    'We engineer custom software, AI tools, CRMs, and autonomous workflows for every industry. Turn manual business operations into intelligent, scalable systems.',
  keywords: [
    'custom software development',
    'AI tools for business',
    'custom CRM development',
    'business automation',
    'autonomous AI agents',
    'WhatsApp automation',
    'enterprise workflows',
    'retail software',
    'healthcare automation',
    'real estate CRM',
    'manufacturing ERP tools',
    'India',
    'Mathru Labs',
  ],
  authors: [{ name: 'Mathru Labs' }],
  openGraph: {
    title: 'Mathru Labs — AI Tools, Custom Software & CRMs for Every Industry',
    description:
      'We engineer custom software, AI tools, CRMs, and autonomous workflows for every industry. Turn manual business operations into intelligent, scalable systems.',
    url: SITE_URL,
    siteName: 'Mathru Labs',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Mathru Labs — AI, Automation & Software for Business',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mathru Labs — AI, Automation & Software for Business',
    description:
      'We turn manual business work into intelligent systems.',
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${notoSansTelugu.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-screen bg-ink text-text-soft">
        <LanguageProvider>
          <LenisProvider>
            {/* Subtle noise overlay for premium texture */}
            <div className="noise-overlay" aria-hidden="true" />
            {children}
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
