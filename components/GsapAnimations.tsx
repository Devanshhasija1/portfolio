// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

function waitForReady(): Promise<void> {
  return new Promise((resolve) => {
    if (document.readyState === 'complete') return resolve();
    window.addEventListener('load', () => resolve(), { once: true });
  });
}

export default function GsapAnimations() {
  useEffect(() => {
    ScrollTrigger.defaults({ markers: false });

    const isRepeatVisit = (() => {
      try {
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const isReload = navEntry?.type === 'reload';
        if (isReload) return false;
        return sessionStorage.getItem('preloaderSeen') === '1';
      } catch { return false; }
    })();

    // ── Shared page animations (scroll triggers, hovers, parallax, etc.) ──
    function initPageAnimations() {
      new SplitType('[text-split]', { types: 'chars', tagName: 'span' });

      let splitInstance: SplitType;

      function initSplitLines() {
        splitInstance = new SplitType('.split-lines', {
          types: 'lines,words',
          tagName: 'span',
        });

        document.querySelectorAll('.split-lines .line').forEach((line) => {
          const mask = document.createElement('div');
          mask.className = 'line-mask';
          line.appendChild(mask);
        });

        document.querySelectorAll('.line').forEach((line) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: line,
                start: 'top 80%',
                end: 'top 60%',
                scrub: 1,
              },
            })
            .to(line.querySelector('.line-mask'), { width: '0%', duration: 1 });
        });
      }

      document.querySelectorAll('[letter-fade]').forEach((el) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'top 80%',
              toggleActions: 'none play none reverse',
            },
          })
          .from(el.querySelectorAll('.char'), {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.out',
            stagger: { each: 0.08, from: 'start' },
          });
      });

      initSplitLines();

      let windowWidth = window.innerWidth;
      window.addEventListener('resize', () => {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          if (splitInstance) splitInstance.revert();
          initSplitLines();
        }
      });

      // Crystal scroll parallax
      document.querySelectorAll('.crystal-scroll').forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });

      const mm = gsap.matchMedia();

      // Crystal head fade on scroll
      mm.add('(min-width: 992px)', () => {
        gsap.to('.crystal-head', {
          opacity: 0,
          scale: 0.5,
          stagger: { each: 0.3, from: 'start' },
          scrollTrigger: {
            start: 'top top+=16',
            end: '10% top',
            trigger: '.sc-header.c-header',
            scrub: 1,
          },
        });
      });
      mm.add('(max-width: 991px)', () => {
        gsap.to('.crystal-head', {
          opacity: 0,
          scale: 0.5,
          stagger: { each: 0.3, from: 'start' },
          scrollTrigger: {
            start: 'top top+=16',
            end: '10% top',
            trigger: '.sc-header.tab-header',
            scrub: 1,
          },
        });
      });

      // Hover stagger text animations
      new SplitType("[hoverstagger='text']", { types: 'chars', tagName: 'span' });

      document.querySelectorAll("[hoverstagger='link']").forEach((el) => {
        const text1 = el.querySelectorAll("[hoverstagger='text']")[0];
        const text2 = el.querySelectorAll("[hoverstagger='text']")[1];
        if (!text1 || !text2) return;

        gsap
          .timeline({
            scrollTrigger: {
              trigger: text1,
              start: 'top bottom',
              end: 'top 90%',
              toggleActions: 'none play none reverse',
            },
          })
          .from(text1.querySelectorAll('.char'), {
            opacity: 0,
            ease: 'power2.out',
            stagger: { each: 0.1, from: 'start' },
          });

        const hoverTL = gsap.timeline({
          paused: true,
          defaults: { duration: 0.5, ease: 'power2.out' },
        });
        hoverTL.to(text1.querySelectorAll('.char'), {
          yPercent: -110,
          duration: 0.3,
          stagger: { amount: 0.2 },
        });
        hoverTL.from(
          text2.querySelectorAll('.char'),
          { yPercent: 100, duration: 0.3, stagger: { amount: 0.2 } },
          0
        );

        el.addEventListener('mouseenter', () => hoverTL.play());
        el.addEventListener('mouseleave', () => hoverTL.reverse());
      });

      // Desktop-specific animations
      mm.add('(min-width: 992px)', () => {
        new SplitType("[linefade='text']", { types: 'lines', tagName: 'span' });
        new SplitType("[linefade='heading']", { types: 'chars', tagName: 'span' });

        document.querySelectorAll("[linefade='link']").forEach((el) => {
          const heading1 = el.querySelectorAll("[linefade='heading']")[0];
          const heading2 = el.querySelectorAll("[linefade='heading']")[1];
          if (!heading1) return;

          gsap
            .timeline({
              scrollTrigger: {
                trigger: heading1,
                start: 'top bottom',
                end: 'top 90%',
                toggleActions: 'none play none reverse',
              },
            })
            .from(heading1.querySelectorAll('.char'), {
              opacity: 0,
              ease: 'power2.out',
              stagger: { each: 0.1, from: 'start' },
            });

          if (heading2) {
            const linkHoverTL = gsap.timeline({
              paused: true,
              defaults: { duration: 0.5, ease: 'power2.out' },
            });
            linkHoverTL.to(heading1.querySelectorAll('.char'), {
              yPercent: -110,
              duration: 0.3,
              stagger: { amount: 0.2 },
            });
            linkHoverTL.from(
              heading2.querySelectorAll('.char'),
              { yPercent: 100, duration: 0.3, stagger: { amount: 0.2 } },
              0
            );
            el.addEventListener('mouseenter', () => linkHoverTL.play());
            el.addEventListener('mouseleave', () => linkHoverTL.reverse());
          }

          const textEl = el.querySelector("[linefade='text']");
          if (textEl) {
            const textHoverTL = gsap.timeline({ paused: true });
            textHoverTL.from(textEl.querySelectorAll('.line'), {
              yPercent: 100,
              opacity: 0,
              duration: 0.3,
              stagger: { amount: 0.15 },
            });
            el.addEventListener('mouseenter', () => {
              textHoverTL.play();
              el.querySelector('.fill')?.classList.add('expand');
            });
            el.addEventListener('mouseleave', () => {
              textHoverTL.reverse();
              el.querySelector('.fill')?.classList.remove('expand');
            });
          } else if (el.querySelector('.fill')) {
            el.addEventListener('mouseenter', () => {
              el.querySelector('.fill')?.classList.add('expand');
            });
            el.addEventListener('mouseleave', () => {
              el.querySelector('.fill')?.classList.remove('expand');
            });
          }

          el.querySelector('.point-top')?.addEventListener('mouseleave', () => {
            el.querySelector('.fill')?.classList.remove('bottom');
            el.querySelector('.noise-img')?.classList.remove('bottom');
            el.querySelector('.sc-highlightwrapper')?.classList.remove('bottom');
          });
          el.querySelector('.point-bottom')?.addEventListener('mouseleave', () => {
            el.querySelector('.fill')?.classList.add('bottom');
            el.querySelector('.noise-img')?.classList.add('bottom');
            el.querySelector('.sc-highlightwrapper')?.classList.add('bottom');
          });

          const highlightEl = el.querySelector('.sc-highlightwrapper');
          if (highlightEl) {
            el.addEventListener('mousemove', (e: MouseEvent) => {
              const rect = (el as HTMLElement).getBoundingClientRect();
              const xPct = (e.clientX - rect.left) / rect.width - 0.5;
              const yPct = (e.clientY - rect.top) / rect.height - 0.5;
              gsap.to(highlightEl, {
                x: xPct * rect.width * 0.4,
                y: yPct * rect.height * 0.5,
                duration: 0.4,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            });
            el.addEventListener('mouseleave', () => {
              gsap.to(highlightEl, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            });
          }
        });

        // Desktop hero scroll animations
        document.querySelectorAll('.sc-header.c-header').forEach((header) => {
          const profilePic = document.querySelector('.profile_pic-wrapper') as HTMLElement;
          const videoEmbed = document.querySelector('.video-embed-wrapper') as HTMLElement;
          const showreelText = document.querySelector('.showreel-text-wrapper') as HTMLElement;

          if (videoEmbed) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: '24% top', end: '25% top', toggleActions: 'none play none reverse' },
            }).to(videoEmbed, { opacity: 1 });
          }
          if (showreelText) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: '24% top', end: '25% top', toggleActions: 'none play none reverse' },
            }).to(showreelText, { opacity: 1 });
          }
          if (profilePic) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: '17% top', end: 'bottom bottom', scrub: 2 },
            }).fromTo(
              profilePic,
              { width: '11.5em', height: '7em', x: '0em', y: '0em', borderRadius: '6em', duration: 1 },
              { width: '100%', height: '80vh', x: '-33em', y: '14em', borderRadius: '0em', duration: 1 }
            );
          }

          const h1Split = new SplitType(header.querySelector('.text-style-h1') as HTMLElement, { types: 'words,chars', tagName: 'span' });
          if (h1Split) {
            const h1El = header.querySelector('.text-style-h1');
            if (h1El) {
              gsap.timeline({
                scrollTrigger: { trigger: header, start: '3% top', end: '13% top', scrub: 1.5 },
              }).to(h1El.querySelectorAll('.char'), { y: '-120%', duration: 1 });
            }
          }

          const h1AltSplit = new SplitType(header.querySelector('.text-style-h1-alt') as HTMLElement, { types: 'words,chars', tagName: 'span' });
          if (h1AltSplit) {
            const h1AltEl = header.querySelector('.text-style-h1-alt');
            if (h1AltEl) {
              gsap.timeline({
                scrollTrigger: { trigger: header, start: '9% top', end: '19% top', scrub: 1.5 },
              }).to(h1AltEl.querySelectorAll('.char'), { y: '-120%', duration: 1 });
            }
          }

          const marquee = header.querySelector('.marquee-wrapper');
          if (marquee) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: 'top top', end: '8% top', scrub: 1 },
            }).to(marquee, { opacity: 0, duration: 1 });
          }
        });

        // Footer button hover
        document.querySelectorAll('.footer-button-wrapper').forEach((el) => {
          el.addEventListener('mouseenter', () => el.querySelector('.circ-purple')?.classList.add('expand'));
          el.addEventListener('mouseleave', () => el.querySelector('.circ-purple')?.classList.remove('expand'));
        });

        const footerButtonArea = document.querySelector('.footer-button-area') as HTMLElement;
        const footerButtonWrapper = document.querySelector('.footer-button-wrapper') as HTMLElement;
        const ftRowButton = document.querySelector('.ft-row-button') as HTMLElement;
        if (footerButtonArea && footerButtonWrapper && ftRowButton) {
          footerButtonArea.style.right = 'auto';
          footerButtonArea.style.left = '0px';

          const areaWidth = footerButtonArea.offsetWidth;
          const defaultX = ftRowButton.offsetWidth - areaWidth;
          let targetX = defaultX;
          let currentX = defaultX;
          const setX = gsap.quickSetter(footerButtonArea, 'x', 'px');
          setX(currentX);

          footerButtonWrapper.addEventListener('mousemove', (e: MouseEvent) => {
            const rowRect = ftRowButton.getBoundingClientRect();
            const mouseInRow = e.clientX - rowRect.left;
            targetX = Math.max(0, Math.min(mouseInRow - areaWidth / 2, rowRect.width - areaWidth));
          });

          footerButtonWrapper.addEventListener('mouseleave', () => {
            targetX = ftRowButton.offsetWidth - areaWidth;
          });

          gsap.ticker.add(() => {
            const dt = 1 - Math.pow(0.92, gsap.ticker.deltaRatio());
            currentX += (targetX - currentX) * dt;
            setX(currentX);
          });
        }

        // Project hover effects
        document.querySelectorAll('.project-container').forEach((el) => {
          const images = el.querySelectorAll('.project_image');
          const imagesWrapper = el.querySelector('.project-images') as HTMLElement;

          if (images.length > 0) {
            const projectTL = gsap.timeline({ paused: true });
            projectTL.to(images, {
              y: '0vh',
              x: '0vw',
              ease: 'power1.out',
              duration: 0.7,
              stagger: { each: 0.17, from: 'start' },
            });
            el.addEventListener('mouseenter', () => { projectTL.timeScale(1); projectTL.restart(); });
            el.addEventListener('mouseleave', () => { projectTL.timeScale(2); projectTL.reverse(); });
          }

          if (imagesWrapper) {
            gsap.set(imagesWrapper, { xPercent: -50, yPercent: -50 });
            const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            const mouse = { x: pos.x, y: pos.y };
            const setX = gsap.quickSetter(imagesWrapper, 'x', 'px');
            const setY = gsap.quickSetter(imagesWrapper, 'y', 'px');

            window.addEventListener('mousemove', (e) => { mouse.x = e.x; mouse.y = e.y; });
            gsap.ticker.add(() => {
              const dt = 1 - Math.pow(0.95, gsap.ticker.deltaRatio());
              pos.x += (mouse.x - pos.x) * dt;
              pos.y += (mouse.y - pos.y) * dt;
              setX(pos.x);
              setY(pos.y);
            });
          }
        });

        // PR image hover/parallax
        document.querySelectorAll('.pr-image').forEach((el) => {
          const hoverTL = gsap.timeline({ paused: true });
          hoverTL.to(el, { scale: 1.1, ease: 'power1.out', duration: 0.1 });
          el.addEventListener('mouseenter', () => hoverTL.restart());
          el.addEventListener('mouseleave', () => hoverTL.reverse());

          gsap.timeline({
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', ease: 'power3.out', scrub: 0.6 },
          }).from(el, { yPercent: -10 });
        });
      });

      // Tablet-specific hero animations
      mm.add('(min-width: 768px) and (max-width: 991px)', () => {
        document.querySelectorAll('.sc-header.tab-header').forEach((header) => {
          const profilePic = document.querySelector('.profile_pic-wrapper_fromtab') as HTMLElement;
          const videoEmbed = document.querySelector('.video-embed-wrapper_fromtab') as HTMLElement;
          const showreelText = document.querySelector('.showreel-text-wrapper-fromtab') as HTMLElement;
          const holaWrapper = document.getElementById('hola-wrapper_tab');
          const profilePicWrapper = document.getElementById('profile-pic-wrapper_tab');

          if (!holaWrapper || !profilePicWrapper) return;

          const n = window.innerHeight / 2 - 110.11 - 24.77 - 72;
          const o = window.innerWidth / 2;
          const s = holaWrapper.offsetWidth;
          const l = 0 - o + profilePicWrapper.offsetWidth / 2 + 20 + s + 24;

          if (videoEmbed) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: '14% top', end: '15% top', toggleActions: 'none play none reverse' },
            }).to(videoEmbed, { opacity: 1 });
          }
          if (showreelText) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: '14% top', end: '15% top', toggleActions: 'none play none reverse' },
            }).to(showreelText, { opacity: 1 });
          }
          if (profilePic) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: 'top top+=13', end: '35% top', scrub: 1 },
            }).fromTo(
              profilePic,
              { width: '7em', height: '4.5em', x: l, y: n, borderRadius: '6em', duration: 1 },
              { width: '90%', height: '40vw', x: '0px', y: '0px', borderRadius: '0em', duration: 1 }
            );
          }
        });
      });

      mm.add('(min-width: 992px)', () => {
        document.querySelectorAll('.sc-header.tab-header').forEach((header) => {
          const profilePic = document.querySelector('.profile_pic-wrapper_fromtab') as HTMLElement;
          const videoEmbed = document.querySelector('.video-embed-wrapper_fromtab') as HTMLElement;
          const showreelText = document.querySelector('.showreel-text-wrapper-fromtab') as HTMLElement;
          const holaWrapper = document.getElementById('hola-wrapper_tab');
          const profilePicWrapper = document.getElementById('profile-pic-wrapper_tab');

          if (!holaWrapper || !profilePicWrapper) return;

          const n = window.innerHeight / 2 - 210.3122 - 38.5;
          const o = window.innerWidth / 2;
          const s = holaWrapper.offsetWidth;
          const l = 0 - o + profilePicWrapper.offsetWidth / 2 + 60 + s + 24;

          if (videoEmbed) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: '14% top', end: '15% top', toggleActions: 'none play none reverse' },
            }).to(videoEmbed, { opacity: 1 });
          }
          if (showreelText) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: '14% top', end: '15% top', toggleActions: 'none play none reverse' },
            }).to(showreelText, { opacity: 1 });
          }
          if (profilePic) {
            gsap.timeline({
              scrollTrigger: { trigger: header, start: 'top top+=13', end: '45% top', scrub: 1 },
            }).fromTo(
              profilePic,
              { width: '11.5em', height: '7em', x: l, y: n, borderRadius: '6em', duration: 1 },
              { width: '90%', height: '40vw', x: '0px', y: '0px', borderRadius: '0em', duration: 1 }
            );
          }
        });
      });

      // Mobile linefade animations
      mm.add('(max-width: 991px)', () => {
        new SplitType("[linefade='text']", { types: 'lines', tagName: 'span' });
        new SplitType("[linefade='heading']", { types: 'chars', tagName: 'span' });

        document.querySelectorAll('.sc-header.tab-header').forEach((header) => {
          new SplitType(header.querySelector('.text-style-h1') as HTMLElement, { types: 'words,chars', tagName: 'span' });
          new SplitType(header.querySelector('.text-style-h1-alt') as HTMLElement, { types: 'words,chars', tagName: 'span' });
        });

        document.querySelectorAll("[linefade='link']").forEach((el) => {
          const heading1 = el.querySelectorAll("[linefade='heading']")[0];
          const heading2 = el.querySelectorAll("[linefade='heading']")[1];
          if (!heading1) return;

          gsap.timeline({
            scrollTrigger: { trigger: heading1, start: 'top bottom', end: 'top 90%', toggleActions: 'none play none reverse' },
          }).from(heading1.querySelectorAll('.char'), {
            opacity: 0,
            ease: 'power2.out',
            stagger: { each: 0.1, from: 'start' },
          });

          if (heading2) {
            const scrollHoverTL = gsap.timeline({
              scrollTrigger: { trigger: el, duration: 0.5, ease: 'power2.out', start: 'top center', end: 'bottom center', toggleActions: 'play reverse play reverse' },
            });
            scrollHoverTL.to(heading1.querySelectorAll('.char'), { yPercent: -110, duration: 0.3, stagger: { amount: 0.2 } });
            scrollHoverTL.from(heading2.querySelectorAll('.char'), { yPercent: 100, duration: 0.3, stagger: { amount: 0.2 } }, 0);
          }

          const textEl = el.querySelector("[linefade='text']");
          const fillEl = el.querySelector('.fill');
          if (textEl && fillEl) {
            gsap.timeline({
              scrollTrigger: {
                trigger: el,
                duration: 0.5,
                ease: 'power2.out',
                start: 'top center',
                end: 'bottom center',
                toggleActions: 'play reverse play reverse',
                toggleClass: { targets: fillEl, className: 'expand' },
              },
            }).from(textEl.querySelectorAll('.line'), {
              yPercent: 100,
              opacity: 0,
              duration: 0.3,
              stagger: { amount: 0.15 },
            });
          }
        });
      });

      ScrollTrigger.refresh();
    }

    // ── Cached / repeat-visit: skip preloader, quick fade-in ──
    if (isRepeatVisit) {
      const hide = (sel: string) => {
        const el = document.querySelector(sel) as HTMLElement;
        if (el) el.style.display = 'none';
      };
      hide('.top-black-overlay');
      hide('.preloader-page-wrapper');
      hide('.preloader-wrapper');
      hide('#preloader_image');
      hide('#preloader_cover');

      const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;
      const navbarWrapper = document.querySelector('.navbar-wrapper') as HTMLElement;
      const crystalHeadContainers = document.querySelectorAll('.crystal-head-container');
      const bgWavesWrapperInner = document.querySelector('.bg-waves-wrapper') as HTMLElement;

      pageWrapper?.classList.remove('no-click');

      const quickTL = gsap.timeline();
      if (pageWrapper) quickTL.fromTo(pageWrapper, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      if (navbarWrapper) quickTL.fromTo(navbarWrapper, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '<');
      if (crystalHeadContainers.length) quickTL.fromTo(crystalHeadContainers, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: { each: 0.05 } }, '<');
      if (bgWavesWrapperInner) quickTL.fromTo(bgWavesWrapperInner, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '<');

      initPageAnimations();

      return () => {
        quickTL.progress(1).kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    }

    // ── First visit: show waves during load, then run full preloader ──

    // Immediately fade the z-index:10 black overlay so the LoaderAnimation bars are visible
    const topBlackOverlay = document.querySelector('.top-black-overlay') as HTMLElement;
    if (topBlackOverlay) gsap.to(topBlackOverlay, { opacity: 0, duration: 0.1 });

    // Keep preloader-page-wrapper off-screen so waves video is visible while loading
    const preloaderPageWrapper = document.querySelector('.preloader-page-wrapper') as HTMLElement;
    if (preloaderPageWrapper) gsap.set(preloaderPageWrapper, { yPercent: 100 });

    let cancelled = false;
    let mainTL: gsap.core.Timeline | null = null;

    waitForReady().then(() => {
      if (cancelled) return;

      initPageAnimations();
      const pLine1 = document.querySelectorAll('.p-line-1');
      const pLine2Black = document.querySelectorAll('.p-line-2_black');
      const pLine3Black = document.querySelectorAll('.p-line-3_black');
      const pLine4Black = document.querySelectorAll('.p-line-4_black');
      const pLine1Black = document.querySelectorAll('.p-line-1_black');
      const pLine2 = document.querySelectorAll('.p-line-2');
      const pLine3Outer = document.querySelectorAll('.p-line-3_outer');
      const pLine4 = document.querySelectorAll('.p-line-4');
      const bgWavesWrapper = document.querySelector('.background-waves-wrapper') as HTMLElement;
      const preloaderNames = document.querySelectorAll('.preloader-name');
      const pageWrapper = document.querySelector('.page-wrapper') as HTMLElement;
      const crystalHeadContainers = document.querySelectorAll('.crystal-head-container');
      const bgWavesWrapperInner = document.querySelector('.bg-waves-wrapper') as HTMLElement;
      const navbarWrapper = document.querySelector('.navbar-wrapper') as HTMLElement;

      new SplitType('.preloader-name', { types: 'words,chars', tagName: 'span' });

      const preloaderName1 = preloaderNames[0];
      const preloaderName2 = preloaderNames[1];

      mainTL = gsap.timeline({
        defaults: {
          duration: 0.8,
          ease: 'Expo.easeInOut',
        },
      });

      if (pLine1.length) mainTL.from(pLine1, { width: 0, stagger: { each: 0.1 } });
      if (pLine2Black.length) mainTL.from(pLine2Black, { width: '250%', stagger: { each: 0.1 } }, '<');
      if (pLine3Black.length) mainTL.from(pLine3Black, { width: '250%', stagger: { each: 0.1 } }, '<');
      if (pLine4Black.length) mainTL.from(pLine4Black, { width: '250%', stagger: { each: 0.1 } }, '<');
      if (pLine1Black.length) mainTL.to(pLine1Black, { width: '100%', stagger: { each: 0.1 }, delay: 0.6 }, '<');
      if (pLine3Outer.length) mainTL.to(pLine3Outer, { height: '8rem', stagger: { each: 0.1 } }, '<');
      if (pLine4.length) mainTL.to(pLine4, { width: '7rem', stagger: { each: 0.1 } }, '<');
      if (pLine2[0]) mainTL.to(pLine2[0], { width: '9.1rem' }, '<');
      if (pLine2[1]) mainTL.to(pLine2[1], { width: '8.05rem', delay: 0.1 }, '<');
      if (pLine2[2]) mainTL.to(pLine2[2], { width: '7rem', delay: 0.1 }, '<');
      if (bgWavesWrapper) mainTL.from(bgWavesWrapper, { height: '0%', duration: 0.8, delay: 0.2 }, '>');
      if (preloaderPageWrapper) mainTL.to(preloaderPageWrapper, { yPercent: 0, duration: 1.0 }, '<');

      if (preloaderName1) {
        mainTL.from(
          preloaderName1.querySelectorAll('.char'),
          { yPercent: 25, delay: 0.5, opacity: 0, stagger: { each: 0.051 }, duration: 0.3, ease: 'power1.out' },
          '<'
        );
      }
      if (preloaderName2) {
        mainTL.from(
          preloaderName2.querySelectorAll('.char'),
          { yPercent: 25, delay: 0.15, opacity: 0, stagger: { each: 0.051 }, duration: 0.3, ease: 'power1.out' },
          '<'
        );
      }
      if (pageWrapper) mainTL.fromTo(pageWrapper, { opacity: 0 }, { opacity: 1, delay: 0.4 }, '<');
      if (crystalHeadContainers.length) mainTL.fromTo(crystalHeadContainers, { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: { each: 0.1 } }, '<');
      if (navbarWrapper) mainTL.fromTo(navbarWrapper, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'Expo.easeOut' }, '<');
      if (preloaderPageWrapper) mainTL.to(preloaderPageWrapper, { opacity: 0, duration: 0.01 }, '>');
      if (bgWavesWrapperInner) mainTL.fromTo(bgWavesWrapperInner, { opacity: 0 }, { opacity: 1, duration: 1.2 }, '<');

      mainTL.call(() => {
        pageWrapper?.classList.remove('no-click');
        if (preloaderPageWrapper) preloaderPageWrapper.style.display = 'none';
        const preloaderEl = document.querySelector('.preloader-wrapper') as HTMLElement;
        if (preloaderEl) preloaderEl.style.display = 'none';
        try { sessionStorage.setItem('preloaderSeen', '1'); } catch {}
      });
    });

    return () => {
      cancelled = true;
      if (mainTL) mainTL.progress(1).kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <div className="top-black-overlay no-click"></div>;
}
