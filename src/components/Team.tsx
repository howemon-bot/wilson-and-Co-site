import { team } from '../content';
import { Img } from './Img';

function Instagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  );
}

function WhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15">
      <path
        fill="currentColor"
        d="M12 3.2A8.7 8.7 0 0 0 4.6 16.3L3.4 20.6l4.4-1.15A8.8 8.8 0 1 0 12 3.2zm4.9 12.4c-.2.6-1.2 1.1-1.7 1.15-.4.05-.9.2-3.1-.65-2.6-1-4.3-3.7-4.4-3.9-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5.2.6.8 2 .8 2.1.1.2.1.3 0 .5-.1.2-.2.4-.3.5l-.4.5c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.3.1 1.6.8 1.9.9.3.2.4.2.5.3.1.2.1.8-.1 1.4z"
      />
    </svg>
  );
}

function Mail() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="15" height="15">
      <rect x="3" y="5" width="18" height="14" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Team() {
  return (
    <section className="team" id="team" aria-labelledby="team-title">
      <h2 id="team-title">{team.heading}</h2>
      <p className="team-intro">{team.intro}</p>
      <ul>
        {team.members.map((m) => (
          <li key={m.name}>
            <div className="portrait">
              <Img src={m.image} alt={`Portrait of ${m.name}`} />
            </div>
            <h3>{m.name}</h3>
            <p className="role">{m.role}</p>
            <p className="socials">
              <a href={m.instagram} aria-label="Instagram">
                <Instagram />
              </a>
              {m.whatsapp && (
                <a href={m.whatsapp} aria-label="WhatsApp Rohan">
                  <WhatsApp />
                </a>
              )}
              <a href={`mailto:${m.email}`} aria-label={`Email ${m.name}`}>
                <Mail />
              </a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
