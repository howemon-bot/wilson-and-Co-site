import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { useLang } from '../i18n';

// The opening sequence on a first visit:
// the W appears, the three trades come in one by one, the W opens out into
// the full wordmark, the wordmark settles into its place in the header,
// and then the photograph rises from below.

type Phase = 'enter' | 'mark' | 'words' | 'words-out' | 'wordmark' | 'settle' | 'reveal';

const STEPS: [Phase, number][] = [
  ['mark', 80],
  ['words', 900],
  ['words-out', 3100],
  ['wordmark', 3500],
  ['settle', 4300],
  ['reveal', 5200],
];
const END_MS = 6500;
const SEEN_KEY = 'wco-opening-seen';

function shouldPlay() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  if (new URLSearchParams(window.location.search).has('intro')) return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return !window.sessionStorage.getItem(SEEN_KEY);
  } catch {
    return true;
  }
}

export function Opening() {
  const { t } = useLang();
  const [phase, setPhase] = useState<Phase | null>(() => (shouldPlay() ? 'enter' : null));
  const [settleTo, setSettleTo] = useState<string | undefined>();
  const markRef = useRef<HTMLDivElement>(null);
  const playing = phase !== null;

  useEffect(() => {
    if (!playing) return;
    const root = document.documentElement;
    root.classList.add('is-opening');
    // Always start on the hero: no remembered scroll position, no #section jump.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (window.location.hash) history.replaceState(null, '', window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      /* private mode: the sequence simply plays again next time */
    }
    const timers = STEPS.map(([p, at]) => window.setTimeout(() => setPhase(p), at));
    timers.push(window.setTimeout(() => setPhase(null), END_MS));
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      root.classList.remove('is-opening');
      window.scrollTo(0, 0);
    };
  }, [playing]);

  // Move the big wordmark onto the header logo, so the hand-over is seamless.
  useEffect(() => {
    if (phase !== 'settle' || !markRef.current) return;
    const target = document.querySelector('.site-header .logo .mark');
    if (!target) return;
    const from = markRef.current.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    const dx = to.left + to.width / 2 - (from.left + from.width / 2);
    const dy = to.top + to.height / 2 - (from.top + from.height / 2);
    setSettleTo(`translate(${dx}px, ${dy}px) scale(${to.width / from.width})`);
  }, [phase]);

  if (!playing) return null;

  return (
    <div
      className={`opening is-${phase}`}
      aria-hidden="true"
      onClick={() => setPhase(null)}
      title={t.skip}
    >
      <div className="opening-paper" />
      <div className="opening-stage">
        <div className="opening-mark" ref={markRef} style={settleTo ? { transform: settleTo } : undefined}>
          <div className="opening-mark-inner">
            <Logo />
          </div>
        </div>
        <p className="opening-words">
          {t.openingWords.map((w, i) => (
            <span key={w} style={{ transitionDelay: `${i * 0.38}s` }}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
