const fs = require('fs');

function getTrueNames(contact, firm, email) {
  let combined = `${contact} ${firm}`.replace(/\([^)]*\)/g, ' ');
  combined = combined.replace(/proprie\s*tor\s*(?:of|:|-)?.*$/i, ' ');
  combined = combined.replace(/(?:LLP|Pvt|Ltd|Limited|Private Limited|Technologies|Consultancy|Advisors|Advisory|Investments?|Capital|Financials?|Services|Research|Empirai|Sky Line|Delight|Mrigashira|Arigamoney|Arthavidhi|Arthazeyro|Arthvruksh|Aurostarinvestment|Avdesh Mishra|Time Wheel|Bia|Bigmans|Box Wealth|Brighter Mind|Candura|Ida Wealth|Finwiser).*$/i, ' ');
  combined = combined.replace(/^(Mr|Mrs|Ms|Dr|Ca|Adv|Shri|Smt)\.?\s+/i, ' ');

  const words = combined.split(/[\s,.-]+/).filter(w => w.length > 1 && !/^(Mr|Mrs|Ms|Dr|Ca|Adv|Shri|Smt)$/i.test(w));
  const toProper = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

  // Extract from email if obvious
  let emailHint = '';
  if (email && email.includes('@')) {
    const userPart = email.split('@')[0].toLowerCase();
    if (userPart.includes('kaushik')) emailHint = 'Kaushik';
    else if (userPart.includes('siva')) emailHint = 'Siva';
    else if (userPart.includes('surya')) emailHint = 'Surya';
    else if (userPart.includes('subbaraju')) emailHint = 'Subbaraju';
  }

  let first = emailHint || (words.length > 0 ? toProper(words[0]) : 'there');
  
  // If first name looks like surname and there is a middle/second name
  if (!emailHint && words.length >= 2 && /^(Challa|Busireddy|Bodeddula|Chavod|Chekuri|Yemmanuru|Gokaraju|Koul|Khattar|Kukreja|Desai|Verma|Sharma|Patel|Shah|Gupta|Jain|Agarwal|Mehta)$/i.test(words[0])) {
    first = toProper(words[1]);
  }

  let full = words.slice(0, 3).map(toProper).join(' ');
  return { first, full };
}

const list = JSON.parse(fs.readFileSync('scripts/final_no_web_leads.json', 'utf8'));
list.slice(35, 50).forEach(item => {
  const n = getTrueNames(item.fullName, item.firmName, item.email);
  console.log(`Original: "${item.firstName}" | "${item.fullName}" -> Fixed: First: "${n.first}", Full: "${n.full}" (email: ${item.email})`);
});
