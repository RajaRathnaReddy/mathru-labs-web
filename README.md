# Mathru Labs — Marketing Website

AI, Automation & Software for Business.

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion + React Three Fiber (Three.js)
- **Smooth Scroll**: Lenis
- **Fonts**: Sora (headings), Inter (body), Noto Sans Telugu (Telugu text)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install & Run

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file (see `.env.local.example`):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your WhatsApp business number with country code (e.g., `919876543210`) |
| `WEBHOOK_URL` | Your n8n webhook URL for the contact form |
| `NEXT_PUBLIC_SITE_URL` | Your production domain (e.g., `https://mathrulabs.com`) |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, providers, SEO)
│   ├── page.tsx            # Home page (10 scroll sections)
│   ├── privacy/page.tsx    # Privacy Policy
│   ├── terms/page.tsx      # Terms of Service
│   └── api/contact/        # Contact form webhook handler
├── components/
│   ├── layout/             # Header, Footer, SectionWrapper
│   ├── sections/           # 10 page sections
│   ├── three/              # React Three Fiber 3D scenes
│   └── ui/                 # Reusable UI components
├── providers/              # LanguageProvider, LenisProvider
├── hooks/                  # useDeviceCapability, etc.
├── lib/                    # Constants, structured data
├── locales/                # en.json, te.json translations
└── styles/                 # Global CSS
```

## Languages

The site supports English and Telugu. All strings live in:
- `src/locales/en.json`
- `src/locales/te.json`

Toggle between languages using the EN/తె switch in the header.

> **Important**: Have a native Telugu speaker review `te.json` before launch.

## Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Cloudflare Pages

```bash
npm run build
# Upload the `.next` output to Cloudflare Pages
```

## Before Launch Checklist

- [ ] Set `NEXT_PUBLIC_WHATSAPP_NUMBER` in production env
- [ ] Set `WEBHOOK_URL` to your n8n webhook endpoint
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] Have Telugu text reviewed by a native speaker
- [ ] Register domain (mathrulabs.com / .in / .ai)
- [ ] Set up Google Search Console and submit sitemap
- [ ] Verify Privacy Policy is live before collecting form data
- [ ] Test on a mid-range Android phone on mobile data

## License

Copyright © Mathru Labs. All rights reserved.
