import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const UPLOAD_DIR = 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0\\.user_uploaded';
const OUTPUT_DIR = 'c:\\Users\\araja\\Desktop\\Tools Dev\\Mathru Labs\\mathru-labs-web\\public\\brand';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const v2Base64 = fs.readFileSync(path.join(UPLOAD_DIR, 'media_1790671150943.png')).toString('base64');
  const v1Base64 = fs.readFileSync(path.join(UPLOAD_DIR, 'media_1790671067739.png')).toString('base64');

  const cropped = await page.evaluate(async (v2Uri, v1Uri) => {
    const loadImg = (uri) => new Promise((res) => {
      const img = new Image();
      img.onload = () => res(img);
      img.src = uri;
    });

    const img2 = await loadImg(`data:image/png;base64,${v2Uri}`);
    const img1 = await loadImg(`data:image/png;base64,${v1Uri}`);

    // Crop icon from img2 cleanly:
    // img2 is 1024 x 409
    // Icon is from x: 80 to x: 430, y: 15 to y: 355
    const c2 = document.createElement('canvas');
    c2.width = 1024;
    c2.height = 409;
    const ctx2 = c2.getContext('2d');
    ctx2.drawImage(img2, 0, 0);

    // Bounding box for icon 2 strictly avoiding letter 'M' at x >= 440
    // We isolate x: 80 to 425
    const cropX = 75;
    const cropY = 10;
    const cropW = 355;
    const cropH = 345;

    const iconCanvas = document.createElement('canvas');
    iconCanvas.width = cropW;
    iconCanvas.height = cropH;
    const iconCtx = iconCanvas.getContext('2d');
    iconCtx.drawImage(c2, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

    // Remove white background with clean alpha
    const iconData = iconCtx.getImageData(0, 0, cropW, cropH);
    const d = iconData.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      if (r > 248 && g > 248 && b > 248) {
        d[i + 3] = 0;
      } else if (r > 230 && g > 230 && b > 230) {
        const diff = 255 - ((r + g + b) / 3);
        d[i + 3] = Math.min(255, Math.round(diff * 10));
      }
    }
    iconCtx.putImageData(iconData, 0, 0);

    // Also crop icon from img1 (flat vector style with central person/sprout)
    // img1 is 1024 x 341
    const c1 = document.createElement('canvas');
    c1.width = 1024;
    c1.height = 341;
    const ctx1 = c1.getContext('2d');
    ctx1.drawImage(img1, 0, 0);

    const c1Icon = document.createElement('canvas');
    c1Icon.width = 385;
    c1Icon.height = 330;
    const c1Ctx = c1Icon.getContext('2d');
    c1Ctx.drawImage(c1, 10, 5, 385, 330, 0, 0, 385, 330);
    const c1Data = c1Ctx.getImageData(0, 0, 385, 330);
    const d1 = c1Data.data;
    for (let i = 0; i < d1.length; i += 4) {
      const r = d1[i];
      const g = d1[i + 1];
      const b = d1[i + 2];
      if (r > 248 && g > 248 && b > 248) {
        d1[i + 3] = 0;
      } else if (r > 230 && g > 230 && b > 230) {
        const diff = 255 - ((r + g + b) / 3);
        d1[i + 3] = Math.min(255, Math.round(diff * 10));
      }
    }
    c1Ctx.putImageData(c1Data, 0, 0);

    return {
      icon3d: iconCanvas.toDataURL('image/png'),
      iconVector: c1Icon.toDataURL('image/png'),
    };
  }, v2Base64, v1Base64);

  const save = (dataUrl, filename) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), base64Data, 'base64');
    console.log(`Saved clean: ${filename}`);
  };

  save(cropped.icon3d, 'mathru-icon-3d-clean.png');
  save(cropped.iconVector, 'mathru-icon-vector-clean.png');

  await browser.close();
  console.log('Clean icon crops generated!');
}

main().catch(console.error);
