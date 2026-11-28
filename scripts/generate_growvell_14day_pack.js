const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const edgePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const browserPath = fs.existsSync(chromePath) ? chromePath : edgePath;

const root = path.join(__dirname, "..");
const assetsDir = path.join(root, "public", "growvell_templates", "assets");
const outDir = path.join(root, "public", "growvell_content");
fs.mkdirSync(outDir, { recursive: true });

function loadB64(filename, mime) {
  return `data:${mime};base64,${fs.readFileSync(path.join(assetsDir, filename)).toString("base64")}`;
}

const ASSETS = {
  cutout: loadB64("dhanesh_cutout.png", "image/png"),
  verified: loadB64("verified_badge.svg", "image/svg+xml"),
  t3Accent: loadB64("t3_accent.svg", "image/svg+xml"),
  t3Grid: loadB64("t3_grid.svg", "image/svg+xml"),
  t4Underline: loadB64("t4_underline.png", "image/png"),
  t4Arrow: loadB64("t4_arrow.svg", "image/svg+xml"),
};

const FONT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@500;600;700;800&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
`;

const blueRadial = "radial-gradient(circle at center, rgba(36,79,192,1) 0%, rgba(27,58,141,1) 50%, rgba(17,37,90,1) 100%)";
const darkRadial = "radial-gradient(circle at center, rgba(102,102,102,1) 0%, rgba(60,60,60,1) 45%, rgba(10,10,10,1) 100%)";

function avatarBlock(sizePx, bgCss) {
  return `
    <div style="width:${sizePx}px;height:${sizePx}px;border-radius:9999px;overflow:hidden;position:relative;flex-shrink:0;background:${bgCss};">
      <img src="${ASSETS.cutout}" style="position:absolute;top:6.25%;left:-34%;width:168%;height:auto;max-width:none;transform:scaleX(-1);display:block;" />
    </div>
  `;
}

function renderSinglePng(html, outFileName) {
  const outPath = path.join(outDir, outFileName);
  const tempHtml = outPath.replace(/\.png$/i, ".temp.html");
  fs.writeFileSync(tempHtml, html, "utf8");
  execFileSync(
    browserPath,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--window-size=1080,1350",
      `--screenshot=${outPath}`,
      tempHtml,
    ],
    { stdio: "pipe" }
  );
  fs.unlinkSync(tempHtml);
  console.log("PNG:", outFileName, fs.statSync(outPath).size);
}

function renderCarouselPdfAndCover(slidesHtmlArr, pdfFileName, coverFileName) {
  const fullDoc = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<style>
  @page { size: 1080px 1350px; margin: 0; }
  ${FONT_CSS}
  html, body { width: 1080px; background: #ffffff; margin: 0; padding: 0; }
  .slide {
    width: 1080px;
    height: 1350px;
    position: relative;
    overflow: hidden;
    page-break-after: always;
    break-after: page;
  }
  .slide:last-child {
    page-break-after: auto;
    break-after: auto;
  }
  @media print { html, body { width: 1080px; margin: 0; padding: 0; } }
</style>
</head>
<body>${slidesHtmlArr.join("\n")}</body>
</html>`;

  const pdfPath = path.join(outDir, pdfFileName);
  const tempHtml = pdfPath.replace(/\.pdf$/i, ".temp.html");
  fs.writeFileSync(tempHtml, fullDoc, "utf8");
  execFileSync(
    browserPath,
    ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", `--print-to-pdf=${pdfPath}`, tempHtml],
    { stdio: "pipe" }
  );
  fs.unlinkSync(tempHtml);

  const coverDoc = `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><style>
  ${FONT_CSS}
  html, body { width: 1080px; height: 1350px; overflow: hidden; margin: 0; padding: 0; }
  .slide { width: 1080px; height: 1350px; position: relative; overflow: hidden; }
</style></head>
<body>${slidesHtmlArr[0]}</body>
</html>`;
  renderSinglePng(coverDoc, coverFileName);
  console.log("PDF:", pdfFileName, fs.statSync(pdfPath).size);
}

// =====================================================================
// 1. DARK TWITTER TEMPLATE (98:171) -> 14 Cards (1-2 sentences, NO WhatsApp CTA)
// =====================================================================
function buildDarkTweetHtml(sentences, timestampText) {
  const bodyHtml = sentences
    .map(
      (s, idx) =>
        `<p style="font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;font-weight:500;font-size:48px;line-height:1.34;color:#ffffff;margin-bottom:${
          idx < sentences.length - 1 ? 30 : 0
        }px;letter-spacing:-0.015em;">${s}</p>`
    )
    .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><style>${FONT_CSS}
html, body { width: 1080px; height: 1350px; background: #000000; display: flex; align-items: center; justify-content: center; font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
</style></head>
<body>
  <div style="width:940px;background:#000000;border-radius:16px;padding:64px;margin-top:-40px;">
    <div style="display:flex;align-items:center;gap:18px;margin-bottom:40px;">
      ${avatarBlock(104, blueRadial)}
      <div style="display:flex;flex-direction:column;gap:4px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-weight:700;font-size:33px;line-height:1.2;color:#ffffff;letter-spacing:0.2px;">Dhanesh Murali</span>
          <img src="${ASSETS.verified}" style="width:28px;height:28px;display:block;" />
        </div>
        <span style="font-weight:400;font-size:26px;line-height:1.25;color:rgba(232,232,232,0.62);">@Dhanesh_Murali</span>
      </div>
    </div>
    <div style="margin-bottom:46px;">${bodyHtml}</div>
    <div style="display:flex;align-items:center;gap:12px;font-weight:500;font-size:30px;letter-spacing:-0.6px;">
      <span style="color:#8e8e8e;">${timestampText}</span>
      <span style="color:#8e8e8e;">·</span>
      <span style="color:#2aa3ef;">Twitter Web App</span>
    </div>
  </div>
</body>
</html>`;
}

const DARK_TWEETS = [
  {
    file: "day01_tweet_dark.png",
    date: "9:15 AM · Nov 28, 2026",
    lines: [
      "I stopped asking clients how much they can save on the 25th.",
      "Lock in a 5th-of-month SIP auto-debit first, then spend the rest guilt-free.",
    ],
  },
  {
    file: "day02_tweet_dark.png",
    date: "9:15 AM · Nov 29, 2026",
    lines: [
      "Having ₹1 Crore in mutual funds with zero nominee is silently cooked.",
      "Five minutes on MFCentral.com today saves your family months of legal affidavits.",
    ],
  },
  {
    file: "day03_tweet_dark.png",
    date: "9:15 AM · Nov 30, 2026",
    lines: [
      "NRIs park ₹3.35 Lakh Crore in bank deposits earning 6.5% while inflation eats purchasing power.",
      "Lock in equity compounding before your next Gulf contract renewal.",
    ],
  },
  {
    file: "day04_tweet_dark.png",
    date: "9:15 AM · Dec 1, 2026",
    lines: [
      "Owning 14 mutual funds does not make you diversified; it just makes your portfolio overlap cooked.",
      "Four focused pillars beat 14 random schemes every single decade.",
    ],
  },
  {
    file: "day05_tweet_dark.png",
    date: "9:15 AM · Dec 2, 2026",
    lines: [
      "A ₹15,000 monthly SIP stepped up by 10% every year hits ₹1 Crore in 11 years, not 20.",
      "Your annual appraisal is the real wealth multiplier.",
    ],
  },
  {
    file: "day06_tweet_dark.png",
    date: "9:15 AM · Dec 3, 2026",
    lines: [
      "9 out of 10 F&O traders lose money while ₹32,160+ Crore in monthly SIPs compounds quietly.",
      "Stop treating your hard-earned salary like casino chips.",
    ],
  },
  {
    file: "day07_tweet_dark.png",
    date: "9:15 AM · Dec 4, 2026",
    lines: [
      "You do not need to fly to India or visit an embassy just to start an Indian SIP.",
      "Video KYC gets an NRI locked in from Dubai, Singapore, or London in 15 minutes.",
    ],
  },
  {
    file: "day08_tweet_dark.png",
    date: "9:15 AM · Dec 5, 2026",
    lines: [
      "Leaving ₹10 Lakhs in a 3% savings account waiting for a crash is a silent wealth leak.",
      "Route it through a 12-month STP and let time do the heavy lifting.",
    ],
  },
  {
    file: "day09_tweet_dark.png",
    date: "9:15 AM · Dec 6, 2026",
    lines: [
      "Routing foreign salary into an NRO account instead of an NRE account triggers a 30% TDS cut.",
      "One wrong bank selection quietly drains your NRI returns.",
    ],
  },
  {
    file: "day10_tweet_dark.png",
    date: "9:15 AM · Dec 7, 2026",
    lines: [
      "If your bank RM pitched a tax-free fund with a 5-year lock-in, your portfolio got cooked by a ULIP.",
      "Open the PDF and search for Mortality Charges.",
    ],
  },
  {
    file: "day11_tweet_dark.png",
    date: "9:15 AM · Dec 8, 2026",
    lines: [
      "Relying on willpower on the 25th always loses to EMIs and weekend plans.",
      "Automate your SIP on the 5th so wealth happens before lifestyle creep.",
    ],
  },
  {
    file: "day12_tweet_dark.png",
    date: "9:15 AM · Dec 9, 2026",
    lines: [
      "Indian mutual funds deduct TDS on NRI redemptions, but DTAA treaties let you claim tax credit.",
      "Never let tax confusion keep your capital idle.",
    ],
  },
  {
    file: "day13_tweet_dark.png",
    date: "9:15 AM · Dec 10, 2026",
    lines: [
      "Chasing last year's top small-cap fund is how retail investors buy high and panic-sell low.",
      "Boring 13% consistency beats flashy 20% hype every 10-year cycle.",
    ],
  },
  {
    file: "day14_tweet_dark.png",
    date: "9:15 AM · Dec 11, 2026",
    lines: [
      "Every red week in the market simply means your same SIP rupee buys more units at a discount.",
      "Close the portfolio app and let compounding lock in.",
    ],
  },
];

// =====================================================================
// 2. BEFORE vs AFTER (159:86) & X vs Y (159:150) -> 8 Visual PNGs
// =====================================================================
function buildSplitComparisonHtml({ leftTitle, rightTitle, leftCards, rightCards }) {
  const leftSize = leftTitle.length > 10 ? 64 : 92;
  const rightSize = rightTitle.length > 10 ? 64 : 92;

  const renderCards = (cards, bg) =>
    cards
      .map(
        (txt) => `
      <div style="background:${bg};border-radius:12px;padding:34px 32px;width:440px;box-shadow:0 16px 28px rgba(0,0,0,0.22);display:flex;align-items:center;min-height:178px;">
        <p style="font-family:'Inter',sans-serif;font-weight:700;font-size:31px;line-height:1.28;color:#111111;letter-spacing:-0.02em;">${txt}</p>
      </div>`
      )
      .join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><style>${FONT_CSS}
html, body { width: 1080px; height: 1350px; background: #142c6b; position: relative; overflow: hidden; font-family: 'Inter', sans-serif; }
</style></head>
<body>
  <div style="position:absolute;left:50%;top:0;bottom:0;width:4px;background:rgba(255,255,255,0.85);transform:translateX(-50%);"></div>

  <div style="position:absolute;left:0;top:46px;width:540px;text-align:center;padding:0 24px;">
    <p style="font-weight:900;font-size:${leftSize}px;line-height:1.05;color:#ffffff;letter-spacing:-0.03em;">${leftTitle}</p>
  </div>
  <div style="position:absolute;left:540px;top:46px;width:540px;text-align:center;padding:0 24px;">
    <p style="font-weight:900;font-size:${rightSize}px;line-height:1.05;color:#ffffff;letter-spacing:-0.03em;">${rightTitle}</p>
  </div>

  <div style="position:absolute;left:50px;top:245px;display:flex;flex-direction:column;gap:28px;">
    ${renderCards(leftCards, "#ffe4e4")}
  </div>
  <div style="position:absolute;left:590px;top:245px;display:flex;flex-direction:column;gap:28px;">
    ${renderCards(rightCards, "#f2ffe9")}
  </div>

  <div style="position:absolute;left:0;right:0;bottom:28px;text-align:center;font-size:22px;font-weight:600;color:rgba(255,255,255,0.72);letter-spacing:0.02em;">
    Dhanesh Murali · @Dhanesh_Murali · Growvell
  </div>
</body>
</html>`;
}

const SPLIT_POSTS = [
  {
    file: "day03_xy_nre_fd_vs_mf.png",
    leftTitle: "NRE FD",
    rightTitle: "NRI Mutual Funds",
    leftCards: [
      "Fixed 6.5% to 7% interest before inflation.",
      "Barely beats rising education and healthcare costs.",
      "Locked-in bank tenures with premature penalty.",
      "Zero equity wealth compounding over 10+ years.",
    ],
    rightCards: [
      "12% to 13% historical long-term equity CAGR.",
      "Outpaces inflation cleanly over 7 to 15 years.",
      "Full open-ended liquidity when life shifts.",
      "Builds ₹1 Cr+ India corpus from Gulf savings.",
    ],
  },
  {
    file: "day04_ba_cluttered_vs_4pillars.png",
    leftTitle: "Before",
    rightTitle: "After",
    leftCards: [
      "14 random mutual funds bought from tips.",
      "Massive overlap across the same 40 stocks.",
      "Zero clarity on what is actually performing.",
      "Confusing CAS statements every tax season.",
    ],
    rightCards: [
      "4 clean pillars: Flexi, Large-Mid, Mid, Multi-Asset.",
      "Every rupee mapped to a specific goal.",
      "Zero duplicate stock overlap or clutter.",
      "Clean, trackable portfolio growth in one view.",
    ],
  },
  {
    file: "day06_xy_trading_vs_sip.png",
    leftTitle: "Trading Apps",
    rightTitle: "Disciplined SIPs",
    leftCards: [
      "9 out of 10 retail F&O traders lose money.",
      "Daily screen addiction and cortisol spikes.",
      "Heavy brokerage, STT, and short-term tax.",
      "Distracts from career and family focus.",
    ],
    rightCards: [
      "Automated wealth runs on the 5th of the month.",
      "Zero daily chart checking or timing stress.",
      "Tax-efficient compounding across market cycles.",
      "450+ families building calm ₹1 Cr+ goals.",
    ],
  },
  {
    file: "day08_ba_idle_cash_vs_stp.png",
    leftTitle: "Before",
    rightTitle: "After",
    leftCards: [
      "₹10 Lakhs sitting idle in a 3% savings account.",
      "Waiting endlessly for the 'perfect market dip'.",
      "Inflation quietly erodes purchasing power daily.",
      "Impulse spending drains liquid balances.",
    ],
    rightCards: [
      "3 months expenses kept safe in liquid funds.",
      "6 months buffer parked in low-tax Arbitrage.",
      "Remaining capital deployed via 12-month STP.",
      "Smooth rupee-cost averaging with zero panic.",
    ],
  },
  {
    file: "day09_xy_nre_vs_nro.png",
    leftTitle: "NRE Account",
    rightTitle: "NRO Account",
    leftCards: [
      "Built strictly for overseas foreign earnings.",
      "Interest earned is 100% tax-free in India.",
      "Principal + returns freely repatriable abroad.",
      "Cleanest route for Gulf & global NRI SIPs.",
    ],
    rightCards: [
      "Built only for Indian rent, dividends, or pension.",
      "Flat 30% TDS deducted on interest earned.",
      "Repatriation capped at $1M/year with CA forms.",
      "Wrong account choice drains NRI post-tax yield.",
    ],
  },
  {
    file: "day11_ba_willpower_vs_autopay.png",
    leftTitle: "Before",
    rightTitle: "After",
    leftCards: [
      "Salary hits, EMIs and weekend bills clear first.",
      "'I will invest whatever is left on the 25th.'",
      "Emergency travel or shopping wipes out surplus.",
      "Years pass with flat savings despite raises.",
    ],
    rightCards: [
      "25% to 30% SIP auto-debit clears on the 5th.",
      "Pay your future self before lifestyle creep.",
      "Step up SIP by 10% every annual appraisal.",
      "Spend every remaining rupee guilt-free.",
    ],
  },
  {
    file: "day13_xy_hype_vs_discipline.png",
    leftTitle: "20% Hype",
    rightTitle: "13% Discipline",
    leftCards: [
      "Chasing last year's #1 thematic or small-cap.",
      "Entering at peak valuations after the rally.",
      "Panicking and pausing SIPs on a 10% dip.",
      "Mediocre actual investor returns over time.",
    ],
    rightCards: [
      "Diversified Flexi & Core equity allocation.",
      "Consistent SIPs through bull and bear weeks.",
      "Annual 10% step-ups aligned with salary.",
      "Predictable ₹1 Cr+ corpus over 11 to 15 years.",
    ],
  },
];

// =====================================================================
// 3. CAROUSELS (99:284 White & 99:196 Navy) -> Days 5, 7, 10, 12, 14 (NO WhatsApp CTA!)
// =====================================================================
function t3Chrome(showAccent = true) {
  return `
    ${showAccent ? `<img src="${ASSETS.t3Accent}" style="position:absolute;left:762px;top:1162px;width:231px;height:100px;pointer-events:none;" />` : ""}
    <img src="${ASSETS.t3Grid}" style="position:absolute;left:802px;top:967px;width:588px;height:543px;opacity:0.95;pointer-events:none;" />
  `;
}

function buildWhiteCarouselSlides({ coverHeadline, slide2, slide3Lines, slide3Highlight, slide4Title, slide4Bullets }) {
  return [
    `<div class="slide" style="background:#ffffff;">
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 110px;text-align:center;">
        <div style="margin-bottom:24px;">${avatarBlock(198, darkRadial)}</div>
        <h1 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:68px;line-height:1.18;color:#191919;letter-spacing:-0.02em;">${coverHeadline}</h1>
      </div>
      ${t3Chrome(true)}
    </div>`,
    `<div class="slide" style="background:#ffffff;">
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 110px;text-align:center;">
        <p style="font-family:'Poppins',sans-serif;font-weight:700;font-size:56px;line-height:1.28;color:#191919;letter-spacing:-0.015em;">${slide2}</p>
      </div>
      ${t3Chrome(true)}
    </div>`,
    `<div class="slide" style="background:#ffffff;">
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 95px;">
        <div style="font-family:'Poppins',sans-serif;font-weight:700;font-size:54px;line-height:1.38;color:#191919;letter-spacing:-0.015em;">
          ${slide3Lines.map((l) => `<p style="margin-bottom:14px;">${l}</p>`).join("")}
          <p style="color:#0038C8;">${slide3Highlight}</p>
        </div>
      </div>
      ${t3Chrome(true)}
    </div>`,
    `<div class="slide" style="background:#ffffff;">
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 95px;">
        <h2 style="font-family:'Poppins',sans-serif;font-weight:700;font-size:56px;line-height:1.22;color:#191919;text-align:center;margin-bottom:60px;">${slide4Title}</h2>
        <div style="font-family:'Poppins',sans-serif;font-weight:500;font-size:38px;line-height:1.45;color:#191919;">
          ${slide4Bullets.map((b, i) => `<p style="margin-bottom:${i < slide4Bullets.length - 1 ? 28 : 0}px;"><strong>${i + 1}.</strong> ${b}</p>`).join("")}
        </div>
      </div>
      ${t3Chrome(true)}
    </div>`,
    `<div class="slide" style="background:#ffffff;">
      <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0 110px;text-align:center;">
        <div style="margin-bottom:84px;">${avatarBlock(198, darkRadial)}</div>
        <div style="font-family:'Poppins',sans-serif;font-weight:700;font-size:58px;line-height:1.28;color:#191919;margin-bottom:32px;">
          <p>Found this helpful?</p>
          <p>Follow @Dhanesh_Murali</p>
        </div>
        <p style="font-family:'Poppins',sans-serif;font-weight:600;font-size:30px;color:#0038C8;">
          Save this checklist for your next portfolio review.
        </p>
      </div>
      ${t3Chrome(false)}
    </div>`,
  ];
}

function t4NumberedSlide(num, title, paragraphs) {
  const cardBody = paragraphs
    .map(
      (p, idx) =>
        `<p style="font-family:'Inter',sans-serif;font-weight:500;font-size:42px;line-height:1.38;color:#4a4a4a;margin-bottom:${
          idx < paragraphs.length - 1 ? 34 : 0
        }px;">${p}</p>`
    )
    .join("");
  return `<div class="slide" style="background:#142c6b;">
    <div style="position:absolute;left:106px;top:96px;right:76px;display:flex;align-items:flex-start;gap:42px;">
      <span style="font-family:'Inter',sans-serif;font-weight:900;font-size:275px;line-height:0.82;color:#ffffff;">${num}</span>
      <h2 style="font-family:'Inter',sans-serif;font-weight:700;font-size:70px;line-height:1.12;color:#ffffff;padding-top:14px;">${title}</h2>
    </div>
    <div style="position:absolute;left:116px;right:116px;top:515px;background:#ffffff;border-radius:30px;padding:60px 56px;min-height:620px;display:flex;flex-direction:column;justify-content:center;">
      ${cardBody}
    </div>
  </div>`;
}

function buildNavyCarouselSlides({ topLine1, underlinedWord, topLine3, steps, closingTitle, closingSub }) {
  return [
    `<div class="slide" style="background:#142c6b;">
      <div style="position:absolute;left:74px;right:74px;top:165px;">
        <p style="font-family:'Inter',sans-serif;font-weight:800;font-size:74px;line-height:1.18;color:#ffffff;">${topLine1}</p>
        <p style="font-family:'Inter',sans-serif;font-weight:800;font-size:74px;line-height:1.18;color:#ffffff;margin-top:6px;">
          <span style="position:relative;display:inline-block;">
            <span style="position:relative;z-index:2;">${underlinedWord}</span>
            <img src="${ASSETS.t4Underline}" style="position:absolute;left:0;bottom:4px;width:100%;height:14px;z-index:1;" />
          </span>
        </p>
        <p style="font-family:'Inter',sans-serif;font-weight:600;font-size:66px;line-height:1.2;color:#ffffff;margin-top:12px;">${topLine3}</p>
      </div>
      <img src="${ASSETS.t4Arrow}" style="position:absolute;right:82px;top:545px;width:142px;height:101px;" />
      <div style="position:absolute;left:270px;top:613px;">${avatarBlock(540, darkRadial)}</div>
      <div style="position:absolute;left:50%;transform:translateX(-50%);top:1110px;background:#ffffff;border-radius:16px;padding:24px 44px;box-shadow:0 0 20px rgba(0,0,0,0.25);text-align:center;">
        <p style="font-family:'Inter',sans-serif;font-weight:800;font-size:30px;color:#191919;line-height:1.25;">Dhanesh Murali</p>
        <p style="font-family:'Inter',sans-serif;font-weight:400;font-size:22px;color:rgba(25,25,25,0.7);line-height:1.3;">@Dhanesh_Murali</p>
      </div>
    </div>`,
    ...steps.map((st, idx) => t4NumberedSlide(idx + 1, st.title, st.paragraphs)),
    `<div class="slide" style="background:#142c6b;padding:0 142px;display:flex;flex-direction:column;justify-content:center;">
      <div style="margin-bottom:135px;">
        <h2 style="font-family:'Inter',sans-serif;font-weight:800;font-size:74px;line-height:1.08;color:#ffffff;margin-bottom:56px;">${closingTitle}</h2>
        <p style="font-family:'Inter',sans-serif;font-weight:400;font-size:60px;line-height:1.22;color:#ffffff;">${closingSub}</p>
      </div>
      <div style="display:flex;align-items:center;gap:18px;">
        ${avatarBlock(138, blueRadial)}
        <div style="display:flex;flex-direction:column;gap:4px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-family:'Inter',sans-serif;font-weight:700;font-size:42px;color:#ffffff;">Dhanesh Murali</span>
            <img src="${ASSETS.verified}" style="width:36px;height:36px;display:block;" />
          </div>
          <span style="font-family:'Inter',sans-serif;font-weight:400;font-size:34px;color:rgba(232,232,232,0.65);">@Dhanesh_Murali</span>
        </div>
      </div>
    </div>`,
  ];
}

// Render all 14 Dark Tweet PNGs
for (const dt of DARK_TWEETS) {
  renderSinglePng(buildDarkTweetHtml(dt.lines, dt.date), dt.file);
}

// Render all 7 Before/After & X vs Y PNGs
for (const sp of SPLIT_POSTS) {
  renderSinglePng(buildSplitComparisonHtml(sp), sp.file);
}

// Render 5 New Carousel PDFs + Covers (Days 5, 7, 10, 12, 14)
renderCarouselPdfAndCover(
  buildWhiteCarouselSlides({
    coverHeadline: "How a ₹15,000 monthly SIP builds ₹1 Crore in 11 years.",
    slide2: "Most salaried investors keep their SIP flat at ₹15,000 for 15 years even as their salary doubles.",
    slide3Lines: [
      "Flat ₹15K SIP @ 13%: 15 years to ₹1 Crore.",
      "With 10% annual Step-Up: 11 years to ₹1 Crore.",
      "Same starting budget.",
      "4 full years saved.",
    ],
    slide3Highlight: "Let your increments fund your freedom.",
    slide4Title: "The 3-Fund ₹1 Crore SIP Stack:",
    slide4Bullets: [
      "Allocate 40% to a proven Flexi Cap mutual fund for core stability.",
      "Route 35% into a Large & Mid Cap fund for steady domestic growth.",
      "Put 25% into a disciplined Mid Cap fund and step up 10% every April.",
    ],
  }),
  "day05_carousel_1crore_sip.pdf",
  "day05_carousel_1crore_sip_cover.png"
);

renderCarouselPdfAndCover(
  buildNavyCarouselSlides({
    topLine1: "NRI PAPERLESS",
    underlinedWord: "15-MINUTE KYC",
    topLine3: "from Dubai, SG, or US",
    steps: [
      {
        title: "No Embassy Visits Needed",
        paragraphs: [
          "You do not need attested paper forms or trips to India to start your mutual fund portfolio.",
          "Digital NRI KYC works 100% online from UAE, Singapore, UK, or the US.",
        ],
      },
      {
        title: "Keep 4 Documents Ready",
        paragraphs: [
          "Keep your Indian PAN card, Passport front/back, valid overseas visa or Emirates ID, and NRE bank proof ready.",
          "Clear phone scans are enough when uploaded securely.",
        ],
      },
      {
        title: "2-Minute Video Verification",
        paragraphs: [
          "Complete a quick live video OTP check to confirm your identity and overseas address.",
          "Once verified, your KYC works across all major Indian mutual fund houses.",
        ],
      },
      {
        title: "Link Your NRE Mandate",
        paragraphs: [
          "Connect your NRE bank account via netbanking e-Mandate so your monthly SIP runs automatically.",
          "Zero currency conversion friction, full repatriation flexibility.",
        ],
      },
    ],
    closingTitle: "Ready from abroad?",
    closingSub: "Build your <strong>₹1 Crore+ India corpus</strong> without paper delays.",
  }),
  "day07_carousel_nri_kyc.pdf",
  "day07_carousel_nri_kyc_cover.png"
);

renderCarouselPdfAndCover(
  buildWhiteCarouselSlides({
    coverHeadline: "Did your bank RM sell you a ULIP disguised as a mutual fund?",
    slide2: "Thousands of families walk into a bank asking for a mutual fund and walk out locked into a 5-year insurance plan.",
    slide3Lines: [
      "Look at your policy PDF.",
      "Search for 'Mortality Charges'.",
      "Search for 'Allocation Charge'.",
      "Check for a 5-year lock-in.",
    ],
    slide3Highlight: "Real mutual funds have ZERO mortality fees.",
    slide4Title: "Run this 5-second policy filter:",
    slide4Bullets: [
      "Open your policy PDF and check if 'Sum Assured' appears on Page 1.",
      "Real mutual funds offer daily NAV transparency and zero insurance deductions.",
      "Never sign a 'tax-free wealth plan' in a bank branch without a second opinion.",
    ],
  }),
  "day10_carousel_ulip_audit.pdf",
  "day10_carousel_ulip_audit_cover.png"
);

renderCarouselPdfAndCover(
  buildNavyCarouselSlides({
    topLine1: "NRI TAX TRUTH",
    underlinedWord: "30% TDS & DTAA",
    topLine3: "explained cleanly",
    steps: [
      {
        title: "Why TDS Applies to NRIs",
        paragraphs: [
          "Unlike resident Indians, mutual fund AMCs deduct TDS automatically when an NRI redeems units.",
          "Short-term equity gains attract 20% TDS; long-term gains above ₹1.25L attract 12.5%.",
        ],
      },
      {
        title: "Use Your DTAA Advantage",
        paragraphs: [
          "India has Double Taxation Avoidance Agreements with UAE, Singapore, US, UK, and 80+ countries.",
          "Submit a Tax Residency Certificate (TRC) and Form 10F where applicable.",
        ],
      },
      {
        title: "Never Hold NRE Cash Idle",
        paragraphs: [
          "Even after capital gains tax, diversified Indian equity funds have historically outpaced 6.5% NRE FDs.",
          "Tax clarity turns hesitation into steady 10-year compounding.",
        ],
      },
    ],
    closingTitle: "Clarity beats fear.",
    closingSub: "Structure your <strong>NRI India investments</strong> cleanly from Day 1.",
  }),
  "day12_carousel_nri_tds.pdf",
  "day12_carousel_nri_tds_cover.png"
);

renderCarouselPdfAndCover(
  buildWhiteCarouselSlides({
    coverHeadline: "Market dropping this week? Why you must NOT pause your SIP.",
    slide2: "When Nifty drops 4% in a week, most retail investors panic and hit 'Pause SIP' right at the bottom.",
    slide3Lines: [
      "Green week = Fewer units bought.",
      "Red week = More units bought.",
      "Same ₹15,000 monthly debit.",
      "Bigger unit pile at recovery.",
    ],
    slide3Highlight: "Red weeks are when real wealth gets built.",
    slide4Title: "3 rules for volatile market weeks:",
    slide4Bullets: [
      "Do not pause your SIP auto-debit during sharp market corrections.",
      "Delete daily portfolio tracker apps from your phone home screen.",
      "Revisit your asset allocation once a year, not every Friday afternoon.",
    ],
  }),
  "day14_carousel_volatility_sip.pdf",
  "day14_carousel_volatility_sip_cover.png"
);

console.log("ALL 14-DAY GROWVELL ASSETS GENERATED!");
