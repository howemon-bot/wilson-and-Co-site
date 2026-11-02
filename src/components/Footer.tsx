import { company, contacts } from '../content';

const general = contacts.find((c) => c.name === 'General enquiries') ?? contacts[contacts.length - 1];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p className="footer-place">Barcelona, Spain</p>
        <a className="footer-link footer-email" href={`mailto:${general.email}`}>
          {general.email} <span aria-hidden="true">↗</span>
        </a>
        <a className="footer-link footer-social" href={company.instagram} target="_blank" rel="noreferrer">
          Instagram <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div className="footer-base">
        <p>© {new Date().getFullYear()} WILSONANDCO</p>
        <details id="privacy" className="privacy">
          <summary>Privacy policy</summary>
          <p>We use your name and email only to answer an enquiry. We don’t sell or share those details.</p>
        </details>
      </div>
    </footer>
  );
}
