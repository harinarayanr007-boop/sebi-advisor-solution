const fs = require('fs');

const raw = fs.readFileSync('public/sebi_registered_advisers.csv', 'utf8');
const lines = raw.trim().split('\n');

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

const withWeb = [];
const noWeb = [];

for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  const sno = cols[0];
  const firm = cols[1];
  const regNo = cols[2];
  const contact = cols[3];
  const email = (cols[4] || '').trim();
  const phone = cols[5];
  const addr = cols[6];
  const web = (cols[8] || '').trim();

  if (!email || !email.includes('@')) continue;
  if (/iifl|motilal|kotak|icici|hdfc|axis|360 one|marwadi|tata|sbi|bajaj|reliance|dsp|franklin|nippon|uti|geojit|edelweiss|sharekhan|angel one|zerodha|groww/i.test(firm)) {
    continue; // skip big institutional brokerages/banks
  }

  // Check city
  let city = 'India';
  const addrMatch = addr.match(/(MUMBAI|BANGALORE|BENGALURU|PUNE|DELHI|NEW DELHI|GURUGRAM|GURGAON|NOIDA|HYDERABAD|CHENNAI|AHMEDABAD|KOLKATA|JAIPUR|CHANDIGARH|SURAT|VADODARA|INDORE|COIMBATORE|KOCHI|LUCKNOW)/i);
  if (addrMatch) {
    city = addrMatch[1].toUpperCase();
    if (city === 'BENGALURU') city = 'Bangalore';
    if (city === 'GURGAON') city = 'Gurugram';
    if (city === 'NEW DELHI') city = 'Delhi';
  }

  // Format first name
  let firstName = contact.split(' ')[0].trim();
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  if (firstName.length < 2 || /^(Mr|Mrs|Ms|Dr|Ca|Adv)$/i.test(firstName)) {
    const parts = contact.split(' ').filter(p => !/^(Mr|Mrs|Ms|Dr|Ca|Adv)$/i.test(p));
    if (parts.length > 0) {
      firstName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
    }
  }

  const record = {
    sno,
    firm,
    regNo,
    contact,
    firstName,
    email,
    phone,
    addr,
    city,
    web
  };

  if (web && web.startsWith('http') && !web.startsWith('https://www.google.com/search')) {
    withWeb.push(record);
  } else {
    noWeb.push(record);
  }
}

console.log(`Found ${withWeb.length} potential advisers WITH actual websites`);
console.log(`Found ${noWeb.length} potential advisers with NO website`);

fs.writeFileSync('scripts/candidates_with_web.json', JSON.stringify(withWeb, null, 2));
fs.writeFileSync('scripts/candidates_no_web.json', JSON.stringify(noWeb, null, 2));
