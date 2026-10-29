import { useEffect, useState } from 'react';
import { projects, type Project } from '../content';
import { Img } from './Img';

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!active) return;
    document.getElementById('project-gallery')?.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' });
  }, [active]);

  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="visually-hidden">
        Projects
      </h2>
      <ul className="project-row">
        {projects.map((p) => (
          <li key={p.slug}>
            <button type="button" onClick={() => setActive(p)} aria-expanded={active?.slug === p.slug}>
              <figure>
                <Img src={p.image} alt={`${p.title} project`} />
                <figcaption>
                  <h3>{p.title}</h3>
                  <ul className="tags" aria-label="Work done">
                    {p.categories.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </figcaption>
              </figure>
            </button>
          </li>
        ))}
      </ul>
      {active && (
        <div className="gallery" id="project-gallery">
          <div className="gallery-head">
            <h3>{active.title}</h3>
            <p>{active.categories.join(' · ')}</p>
            <button type="button" onClick={() => setActive(null)}>
              Close
            </button>
          </div>
          <ol>
            {active.images.map((src, i) => (
              <li key={src}>
                <Img src={src} alt={`${active.title}, picture ${i + 1}`} />
              </li>
            ))}
          </ol>
        </div>
      )}
    </section>
  );
}
