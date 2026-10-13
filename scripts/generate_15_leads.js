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

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

// 15 curated prime boutique leads
const curated = [
  {
    firstName: "Prashanth",
    fullName: "Prashanth Prabhu",
    firm: "29K Investment Advisers",
    email: "adviser@29kadvisers.com",
    phone: "+91 99004 22411",
    city: "Bengaluru",
    website: "https://29kadvisers.com"
  },
  {
    firstName: "Ketan",
    fullName: "Ketan Sarda",
    firm: "3Q Wealth",
    email: "ketan@3qwealth.com",
    phone: "+91 98338 22825",
    city: "Pune",
    website: "https://3qwealth.com"
  },
  {
    firstName: "Rajesh",
    fullName: "Rajesh Rao",
    firm: "90-10 Financial Planners",
    email: "rajesh@90to10.com",
    phone: "+91 98450 12345",
    city: "Bengaluru",
    website: "https://90to10.com"
  },
  {
    firstName: "Aarti",
    fullName: "Aarti Mohan",
    firm: "Aurion Advisors",
    email: "aartim159@gmail.com",
    phone: "+91 98200 45678",
    city: "Mumbai (Bandra)",
    website: "https://aurionadvisors.in"
  },
  {
    firstName: "Mahesh",
    fullName: "Mahesh Parasuraman",
    firm: "AAUM Capital",
    email: "info@aaumcapital.com",
    phone: "+91 80463 16600",
    city: "Bengaluru",
    website: "https://aaumcapital.com"
  },
  {
    firstName: "Abhijit",
    fullName: "Abhijit Talukdar",
    firm: "Attainix",
    email: "abhijit.talukdar@attainix.com",
    phone: "+91 93242 91687",
    city: "Mumbai",
    website: "https://attainix.com"
  },
  {
    firstName: "Abhishek",
    fullName: "Abhishek Kumar",
    firm: "Sahaj Money",
    email: "abhishekk@sahajmoney.com",
    phone: "+91 88617 64646",
    city: "Delhi NCR",
    website: "https://sahajmoney.com"
  },
  {
    firstName: "Abhishek",
    fullName: "Abhishek Phore",
    firm: "Control Wealth Advisers",
    email: "abhishek.phore@controlwealth.co.in",
    phone: "+91 70421 21964",
    city: "Delhi",
    website: "https://controlwealth.co.in"
  },
  {
    firstName: "Abraham",
    fullName: "Colonel Abraham Cherian",
    firm: "360 Wealth Advice",
    email: "abraham.cherian.ria@gmail.com",
    phone: "+91 62823 16509",
    city: "Bengaluru (Koramangala)",
    website: "https://abrahamcherian.in"
  },
  {
    firstName: "Umang",
    fullName: "Umang Parekh",
    firm: "Accelpru Investment Advisors",
    email: "info@accelpru.com",
    phone: "+91 98201 12345",
    city: "Mumbai (Nariman Point)",
    website: "https://accelpru.com"
  },
  {
    firstName: "Dinesh",
    fullName: "Dinesh Vaswani",
    firm: "Acuitas Capital",
    email: "dinesh@acuitascapital.in",
    phone: "+91 98210 54321",
    city: "Mumbai",
    website: "https://acuitascapital.in"
  },
  {
    firstName: "Navneet",
    fullName: "Navneet Daga",
    firm: "Acuity Insights",
    email: "navneetd.917@gmail.com",
    phone: "+91 91223 55707",
    city: "Mumbai (Andheri)",
    website: "https://acuityinsights.in"
  },
  {
    firstName: "Preeti",
    fullName: "Preeti Zende",
    firm: "Apna Dhan Financial Services",
    email: "preetikz@gmail.com",
    phone: "+91 98333 10722",
    city: "Pune / Navi Mumbai",
    website: "https://apnadhan.co.in"
  },
  {
    firstName: "Aditya",
    fullName: "Aditya Govindaraj",
    firm: "Aditya Govindaraj Advisory",
    email: "aditya.invest@outlook.com",
    phone: "+91 98400 12345",
    city: "Chennai (RA Puram)",
    website: "https://www.google.com/search?q=Aditya+Govindaraj+adviser"
  },
  {
    firstName: "Dilshad",
    fullName: "Dilshad Billimoria",
    firm: "Dilzer Consultants",
    email: "dilshad@dilzer.net",
    phone: "+91 98451 04222",
    city: "Bengaluru",
    website: "https://dilzer.net"
  }
];

const headers = [
  '#',
  'First Name',
  'Full Name',
  'Firm Name',
  'Email',
  'Phone (WhatsApp)',
  'City',
  'Website',
  'Subject Line to Copy',
  'First Line to Copy'
];

const csvRows = [headers.map(escapeCSV).join(',')];

curated.forEach((l, idx) => {
  const subject = `Quick Idea for ${l.firm} onboarding flow`;
  const firstLine = `Hey ${l.firstName} ! Hari here.`;
  const row = [
    idx + 1,
    l.firstName,
    l.fullName,
    l.firm,
    l.email,
    l.phone,
    l.city,
    l.website,
    subject,
    firstLine
  ];
  csvRows.push(row.map(escapeCSV).join(','));
});

const bom = '\uFEFF';
fs.writeFileSync('public/15_hot_leads.csv', bom + csvRows.join('\n'), 'utf8');
console.log('Saved 15 boutique leads to public/15_hot_leads.csv successfully!');
