import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0';

async function main() {
  console.log('Launching Chrome with puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 950, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/#demo', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));

  // Scroll to demo section
  await page.evaluate(() => {
    const el = document.getElementById('demo');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));

  // 1. Capture MiniDemo with Diagnostic Labs
  console.log('Taking minidemo_diagnostic_labs.png...');
  // Click play to show active chat
  const playButtons = await page.$$('button');
  for (const btn of playButtons) {
    const txt = await page.evaluate(el => el.textContent, btn);
    if (txt && txt.includes('Play Journey')) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 3500)); // wait for steps to animate
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'minidemo_diagnostic_labs.png'),
    fullPage: false,
  });

  // 2. Switch to Real Estate tab in MiniDemo
  console.log('Switching to Real Estate tab in MiniDemo...');
  const tabs = await page.$$('button');
  for (const t of tabs) {
    const txt = await page.evaluate(el => el.textContent, t);
    if (txt && txt.trim() === 'Real Estate') {
      await t.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 800));

  // Click play on Real Estate journey
  const playBtns2 = await page.$$('button');
  for (const btn of playBtns2) {
    const txt = await page.evaluate(el => el.textContent, btn);
    if (txt && txt.includes('Play Journey')) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 3500));
  console.log('Taking minidemo_real_estate.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'minidemo_real_estate.png'),
    fullPage: false,
  });

  // 3. Scroll to Industries Section and open a modal (e.g. Diagnostic Labs)
  console.log('Scrolling to industries section...');
  await page.evaluate(() => {
    const el = document.getElementById('industries');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Click "See how it works" on Diagnostic Centres & Labs
  console.log('Opening Diagnostic Centres & Labs modal...');
  const seeBtns = await page.$$('button');
  for (const btn of seeBtns) {
    const txt = await page.evaluate(el => el.textContent, btn);
    if (txt && txt.includes('See how it works')) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1000));

  // 4. Capture Architecture Tab (with custom workflow steps)
  console.log('Taking modal_architecture_tab.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'modal_architecture_tab.png'),
    fullPage: false,
  });

  // 5. Click "Live WhatsApp Journey Demo" tab inside the modal
  console.log('Switching to Live WhatsApp Journey Demo tab inside modal...');
  const modalTabs = await page.$$('button');
  for (const tab of modalTabs) {
    const txt = await page.evaluate(el => el.textContent, tab);
    if (txt && txt.includes('Live WhatsApp Journey Demo')) {
      await tab.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 3000));

  console.log('Taking modal_simulation_tab.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'modal_simulation_tab.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch((err) => {
  console.error('Error during screenshot capture:', err);
  process.exit(1);
});
