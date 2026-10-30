import { hero } from '../content';

// The first sentence in ink, the rest in teal.
function splitFirstSentence(text: string) {
  const i = text.indexOf('. ');
  return i < 0 ? [text, ''] : [text.slice(0, i + 1), text.slice(i + 2)];
}

export function Intro() {
  const [first, rest] = splitFirstSentence(hero.heading);
  return (
    <section className="intro" aria-labelledby="intro-title">
      <p className="kicker">{hero.kicker}</p>
      <h1 id="intro-title">
        {first}
        {rest && (
          <>
            {' '}
            <span className="tone">{rest}</span>
          </>
        )}
      </h1>
    </section>
  );
}
