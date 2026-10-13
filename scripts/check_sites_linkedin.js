const https = require('https');

function checkSite(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let d = '';
      res.on('data', chunk => d += chunk);
      res.on('end', () => {
        const m = d.match(/https?:\/\/(?:www\.)?linkedin\.com\/in\/[a-zA-Z0-9_\-%]+/gi) || [];
        resolve([...new Set(m)]);
      });
    }).on('error', () => resolve([]));
  });
}

(async () => {
  const fiduciaries = await checkSite('https://fiduciaries.in');
  console.log('Fiduciaries:', fiduciaries);
  const ladder7 = await checkSite('https://ladder7.co.in');
  console.log('Ladder7:', ladder7);
})();
