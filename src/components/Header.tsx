import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo';
import { company } from '../content';
import { useLang } from '../i18n';
import { InstagramIcon, MailIcon } from './Icons';

const links = [
  { href: '#projects', key: 'projects' },
  { href: '#services', key: 'services' },
  { href: '#contact', key: 'contact' },
] as const;

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
  const { lang, setLang, t, c } = useLang();
  // The two founders' emails, with what each one looks after.
  const people = c.contacts.filter((p) => !p.general);
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
      <div className="lang-switch" role="group" aria-label={t.language}>
        <button type="button" lang="en" aria-label="English" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
          EN
        </button>
        <span aria-hidden="true">|</span>
        <button type="button" lang="es" aria-label="Español" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>
          ES
        </button>
      </div>
      <button
        ref={button}
        className="menu-btn"
        type="button"
        aria-label={open ? t.closeMenu : t.openMenu}
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
          <nav aria-label={t.mainNav}>
            <ul className="menu-links">
              {links.map((l, i) => (
                <li key={l.href}>
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={l.href}
                    aria-current={active === l.href ? 'true' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span>{t.nav[l.key]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="menu-foot">
            {people.map((p) => (
              <p key={p.email}>
                <span className="menu-topic">{p.topic}</span>
                <a href={`mailto:${p.email}`}>
                  <MailIcon />
                  {p.email}
                </a>
              </p>
            ))}
            <p>
              <span className="menu-topic">{company.city}</span>
              <a href={company.instagram} target="_blank" rel="noreferrer">
                <InstagramIcon />
                Instagram
              </a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
