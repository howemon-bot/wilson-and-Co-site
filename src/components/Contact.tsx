import { contacts } from '../content';

const general = contacts.find((c) => c.name === 'General enquiries') ?? contacts[contacts.length - 1];

export function Contact() {
  const [user, domain] = general.email.split('@');
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-label">
        Contact
      </h2>
      <a className="contact-big" href={`mailto:${general.email}`}>
        <span>{user}@</span>
        <span>{domain}</span>
      </a>
      <ul>
        {contacts.map((c) => (
          <li key={c.email}>
            <p>{c.name === 'General enquiries' ? c.name : c.topic}</p>
            <a className="link" href={`mailto:${c.email}`}>
              {c.email}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
