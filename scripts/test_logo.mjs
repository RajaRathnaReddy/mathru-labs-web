import puppeteer from 'puppeteer-core';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const UPLOAD_FILE = 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0\\.user_uploaded\\media_1790672344104.png';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  const buf = fs.readFileSync(UPLOAD_FILE);
  const b64 = buf.toString('base64');

  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          margin: 0;
          padding: 40px;
          background: #060913;
          color: white;
          font-family: sans-serif;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
        }
        .card-dark {
          background: #0A0F1D;
        }
        .card-glass {
          background: rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
        }
        .card-white {
          background: #ffffff;
        }
      </style>
    </head>
    <body>
      <h3>1. On White Background (Original Design Context)</h3>
      <div class="row card-white">
        <img src="data:image/png;base64,${b64}" height="64" />
      </div>

      <h3>2. Direct on #0A0F1D (Original PNG as-is)</h3>
      <div class="row card-dark">
        <img src="data:image/png;base64,${b64}" height="64" />
      </div>

      <h3>3. On subtle frosted glass container (like in header navbar)</h3>
      <div class="row card-glass">
        <img src="data:image/png;base64,${b64}" height="64" />
      </div>
    </body>
    </html>
  `);

  await page.screenshot({ path: 'test_logo_render.png', fullPage: true });
  await browser.close();
  console.log('Saved test_logo_render.png');
}

main().catch(console.error);
