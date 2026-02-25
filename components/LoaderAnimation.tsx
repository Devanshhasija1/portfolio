'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const BG = '#000000';
const COLOR = 'rgb(99,99,189)';
const COLOR_MID = 'rgb(90,90,173)';
const COLOR_DARK = 'rgb(74,74,140)';
const ALL_COLORS = [COLOR, COLOR_MID, COLOR_DARK];

const BAR_W = 58;
const BAR_GAP = 14;
const STRIDE = BAR_W + BAR_GAP;
const BAR_RADIUS = 8;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  r = Math.min(r, w / 2, h / 2);
  if (r < 0.5) { ctx.fillRect(x, y, w, h); return; }
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

// Logo: 4 bars with relative heights, shared baseline at bottom
const LOGO_HEIGHTS = [0.65, 1.0, 1.0, 0.65];
const LOGO_MAX_H_RATIO = 0.26; // max bar = 26% of viewport height

function mulberry32(seed: number) {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Bar {
  index: number;
  phase: number;
  speed: number;
  colorIdx: number;
  distFromCenter: number;
  logoTarget: number; // -1 = none, 0-3 = which logo bar
}

export default function LoaderAnimation({
  className,
  id,
  style,
}: {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    const setSize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      canvas.width = vw * dpr;
      canvas.height = vh * dpr;
      canvas.style.width = `${vw}px`;
      canvas.style.height = `${vh}px`;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const totalBars = Math.ceil(vw / STRIDE) + 4;
    const rng = mulberry32(42);
    const waveStartX = (vw - totalBars * STRIDE + BAR_GAP) / 2;

    // 4 logo bars centered, with STRIDE spacing
    const logoBlockW = 4 * BAR_W + 3 * BAR_GAP;
    const logoStartX = (vw - logoBlockW) / 2;
    const logoCenters = [0, 1, 2, 3].map(
      (j) => logoStartX + j * STRIDE + BAR_W / 2,
    );

    // Assign each wave bar to the nearest logo bar (only the 4 closest)
    const barWaveCenters = Array.from({ length: totalBars }, (_, i) =>
      waveStartX + i * STRIDE + BAR_W / 2,
    );

    const assigned = new Set<number>();
    const mid = totalBars / 2;
    const bars: Bar[] = Array.from({ length: totalBars }, (_, i) => {
      const dist = Math.abs(i - mid) / mid;
      return {
        index: i,
        phase: dist * Math.PI * 2.5,
        speed: 1,
        colorIdx: Math.floor(rng() * 3),
        distFromCenter: dist,
        logoTarget: -1,
      };
    });

    for (let li = 0; li < 4; li++) {
      let bestIdx = -1;
      let bestDist = Infinity;
      for (let bi = 0; bi < totalBars; bi++) {
        if (assigned.has(bi)) continue;
        const d = Math.abs(barWaveCenters[bi] - logoCenters[li]);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = bi;
        }
      }
      if (bestIdx >= 0) {
        bars[bestIdx].logoTarget = li;
        assigned.add(bestIdx);
      }
    }

    const state = {
      spread: 0,
      morph: 0,
      zoom: 1,
      waveAmp: 1,
    };

    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    tl.to(state, { spread: 1, duration: 0.6, ease: 'power2.out' }, 0);
    tl.to(state, { morph: 1, duration: 1, ease: 'power3.inOut' }, 1.2);
    tl.to(state, { waveAmp: 0, duration: 1, ease: 'power2.in' }, 1.2);
    tl.to(state, { zoom: 1.35, duration: 0.8, ease: 'power2.inOut' }, 2.4);
    tl.to(canvas, { opacity: 0, duration: 0.6, ease: 'power2.in' }, 3.6);
    tl.call(() => {
      cancelAnimationFrame(animRef.current);
      canvas.style.display = 'none';
    });

    // Remove the SSR black cover on first frame
    const cover = document.getElementById('preloader_cover');
    if (cover) cover.style.display = 'none';

    const render = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, vw, vh);

      const now = performance.now() * 0.003;
      const m = state.morph;
      const z = state.zoom;

      const logoMaxH = vh * LOGO_MAX_H_RATIO * z;
      const logoBaseY = vh / 2 + logoMaxH / 2;
      const logoCX = vw / 2;
      const zoomedLogoStartX = logoCX - (logoBlockW * z) / 2;

      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];

        const appear = gsap.utils.clamp(
          0, 1,
          (state.spread - bar.distFromCenter * 0.7) / 0.35,
        );
        if (appear <= 0 && m <= 0) continue;

        // Symmetric wave based on distance from center
        const d = bar.distFromCenter;
        const w1 = Math.sin(now * 1.0 + d * 8.0) * 0.5 + 0.5;
        const w2 = Math.sin(now * 1.6 + d * 5.0) * 0.5 + 0.5;
        const w3 = Math.sin(now * 0.5 + d * 12.0) * 0.5 + 0.5;
        const wave = w1 * 0.35 + w2 * 0.45 + w3 * 0.2;

        const waveH = wave * vh * 0.616 * state.waveAmp * appear;
        const waveTop = (vh - waveH) / 2;
        const waveX = waveStartX + i * STRIDE;

        if (bar.logoTarget >= 0) {
          const li = bar.logoTarget;
          const targetH = logoMaxH * LOGO_HEIGHTS[li];
          const targetTop = logoBaseY - targetH;
          const targetX = zoomedLogoStartX + li * STRIDE * z;
          const targetW = BAR_W * z;

          let drawX: number, drawW: number, drawTop: number, drawH: number;

          if (m >= 1) {
            drawX = Math.round(targetX);
            drawW = Math.round(targetW);
            drawTop = Math.round(targetTop);
            drawH = Math.round(targetH);
          } else {
            drawX = gsap.utils.interpolate(waveX, targetX, m);
            drawW = gsap.utils.interpolate(BAR_W, targetW, m);
            drawTop = gsap.utils.interpolate(waveTop, targetTop, m);
            drawH = gsap.utils.interpolate(waveH, targetH, m);
          }

          if (drawH > 0.5) {
            ctx.fillStyle = COLOR;
            roundRect(ctx, drawX, drawTop, drawW, drawH, BAR_RADIUS);
          }
        } else {
          const fadeOut = (1 - m) * appear;
          if (waveH > 0.5 && fadeOut > 0.01) {
            ctx.globalAlpha = fadeOut;
            ctx.fillStyle = ALL_COLORS[bar.colorIdx];
            roundRect(ctx, waveX, waveTop, BAR_W, waveH, BAR_RADIUS);
            ctx.globalAlpha = 1;
          }
        }
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animRef.current);
      tl.kill();
      window.removeEventListener('resize', setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 4,
        background: '#000',
        ...style,
      }}
    />
  );
}
