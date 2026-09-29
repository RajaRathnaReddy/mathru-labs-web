import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const UPLOAD_FILE = 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0\\.user_uploaded\\media_1790672344104.png';
const OUTPUT_DIR = 'c:\\Users\\araja\\Desktop\\Tools Dev\\Mathru Labs\\mathru-labs-web\\public\\brand';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const base64 = fs.readFileSync(UPLOAD_FILE).toString('base64');

  const result = await page.evaluate(async (uri) => {
    const img = new Image();
    await new Promise(r => { img.onload = r; img.src = 'data:image/png;base64,' + uri; });

    const w = img.naturalWidth;
    const h = img.naturalHeight;

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // 1. Find bounding box of non-white content
    const imgData = ctx.getImageData(0, 0, w, h);
    const d = imgData.data;
    let minX = w, minY = h, maxX = 0, maxY = 0;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = d[idx], g = d[idx + 1], b = d[idx + 2];
        if (r < 245 || g < 245 || b < 245) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    const pad = 10;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(w - cropX, (maxX - minX) + pad * 2);
    const cropH = Math.min(h - cropY, (maxY - minY) + pad * 2);

    // 2. Crop Mark Only (the 3D M on left)
    // Find where the 3D M ends: looking between x = 30% and 48%
    let markEndX = Math.round(w * 0.42);
    for (let x = Math.round(w * 0.38); x < Math.round(w * 0.45); x++) {
      let isGap = true;
      for (let y = cropY; y < cropY + cropH; y++) {
        const idx = (y * w + x) * 4;
        const r = d[idx], g = d[idx + 1], b = d[idx + 2];
        if (r < 240 || g < 240 || b < 240) {
          isGap = false;
          break;
        }
      }
      if (isGap) {
        markEndX = x;
        break;
      }
    }

    // Canvas for 3D Mark
    const markW = markEndX - cropX;
    const markCanvas = document.createElement('canvas');
    markCanvas.width = markW;
    markCanvas.height = cropH;
    const mctx = markCanvas.getContext('2d');
    mctx.drawImage(canvas, cropX, cropY, markW, cropH, 0, 0, markW, cropH);

    // Remove white background from mark
    const markData = mctx.getImageData(0, 0, markW, cropH);
    const md = markData.data;
    for (let i = 0; i < md.length; i += 4) {
      const r = md[i], g = md[i + 1], b = md[i + 2];
      if (r > 248 && g > 248 && b > 248) {
        md[i + 3] = 0;
      } else if (r > 225 && g > 225 && b > 225) {
        const diff = 255 - ((r + g + b) / 3);
        md[i + 3] = Math.min(255, Math.round(diff * 10));
      }
    }
    mctx.putImageData(markData, 0, 0);

    // 3. Full Logo Transparent with Light Mode text
    const fullCanvas = document.createElement('canvas');
    fullCanvas.width = cropW;
    fullCanvas.height = cropH;
    const fctx = fullCanvas.getContext('2d');
    fctx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
    const fullData = fctx.getImageData(0, 0, cropW, cropH);
    const fd = fullData.data;
    for (let i = 0; i < fd.length; i += 4) {
      const r = fd[i], g = fd[i + 1], b = fd[i + 2];
      if (r > 248 && g > 248 && b > 248) {
        fd[i + 3] = 0;
      } else if (r > 225 && g > 225 && b > 225) {
        const diff = 255 - ((r + g + b) / 3);
        fd[i + 3] = Math.min(255, Math.round(diff * 10));
      }
    }
    fctx.putImageData(fullData, 0, 0);

    // 4. Dark Mode Optimized Full Logo (Luminous metallic white typography + vibrant 3D M)
    const darkCanvas = document.createElement('canvas');
    darkCanvas.width = cropW;
    darkCanvas.height = cropH;
    const dctx = darkCanvas.getContext('2d');
    dctx.drawImage(fullCanvas, 0, 0);
    const darkData = dctx.getImageData(0, 0, cropW, cropH);
    const dd = darkData.data;

    // Convert pixels to the right of markEndX from dark to bright white/silver
    for (let y = 0; y < cropH; y++) {
      for (let x = markW; x < cropW; x++) {
        const i = (y * cropW + x) * 4;
        const a = dd[i + 3];
        if (a > 10) {
          const r = dd[i], g = dd[i + 1], b = dd[i + 2];
          // Check if it's the blue sphere or cyan sphere
          const isBlueSphere = (b > 180 && r < 60 && g < 140);
          const isCyanSphere = (b > 160 && g > 160 && r < 60);

          if (!isBlueSphere && !isCyanSphere) {
            // Lighten the dark typography
            const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
            const lightness = Math.min(255, 235 + Math.round(brightness * 0.3));
            dd[i] = lightness;
            dd[i + 1] = Math.min(255, lightness + 4);
            dd[i + 2] = 255;
          }
        }
      }
    }
    dctx.putImageData(darkData, 0, 0);

    return {
      w, h,
      cropW, cropH,
      markW,
      mark: markCanvas.toDataURL('image/png'),
      fullLight: fullCanvas.toDataURL('image/png'),
      fullDark: darkCanvas.toDataURL('image/png'),
    };
  }, base64);

  console.log(`Original: ${result.w}x${result.h}, Cropped: ${result.cropW}x${result.cropH}, Mark: ${result.markW}x${result.cropH}`);

  const save = (dataUrl, filename) => {
    const data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), data, 'base64');
    console.log(`Saved: ${filename}`);
  };

  save(result.mark, 'mathru-mark.png');
  save(result.fullLight, 'mathru-logo-full-light.png');
  save(result.fullDark, 'mathru-logo-full-dark.png');

  // Also copy original source image
  fs.copyFileSync(UPLOAD_FILE, path.join(OUTPUT_DIR, 'mathru-logo-original.png'));

  await browser.close();
  console.log('New official logo processed successfully!');
}

main().catch(console.error);
