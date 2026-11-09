import { useState } from 'react';
import { useLang } from '../i18n';
import { withItalics } from '../italics';
import { HouseDrawing, type HouseGroup } from './HouseDrawing';
import { ServiceVignette } from './ServiceVignette';


// Each service shows its title; the + opens the description.
export function Services() {
  const { t, c } = useLang();
  const services = c.services;
  const [open, setOpen] = useState<HouseGroup[]>([]);
  const [hovered, setHovered] = useState<HouseGroup | null>(null);
  const toggle = (id: HouseGroup) =>
    setOpen((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  // The drawing lights up the service under the mouse, else the last one opened.
  const focus = hovered ?? open[open.length - 1] ?? null;

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="section-label">
        {t.servicesTitle}
      </h2>
      <div className="services-body">
      <ul>
        {services.map((s, i) => {
          const isOpen = open.includes(s.id);
          const id = `service-${i}`;
          return (
            <li
              key={s.id}
              className={isOpen ? 'is-open' : undefined}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => toggle(s.id)}>
                  {s.title}
                  <span className="plus-circle" aria-hidden="true" />
                </button>
              </h3>
              <div className="service-body" id={id} aria-hidden={!isOpen}>
                <div>
                  <p>{withItalics(s.text)}</p>
                  <ServiceVignette group={s.id} open={isOpen} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <HouseDrawing active={focus} />
      </div>
    </section>
  );
}
