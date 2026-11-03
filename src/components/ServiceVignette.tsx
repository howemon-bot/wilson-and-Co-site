import { useEffect, useState } from 'react';
import interiorsUrl from '../assets/vignette-interiors.svg?url';
import renovationsUrl from '../assets/vignette-renovations.svg?url';
import installationsUrl from '../assets/vignette-installations.svg?url';
import type { HouseGroup } from './HouseDrawing';

// Phones: a close-up from the house drawing for each service, drawn in when
// the service opens (the bathroom, the staircase, the fuse box and wiring).
const URLS: Record<HouseGroup, string> = {
  interiors: interiorsUrl,
  renovations: renovationsUrl,
  installations: installationsUrl,
};

export function ServiceVignette({ group, open }: { group: HouseGroup; open: boolean }) {
  const [svg, setSvg] = useState('');
  const [drawn, setDrawn] = useState(false);

  // Only phones show it, and only once it's opened, so only then download it.
  useEffect(() => {
    if (!open || svg) return;
    if (typeof window.matchMedia !== 'function' || !window.matchMedia('(max-width: 800px)').matches) return;
    let cancelled = false;
    fetch(URLS[group])
      .then((r) => (r.ok ? r.text() : ''))
      .then((t) => !cancelled && setSvg(t))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [open, svg, group]);

  useEffect(() => {
    if (!svg || !open || drawn) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setDrawn(true)));
    return () => cancelAnimationFrame(id);
  }, [svg, open, drawn]);

  return (
    <div
      className={`drawing vignette${drawn ? ' is-drawn' : ''}`}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
