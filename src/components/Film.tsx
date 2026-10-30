import { useState } from 'react';
import { film } from '../content';
import { Img } from './Img';
import { asset } from '../asset';

export function Film() {
  const [failed, setFailed] = useState(false);
  return (
    <section className="film" aria-label={film.label}>
      {failed ? (
        <Img src={film.poster} alt="" />
      ) : (
        <video
          src={asset(film.src)}
          poster={asset(film.poster)}
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
