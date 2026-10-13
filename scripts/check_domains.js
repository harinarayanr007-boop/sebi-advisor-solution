const fs = require('fs');

const raw = fs.readFileSync('public/sebi_registered_advisers.csv', 'utf8');
const lines = raw.trim().split('\n');
console.log('Total lines:', lines.length);

const genericDomains = new Set([
  'gmail.com', 'yahoo.com', 'yahoo.co.in', 'rediffmail.com', 
  'hotmail.com', 'outlook.com', 'icloud.com', 'live.com'
]);

let custom = 0;
let generic = 0;
let noEmail = 0;

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  const emailMatch = line.match(/[\w.-]+@([\w.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) {
    const domain = emailMatch[1].toLowerCase();
    if (genericDomains.has(domain)) {
      generic++;
    } else {
      custom++;
    }
  } else {
    noEmail++;
  }
}

console.log('Custom corporate domains from email:', custom);
console.log('Generic (gmail/yahoo/etc):', generic);
console.log('No email found:', noEmail);
