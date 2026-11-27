export interface ContentSlot {
  label: string; // e.g., "Carousel PDF", "Twitter-Style Card", "Text + Graphic"
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
  version: 2;
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
      createEmptySlot("LinkedIn Post 1 (Carousel)"),
      createEmptySlot("LinkedIn Post 2 (Twitter-Style Card)"),
    ],
    twitter: [
      createEmptySlot("X Post 1"),
      createEmptySlot("X Post 2"),
    ],
  };
}

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
        caption: `Save this 5-slide checklist before your salary hits your bank account this week.

If you wait until the 25th of the month to decide how much to invest, lifestyle expenses will always win.

Flip the sequence before paying rent, EMIs, or weekend plans:
1. Lock 25% to 30% of your take-home pay toward your wealth target first.
2. Automate your mutual fund SIP auto-debit for 3 days after payday (e.g. the 5th).
3. Spend everything left in your account completely guilt-free.

DM "SALARY" if you want our simple monthly allocation framework.`,
        updatedAt: "2026-11-27T15:00:00.000Z",
      },
      {
        label: "LinkedIn Post 2 (Twitter-Style Card)",
        approvedPostId: 81,
        status: "ready",
        fileUrl: "/growvell_content/01_tweet_light_salary_checklist_post81.png",
        fileName: "01_tweet_light_salary_checklist_post81.png",
        previewImageUrl: "/growvell_content/01_tweet_light_salary_checklist_post81.png",
        caption: `Most professionals pay rent, EMIs, and weekend bills first... and invest "whatever is left."

Salary hitting your account this week? Use this 3-step rule:
1. Set aside 25% to 30% for investing first.
2. Run your Mutual Fund SIP 3 days after payday.
3. Spend the rest completely guilt-free.

Pay your future self first.`,
        updatedAt: "2026-11-27T15:00:00.000Z",
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
        caption: `Salary hitting your bank account this week?

Do these 3 things before weekend bills start:

1. Move 25% to 30% into investments first.
2. Set your Mutual Fund SIP for 3 days after payday.
3. Spend the rest guilt-free.

Pay your future self first.`,
        updatedAt: "2026-11-27T15:00:00.000Z",
      },
      {
        label: "X Post 2 (SIP Volatility)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "/growvell_content/02_tweet_dark_sip_volatility_post83.png",
        fileName: "02_tweet_dark_sip_volatility_post83.png",
        previewImageUrl: "/growvell_content/02_tweet_dark_sip_volatility_post83.png",
        caption: `Markets may swing sharply this week.

Do NOT pause or touch your SIPs.

Every red week simply means your same monthly rupee amount buys MORE mutual fund units at lower prices.

Stop refreshing the app daily. Let compounding work.`,
        updatedAt: "2026-11-27T15:00:00.000Z",
      },
    ],
  },
  2: {
    day: 2,
    title: "Day 2: Market Calm & Sunday Nominee Check (#83 & #84)",
    linkedin: [
      {
        label: "LinkedIn Post 1 (8-Slide Nominee Carousel PDF)",
        approvedPostId: 84,
        status: "ready",
        fileUrl: "/growvell_content/Growvell_Carousel_02_Nominee_Fix_Post84.pdf",
        fileName: "Growvell_Carousel_02_Nominee_Fix_Post84.pdf",
        previewImageUrl: "/growvell_content/carousel_02_cover.png",
        caption: `You work hard all year to build your mutual fund portfolio.

Yet one blank line in your account records can lock that money away from your family when they need it most.

Take 15 minutes this Sunday to run through these 5 steps on MFCentral.com and make sure every single folio (including old ELSS funds) has a registered nominee.

Need help cleaning up older folios or sorting missing details? DM "NOMINEE" and we will guide you through it step by step.`,
        updatedAt: "2026-11-27T15:00:00.000Z",
      },
      {
        label: "LinkedIn Post 2 (4-Slide Volatility Carousel PDF)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "/growvell_content/Growvell_Carousel_03_SIP_Volatility_Post83.pdf",
        fileName: "Growvell_Carousel_03_SIP_Volatility_Post83.pdf",
        previewImageUrl: "/growvell_content/carousel_03_cover.png",
        caption: `Save this before the next red market headline hits your feed.

Pausing your SIP during volatility feels "safe" in the short term, and quietly breaks your long-term compounding math.

When the market dips 5% or 10%, your fixed monthly SIP buys MORE mutual fund units at lower prices. Those discounted units accelerate your returns when the cycle rebounds.

DM "STAY" for our calm-market investing guide.`,
        updatedAt: "2026-11-27T15:00:00.000Z",
      },
    ],
    twitter: [
      createEmptySlot("X Post 1 (Sunday Nominee Thread)"),
      createEmptySlot("X Post 2 (Market Dip Reminder)"),
    ],
  },
  3: createEmptyDay(3, "Day 3: Next Approved Batch"),
};

export function mergeDayState(raw?: any): GrowvellDayContentState {
  const mergedDays: Record<number, DayDeliveryRecord> = {};
  for (const [k, v] of Object.entries(DEFAULT_SEEDED_DAYS)) {
    mergedDays[Number(k)] = v;
  }

  if (raw && raw.version === 2 && raw.days) {
    for (const [k, v] of Object.entries(raw.days as Record<string, DayDeliveryRecord>)) {
      const d = Number(k);
      const base = mergedDays[d] || createEmptyDay(d);
      mergedDays[d] = {
        day: d,
        title: v.title || base.title,
        linkedin: [
          { ...createEmptySlot("LinkedIn Post 1"), ...(base.linkedin?.[0] || {}), ...(v.linkedin?.[0] || {}) },
          { ...createEmptySlot("LinkedIn Post 2"), ...(base.linkedin?.[1] || {}), ...(v.linkedin?.[1] || {}) },
        ],
        twitter: [
          { ...createEmptySlot("X Post 1"), ...(base.twitter?.[0] || {}), ...(v.twitter?.[0] || {}) },
          { ...createEmptySlot("X Post 2"), ...(base.twitter?.[1] || {}), ...(v.twitter?.[1] || {}) },
        ],
      };
    }
  }

  return {
    version: 2,
    days: mergedDays,
    suggestions: Array.isArray(raw?.suggestions) ? raw.suggestions : [],
    lastUpdated: raw?.lastUpdated || new Date().toISOString(),
    updatedBy: raw?.updatedBy || "Growvell Studio",
  };
}
