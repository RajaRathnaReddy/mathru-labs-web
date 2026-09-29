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

  // 1. Desktop - 1440x900
  console.log('Setting viewport 1440x900...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/#industries', { waitUntil: 'networkidle2' });
  await new Promise((r) => setTimeout(r, 2000));

  // Scroll to industries section
  await page.evaluate(() => {
    const el = document.getElementById('industries');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Screenshot 1: Desktop Default "All" view
  console.log('Taking desktop_all_view.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'desktop_all_view.png'),
    fullPage: false,
  });

  // Screenshot 1b: Desktop Cards Grid view (scrolled slightly down)
  console.log('Taking desktop_cards_grid.png...');
  await page.evaluate(() => {
    window.scrollBy({ top: 380, behavior: 'instant' });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'desktop_cards_grid.png'),
    fullPage: false,
  });
  // Scroll back
  await page.evaluate(() => {
    const el = document.getElementById('industries');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });

  // Screenshot 2: Filtered Category (Healthcare & Wellness)
  console.log('Filtering by Healthcare & Wellness...');
  const pills = await page.$$('button');
  for (const pill of pills) {
    const text = await page.evaluate(el => el.textContent, pill);
    if (text && text.includes('Healthcare & Wellness')) {
      await pill.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 800));
  console.log('Taking desktop_category_filtered.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'desktop_category_filtered.png'),
    fullPage: false,
  });

  // Screenshot 2b: Desktop Workflow Modal
  console.log('Opening desktop modal...');
  const seeHowButtons = await page.$$('button');
  for (const btn of seeHowButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('See how it works')) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Taking desktop_workflow_modal.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'desktop_workflow_modal.png'),
    fullPage: false,
  });

  // Close modal with Escape
  await page.keyboard.press('Escape');
  await new Promise((r) => setTimeout(r, 600));

  // Screenshot 3: Live Search with results ("Gym")
  console.log('Searching for Gym...');
  const searchInput = await page.$('input[aria-label="Search your business type"]');
  if (searchInput) {
    // Reset category to All first
    const currentPills = await page.$$('button');
    for (const pill of currentPills) {
      const text = await page.evaluate(el => el.textContent, pill);
      if (text && text.includes('All Industries')) {
        await pill.click();
        break;
      }
    }
    await searchInput.click();
    await searchInput.type('Gym', { delay: 80 });
  }
  await new Promise((r) => setTimeout(r, 800));
  console.log('Taking desktop_live_search.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'desktop_live_search.png'),
    fullPage: false,
  });

  // Screenshot 4: Zero Results View ("Space Exploration Launchpad")
  console.log('Searching for non-existent industry...');
  if (searchInput) {
    await page.evaluate(el => el.value = '', searchInput);
    await searchInput.type('Space Exploration Launchpad', { delay: 50 });
  }
  await new Promise((r) => setTimeout(r, 800));
  console.log('Taking desktop_zero_results.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'desktop_zero_results.png'),
    fullPage: false,
  });

  // Clear search for mobile test
  if (searchInput) {
    await page.evaluate(el => el.value = '', searchInput);
    await searchInput.type(' ', { delay: 10 });
    await page.keyboard.press('Backspace');
  }

  // 2. Mobile - 390x844
  console.log('Setting viewport 390x844...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.evaluate(() => {
    const el = document.getElementById('industries');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise((r) => setTimeout(r, 1000));

  // Screenshot 5: Mobile Default View
  console.log('Taking mobile_all_view.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'mobile_all_view.png'),
    fullPage: false,
  });

  // Screenshot 6: Mobile Workflow Modal Open
  console.log('Opening workflow modal on mobile...');
  const mobileSeeHowButtons = await page.$$('button');
  for (const btn of mobileSeeHowButtons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('See how it works')) {
      await btn.click();
      break;
    }
  }
  await new Promise((r) => setTimeout(r, 1000));
  console.log('Taking mobile_workflow_modal.png...');
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'mobile_workflow_modal.png'),
    fullPage: false,
  });

  await browser.close();
  console.log('SUCCESS: All 6 screenshots captured!');
}

main().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
