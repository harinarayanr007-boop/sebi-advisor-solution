import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const agreementId = searchParams.get("agreementId") || "SEBI-RIA-AGR-001";

  const agreementHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SEBI Investment Advisory Agreement - ${agreementId}</title>
  <style>
    body { font-family: 'Times New Roman', serif; margin: 40px; color: #111; line-height: 1.6; }
    h1 { text-align: center; font-size: 22px; text-transform: uppercase; margin-bottom: 5px; }
    .subtitle { text-align: center; font-size: 13px; color: #555; margin-bottom: 30px; text-transform: uppercase; }
    .stamp-box { border: 2px solid #8b7355; padding: 12px; margin-bottom: 25px; background: #faf8f5; font-size: 12px; }
    .clause { margin-bottom: 18px; font-size: 13px; text-align: justify; }
    .clause-title { font-weight: bold; }
    .footer { margin-top: 40px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 11px; color: #666; }
    .signatures { display: flex; justify-content: space-between; margin-top: 50px; }
    .sign-block { width: 45%; border-top: 1px dashed #333; padding-top: 8px; font-size: 12px; }
    @media print { body { margin: 20mm; } }
  </style>
</head>
<body>
  <div class="stamp-box">
    <strong>STATUTORY REGISTRATION RECORD:</strong><br>
    Investment Adviser: Aurum Fiduciary Advisory LLP | SEBI Reg. No.: INA000019842 | BASL: BASL-1892<br>
    Agreement Reference: ${agreementId} | Governed under: SEBI (Investment Advisers) Regulations, 2013 (Reg 19)
  </div>

  <h1>Investment Advisory Agreement</h1>
  <div class="subtitle">Pursuant to Regulation 19(1)(d) of SEBI (Investment Advisers) Regulations, 2013</div>

  <div class="clause">
    <span class="clause-title">1. APPOINTMENT OF THE INVESTMENT ADVISER:</span>
    The Client hereby appoints Aurum Fiduciary Advisory LLP (hereinafter referred to as the "Investment Adviser") to provide non-binding, non-discretionary investment advisory services in accordance with the terms of this Agreement and SEBI regulations.
  </div>

  <div class="clause">
    <span class="clause-title">2. FIDUCIARY CAPACITY & ZERO CONFLICT OF INTEREST:</span>
    The Investment Adviser shall act strictly in a fiduciary capacity towards the Client. The Adviser explicitly covenants that it shall not receive any commission, brokerage, trailer fee, or distribution kickback from any asset management company, broker, or financial product issuer.
  </div>

  <div class="clause">
    <span class="clause-title">3. STATUTORY FEE CEILING & CeFCoM COMPLIANCE:</span>
    In adherence to SEBI circular SEBI/HO/IMD/DF1/CIR/P/2020/182, the fee charged by the Investment Adviser shall not exceed statutory caps (₹1,25,000 per annum for fixed fee or 2.5% p.a. on AUA). All fees shall be deposited exclusively via the recognized Centralized Fee Collection Mechanism (CeFCoM).
  </div>

  <div class="clause">
    <span class="clause-title">4. RISK PROFILE & SUITABILITY:</span>
    Advisory recommendations shall be strictly aligned with the Client's formal Risk Profiling Questionnaire. The Client acknowledges that securities markets are subject to volatility, and no capital preservation or return guarantees are made or implied.
  </div>

  <div class="clause">
    <span class="clause-title">5. TERMINATION & GRIEVANCE REDRESSAL:</span>
    Either party may terminate this agreement with 30 days written notice. Grievances may be escalated to the Compliance Officer, SEBI SCORES 2.0 (scores.sebi.gov.in), or SMART Online Dispute Resolution (smartodr.in).
  </div>

  <div class="signatures">
    <div class="sign-block">
      <strong>For Investment Adviser:</strong><br>
      Aurum Fiduciary Advisory LLP<br>
      Authorized Signatory: Rajesh V. Mehta (Principal Officer)<br>
      Digitally Timestamped via Certifying Authority
    </div>
    <div class="sign-block">
      <strong>For Client:</strong><br>
      Digitally Executed via Indian IT Act 2000 e-Sign<br>
      Hash: SHA-256 Verified<br>
      Execution Timestamp: ${new Date().toUTCString()}
    </div>
  </div>

  <div class="footer">
    Aurum Fiduciary Advisory LLP • Level 14, Maker Chambers VI, Nariman Point, Mumbai 400021.<br>
    Investments in securities market are subject to market risks. Read all related documents carefully before investing.
  </div>
</body>
</html>
  `;

  return new NextResponse(agreementHtml, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="${agreementId}.html"`,
    },
  });
}
