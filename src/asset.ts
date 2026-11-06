import { imageVersions } from './imageVersions';

// Files in public/ are written as "/images/x.jpg". The GitHub Pages preview
// lives in a sub-folder, so prefix them with the build's base path. Photos also
// get "?v=<code>", which changes when the photo is replaced, so browsers don't
// keep showing an old saved copy.
export function asset(path: string) {
  if (!path.startsWith('/')) return path;
  const v = imageVersions[path];
  return import.meta.env.BASE_URL + path.slice(1) + (v ? `?v=${v}` : '');
}
