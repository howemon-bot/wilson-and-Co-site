import { OutArrow } from './Icons';
import { useLang } from '../i18n';

export function Contact() {
  const { t, c: content } = useLang();
  const contacts = content.contacts;
  const general = contacts.find((c) => c.general) ?? contacts[contacts.length - 1];
  const [user, domain] = general.email.split('@');
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-label">
        {t.contactTitle}
      </h2>
      <a className="contact-big" href={`mailto:${general.email}`}>
        <span>{user}@</span>
        <span>{domain}</span>
      </a>
      <ul>
        {contacts.map((c) => (
          <li key={c.email}>
            <p>{c.general ? c.name : c.topic}</p>
            <a className="link" href={`mailto:${c.email}`}>
              {c.email}
              <OutArrow className="out-arrow contact-arrow" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
