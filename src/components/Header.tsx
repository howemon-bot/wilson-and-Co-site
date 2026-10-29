import { useEffect, useState } from 'react';
import { company } from '../content';

const links = [
  { href: '#projects', label: 'projects' },
  { href: '#services', label: 'our services' },
  { href: '#contact', label: 'contact us' },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={solid ? 'site-header is-solid' : 'site-header'}>
      <a className="logo" href="#top">
        {company.mark}
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
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
