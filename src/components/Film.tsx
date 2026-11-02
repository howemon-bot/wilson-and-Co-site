import { useEffect, useRef, useState } from 'react';
import { film } from '../content';
import { Img } from './Img';
import { asset } from '../asset';

// The W from the logo, in its own 888 × 625 box.
const W_PATH =
  'M520 689h122l125 329 197-196 197 196 125-329h122l-237 625h-122l70-187-155-155-156 155 71 187h-121z';
const W_W = 888;
const W_H = 625;

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function reducedMotion() {
  return typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Scroll-driven hand-over from the cream page to the film:
// the W is a window onto the film, the film rises to fill the screen,
// the W turns white over it and then fades away.
export function Film() {
  const [failed, setFailed] = useState(false);
  const [size, setSize] = useState({ w: 1440, h: 900 });
  const [still] = useState(reducedMotion);
  const sectionRef = useRef<HTMLElement>(null);
  const riseRef = useRef<SVGRectElement>(null);
  const markRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const measure = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  useEffect(() => {
    if (still) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el || !riseRef.current || !markRef.current) return;
      const box = el.getBoundingClientRect();
      const run = box.height - window.innerHeight;
      const p = run > 0 ? clamp(-box.top / run) : 1;
      // The W window holds, then the film rises; the white W shows once the
      // film is behind it and fades out by the end. Phones skip the hold.
      const phone = size.w <= 800;
      const start = phone ? 0.04 : 0.25;
      const span = phone ? 0.5 : 0.45;
      const rise = ease(clamp((p - start) / span));
      riseRef.current.setAttribute('y', String(size.h * (1 - rise)));
      const on = clamp((p - (start + span * 0.4)) / 0.1);
      const off = clamp((p - (start + span + 0.08)) / 0.14);
      markRef.current.style.opacity = String(on * (1 - off));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [size, still]);

  // The W sits in the middle of the screen, about a fifth of its width.
  const markW = Math.min(320, Math.max(150, size.w * 0.2));
  const k = markW / W_W;
  const x = (size.w - markW) / 2;
  // Centred; on phones a third of the way down, so it appears sooner after the hero.
  const y = (size.w <= 800 ? size.h * 0.34 : size.h / 2) - (W_H * k) / 2;
  const w = `translate(${x} ${y}) scale(${k}) translate(-520 -689)`;

  return (
    <section ref={sectionRef} className={still ? 'film is-still' : 'film'} aria-label={film.label}>
      <div className="film-stage">
        <div className="film-media">
          {failed ? (
            <Img src={film.poster} alt="" />
          ) : (
            <video
              src={asset(film.src)}
              poster={asset(film.poster)}
              autoPlay
              muted
              loop
              playsInline
              onError={() => setFailed(true)}
            />
          )}
        </div>
        {!still && (
          <svg className="film-mask" viewBox={`0 0 ${size.w} ${size.h}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <mask id="film-window" maskUnits="userSpaceOnUse" x="0" y="0" width={size.w} height={size.h}>
                <rect width={size.w} height={size.h} fill="#fff" />
                <path d={W_PATH} transform={w} fill="#000" />
                <rect ref={riseRef} x="0" y={size.h} width={size.w} height={size.h} fill="#000" />
              </mask>
            </defs>
            <rect width={size.w} height={size.h} fill="var(--paper)" mask="url(#film-window)" />
            <g ref={markRef} style={{ opacity: 0 }}>
              <path d={W_PATH} transform={w} fill="#fff" />
            </g>
          </svg>
        )}
      </div>
    </section>
  );
}
