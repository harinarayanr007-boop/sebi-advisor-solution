const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const raw = JSON.parse(fs.readFileSync('scripts/candidates_with_web.json', 'utf8'));

const institutionalKeywords = /barclays|etmoney|kuvera|ask wealth|ask hedge|ask investment|iifl|motilal|kotak|icici|hdfc|axis|360 one|marwadi|tata|sbi|bajaj|reliance|dsp|franklin|nippon|uti|geojit|edelweiss|sharekhan|angel one|zerodha|groww|bank|trustee|trust|depository|exchange|clearing|credit suisse|morgan stanley|goldman|hsbc|standard chartered|citi|ubs|nomura|bnp paribas|societe generale|mirae|amundi|invesco|blackrock|vanguard|schroders|fidelity|private equity|pe fund|venture capital|affirma|adv partners|abakkus|1 finance/i;

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

const boutiqueCandidates = raw.filter(c => {
  if (institutionalKeywords.test(c.firm)) return false;
  if (institutionalKeywords.test(c.web)) return false;
  if (!c.email || !c.email.includes('@')) return false;
  if (alreadyUsed.has(c.email.toLowerCase().trim())) return false;
  if (!c.contact || c.contact.length < 3) return false;
  if (!c.web || !c.web.startsWith('http') || c.web.startsWith('https://www.google.com/search')) return false;
  return true;
});

function checkUrl(targetUrl, maxRedirects = 3) {
  return new Promise((resolve) => {
    if (maxRedirects <= 0) return resolve({ ok: false, error: 'TOO_MANY_REDIRECTS' });
    try {
      const parsed = new URL(targetUrl);
      const mod = parsed.protocol === 'https:' ? https : http;
      const req = mod.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 4500,
        rejectUnauthorized: false
      }, (res) => {
        if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          let nextUrl = res.headers.location;
          if (!nextUrl.startsWith('http')) {
            nextUrl = new URL(nextUrl, targetUrl).toString();
          }
          return resolve(checkUrl(nextUrl, maxRedirects - 1));
        }

        let data = '';
        res.on('data', chunk => {
          if (data.length < 25000) data += chunk.toString();
        });
        res.on('end', () => {
          const isOk = (res.statusCode >= 200 && res.statusCode < 400);
          let title = '';
          const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (titleMatch) title = titleMatch[1].trim();

          const isWordPress = /wp-content|wordpress/i.test(data);
          const isWix = /wix\.com|wixsite/i.test(data);
          const isBootstrap = /bootstrap/i.test(data);
          const hasPortal = /login|client portal|sign in|investor login/i.test(data);

          resolve({
            ok: isOk,
            status: res.statusCode,
            finalUrl: targetUrl,
            title,
            isWordPress,
            isWix,
            isBootstrap,
            hasPortal,
            len: data.length
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ ok: false, error: 'TIMEOUT' });
      });

      req.on('error', (err) => {
        resolve({ ok: false, error: err.message });
      });
    } catch (e) {
      resolve({ ok: false, error: e.message });
    }
  });
}

async function run() {
  const verifiedList = [];
  const seenDomains = new Set();
  const badTitles = /restricted|parking|for sale|godaddy|hostinger|suspended|apache|iis windows|403|404|not found|access denied|error|login|under construction|coming soon/i;

  // Let's test from index 80 to 250
  const slice = boutiqueCandidates.slice(80, 260);
  console.log(`Testing ${slice.length} candidates with redirect following...`);

  for (let i = 0; i < slice.length && verifiedList.length < 50; i += 15) {
    const chunk = slice.slice(i, i + 15);
    const results = await Promise.all(chunk.map(async (item) => {
      const res = await checkUrl(item.web);
      return { item, res };
    }));

    for (const r of results) {
      if (r.res.ok && r.res.title && !badTitles.test(r.res.title) && !/[\u4e00-\u9fa5]/.test(r.res.title)) {
        let domain = '';
        try {
          domain = new URL(r.res.finalUrl || r.item.web).hostname.replace(/^www\./, '').toLowerCase();
        } catch(e) {}

        if (seenDomains.has(domain)) continue;
        seenDomains.add(domain);

        let critique = 'Basic static brochure site; lacks modern digital HNI onboarding flow';
        if (r.res.isWordPress) {
          critique = 'Legacy WordPress template; manual contact form with no client portal';
        } else if (r.res.isWix) {
          critique = 'Basic Wix template; lacks modern bespoke fintech UX';
        } else if (r.res.isBootstrap) {
          critique = 'Older Bootstrap layout; static pages with manual consultation request';
        } else if (!r.res.hasPortal) {
          critique = 'Traditional advisory brochure; no seamless onboarding or digital client portal';
        }

        verifiedList.push({
          ...r.item,
          verifiedWeb: r.res.finalUrl || r.item.web,
          title: r.res.title,
          status: r.res.status,
          critique
        });
      }
    }
    console.log(`Processed ${i + 15} / ${slice.length} -> Batch 2 verified: ${verifiedList.length}`);
  }

  console.log(`Batch 2 complete: ${verifiedList.length} sites.`);
  fs.writeFileSync('scripts/batch_2_verified.json', JSON.stringify(verifiedList, null, 2));
}

run();
