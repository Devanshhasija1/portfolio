#!/usr/bin/env node

import { execSync } from 'child_process';
import { readdirSync, statSync, renameSync, unlinkSync, existsSync } from 'fs';
import { join, parse } from 'path';

const MEDIA_DIR = join(process.cwd(), 'public', 'media');
const SOURCE_EXTS = ['.mp4', '.mov', '.avi', '.mkv'];

const CRF_MP4 = process.argv.includes('--high') ? '23' : '28';
const CRF_WEBM = process.argv.includes('--high') ? '28' : '35';

let ffmpegPath;
try {
  ffmpegPath = execSync('which ffmpeg', { encoding: 'utf-8' }).trim();
  execSync(`"${ffmpegPath}" -version`, { stdio: 'ignore' });
} catch {
  console.error(
    'ffmpeg is not installed.\n' +
    '  macOS:  brew install ffmpeg\n' +
    '  Linux:  sudo apt install ffmpeg\n'
  );
  process.exit(1);
}

const videos = readdirSync(MEDIA_DIR).filter(f =>
  SOURCE_EXTS.includes(f.slice(f.lastIndexOf('.')).toLowerCase())
);

if (videos.length === 0) {
  console.log('No source videos found in public/media/');
  process.exit(0);
}

console.log(`\nCompressing ${videos.length} video(s)…\n`);

let totalBefore = 0;
let totalAfter = 0;

for (const video of videos) {
  const input = join(MEDIA_DIR, video);
  const { name } = parse(video);
  const sizeBefore = statSync(input).size;
  totalBefore += sizeBefore;

  // --- MP4 (H.264) ---
  const mp4Out = join(MEDIA_DIR, `__compressed__${video}`);
  try {
    const hasAudio = execSync(
      `"${ffmpegPath}" -i "${input}" -hide_banner 2>&1 || true`,
      { encoding: 'utf-8' }
    ).includes('Audio:');

    const audioFlags = hasAudio ? '-c:a aac -b:a 128k' : '-an';

    execSync(
      `"${ffmpegPath}" -i "${input}" ` +
      `-c:v libx264 -crf ${CRF_MP4} -preset slow ` +
      `${audioFlags} -movflags +faststart -y "${mp4Out}"`,
      { stdio: 'pipe' }
    );

    const mp4Size = statSync(mp4Out).size;
    if (mp4Size < sizeBefore * 0.95) {
      unlinkSync(input);
      renameSync(mp4Out, input);
      totalAfter += mp4Size;
      const pct = ((1 - mp4Size / sizeBefore) * 100).toFixed(0);
      console.log(`  ✓ ${video} (mp4): ${mb(sizeBefore)} → ${mb(mp4Size)}  (${pct}% smaller)`);
    } else {
      unlinkSync(mp4Out);
      totalAfter += sizeBefore;
      console.log(`  – ${video} (mp4): ${mb(sizeBefore)} (already optimized)`);
    }
  } catch (e) {
    totalAfter += sizeBefore;
    console.error(`  ✗ ${video} (mp4): compression failed - ${e.message}`);
    if (existsSync(mp4Out)) unlinkSync(mp4Out);
  }

  // --- WebM (VP9) ---
  const webmOut = join(MEDIA_DIR, `${name}.webm`);
  const mp4Now = join(MEDIA_DIR, video);
  try {
    const hasAudio = execSync(
      `"${ffmpegPath}" -i "${mp4Now}" -hide_banner 2>&1 || true`,
      { encoding: 'utf-8' }
    ).includes('Audio:');

    const audioFlags = hasAudio ? '-c:a libopus -b:a 96k' : '-an';

    execSync(
      `"${ffmpegPath}" -i "${mp4Now}" ` +
      `-c:v libvpx-vp9 -crf ${CRF_WEBM} -b:v 0 ` +
      `${audioFlags} -y "${webmOut}"`,
      { stdio: 'pipe' }
    );

    const webmSize = statSync(webmOut).size;
    const mp4Size = statSync(mp4Now).size;
    if (webmSize < mp4Size * 0.95) {
      const pct = ((1 - webmSize / mp4Size) * 100).toFixed(0);
      console.log(`  ✓ ${name}.webm: ${mb(mp4Size)} → ${mb(webmSize)}  (${pct}% smaller than mp4)`);
    } else {
      console.log(`  – ${name}.webm: ${mb(webmSize)} (similar to mp4, kept for compatibility)`);
    }
  } catch (e) {
    console.error(`  ✗ ${name}.webm: conversion failed - ${e.message}`);
    if (existsSync(webmOut)) unlinkSync(webmOut);
  }
}

console.log(
  `\nMP4 total: ${mb(totalBefore)} → ${mb(totalAfter)}  ` +
  `(saved ${mb(totalBefore - totalAfter)})\n`
);

function mb(bytes) {
  return (bytes / 1024 / 1024).toFixed(1) + 'MB';
}
