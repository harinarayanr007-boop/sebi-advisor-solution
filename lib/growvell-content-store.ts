export interface PlatformAsset {
  status: "in_progress" | "ready";
  caption: string;
  fileUrl: string;
  fileName: string;
  previewImageUrl?: string;
  updatedAt?: string;
}

export interface ClientSuggestion {
  id: string;
  postId: number;
  platform: "linkedin" | "twitter" | "general";
  text: string;
  author: string;
  createdAt: string;
}

export interface PostDeliveryRecord {
  postId: number;
  customTitle?: string;
  linkedin: PlatformAsset;
  twitter: PlatformAsset;
}

export interface GrowvellContentState {
  posts: Record<number, PostDeliveryRecord>;
  suggestions: ClientSuggestion[];
  lastUpdated: string;
  updatedBy: string;
}

export function createEmptyPlatformAsset(): PlatformAsset {
  return {
    status: "in_progress",
    caption: "",
    fileUrl: "",
    fileName: "",
    previewImageUrl: "",
  };
}

export const DEFAULT_SEEDED_POSTS: Record<number, PostDeliveryRecord> = {
  81: {
    postId: 81,
    linkedin: {
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
      updatedAt: "2026-11-26T22:33:00.000Z",
    },
    twitter: {
      status: "ready",
      fileUrl: "/growvell_content/01_tweet_light_salary_checklist_post81.png",
      fileName: "01_tweet_light_salary_checklist_post81.png",
      previewImageUrl: "/growvell_content/01_tweet_light_salary_checklist_post81.png",
      caption: `Salary hitting your bank account this week?

Do these 3 things before weekend bills start:

1. Set aside 25% to 30% for investing first.
2. Run your Mutual Fund SIP 3 days after payday.
3. Spend the rest completely guilt-free.

Pay your future self first.`,
      updatedAt: "2026-11-26T22:33:00.000Z",
    },
  },
  83: {
    postId: 83,
    linkedin: {
      status: "ready",
      fileUrl: "/growvell_content/Growvell_Carousel_03_SIP_Volatility_Post83.pdf",
      fileName: "Growvell_Carousel_03_SIP_Volatility_Post83.pdf",
      previewImageUrl: "/growvell_content/carousel_03_cover.png",
      caption: `Save this before the next red market headline hits your feed.

Pausing your SIP during volatility feels "safe" in the short term, and quietly breaks your long-term compounding math.

When the market dips 5% or 10%, your fixed monthly SIP buys MORE mutual fund units at lower prices. Those discounted units accelerate your returns when the cycle rebounds.

Swipe through the 3 reminders that keep disciplined investors ahead over 10+ years.

DM "STAY" for our calm-market investing guide.`,
      updatedAt: "2026-11-26T22:33:00.000Z",
    },
    twitter: {
      status: "ready",
      fileUrl: "/growvell_content/02_tweet_dark_sip_volatility_post83.png",
      fileName: "02_tweet_dark_sip_volatility_post83.png",
      previewImageUrl: "/growvell_content/02_tweet_dark_sip_volatility_post83.png",
      caption: `Markets may swing sharply this week.

Do NOT pause or touch your SIPs.

Every red week simply means your same monthly rupee amount buys MORE mutual fund units at lower prices.

Stop refreshing the app daily. Let compounding work.`,
      updatedAt: "2026-11-26T22:33:00.000Z",
    },
  },
  84: {
    postId: 84,
    linkedin: {
      status: "ready",
      fileUrl: "/growvell_content/Growvell_Carousel_02_Nominee_Fix_Post84.pdf",
      fileName: "Growvell_Carousel_02_Nominee_Fix_Post84.pdf",
      previewImageUrl: "/growvell_content/carousel_02_cover.png",
      caption: `You work hard all year to build your mutual fund portfolio.

Yet one blank line in your account records can lock that money away from your family when they need it most.

Take 15 minutes this Sunday to run through these 5 steps on MFCentral.com and make sure every single folio (including old ELSS funds) has a registered nominee.

Need help cleaning up older folios or sorting missing details? DM "NOMINEE" and we will guide you through it step by step.`,
      updatedAt: "2026-11-26T22:33:00.000Z",
    },
    twitter: {
      status: "in_progress",
      fileUrl: "",
      fileName: "",
      previewImageUrl: "",
      caption: "",
    },
  },
};

export function mergeWithDefaults(state?: Partial<GrowvellContentState> | null): GrowvellContentState {
  const mergedPosts: Record<number, PostDeliveryRecord> = { ...DEFAULT_SEEDED_POSTS };
  if (state?.posts) {
    for (const [k, v] of Object.entries(state.posts)) {
      const id = Number(k);
      mergedPosts[id] = {
        postId: id,
        customTitle: v.customTitle,
        linkedin: { ...createEmptyPlatformAsset(), ...(mergedPosts[id]?.linkedin || {}), ...(v.linkedin || {}) },
        twitter: { ...createEmptyPlatformAsset(), ...(mergedPosts[id]?.twitter || {}), ...(v.twitter || {}) },
      };
    }
  }
  return {
    posts: mergedPosts,
    suggestions: Array.isArray(state?.suggestions) ? state!.suggestions : [],
    lastUpdated: state?.lastUpdated || new Date().toISOString(),
    updatedBy: state?.updatedBy || "Growvell Studio",
  };
}
