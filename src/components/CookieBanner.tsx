import { useEffect, useState } from 'react';
import { OPEN_EVENT, savedConsent, setConsent, type Consent } from '../analytics';
import { useLang } from '../i18n';

// One quiet line at the bottom of the page. It shows until the visitor
// chooses, and again when they click "Cookies" in the footer.
export function CookieBanner() {
  const { t } = useLang();
  const [open, setOpen] = useState(() => savedConsent() === null);

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (c: Consent) => {
    setConsent(c);
    setOpen(false);
  };

  return (
    <div className="cookie-banner" role="region" aria-label={t.cookieLabel}>
      <p>{t.cookieText}</p>
      <div className="cookie-actions">
        <button type="button" className="cookie-btn" onClick={() => choose('denied')}>
          {t.cookieDecline}
        </button>
        <button type="button" className="cookie-btn is-accept" onClick={() => choose('granted')}>
          {t.cookieAccept}
        </button>
      </div>
    </div>
  );
}
