const fs = require('fs');
const lines = fs.readFileSync('public/sebi_registered_advisers.csv', 'utf8').trim().split('\n');

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

const alreadyUsed = new Set([
  'aartim159@gmail.com', 'info@aaumcapital.com', 'abhijit.talukdar@attainix.com',
  'abhishekk@sahajmoney.com', 'abhishek.phore@controlwealth.co.in', 'dinesh@acuitascapital.in',
  'navneetd.917@gmail.com', 'adviser@29kadvisers.com', 'ketan@3qwealth.com', 'rajesh@90to10.com',
  'abraham.cherian.ria@gmail.com', 'info@accelpru.com', 'preetikz@gmail.com',
  'aditya.invest@outlook.com', 'dilshad@dilzer.net', 'basunivesh@gmail.com'
]);

const badSiteLeads = [];

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  const sno = cols[0];
  const firm = cols[1];
  const contact = cols[3];
  const email = cols[4];
  const phone = cols[5];
  const addr = cols[6];
  const website = cols[8];

  if (!email || !email.includes('@')) continue;
  const emailClean = email.trim().toLowerCase();
  if (alreadyUsed.has(emailClean)) continue;

  // Filter out giant institutional banks
  if (/iifl|motilal|kotak|icici|hdfc|axis|360 one|marwadi|tata|sbi|bajaj|reliance|dsp|franklin|nippon|uti/i.test(firm)) continue;

  const isGenericEmail = /gmail\.com|yahoo\.|rediffmail\.|hotmail\.|outlook\./i.test(emailClean);
  const isSearchSite = website.startsWith('https://www.google.com/search');

  if ((isGenericEmail || isSearchSite) && contact && contact.length > 2 && !/ltd|limited|services|private/i.test(contact)) {
    if (/mumbai|bangalore|bengaluru|pune|delhi|gurugram|chennai|hyderabad|ahmedabad|kolkata/i.test(addr)) {
      badSiteLeads.push({
        sno,
        firm,
        contact,
        email: emailClean,
        phone,
        addr,
        website,
        isSearchSite,
        isGenericEmail
      });
    }
  }
}

console.log('Total bad/outdated site advisers found:', badSiteLeads.length);
badSiteLeads.slice(0, 20).forEach((l, idx) => {
  console.log(`${idx+1}. [${l.contact}] | Firm: ${l.firm} | Email: ${l.email}`);
});
