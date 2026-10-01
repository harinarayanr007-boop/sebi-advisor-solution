# Technical Architecture

## Frontend (Client-Facing)
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **State Management**: React Context (to hold the user's progress through the multi-step RPQ and KYC flows)
- **Forms**: React Hook Form + Zod (for strict data validation on the RPQ)

## Mock Backend / API Layer
- **Framework**: Next.js API Routes (Serverless Functions)
- **Database**: Local mock state or simple SQLite/Prisma setup for prototype storage of leads.

## Core Modules
- **LandingModule**: Hero section, thought-leadership blog feed (for LinkedIn routing), and hardcoded SEBI footer.
- **RPQModule**: Multi-step form (The Spam Wall).
- **KYCModule**: Mock Aadhaar OTP verification UI.
- **AgreementModule**: Mock PDF generation and digital signature pad.
- **CeFCoM_Module**: Mock payment gateway UI reflecting the BSE/MFU centralized fee collection interface.
