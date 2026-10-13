const fs = require('fs');
const xlsx = require('xlsx');

const wb = xlsx.readFile('public/50_50_advisor_leads.xlsx');
console.log('Workbook sheet names:', wb.SheetNames);
for (const name of wb.SheetNames) {
  const sheet = wb.Sheets[name];
  const json = xlsx.utils.sheet_to_json(sheet);
  console.log(`Sheet "${name}" has ${json.length} rows`);
}

const badCsv = fs.readFileSync('public/50_leads_bad_websites.csv', 'utf8').trim().split('\n');
console.log('Bad websites CSV rows (including header):', badCsv.length);

const noCsv = fs.readFileSync('public/50_leads_no_website.csv', 'utf8').trim().split('\n');
console.log('No website CSV rows (including header):', noCsv.length);

// Sample first 5 from bad websites
const badSample = JSON.parse(fs.readFileSync('scripts/final_bad_web_leads.json', 'utf8')).slice(0, 5);
console.log('\n--- SAMPLE 5 BAD WEBSITE LEADS ---');
badSample.forEach(s => {
  console.log(`${s.sno}. ${s.fullName} (${s.firmName}) | Email: ${s.email} | URL: ${s.websiteUrl} | Critique: ${s.critique}`);
});

// Sample first 5 from no website
const noSample = JSON.parse(fs.readFileSync('scripts/final_no_web_leads.json', 'utf8')).slice(0, 5);
console.log('\n--- SAMPLE 5 NO WEBSITE LEADS ---');
noSample.forEach(s => {
  console.log(`${s.sno}. ${s.fullName} (${s.firmName}) | Email: ${s.email} | Status: ${s.websiteStatus}`);
});
