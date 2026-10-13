const fs = require('fs');
const list = JSON.parse(fs.readFileSync('scripts/verified_boutique_bad_websites.json', 'utf8'));

list.slice(30, 84).forEach((l, idx) => {
  console.log(`${idx+31}. ${l.contact} | ${l.firm} | ${l.email} | ${l.verifiedWeb} | Title: "${l.title}"`);
});
