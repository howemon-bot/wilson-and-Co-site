import { useState } from 'react';
import { services } from '../content';
import { withItalics } from '../italics';

// Each service shows its title; the + opens the description.
export function Services() {
  const [open, setOpen] = useState<string[]>([]);
  const toggle = (title: string) =>
    setOpen((list) => (list.includes(title) ? list.filter((t) => t !== title) : [...list, title]));

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="section-label">
        Services
      </h2>
      <ul>
        {services.map((s, i) => {
          const isOpen = open.includes(s.title);
          const id = `service-${i}`;
          return (
            <li key={s.title} className={isOpen ? 'is-open' : undefined}>
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => toggle(s.title)}>
                  {s.title}
                  <span className="plus-circle" aria-hidden="true" />
                </button>
              </h3>
              <div className="service-body" id={id} aria-hidden={!isOpen}>
                <div>
                  <p>{withItalics(s.text)}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
