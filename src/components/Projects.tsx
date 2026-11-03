import { useEffect, useRef, useState } from 'react';
import { featuredProjects, projects, type Project } from '../content';
import { Img } from './Img';
import { withItalics } from '../italics';
import { PagerArrow } from './Icons';
import { imageSizes } from '../imageSizes';

// Project page photos: one calm structure. Most sit two to a row at the same
// height (no cropping, so a portrait simply takes a narrower share); featured
// photos get a row of their own, a little larger.
type Photo = { src: string; n: number; ratio: number };
type Row = { kind: 'feature' | 'pair' | 'single'; photos: Photo[] };
const ratioOf = (src: string) => {
  const s = imageSizes[src];
  return s ? s[0] / s[1] : 1.5;
};
function galleryRows(images: string[], featured: number[] = [1]): Row[] {
  const rows: Row[] = [];
  let pending: Photo | null = null;
  images.forEach((src, i) => {
    const p = { src, n: i + 1, ratio: ratioOf(src) };
    if (featured.includes(p.n)) {
      if (pending) rows.push({ kind: 'single', photos: [pending] });
      pending = null;
      rows.push({ kind: 'feature', photos: [p] });
    } else if (pending) {
      rows.push({ kind: 'pair', photos: [pending, p] });
      pending = null;
    } else pending = p;
  });
  if (pending) rows.push({ kind: 'single', photos: [pending] });
  return rows;
}

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
  const rows = galleryRows(project.images, project.featured);

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
      <div className="project-photos" id="project-gallery">
        {rows.map((row) => (
          <div
            key={row.photos[0].src}
            className={`photo-row is-${row.kind}${row.photos[0].ratio < 1 ? ' is-portrait' : ''}`}
          >
            {row.photos.map((p) => (
              <figure key={p.src} style={{ flexGrow: p.ratio, aspectRatio: String(p.ratio) }}>
                <Img src={p.src} alt={`${project.title}, picture ${p.n}`} />
              </figure>
            ))}
          </div>
        ))}
      </div>
      <nav className="project-pager" aria-label="More projects">
        <button type="button" onClick={() => onGo(prev)}>
          <PagerArrow dir="left" />
          <span>Previous</span>
        </button>
        <button type="button" onClick={() => onGo(next)}>
          <span>Next</span>
          <PagerArrow dir="right" />
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
