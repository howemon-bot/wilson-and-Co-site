import { Fragment, useEffect, useState } from 'react';
import { hero, heroSlides } from '../content';
import { Img } from './Img';

const STAY_MS = 6500;

// "*word*" in the content becomes an italic word.
function withItalics(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>));
}

export function Hero() {
  const [current, setCurrent] = useState(0);
  const count = heroSlides.length;

  useEffect(() => {
    if (count < 2) return;
    const t = window.setTimeout(() => setCurrent((i) => (i + 1) % count), STAY_MS);
    return () => window.clearTimeout(t);
  }, [current, count]);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-text">
        <h1 id="hero-title">{hero.heading}</h1>
        <p>{withItalics(hero.text)}</p>
      </div>
      <div className="hero-media" aria-roledescription="carousel" aria-label="Featured projects">
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
      </div>
    </section>
  );
}
