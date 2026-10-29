import { hero } from '../content';

export function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="kicker">{hero.kicker}</p>
      <h1 id="intro-title">{hero.heading}</h1>
    </section>
  );
}
