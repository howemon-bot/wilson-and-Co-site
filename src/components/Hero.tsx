import { useEffect, useState } from 'react';
import { heroSlides } from '../content';
import { Img } from './Img';

const STAY_MS = 6500;

export function Hero() {
  const [current, setCurrent] = useState(0);
  const count = heroSlides.length;

  useEffect(() => {
    if (count < 2) return;
    const t = window.setTimeout(() => setCurrent((i) => (i + 1) % count), STAY_MS);
    return () => window.clearTimeout(t);
  }, [current, count]);

  return (
    <section className="hero" id="top" aria-roledescription="carousel" aria-label="Featured projects">
      {heroSlides.map((s, i) => (
        <div
          key={i}
          className={i === current ? 'slide is-active' : 'slide'}
          aria-hidden={i !== current}
          aria-roledescription="slide"
        >
          <Img
            src={s.image}
            alt={s.alt}
            priority={i === 0}
            style={{ objectPosition: s.focus, transformOrigin: s.focus, ['--zoom' as string]: s.zoom }}
          />
        </div>
      ))}
      <div className="hero-foot">
        <p className="hero-caption" aria-live="polite">
          {heroSlides[current].caption}
        </p>
        <div className="dashes hero-dashes" role="tablist" aria-label="Choose a slide">
          {heroSlides.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}: ${s.caption}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
