// server/scripts/generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Rutas estáticas y dinámicas de tu API pública (la parte de React que sirves desde /client/build)
const routes = [
  '/',
  '/productos',
  // aquí podrías incluso cargar dinámicamente tus IDs de producto desde la base si quisieras
];

(async () => {
  const sitemapPath = path.resolve(__dirname, '../client/public/sitemap.xml');
  const stream = new SitemapStream({
    hostname: process.env.FRONTEND_URL || 'https://proyecto-web-atv7.onrender.com'
  });
  const writeStream = createWriteStream(sitemapPath);
  stream.pipe(writeStream);
  routes.forEach(r => stream.write({ url: r, changefreq: 'daily', priority: 0.8 }));
  stream.end();
  await streamToPromise(stream);
  console.log('✅ sitemap generado en client/public/sitemap.xml');
})();
