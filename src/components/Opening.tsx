import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';

// The opening sequence on a first visit:
// the W appears, the three trades come in one by one, the W opens out into
// the full wordmark, the photograph rises from below, and the wordmark
// settles into its place in the header.

type Phase = 'enter' | 'mark' | 'words' | 'words-out' | 'wordmark' | 'reveal' | 'settle';

const STEPS: [Phase, number][] = [
  ['mark', 80],
  ['words', 900],
  ['words-out', 3100],
  ['wordmark', 3500],
  ['reveal', 4500],
  ['settle', 5600],
];
const END_MS = 6600;
const SEEN_KEY = 'wco-opening-seen';
const WORDS = ['Interiors.', 'Renovations.', 'Installations.'];

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
  const [phase, setPhase] = useState<Phase | null>(() => (shouldPlay() ? 'enter' : null));
  const [settleTo, setSettleTo] = useState<string | undefined>();
  const markRef = useRef<HTMLDivElement>(null);
  const playing = phase !== null;

  useEffect(() => {
    if (!playing) return;
    const root = document.documentElement;
    root.classList.add('is-opening');
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
      title="Skip"
    >
      <div className="opening-paper" />
      <div className="opening-stage">
        <div className="opening-mark" ref={markRef} style={settleTo ? { transform: settleTo } : undefined}>
          <div className="opening-mark-inner">
            <Logo />
          </div>
        </div>
        <p className="opening-words">
          {WORDS.map((w, i) => (
            <span key={w} style={{ transitionDelay: `${i * 0.38}s` }}>
              {w}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
