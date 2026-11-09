import { company, contacts } from '../content';
import { InstagramIcon, MailIcon, OutArrow } from './Icons';
import { useLang } from '../i18n';

const general = contacts.find((c) => c.general) ?? contacts[contacts.length - 1];

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <p className="footer-place">{t.place}</p>
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
          <summary>{t.privacy}</summary>
          <p>{t.privacyText}</p>
        </details>
      </div>
    </footer>
  );
}
