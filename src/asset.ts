// Files in public/ are written as "/images/x.jpg". The GitHub Pages preview
// lives in a sub-folder, so prefix them with the build's base path.
export function asset(path: string) {
  return path.startsWith('/') ? import.meta.env.BASE_URL + path.slice(1) : path;
}
