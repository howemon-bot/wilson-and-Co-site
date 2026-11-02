import { useEffect, useState } from 'react';
import { testimonials } from '../content';

function Arrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 12" width="24" height="12" aria-hidden="true">
      <path
        d={dir === 'right' ? 'M0 6h23M17.5 0.5 23 6l-5.5 5.5' : 'M24 6H1M6.5 0.5 1 6l5.5 5.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  // Moves on slowly by itself; any click restarts the wait.
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) return;
    const id = window.setTimeout(() => setIndex((i) => (i + 1) % count), 9000);
    return () => window.clearTimeout(id);
  }, [index, count]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + count) % count);

  return (
    <section className="quotes" id="clients" aria-labelledby="clients-title" aria-roledescription="carousel">
      <h2 id="clients-title" className="section-label">
        Testimonials
      </h2>
      <div className="quotes-body">
        <div className="quotes-stack">
        {testimonials.map((t, i) => (
          <figure key={t.name} className={i === index ? 'is-active' : undefined} aria-hidden={i !== index}>
            <blockquote lang={t.lang}>
              <p>“{t.quote}”</p>
            </blockquote>
            <figcaption>
              {t.name}, {t.place}
            </figcaption>
          </figure>
        ))}
        </div>
        <div className="quote-nav">
          <span className="quote-count" aria-live="polite">
            {pad(index + 1)} / {pad(count)}
          </span>
          <span className="quote-arrows">
            <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)}>
              <Arrow dir="left" />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => go(1)}>
              <Arrow dir="right" />
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}
