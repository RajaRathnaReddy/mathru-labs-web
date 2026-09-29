export const SECTION_IDS = {
  hero: 'hero',
  problem: 'problem-system',
  whatWeBuild: 'what-we-build',
  miniDemo: 'mini-demo',
  industries: 'industries',
  howWeWork: 'how-we-work',
  pilot: 'pilot-program',
  whyMathru: 'why-mathru',
  trust: 'trust-privacy',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const NAV_ITEMS: { key: string; sectionId: SectionId }[] = [
  { key: 'whatWeBuild', sectionId: SECTION_IDS.whatWeBuild },
  { key: 'industries', sectionId: SECTION_IDS.industries },
  { key: 'howWeWork', sectionId: SECTION_IDS.howWeWork },
  { key: 'pilot', sectionId: SECTION_IDS.pilot },
  { key: 'contact', sectionId: SECTION_IDS.contact },
];

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mathrulabs.com';
