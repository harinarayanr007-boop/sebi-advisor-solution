# Project Goals & Business Logic

## 1. The "Spam Wall" (Lead Qualification)
**Goal**: Prevent unqualified users from booking consultations.
**Implementation**: A multi-step Risk Profiling Questionnaire (RPQ) that captures age, income bracket, net worth, and risk tolerance. Users who select a net worth below ₹50 Lakhs should be routed to a polite rejection/waitlist page.

## 2. Institutional Trust (UI/UX)
**Goal**: Project the security and exclusivity of a global private bank.
**Implementation**: Minimalist luxury design. High contrast, serif typography for headings, deep blues/blacks/golds, and generous whitespace.

## 3. Strict SEBI Legal Compliance
**Goal**: Pass automated UI compliance checks.
**Implementation**:
- NO superlatives ("Best", "No.1", "Guaranteed") allowed in any copy.
- The Standard Risk Warning ("Investments in the securities market are subject to market risks...") MUST be hardcoded into the global footer.
- The font size for the disclaimer MUST be strictly set to 10px or equivalent legible format to mimic SEBI's "Size 10" mandate.

## 4. End-to-End Digital Onboarding
**Goal**: Seamlessly transition a qualified lead into a paying, verified client.
**Implementation**: Digital KYC (Aadhaar mock flow), E-Signature for the Advisory Agreement, and a CeFCoM mock payment gateway.
