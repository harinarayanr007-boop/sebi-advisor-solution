const fs = require('fs');
const xlsx = require('xlsx');

function cleanTitle(str) {
  if (!str) return '';
  return str.split(' ')
    .map(word => {
      if (/^(and|of|in|for|the|on|at|to|a|an)$/i.test(word)) return word.toLowerCase();
      if (/^(llp|pvt|ltd|sebi|ria|hni|ca)$/i.test(word)) return word.toUpperCase();
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ')
    .trim();
}

function cleanFirstName(contact) {
  if (!contact) return 'there';
  let cleaned = contact.replace(/^(Mr|Mrs|Ms|Dr|Ca|Adv|Shri|Smt)\.?\s+/i, '').trim();
  let first = cleaned.split(/[\s,]+/)[0].trim();
  first = first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  return first || 'there';
}

function cleanFirmName(firm, contact) {
  if (!firm) return `${cleanFirstName(contact)} Advisory`;
  // Clean proprietor patterns
  let clean = firm.replace(/\([^)]*proprietor[^)]*\)/gi, '');
  clean = clean.replace(/proprietor\s*(?:of|:|-)?\s*/gi, '');
  clean = clean.replace(/\b(private limited|pvt ltd|pvt limited|limited|ltd)\b/gi, '').trim();
  clean = clean.replace(/^[,\s-]+|[,\s-]+$/g, '').trim();
  
  if (!clean || clean.length < 3) {
    clean = `${cleanFirstName(contact)} Wealth Advisory`;
  }
  return cleanTitle(clean);
}

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n') || s.includes('\r')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function main() {
  if (!fs.existsSync('scripts/verified_bad_websites.json')) {
    console.error('scripts/verified_bad_websites.json not found yet!');
    return;
  }

  const rawVerifiedWeb = JSON.parse(fs.readFileSync('scripts/verified_bad_websites.json', 'utf8'));
  const rawNoWeb = JSON.parse(fs.readFileSync('scripts/candidates_no_web.json', 'utf8'));

  // Track already mailed to avoid duplicates
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

  // 1. SELECT 50 WITH BAD/OUTDATED ACTUAL WEBSITES
  const badWebLeads = [];
  const seenEmails = new Set();
  const seenDomains = new Set();

  for (const item of rawVerifiedWeb) {
    if (badWebLeads.length >= 50) break;
    const email = item.email.toLowerCase().trim();
    if (alreadyUsed.has(email) || seenEmails.has(email)) continue;

    // Domain uniqueness
    let domain = '';
    try {
      const u = new URL(item.verifiedWeb);
      domain = u.hostname.replace(/^www\./, '').toLowerCase();
    } catch(e) {}
    if (seenDomains.has(domain)) continue;

    seenEmails.add(email);
    if (domain) seenDomains.add(domain);

    const firstName = cleanFirstName(item.contact);
    const fullName = cleanTitle(item.contact);
    const firmName = cleanFirmName(item.firm, item.contact);
    const subject = `Convert HNI clients quickly for ${firmName}`;
    const firstLine = `Hey ${firstName} ! Hari here.`;

    badWebLeads.push({
      sno: badWebLeads.length + 1,
      firstName,
      fullName,
      firmName,
      email: item.email,
      websiteUrl: item.verifiedWeb,
      critique: item.critique,
      city: item.city || 'India',
      regNo: item.regNo,
      subject,
      firstLine
    });
  }

  // 2. SELECT 50 WITH NO WEBSITE AT ALL
  const noWebLeads = [];
  const seenNoWebEmails = new Set();

  for (const item of rawNoWeb) {
    if (noWebLeads.length >= 50) break;
    const email = item.email.toLowerCase().trim();
    if (alreadyUsed.has(email) || seenNoWebEmails.has(email) || seenEmails.has(email)) continue;
    if (!item.contact || item.contact.length < 3) continue;

    seenNoWebEmails.add(email);

    const firstName = cleanFirstName(item.contact);
    const fullName = cleanTitle(item.contact);
    const firmName = cleanFirmName(item.firm, item.contact);
    const subject = `Convert HNI clients quickly for ${firmName}`;
    const firstLine = `Hey ${firstName} ! Hari here.`;

    noWebLeads.push({
      sno: noWebLeads.length + 1,
      firstName,
      fullName,
      firmName,
      email: item.email,
      websiteStatus: 'No Website (Operates via Gmail/Yahoo)',
      pitchAngle: 'Zero digital presence; manual onboarding forms; immediate credibility upgrade needed',
      city: item.city || 'India',
      regNo: item.regNo,
      subject,
      firstLine
    });
  }

  console.log(`Generated ${badWebLeads.length} leads with bad websites and ${noWebLeads.length} leads with no website.`);

  // BUILD EXCEL WORKBOOK WITH 2 TABS
  const wb = xlsx.utils.book_new();

  // Tab 1: 50 Leads with Bad Websites
  const sheet1Data = [
    [
      '#',
      'First Name',
      'Full Name',
      'Firm Name',
      'Email',
      'Actual Website URL',
      'Website Critique / Reason Bad',
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
    { wch: 30 }, // Email
    { wch: 35 }, // Website URL
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
    { wch: 30 }, // Email
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

  // ALSO WRITE TWO INDIVIDUAL CSV FILES
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

  // Dump JSON for report preview
  fs.writeFileSync('scripts/final_bad_web_leads.json', JSON.stringify(badWebLeads, null, 2));
  fs.writeFileSync('scripts/final_no_web_leads.json', JSON.stringify(noWebLeads, null, 2));
}

main();
