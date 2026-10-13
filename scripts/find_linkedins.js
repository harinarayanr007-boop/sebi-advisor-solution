const https = require('https');
const http = require('http');

const sites = [
  { name: 'Abraham Cherian', url: 'https://360wealthadvice.in' },
  { name: 'Abhishek Kumar', url: 'https://sahajmoney.com' },
  { name: 'Abhishek Phore', url: 'https://controlwealth.co.in' },
  { name: 'Umang Parekh', url: 'https://accelpru.com' },
  { name: 'Abhijit Talukdar', url: 'https://attainix.com' },
  { name: 'Aarti Mohan', url: 'https://aurionadvisors.in' },
  { name: 'Acuity Insights (Navneet Daga)', url: 'https://acuityinsights.in' }
];

function fetchHtml(url) {
  return new Promise((resolve) => {
    try {
      const client = url.startsWith('https') ? https : http;
      const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 5000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return fetchHtml(res.headers.location).then(resolve);
        }
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve(data));
      });
      req.on('error', () => resolve(''));
      req.on('timeout', () => { req.destroy(); resolve(''); });
    } catch (e) {
      resolve('');
    }
  });
}

(async () => {
  for (const s of sites) {
    const html = await fetchHtml(s.url);
    const matches = html.match(/https?:\/\/(?:www\.)?linkedin\.com\/(?:in|company)\/[a-zA-Z0-9_-]+/gi) || [];
    const unique = [...new Set(matches)];
    console.log(s.name, '->', unique.join(', ') || 'None found');
  }
})();
