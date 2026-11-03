import { useEffect, useRef, useState } from 'react';
// Imported as a URL so the file name changes with each version (no stale cache).
import houseUrl from '../assets/house.svg?url';

// Monica's house drawing, from the Illustrator file. It draws itself in the
// first time it comes into view (lines first, like a pen, then the fills),
// and lights up the part of the house that matches the service in focus.
export type HouseGroup = 'interiors' | 'renovations' | 'installations';

export function HouseDrawing({ active }: { active: HouseGroup | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState('');
  const [drawn, setDrawn] = useState(false);
  const [done, setDone] = useState(false);

  // Once the pen has finished, highlights can change quickly.
  useEffect(() => {
    if (!drawn) return;
    const t = window.setTimeout(() => setDone(true), 4200);
    return () => window.clearTimeout(t);
  }, [drawn]);

  // Load the drawing only when the section is close.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    const load = () =>
      fetch(houseUrl)
        .then((r) => (r.ok ? r.text() : ''))
        .then((t) => !cancelled && setSvg(t))
        .catch(() => {});
    if (typeof IntersectionObserver === 'undefined') {
      load();
      setDrawn(true);
      return () => {
        cancelled = true;
      };
    }
    const near = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load();
          near.disconnect();
        }
      },
      { rootMargin: '800px 0px' },
    );
    near.observe(el);
    return () => {
      cancelled = true;
      near.disconnect();
    };
  }, []);

  // Start drawing once a good part of it is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || !svg || drawn) return;
    if (typeof IntersectionObserver === 'undefined') return setDrawn(true);
    const seen = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          // One frame later, so the hidden state is painted before it animates.
          requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
          seen.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    seen.observe(el);
    return () => seen.disconnect();
  }, [svg, drawn]);

  return (
    <div
      ref={ref}
      className={`drawing house${svg ? ' is-ready' : ''}${drawn ? ' is-drawn' : ''}${done ? ' is-done' : ''}`}
      data-active={active ?? undefined}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
