import puppeteer from 'puppeteer-core';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { margin: 0; background: #070B14; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow: hidden; height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; }
        .aurora {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 85% 55% at 50% -5%, rgba(0, 102, 255, 0.5) 0%, rgba(0, 210, 255, 0.3) 35%, transparent 70%),
                      radial-gradient(ellipse 65% 70% at 15% 35%, rgba(0, 210, 106, 0.4) 0%, rgba(0, 210, 255, 0.18) 45%, transparent 75%),
                      radial-gradient(ellipse 65% 70% at 85% 38%, rgba(255, 107, 0, 0.4) 0%, rgba(255, 160, 64, 0.18) 45%, transparent 75%),
                      radial-gradient(ellipse 75% 55% at 50% 45%, rgba(0, 112, 243, 0.22) 0%, rgba(0, 210, 106, 0.08) 40%, rgba(255, 107, 0, 0.08) 65%, transparent 80%);
        }
        .top-glow {
          position: absolute; top: -100px; left: 50%; transform: translateX(-50%); width: 850px; height: 500px; border-radius: 50%;
          background: radial-gradient(ellipse at 50% 25%, #0066FF 0%, #00D2FF 50%, transparent 80%);
          opacity: 0.6; filter: blur(90px);
        }
        .left-glow {
          position: absolute; top: 60px; left: -80px; width: 650px; height: 650px; border-radius: 50%;
          background: radial-gradient(circle, #00D26A 0%, rgba(0,210,255,0.4) 40%, transparent 75%);
          opacity: 0.5; filter: blur(85px);
        }
        .right-glow {
          position: absolute; top: 60px; right: -80px; width: 650px; height: 650px; border-radius: 50%;
          background: radial-gradient(circle, #FF6B00 0%, rgba(255,160,64,0.4) 40%, transparent 75%);
          opacity: 0.5; filter: blur(85px);
        }
        .content {
          position: relative; z-index: 10; text-align: center; color: white; max-width: 900px;
        }
        h1 { font-size: 56px; font-weight: 900; line-height: 1.15; margin: 0 0 20px 0; }
        .ai-text { background: linear-gradient(to right, #00D2FF, #00D26A); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        .sys-text { background: linear-gradient(to right, #FF6B00, #FFA034); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
        p { color: rgba(255,255,255,0.75); font-size: 20px; line-height: 1.6; }
      </style>
    </head>
    <body>
      <div class="aurora"></div>
      <div class="top-glow"></div>
      <div class="left-glow"></div>
      <div class="right-glow"></div>
      <div class="content">
        <h1>We turn manual business work into <span class="ai-text">intelligent</span> <span class="sys-text">systems.</span></h1>
        <p>Custom AI tools, enterprise-grade CRMs, and autonomous workflow engines built for 25+ industries across India.</p>
      </div>
    </body>
    </html>
  `;

  await page.setContent(html);
  await page.screenshot({ path: 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0\\desktop_preview_gradient.png' });
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.screenshot({ path: 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0\\mobile_preview_gradient.png' });
  await browser.close();
  console.log('Preview screenshots rendered successfully');
}

main().catch(console.error);
