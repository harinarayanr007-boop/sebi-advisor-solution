const fs = require('fs');

function cleanPersonName(raw) {
  if (!raw) return { first: 'there', full: 'Adviser' };
  let str = raw.replace(/\([^)]*\)/g, '').trim();
  str = str.replace(/proprietor\s*(?:of|:|-)?.*$/i, '').trim();
  str = str.replace(/^(Mr|Mrs|Ms|Dr|Ca|Adv|Shri|Smt)\.?\s+/i, '').trim();

  // Remove common firm names attached to person name
  str = str.replace(/(?:LLP|Pvt|Ltd|Limited|Private Limited|Technologies|Consultancy|Advisors|Advisory|Investments?|Capital|Financials?|Services).*$/i, '').trim();

  const words = str.split(/[\s,]+/).filter(w => w.length > 0 && !/^(Mr|Mrs|Ms|Dr|Ca|Adv|Shri|Smt)$/i.test(w));
  if (words.length === 0) return { first: 'there', full: 'Adviser' };

  // Proper Case function
  const toProper = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

  // Check if first word is a South Indian family surname (e.g., Busireddy, Bodeddula, Challa, Chavod)
  let first = toProper(words[0]);
  let full = words.map(toProper).join(' ');

  if (words.length >= 3 && /^(Challa|Busireddy|Bodeddula|Chavod|Yemmanuru|Gokaraju)$/i.test(words[0])) {
    first = toProper(words[1]); // e.g. Kaushik from Busireddy Kaushik Reddy
  }

  return { first, full };
}

function cleanTradeName(firmRaw, contactRaw) {
  let f = firmRaw || '';
  // Check if firm is basically person name + proprietor
  let firmClean = f;
  const propMatch = f.match(/proprietor\s*(?:of|:|-)?\s*([^,()]+)/i);
  if (propMatch) {
    firmClean = propMatch[1].trim();
  } else {
    firmClean = f.replace(/\([^)]*proprietor[^)]*\)/gi, '').trim();
    firmClean = firmClean.replace(/proprietor\s*(?:of|:|-)?\s*/gi, '').trim();
  }

  // Remove corporate suffixes
  firmClean = firmClean.replace(/\b(private limited|pvt ltd|pvt limited|pvt\.?|limited|ltd\.?)\b/gi, '').trim();
  firmClean = firmClean.replace(/^[,\s.-]+|[,\s.-]+$/g, '').trim();

  // If firm name is just the person's name or empty, format as "[First Name] Wealth Advisory"
  const p = cleanPersonName(contactRaw);
  if (!firmClean || firmClean.length < 3 || firmClean.toLowerCase() === p.full.toLowerCase()) {
    return `${p.first} Wealth Advisory`;
  }

  // Title case
  return firmClean.split(/\s+/).map(w => {
    if (/^(and|of|in|for|the|on|at|to|a|an)$/i.test(w)) return w.toLowerCase();
    if (/^(llp|sebi|ria|hni|ca)$/i.test(w)) return w.toUpperCase();
    return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
  }).join(' ').trim();
}

// Test on sample candidates
const noWeb = JSON.parse(fs.readFileSync('scripts/candidates_no_web.json', 'utf8')).slice(0, 20);
noWeb.forEach((c, idx) => {
  const p = cleanPersonName(c.contact);
  const trade = cleanTradeName(c.firm, c.contact);
  console.log(`${idx+1}. Contact: "${c.contact}" -> First: "${p.first}", Full: "${p.full}" | Firm: "${trade}"`);
});
