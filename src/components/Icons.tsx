// Small line icons, drawn rather than typed: characters like ↗ turn into
// emoji on iPhones. They take the colour of the text around them.

export function OutArrow({ className = 'out-arrow' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M1.5 10.5 10.5 1.5M3.5 1.5h7v7" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg className="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <rect x="1.5" y="3.5" width="13" height="9" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M1.5 3.5 8 9l6.5-5.5" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function InstagramIcon() {
  return (
    <svg className="icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <rect x="1.5" y="1.5" width="13" height="13" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="11.9" cy="4.1" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function PagerArrow({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg className="pager-arrow" viewBox="0 0 24 12" width="24" height="12" aria-hidden="true">
      <path
        d={dir === 'right' ? 'M0 6h23M17.5 0.5 23 6l-5.5 5.5' : 'M24 6H1M6.5 0.5 1 6l5.5 5.5'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
