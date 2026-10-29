import { useState } from 'react';
import { film } from '../content';
import { Img } from './Img';

export function Film() {
  const [failed, setFailed] = useState(false);
  return (
    <section className="film" aria-label={film.label}>
      {failed ? (
        <Img src={film.poster} alt="" />
      ) : (
        <video
          src={film.src}
          poster={film.poster}
          controls
          muted
          playsInline
          preload="none"
          onError={() => setFailed(true)}
        />
      )}
    </section>
  );
}
