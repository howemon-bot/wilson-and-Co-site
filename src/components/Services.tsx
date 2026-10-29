import { useState } from 'react';
import { services } from '../content';

export function Services() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <h2 id="services-title">
        <a href="#services">Services</a>
      </h2>
      <div className="tabs">
        {open !== null && (
          <button className="tabs-close" type="button" aria-label="Collapse services" onClick={() => setOpen(null)}>
            −
          </button>
        )}
        <ul>
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.title} className={isOpen ? 'is-open' : undefined}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(i)}
                  >
                    {!isOpen && (
                      <span className="plus" aria-hidden="true">
                        +
                      </span>
                    )}
                    <span className="vtitle">{s.title}</span>
                  </button>
                </h3>
                {isOpen && (
                  <div className="tab-copy">
                    <p>{s.text}</p>
                    <a className="more" href="#services">
                      {s.more}
                    </a>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
