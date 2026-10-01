# Execution Plan

## Phase 1: Foundation & UI Shell
- Initialize Next.js project with Tailwind and TypeScript.
- Create global layouts, including the strict SEBI-compliant footer (font size 10).
- Build the luxury landing page (Hero, Value Proposition, About the Fiduciary).

## Phase 2: The RPQ "Spam Wall"
- Build the multi-step Risk Profiling Questionnaire.
- Implement Zod validation to filter out users with < ₹50 Lakh net worth.
- Create the success routing (to calendar/KYC) and rejection routing.

## Phase 3: The Client Onboarding Portal
- Build the mock Aadhaar e-KYC screen (Input Aadhaar -> Mock OTP -> Success).
- Build the Advisory Agreement screen (Display mock terms, capture digital signature).

## Phase 4: CeFCoM Payment Integration
- Build the mock checkout screen simulating the SEBI Centralized Fee Collection Mechanism.
- Display mock BSE/MFU trust badges to ensure institutional credibility.

## Phase 5: Review & Polish
- Ensure all copy avoids prohibited superlatives.
- Verify mobile responsiveness (as wealthy clients will visit via LinkedIn on mobile).
