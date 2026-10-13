const fs = require('fs');
const dns = require('dns').promises;

const genericDomains = new Set([
  'gmail.com', 'yahoo.com', 'yahoo.co.in', 'rediffmail.com', 
  'hotmail.com', 'outlook.com', 'icloud.com', 'live.com', 'ymail.com'
]);

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
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

function cleanTradeName(name) {
  let clean = name;
  clean = clean.replace(/\(proprietor\s*:?\s*[^)]+\)/gi, '');
  clean = clean.replace(/proprietor\s*(of|:|-)?\s*/gi, '');
  clean = clean.replace(/\b(private\s+limited|pvt\s+ltd|pvt\s+limited|limited|ltd|llp)\b/gi, '');
  clean = clean.replace(/[^a-zA-Z0-9\s]/g, ' ');
  clean = clean.trim().replace(/\s+/g, ' ');
  return clean;
}

async function resolveWebsite(name, contact, email) {
  // 1. From email domain if custom
  if (email && email.includes('@')) {
    const domain = email.split('@')[1].trim().toLowerCase();
    if (!genericDomains.has(domain) && domain.includes('.')) {
      return `https://${domain}`;
    }
  }

  // 2. Try inferring from trade name
  const tradeClean = cleanTradeName(name);
  if (tradeClean && tradeClean.length > 3) {
    const slug = tradeClean.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (slug.length >= 4 && slug.length <= 25) {
      const candidates = [slug + '.in', slug + '.com', slug + '.co.in'];
      for (const cand of candidates) {
        try {
          await Promise.race([
            dns.lookup(cand),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 500))
          ]);
          return `https://${cand}`;
        } catch (e) {}
      }
    }
  }

  // 3. Fallback: Google search URL to find their site instantly
  const query = encodeURIComponent(`${tradeClean || name} SEBI registered investment adviser website`);
  return `https://www.google.com/search?q=${query}`;
}

(async () => {
  const raw = fs.readFileSync('public/sebi_registered_advisers.csv', 'utf8');
  const lines = raw.trim().split('\n');
  console.log('Testing first 30 rows...');
  for (let i = 1; i <= 30; i++) {
    const cols = parseCSVLine(lines[i]);
    const name = cols[1];
    const contact = cols[3];
    const email = cols[4];
    const site = await resolveWebsite(name, contact, email);
    console.log(`${cols[0]} | ${name} -> ${site}`);
  }
})();
