// Google Analytics (and, later, Google Ads) — loaded only after the visitor
// accepts cookies in the banner. Nothing from Google runs before that.
//
// Enquiries are counted as clicks on an email, WhatsApp or phone link:
//   contact_email, contact_whatsapp, contact_phone
// Mark contact_email as a key event in Analytics and import it into Google Ads.

export const GA_ID = 'G-JFY3K7BV0W';
// Google Ads tag (AW-…). Leave empty: conversions come from Analytics for now.
export const ADS_ID = '';

const KEY = 'wco-consent';
export type Consent = 'granted' | 'denied';
export const OPEN_EVENT = 'wco-consent-open';

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function savedConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

function store(c: Consent) {
  try {
    window.localStorage.setItem(KEY, c);
  } catch {
    /* storage blocked: the choice lasts until the page closes */
  }
}

let loaded = false;

function gtag(...args: unknown[]) {
  // gtag.js expects the arguments object itself, not an array.
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer = window.dataLayer || []).push(arguments);
}

function load() {
  if (loaded || typeof document === 'undefined') return;
  loaded = true;
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted',
  });
  gtag('js', new Date());
  gtag('config', GA_ID);
  if (ADS_ID) gtag('config', ADS_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

export function setConsent(c: Consent) {
  store(c);
  if (c === 'granted') {
    load();
    return;
  }
  if (loaded) {
    gtag('consent', 'update', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  }
  // Remove any Google cookies already set on this site.
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim();
    if (/^(_ga|_gid|_gcl)/.test(name)) {
      const host = window.location.hostname.replace(/^www\./, '');
      for (const domain of ['', `; domain=.${host}`]) {
        document.cookie = `${name}=; max-age=0; path=/${domain}`;
      }
    }
  }
}

function contactKind(href: string): string | null {
  if (href.startsWith('mailto:')) return 'contact_email';
  if (href.startsWith('tel:')) return 'contact_phone';
  if (/wa\.me|whatsapp/i.test(href)) return 'contact_whatsapp';
  return null;
}

function onClick(e: MouseEvent) {
  if (!loaded) return;
  const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
  if (!a) return;
  const href = a.getAttribute('href') ?? '';
  const kind = contactKind(href);
  if (!kind) return;
  const section = a.closest('section[id], footer, [role="dialog"]');
  gtag('event', kind, {
    link_url: href.replace(/^mailto:|^tel:/, ''),
    link_location: section?.id || section?.tagName.toLowerCase() || 'page',
    language: document.documentElement.lang,
  });
}

// Call once when the page starts.
export function startAnalytics() {
  if (typeof window === 'undefined') return;
  document.addEventListener('click', onClick, true);
  if (savedConsent() === 'granted') load();
}

export function openConsent() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}
