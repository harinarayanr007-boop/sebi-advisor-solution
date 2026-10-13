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

const targets = [];
for (let i = 1; i < lines.length; i++) {
  const cols = parseCSVLine(lines[i]);
  const sno = cols[0];
  const name = cols[1];
  const regNo = cols[2];
  const contact = cols[3];
  const email = cols[4];
  const phone = cols[5];
  const addr = cols[6];
  const website = cols[8];
  const linkedin = cols[9];

  // Skip giant institutions
  if (/iifl|motilal|kotak|icici|hdfc|axis|360 one|marwadi|tata|sbi|bajaj|reliance|dsp|franklin|nippon|uti/i.test(name)) continue;

  // Look for solo/boutique planners in tech wealth hubs
  if (/bangalore|bengaluru|mumbai|pune|gurugram|delhi|hyderabad|chennai/i.test(addr)) {
    // Prefer individual practitioners & boutique proprietors
    if (contact && contact.length > 2 && !/ltd|limited|services|private/i.test(contact)) {
      targets.push({ sno, name, contact, email, phone, addr, website, linkedin });
    }
  }
}

console.log('Total boutique targets in top hubs:', targets.length);

// Select 10 prime targets with clear first names, distinct cities, and great pitch angles
const top10 = targets.slice(5, 15);
top10.forEach((t, idx) => {
  console.log(`\nTARGET #${idx + 1}:`);
  console.log(`Name: ${t.contact}`);
  console.log(`Firm: ${t.name}`);
  console.log(`Email: ${t.email}`);
  console.log(`City: ${t.addr.split(',').slice(-3).join(',').trim()}`);
  console.log(`Website: ${t.website}`);
  console.log(`LinkedIn: ${t.linkedin}`);
});
