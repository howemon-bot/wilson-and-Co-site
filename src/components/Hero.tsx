import { hero } from '../content';
import { Img } from './Img';

export function Hero() {
  return (
    <section className="hero" id="top" aria-label="Featured project">
      <Img src={hero.image} alt={hero.imageAlt} priority />
    </section>
  );
}
