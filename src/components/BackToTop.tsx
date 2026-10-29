import { useEffect, useState } from 'react';

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <a className="to-top" href="#top" aria-label="Back to top">
      <svg viewBox="0 0 21 32" width="18" height="28" aria-hidden="true">
        <path d="M17 6h1v26h-1L0 32V31l17-1z" fill="currentColor" />
        <polygon points="17.5,6 14,6 15.75,3 17.5,0 19.25,3 21,6" fill="currentColor" />
      </svg>
    </a>
  );
}
