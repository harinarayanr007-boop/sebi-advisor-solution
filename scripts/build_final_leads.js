const fs = require('fs');
const xlsx = require('xlsx');

function cleanTitle(str) {
  if (!str) return '';
  return str.split(/[\s_-]+/)
    .filter(Boolean)
    .map(word => {
      if (/^(and|of|in|for|the|on|at|to|a|an)$/i.test(word)) return word.toLowerCase();
      if (/^(llp|pvt|ltd|sebi|ria|hni|ca|amc|pms)$/i.test(word)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .trim();
}

function cleanPersonName(raw, firmRaw = '', email = '') {
  if (!raw) return { first: 'there', full: 'Adviser' };
  let str = raw.replace(/\([^)]*\)/g, '').trim();
  str = str.replace(/proprietor\s*(?:of|:|-)?.*$/i, '').trim();
  str = str.replace(/^(Mr|Mrs|Ms|Dr|Ca|Adv|Shri|Smt)\.?\s+/i, '').trim();
  str = str.replace(/(?:LLP|Pvt|Ltd|Limited|Private Limited|Technologies|Consultancy|Advisors|Advisory|Investments?|Capital|Financials?|Services).*$/i, '').trim();

  const words = str.split(/[\s,]+/).filter(w => w.length > 0 && !/^(Mr|Mrs|Ms|Dr|Ca|Adv|Shri|Smt)$/i.test(w));
  if (words.length === 0) return { first: 'there', full: 'Adviser' };

  const toProper = (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();

  // Check email for clear given name hints
  let emailHint = '';
  if (email && email.includes('@')) {
    const userPart = email.split('@')[0].toLowerCase();
    if (userPart.includes('kaushik')) emailHint = 'Kaushik';
    else if (userPart.includes('siva')) emailHint = 'Siva';
    else if (userPart.includes('surya')) emailHint = 'Surya';
    else if (userPart.includes('subbaraju')) emailHint = 'Subbaraju';
    else if (userPart.includes('dashrath') || userPart.includes('dasarth')) emailHint = 'Dashrath';
  }

  let first = emailHint || toProper(words[0]);

  // Common Indian surname patterns where first word is family name
  if (!emailHint && words.length >= 2 && /^(Challa|Busireddy|Bodeddula|Chavod|Chekuri|Yemmanuru|Gokaraju)$/i.test(words[0])) {
    first = toProper(words[1]);
  }

  let full = words.map(toProper).join(' ');
  return { first, full };
}

function cleanTradeName(firmRaw, contactRaw) {
  let f = firmRaw || '';
  let firmClean = f;
  const propMatch = f.match(/proprie\s*tor\s*(?:of|:|-)?\s*([^,()]+)/i);
  if (propMatch) {
    firmClean = propMatch[1].trim();
  } else {
    firmClean = f.replace(/\([^)]*proprietor[^)]*\)/gi, '').trim();
    firmClean = firmClean.replace(/proprie\s*tor\s*(?:of|:|-)?\s*/gi, '').trim();
  }

  firmClean = firmClean.replace(/\b(private limited|pvt ltd|pvt limited|pvt\.?|limited|ltd\.?)\b/gi, '').trim();
  firmClean = firmClean.replace(/^[,\s.-]+|[,\s.-]+$/g, '').trim();

  const p = cleanPersonName(contactRaw);
  if (!firmClean || firmClean.length < 3 || firmClean.toLowerCase() === p.full.toLowerCase()) {
    return `${p.first} Wealth Advisory`;
  }

  return cleanTitle(firmClean);
}

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function build() {
  const batch1 = fs.existsSync('scripts/verified_boutique_bad_websites.json') 
    ? JSON.parse(fs.readFileSync('scripts/verified_boutique_bad_websites.json', 'utf8')) 
    : [];
  const batch2 = fs.existsSync('scripts/batch_2_verified.json') 
    ? JSON.parse(fs.readFileSync('scripts/batch_2_verified.json', 'utf8')) 
    : [];

  const rawNoWeb = JSON.parse(fs.readFileSync('scripts/candidates_no_web.json', 'utf8'));

  const badTitles = /restricted|parking|for sale|godaddy|hostinger|suspended|apache|iis windows|403|404|not found|access denied|error|login|under construction|coming soon|301 moved|302 found|document moved/i;
  const institutional = /barclays|etmoney|kuvera|ask wealth|ask hedge|ask investment|iifl|motilal|kotak|icici|hdfc|axis|360 one|marwadi|tata|sbi|bajaj|reliance|dsp|franklin|nippon|uti|geojit|edelweiss|sharekhan|angel one|zerodha|groww|private equity|venture capital|affirma|adv partners|abakkus|1 finance/i;

  const alreadyUsed = new Set([
    'aartim159@gmail.com', 'info@aaumcapital.com', 'abhijit.talukdar@attainix.com',
    'abhishekk@sahajmoney.com', 'abhishek.phore@controlwealth.co.in', 'dinesh@acuitascapital.in',
    'navneetd.917@gmail.com', 'adviser@29kadvisers.com', 'ketan@3qwealth.com', 'rajesh@90to10.com',
    'abraham.cherian.ria@gmail.com', 'info@accelpru.com', 'preetikz@gmail.com',
    'aditya.invest@outlook.com', 'dilshad@dilzer.net', 'basunivesh@gmail.com',
    'adhishpatel@gmail.com', 'aishwaryaagrawal06@gmail.com', 'chanakyainvestment75@gmail.com',
    'ajeet05052007@gmail.com', 'ajendraikar@gmail.com', 'ajitroongta@yahoo.com',
    'akhileshvarma@yahoo.com', 'akshaydeora1@gmail.com', 'ca.aman.shah@gmail.com',
    'ca.dhanukaamit@gmail.com', 'shahankit86@gmail.com', 'ankurshah1989@gmail.com',
    'anup_kalra@yahoo.com', 'sukruthifincap@gmail.com', 'ca.arpitakulkarni@gmail.com'
  ]);

  // COMBINE AND DEDUPLICATE ALL VERIFIED BAD WEBSITE LEADS
  const allWebCandidates = [...batch1, ...batch2];
  const badWebLeads = [];
  const seenEmails = new Set();
  const seenDomains = new Set();

  for (const item of allWebCandidates) {
    if (badWebLeads.length >= 50) break;
    const email = item.email.toLowerCase().trim();
    if (alreadyUsed.has(email) || seenEmails.has(email)) continue;

    // Check title validity
    if (!item.title || item.title.trim().length === 0) continue;
    if (badTitles.test(item.title)) continue;
    if (/[\u4e00-\u9fa5]/.test(item.title)) continue; // foreign characters

    // Exclude mega institutions
    if (institutional.test(item.firm) || institutional.test(item.verifiedWeb) || institutional.test(item.title)) continue;

    // Check domain uniqueness
    let domain = '';
    try {
      domain = new URL(item.verifiedWeb).hostname.replace(/^www\./, '').toLowerCase();
    } catch(e) {}
    if (!domain || seenDomains.has(domain)) continue;

    seenEmails.add(email);
    seenDomains.add(domain);

    const person = cleanPersonName(item.contact, item.firm, item.email);
    const firmName = cleanTradeName(item.firm, item.contact);
    const subject = `Convert HNI clients quickly for ${firmName}`;
    const firstLine = `Hey ${person.first} ! Hari here.`;

    badWebLeads.push({
      sno: badWebLeads.length + 1,
      firstName: person.first,
      fullName: person.full,
      firmName,
      email: item.email,
      websiteUrl: item.verifiedWeb,
      websiteTitle: item.title,
      critique: item.critique,
      city: item.city || 'India',
      regNo: item.regNo,
      subject,
      firstLine
    });
  }

  // BUILD 50 LEADS WITH NO WEBSITE AT ALL
  const noWebLeads = [];
  const seenNoWebEmails = new Set();

  for (const item of rawNoWeb) {
    if (noWebLeads.length >= 50) break;
    const email = item.email.toLowerCase().trim();
    if (alreadyUsed.has(email) || seenNoWebEmails.has(email) || seenEmails.has(email)) continue;
    if (!item.contact || item.contact.length < 3) continue;

    seenNoWebEmails.add(email);

    const person = cleanPersonName(item.contact, item.firm, item.email);
    const firmName = cleanTradeName(item.firm, item.contact);
    const subject = `Convert HNI clients quickly for ${firmName}`;
    const firstLine = `Hey ${person.first} ! Hari here.`;

    noWebLeads.push({
      sno: noWebLeads.length + 1,
      firstName: person.first,
      fullName: person.full,
      firmName,
      email: item.email,
      websiteStatus: 'No Website (Operates via Gmail/Yahoo)',
      pitchAngle: 'Zero standalone web presence; manual forms/paperwork; urgent need for modern digital credibility',
      city: item.city || 'India',
      regNo: item.regNo,
      subject,
      firstLine
    });
  }

  console.log(`Final Bad Website Leads: ${badWebLeads.length}`);
  console.log(`Final No Website Leads: ${noWebLeads.length}`);

  // BUILD EXCEL WORKBOOK (.xlsx)
  const wb = xlsx.utils.book_new();

  // Tab 1: 50 Leads with Bad Outdated Websites
  const sheet1Data = [
    [
      '#',
      'First Name',
      'Full Name',
      'Firm Name',
      'Email',
      'Actual Website URL',
      'Current Site Title',
      'Website Critique / Pain Point',
      'City',
      'SEBI Registration No',
      'Subject Line to Copy',
      'First Line to Copy'
    ],
    ...badWebLeads.map(l => [
      l.sno,
      l.firstName,
      l.fullName,
      l.firmName,
      l.email,
      l.websiteUrl,
      l.websiteTitle,
      l.critique,
      l.city,
      l.regNo,
      l.subject,
      l.firstLine
    ])
  ];
  const ws1 = xlsx.utils.aoa_to_sheet(sheet1Data);
  ws1['!cols'] = [
    { wch: 5 },  // #
    { wch: 14 }, // First Name
    { wch: 25 }, // Full Name
    { wch: 32 }, // Firm Name
    { wch: 32 }, // Email
    { wch: 35 }, // Website URL
    { wch: 40 }, // Site Title
    { wch: 45 }, // Critique
    { wch: 15 }, // City
    { wch: 18 }, // SEBI Reg
    { wch: 45 }, // Subject
    { wch: 30 }  // First Line
  ];
  xlsx.utils.book_append_sheet(wb, ws1, '50 Bad Outdated Websites');

  // Tab 2: 50 Leads with No Website At All
  const sheet2Data = [
    [
      '#',
      'First Name',
      'Full Name',
      'Firm Name',
      'Email',
      'Website Status',
      'Outreach Angle / Pitch Hook',
      'City',
      'SEBI Registration No',
      'Subject Line to Copy',
      'First Line to Copy'
    ],
    ...noWebLeads.map(l => [
      l.sno,
      l.firstName,
      l.fullName,
      l.firmName,
      l.email,
      l.websiteStatus,
      l.pitchAngle,
      l.city,
      l.regNo,
      l.subject,
      l.firstLine
    ])
  ];
  const ws2 = xlsx.utils.aoa_to_sheet(sheet2Data);
  ws2['!cols'] = [
    { wch: 5 },  // #
    { wch: 14 }, // First Name
    { wch: 25 }, // Full Name
    { wch: 32 }, // Firm Name
    { wch: 32 }, // Email
    { wch: 35 }, // Website Status
    { wch: 48 }, // Outreach Angle
    { wch: 15 }, // City
    { wch: 18 }, // SEBI Reg
    { wch: 45 }, // Subject
    { wch: 30 }  // First Line
  ];
  xlsx.utils.book_append_sheet(wb, ws2, '50 No Website At All');

  // Write Excel file
  const excelPath = 'public/50_50_advisor_leads.xlsx';
  xlsx.writeFile(wb, excelPath);
  console.log(`Saved Excel file to: ${excelPath}`);

  // ALSO WRITE TWO CSV FILES WITH UTF-8 BOM
  const bom = '\uFEFF';

  // CSV 1: Bad Websites
  const csv1Rows = [
    sheet1Data[0].map(escapeCSV).join(','),
    ...badWebLeads.map(l => [
      l.sno,
      l.firstName,
      l.fullName,
      l.firmName,
      l.email,
      l.websiteUrl,
      l.websiteTitle,
      l.critique,
      l.city,
      l.regNo,
      l.subject,
      l.firstLine
    ].map(escapeCSV).join(','))
  ];
  fs.writeFileSync('public/50_leads_bad_websites.csv', bom + csv1Rows.join('\n'), 'utf8');
  console.log('Saved CSV to: public/50_leads_bad_websites.csv');

  // CSV 2: No Website At All
  const csv2Rows = [
    sheet2Data[0].map(escapeCSV).join(','),
    ...noWebLeads.map(l => [
      l.sno,
      l.firstName,
      l.fullName,
      l.firmName,
      l.email,
      l.websiteStatus,
      l.pitchAngle,
      l.city,
      l.regNo,
      l.subject,
      l.firstLine
    ].map(escapeCSV).join(','))
  ];
  fs.writeFileSync('public/50_leads_no_website.csv', bom + csv2Rows.join('\n'), 'utf8');
  console.log('Saved CSV to: public/50_leads_no_website.csv');

  // Dump JSON
  fs.writeFileSync('scripts/final_bad_web_leads.json', JSON.stringify(badWebLeads, null, 2));
  fs.writeFileSync('scripts/final_no_web_leads.json', JSON.stringify(noWebLeads, null, 2));
}

build();
