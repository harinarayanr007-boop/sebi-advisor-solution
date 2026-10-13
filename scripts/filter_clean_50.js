const fs = require('fs');

const raw = JSON.parse(fs.readFileSync('scripts/verified_boutique_bad_websites.json', 'utf8'));

const badTitles = /restricted|parking|for sale|godaddy|hostinger|suspended|apache|iis windows|403|404|not found|access denied|error|login|under construction|coming soon/i;
const peVcMega = /private equity|pe fund|venture capital|affirma|adv partners|abakkus|1 finance|barclays|etmoney|ask |motilal|kotak|hdfc|icici/i;

const cleanedList = [];
for (const item of raw) {
  // Check title
  if (!item.title || item.title.trim().length === 0) continue;
  if (badTitles.test(item.title)) continue;
  if (/[\u4e00-\u9fa5]/.test(item.title)) continue; // Chinese characters

  // Check PE/VC or Mega firms
  if (peVcMega.test(item.firm)) continue;
  if (peVcMega.test(item.title)) continue;

  cleanedList.push(item);
}

console.log(`Cleaned list has ${cleanedList.length} genuine boutique advisory firms with working websites.`);
cleanedList.slice(0, 30).forEach((l, idx) => {
  console.log(`${idx+1}. ${l.contact} | ${l.firm} | ${l.email} | ${l.verifiedWeb} | Title: "${l.title}"`);
});
