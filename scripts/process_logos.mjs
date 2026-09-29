import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const UPLOAD_DIR = 'C:\\Users\\araja\\.gemini\\antigravity-ide\\brain\\492e88aa-b90f-4cb6-9f2a-9e23ef415fb0\\.user_uploaded';
const OUTPUT_DIR = 'c:\\Users\\araja\\Desktop\\Tools Dev\\Mathru Labs\\mathru-labs-web\\public\\brand';

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'],
  });

  const page = await browser.newPage();

  // Test both images
  const img1Path = path.join(UPLOAD_DIR, 'media_1790671067739.png');
  const img2Path = path.join(UPLOAD_DIR, 'media_1790671150943.png');

  console.log('Processing img1 (vector/flat-ish lockup)...', img1Path);
  console.log('Processing img2 (3D render lockup)...', img2Path);

  // We can load both and inspect dimensions
  const processImage = async (filePath, prefix) => {
    const base64 = fs.readFileSync(filePath).toString('base64');
    const dataUri = `data:image/png;base64,${base64}`;

    return await page.evaluate(async (uri, pfx) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          // 1. Get dimensions
          const w = img.naturalWidth;
          const h = img.naturalHeight;

          // 2. Draw to canvas
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          const imgData = ctx.getImageData(0, 0, w, h);
          const data = imgData.data;

          // Check background (white removal)
          // Any pixel close to white (r>240, g>240, b>240) can have alpha calculated smoothly
          const transCanvas = document.createElement('canvas');
          transCanvas.width = w;
          transCanvas.height = h;
          const transCtx = transCanvas.getContext('2d');
          const transData = transCtx.createImageData(w, h);

          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            // White removal algorithm with soft anti-aliased edge
            const brightness = (r + g + b) / 3;
            const diff = 255 - brightness;

            if (r > 248 && g > 248 && b > 248) {
              transData.data[i + 3] = 0; // completely transparent
            } else if (r > 230 && g > 230 && b > 230) {
              // Soft fade
              const alphaRatio = diff / 25;
              transData.data[i] = r;
              transData.data[i + 1] = g;
              transData.data[i + 2] = b;
              transData.data[i + 3] = Math.min(255, Math.round(255 * alphaRatio));
            } else {
              transData.data[i] = r;
              transData.data[i + 1] = g;
              transData.data[i + 2] = b;
              transData.data[i + 3] = a;
            }
          }

          transCtx.putImageData(transData, 0, 0);

          resolve({
            width: w,
            height: h,
            fullTransparent: transCanvas.toDataURL('image/png'),
          });
        };
        img.src = uri;
      });
    }, dataUri, prefix);
  };

  const res1 = await processImage(img1Path, 'logo1');
  const res2 = await processImage(img2Path, 'logo2');

  console.log(`Image 1 dimensions: ${res1.width} x ${res1.height}`);
  console.log(`Image 2 dimensions: ${res2.width} x ${res2.height}`);

  // Save transparent versions
  const saveBase64 = (dataUrl, filename) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(OUTPUT_DIR, filename), base64Data, 'base64');
    console.log(`Saved: ${filename}`);
  };

  saveBase64(res1.fullTransparent, 'logo-v1-transparent.png');
  saveBase64(res2.fullTransparent, 'logo-v2-transparent.png');

  // Also copy original source files directly
  fs.copyFileSync(img1Path, path.join(OUTPUT_DIR, 'logo-v1-original.png'));
  fs.copyFileSync(img2Path, path.join(OUTPUT_DIR, 'logo-v2-original.png'));

  await browser.close();
  console.log('Logo processing completed successfully!');
}

main().catch(console.error);
