const fs = require('fs');

const leads = [
  {
    firstName: "Adhish",
    fullName: "Adhish Patel",
    firm: "Adhish Patel Advisory",
    email: "adhishpatel@gmail.com",
    city: "Ahmedabad",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Aishwarya",
    fullName: "Aishwarya Agarwal",
    firm: "Aishwarya Agarwal Advisory",
    email: "aishwaryaagrawal06@gmail.com",
    city: "Mumbai (Nana Chowk)",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Ajay",
    fullName: "Ajay Jajam",
    firm: "Chanakya Investment",
    email: "chanakyainvestment75@gmail.com",
    city: "Gurugram",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Ajeet",
    fullName: "Ajeet Kumar Pandey",
    firm: "Investment Climb Advisory",
    email: "ajeet05052007@gmail.com",
    city: "Bengaluru (JP Nagar)",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Ajendra",
    fullName: "Ajendra Raikar",
    firm: "Ajendra Raikar Advisory",
    email: "ajendraikar@gmail.com",
    city: "Pune",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Ajit",
    fullName: "Ajit Roongta",
    firm: "Ajit Roongta Advisory",
    email: "ajitroongta@yahoo.com",
    city: "Mumbai",
    websiteStatus: "No standalone site (Yahoo)"
  },
  {
    firstName: "Akhilesh",
    fullName: "Akhilesh V Gokaraju",
    firm: "Gokaraju Advisory",
    email: "akhileshvarma@yahoo.com",
    city: "Hyderabad",
    websiteStatus: "No standalone site (Yahoo)"
  },
  {
    firstName: "Akshay",
    fullName: "Akshay Sunil Deora",
    firm: "Deora Investment Advisory",
    email: "akshaydeora1@gmail.com",
    city: "Pune",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Aman",
    fullName: "Aman Rakesh Shah",
    firm: "Aman Shah Advisory",
    email: "ca.aman.shah@gmail.com",
    city: "Mumbai",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Amit",
    fullName: "Amit Gorishankar Dhanuka",
    firm: "Dhanuka Advisory",
    email: "ca.dhanukaamit@gmail.com",
    city: "Mumbai",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Ankit",
    fullName: "Ankit Shah",
    firm: "White Equity",
    email: "shahankit86@gmail.com",
    city: "Mumbai",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Ankur",
    fullName: "Ankur Vipul Shah",
    firm: "Quasar Capital",
    email: "ankurshah1989@gmail.com",
    city: "Mumbai",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Anup",
    fullName: "Anup Kalra",
    firm: "Anup Kalra Advisory",
    email: "anup_kalra@yahoo.com",
    city: "Delhi",
    websiteStatus: "No standalone site (Yahoo)"
  },
  {
    firstName: "Arjun",
    fullName: "Arjun K A",
    firm: "Sukruthi Financials",
    email: "sukruthifincap@gmail.com",
    city: "Bengaluru",
    websiteStatus: "No standalone site (Gmail)"
  },
  {
    firstName: "Arpita",
    fullName: "Arpita Harshavardhan Kulkarni",
    firm: "Fin Neeti",
    email: "ca.arpitakulkarni@gmail.com",
    city: "Pune",
    websiteStatus: "No standalone site (Gmail)"
  }
];

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

const headers = [
  '#',
  'First Name',
  'Full Name',
  'Firm Name',
  'Email',
  'City',
  'Website Status',
  'Subject Line to Copy',
  'First Line to Copy'
];

const csvRows = [headers.map(escapeCSV).join(',')];

leads.forEach((l, idx) => {
  const subject = `Convert HNI clients quickly for ${l.firm}`;
  const firstLine = `Hey ${l.firstName} ! Hari here.`;
  const row = [
    idx + 1,
    l.firstName,
    l.fullName,
    l.firm,
    l.email,
    l.city,
    l.websiteStatus,
    subject,
    firstLine
  ];
  csvRows.push(row.map(escapeCSV).join(','));
});

const bom = '\uFEFF';
fs.writeFileSync('public/15_fresh_leads.csv', bom + csvRows.join('\n'), 'utf8');
console.log('Saved public/15_fresh_leads.csv with 15 fresh leads!');
