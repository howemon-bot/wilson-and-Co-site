import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { company, contacts, hero, heroSlides, projects, services, team, testimonials } from './content';

describe('App', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('opens on the oldest photograph, then the studio line', () => {
    expect(document.querySelector('.hero .slide.is-active img')).toHaveAttribute('src', heroSlides[0].image);
    expect(screen.getByRole('heading', { level: 1, name: hero.heading })).toBeInTheDocument();
  });

  it('has three hero slides that can be picked from the dashes', async () => {
    const user = userEvent.setup();
    expect(document.querySelectorAll('.hero .slide')).toHaveLength(3);
    const tabs = within(screen.getByRole('tablist', { name: 'Choose a slide' })).getAllByRole('tab');
    await user.click(tabs[2]);
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    expect(document.querySelector('.hero-caption')).toHaveTextContent(heroSlides[2].caption);
  });

  it('shows the wordmark as the header logo', () => {
    const header = document.querySelector('.site-header')!;
    expect(within(header as HTMLElement).getByRole('img', { name: 'Wilson & Co.' })).toBeInTheDocument();
  });

  it('has the homepage navigation', () => {
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const expected: Record<string, string> = {
      projects: '#projects',
      'our services': '#services',
      'contact us': '#contact',
    };
    for (const [name, href] of Object.entries(expected)) {
      expect(within(nav).getByRole('link', { name })).toHaveAttribute('href', href);
    }
  });

  it('lists every service', () => {
    for (const s of services) {
      expect(screen.getByRole('heading', { level: 3, name: s.title })).toBeInTheDocument();
    }
  });

  it('lists projects oldest first, in the homepage order', () => {
    const row = document.querySelector('.project-row') as HTMLElement;
    const titles = within(row).getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(projects.map((p) => p.title));
    expect(titles[0]).toBe('Industrial Clapham');
    expect(titles[titles.length - 1]).toBe('Warm Minimalism in Sant Antoni');
  });

  it('keeps each gallery in the order the live project page uses', async () => {
    const user = userEvent.setup();
    const coastal = projects.find((p) => p.slug === 'coastal-solar-panels')!;
    await user.click(screen.getByRole('button', { name: new RegExp(coastal.title) }));
    const gallery = document.getElementById('project-gallery')!;
    const frames = within(gallery).getAllByRole('img');
    expect(frames.map((img) => img.getAttribute('aria-label') || img.getAttribute('alt'))).toEqual(
      coastal.images.map((_, i) => `${coastal.title}, picture ${i + 1}`),
    );
    expect(coastal.images[0]).toContain('Solar_1.jpg');
    expect(coastal.images[3]).toContain('Solar_6.jpg');
  });

  it('shows every testimonial and marks Spanish ones with lang="es"', () => {
    const quotes = document.querySelectorAll('.quotes blockquote');
    expect(quotes).toHaveLength(testimonials.length);
    const spanish = testimonials.filter((t) => t.lang === 'es').length;
    expect(document.querySelectorAll('.quotes blockquote[lang="es"]')).toHaveLength(spanish);
  });

  it('introduces both co-founders, Rohan first', () => {
    const section = screen.getByRole('region', { name: team.heading });
    const names = within(section).getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(names).toEqual(team.members.map((m) => m.name));
    expect(names[0]).toBe('Rohan Wilson');
  });

  it('exposes a mailto link for every contact', () => {
    for (const c of contacts) {
      expect(screen.getByRole('link', { name: c.email })).toHaveAttribute('href', `mailto:${c.email}`);
    }
  });

  it('links to WhatsApp and Instagram', () => {
    expect(screen.getByRole('link', { name: 'WhatsApp Rohan' })).toHaveAttribute('href', company.whatsapp);
    for (const link of screen.getAllByRole('link', { name: 'Instagram' })) {
      expect(link).toHaveAttribute('href', company.instagram);
    }
  });
});
