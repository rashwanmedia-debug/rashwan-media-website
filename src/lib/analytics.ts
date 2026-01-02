/**
 * Analytics initialization and tracking utilities
 * 
 * Environment Variables Required:
 * - NEXT_PUBLIC_GA4_ID: Google Analytics 4 Measurement ID (e.g., G-XXXXXXXXXX)
 * - NEXT_PUBLIC_META_PIXEL_ID: Meta (Facebook) Pixel ID
 * 
 * Usage:
 * 1. Set environment variables in .env.local or Vercel dashboard
 * 2. Call initAnalytics() in _app.tsx on mount
 * 3. Use trackEvent() for custom event tracking
 */

type WindowWithDataLayer = Window & {
  dataLayer: Record<string, unknown>[];
  fbq?: (...args: unknown[]) => void;
  _fbq?: (...args: unknown[]) => void;
};

declare const window: WindowWithDataLayer;

export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const initAnalytics = () => {
  if (typeof window === 'undefined') return;

  // Initialize Google Analytics 4
  if (GA4_ID) {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', GA4_ID, {
      page_path: window.location.pathname,
    });
  }

  // Initialize Meta Pixel
  if (META_PIXEL_ID) {
    if (window.fbq) return;
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) {
        fbq.callMethod.apply(fbq, args);
      } else {
        fbq.queue.push(args);
      }
    };
    if (!window._fbq) window._fbq = fbq;
    (fbq as { queue?: unknown[]; version?: string }).queue = [];
    (fbq as { version?: string }).version = '2.0';
    window.fbq = fbq;
    fbq('init', META_PIXEL_ID);
    fbq('track', 'PageView');
  }
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  // Track with GA4
  if (GA4_ID && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // Track with Meta Pixel
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('trackCustom', eventName, params);
  }
};

export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;

  // Track with GA4
  if (GA4_ID && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: url,
    });
  }

  // Track with Meta Pixel
  if (META_PIXEL_ID && window.fbq) {
    window.fbq('track', 'PageView');
  }
};