#!/usr/bin/env node

import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, existsSync, mkdirSync } from 'fs';
import { join, parse, extname } from 'path';

const DIRS = [
  join(process.cwd(), 'public', 'images'),
  join(process.cwd(), 'public', 'snapshot-images'),
];

const IMG_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);
const HIGH = process.argv.includes('--high');
const JPEG_QUALITY = HIGH ? 85 : 75;
const PNG_QUALITY = HIGH ? 85 : 75;
const WEBP_QUALITY = HIGH ? 85 : 75;
const MAX_WIDTH = process.argv.includes('--no-resize') ? null : 1920;

let totalBefore = 0;
let totalAfter = 0;
let fileCount = 0;

for (const dir of DIRS) {
  if (!existsSync(dir)) continue;

  const files = readdirSync(dir).filter(f =>
    IMG_EXTS.has(extname(f).toLowerCase())
  );

  if (files.length === 0) continue;

  console.log(`\n📁 ${dir.replace(process.cwd() + '/', '')}/  (${files.length} images)\n`);

  for (const file of files) {
    const input = join(dir, file);
    const ext = extname(file).toLowerCase();
    const sizeBefore = statSync(input).size;
    totalBefore += sizeBefore;
    fileCount++;

    try {
      let pipeline = sharp(input, { animated: ext === '.gif' });

      if (MAX_WIDTH && ext !== '.gif' && ext !== '.svg') {
        const meta = await pipeline.metadata();
        if (meta.width && meta.width > MAX_WIDTH) {
          pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
        }
      }

      let buffer;
      if (ext === '.jpg' || ext === '.jpeg') {
        buffer = await pipeline
          .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
          .toBuffer();
      } else if (ext === '.png') {
        buffer = await pipeline
          .png({ quality: PNG_QUALITY, compressionLevel: 9, palette: true })
          .toBuffer();
      } else if (ext === '.webp') {
        buffer = await pipeline
          .webp({ quality: WEBP_QUALITY, effort: 6 })
          .toBuffer();
      } else if (ext === '.gif') {
        buffer = await pipeline
          .gif({ effort: 10 })
          .toBuffer();
      } else {
        totalAfter += sizeBefore;
        continue;
      }

      const sizeAfter = buffer.length;

      if (sizeAfter < sizeBefore * 0.95) {
        await sharp(buffer).toFile(input);
        totalAfter += sizeAfter;
        const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0);
        console.log(`  ✓ ${file}: ${kb(sizeBefore)} → ${kb(sizeAfter)}  (${pct}% smaller)`);
      } else {
        totalAfter += sizeBefore;
        console.log(`  – ${file}: ${kb(sizeBefore)} (already optimized)`);
      }
    } catch (e) {
      totalAfter += sizeBefore;
      console.error(`  ✗ ${file}: failed - ${e.message}`);
    }
  }
}

if (fileCount === 0) {
  console.log('No images found.');
} else {
  console.log(
    `\nTotal: ${kb(totalBefore)} → ${kb(totalAfter)}  ` +
    `(saved ${kb(totalBefore - totalAfter)}) across ${fileCount} images\n`
  );
}

function kb(bytes) {
  if (bytes > 1024 * 1024) return (bytes / 1024 / 1024).toFixed(1) + ' MB';
  return (bytes / 1024).toFixed(0) + ' KB';
}
