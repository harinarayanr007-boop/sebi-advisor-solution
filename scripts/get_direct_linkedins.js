const https = require('https');
const http = require('http');

const sites = [
  { name: 'Preeti Zende', url: 'https://apnadhan.co.in' },
  { name: 'Basavaraj Tonagatti', url: 'https://www.basunivesh.com' },
  { name: 'Swapnil Kendhe', url: 'https://vivektaru.com' },
  { name: 'Vikram Krishnamoorthy', url: 'https://insightadvisory.in' },
  { name: 'Avinash Luthria', url: 'https://fiduciaries.in' },
  { name: 'Rajesh Rao', url: 'https://90to10.com' }
];

function fetch(url) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 6000 }, (res) => {
        let d = '';
        res.on('data', chunk => d += chunk);
        res.on('end', () => resolve(d));
      }).on('error', () => resolve('')).on('timeout', () => resolve(''));
    } catch (e) {
      resolve('');
    }
  });
}

(async () => {
  for (const s of sites) {
    const html = await fetch(s.url);
    const m = html.match(/https?:\/\/(?:www\.)?linkedin\.com\/(?:in|company)\/[a-zA-Z0-9_\-%]+/gi) || [];
    console.log(s.name, '->', [...new Set(m)].join(' | '));
  }
})();
