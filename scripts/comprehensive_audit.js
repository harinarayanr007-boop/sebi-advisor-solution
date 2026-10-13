const fs = require('fs');
const xlsx = require('xlsx');

const wb = xlsx.readFile('public/50_50_advisor_leads.xlsx');
console.log('=== WORKBOOK SHEETS ===');
console.log(wb.SheetNames);

const s1 = xlsx.utils.sheet_to_json(wb.Sheets['50 Bad Outdated Websites']);
const s2 = xlsx.utils.sheet_to_json(wb.Sheets['50 No Website At All']);

console.log(`\nSheet 1 row count: ${s1.length}`);
console.log(`Sheet 2 row count: ${s2.length}`);

// Audit Sheet 1
let s1Errors = 0;
s1.forEach((row, i) => {
  const url = row['Actual Website URL'] || '';
  if (!url.startsWith('http') || url.includes('google.com/search')) {
    console.error(`Sheet 1 Row ${i+1} has invalid URL: ${url}`);
    s1Errors++;
  }
  if (!row['Email'] || !row['Email'].includes('@')) {
    console.error(`Sheet 1 Row ${i+1} has invalid Email: ${row['Email']}`);
    s1Errors++;
  }
  if (!row['First Name'] || row['First Name'] === 'there') {
    console.error(`Sheet 1 Row ${i+1} has generic first name: ${row['First Name']}`);
    s1Errors++;
  }
});

// Audit Sheet 2
let s2Errors = 0;
s2.forEach((row, i) => {
  if (!row['Email'] || !row['Email'].includes('@')) {
    console.error(`Sheet 2 Row ${i+1} has invalid Email: ${row['Email']}`);
    s2Errors++;
  }
  if (!row['SEBI Registration No'] || !row['SEBI Registration No'].startsWith('IN')) {
    console.error(`Sheet 2 Row ${i+1} has invalid SEBI reg: ${row['SEBI Registration No']}`);
    s2Errors++;
  }
  if (!row['First Name'] || row['First Name'] === 'there') {
    console.error(`Sheet 2 Row ${i+1} has generic first name: ${row['First Name']}`);
    s2Errors++;
  }
});

console.log(`Audit Summary: Sheet 1 errors: ${s1Errors}, Sheet 2 errors: ${s2Errors}`);

// Print all 50 Bad Website Leads
console.log('\n========================================');
console.log('--- SHEET 1: 50 BAD / OUTDATED WEBSITES ---');
console.log('========================================');
s1.forEach(r => {
  console.log(`${r['#']}. [${r['First Name']}] ${r['Full Name']} | Firm: ${r['Firm Name']} | Email: ${r['Email']} | URL: ${r['Actual Website URL']}`);
});

console.log('\n========================================');
console.log('--- SHEET 2: 50 NO WEBSITE AT ALL ---');
console.log('========================================');
s2.forEach(r => {
  console.log(`${r['#']}. [${r['First Name']}] ${r['Full Name']} | Firm: ${r['Firm Name']} | Email: ${r['Email']} | Reg: ${r['SEBI Registration No']}`);
});
