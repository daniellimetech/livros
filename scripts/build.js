import { mkdir, copyFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
await mkdir(new URL('dist/', root), { recursive: true });
for (const file of ['index.html', 'style.css', 'app.js', 'model.js']) {
  await copyFile(new URL(file, root), new URL(`dist/${file}`, root));
}
console.log('Site estático gerado em dist/');
