const fs = require('fs');
const lines = fs.readFileSync('public/sebi_registered_advisers.csv', 'utf8').trim().split('\n');

const websites = lines.map(line => {
  const cols = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { cur += '"'; i++; }
      else inQuotes = !inQuotes;
    } else if (c === ',' && !inQuotes) {
      cols.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  cols.push(cur);
  return cols[8];
});

fs.writeFileSync('public/sebi_websites_column.txt', websites.join('\r\n'), 'utf8');
console.log('Saved public/sebi_websites_column.txt with', websites.length, 'lines.');
