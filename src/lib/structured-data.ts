import { SITE_URL } from './constants';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mathru Labs',
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.png`,
    description:
      'We engineer custom software, AI tools, CRMs, and autonomous workflows for every industry. Turn manual operations into intelligent, scalable systems.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'India',
    },
    sameAs: [],
  };
}
