# API & Skills Guidelines

Since this is a prototype, we will not connect to live government or banking APIs (which require strict SEBI/UIDAI production keys). Instead, simulate these endpoints using Next.js API routes with artificial delays to mimic real-world processing.

## 1. Mock Digital KYC (Aadhaar e-Sign)
- **Endpoint**: `POST /api/kyc/verify`
- **Request**: `{ aadhaarNumber: string, otp: string }`
- **Simulation**: Return a 200 OK with a success message after a 2-second timeout. If the OTP is "000000", return a 400 Error (Simulation of failed verification).

## 2. Mock Advisory Agreement Signature
- **Endpoint**: `POST /api/agreement/sign`
- **Request**: `{ signatureDataUrl: string, clientId: string }`
- **Simulation**: Return a 200 OK with a mock PDF download link representing the legally mandated SEBI Advisory Agreement.

## 3. Mock CeFCoM Gateway
- **Endpoint**: `POST /api/payment/cefcom`
- **Request**: `{ amount: number, feeModel: "Fixed" | "AUA", clientId: string }`
- **Simulation**: Return a 200 OK with a mock transaction ID. The UI should display a loading spinner stating "Routing through BSE/MFU CeFCoM network..." to simulate the government-backed payment infrastructure.

## Copywriting Rules (CRITICAL)
- The AI must actively scan all generated text components.
- Do NOT use the words: "Best", "Top", "Number 1", "Guaranteed Returns", "Market Beating".
- Use phrases like: "Fiduciary Duty", "Data-Driven Asset Allocation", "Risk-Adjusted Strategies", "Wealth Preservation".
