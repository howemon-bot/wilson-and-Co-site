import { company } from '../content';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <a className="logo" href="#top">
          {company.mark}
        </a>
        <div>
          <h2>Social</h2>
          <ul>
            <li>
              <a href={company.instagram}>Instagram</a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Info</h2>
          <ul>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#contact">Contact us</a>
            </li>
          </ul>
        </div>
      </div>
      <p className="legal">© {new Date().getFullYear()} wilsonandco</p>
      <section id="privacy" className="privacy">
        <h2>Privacy Policy</h2>
        <p>We use your name and email only to answer an enquiry. We don’t sell or share those details.</p>
      </section>
    </footer>
  );
}
