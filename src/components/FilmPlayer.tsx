import { useEffect, useRef } from 'react';
import { film } from '../content';
import { asset } from '../asset';

// Full-screen player for the film with its voiceover.
export function FilmPlayer({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.documentElement.classList.add('is-playing');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('is-playing');
      opener?.focus();
    };
  }, [onClose]);

  return (
    <div className="film-player" role="dialog" aria-modal="true" aria-label={film.label}>
      <button ref={closeRef} type="button" className="film-player-close link" onClick={onClose}>
        Close
      </button>
      <video src={asset(film.full)} poster={asset(film.poster)} controls autoPlay playsInline />
    </div>
  );
}
