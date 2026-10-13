const fs = require('fs');
const list = JSON.parse(fs.readFileSync('scripts/final_bad_web_leads.json', 'utf8'));

console.log('--- ALL 50 BAD WEBSITE LEADS ---');
list.forEach((l, i) => {
  console.log(`${i+1}. ${l.firstName} | ${l.fullName} | Firm: ${l.firmName} | Email: ${l.email} | URL: ${l.websiteUrl}`);
});

const noList = JSON.parse(fs.readFileSync('scripts/final_no_web_leads.json', 'utf8'));
console.log('\n--- ALL 50 NO WEBSITE LEADS ---');
noList.forEach((l, i) => {
  console.log(`${i+1}. ${l.firstName} | ${l.fullName} | Firm: ${l.firmName} | Email: ${l.email}`);
});
