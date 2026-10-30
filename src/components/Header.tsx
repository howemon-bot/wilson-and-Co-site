import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const links = [
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
];

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

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.72);
      setActive(sectionInView());
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={solid ? 'site-header is-solid' : 'site-header'}>
      <a className="logo" href="#top">
        <Logo />
      </a>
      <button
        className="menu-btn"
        type="button"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'Menu'}
      </button>
      <nav id="site-nav" aria-label="Main" className={open ? 'is-open' : undefined}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                aria-current={active === l.href ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
