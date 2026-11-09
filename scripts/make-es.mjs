// After the build: write dist/es/index.html, the Spanish page at wilsonandco.es/es/.
// Same app; only the page language, title, description and addresses change, so
// Google sees a Spanish page. Keep these words in step with es.meta in src/content.es.ts.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const title = 'Wilson &amp; Co | Reformas, interiorismo e instalaciones en Barcelona';
const description =
  'Interiorismo, reformas e instalaciones con el diseño como punto de partida, en Barcelona y alrededores. Materiales locales, atención al detalle y un solo equipo de principio a fin.';
const url = 'https://wilsonandco.es/es/';

let html = readFileSync('dist/index.html', 'utf8');
const swaps = [
  [/<html lang="en">/, '<html lang="es">'],
  [/<title>[^<]*<\/title>/, `<title>${title}</title>`],
  [/(<meta name="description" content=")[^"]*/, `$1${description}`],
  [/(<meta property="og:title" content=")[^"]*/, `$1${title}`],
  [/(<meta property="og:description" content=")[^"]*/, `$1${description}`],
  [/(<meta property="og:url" content=")[^"]*/, `$1${url}`],
  [/(<link rel="canonical" href=")[^"]*/, `$1${url}`],
];
for (const [find, replace] of swaps) {
  if (!find.test(html)) throw new Error(`make-es: not found in index.html: ${find}`);
  html = html.replace(find, replace);
}
mkdirSync('dist/es', { recursive: true });
writeFileSync('dist/es/index.html', html);
console.log('wrote dist/es/index.html');
