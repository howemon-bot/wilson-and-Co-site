import { useEffect, useState } from 'react';

// A small cream circle with a thin arrow, so it reads on any background.
export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={show ? 'to-top is-shown' : 'to-top'}
      href="#top"
      aria-label="Back to top"
      aria-hidden={!show}
      tabIndex={show ? undefined : -1}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
        <path d="M8 13.5V2.5M3.5 7L8 2.5 12.5 7" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
    </a>
  );
}
