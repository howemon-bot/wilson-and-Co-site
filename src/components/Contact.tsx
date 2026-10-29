import { contacts } from '../content';

export function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title">Contact us</h2>
      <ul>
        {contacts.map((c) => (
          <li key={c.email}>
            <h3>{c.name}</h3>
            <p>{c.topic}</p>
            <a href={`mailto:${c.email}`}>{c.email}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
