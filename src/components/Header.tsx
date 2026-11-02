import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { company, contacts } from '../content';

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

// The two founders' emails, with what each one looks after.
const people = contacts.filter((c) => c.name !== 'General enquiries');

// The section in view is the last one whose top has passed 40% of the screen.
function sectionInView() {
  let current = '';
  for (const l of links) {
    const el = document.querySelector(l.href);
    if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.href;
  }
  return current;
}

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const firstLink = useRef<HTMLAnchorElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.72);
      setActive(sectionInView());
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Closed, the menu can't be tabbed into.
  useEffect(() => {
    menu.current?.toggleAttribute('inert', !open);
  }, [open]);

  // While open: lock the page, focus the first link, Escape closes.
  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add('is-menu-open');
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('is-menu-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className={solid ? 'site-header is-solid' : 'site-header'}>
      <a className="logo" href="#top" onClick={() => setOpen(false)}>
        <Logo />
      </a>
      <button
        ref={button}
        className="menu-btn"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
      <div ref={menu} id="site-menu" className={open ? 'menu is-open' : 'menu'} aria-hidden={!open}>
        <div className="menu-scrim" onClick={() => setOpen(false)} />
        <div className="menu-panel">
          <nav aria-label="Main">
            <ul className="menu-links">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    aria-current={active === l.href ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-foot">
            {people.map((c) => (
              <p key={c.email}>
                <span className="menu-topic">{c.topic}</span>
                <a href={`mailto:${c.email}`}>{c.email}</a>
              </p>
            ))}
            <p>
              <span className="menu-topic">{company.city}</span>
              <a href={company.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
