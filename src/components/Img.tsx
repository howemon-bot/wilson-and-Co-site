import { useState, type CSSProperties } from 'react';
import { asset } from '../asset';

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  style?: CSSProperties;
};

// Shows a labelled frame when the file is not in public/ yet.
export function Img({ src, alt, className, priority, style }: Props) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    const name = src.split('/').pop() ?? src;
    return (
      <span className={`ph ${className ?? ''}`} role="img" aria-label={alt} style={style}>
        <span className="ph-name">{name}</span>
      </span>
    );
  }
  return (
    <img
      className={className}
      src={asset(src)}
      alt={alt}
      style={style}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
    />
  );
}
