import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { GA_ID, savedConsent } from './analytics';

const gaScript = () => document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_ID}"]`);

describe('Cookie banner', () => {
  afterEach(() => {
    window.localStorage.clear();
    window.history.replaceState(null, '', '/');
  });

  it('asks before loading anything from Google, and Decline keeps it that way', async () => {
    const user = userEvent.setup();
    render(<App />);
    const banner = screen.getByRole('region', { name: 'Cookies' });
    expect(gaScript()).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Decline' }));
    expect(banner).not.toBeInTheDocument();
    expect(savedConsent()).toBe('denied');
    expect(gaScript()).toBeNull();
  });

  it('loads Google Analytics after Accept, and can be reopened from the footer', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Accept' }));
    expect(savedConsent()).toBe('granted');
    expect(gaScript()).not.toBeNull();
    expect(screen.queryByRole('region', { name: 'Cookies' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cookies' }));
    expect(screen.getByRole('region', { name: 'Cookies' })).toBeInTheDocument();
  });

  it('stays hidden once the visitor has chosen', () => {
    window.localStorage.setItem('wco-consent', 'denied');
    render(<App />);
    expect(screen.queryByRole('region', { name: 'Cookies' })).not.toBeInTheDocument();
  });
});
