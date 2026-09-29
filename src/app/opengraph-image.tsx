import { ImageResponse } from 'next/og';

export const alt = 'Mathru Labs — AI, Automation & Software for Business';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #070A12 0%, #10162A 50%, #070A12 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            top: '40px',
            right: '40px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,165,36,0.15) 0%, rgba(45,212,191,0.05) 50%, transparent 70%)',
          }}
        />

        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#F5A524',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#070A12',
              fontSize: '28px',
              fontWeight: 900,
            }}
          >
            M
          </div>
          <span style={{ fontSize: '32px', fontWeight: 800, color: '#E8ECF5', letterSpacing: '-0.02em' }}>
            Mathru Labs
          </span>
        </div>

        {/* Main Pitch */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <div
            style={{
              fontSize: '54px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
            }}
          >
            We turn manual business work into intelligent systems.
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#8B93A7',
              lineHeight: 1.4,
            }}
          >
            Custom software, AI tools, CRMs &amp; autonomous systems for every industry.
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '32px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#2DD4BF', fontWeight: 600 }}>
            mathrulabs.com
          </span>
          <span style={{ fontSize: '18px', color: '#8B93A7' }}>
            India
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
