# Aurum Fiduciary — Institutional SEBI RIA Wealth Advisory Platform

A high-converting, institutional-grade digital platform engineered for **SEBI Registered Investment Advisers (RIAs)**, wealth management boutiques, and fee-only financial planners in India.

Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Motion**.

---

## 🏛️ Regulatory & Fiduciary Architecture

This platform is architected to be **100% compliant** with the statutory mandates of the **Securities and Exchange Board of India (Investment Advisers) Regulations, 2013**:

- **SEBI RIA Disclosures (`/disclosures`):** Mandatory conflict of interest disclosures, affiliation statements, and regulatory registration identifiers (SEBI: `INA000015678`, BASL: `1892`).
- **SEBI Investor Charter (`/investor-charter`):** Complete verbatim charter detailing rights, obligations, and advisory dispute escalation procedures under SEBI circular `SEBI/HO/IMD/IMD-II_DOF7/P/CIR/2021/681`.
- **Complaints & Grievance Data (`/complaints-data`):** Prescribed monthly and annual complaint resolution tables integrated with the SEBI SCORES 2.0 portal and SMART ODR mechanism.
- **Statutory Fee Cap Transparency (`/fees`):** Clear presentation of SEBI-mandated flat-fee and AUA-based retainer structures.
- **Risk Profiling & Suitability (`/rpq`):** Built-in risk profiling intake and non-binding preliminary assessment framework.

---

## 🚀 Key Features

### 1. Interactive Fee Drag Compounding Calculator (`/fee-drag-calculator`)
- Real-time client-side compounding model illustrating the ₹30L – ₹1.5Cr+ wealth destruction caused by hidden 1.0%–1.5% regular mutual fund distribution commissions vs. Direct Plan fee-only advisory over 10 to 25-year horizons.
- Direct CTA handoff passing calculation parameters into consultation booking.

### 2. Enterprise Consultation Intake Desk (`/book`)
- **60-Second Onboarding:** Structured intake capturing investable wealth tier, meeting format (Google Meet / Phone / Marine Drive Office), and primary focus.
- **Discovery Call Document Checklist:** Immediate post-booking guidance displaying the 4-point preparation checklist (CAS PDF, asset allocation ballpark, insurance policies, top financial goals) with statutory confidentiality assurances.

### 3. 5-Layer Anti-Spam & Bot Defense Firewall
- **Layer 1: Invisible Honeypot Trap (`company_fax_hp`):** Off-screen trapped input with `tabIndex={-1}` and `aria-hidden`. Automatically captures automated bots and silently returns a fake HTTP 200 without sending emails or polluting records.
- **Layer 2: Real-Time DNS MX Record Resolution:** Validates active mail exchanger servers via `dns.promises.resolveMx(domain)` to reject non-existent or fake domains with typos.
- **Layer 3: Disposable Domain Blacklist:** Blocks temporary burner services (`tempmail.com`, `mailinator.com`, `10minutemail.com`, etc.).
- **Layer 4: Phone & Dummy Number Filter:** Validates Indian mobile standards (`+91` / `[6-9]XXXXXXXXX`) and international E.164, while rejecting common dummy repetitions (`1234567890`, `0000000000`, `9999999999`).
- **Layer 5: In-Memory IP Sliding Window Rate Limiter:** Throttles spam attacks to a maximum of 5 submissions per 10-minute window per IP with HTTP 429 backoff.

### 4. Dual Resend Email Automation & WhatsApp Quick-Connect
- **To Advisor Desk:** Formatted HTML Executive Briefing with investor wealth tier, context notes, and a **1-click direct WhatsApp connection link (`wa.me`)** for instant mobile follow-up.
- **To Investor:** Automated session confirmation email with the 4-point call preparation checklist.
- **Local Audit Fallback:** Every valid lead is automatically backed up locally to `data/leads.json`.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (Turbopack, App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3
- **Animations:** Motion (`motion/react`)
- **Email Delivery:** Resend SDK
- **Fonts:** Google Inter & Roboto

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env.local` and configure your credentials:

```bash
cp .env.example .env.local
```

Inside `.env.local`:

```env
# 1. Resend API Key (From https://resend.com/api-keys)
RESEND_API_KEY=re_your_api_key_here

# 2. Advisor Notification Target (Where you receive lead alerts)
ADVISOR_NOTIFICATION_EMAIL=advice@sebiadvisor.in

# 3. From Address (Sandbox uses onboarding@resend.dev until custom domain is verified)
RESEND_FROM_EMAIL=Aurum Fiduciary Desk <onboarding@resend.dev>
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

Diagnostic API status endpoint:
[http://localhost:3000/api/book](http://localhost:3000/api/book)

---

## 📦 Production Build

```bash
npm run build
npm run start
```

---

## 🚢 Deploying to Vercel

1. Push your code to a GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete SEBI RIA fiduciary advisory platform"
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Add your Environment Variables (`RESEND_API_KEY`, `ADVISOR_NOTIFICATION_EMAIL`, `RESEND_FROM_EMAIL`).
5. Click **"Deploy"**. Vercel will automatically build and assign a global CDN URL.

---

## 📜 Regulatory Disclaimer

*Advisory services are governed by SEBI (Investment Advisers) Regulations, 2013. Registration granted by SEBI, membership of BASL, and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. Investment in securities market is subject to market risks. Read all related documents carefully before investing.*
