import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SOURCE_IMG = 'c:\\Users\\araja\\Desktop\\Tools Dev\\Mathru Labs\\mathru-labs-web\\public\\brand\\site-identity-512.png';
const BASE_DIR = 'c:\\Users\\araja\\Desktop\\Tools Dev\\Mathru Labs\\mathru-labs-web';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();
  const fileBuf = fs.readFileSync(SOURCE_IMG);
  const b64 = fileBuf.toString('base64');

  // Generate 16x16, 32x32, 48x48 PNG buffers
  const pngs = await page.evaluate(async (data) => {
    const img = new Image();
    await new Promise(r => { img.onload = r; img.src = 'data:image/png;base64,' + data; });

    const renderSize = (s) => {
      const c = document.createElement('canvas');
      c.width = s;
      c.height = s;
      const ctx = c.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, s, s);
      return c.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
    };

    return {
      s16: renderSize(16),
      s32: renderSize(32),
      s48: renderSize(48),
      s64: renderSize(64),
    };
  }, b64);

  await browser.close();

  const b16 = Buffer.from(pngs.s16, 'base64');
  const b32 = Buffer.from(pngs.s32, 'base64');
  const b48 = Buffer.from(pngs.s48, 'base64');
  const buf64 = Buffer.from(pngs.s64, 'base64');

  const images = [
    { width: 16, height: 16, buf: b16 },
    { width: 32, height: 32, buf: b32 },
    { width: 48, height: 48, buf: b48 },
    { width: 64, height: 64, buf: buf64 },
  ];

  // Build ICO file
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = icon
  header.writeUInt16LE(count, 4); // count

  let offset = 6 + count * 16;
  const dirEntries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // planes
    entry.writeUInt16LE(32, 6); // bit count
    entry.writeUInt32LE(img.buf.length, 8); // size
    entry.writeUInt32LE(offset, 12); // offset
    dirEntries.push(entry);
    offset += img.buf.length;
  }

  const icoBuf = Buffer.concat([
    header,
    ...dirEntries,
    ...images.map(img => img.buf)
  ]);

  // Write to all locations
  fs.writeFileSync(path.join(BASE_DIR, 'src', 'app', 'favicon.ico'), icoBuf);
  fs.writeFileSync(path.join(BASE_DIR, 'public', 'favicon.ico'), icoBuf);

  console.log(`Generated favicon.ico with ${count} sizes (${icoBuf.length} bytes).`);
}

main().catch(console.error);
