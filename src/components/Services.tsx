import { services } from '../content';
import { withItalics } from '../italics';

export function Services() {
  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="services-label">
        Services
      </h2>
      <ul>
        {services.map((s) => (
          <li key={s.title}>
            <h3>{s.title}</h3>
            <p>{withItalics(s.text)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
