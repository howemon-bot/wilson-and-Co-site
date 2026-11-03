import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { company, contacts, featuredProjects, hero, heroSlides, projects, services, team, testimonials } from './content';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('opens on the oldest photograph, then the studio line', () => {
    expect(document.querySelector('.hero .slide.is-active img')).toHaveAttribute('src', heroSlides[0].image);
    expect(screen.getByRole('heading', { level: 1, name: hero.heading })).toBeInTheDocument();
  });

  it('sets the starred words of the hero text in italics', () => {
    const italics = [...document.querySelectorAll('.hero-text em')].map((e) => e.textContent);
    expect(italics).toEqual(['Barcelona', 'local materials', 'really matters']);
  });

  it('has hero slides that start on the first photograph', () => {
    const slides = document.querySelectorAll('.hero .slide');
    expect(slides).toHaveLength(heroSlides.length);
    expect(slides[0]).toHaveClass('is-active');
    expect(slides[1]).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows the wordmark as the header logo', () => {
    const header = document.querySelector('.site-header')!;
    expect(within(header as HTMLElement).getByRole('img', { name: 'Wilson & Co.' })).toBeInTheDocument();
  });

  it('opens a full-screen menu with the homepage navigation, and closes on Escape', async () => {
    const user = userEvent.setup();
    expect(screen.queryByRole('navigation', { name: 'Main' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Open menu' }));
    const nav = screen.getByRole('navigation', { name: 'Main' });
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveFocus();
    const expected: Record<string, string> = {
      Projects: '#projects',
      Services: '#services',
      Contact: '#contact',
    };
    for (const [name, href] of Object.entries(expected)) {
      expect(within(nav).getByRole('link', { name })).toHaveAttribute('href', href);
    }
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('navigation', { name: 'Main' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });

  it('lists every service, each opening its description with the +', async () => {
    const user = userEvent.setup();
    for (const s of services) {
      expect(screen.getByRole('heading', { level: 3, name: s.title })).toBeInTheDocument();
    }
    const first = screen.getByRole('button', { name: services[0].title });
    expect(first).toHaveAttribute('aria-expanded', 'false');
    await user.click(first);
    expect(first).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById(first.getAttribute('aria-controls')!)).toHaveAttribute('aria-hidden', 'false');
  });

  it('shows six featured projects on the home page, in order', () => {
    const list = document.querySelector('.project-cards') as HTMLElement;
    const titles = within(list).getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(featuredProjects.map((p) => p.title));
    expect(titles).toHaveLength(6);
    expect(titles[0]).toBe('Warm Minimalism in Sant Antoni');
    expect(projects.map((p) => p.title)).not.toContain('Barnes'); // no photos yet
  });

  it('keeps each gallery in the order the live project page uses', async () => {
    const user = userEvent.setup();
    const coastal = featuredProjects.find((p) => p.slug === 'sarria-kitchen')!;
    // Next moves through the home page projects only: Classical Beauty → Sarrià Kitchen.
    await user.click(screen.getByRole('button', { name: /^Classical Beauty, open project/ }));
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^Next/ }));
    const gallery = document.getElementById('project-gallery')!;
    const frames = within(gallery).getAllByRole('img');
    // Every photo is shown (rows pair photos by shape, so the order can shift by one).
    expect(frames.map((img) => img.getAttribute('aria-label') || img.getAttribute('alt')).sort()).toEqual(
      coastal.images.map((_, i) => `${coastal.title}, picture ${i + 1}`).sort(),
    );
    expect(coastal.images[0]).toContain('sarria-01_kitchen.jpg');
    await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: /^Next/ }));
    expect(screen.getByRole('heading', { level: 2, name: 'Entertainment Heaven' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('shows every testimonial and marks Spanish ones with lang="es"', () => {
    const quotes = document.querySelectorAll('.quotes blockquote');
    expect(quotes).toHaveLength(testimonials.length);
    const spanish = testimonials.filter((t) => t.lang === 'es').length;
    expect(document.querySelectorAll('.quotes blockquote[lang="es"]')).toHaveLength(spanish);
  });

  it('takes each testimonial highlight word for word from its quote', () => {
    for (const t of testimonials) {
      expect(t.quote).toContain(t.highlight);
    }
    expect(document.querySelectorAll('.quotes .quote-highlight')).toHaveLength(testimonials.length);
  });

  it('introduces both co-founders, Rohan first', () => {
    const section = screen.getByRole('region', { name: team.heading });
    const names = within(section).getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(names).toEqual(team.members.map((m) => m.name));
    expect(names[0]).toBe('Rohan Wilson');
  });

  it('exposes a mailto link for every contact', () => {
    for (const c of contacts) {
      for (const link of screen.getAllByRole('link', { name: c.email })) {
        expect(link).toHaveAttribute('href', `mailto:${c.email}`);
      }
    }
  });

  it('links to WhatsApp and Instagram', () => {
    expect(screen.getByRole('link', { name: 'WhatsApp Rohan' })).toHaveAttribute('href', company.whatsapp);
    for (const link of screen.getAllByRole('link', { name: 'Instagram' })) {
      expect(link).toHaveAttribute('href', company.instagram);
    }
  });
});
