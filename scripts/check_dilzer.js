const https = require('https');

https.get('https://dilzer.net', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  let d = ''; res.on('data', c => d += c);
  res.on('end', () => {
    const m = d.match(/https?:\/\/(?:www\.)?linkedin\.com\/[^\s"'<>]+/gi) || [];
    console.log('Dilzer LinkedIn:', [...new Set(m)]);
  });
}).on('error', e => console.log('Err:', e.message));
