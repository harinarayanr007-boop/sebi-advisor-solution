const fs = require('fs');

const leads = [
  {
    firstName: "Adhish",
    fullName: "Adhish Patel",
    firm: "Adhish Patel Advisory",
    email: "adhishpatel@gmail.com",
    city: "Ahmedabad",
    website: "https://www.google.com/search?q=Adhish+Patel+SEBI+investment+adviser+Ahmedabad"
  },
  {
    firstName: "Aishwarya",
    fullName: "Aishwarya Agarwal",
    firm: "Aishwarya Agarwal Advisory",
    email: "aishwaryaagrawal06@gmail.com",
    city: "Mumbai (Nana Chowk)",
    website: "https://www.google.com/search?q=Aishwarya+Agarwal+SEBI+investment+adviser+Mumbai"
  },
  {
    firstName: "Ajay",
    fullName: "Ajay Jajam",
    firm: "Chanakya Investment",
    email: "chanakyainvestment75@gmail.com",
    city: "Gurugram",
    website: "https://www.google.com/search?q=Ajay+Jajam+Chanakya+Investment+Gurugram"
  },
  {
    firstName: "Ajeet",
    fullName: "Ajeet Kumar Pandey",
    firm: "Investment Climb Advisory",
    email: "ajeet05052007@gmail.com",
    city: "Bengaluru (JP Nagar)",
    website: "https://www.google.com/search?q=Investment+Climb+Advisory+Ajeet+Kumar+Pandey+Bangalore"
  },
  {
    firstName: "Ajendra",
    fullName: "Ajendra Raikar",
    firm: "Ajendra Raikar Advisory",
    email: "ajendraikar@gmail.com",
    city: "Pune",
    website: "https://www.google.com/search?q=Ajendra+Raikar+SEBI+investment+adviser+Pune"
  },
  {
    firstName: "Ajit",
    fullName: "Ajit Roongta",
    firm: "Ajit Roongta Advisory",
    email: "ajitroongta@yahoo.com",
    city: "Mumbai",
    website: "https://www.google.com/search?q=Ajit+Roongta+SEBI+investment+adviser+Mumbai"
  },
  {
    firstName: "Akhilesh",
    fullName: "Akhilesh V Gokaraju",
    firm: "Gokaraju Advisory",
    email: "akhileshvarma@yahoo.com",
    city: "Hyderabad",
    website: "https://www.google.com/search?q=Akhilesh+V+Gokaraju+SEBI+investment+adviser+Hyderabad"
  },
  {
    firstName: "Akshay",
    fullName: "Akshay Sunil Deora",
    firm: "Deora Investment Advisory",
    email: "akshaydeora1@gmail.com",
    city: "Pune",
    website: "https://www.google.com/search?q=Deora+Investment+Advisory+Akshay+Deora+Pune"
  },
  {
    firstName: "Aman",
    fullName: "Aman Rakesh Shah",
    firm: "Aman Shah Advisory",
    email: "ca.aman.shah@gmail.com",
    city: "Mumbai",
    website: "https://www.google.com/search?q=Aman+Rakesh+Shah+SEBI+investment+adviser+Mumbai"
  },
  {
    firstName: "Amit",
    fullName: "Amit Dhanuka",
    firm: "Dhanuka Advisory",
    email: "ca.dhanukaamit@gmail.com",
    city: "Mumbai",
    website: "https://www.google.com/search?q=Amit+Dhanuka+SEBI+investment+adviser+Mumbai"
  },
  {
    firstName: "Ankit",
    fullName: "Ankit Shah",
    firm: "White Equity",
    email: "shahankit86@gmail.com",
    city: "Mumbai",
    website: "https://www.google.com/search?q=White+Equity+Ankit+Shah+SEBI+Mumbai"
  },
  {
    firstName: "Ankur",
    fullName: "Ankur Vipul Shah",
    firm: "Quasar Capital",
    email: "ankurshah1989@gmail.com",
    city: "Mumbai",
    website: "https://www.google.com/search?q=Quasar+Capital+Ankur+Vipul+Shah+SEBI+Mumbai"
  },
  {
    firstName: "Anup",
    fullName: "Anup Kalra",
    firm: "Anup Kalra Advisory",
    email: "anup_kalra@yahoo.com",
    city: "Delhi",
    website: "https://www.google.com/search?q=Anup+Kalra+SEBI+investment+adviser+Delhi"
  },
  {
    firstName: "Arjun",
    fullName: "Arjun K A",
    firm: "Sukruthi Financials",
    email: "sukruthifincap@gmail.com",
    city: "Bengaluru",
    website: "https://www.google.com/search?q=Sukruthi+Financials+Arjun+K+A+Bangalore"
  },
  {
    firstName: "Arpita",
    fullName: "Arpita Kulkarni",
    firm: "Fin Neeti",
    email: "ca.arpitakulkarni@gmail.com",
    city: "Pune",
    website: "https://www.google.com/search?q=Fin+Neeti+Arpita+Kulkarni+Pune"
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
  'Website / Google Search Link',
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
    l.website,
    subject,
    firstLine
  ];
  csvRows.push(row.map(escapeCSV).join(','));
});

const bom = '\uFEFF';
fs.writeFileSync('public/15_fresh_leads.csv', bom + csvRows.join('\n'), 'utf8');
console.log('Updated public/15_fresh_leads.csv with active website links!');
