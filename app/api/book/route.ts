import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import dns from "dns";
import { Resend } from "resend";

// ─── LAYER 4: IN-MEMORY IP RATE LIMITER (3 submissions per 10 mins per IP) ───
const ipRequestMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequestMap.get(ip) || []).filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequestMap.set(ip, timestamps);
  return false;
}

// ─── LAYER 3: DISPOSABLE & TEMPORARY EMAIL DOMAINS ─────────────────────────────
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "yopmail.com",
  "trashmail.com",
  "throwawaymail.com",
  "getairmail.com",
  "dispostable.com",
  "temp-mail.org",
  "fakeinbox.com",
  "generator.email",
  "mytemp.email",
  "mohmal.com",
  "crazymailing.com",
  "burnermail.io",
]);

// ─── LAYER 2: REAL-TIME DNS MX RECORD CHECK ──────────────────────────────────
async function hasValidMxRecord(email: string): Promise<boolean> {
  const parts = email.trim().toLowerCase().split("@");
  if (parts.length !== 2) return false;
  const domain = parts[1];

  // Whitelist high-traffic domains immediately to avoid unnecessary DNS latency
  const knownValidDomains = new Set([
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "protonmail.com",
    "zoho.com",
    "aol.com",
  ]);
  if (knownValidDomains.has(domain)) return true;

  try {
    const records = await dns.promises.resolveMx(domain);
    return records && records.length > 0;
  } catch {
    return false;
  }
}

// ─── PHONE NUMBER VALIDATION ──────────────────────────────────────────────────
function isValidPhoneNumber(phone: string): boolean {
  // Strip spaces, dashes, dots, parentheses
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
  const digitsOnly = cleaned.replace(/\D/g, "");

  // Require at least 10 digits
  if (digitsOnly.length < 10) return false;

  // Block obvious dummy sequences across any phone format
  const dummyPatterns = [
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
    "1234567890",
    "0123456789",
    "9876543210",
  ];
  for (const pattern of dummyPatterns) {
    if (digitsOnly.includes(pattern)) return false;
  }

  // Check all identical digits (e.g. 777777777777)
  if (/^(\d)\1+$/.test(digitsOnly)) return false;

  // If 10 digits without country code, it must be a valid Indian mobile (starts with 6, 7, 8, or 9)
  if (digitsOnly.length === 10) {
    return /^[6-9]\d{9}$/.test(digitsOnly);
  }

  // If 12 digits starting with 91 (e.g. +91 98200 12345 or 919820012345)
  if (digitsOnly.length === 12 && digitsOnly.startsWith("91")) {
    return /^91[6-9]\d{9}$/.test(digitsOnly);
  }

  // Valid International format: Must start with + and have 10-15 digits
  if (cleaned.startsWith("+") && digitsOnly.length >= 10 && digitsOnly.length <= 15) {
    return true;
  }

  return /^\+?[1-9]\d{9,14}$/.test(cleaned);
}

// ─── GET ENDPOINT FOR CONFIG STATUS / RESEND TESTING ─────────────────────────
export async function GET() {
  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const advisorEmail = process.env.ADVISOR_NOTIFICATION_EMAIL || "advice@sebiadvisor.in";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  return NextResponse.json({
    status: "online",
    service: "Aurum Fiduciary Consultation Intake Desk",
    resendConfigured: hasResend,
    senderAddress: fromEmail,
    advisorDestination: advisorEmail,
    spamProtection: {
      honeypotEnabled: true,
      mxDnsCheckEnabled: true,
      disposableEmailFilterEnabled: true,
      phoneFormatVerificationEnabled: true,
      ipRateLimiterEnabled: true,
    },
    message: hasResend
      ? "Resend is active and ready to deliver real emails."
      : "RESEND_API_KEY not found in environment. Operating in simulation audit mode.",
  });
}

// ─── POST ENDPOINT: BOOKING SUBMISSION & ANTI-SPAM PIPELINE ──────────────────
export async function POST(request: Request) {
  try {
    // 1. IP Rate Limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many consultation requests received from this device. Please wait 10 minutes before trying again or call our desk directly.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      portfolioSize,
      meetingMode,
      primaryFocus,
      notes,
      company_fax_hp, // Honeypot field
    } = body;

    // 2. LAYER 1: HONEYPOT CHECK
    // If a bot filled this invisible field, return a fake 200 success so the bot moves on,
    // but DO NOT send any emails or save records.
    if (company_fax_hp && String(company_fax_hp).trim().length > 0) {
      console.warn("🛡️ Honeypot triggered. Silently discarded bot submission from IP:", ip);
      return NextResponse.json({
        success: true,
        message: "Consultation request dispatched successfully.",
        leadId: `lead_hp_${Date.now()}`,
      });
    }

    // 3. Mandatory Fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Full Name, Email Address, and Phone Number are required." },
        { status: 400 }
      );
    }

    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedPhone = String(phone).trim();
    const trimmedName = String(name).trim();

    // 4. LAYER 3: DISPOSABLE EMAIL DOMAIN CHECK
    const emailDomain = trimmedEmail.split("@")[1];
    if (DISPOSABLE_DOMAINS.has(emailDomain)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Temporary or disposable email domains are not accepted for fiduciary consultations. Please provide your permanent personal or work email.",
        },
        { status: 400 }
      );
    }

    // 5. LAYER 2: REAL-TIME MX RECORD VERIFICATION
    const hasMx = await hasValidMxRecord(trimmedEmail);
    if (!hasMx) {
      return NextResponse.json(
        {
          success: false,
          error:
            `The domain "@${emailDomain}" does not have an active mail server. Please check your email for typos.`,
        },
        { status: 400 }
      );
    }

    // 6. PHONE NUMBER FORMAT & DUMMY CHECK
    if (!isValidPhoneNumber(trimmedPhone)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Please provide a valid 10-digit mobile number (e.g. +91 98200 12345) so our desk can coordinate your calendar invitation.",
        },
        { status: 400 }
      );
    }

    // 7. RECORD CONSTRUCTION & LOCAL AUDIT LOGGING
    const timestamp = new Date().toISOString();
    const cleanPhoneForWa = trimmedPhone.replace(/[^\d]/g, "");
    const waLink = `https://wa.me/${cleanPhoneForWa}?text=${encodeURIComponent(
      `Hello ${trimmedName}, this is Dr. Aurum Mamal's desk from Aurum Fiduciary Advisory. Regarding your discovery session request:`
    )}`;

    const leadRecord = {
      id: `lead_${Date.now()}`,
      timestamp,
      clientName: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      portfolioSize: portfolioSize || "₹1 Crore - ₹5 Crores",
      meetingMode: meetingMode || "Google Meet (Video Call)",
      primaryFocus: primaryFocus || "Family Asset Allocation & Retirement",
      notes: notes || "None",
      ipAddress: ip,
      status: "NEW_UNCONTACTED",
    };

    // Formatted Executive Briefing
    const executiveBriefingText = `
══════════════════════════════════════════════════════════════
🎯 NEW FIDUCIARY DISCOVERY REQUEST: ${trimmedName}
══════════════════════════════════════════════════════════════

INVESTOR DETAILS:
• Full Name:        ${trimmedName}
• Email:            ${trimmedEmail}
• Phone / WhatsApp: ${trimmedPhone}
• Direct WhatsApp:  ${waLink}
• Received:         ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST

WEALTH PROFILE:
• Investable Range: ${leadRecord.portfolioSize}
• Preferred Format: ${leadRecord.meetingMode}
• Primary Focus:    ${leadRecord.primaryFocus}
• Context / Notes:  ${leadRecord.notes}

STATUTORY PROTOCOL:
• Status:           Uncontacted Prospect
• Fiduciary Mandate: Pre-engagement discovery
• Next Step:        Dispatch Google Meet calendar invite within 24 hrs
══════════════════════════════════════════════════════════════
`;

    console.log(executiveBriefingText);

    // Persist lead locally in data/leads.json as an audit safety net
    try {
      const dataDir = path.join(process.cwd(), "data");
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const leadsFile = path.join(dataDir, "leads.json");
      let leads = [];
      if (fs.existsSync(leadsFile)) {
        try {
          leads = JSON.parse(fs.readFileSync(leadsFile, "utf-8"));
        } catch {
          leads = [];
        }
      }
      leads.unshift(leadRecord);
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), "utf-8");
    } catch (fsErr) {
      console.warn("Could not write to local leads.json backup:", fsErr);
    }

    // 8. RESEND EMAIL DISPATCH (DUAL NOTIFICATION)
    const resendApiKey = process.env.RESEND_API_KEY;
    let emailStatus = { sentToAdvisor: false, sentToClient: false, note: "" };

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const fromAddress = process.env.RESEND_FROM_EMAIL || "Aurum Fiduciary <onboarding@resend.dev>";
        const advisorTarget = process.env.ADVISOR_NOTIFICATION_EMAIL || "advice@sebiadvisor.in";

        // Dispatch 1: To the Advisor Desk
        await resend.emails.send({
          from: fromAddress,
          to: [advisorTarget],
          subject: `🎯 New Discovery Consultation: ${trimmedName} (${leadRecord.portfolioSize})`,
          text: executiveBriefingText,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
              <div style="border-bottom: 2px solid #1e90ff; padding-bottom: 12px; margin-bottom: 20px;">
                <span style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #1e90ff; letter-spacing: 1px;">Aurum Fiduciary Desk</span>
                <h2 style="margin: 4px 0 0 0; color: #0f172a; font-size: 20px;">New Consultation Request</h2>
              </div>
              
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
                <tr><td style="padding: 8px 0; color: #64748b; width: 140px;">Investor:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${trimmedName}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0; color: #0f172a;"><a href="mailto:${trimmedEmail}">${trimmedEmail}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Phone:</td><td style="padding: 8px 0; color: #0f172a;">${trimmedPhone}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Portfolio Range:</td><td style="padding: 8px 0; font-weight: 600; color: #1e90ff;">${leadRecord.portfolioSize}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Preferred Format:</td><td style="padding: 8px 0; color: #0f172a;">${leadRecord.meetingMode}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Primary Focus:</td><td style="padding: 8px 0; color: #0f172a;">${leadRecord.primaryFocus}</td></tr>
                <tr><td style="padding: 8px 0; color: #64748b;">Client Notes:</td><td style="padding: 8px 0; color: #0f172a;">${leadRecord.notes}</td></tr>
              </table>

              <div style="text-align: center; margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9;">
                <a href="${waLink}" style="display: inline-block; background: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px; margin-right: 8px;">
                  Open in WhatsApp
                </a>
                <a href="mailto:${trimmedEmail}?subject=${encodeURIComponent("Discovery Consultation Invitation — Aurum Fiduciary Advisory")}" style="display: inline-block; background: #1e90ff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">
                  Reply via Email
                </a>
              </div>
            </div>
          `,
        });
        emailStatus.sentToAdvisor = true;

        // Dispatch 2: Confirmation & Preparation Checklist to Investor
        // Note: Resend's free trial sandbox can send to the account email. On custom domain it sends to any email.
        try {
          await resend.emails.send({
            from: fromAddress,
            to: [trimmedEmail],
            subject: `Discovery Session Request Received — Aurum Fiduciary Advisory`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; background: #ffffff;">
                <h2 style="color: #0f172a; margin-top: 0;">Discovery Session Requested</h2>
                <p style="color: #334155; line-height: 1.6; font-size: 14px;">
                  Dear ${trimmedName},<br><br>
                  Thank you for reaching out. We have received your consultation request for <strong>${leadRecord.primaryFocus}</strong> via <strong>${leadRecord.meetingMode}</strong>.
                </p>
                <p style="color: #334155; line-height: 1.6; font-size: 14px;">
                  Our desk will send a formal calendar invite and meeting link within <strong>1 business day</strong>.
                </p>
                
                <div style="background: #f8fafc; border-left: 4px solid #1e90ff; padding: 16px; margin: 20px 0; border-radius: 4px;">
                  <h4 style="margin: 0 0 10px 0; color: #0f172a; font-size: 14px;">How to Prepare for Your 30-Minute Call:</h4>
                  <ul style="margin: 0; padding-left: 18px; color: #475569; font-size: 13px; line-height: 1.6;">
                    <li><strong>Consolidated Account Statement (CAS):</strong> Keep your monthly CAMS/KFintech or NSDL statement open on screen to review portfolio commission leakage.</li>
                    <li><strong>High-level Asset Allocation:</strong> A rough estimate of your holdings across Equities, Debt/FDs, Real Estate, and PMS.</li>
                    <li><strong>Existing Insurance Policies:</strong> Traditional endowment / LIC policies vs. pure term coverage.</li>
                    <li><strong>Primary Goals:</strong> Any immediate tax deadlines, retirement timelines, or capital repatriation goals.</li>
                  </ul>
                  <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b; font-style: italic;">
                    🔒 Note: You do not need to email any files or passwords beforehand. Keeping them accessible on your screen during the call is sufficient.
                  </p>
                </div>

                <p style="font-size: 12px; color: #94a3b8; border-top: 1px solid #f1f5f9; padding-top: 16px; margin-bottom: 0;">
                  Dr. Aurum Mamal &bull; SEBI Registered Investment Adviser INA000015678 &bull; 42 Marine Drive, Mumbai 400020
                </p>
              </div>
            `,
          });
          emailStatus.sentToClient = true;
        } catch (clientErr) {
          console.warn("Client confirmation email suppressed (likely using sandbox test domain):", clientErr);
        }
      } catch (mailErr: any) {
        console.error("Resend API dispatch error:", mailErr);
        emailStatus.note = mailErr.message || "Email dispatch failed";
      }
    } else {
      console.log("ℹ️ RESEND_API_KEY is not set. Lead saved to local data/leads.json.");
      emailStatus.note = "Simulated in test mode. Set RESEND_API_KEY in .env.local to send live emails.";
    }

    return NextResponse.json({
      success: true,
      message: "Consultation request dispatched successfully.",
      leadId: leadRecord.id,
      emailStatus,
    });
  } catch (error: any) {
    console.error("Unexpected error handling consultation intake:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
