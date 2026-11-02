import { ethos } from '../content';

export function Ethos() {
  return (
    <section className="ethos" aria-labelledby="ethos-title">
      <h2 id="ethos-title">{ethos.heading}</h2>
      <p>{ethos.text}</p>
      <a className="link" href="#contact">
        Contact us
      </a>
    </section>
  );
}
