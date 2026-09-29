import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const UPLOAD_FILE = 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0\\.user_uploaded\\media_1790672344104.png';
const BASE_DIR = 'c:\\Users\\araja\\Desktop\\Tools Dev\\Mathru Labs\\mathru-labs-web';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const fileBuf = fs.readFileSync(UPLOAD_FILE);
  const b64 = fileBuf.toString('base64');

  const assets = await page.evaluate(async (data) => {
    const img = new Image();
    await new Promise(r => { img.onload = r; img.src = 'data:image/png;base64,' + data; });

    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const sourceCanvas = document.createElement('canvas');
    sourceCanvas.width = w;
    sourceCanvas.height = h;
    const sctx = sourceCanvas.getContext('2d');
    sctx.drawImage(img, 0, 0);

    const imgData = sctx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // 1. Find overall bounding box of everything (full logo)
    let minX = w, minY = h, maxX = 0, maxY = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const a = d[(y * w + x) * 4 + 3];
        if (a > 10) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // 2. Identify boundary between 3D ribbon mark and text
    // The mark is on the left; search between x = 360 and x = 450 for the column with minimum alpha
    let markEndX = 421;
    let minColAlpha = 9999;
    for (let x = 360; x < 450; x++) {
      let count = 0;
      for (let y = 0; y < h; y++) {
        if (d[(y * w + x) * 4 + 3] > 10) count++;
      }
      if (count < minColAlpha) {
        minColAlpha = count;
        markEndX = x;
      }
    }

    // Find tight bounding box of mark only
    let markMinX = w, markMaxX = 0, markMinY = h, markMaxY = 0;
    for (let x = minX; x <= markEndX; x++) {
      for (let y = 0; y < h; y++) {
        const a = d[(y * w + x) * 4 + 3];
        if (a > 10) {
          if (x < markMinX) markMinX = x;
          if (x > markMaxX) markMaxX = x;
          if (y < markMinY) markMinY = y;
          if (y > markMaxY) markMaxY = y;
        }
      }
    }

    const markW = markMaxX - markMinX + 1;
    const markH = markMaxY - markMinY + 1;

    // Helper: generate square site identity icon of given size
    const createSquareIdentity = (size, paddingRatio = 0.08) => {
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const availSize = size * (1 - paddingRatio * 2);
      const scale = Math.min(availSize / markW, availSize / markH);
      const destW = markW * scale;
      const destH = markH * scale;
      const destX = (size - destW) / 2;
      const destY = (size - destH) / 2;

      ctx.drawImage(
        sourceCanvas,
        markMinX, markMinY, markW, markH,
        destX, destY, destW, destH
      );

      return c.toDataURL('image/png');
    };

    // Helper: generate tight cropped mark
    const createTightMark = () => {
      const c = document.createElement('canvas');
      c.width = markW;
      c.height = markH;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(sourceCanvas, markMinX, markMinY, markW, markH, 0, 0, markW, markH);
      return c.toDataURL('image/png');
    };

    // Helper: generate cropped full logo
    const createFullLogo = () => {
      const fullW = maxX - minX + 1;
      const fullH = maxY - minY + 1;
      const c = document.createElement('canvas');
      c.width = fullW;
      c.height = fullH;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(sourceCanvas, minX, minY, fullW, fullH, 0, 0, fullW, fullH);
      return c.toDataURL('image/png');
    };

    return {
      markBounds: { markMinX, markMaxX, markMinY, markMaxY, markW, markH },
      fullBounds: { minX, maxX, minY, maxY },
      identity512: createSquareIdentity(512),
      identity192: createSquareIdentity(192),
      identity64: createSquareIdentity(64),
      identity32: createSquareIdentity(32),
      appleTouch180: createSquareIdentity(180, 0.1),
      tightMark: createTightMark(),
      fullLogo: createFullLogo(),
    };
  }, b64);

  console.log('Bounds:', assets.markBounds);

  const saveBase64 = (dataUrl, targetPath) => {
    const raw = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(targetPath, Buffer.from(raw, 'base64'));
    console.log('Saved:', targetPath);
  };

  // 1. Site Identity Square Icons (App, Favicon, Browser Tabs, Manifest)
  saveBase64(assets.identity512, path.join(BASE_DIR, 'public', 'brand', 'site-identity-512.png'));
  saveBase64(assets.identity512, path.join(BASE_DIR, 'public', 'brand', 'site-identity.png'));
  saveBase64(assets.identity192, path.join(BASE_DIR, 'public', 'brand', 'site-identity-192.png'));
  saveBase64(assets.identity64, path.join(BASE_DIR, 'public', 'brand', 'site-identity-64.png'));
  saveBase64(assets.identity32, path.join(BASE_DIR, 'public', 'brand', 'site-identity-32.png'));
  saveBase64(assets.identity32, path.join(BASE_DIR, 'public', 'favicon.ico'));

  // 2. Next.js App Router dynamic icon and apple-icon
  saveBase64(assets.identity512, path.join(BASE_DIR, 'src', 'app', 'icon.png'));
  saveBase64(assets.appleTouch180, path.join(BASE_DIR, 'src', 'app', 'apple-icon.png'));

  // 3. Mark for components (tight crop)
  saveBase64(assets.tightMark, path.join(BASE_DIR, 'public', 'brand', 'mathru-mark.png'));

  // 4. Cropped Full Logo
  saveBase64(assets.fullLogo, path.join(BASE_DIR, 'public', 'brand', 'mathru-logo-full.png'));

  await browser.close();
  console.log('Successfully generated site identity assets!');
}

main().catch(console.error);
