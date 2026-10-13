const https = require('https');

const sites = [
  { name: 'Vikram Krishnamoorthy', url: 'https://insightful.in' },
  { name: 'Swapnil Kendhe', url: 'https://vivektaru.com' },
  { name: 'Basavaraj Tonagatti', url: 'https://www.basunivesh.com' },
  { name: 'Melvin Joseph', url: 'https://finvin.in' },
  { name: 'Preeti Zende', url: 'https://apnadhan.co.in' },
  { name: 'Avinash Luthria', url: 'https://fiduciaries.in' }
];

async function check() {
  for (const s of sites) {
    try {
      const html = await new Promise((res) => {
        https.get(s.url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, r => {
          let d = ''; r.on('data', c => d += c); r.on('end', () => res(d));
        }).on('error', () => res(''));
      });
      const matches = html.match(/linkedin\.com\/[^\s"'<>]+/gi) || [];
      console.log(s.name, '->', matches);
    } catch (e) {
      console.log(s.name, '-> error');
    }
  }
}
check();
