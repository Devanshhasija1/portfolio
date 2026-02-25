// @ts-nocheck
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import Navbar from '@/components/Navbar';

const snapshots = [
  { image: 'mockup-0.jpg', title: 'Spyne.ai Brand Book', tags: 'Branding ∙ Webflow ∙ Lottie' },
  { image: 'mockup-1.jpeg', title: 'CryptoCase', tags: 'Product Design ∙ Animation' },
  { image: 'mockup-2.jpeg', title: 'Shuttl', tags: 'Product Design' },
  { image: 'mockup-3.jpeg', title: 'Chair Wala Brand', tags: 'Product Design ∙ Branding' },
  { image: 'mockup-4.jpeg', title: 'CryptoCase', tags: 'Web Design' },
  { image: 'mockup-5.jpeg', title: 'NFTapparel', tags: 'Graphic Design ∙ Product Design' },
  { image: 'mockup-6.jpeg', title: 'Incepthink', tags: 'Experiment ∙ Webflow ∙ Interactions' },
  { image: 'mockup-7.jpeg', title: 'PearMó', tags: 'Brand Design ∙ Product Design' },
  { image: 'mockup-8.jpeg', title: 'Coalescence', tags: 'Web Design' },
  { image: 'mockup-9.jpeg', title: 'CareShare', tags: 'Product Design' },
  { image: 'mockup-10.jpeg', title: 'Instagram Filter - CRY', tags: 'Experiment' },
  { image: 'mockup-11.jpeg', title: 'A.L.I.E.', tags: 'Product Design ∙ Movie ∙ Experiment' },
  { image: 'mockup-12.jpeg', title: 'IDentriX', tags: 'Product Design' },
  { image: 'mockup-13.jpeg', title: 'HexBIS', tags: 'Brand Design ∙ Product Design ∙ Animation' },
  { image: 'mockup-14.jpeg', title: 'Serendipity Art Festival', tags: 'Animation' },
  { image: 'mockup-15.jpeg', title: 'Microworld NFT', tags: 'Photoshop ∙ Digital Art ∙ Experiment' },
  { image: 'mockup-16.jpeg', title: 'Budget Planner', tags: 'Product Design' },
  { image: 'mockup-17.jpeg', title: 'Paytm Redesign', tags: 'Product Design ∙ Experiment' },
  { image: 'mockup-18.jpeg', title: 'Comic Book', tags: 'Drawing' },
  { image: 'mockup-19.jpeg', title: 'Dekh Zara Album Art', tags: 'Rap ∙ Music ∙ Experiment' },
  { image: 'mockup-20.jpeg', title: 'Jahannum Refix Album Art', tags: 'Rap ∙ Music ∙ Experiment' },
  { image: 'mockup-21.jpeg', title: 'Pride Travel', tags: 'Branding ∙ Product Design' },
  { image: 'mockup-22.jpeg', title: 'YouthSchool', tags: 'Branding ∙ Product Design' },
  { image: 'mockup-23.jpeg', title: 'Interactive Website Loader', tags: 'Graphic Design ∙ Experiment' },
  { image: 'mockup-24.jpeg', title: 'Bobble Heads NFT', tags: 'Illustrator ∙ Web Design ∙ Experiment' },
  { image: 'mockup-25.jpeg', title: 'DigiFLy', tags: 'Product Design ∙ Experiment' },
  { image: 'mockup-26.jpeg', title: 'Hotel Booking App', tags: 'Product Design ∙ Experiment' },
];

export default function SnapshotsClient() {
  const [lightbox, setLightbox] = useState<{ src: string; title: string; tags: string } | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const openLightboxRef = useRef<(data: { src: string; title: string; tags: string }) => void>();

  openLightboxRef.current = useCallback((data: { src: string; title: string; tags: string }) => {
    setLightbox(data);
  }, []);

  const closeLightbox = useCallback(() => {
    const el = lightboxRef.current;
    if (!el) { setLightbox(null); return; }
    gsap.to(el, {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => setLightbox(null),
    });
    gsap.to(el.querySelector('.snapshot-lightbox-content'), {
      scale: 0.9,
      duration: 0.35,
      ease: 'power2.inOut',
    });
  }, []);

  useEffect(() => {
    if (!lightbox || !lightboxRef.current) return;
    const el = lightboxRef.current;
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
    gsap.fromTo(
      el.querySelector('.snapshot-lightbox-content'),
      { scale: 0.85, y: 30 },
      { scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [lightbox]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeLightbox]);

  useEffect(() => {
    const checkDragdealer = setInterval(() => {
      if (typeof (window as Record<string, unknown>).Dragdealer !== 'undefined') {
        clearInterval(checkDragdealer);
        initPlayground();
      }
    }, 100);

    return () => clearInterval(checkDragdealer);
  }, []);

  function initPlayground() {
    const Dragdealer = (window as Record<string, unknown>).Dragdealer as new (el: HTMLElement, opts: Record<string, unknown>) => { getValue: () => number[] };
    const section = document.querySelector('.draggable_section') as HTMLElement;
    if (!section) return;

    const canvas = section.querySelector('.draggable_canvas') as HTMLElement;
    const listClass = 'draggable_list';
    const list = section.querySelector('.' + listClass) as HTMLElement;
    const titleText = section.querySelector('.draggable_title_text') as HTMLElement;
    const tagsText = section.querySelector('.draggable_tags_text') as HTMLElement;
    const items = section.querySelectorAll('.draggable_item');
    const scaleEl = section.querySelector('.draggable-scale') as HTMLElement;
    const steps = 11;

    const allItems = Array.from(items);
    const originalOpacity = allItems[0] ? getComputedStyle(allItems[0]).opacity : '1';

    // Clone items to fill 121 grid (11x11)
    let count = allItems.length;
    if (count % steps === 0) {
      allItems[allItems.length - 1]?.remove();
      count--;
    }
    for (let i = count; i < 121; i++) {
      const clone = allItems[i % count]?.cloneNode(true) as HTMLElement;
      if (clone) list.appendChild(clone);
    }

    const finalItems = section.querySelectorAll('.draggable_item');
    gsap.set(list, { width: '1100%', height: '1100%' });
    gsap.set(finalItems, { width: 100 / steps + '%', height: 100 / steps + '%' });
    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1 });

    const imgs = section.querySelectorAll('.draggable_img');
    const imgHoverTL = gsap.timeline({ paused: true, defaults: { duration: 0.4 } });
    imgHoverTL.fromTo(
      imgs,
      { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' },
      { clipPath: 'polygon(3% 3%, 97% 3%, 97% 97%, 3% 97%)' }
    );
    if (scaleEl) imgHoverTL.to(scaleEl, { scale: 1.1 }, '<');
    if (titleText) imgHoverTL.to(titleText, { filter: 'blur(30px)', opacity: 0, yPercent: 100 }, '<');
    if (tagsText) imgHoverTL.to(tagsText, { filter: 'blur(30px)', opacity: 0, yPercent: 100 }, '<');

    function showInfo(xVal: number, yVal: number) {
      const col = Math.round(10 * xVal) + 1;
      const row = Math.round(10 * yVal) + 1;
      const idx = (row - 1) * steps + col - 1;
      const item = finalItems[idx];
      if (!item) return;
      const titleEl = item.querySelector('.draggable_title');
      const tagsEl = item.querySelector('.draggable_tags');
      if (titleText && titleEl) titleText.textContent = titleEl.textContent;
      if (tagsText && tagsEl) tagsText.textContent = tagsEl.textContent;
      gsap.to(item, { opacity: 1, duration: 0.3 });
    }

    let isSnapping = false;
    let mouseDownPos = { x: 0, y: 0 };
    const DRAG_THRESHOLD = 6;

    canvas.addEventListener('mousedown', (e) => {
      mouseDownPos = { x: e.clientX, y: e.clientY };
    }, true);

    const dealer = new Dragdealer(canvas, {
      handleClass: listClass,
      x: 0.5,
      y: 0.5,
      steps: steps,
      horizontal: true,
      vertical: true,
      speed: 0.1,
      loose: false,
      slide: true,
      tapping: false,
      requestAnimationFrame: true,
      dragStartCallback: function () {
        section.classList.add('is-grabbing');
        gsap.to(finalItems, { opacity: originalOpacity, duration: 0.15 });
        imgHoverTL.play();
      },
      dragStopCallback: function () {
        section.classList.remove('is-grabbing');
        imgHoverTL.reverse();
      },
      callback: function (x: number, y: number) {
        showInfo(x, y);
      },
    });

    let snapTarget = { x: -1, y: -1 };

    function snapTo(targetX: number, targetY: number) {
      if (isSnapping) return;
      isSnapping = true;

      dealer.disable();

      const availW = canvas.offsetWidth - list.offsetWidth;
      const availH = canvas.offsetHeight - list.offsetHeight;
      const endX = Math.round(targetX * availW);
      const endY = Math.round(targetY * availH);

      gsap.to(list, {
        x: endX,
        y: endY,
        duration: 0.45,
        ease: 'expo.out',
        onComplete: () => {
          dealer.enable();
          dealer.setValue(targetX, targetY, true);
          showInfo(targetX, targetY);
          isSnapping = false;
        },
      });
    }

    const itemsArray = Array.from(finalItems);
    itemsArray.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dx = e.clientX - mouseDownPos.x;
        const dy = e.clientY - mouseDownPos.y;
        if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD || isSnapping) return;

        const col = index % steps;
        const row = Math.floor(index / steps);
        const targetX = col / (steps - 1);
        const targetY = row / (steps - 1);

        const currentVal = dealer.getValue();
        const currentCol = Math.round(currentVal[0] * (steps - 1));
        const currentRow = Math.round(currentVal[1] * (steps - 1));

        if (col === currentCol && row === currentRow && !isSnapping) {
          const img = item.querySelector('.draggable_img');
          const titleEl = item.querySelector('.draggable_title');
          const tagsEl = item.querySelector('.draggable_tags');
          if (img && openLightboxRef.current) {
            openLightboxRef.current({
              src: img.getAttribute('src') || '',
              title: titleEl?.textContent || '',
              tags: tagsEl?.textContent || '',
            });
          }
        } else {
          snapTo(targetX, targetY);
        }
      });
    });

    const initialVal = dealer.getValue();
    showInfo(initialVal[0], initialVal[1]);

    // Preloader animation
    new SplitType('[text-split]', { types: 'chars', tagName: 'span' });
    const welcomeEl = document.querySelector('[welcome]');
    const playgroundEl = document.querySelector('[playground]');
    const dragEl = document.querySelector('[drag]');
    const preloaderWrapper = document.querySelector('[preloader-wrapper]');
    const playContainer = document.querySelector('.play-container');
    const itemLinks = document.querySelectorAll('.draggable_link');
    const blackOverlay = document.querySelector('.top-black-overlay');

    const tl = gsap.timeline({ defaults: { duration: 0.95, ease: 'Expo.easeInOut' } });
    if (blackOverlay) tl.to(blackOverlay, { opacity: 0, duration: 0.7 });
    if (welcomeEl) tl.from(welcomeEl.querySelectorAll('.char'), { opacity: 0, yPercent: 25, stagger: { each: 0.03 } }, '<');
    if (playgroundEl) tl.from(playgroundEl.querySelectorAll('.char'), { opacity: 0, yPercent: 25, delay: 0.15, stagger: { each: 0.03 } }, '<');
    if (welcomeEl) tl.to(welcomeEl.querySelectorAll('.char'), { opacity: 0, yPercent: -25, stagger: { each: 0.03 } });
    if (playgroundEl) tl.to(playgroundEl.querySelectorAll('.char'), { opacity: 0, yPercent: -25, delay: 0.15, stagger: { each: 0.03 } }, '<');
    if (dragEl) tl.from(dragEl.querySelectorAll('.char'), { opacity: 0, yPercent: 25, stagger: { each: 0.015 } }, '<');
    if (dragEl) tl.to(dragEl.querySelectorAll('.char'), { opacity: 0, yPercent: -25, stagger: { each: 0.015 } });
    if (playContainer) tl.to(playContainer, { borderRadius: 8 }, '<');
    if (preloaderWrapper) tl.to(preloaderWrapper, { opacity: 0, delay: 0.5 }, '<');
    if (itemLinks.length) {
      tl.from(itemLinks, {
        opacity: 0,
        scale: 0.8,
        duration: 1.8,
        ease: 'Expo.easeOut',
        stagger: { each: 0.07, from: 'center', grid: 'auto' },
        delay: 0.2,
      }, '<');
    }
  }

  return (
    <>
      <Script src="/js/dragdealer.min.js" strategy="afterInteractive" />
      <style jsx global>{`
        .draggable_section { height: 100svh; }
        .draggable_canvas { opacity: 0; }
        .draggable_overlay { pointer-events: none; }
        body { overscroll-behavior-y: none; }
        .draggable_section.is-grabbing { cursor: grabbing; }
        .draggable_title, .draggable_tags { display: none; }
        .draggable_item { cursor: pointer; }

        .snapshot-lightbox {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          cursor: pointer;
        }
        .snapshot-lightbox-content {
          position: relative;
          max-width: 92vw;
          max-height: 94vh;
          cursor: default;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .snapshot-lightbox-img {
          max-width: 100%;
          max-height: 88vh;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }
        .snapshot-lightbox-info {
          margin-top: 20px;
          text-align: center;
        }
        .snapshot-lightbox-title {
          font-size: 1.4rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 6px;
        }
        .snapshot-lightbox-tags {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
          letter-spacing: 0.03em;
        }
        .snapshot-lightbox-close {
          position: absolute;
          top: -44px;
          right: -4px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          padding: 8px;
          transition: color 0.2s, transform 0.2s;
          z-index: 1;
        }
        .snapshot-lightbox-close:hover {
          color: #fff;
          transform: scale(1.15);
        }
        @media (max-width: 768px) {
          .snapshot-lightbox-content { max-width: 92vw; }
          .snapshot-lightbox-title { font-size: 1.1rem; }
          .snapshot-lightbox-close { top: -40px; right: 0; }
        }
      `}</style>

      <div className="top-black-overlay no-click black"></div>
      <div className="page-wrapper playground">
        <div className="background-waves-wrapper no-click playground">
          <div className="bg-color"></div>
          <div className="bg-blur"></div>
          <div className="video-waves-embed w-embed">
            <div style={{ width: '100%', height: '100%' }} className="w-background-video w-background-video-atom">
              <video id="bg_video" playsInline loop muted autoPlay data-object-fit="cover">
                <source src="/media/waves.webm" type="video/webm" />
                <source src="/media/waves.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="main-wrapper playground">
          <div className="draggable_section">
            <div className="draggable_canvas draggable-width">
              <div className="draggable_wrap draggable-height">
                <div className="draggable_list">
                  {snapshots.map((snap, i) => (
                    <div key={i} className="draggable_item">
                      <div className="draggable_link w-inline-block">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/snapshot-images/${snap.image}`}
                          loading="eager"
                          alt={snap.title}
                          className="draggable_img"
                        />
                        <div className="draggable_title">{snap.title}</div>
                        <div className="draggable_tags">{snap.tags}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="draggable_overlay no-click">
              <div className="draggable_lines">
                <div className="draggable_box"></div>
                <div className="draggable_box"></div>
                <div className="draggable_box"></div>
                <div className="draggable_box"></div>
                <div className="draggable-scale">
                  <div className="draggable_circle">
                    <div className="aspect-square"></div>
                  </div>
                </div>
              </div>
              <div className="draggable-width">
                <div className="draggable-scale">
                  <div className="draggable_corner"><div className="aspect-square"></div></div>
                  <div className="draggable_corner is-2"><div className="aspect-square"></div></div>
                  <div className="draggable_corner is-3"><div className="aspect-square"></div></div>
                  <div className="draggable_corner is-4"><div className="aspect-square"></div></div>
                </div>
                <div className="draggable-height"></div>
              </div>
              <div className="draggable_title_wrap">
                <div className="draggable_title_text"> </div>
                <div className="margin-top">
                  <div className="draggable_tags_text"> </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="play-preloader-wrapper no-click" preloader-wrapper="">
          <div className="play-container">
            <div className="play-pre-text-wrapper">
              <div className="text-wrapper center-mob">
                <div className="text-style-big welcome" welcome="" text-split="">Welcome to</div>
              </div>
              <div className="text-wrapper play-padding">
                <h2 className="text-style-h2 text-color-purple playground" playground="" text-split="">
                  <span className="text-style-h2-alt">Snapshots</span>
                </h2>
              </div>
            </div>
            <div className="dragme-abs-text hide">
              <div className="text-wrapper">
                <div className="text-style-big drag" drag="" text-split="">
                  Drag around to explore snaps of my life and work
                </div>
              </div>
            </div>
          </div>
        </div>

        <Navbar />
      </div>

      {lightbox && (
        <div
          ref={lightboxRef}
          className="snapshot-lightbox"
          onClick={closeLightbox}
        >
          <div className="snapshot-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="snapshot-lightbox-close" onClick={closeLightbox} aria-label="Close">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <Image
              src={lightbox.src}
              alt={lightbox.title}
              width={1200}
              height={800}
              className="snapshot-lightbox-img"
              style={{ width: 'auto', height: 'auto' }}
              sizes="85vw"
              quality={85}
              priority
            />
            <div className="snapshot-lightbox-info">
              <h3 className="snapshot-lightbox-title">{lightbox.title}</h3>
              <p className="snapshot-lightbox-tags">{lightbox.tags}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
