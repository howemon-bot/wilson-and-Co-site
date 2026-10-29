import { ethos } from '../content';

export function Ethos() {
  return (
    <section className="ethos" aria-labelledby="ethos-title">
      <h2 id="ethos-title">{ethos.heading}</h2>
      <p>{ethos.text}</p>
      <a href="#contact">contact us</a>
    </section>
  );
}
