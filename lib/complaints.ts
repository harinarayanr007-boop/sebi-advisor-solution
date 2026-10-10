// SEBI Statutory Complaint Disclosure Engine
// Circular Reference: SEBI/HO/IMD/IMD-II CIS/P/CIR/2021/0686
// Mandate: Data for the preceding month must be updated by the 7th of succeeding month.

export interface MonthlyComplaintSummary {
  reportingMonth: string;      // e.g. "September 2026"
  asOnDate: string;            // e.g. "1st October 2026"
  beginningOfMonth: number;
  receivedDuringMonth: number;
  resolvedDuringMonth: number;
  pendingAtEndOfMonth: number;
  reasonForPendency: string;
}

export interface ComplaintSourceRow {
  sr: number;
  source: string;
  pendingLastMonth: number;
  received: number;
  resolved: number;
  totalPending: number;
  pendingOver3m: number;
  avgTimeDays: string;
}

export interface TrendMonthRow {
  month: string;
  carriedForward: number;
  received: number;
  resolved: number;
  pending: number;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Returns dynamic complaint status data according to SEBI's 7th-day rule.
 * On or after the 7th of any month, the status rolls forward to report the previous calendar month.
 * Before the 7th, it holds the period before that.
 */
export function getAutomatedComplaintsData(referenceDate: Date = new Date()): {
  summary: MonthlyComplaintSummary;
  sources: ComplaintSourceRow[];
  monthlyTrend: TrendMonthRow[];
  annualTrend: { year: string; carriedForward: number; received: number; resolved: number; pending: number }[];
} {
  const currentDay = referenceDate.getDate();
  const currentMonthIdx = referenceDate.getMonth();
  const currentYear = referenceDate.getFullYear();

  // If today is on or after the 7th, we report on previous month (monthOffset = 1)
  // If today is before the 7th, report is for 2 months ago (monthOffset = 2)
  const monthOffset = currentDay >= 7 ? 1 : 2;

  // Calculate target reporting month
  const targetDate = new Date(currentYear, currentMonthIdx - monthOffset, 1);
  const reportingMonthName = MONTH_NAMES[targetDate.getMonth()];
  const reportingYear = targetDate.getFullYear();

  // "As on" date is the 1st of the succeeding month
  const asOnTarget = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 1);
  const asOnMonthName = MONTH_NAMES[asOnTarget.getMonth()];
  const asOnYear = asOnTarget.getFullYear();

  const summary: MonthlyComplaintSummary = {
    reportingMonth: `${reportingMonthName} ${reportingYear}`,
    asOnDate: `1st ${asOnMonthName} ${asOnYear}`,
    beginningOfMonth: 0,
    receivedDuringMonth: 0,
    resolvedDuringMonth: 0,
    pendingAtEndOfMonth: 0,
    reasonForPendency: "N/A - Zero complaints received or pending",
  };

  const sources: ComplaintSourceRow[] = [
    { sr: 1, source: "Directly from Investors", pendingLastMonth: 0, received: 0, resolved: 0, totalPending: 0, pendingOver3m: 0, avgTimeDays: "N/A" },
    { sr: 2, source: "SEBI (SCORES)", pendingLastMonth: 0, received: 0, resolved: 0, totalPending: 0, pendingOver3m: 0, avgTimeDays: "N/A" },
    { sr: 3, source: "SMART ODR Portal", pendingLastMonth: 0, received: 0, resolved: 0, totalPending: 0, pendingOver3m: 0, avgTimeDays: "N/A" },
    { sr: 4, source: "Other Sources", pendingLastMonth: 0, received: 0, resolved: 0, totalPending: 0, pendingOver3m: 0, avgTimeDays: "N/A" },
  ];

  // Dynamically compute trailing 6 months for monthly trend
  const monthlyTrend: TrendMonthRow[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(targetDate.getFullYear(), targetDate.getMonth() - i, 1);
    monthlyTrend.push({
      month: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
      carriedForward: 0,
      received: 0,
      resolved: 0,
      pending: 0,
    });
  }

  // Trailing 3 financial years
  const currentFYStart = currentMonthIdx >= 3 ? currentYear : currentYear - 1;
  const annualTrend = [
    { year: `${currentFYStart - 2}-${currentFYStart - 1}`, carriedForward: 0, received: 0, resolved: 0, pending: 0 },
    { year: `${currentFYStart - 1}-${currentFYStart}`, carriedForward: 0, received: 0, resolved: 0, pending: 0 },
    { year: `${currentFYStart}-${currentFYStart + 1}`, carriedForward: 0, received: 0, resolved: 0, pending: 0 },
  ];

  return { summary, sources, monthlyTrend, annualTrend };
}
