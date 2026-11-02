import { Fragment } from 'react';

// "*word*" in the content becomes an italic word.
export function withItalics(text: string) {
  return text.split(/\*([^*]+)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : <Fragment key={i}>{part}</Fragment>));
}
