// Simple sitemap generator for ABZ&ELLIE'S Place
const fs = require('fs');
const path = require('path');

const baseUrl = 'https://abz-ellie-s-place.vercel.app';
const currentDate = new Date().toISOString().split('T')[0];

const pages = [
  {
    url: '/',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    url: '/shop',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.9'
  },
  {
    url: '/current-stock',
    lastmod: currentDate,
    changefreq: 'daily',
    priority: '0.8'
  },
  {
    url: '/about',
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.7'
  },
  {
    url: '/contact',
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: '0.6'
  }
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = path.join(__dirname, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully!');
};

// Run if called directly
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };