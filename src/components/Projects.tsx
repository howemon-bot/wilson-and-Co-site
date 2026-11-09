import { useEffect, useRef, useState } from 'react';
import { type Project, type RowKind } from '../content';
import { useLang } from '../i18n';
import { Img } from './Img';
import { withItalics } from '../italics';
import { PagerArrow } from './Icons';
import { imageSizes } from '../imageSizes';

// Project page photos. By default: landscapes pair with landscapes and portraits
// with portraits (in the order they come), so the two photos in a row are the same
// size; featured photos get a row of their own, a little larger. A project can
// instead set its own rows (`layout`), which also allows a full-width photo and a
// big photo set against a small one, on either side.
type Photo = { src: string; n: number; portrait: boolean };
type Row = { kind: RowKind; portrait: boolean; photos: Photo[] };
const isPortrait = (src: string) => {
  const s = imageSizes[src];
  return s ? s[1] > s[0] : false;
};
const photo = (images: string[], n: number): Photo => ({ src: images[n - 1], n, portrait: isPortrait(images[n - 1]) });
function galleryRows(images: string[], featured: number[] = [1], layout?: Project['layout']): Row[] {
  if (layout) {
    const rows: Row[] = layout.map(({ kind, photos }) => {
      const ps = photos.filter((n) => images[n - 1]).map((n) => photo(images, n));
      return { kind, portrait: ps.every((p) => p.portrait), photos: ps };
    });
    // Any photo the layout leaves out still shows, in the default way, at the end.
    const used = new Set(layout.flatMap((r) => r.photos));
    const rest = images.map((_, i) => i + 1).filter((n) => !used.has(n));
    return rows.filter((r) => r.photos.length).concat(rest.length ? autoRows(images, rest, []) : []);
  }
  return autoRows(images, images.map((_, i) => i + 1), featured);
}
function autoRows(images: string[], numbers: number[], featured: number[]): Row[] {
  const rows: Row[] = [];
  const waiting: Record<'land' | 'port', { photo: Photo; row: number } | null> = { land: null, port: null };
  numbers.forEach((n) => {
    const p = photo(images, n);
    if (featured.includes(p.n)) {
      rows.push({ kind: 'feature', portrait: p.portrait, photos: [p] });
      return;
    }
    const key = p.portrait ? 'port' : 'land';
    const w = waiting[key];
    if (w) {
      rows[w.row] = { kind: 'pair', portrait: p.portrait, photos: [w.photo, p] };
      waiting[key] = null;
    } else {
      waiting[key] = { photo: p, row: rows.length };
      rows.push({ kind: 'single', portrait: p.portrait, photos: [p] });
    }
  });
  return rows;
}

// Home card details: the neighbourhood and the main kind of work.
const place = (p: Project) => (p.location ?? '').split(',')[0];
const kind = (p: Project, interiorDesign: string) =>
  p.categories.includes(interiorDesign) ? interiorDesign : p.categories.slice(0, 2).join(', ');

function ProjectPage({ project, onClose, onGo }: { project: Project; onClose: () => void; onGo: (p: Project) => void }) {
  const { t, c } = useLang();
  const closeRef = useRef<HTMLButtonElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  // Previous / Next move through the projects shown on the home page only.
  const list = c.featuredProjects;
  const i = list.findIndex((p) => p.slug === project.slug);
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];
  const rows = galleryRows(project.images, project.featured, project.layout);

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
        <button ref={closeRef} type="button" className="close-x" aria-label={t.closeProject} onClick={onClose} />
      </div>
      <div className="project-meta">
        <ul className="project-tags" aria-label={t.workDone}>
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
            <dt>{t.design}</dt>
            <dd>Wilson &amp; Co</dd>
          </div>
          {project.location && (
            <div>
              <dt>{t.location}</dt>
              <dd>{project.location}</dd>
            </div>
          )}
          <div>
            <dt>{t.status}</dt>
            <dd>{t.completed}</dd>
          </div>
        </dl>
      </div>
      <div className="project-photos" id="project-gallery">
        {rows.map((row) => (
          <div
            key={row.photos[0].src}
            className={`photo-row is-${row.kind}${row.portrait ? ' is-portrait' : ''}`}
          >
            {row.photos.map((p) => (
              <figure key={p.src} className={p.portrait ? 'is-portrait' : undefined}>
                <Img src={p.src} alt={t.picture(project.title, p.n)} />
              </figure>
            ))}
          </div>
        ))}
      </div>
      <nav className="project-pager" aria-label={t.moreProjects}>
        <button type="button" onClick={() => onGo(prev)}>
          <PagerArrow dir="left" />
          <span>{t.previous}</span>
        </button>
        <button type="button" onClick={() => onGo(next)}>
          <span>{t.next}</span>
          <PagerArrow dir="right" />
        </button>
      </nav>
    </div>
  );
}

export function Projects() {
  const { t, c } = useLang();
  // The open project is kept by slug, so it follows a change of language.
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = c.projects.find((p) => p.slug === activeSlug) ?? null;
  const setActive = (p: Project | null) => setActiveSlug(p ? p.slug : null);

  return (
    <section className="projects" id="projects" aria-labelledby="projects-title">
      <h2 id="projects-title" className="section-label projects-label">
        {t.projectsTitle}
      </h2>
      {/* Large cards that stack over each other as you scroll. */}
      <ul className="project-cards">
        {c.featuredProjects.map((p, i) => (
          <li key={p.slug} className="project-card">
            <Img src={p.image} alt="" />
            <div className="card-meta" aria-hidden="true">
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span>{p.title}</span>
              <span>{place(p)}</span>
              <span>{kind(p, t.interiorDesign)}</span>
            </div>
            <div className="card-title">
              <h3>{p.title}</h3>
              {p.location && <p>{p.location}</p>}
            </div>
            {/* Its click area covers the whole card. */}
            <button type="button" className="card-open" onClick={() => setActive(p)} aria-label={t.openProject(p.title)} />
          </li>
        ))}
      </ul>
      {active && <ProjectPage project={active} onClose={() => setActive(null)} onGo={setActive} />}
    </section>
  );
}
