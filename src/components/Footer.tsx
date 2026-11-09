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
        <div className="footer-legal">
          <details id="legal" className="privacy">
            <summary>{t.legal}</summary>
            <p>
              {t.legalLabels.owner}: {company.owner.name}
              <br />
              {t.legalLabels.nif}: {company.owner.nif}
              <br />
              {t.legalLabels.address}: {company.owner.city}
              <br />
              {t.legalLabels.email}: <a href={`mailto:${company.owner.email}`}>{company.owner.email}</a>
            </p>
          </details>
          <details id="privacy" className="privacy">
            <summary>{t.privacy}</summary>
            <p>{t.privacyText}</p>
          </details>
        </div>
      </div>
    </footer>
  );
}
