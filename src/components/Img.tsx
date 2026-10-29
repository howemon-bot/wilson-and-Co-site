import { useState } from 'react';

type Props = { src: string; alt: string; className?: string; priority?: boolean };

// Shows a labelled frame when the file is not in public/ yet.
export function Img({ src, alt, className, priority }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const name = src.split('/').pop() ?? src;
    return (
      <span className={`ph ${className ?? ''}`} role="img" aria-label={alt}>
        <span className="ph-name">{name}</span>
      </span>
    );
  }
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  );
}
