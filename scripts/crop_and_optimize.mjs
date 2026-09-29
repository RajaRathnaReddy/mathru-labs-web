import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT_DIR = 'c:\\Users\\araja\\Desktop\\Tools Dev\\Mathru Labs\\mathru-labs-web\\public\\brand';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Load logo-v2-transparent.png and logo-v1-transparent.png
  const v1Base64 = fs.readFileSync(path.join(OUTPUT_DIR, 'logo-v1-transparent.png')).toString('base64');
  const v2Base64 = fs.readFileSync(path.join(OUTPUT_DIR, 'logo-v2-transparent.png')).toString('base64');

  const result = await page.evaluate(async (v1Uri, v2Uri) => {
    const loadImg = (uri) => new Promise((res) => {
      const img = new Image();
      img.onload = () => res(img);
      img.src = uri;
    });

    const img1 = await loadImg(`data:image/png;base64,${v1Uri}`);
    const img2 = await loadImg(`data:image/png;base64,${v2Uri}`);

    // Helper: find bounding box of non-transparent pixels in an area
    function getBounds(ctx, startX, startY, endX, endY) {
      const w = endX - startX;
      const h = endY - startY;
      const data = ctx.getImageData(startX, startY, w, h).data;
      let minX = w, minY = h, maxX = 0, maxY = 0;
      let hasPixels = false;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const a = data[(y * w + x) * 4 + 3];
          if (a > 20) {
            hasPixels = true;
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (!hasPixels) return null;
      return {
        x: startX + minX,
        y: startY + minY,
        width: maxX - minX + 1,
        height: maxY - minY + 1,
      };
    }

    // Process img2 (3D render)
    const c2 = document.createElement('canvas');
    c2.width = img2.naturalWidth;
    c2.height = img2.naturalHeight;
    const ctx2 = c2.getContext('2d');
    ctx2.drawImage(img2, 0, 0);

    // Icon is roughly on the left half (0 to width * 0.45)
    const iconBounds2 = getBounds(ctx2, 0, 0, Math.round(c2.width * 0.46), c2.height);

    // Text is on the right half (width * 0.42 to width)
    const textBounds2 = getBounds(ctx2, Math.round(c2.width * 0.42), 0, c2.width, c2.height);

    // Full bounds
    const fullBounds2 = getBounds(ctx2, 0, 0, c2.width, c2.height);

    // Crop Icon from img2
    const iconCanvas2 = document.createElement('canvas');
    iconCanvas2.width = iconBounds2.width;
    iconCanvas2.height = iconBounds2.height;
    const iconCtx2 = iconCanvas2.getContext('2d');
    iconCtx2.drawImage(
      c2,
      iconBounds2.x, iconBounds2.y, iconBounds2.width, iconBounds2.height,
      0, 0, iconBounds2.width, iconBounds2.height
    );

    // Create Dark-Mode Optimized Full Lockup from img2:
    // Keep the colorful 'M' icon intact.
    // Convert the dark navy/midnight text into crisp luminous silver/white with subtle specular gradient!
    const darkLockupCanvas = document.createElement('canvas');
    darkLockupCanvas.width = fullBounds2.width;
    darkLockupCanvas.height = fullBounds2.height;
    const darkCtx = darkLockupCanvas.getContext('2d');

    // Draw full cropped image
    darkCtx.drawImage(
      c2,
      fullBounds2.x, fullBounds2.y, fullBounds2.width, fullBounds2.height,
      0, 0, fullBounds2.width, fullBounds2.height
    );

    // Now adjust pixels in the text region:
    // Text start x relative to fullBounds2
    const relTextX = textBounds2.x - fullBounds2.x;
    const textImgData = darkCtx.getImageData(relTextX, 0, textBounds2.width, darkLockupCanvas.height);
    const d = textImgData.data;

    for (let i = 0; i < d.length; i += 4) {
      const a = d[i + 3];
      if (a > 10) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];

        // Is it part of the dark text? (dark blue/black, low brightness)
        const isCyanDot = (b > 180 && g > 150 && r < 100); // cyan separator dots
        if (!isCyanDot) {
          // Invert/lighten the dark text to bright metallic white/silver
          // Original dark text has r, g, b around 10-60
          // We convert to 230-255 while preserving subtle shading
          const originalBrightness = (r * 0.299 + g * 0.587 + b * 0.114);
          const lightness = 230 + Math.min(25, originalBrightness * 1.5);
          d[i] = lightness;
          d[i + 1] = Math.min(255, lightness + 5);
          d[i + 2] = 255;
        }
      }
    }
    darkCtx.putImageData(textImgData, relTextX, 0);

    // Also get cropped original lockup
    const origLockupCanvas = document.createElement('canvas');
    origLockupCanvas.width = fullBounds2.width;
    origLockupCanvas.height = fullBounds2.height;
    const origCtx = origLockupCanvas.getContext('2d');
    origCtx.drawImage(
      c2,
      fullBounds2.x, fullBounds2.y, fullBounds2.width, fullBounds2.height,
      0, 0, fullBounds2.width, fullBounds2.height
    );

    // Also process img1 (the top banner uploaded by user)
    const c1 = document.createElement('canvas');
    c1.width = img1.naturalWidth;
    c1.height = img1.naturalHeight;
    const ctx1 = c1.getContext('2d');
    ctx1.drawImage(img1, 0, 0);
    const fullBounds1 = getBounds(ctx1, 0, 0, c1.width, c1.height);
    const iconBounds1 = getBounds(ctx1, 0, 0, Math.round(c1.width * 0.42), c1.height);

    const iconCanvas1 = document.createElement('canvas');
    iconCanvas1.width = iconBounds1.width;
    iconCanvas1.height = iconBounds1.height;
    iconCanvas1.getContext('2d').drawImage(
      c1,
      iconBounds1.x, iconBounds1.y, iconBounds1.width, iconBounds1.height,
      0, 0, iconBounds1.width, iconBounds1.height
    );

    const origLockup1 = document.createElement('canvas');
    origLockup1.width = fullBounds1.width;
    origLockup1.height = fullBounds1.height;
    origLockup1.getContext('2d').drawImage(
      c1,
      fullBounds1.x, fullBounds1.y, fullBounds1.width, fullBounds1.height,
      0, 0, fullBounds1.width, fullBounds1.height
    );

    // Dark-mode optimized for img1
    const darkLockup1 = document.createElement('canvas');
    darkLockup1.width = fullBounds1.width;
    darkLockup1.height = fullBounds1.height;
    const darkCtx1 = darkLockup1.getContext('2d');
    darkCtx1.drawImage(
      c1,
      fullBounds1.x, fullBounds1.y, fullBounds1.width, fullBounds1.height,
      0, 0, fullBounds1.width, fullBounds1.height
    );
    const relTextX1 = Math.round(c1.width * 0.38) - fullBounds1.x;
    const textData1 = darkCtx1.getImageData(relTextX1, 0, darkLockup1.width - relTextX1, darkLockup1.height);
    const d1 = textData1.data;
    for (let i = 0; i < d1.length; i += 4) {
      const a = d1[i + 3];
      if (a > 15) {
        const r = d1[i];
        const g = d1[i + 1];
        const b = d1[i + 2];
        const isAccentPipe = (r > 200 && g > 100 && b < 50) || (b > 200 && r < 50);
        if (!isAccentPipe) {
          const l = 235 + Math.min(20, (r + g + b) / 10);
          d1[i] = l;
          d1[i + 1] = Math.min(255, l + 5);
          d1[i + 2] = 255;
        }
      }
    }
    darkCtx1.putImageData(textData1, relTextX1, 0);

    return {
      icon2: iconCanvas2.toDataURL('image/png'),
      icon1: iconCanvas1.toDataURL('image/png'),
      lockup2Dark: darkLockupCanvas.toDataURL('image/png'),
      lockup2Original: origLockupCanvas.toDataURL('image/png'),
      lockup1Dark: darkLockup1.toDataURL('image/png'),
      lockup1Original: origLockup1.toDataURL('image/png'),
      iconBounds2,
      fullBounds2,
    };
  }, v1Base64, v2Base64);

  const save = (dataUrl, filename) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), base64Data, 'base64');
    console.log(`Exported: ${filename}`);
  };

  save(result.icon2, 'mathru-icon-3d.png');
  save(result.icon1, 'mathru-icon-vector.png');
  save(result.lockup2Dark, 'mathru-logo-dark.png');
  save(result.lockup2Original, 'mathru-logo-light.png');
  save(result.lockup1Dark, 'mathru-logo-v1-dark.png');
  save(result.lockup1Original, 'mathru-logo-v1-light.png');

  await browser.close();
  console.log('All crops and dark-mode optimizations generated successfully!');
}

main().catch(console.error);
