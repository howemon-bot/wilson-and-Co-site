import { useEffect, useRef, useState } from 'react';
import { featuredProjects, projects, type Project } from '../content';
import { Img } from './Img';
import { withItalics } from '../italics';

// Project page photos sit in a staggered pattern that repeats every four:
// small left, large right, medium centre-left, small right.
const PATTERN = ['tile-a', 'tile-b', 'tile-c', 'tile-d'];

// Home card details: the neighbourhood and the main kind of work.
const place = (p: Project) => (p.location ?? '').split(',')[0];
const kind = (p: Project) =>
  p.categories.includes('Interior design') ? 'Interior design' : p.categories.slice(0, 2).join(', ');

function ProjectPage({ project, onClose, onGo }: { project: Project; onClose: () => void; onGo: (p: Project) => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const [first, ...rest] = project.images;

  useEffect(() => {
    pageRef.current?.scrollTo?.({ top: 0 });
    closeRef.current?.focus();
  }, [project]);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add('is-project-open');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('is-project-open');
      window.removeEventListener('keydown', onKey);
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div ref={pageRef} className="project-page" role="dialog" aria-modal="true" aria-labelledby="project-title">
      <div className="project-head">
        <h2 id="project-title">{project.title}</h2>
        <button ref={closeRef} type="button" className="close-x" aria-label="Close project" onClick={onClose} />
      </div>
      <div className="project-meta">
        <ul className="project-tags" aria-label="Work done">
          {project.categories.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="project-text">
          {project.text?.split('\n\n').map((para) => (
            <p key={para}>{withItalics(para)}</p>
          ))}
        </div>
        <dl className="project-facts">
          <div>
            <dt>Design</dt>
            <dd>Wilson &amp; Co</dd>
          </div>
          {project.location && (
            <div>
              <dt>Location</dt>
              <dd>{project.location}</dd>
            </div>
          )}
          <div>
            <dt>Status</dt>
            <dd>Completed</dd>
          </div>
        </dl>
      </div>
      <ol className="project-photos" id="project-gallery">
        <li className="tile-lead">
          <Img src={first} alt={`${project.title}, picture 1`} />
        </li>
        {rest.map((src, n) => (
          <li key={src} className={PATTERN[n % PATTERN.length]}>
            <Img src={src} alt={`${project.title}, picture ${n + 2}`} />
          </li>
        ))}
      </ol>
      <nav className="project-pager" aria-label="More projects">
        <button type="button" onClick={() => onGo(prev)}>
          <span>Previous</span>
          <small>{prev.title}</small>
        </button>
        <button type="button" onClick={() => onGo(next)}>
          <span>Next</span>
          <small>{next.title}</small>
        </button>
      </nav>
    </div>
  );
}

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-label projects-label">
        Featured projects
      </h2>
      {/* Large cards that stack over each other as you scroll. */}
      <ul className="project-cards">
        {featuredProjects.map((p, i) => (
          <li key={p.slug} className="project-card">
            <Img src={p.image} alt="" />
            <div className="card-meta" aria-hidden="true">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span>{p.title}</span>
              <span>{place(p)}</span>
              <span>{kind(p)}</span>
            </div>
            <div className="card-title">
              <h3>{p.title}</h3>
              {p.location && <p>{p.location}</p>}
            </div>
            {/* Its click area covers the whole card. */}
            <button type="button" className="card-open" onClick={() => setActive(p)} aria-label={`${p.title}, open project`} />
          </li>
        ))}
      </ul>
      {active && <ProjectPage project={active} onClose={() => setActive(null)} onGo={setActive} />}
    </section>
  );
}
