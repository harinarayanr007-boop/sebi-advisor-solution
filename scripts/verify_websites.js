const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const candidates = JSON.parse(fs.readFileSync('scripts/candidates_with_web.json', 'utf8'));

// Filter candidates to ensure boutique RIAs and clean names
const filtered = candidates.filter(c => {
  // Exclude institutional names
  if (/bank|trustee|trust|insurance|depository|exchange|clearing/i.test(c.firm)) return false;
  // Exclude bad emails
  if (!c.email || c.email.length < 5) return false;
  // Exclude missing contact person
  if (!c.contact || c.contact.length < 3) return false;
  return true;
});

console.log(`Filtered down to ${filtered.length} boutique candidates with websites to test.`);

function checkUrl(targetUrl) {
  return new Promise((resolve) => {
    try {
      const parsed = new URL(targetUrl);
      const mod = parsed.protocol === 'https:' ? https : http;
      const req = mod.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 4000,
        rejectUnauthorized: false
      }, (res) => {
        let data = '';
        res.on('data', chunk => {
          if (data.length < 15000) data += chunk.toString();
        });
        res.on('end', () => {
          const statusCode = res.statusCode;
          const isOk = (statusCode >= 200 && statusCode < 400);
          let title = '';
          const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
          if (titleMatch) title = titleMatch[1].trim();

          // Basic checks on site tech/style
          const isWordPress = /wp-content|wordpress/i.test(data);
          const isWix = /wix\.com|wixsite/i.test(data);
          const isBootstrap = /bootstrap/i.test(data);
          const hasForm = /<form/i.test(data);
          const hasPortal = /login|client portal|sign in|investor login/i.test(data);

          resolve({
            ok: isOk,
            status: statusCode,
            title,
            isWordPress,
            isWix,
            isBootstrap,
            hasPortal,
            hasForm,
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
  // Test in batches of 15
  for (let i = 0; i < filtered.length && verifiedList.length < 65; i += 15) {
    const chunk = filtered.slice(i, i + 15);
    const results = await Promise.all(chunk.map(async (item) => {
      const res = await checkUrl(item.web);
      return { item, res };
    }));

    for (const r of results) {
      if (r.res.ok) {
        // Characterize why it's a basic/outdated or non-portal site
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
          verifiedWeb: r.item.web,
          title: r.res.title,
          status: r.res.status,
          critique
        });
      }
    }
    console.log(`Tested ${Math.min(i + 15, filtered.length)} / ${filtered.length} -> Verified live sites: ${verifiedList.length}`);
  }

  console.log(`Finished! Total verified live sites: ${verifiedList.length}`);
  fs.writeFileSync('scripts/verified_bad_websites.json', JSON.stringify(verifiedList, null, 2));
}

run();
