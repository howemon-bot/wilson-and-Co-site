import { useEffect, useRef } from 'react';

const LINKS = 'a, button, [role="button"], label, summary';
const DARK = '.film, .menu-panel';

// A small dot that trails the mouse. It grows over things you can click and
// turns light over dark sections. Mouse only, and not with reduced motion.
export function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let x = -100, y = -100, tx = -100, ty = -100, frame = 0;
    const tick = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = Math.abs(tx - x) + Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      tx = e.clientX;
      ty = e.clientY;
      if (x < -50) { x = tx; y = ty; }
      const target = e.target as Element | null;
      dot.classList.add('is-on');
      dot.classList.toggle('is-link', !!target?.closest(LINKS));
      dot.classList.toggle('is-light', !!target?.closest(DARK));
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => dot.classList.remove('is-on');
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />;
}
