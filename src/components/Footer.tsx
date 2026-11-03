import { company, contacts } from '../content';

// A thin drawn arrow: the ↗ character turns into an emoji on iPhones.
function OutArrow() {
  return (
    <svg className="out-arrow" viewBox="0 0 12 12" width="12" height="12" aria-hidden="true">
      <path d="M1.5 10.5 10.5 1.5M3.5 1.5h7v7" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

const general = contacts.find((c) => c.name === 'General enquiries') ?? contacts[contacts.length - 1];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p className="footer-place">Barcelona, Spain</p>
        <a className="footer-link footer-email" href={`mailto:${general.email}`}>
          {general.email} <OutArrow />
        </a>
        <a className="footer-link footer-social" href={company.instagram} target="_blank" rel="noreferrer">
          Instagram <OutArrow />
        </a>
      </div>
      <div className="footer-base">
        <p>© {new Date().getFullYear()} Wilson &amp; Co</p>
        <details id="privacy" className="privacy">
          <summary>Privacy policy</summary>
          <p>We use your name and email only to answer an enquiry. We don’t sell or share those details.</p>
        </details>
      </div>
    </footer>
  );
}
