export interface ContentSlot {
  label: string;
  approvedPostId?: number;
  status: "in_progress" | "ready";
  caption: string;
  fileUrl: string;
  fileName: string;
  previewImageUrl?: string;
  updatedAt?: string;
}

export interface DayDeliveryRecord {
  day: number;
  title: string;
  linkedin: [ContentSlot, ContentSlot];
  twitter: [ContentSlot, ContentSlot];
}

export interface DaySuggestion {
  id: string;
  day: number;
  platform: "linkedin" | "twitter" | "general";
  text: string;
  author: string;
  createdAt: string;
}

export interface GrowvellDayContentState {
  version: 3;
  days: Record<number, DayDeliveryRecord>;
  suggestions: DaySuggestion[];
  lastUpdated: string;
  updatedBy: string;
}

export function createEmptySlot(label = "Post Asset"): ContentSlot {
  return {
    label,
    status: "in_progress",
    caption: "",
    fileUrl: "",
    fileName: "",
    previewImageUrl: "",
  };
}

export function createEmptyDay(dayNumber: number, title?: string): DayDeliveryRecord {
  return {
    day: dayNumber,
    title: title || `Day ${dayNumber} Content Drop`,
    linkedin: [
      createEmptySlot("LinkedIn Post 1 (Visual / Carousel)"),
      createEmptySlot("LinkedIn Post 2 (Dark Tweet Card)"),
    ],
    twitter: [
      createEmptySlot("X Post 1"),
      createEmptySlot("X Post 2"),
    ],
  };
}

const TS = "2026-11-28T20:15:00.000Z";

export const DEFAULT_SEEDED_DAYS: Record<number, DayDeliveryRecord> = {
  1: {
    day: 1,
    title: "Day 1: Salary Week & Automated SIPs (#81)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (5-Slide Carousel PDF)",
        approvedPostId: 81,
        status: "ready",
        fileUrl: "/growvell_content/Growvell_Carousel_01_Salary_Checklist_Post81.pdf",
        fileName: "Growvell_Carousel_01_Salary_Checklist_Post81.pdf",
        previewImageUrl: "/growvell_content/carousel_01_cover.png",
        caption: `I audited 14 salaried portfolios last month.

11 of them earned over ₹1.5L/month. Yet 9 of them were quietly cooked when it came to long-term savings, sitting on less than ₹3 Lakhs after 4 years of working.

Not because they were careless. Because they followed the same broken order every single month:

Salary hits -> Rent & EMIs -> Weekend spends -> "I'll invest whatever is left on the 25th."

Spoiler: On the 25th, nothing is left.

Indian investors now pour ₹32,160+ Crore into SIPs every month (AMFI, Oct 2026) because they locked in one simple fix: the order.

I built this 5-slide Salary Day checklist for the 450+ families we guide so your ₹1 Crore goal runs on autopilot before weekend spending starts.

Swipe through the 5 slides above.

DM me on WhatsApp if you want our exact monthly allocation sheet.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 81,
        status: "ready",
        fileUrl: "/growvell_content/day01_tweet_dark.png",
        fileName: "day01_tweet_dark.png",
        previewImageUrl: "/growvell_content/day01_tweet_dark.png",
        caption: `I stopped asking clients "How much can you save this month?" 6 years ago.

Because willpower on the 25th always loses to EMIs, food delivery, and weekend plans.

Instead, I move their SIP auto-debit to the 5th of every month and lock in 25% to 30% first. Once that debit clears, I tell them to spend every remaining rupee completely guilt-free.

DM me on WhatsApp if you want help structuring your 5th-of-month SIP setup.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (Salary Day Rule)",
        approvedPostId: 81,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I reviewed 14 salaried bank statements last month.

The people earning ₹2L+/month were not saving more than the ones earning ₹80K.

The only difference was one rule: locking in a 5th-of-month SIP auto-debit before lifestyle creep kicks in.

DM me on WhatsApp if you want our Salary Day allocation checklist.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 81,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I tell every salaried client and Gulf NRI the same thing:

If you wait until the 25th to invest "what is left," your compounding is cooked.

Pay your future self on the 5th first.

DM me on WhatsApp if you want to automate your ₹1 Crore roadmap.`,
        updatedAt: TS,
      },
    ],
  },

  2: {
    day: 2,
    title: "Day 2: Sunday Nominee Check (#84)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (8-Slide Nominee Carousel PDF)",
        approvedPostId: 84,
        status: "ready",
        fileUrl: "/growvell_content/Growvell_Carousel_02_Nominee_Fix_Post84.pdf",
        fileName: "Growvell_Carousel_02_Nominee_Fix_Post84.pdf",
        previewImageUrl: "/growvell_content/carousel_02_cover.png",
        caption: `I watched a family wait 7 months to access ₹28 Lakhs in mutual funds.

Not because the market crashed. Not because of a tax dispute.

Because one single line in their folio was blank: the Nominee. That one oversight left their liquidity completely cooked during an emergency.

Without a registered nominee, Indian AMCs freeze online redemptions and ask for succession certificates and court affidavits.

I put together this 5-step Sunday checklist on MFCentral.com so you can verify every folio, including old ELSS funds, in under 15 minutes.

DM me on WhatsApp if you want us to audit your older mutual fund folios.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 84,
        status: "ready",
        fileUrl: "/growvell_content/day02_tweet_dark.png",
        fileName: "day02_tweet_dark.png",
        previewImageUrl: "/growvell_content/day02_tweet_dark.png",
        caption: `I check the nominee field on every new client portfolio in our very first review.

And 4 out of 10 times, older tax-saving ELSS funds or lump sums from years ago still show "Pending."

Take 5 minutes on MFCentral.com this week and lock it in with Aadhaar OTP.

DM me on WhatsApp if any old folio is throwing an error and needs a clean fix.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (Sunday Nominee Check)",
        approvedPostId: 84,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I saw a family wait 7 months for court succession papers just to unlock ₹28L in mutual funds.

All because the Nominee field was blank.

Spend 5 minutes on MFCentral.com today and lock in every folio with Aadhaar OTP.

DM me on WhatsApp if you need help fixing old folios.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 84,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I always warn NRIs in the UAE and Singapore about one silent risk:

Building ₹1 Cr+ in India while leaving the mutual fund nominee blank.

Five minutes of setup saves your family months of legal stress.

DM me on WhatsApp for our NRI family protection checklist.`,
        updatedAt: TS,
      },
    ],
  },

  3: {
    day: 3,
    title: "Day 3: NRE FD vs NRI Mutual Funds (#51)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (X vs Y Comparison)",
        approvedPostId: 51,
        status: "ready",
        fileUrl: "/growvell_content/day03_xy_nre_fd_vs_mf.png",
        fileName: "day03_xy_nre_fd_vs_mf.png",
        previewImageUrl: "/growvell_content/day03_xy_nre_fd_vs_mf.png",
        caption: `I looked at the latest SLBC data last week: Kerala NRI bank deposits alone crossed ₹3.35 Lakh Crore.

Most of that capital sits quietly in 6.5% NRE Fixed Deposits.

When I speak to engineers and doctors in Dubai and Riyadh, they feel "safe" in an NRE FD. Then 10 years pass, Indian college fees and healthcare double, and their FD barely kept pace.

Real wealth is not built by locking 100% of your Gulf savings in bank tenures.

DM me on WhatsApp if you want to compare your current NRE FD yield against a diversified NRI mutual fund plan.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 51,
        status: "ready",
        fileUrl: "/growvell_content/day03_tweet_dark.png",
        fileName: "day03_tweet_dark.png",
        previewImageUrl: "/growvell_content/day03_tweet_dark.png",
        caption: `I had a Dubai-based client ask me why his ₹60 Lakh NRE FD felt smaller after 8 years.

Because 6.5% bank interest minus 7% real lifestyle and education inflation is a negative real return.

Keep your emergency buffer in NRE FDs, and lock in equity compounding for everything 7+ years out.

DM me on WhatsApp if you want us to structure your NRI India portfolio.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (NRE FD vs Mutual Funds)",
        approvedPostId: 51,
        status: "ready",
        fileUrl: "/growvell_content/day03_xy_nre_fd_vs_mf.png",
        fileName: "day03_xy_nre_fd_vs_mf.png",
        previewImageUrl: "/growvell_content/day03_xy_nre_fd_vs_mf.png",
        caption: `I keep seeing GCC NRIs park 100% of their savings in 6.5% NRE FDs.

Over 10 years, inflation quietly eats that purchasing power alive.

Use FDs for liquidity, and diversified equity mutual funds for 10-year goals.

DM me on WhatsApp to review your NRE allocation.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 51,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I checked the Kerala SLBC numbers: ₹3.35 Lakh Crore sits in NRI bank accounts.

Safety feels good today, but zero equity compounding over 15 Gulf years is a quiet wealth leak.

DM me on WhatsApp if you want an NRI wealth roadmap.`,
        updatedAt: TS,
      },
    ],
  },

  4: {
    day: 4,
    title: "Day 4: Cluttered 14 Funds vs 4 Clean Pillars (#6)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (Before vs After)",
        approvedPostId: 6,
        status: "ready",
        fileUrl: "/growvell_content/day04_ba_cluttered_vs_4pillars.png",
        fileName: "day04_ba_cluttered_vs_4pillars.png",
        previewImageUrl: "/growvell_content/day04_ba_cluttered_vs_4pillars.png",
        caption: `I audited a client's CAS statement yesterday that held 14 different mutual funds.

He thought owning 14 schemes made him ultra-safe. When I mapped the underlying stocks, 62% of his money sat in the exact same top 35 companies.

His portfolio was not diversified. It was just cluttered and impossible to track.

We cleaned it up into 4 focused pillars: 1 Flexi Cap, 1 Large & Mid Cap, 1 Mid Cap, and 1 Multi-Asset fund.

DM me on WhatsApp if your CAS statement has 10+ overlapping schemes and needs a clean audit.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 6,
        status: "ready",
        fileUrl: "/growvell_content/day04_tweet_dark.png",
        fileName: "day04_tweet_dark.png",
        previewImageUrl: "/growvell_content/day04_tweet_dark.png",
        caption: `I never recommend holding 12 to 15 mutual funds in one family portfolio.

Past a certain point, every extra scheme just adds overlap and confusion without improving returns.

Four clean pillars beat 14 random funds every time.

DM me on WhatsApp if you want us to simplify your CAS statement.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (Before vs After Cleanup)",
        approvedPostId: 6,
        status: "ready",
        fileUrl: "/growvell_content/day04_ba_cluttered_vs_4pillars.png",
        fileName: "day04_ba_cluttered_vs_4pillars.png",
        previewImageUrl: "/growvell_content/day04_ba_cluttered_vs_4pillars.png",
        caption: `I reviewed a portfolio with 14 mutual funds last week.

Over 60% of the stocks were identical across 5 large-cap schemes.

Clean it up into 4 purposeful pillars and track every rupee clearly.

DM me on WhatsApp for a portfolio overlap check.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 6,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I see so many salaried investors collect mutual funds like souvenirs every year.

14 funds = cooked overlap + zero conviction.

4 core funds = clarity + real compounding.

DM me on WhatsApp if you want a clean 4-pillar portfolio audit.`,
        updatedAt: TS,
      },
    ],
  },

  5: {
    day: 5,
    title: "Day 5: ₹1 Crore Corpus with ₹15K Step-Up SIP (#1)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (5-Slide Carousel PDF)",
        approvedPostId: 1,
        status: "ready",
        fileUrl: "/growvell_content/day05_carousel_1crore_sip.pdf",
        fileName: "day05_carousel_1crore_sip.pdf",
        previewImageUrl: "/growvell_content/day05_carousel_1crore_sip_cover.png",
        caption: `I ran this math for a 29-year-old software engineer in Bangalore last week.

He started a ₹15,000/month SIP 3 years ago and never increased it once, even after two salary hikes.

At a flat ₹15,000/month (13% CAGR), hitting ₹1 Crore takes 15 years.
When you step up that same SIP by just 10% every year with your appraisal, you hit ₹1 Crore in 11 years.

Same starting budget. Four full years shaved off your timeline.

Swipe through these 5 slides to see the 3-fund ₹1 Crore stack.

DM me on WhatsApp if you want me to run your exact ₹1 Crore step-up timeline.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 1,
        status: "ready",
        fileUrl: "/growvell_content/day05_tweet_dark.png",
        fileName: "day05_tweet_dark.png",
        previewImageUrl: "/growvell_content/day05_tweet_dark.png",
        caption: `I tell every young professional one rule about hitting ₹1 Crore:

Do not wait until you can invest ₹50,000/month to start. Start with ₹15,000 today and lock in a 10% annual step-up every April.

DM me on WhatsApp if you want your custom ₹1 Crore SIP roadmap.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (₹1 Crore Step-Up Math)",
        approvedPostId: 1,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I ran the numbers for a ₹15,000 monthly SIP at 13% CAGR:

Flat ₹15K/month -> ₹1 Crore in 15 years.
10% annual Step-Up -> ₹1 Crore in 11 years.

Your annual raise is the fastest compounding lever you own.

DM me on WhatsApp for your step-up plan.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 1,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I keep reminding salaried earners: keeping your SIP flat for 5 years while your income doubles is a silent leak.

Bump your SIP by 10% every appraisal and lock in ₹1 Crore 4 years earlier.

DM me on WhatsApp to set up your step-up SIP.`,
        updatedAt: TS,
      },
    ],
  },

  6: {
    day: 6,
    title: "Day 6: Day Trading Apps vs Disciplined SIPs (#33)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (X vs Y Comparison)",
        approvedPostId: 33,
        status: "ready",
        fileUrl: "/growvell_content/day06_xy_trading_vs_sip.png",
        fileName: "day06_xy_trading_vs_sip.png",
        previewImageUrl: "/growvell_content/day06_xy_trading_vs_sip.png",
        caption: `I watched a sharp 34-year-old NRI blow ₹6.5 Lakhs in F&O options trying to "make quick side income" during work breaks.

SEBI's own study already proved 9 out of 10 retail F&O traders lose money.

Meanwhile, Indian investors who stay locked into boring monthly SIPs (₹32,160+ Crore/month across India) quietly build ₹1 Crore+ portfolios without checking a single candlestick chart at 2 PM.

Protect your peace of mind and your career focus.

DM me on WhatsApp if you want to shift from random stock tips to a calm, structured SIP plan.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 33,
        status: "ready",
        fileUrl: "/growvell_content/day06_tweet_dark.png",
        fileName: "day06_tweet_dark.png",
        previewImageUrl: "/growvell_content/day06_tweet_dark.png",
        caption: `I have guided 450+ families over 10+ years, and I have never met a salaried professional who built lasting ₹5 Cr+ wealth through intraday options.

Every single real wealth story was built through boring, automated compounding.

DM me on WhatsApp if you are ready to build calm long-term wealth.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (Trading vs SIPs)",
        approvedPostId: 33,
        status: "ready",
        fileUrl: "/growvell_content/day06_xy_trading_vs_sip.png",
        fileName: "day06_xy_trading_vs_sip.png",
        previewImageUrl: "/growvell_content/day06_xy_trading_vs_sip.png",
        caption: `I saw a client lose ₹6.5L on F&O before switching to boring monthly SIPs.

9/10 F&O traders lose money. Disciplined SIP families sleep well and compound steadily.

DM me on WhatsApp to build your core SIP strategy.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 33,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I always tell young earners: if your "investing" requires 4 hours of screen time a day, it is not investing. It is a second stressful job.

Lock in automated SIPs and focus on your main income.

DM me on WhatsApp if you want a clean SIP plan.`,
        updatedAt: TS,
      },
    ],
  },

  7: {
    day: 7,
    title: "Day 7: 15-Min Paperless NRI KYC (#7)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (6-Slide NRI KYC Carousel PDF)",
        approvedPostId: 7,
        status: "ready",
        fileUrl: "/growvell_content/day07_carousel_nri_kyc.pdf",
        fileName: "day07_carousel_nri_kyc.pdf",
        previewImageUrl: "/growvell_content/day07_carousel_nri_kyc_cover.png",
        caption: `I get the same message from NRIs in Dubai, Singapore, and London every single week:

"Dhanesh, I want to start investing in Indian mutual funds, but I will only come home on vacation in August."

They think NRI KYC still requires embassy stamps, physical couriers, and 3 bank branch visits.

That process is dead. Today, I get NRI clients onboarded cleanly in 15 minutes via video KYC using just 4 digital scans: PAN, Passport, Visa/Emirates ID, and NRE bank proof.

Swipe through all 6 slides to see the exact setup.

DM me on WhatsApp with "NRIKYC" if you want to start from abroad this week.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 7,
        status: "ready",
        fileUrl: "/growvell_content/day07_tweet_dark.png",
        fileName: "day07_tweet_dark.png",
        previewImageUrl: "/growvell_content/day07_tweet_dark.png",
        caption: `I onboarded an engineer in Abu Dhabi last Tuesday in 14 minutes flat over a video call.

Zero embassy visits. Zero couriered paperwork.

Stop waiting for your next annual flight to India to start compounding.

DM me on WhatsApp to get your paperless NRI KYC done.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (NRI Paperless KYC)",
        approvedPostId: 7,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I keep reminding NRIs in UAE, Singapore, and UK:

You do not need to fly to India or visit an embassy to start mutual fund SIPs.

PAN + Passport + Visa/Emirates ID + 2-minute Video KYC gets you live from your phone.

DM me on WhatsApp to start NRI onboarding.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 7,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I watched an NRI lose 3 years of compounding waiting for his "next trip home" to fix KYC paperwork.

Paperless Video KYC takes 15 minutes from Dubai or London.

DM me on WhatsApp if you want us to handle your NRI KYC setup.`,
        updatedAt: TS,
      },
    ],
  },

  8: {
    day: 8,
    title: "Day 8: Idle ₹10L Savings vs 3-Tier STP (#4)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (Before vs After)",
        approvedPostId: 4,
        status: "ready",
        fileUrl: "/growvell_content/day08_ba_idle_cash_vs_stp.png",
        fileName: "day08_ba_idle_cash_vs_stp.png",
        previewImageUrl: "/growvell_content/day08_ba_idle_cash_vs_stp.png",
        caption: `I met an NRI executive last month who had ₹12 Lakhs sitting idle in a 3% savings account for 18 months.

Why? Because he kept waiting for "one big market crash" before investing.

Waiting endlessly for the bottom is one of the biggest silent wealth leaks I see. Instead of dumping a lump sum all at once, I split idle cash into 3 clean tiers:

1. 3 months expenses in a liquid buffer.
2. 6 months reserve in Arbitrage Funds.
3. The rest deployed systematically into equity via a 12-month STP.

DM me on WhatsApp if you have idle lump-sum cash sitting in your bank account right now.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 4,
        status: "ready",
        fileUrl: "/growvell_content/day08_tweet_dark.png",
        fileName: "day08_tweet_dark.png",
        previewImageUrl: "/growvell_content/day08_tweet_dark.png",
        caption: `I see so many smart professionals lose 2 full years of returns waiting for a "perfect entry point" with ₹10L+ in cash.

A 12-month Systematic Transfer Plan (STP) removes timing stress completely.

DM me on WhatsApp if you want a custom STP deployment plan for your idle cash.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (3-Tier Cash Deployment)",
        approvedPostId: 4,
        status: "ready",
        fileUrl: "/growvell_content/day08_ba_idle_cash_vs_stp.png",
        fileName: "day08_ba_idle_cash_vs_stp.png",
        previewImageUrl: "/growvell_content/day08_ba_idle_cash_vs_stp.png",
        caption: `I never tell clients to dump ₹10L+ into equity all in one day, or leave it rotting in a 3% savings account.

Split it into: Liquid buffer + Arbitrage reserve + 12-month equity STP.

DM me on WhatsApp for your STP deployment sheet.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 4,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I watched ₹12L sit in a 3% savings account for 2 years while the investor waited for a "crash."

Waiting for the perfect day is cooked. Use a 12-month STP and move forward.

DM me on WhatsApp to deploy idle cash cleanly.`,
        updatedAt: TS,
      },
    ],
  },

  9: {
    day: 9,
    title: "Day 9: NRE Account vs NRO Account (#53)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (X vs Y Comparison)",
        approvedPostId: 53,
        status: "ready",
        fileUrl: "/growvell_content/day09_xy_nre_vs_nro.png",
        fileName: "day09_xy_nre_vs_nro.png",
        previewImageUrl: "/growvell_content/day09_xy_nre_vs_nro.png",
        caption: `I spotted a costly mistake on an NRI client's bank setup last Friday.

He had been transferring his Dubai salary straight into his old Indian NRO account instead of an NRE account for 3 years.

Result? A flat 30% TDS cut on interest, plus strict $1M/year CA paperwork restrictions whenever he wanted to move funds back abroad.

NRE is built for foreign income (tax-free interest + freely repatriable). NRO is only for Indian rent, dividends, or pensions.

DM me on WhatsApp if you want us to verify your NRE/NRO mutual fund mapping before your next transfer.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 53,
        status: "ready",
        fileUrl: "/growvell_content/day09_tweet_dark.png",
        fileName: "day09_tweet_dark.png",
        previewImageUrl: "/growvell_content/day09_tweet_dark.png",
        caption: `I see NRIs accidentally route foreign savings through NRO accounts every month and eat an unnecessary 30% TDS hit.

Always map overseas earnings to NRE so your capital stays cleanly repatriable.

DM me on WhatsApp if you need help setting up your NRE SIP route.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (NRE vs NRO Breakdown)",
        approvedPostId: 53,
        status: "ready",
        fileUrl: "/growvell_content/day09_xy_nre_vs_nro.png",
        fileName: "day09_xy_nre_vs_nro.png",
        previewImageUrl: "/growvell_content/day09_xy_nre_vs_nro.png",
        caption: `I fixed an NRI's NRO routing mistake last week that was triggering 30% TDS on his Gulf savings.

Foreign income -> NRE (tax-free interest, freely repatriable).
Indian rent/income -> NRO.

DM me on WhatsApp to audit your NRI account setup.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 53,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I tell every new NRI client one simple rule on Day 1:

Never mix your Dubai/Singapore salary into an NRO account. Keep it clean in NRE.

DM me on WhatsApp if you want our NRI banking & SIP checklist.`,
        updatedAt: TS,
      },
    ],
  },

  10: {
    day: 10,
    title: "Day 10: 5-Second Bank RM ULIP Audit (#2)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (5-Slide ULIP Filter Carousel PDF)",
        approvedPostId: 2,
        status: "ready",
        fileUrl: "/growvell_content/day10_carousel_ulip_audit.pdf",
        fileName: "day10_carousel_ulip_audit.pdf",
        previewImageUrl: "/growvell_content/day10_carousel_ulip_audit_cover.png",
        caption: `I had a client forward me a "high-return mutual fund plan" his bank relationship manager asked him to sign urgently before month-end.

I opened the PDF, hit Ctrl+F, and spotted two red flags in 5 seconds:
"Mortality Charges" and a "5-Year Lock-In."

It was not a mutual fund. It was a high-commission ULIP disguised as one.

Real mutual funds have zero mortality deductions and daily NAV transparency.

Swipe through these 5 slides before you ever sign a bank branch investment form.

DM me on WhatsApp if you want me to audit a policy your bank RM pitched you.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 2,
        status: "ready",
        fileUrl: "/growvell_content/day10_tweet_dark.png",
        fileName: "day10_tweet_dark.png",
        previewImageUrl: "/growvell_content/day10_tweet_dark.png",
        caption: `I have audited dozens of "guaranteed tax-free wealth plans" sold at bank branches.

Almost every time, high allocation charges and insurance deductions quietly eat the investor's first 3 years of returns.

Always keep insurance and investments strictly separate.

DM me on WhatsApp if you want a quick policy check.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (5-Second Policy Audit)",
        approvedPostId: 2,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I checked a client's "bank mutual fund" PDF last week.

Two red flags jumped off Page 1: "Mortality Charges" + "5-year lock-in."

Never mix term insurance and equity investing inside one bank ULIP.

DM me on WhatsApp to audit your bank policy.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 2,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I give every client a 5-second filter for bank RMs:

"Does this plan have mortality charges or a 5-year lock-in?"

If yes, walk out.

DM me on WhatsApp if you want us to review an existing policy.`,
        updatedAt: TS,
      },
    ],
  },

  11: {
    day: 11,
    title: "Day 11: 25th Leftovers vs 5th AutoPay (#3)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (Before vs After)",
        approvedPostId: 3,
        status: "ready",
        fileUrl: "/growvell_content/day11_ba_willpower_vs_autopay.png",
        fileName: "day11_ba_willpower_vs_autopay.png",
        previewImageUrl: "/growvell_content/day11_ba_willpower_vs_autopay.png",
        caption: `I used to see smart professionals promise themselves every January: "This year I'll manually transfer ₹25,000 at the end of each month."

By April, a car repair, wedding gift, or weekend trip eats the surplus.

When I switch clients from manual end-of-month saving to a locked-in 5th-of-month e-NACH AutoPay, their savings rate jumps immediately without feeling restricted.

Automation beats discipline when life gets busy.

DM me on WhatsApp if you want help setting up a clean automated SIP schedule.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 3,
        status: "ready",
        fileUrl: "/growvell_content/day11_tweet_dark.png",
        fileName: "day11_tweet_dark.png",
        previewImageUrl: "/growvell_content/day11_tweet_dark.png",
        caption: `I stopped believing in "I will invest whatever is left at month-end" years ago.

Lifestyle creep always expands to fill whatever balance sits in your salary account.

Automate the 5th first.

DM me on WhatsApp to build your automated wealth system.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (AutoPay vs Willpower)",
        approvedPostId: 3,
        status: "ready",
        fileUrl: "/growvell_content/day11_ba_willpower_vs_autopay.png",
        fileName: "day11_ba_willpower_vs_autopay.png",
        previewImageUrl: "/growvell_content/day11_ba_willpower_vs_autopay.png",
        caption: `I switched a client from manual 25th-of-month transfers to an automated 5th-of-month SIP mandate.

His annual wealth contribution doubled in 12 months with zero extra willpower.

DM me on WhatsApp to automate your monthly SIPs.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 3,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I see high earners save ₹0 simply because their SIP isn't automated.

Salary hits on the 1st -> SIP debits on the 5th -> Spend the rest guilt-free.

DM me on WhatsApp if you want help setting up e-NACH AutoPay.`,
        updatedAt: TS,
      },
    ],
  },

  12: {
    day: 12,
    title: "Day 12: NRI TDS & DTAA Tax Clarity (#8)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (5-Slide NRI TDS Carousel PDF)",
        approvedPostId: 8,
        status: "ready",
        fileUrl: "/growvell_content/day12_carousel_nri_tds.pdf",
        fileName: "day12_carousel_nri_tds.pdf",
        previewImageUrl: "/growvell_content/day12_carousel_nri_tds_cover.png",
        caption: `I spoke with a senior physician in Sharjah who avoided Indian equity mutual funds for 5 years out of pure tax confusion.

He heard "NRIs get hit with heavy TDS" and assumed he would lose half his gains.

Here is what I walked him through: Yes, Indian AMCs deduct TDS upon redemption (20% STCG, 12.5% LTCG above ₹1.25L), but India has DTAA treaties with 80+ countries including UAE, Singapore, US, and UK.

Even post-tax, diversified Indian equity funds have historically outpaced 6.5% NRE FDs comfortably over 10 years.

Swipe through these 5 slides for the clear breakdown.

DM me on WhatsApp if you want to plan your NRI portfolio with full tax clarity.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 8,
        status: "ready",
        fileUrl: "/growvell_content/day12_tweet_dark.png",
        fileName: "day12_tweet_dark.png",
        previewImageUrl: "/growvell_content/day12_tweet_dark.png",
        caption: `I hate seeing NRIs leave lakhs on the table because nobody explained TDS and DTAA cleanly.

Do not let 12.5% long-term capital gains tax scare you into earning 6.5% in a bank deposit forever.

DM me on WhatsApp if you want a clear NRI tax & mutual fund walkthrough.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (NRI TDS & DTAA)",
        approvedPostId: 8,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I had an NRI in Sharjah ask if Indian mutual fund TDS ruins returns.

Short answer: No. LTCG is 12.5% above ₹1.25L, and DTAA treaties protect you from double taxation.

Never let tax myths keep your capital in low-yield FDs.

DM me on WhatsApp for NRI tax-aware investing.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 8,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I remind every UAE, US, and Singapore NRI:

TDS on mutual fund redemptions is not an extra penalty, it is just tax deducted at source, and DTAA lets you claim credit cleanly.

DM me on WhatsApp if you want help structuring NRI SIPs.`,
        updatedAt: TS,
      },
    ],
  },

  13: {
    day: 13,
    title: "Day 13: 20% Hype Chasing vs 13% Discipline (#55)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (X vs Y Comparison)",
        approvedPostId: 55,
        status: "ready",
        fileUrl: "/growvell_content/day13_xy_hype_vs_discipline.png",
        fileName: "day13_xy_hype_vs_discipline.png",
        previewImageUrl: "/growvell_content/day13_xy_hype_vs_discipline.png",
        caption: `I watched an investor jump out of a solid Flexi Cap fund into last year's #1 thematic sector fund because it showed 48% trailing returns.

Six months later, that sector cooled off by 22%, and he sold at a loss.

Chasing last year's winner is how retail portfolios get quietly cooked. Across the 450+ families I work with, boring 12% to 13% core discipline beats flashy 20% hype every single decade.

DM me on WhatsApp if you want to check whether your current funds are built on core discipline or recent hype.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 55,
        status: "ready",
        fileUrl: "/growvell_content/day13_tweet_dark.png",
        fileName: "day13_tweet_dark.png",
        previewImageUrl: "/growvell_content/day13_tweet_dark.png",
        caption: `I never pick mutual funds based on who topped the 1-year leaderboard.

Last year's hottest sector is usually next year's biggest drawdown.

Stay locked into diversified core allocation.

DM me on WhatsApp if you want a calm portfolio review.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (Hype vs Discipline)",
        approvedPostId: 55,
        status: "ready",
        fileUrl: "/growvell_content/day13_xy_hype_vs_discipline.png",
        fileName: "day13_xy_hype_vs_discipline.png",
        previewImageUrl: "/growvell_content/day13_xy_hype_vs_discipline.png",
        caption: `I saw a client chase a 48% sector fund at the peak and panic-sell at -22%.

Boring 13% core compounding beats 20% hype chasing over every 10-year cycle.

DM me on WhatsApp to audit your fund mix.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 55,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I tell every client: wealth management is supposed to feel slightly boring.

If your mutual funds feel like an adrenaline rush, something is wrong with your allocation.

DM me on WhatsApp for a balanced core portfolio check.`,
        updatedAt: TS,
      },
    ],
  },

  14: {
    day: 14,
    title: "Day 14: Market Volatility & SIP Discipline (#83)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (5-Slide Volatility Carousel PDF)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "/growvell_content/day14_carousel_volatility_sip.pdf",
        fileName: "day14_carousel_volatility_sip.pdf",
        previewImageUrl: "/growvell_content/day14_carousel_volatility_sip_cover.png",
        caption: `I have guided 450+ families across India and the Gulf through sharp market swings over the last 10+ years.

And I can tell you the #1 reason people miss their ₹1 Crore goal has nothing to do with picking the wrong fund.

It is checking their portfolio app every 2 hours during a red week, panicking, and pausing their SIP right when units go on sale.

Every red week simply means your same monthly ₹15,000 buys more mutual fund units at lower prices.

Swipe through these 5 slides before the next market headline hits your feed.

DM me on WhatsApp if you want a calm, goal-linked SIP plan you never have to stress over.`,
        updatedAt: TS,
      },
      {
        label: "LinkedIn Post 2 (Dark Tweet Card)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "/growvell_content/day14_tweet_dark.png",
        fileName: "day14_tweet_dark.png",
        previewImageUrl: "/growvell_content/day14_tweet_dark.png",
        caption: `I get the same panicked call every time Nifty drops 4% in a week: "Dhanesh, should I pause my SIP?"

My answer never changes: No. Red weeks are when your SIP buys extra units on sale.

DM me on WhatsApp if you want to lock in a stress-free long-term plan.`,
        updatedAt: TS,
      },
    ],
    twitter: [
      {
        label: "X Post 1 (Volatility Reassurance)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I have watched 450+ families build wealth through red and green markets.

The winners never paused their SIPs during a 5% correction. They bought more units automatically while others panicked.

DM me on WhatsApp to build your long-term SIP strategy.`,
        updatedAt: TS,
      },
      {
        label: "X Post 2 (Plain Text)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I tell every client during a red market week:

Delete the daily tracker app. Keep your 5th-of-month SIP running. Let compounding lock in.

DM me on WhatsApp if you want a calm portfolio review.`,
        updatedAt: TS,
      },
    ],
  },
};

function mergeSlot(baseSlot: ContentSlot, incoming?: Partial<ContentSlot>): ContentSlot {
  if (!incoming) return baseSlot;
  const incomingHasData =
    incoming.status === "ready" || Boolean(incoming.caption?.trim()) || Boolean(incoming.fileUrl?.trim());
  if (!incomingHasData && baseSlot.status === "ready") {
    return baseSlot;
  }
  return { ...baseSlot, ...incoming };
}

export function mergeDayState(raw?: any): GrowvellDayContentState {
  const mergedDays: Record<number, DayDeliveryRecord> = {};
  for (let d = 1; d <= 14; d++) {
    mergedDays[d] = DEFAULT_SEEDED_DAYS[d] || createEmptyDay(d);
  }

  if (raw && raw.version === 3 && raw.days) {
    for (const [k, v] of Object.entries(raw.days as Record<string, DayDeliveryRecord>)) {
      const d = Number(k);
      const base = mergedDays[d] || createEmptyDay(d);
      const useBaseTitle =
        base.linkedin[0].status === "ready" && (!v.title || v.title.includes("Next Approved") || v.title.includes("Content Drop"));

      mergedDays[d] = {
        day: d,
        title: useBaseTitle ? base.title : v.title || base.title,
        linkedin: [
          mergeSlot(base.linkedin[0], v.linkedin?.[0]),
          mergeSlot(base.linkedin[1], v.linkedin?.[1]),
        ],
        twitter: [
          mergeSlot(base.twitter[0], v.twitter?.[0]),
          mergeSlot(base.twitter[1], v.twitter?.[1]),
        ],
      };
    }
  }

  return {
    version: 3,
    days: mergedDays,
    suggestions: Array.isArray(raw?.suggestions) ? raw.suggestions : [],
    lastUpdated: raw?.lastUpdated || new Date().toISOString(),
    updatedBy: raw?.updatedBy || "Growvell Studio",
  };
}
