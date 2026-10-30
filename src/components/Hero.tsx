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

  // Lets the header switch to teal over light photographs.
  const tone = heroSlides[current].tone;
  useEffect(() => {
    document.documentElement.dataset.heroTone = tone;
    return () => {
      delete document.documentElement.dataset.heroTone;
    };
  }, [tone]);

  return (
    <section className={`hero is-${tone}`} id="top" aria-roledescription="carousel" aria-label="Featured projects">
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
        <a className="hero-caption" href="#projects" aria-live="polite">
          {heroSlides[current].caption} <span aria-hidden="true">→</span>
        </a>
        <button
          className="hero-count"
          type="button"
          aria-label={`Slide ${current + 1} of ${count}. Show the next slide`}
          onClick={() => setCurrent((i) => (i + 1) % count)}
        >
          {current + 1} / {count}
        </button>
      </div>
    </section>
  );
}
