import { useState } from 'react';
import { services } from '../content';
import { withItalics } from '../italics';
import { HouseDrawing, type HouseGroup } from './HouseDrawing';
import { ServiceVignette } from './ServiceVignette';

const GROUP: Record<string, HouseGroup> = {
  Interiors: 'interiors',
  Renovations: 'renovations',
  Installations: 'installations',
};

// Each service shows its title; the + opens the description.
export function Services() {
  const [open, setOpen] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);
  const toggle = (title: string) =>
    setOpen((list) => (list.includes(title) ? list.filter((t) => t !== title) : [...list, title]));
  // The drawing lights up the service under the mouse, else the last one opened.
  const focus = hovered ?? open[open.length - 1] ?? null;

  return (
    <section className="services" id="services" aria-labelledby="services-title">
      <h2 id="services-title" className="section-label">
        Services
      </h2>
      <div className="services-body">
      <ul>
        {services.map((s, i) => {
          const isOpen = open.includes(s.title);
          const id = `service-${i}`;
          return (
            <li
              key={s.title}
              className={isOpen ? 'is-open' : undefined}
              onMouseEnter={() => setHovered(s.title)}
              onMouseLeave={() => setHovered(null)}
            >
              <h3>
                <button type="button" aria-expanded={isOpen} aria-controls={id} onClick={() => toggle(s.title)}>
                  {s.title}
                  <span className="plus-circle" aria-hidden="true" />
                </button>
              </h3>
              <div className="service-body" id={id} aria-hidden={!isOpen}>
                <div>
                  <p>{withItalics(s.text)}</p>
                  {GROUP[s.title] && <ServiceVignette group={GROUP[s.title]} open={isOpen} />}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <HouseDrawing active={focus ? GROUP[focus] ?? null : null} />
      </div>
    </section>
  );
}
