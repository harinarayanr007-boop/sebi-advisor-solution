const fs = require('fs');
const dns = require('dns').promises;

const genericDomains = new Set([
  'gmail.com', 'yahoo.com', 'yahoo.co.in', 'rediffmail.com', 
  'hotmail.com', 'outlook.com', 'icloud.com', 'live.com', 'ymail.com', 'zoho.com'
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

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function extractBrandCandidates(name) {
  const candidates = [];
  
  // Pattern 1: (Proprietor : Brand Name) or (Brand Name)
  const parenMatch = name.match(/\(([^)]+)\)/);
  if (parenMatch) {
    let inside = parenMatch[1].replace(/proprietor\s*(?:of|:|-)?/i, '').trim();
    if (inside.length >= 3) candidates.push(inside);
  }

  // Pattern 2: Proprietor of Brand Name / Proprietor : Brand Name
  const propMatch = name.match(/proprietor\s*(?:of|:|-)\s*([^,()]+)/i);
  if (propMatch) {
    let p = propMatch[1].trim();
    if (p.length >= 3) candidates.push(p);
  }

  // Pattern 3: Clean company name
  let clean = name.replace(/\([^)]*\)/g, '');
  clean = clean.replace(/proprietor.*$/i, '');
  clean = clean.replace(/\b(private\s+limited|pvt\s+ltd|pvt\s+limited|limited|ltd|llp)\b/gi, '');
  clean = clean.replace(/[^a-zA-Z0-9\s]/g, ' ').trim().replace(/\s+/g, ' ');
  if (clean.length >= 3) candidates.push(clean);

  return candidates;
}

async function checkDomain(slug) {
  if (!slug || slug.length < 3 || slug.length > 30) return null;
  const tlds = ['.in', '.com', '.co.in'];
  for (const tld of tlds) {
    const domain = slug + tld;
    try {
      await Promise.race([
        dns.lookup(domain),
        new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 400))
      ]);
      return `https://${domain}`;
    } catch (e) {}
  }
  return null;
}

async function resolveWebsite(name, contact, email) {
  // 1. If corporate/custom domain in email
  if (email && email.includes('@')) {
    const domain = email.split('@')[1].trim().toLowerCase();
    if (!genericDomains.has(domain) && domain.includes('.')) {
      return `https://${domain}`;
    }
  }

  // 2. Try inferring from brand names
  const brands = extractBrandCandidates(name);
  for (const b of brands) {
    const slug = b.toLowerCase().replace(/[^a-z0-9]/g, '');
    const found = await checkDomain(slug);
    if (found) return found;
  }

  // 3. Fallback: Direct 1-click Google search link to find adviser website
  const searchBrand = brands[0] || name;
  const q = encodeURIComponent(`${searchBrand} SEBI registered investment adviser website`);
  return `https://www.google.com/search?q=${q}`;
}

async function main() {
  const raw = fs.readFileSync('public/sebi_registered_advisers.csv', 'utf8');
  const lines = raw.trim().split('\n');
  console.log(`Processing ${lines.length - 1} records...`);

  const outputRows = [];
  const header = [
    'S.No',
    'Name / Trade Name',
    'Registration No',
    'Contact Person',
    'Email',
    'Telephone',
    'Address',
    'Validity',
    'Website',
    'LinkedIn Search URL'
  ];
  outputRows.push(header.map(escapeCSV).join(','));

  let directDomainCount = 0;
  let searchFallbackCount = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    const sno = cols[0];
    const name = cols[1];
    const regNo = cols[2];
    const contact = cols[3];
    const email = cols[4];
    const phone = cols[5];
    const address = cols[6];
    const validity = cols[7];
    const linkedinUrl = cols[8];

    const website = await resolveWebsite(name, contact, email);
    if (website.startsWith('https://www.google.com/search')) {
      searchFallbackCount++;
    } else {
      directDomainCount++;
    }

    const newRow = [
      sno,
      name,
      regNo,
      contact,
      email,
      phone,
      address,
      validity,
      website,
      linkedinUrl
    ];
    outputRows.push(newRow.map(escapeCSV).join(','));

    if (i % 100 === 0 || i === lines.length - 1) {
      console.log(`Processed ${i} / ${lines.length - 1}... (Direct domains: ${directDomainCount}, Search links: ${searchFallbackCount})`);
    }
  }

  // Write with UTF-8 BOM
  const bom = '\uFEFF';
  const csvContent = bom + outputRows.join('\n');
  fs.writeFileSync('public/sebi_registered_advisers.csv', csvContent, 'utf8');
  console.log('Successfully updated public/sebi_registered_advisers.csv!');
  console.log(`Summary: Total: ${lines.length - 1} | Direct Websites: ${directDomainCount} | Search Links: ${searchFallbackCount}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
