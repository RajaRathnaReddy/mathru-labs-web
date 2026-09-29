import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACTS_DIR = 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0';

async function main() {
  console.log('Capturing redesigned site screenshots...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--hide-scrollbars'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 1800));

  // 1. Redesigned Hero with All-Industry Navigator
  console.log('Taking redesigned_hero.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'redesigned_hero.png'),
    fullPage: false,
  });

  // 2. Redesigned Problem to System
  console.log('Taking redesigned_problem_section.png...');
  await page.evaluate(() => {
    const el = document.getElementById('problem-system');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'redesigned_problem_section.png'),
    fullPage: false,
  });

  // 3. Redesigned What We Build
  console.log('Taking redesigned_what_we_build.png...');
  await page.evaluate(() => {
    const el = document.getElementById('what-we-build');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'redesigned_what_we_build.png'),
    fullPage: false,
  });

  // 4. Redesigned Contact Section
  console.log('Taking redesigned_contact.png...');
  await page.evaluate(() => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 800));
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'redesigned_contact.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('Redesign screenshots captured!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
