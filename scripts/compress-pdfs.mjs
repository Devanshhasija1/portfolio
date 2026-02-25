#!/usr/bin/env node

import { execSync } from 'child_process';
import { readdirSync, statSync, renameSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const MEDIA_DIR = join(process.cwd(), 'public', 'media');

// /screen = 72dpi (smallest, good for on-screen viewing)
// /ebook  = 150dpi (balanced)
// /printer = 300dpi (high quality)
const QUALITY = process.argv.includes('--high') ? '/ebook' : '/screen';

let gsPath;
try {
  gsPath = execSync('which gs 2>/dev/null || echo /opt/homebrew/bin/gs', { encoding: 'utf-8' }).trim();
  execSync(`"${gsPath}" --version`, { stdio: 'ignore' });
} catch {
  console.error(
    'Ghostscript (gs) is not installed.\n' +
    '  macOS:  brew install ghostscript\n' +
    '  Linux:  sudo apt install ghostscript\n'
  );
  process.exit(1);
}

const pdfs = readdirSync(MEDIA_DIR).filter(f => f.toLowerCase().endsWith('.pdf'));

if (pdfs.length === 0) {
  console.log('No PDFs found in public/media/');
  process.exit(0);
}

console.log(`\nCompressing ${pdfs.length} PDF(s) with quality=${QUALITY}…\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const pdf of pdfs) {
  const input = join(MEDIA_DIR, pdf);
  const output = join(MEDIA_DIR, `__compressed__${pdf}`);
  const sizeBefore = statSync(input).size;
  totalBefore += sizeBefore;

  try {
    execSync(
      `"${gsPath}" -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 ` +
      `-dPDFSETTINGS=${QUALITY} -dNOPAUSE -dQUIET -dBATCH ` +
      `-dColorImageResolution=150 -dGrayImageResolution=150 ` +
      `-dMonoImageResolution=150 ` +
      `-sOutputFile="${output}" "${input}"`,
      { stdio: 'pipe' }
    );

    const sizeAfter = statSync(output).size;

    if (sizeAfter < sizeBefore * 0.95) {
      unlinkSync(input);
      renameSync(output, input);
      totalAfter += sizeAfter;
      const pct = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0);
      console.log(
        `  ✓ ${pdf}: ${mb(sizeBefore)} → ${mb(sizeAfter)}  (${pct}% smaller)`
      );
    } else {
      unlinkSync(output);
      totalAfter += sizeBefore;
      console.log(`  – ${pdf}: ${mb(sizeBefore)} (already optimized)`);
    }
  } catch (e) {
    totalAfter += sizeBefore;
    console.error(`  ✗ ${pdf}: compression failed - ${e.message}`);
    if (existsSync(output)) unlinkSync(output);
  }
}

console.log(
  `\nTotal: ${mb(totalBefore)} → ${mb(totalAfter)}  ` +
  `(saved ${mb(totalBefore - totalAfter)})\n`
);

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + 'MB';
}
