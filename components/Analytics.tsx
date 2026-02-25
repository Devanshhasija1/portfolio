'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { event } from '@/lib/gtag';

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];
const RAGE_CLICK_THRESHOLD = 3;
const RAGE_CLICK_WINDOW_MS = 800;
const QUICK_BACK_THRESHOLD_MS = 10_000;
const SECTION_TIME_INTERVAL_MS = 5_000;

export default function Analytics() {
  const pathname = usePathname();
  const pageEntryTime = useRef(Date.now());
  const scrollMilestonesHit = useRef(new Set<number>());
  const clickTimestamps = useRef<number[]>([]);
  const sectionTimers = useRef<Map<string, number>>(new Map());
  const visibleSections = useRef(new Set<string>());
  const sectionIntervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    pageEntryTime.current = Date.now();
    scrollMilestonesHit.current.clear();
    sectionTimers.current.clear();
    visibleSections.current.clear();
  }, [pathname]);

  // --- Scroll depth tracking ---
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const percent = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !scrollMilestonesHit.current.has(milestone)) {
          scrollMilestonesHit.current.add(milestone);
          event('scroll_depth', {
            event_category: 'engagement',
            event_label: `${milestone}%`,
            value: milestone,
            page_path: pathname,
          });
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // --- Section visibility & time spent ---
  useEffect(() => {
    const sections = document.querySelectorAll('section, footer');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = getSectionName(entry.target as HTMLElement);
          if (entry.isIntersecting) {
            visibleSections.current.add(name);
            if (!sectionTimers.current.has(name)) {
              sectionTimers.current.set(name, 0);
            }
            event('section_view', {
              event_category: 'engagement',
              event_label: name,
              page_path: pathname,
            });
          } else {
            const accumulated = sectionTimers.current.get(name) ?? 0;
            if (accumulated > 0) {
              event('section_time', {
                event_category: 'engagement',
                event_label: name,
                value: Math.round(accumulated / 1000),
                page_path: pathname,
              });
            }
            visibleSections.current.delete(name);
          }
        }
      },
      { threshold: 0.3 },
    );

    sections.forEach((s) => observer.observe(s));

    sectionIntervalRef.current = setInterval(() => {
      visibleSections.current.forEach((name) => {
        const prev = sectionTimers.current.get(name) ?? 0;
        sectionTimers.current.set(name, prev + SECTION_TIME_INTERVAL_MS);
      });
    }, SECTION_TIME_INTERVAL_MS);

    return () => {
      observer.disconnect();
      if (sectionIntervalRef.current) clearInterval(sectionIntervalRef.current);

      sectionTimers.current.forEach((ms, name) => {
        if (ms > 0) {
          event('section_time', {
            event_category: 'engagement',
            event_label: name,
            value: Math.round(ms / 1000),
            page_path: pathname,
          });
        }
      });
    };
  }, [pathname]);

  // --- Quick back detection ---
  useEffect(() => {
    function handleBeforeUnload() {
      const timeSpent = Date.now() - pageEntryTime.current;
      event('page_time_total', {
        event_category: 'engagement',
        event_label: pathname,
        value: Math.round(timeSpent / 1000),
      });
      if (timeSpent < QUICK_BACK_THRESHOLD_MS) {
        event('quick_back', {
          event_category: 'engagement',
          event_label: pathname,
          value: Math.round(timeSpent / 1000),
        });
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [pathname]);

  // --- Rage click detection ---
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const now = Date.now();
      clickTimestamps.current.push(now);
      clickTimestamps.current = clickTimestamps.current.filter(
        (t) => now - t < RAGE_CLICK_WINDOW_MS,
      );

      if (clickTimestamps.current.length >= RAGE_CLICK_THRESHOLD) {
        const target = e.target as HTMLElement;
        event('rage_click', {
          event_category: 'ux_issue',
          event_label: `${target.tagName}.${target.className.toString().slice(0, 80)}`,
          page_path: pathname,
        });
        clickTimestamps.current = [];
      }
    }

    document.addEventListener('click', handleClick, { passive: true });
    return () => document.removeEventListener('click', handleClick);
  }, [pathname]);

  // --- JS error tracking ---
  useEffect(() => {
    function handleError(e: ErrorEvent) {
      event('js_error', {
        event_category: 'error',
        event_label: `${e.message} @ ${e.filename}:${e.lineno}`,
        page_path: pathname,
      });
    }

    function handleRejection(e: PromiseRejectionEvent) {
      event('unhandled_rejection', {
        event_category: 'error',
        event_label: String(e.reason).slice(0, 150),
        page_path: pathname,
      });
    }

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, [pathname]);

  // --- Tab visibility (did user switch away?) ---
  useEffect(() => {
    let hiddenAt = 0;

    function handleVisibility() {
      if (document.hidden) {
        hiddenAt = Date.now();
        event('tab_hidden', {
          event_category: 'engagement',
          event_label: pathname,
        });
      } else if (hiddenAt) {
        const awaySeconds = Math.round((Date.now() - hiddenAt) / 1000);
        event('tab_visible', {
          event_category: 'engagement',
          event_label: pathname,
          value: awaySeconds,
        });
        hiddenAt = 0;
      }
    }

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [pathname]);

  // --- Performance metrics (first load only) ---
  useEffect(() => {
    if (typeof window === 'undefined' || !window.performance) return;

    const timeout = setTimeout(() => {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      if (!nav) return;

      event('page_load_time', {
        event_category: 'performance',
        event_label: pathname,
        value: Math.round(nav.loadEventEnd - nav.startTime),
      });

      event('ttfb', {
        event_category: 'performance',
        event_label: pathname,
        value: Math.round(nav.responseStart - nav.requestStart),
      });

      event('dom_interactive', {
        event_category: 'performance',
        event_label: pathname,
        value: Math.round(nav.domInteractive - nav.startTime),
      });
    }, 3000);

    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

function getSectionName(el: HTMLElement): string {
  if (el.id) return el.id;
  const cls = el.className;
  if (typeof cls === 'string') {
    if (cls.includes('sc-hero') || cls.includes('hero')) return 'hero';
    if (cls.includes('sc-about') || cls.includes('about')) return 'about';
    if (cls.includes('sc-projects') || cls.includes('projects')) return 'projects';
    if (cls.includes('sc-whatido') || cls.includes('whatido') || cls.includes('what-i-do')) return 'what_i_do';
    if (cls.includes('sc-clients') || cls.includes('clients')) return 'clients';
    if (cls.includes('sc-carousel') || cls.includes('carousel') || cls.includes('snapshots')) return 'carousel';
    if (cls.includes('sc-blog') || cls.includes('blog')) return 'blog';
    if (cls.includes('footer')) return 'footer';
  }
  if (el.tagName === 'FOOTER') return 'footer';
  return el.tagName.toLowerCase() + '_' + (el.className.toString().split(' ')[0] || 'unknown');
}
