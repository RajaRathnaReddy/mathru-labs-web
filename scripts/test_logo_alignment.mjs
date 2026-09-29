import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1000, height: 800 });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 40px;
          background: #080C14;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .row {
          display: flex;
          padding: 24px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          background: #0D1322;
        }
        .logo-container {
          display: inline-flex;
          align-items: flex-end;
          gap: 12px;
        }
        .mark {
          height: 48px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 16px rgba(0,112,243,0.45));
        }
        .text-col {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding-bottom: 2px;
        }
        .mathru-labs {
          display: flex;
          align-items: baseline;
          gap: 8px;
          line-height: 1;
        }
        .mathru {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          background: linear-gradient(180deg, #FFFFFF 0%, #D8F2FF 60%, #7DD3FC 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .labs {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.3em;
          color: rgba(255, 255, 255, 0.9);
          border-left: 1px solid rgba(255, 255, 255, 0.2);
          padding-left: 8px;
        }
        .tagline {
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.22em;
          line-height: 1;
        }
        .tagline-ai { color: #38BDF8; }
        .tagline-pipe { color: rgba(255,255,255,0.25); font-weight: 300; font-size: 10px; }
        .tagline-soft { color: rgba(255,255,255,0.85); }
        .tagline-auto { color: #00D26A; }
      </style>
    </head>
    <body>
      <h3>1. Aligned to Bottom (Authentic Proportions with | dividers)</h3>
      <div class="row">
        <div class="logo-container">
          <img class="mark" src="http://localhost:3000/brand/mathru-mark.png" />
          <div class="text-col">
            <div class="mathru-labs">
              <span class="mathru">Mathru</span>
              <span class="labs">LABS</span>
            </div>
            <div class="tagline">
              <span class="tagline-ai">AI</span>
              <span class="tagline-pipe">|</span>
              <span class="tagline-soft">SOFTWARE</span>
              <span class="tagline-pipe">|</span>
              <span class="tagline-auto">AUTOMATION</span>
            </div>
          </div>
        </div>
      </div>

      <h3>2. Direct Full Artwork for Comparison</h3>
      <div class="row">
        <img src="http://localhost:3000/brand/mathru-logo-full.png" height="52" />
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'test_logo_alignment.png' });
  await browser.close();
  console.log('Saved test_logo_alignment.png');
}

main().catch(console.error);
