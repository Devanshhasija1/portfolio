export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function event(action: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, params);
}

export function trackClick(category: string, label: string) {
  event('click', { event_category: category, event_label: label });
}

export function trackModalOpen(modalName: string) {
  event('modal_open', { event_category: 'engagement', event_label: modalName });
}

export function trackModalClose(modalName: string) {
  event('modal_close', { event_category: 'engagement', event_label: modalName });
}

export function trackDownload(fileName: string) {
  event('file_download', { event_category: 'download', event_label: fileName });
}

export function trackSocialClick(platform: string) {
  event('social_click', { event_category: 'social', event_label: platform });
}
