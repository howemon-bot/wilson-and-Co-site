import { company, contacts } from '../content';
import { InstagramIcon, MailIcon, OutArrow } from './Icons';

const general = contacts.find((c) => c.name === 'General enquiries') ?? contacts[contacts.length - 1];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p className="footer-place">Barcelona, Spain</p>
        <a className="footer-link footer-email" href={`mailto:${general.email}`}>
          <MailIcon />
          {general.email} <OutArrow />
        </a>
        <a className="footer-link footer-social" href={company.instagram} target="_blank" rel="noreferrer">
          <InstagramIcon />
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
