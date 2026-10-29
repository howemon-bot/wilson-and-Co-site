import { useEffect, useState } from 'react';
import { testimonials } from '../content';

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;

  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => window.clearInterval(id);
  }, [count]);

  const go = (dir: -1 | 1) => setIndex((i) => (i + dir + count) % count);

  return (
    <section className="quotes" id="clients" aria-labelledby="clients-title" aria-roledescription="carousel">
      <h2 id="clients-title" className="visually-hidden">
        What clients say
      </h2>
      {testimonials.map((t, i) => (
        <figure key={t.name} hidden={i !== index}>
          <blockquote lang={t.lang}>
            <p>“{t.quote}”</p>
          </blockquote>
          <figcaption>
            {t.name}, {t.place}
          </figcaption>
        </figure>
      ))}
      <div className="quote-nav">
        <button type="button" aria-label="Previous testimonial" onClick={() => go(-1)}>
          ←
        </button>
        <div className="dashes" role="tablist" aria-label="Testimonials">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${t.name}, ${t.place}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button type="button" aria-label="Next testimonial" onClick={() => go(1)}>
          →
        </button>
      </div>
    </section>
  );
}
