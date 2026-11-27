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
        caption: `I audited 14 salaried portfolios last month.

11 of them earned over ₹1.5L/month. Yet 9 of them had less than ₹3 Lakhs saved after 4 years of working.

Not because they were careless. Because they followed the same broken order every single month:

Salary hits -> Rent & EMIs -> Weekend spends -> "I'll invest whatever is left on the 25th."

Spoiler: On the 25th, nothing is left.

Indian investors now pour ₹32,160+ Crore into SIPs every single month (AMFI, Oct 2026) because they fixed one thing: the order.

I built a 5-slide Salary Day checklist we use with 450+ families so your ₹1 Crore goal runs automatically before weekend spending even starts.

Swipe through the 5 slides above.

DM "SALARY" if you want our exact monthly allocation sheet.`,
        updatedAt: "2026-11-27T15:54:00.000Z",
      },
      {
        label: "LinkedIn Post 2 (Twitter-Style Card)",
        approvedPostId: 81,
        status: "ready",
        fileUrl: "/growvell_content/01_tweet_light_salary_checklist_post81.png",
        fileName: "01_tweet_light_salary_checklist_post81.png",
        previewImageUrl: "/growvell_content/01_tweet_light_salary_checklist_post81.png",
        caption: `I stopped asking clients "How much can you save this month?" 6 years ago.

Because willpower always loses to EMIs, Swiggy, and weekend plans.

Instead, I move their SIP auto-debit to 3 days after salary day (the 5th of every month) and lock 25% to 30% first.

Once that debit clears, I tell them: spend every rupee left in your salary account completely guilt-free.

Pay your future self first. Let the rest take care of itself.`,
        updatedAt: "2026-11-27T15:54:00.000Z",
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

The ones who hit ₹1 Cr didn't earn more. They just automated their SIP 3 days after salary day and spent the rest guilt-free.

If you wait until the 25th to invest "what's left," it's always ₹0.`,
        updatedAt: "2026-11-27T15:54:00.000Z",
      },
      {
        label: "X Post 2 (SIP Volatility)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I get the same panicked call every time the market drops 4% in a week:

"Dhanesh, should I pause my SIP until things settle?"

No. Every red week simply means your same ₹15,000 buys MORE mutual fund units at a discount.

Close the app. Let compounding work.`,
        updatedAt: "2026-11-27T15:54:00.000Z",
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
        caption: `I watched a family wait 7 months to access ₹28 Lakhs in mutual funds.

Not because the market crashed. Not because of a tax dispute.

Because one single line in their account records was blank: the Nominee.

When you invest for 10+ years, you assume your spouse or children can just log in and withdraw if anything happens. They cannot. Without a registered nominee, Indian AMCs freeze online redemptions and ask for succession certificates and court affidavits.

I put together the exact 5-step Sunday checklist on MFCentral.com (CAMS + KFintech) so you can verify every single folio, including old ELSS funds, in under 15 minutes.

Swipe through all 8 slides.

DM "NOMINEE" if you want us to audit your older folios.`,
        updatedAt: "2026-11-27T15:54:00.000Z",
      },
      {
        label: "LinkedIn Post 2 (4-Slide Volatility Carousel PDF)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "/growvell_content/Growvell_Carousel_03_SIP_Volatility_Post83.pdf",
        fileName: "Growvell_Carousel_03_SIP_Volatility_Post83.pdf",
        previewImageUrl: "/growvell_content/carousel_03_cover.png",
        caption: `I have guided 450+ families across India and the Gulf through multiple market corrections.

And I can tell you the #1 reason people miss their ₹1 Crore goal has nothing to do with picking the "wrong fund."

It is checking their portfolio app every 2 hours during a red week, panicking, and pausing their SIP right when units go on sale.

Meanwhile, over ₹3.35 Lakh Crore sits in Kerala NRI bank accounts alone (SLBC 2026) losing purchasing power to inflation because people fear short-term volatility.

Swipe through these 4 slides before the next market headline hits your feed.

DM "STAY" for our calm-market investing checklist.`,
        updatedAt: "2026-11-27T15:54:00.000Z",
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
        caption: `I saw a family wait months for court succession papers just to unlock ₹28L in mutual funds.

All because the Nominee field was blank.

This Sunday, spend 10 minutes on MFCentral.com, enter your PAN + OTP, and verify every folio (especially old ELSS funds).`,
        updatedAt: "2026-11-27T15:54:00.000Z",
      },
      {
        label: "X Post 2 (Bank RM ULIP Filter)",
        approvedPostId: 83,
        status: "ready",
        fileUrl: "",
        fileName: "",
        previewImageUrl: "",
        caption: `I tell every client one line to use when a bank RM calls pitching an "exclusive wealth plan":

"Does this have a 5-year lock-in or mortality charges?"

If yes, it's a ULIP disguised as a mutual fund. Hang up politely.`,
        updatedAt: "2026-11-27T15:54:00.000Z",
      },
    ],
  },
  3: createEmptyDay(3, "Day 3: Next Approved Batch"),
};

export function mergeDayState(raw?: any): GrowvellDayContentState {
  const mergedDays: Record<number, DayDeliveryRecord> = {};
  for (let d = 1; d <= 14; d++) {
    mergedDays[d] = DEFAULT_SEEDED_DAYS[d] || createEmptyDay(d);
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
