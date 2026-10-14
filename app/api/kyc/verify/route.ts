import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { aadhaarNumber, otp, fullName } = body;

    if (!aadhaarNumber || !otp) {
      return NextResponse.json(
        { success: false, message: "Aadhaar number and OTP are mandatory." },
        { status: 400 }
      );
    }

    const cleanAadhaar = String(aadhaarNumber).replace(/\D/g, "");
    const cleanOtp = String(otp).trim();

    // Enforce 12-digit Aadhaar format
    if (cleanAadhaar.length !== 12) {
      return NextResponse.json(
        { success: false, message: "Aadhaar number must be exactly 12 numeric digits." },
        { status: 400 }
      );
    }

    // Enforce 6-digit OTP format
    if (!/^\d{6}$/.test(cleanOtp)) {
      return NextResponse.json(
        { success: false, message: "OTP must be a 6-digit numeric passcode." },
        { status: 400 }
      );
    }

    // Simulation of failed verification if OTP is "000000"
    if (cleanOtp === "000000") {
      return NextResponse.json(
        {
          success: false,
          errorCode: "UIDAI_AUTH_FAILED",
          message:
            "UIDAI e-KYC Authentication Failed: Invalid or expired OTP. Please enter the valid 6-digit passcode sent to your registered mobile.",
        },
        { status: 400 }
      );
    }

    const maskedAadhaar = `XXXX-XXXX-${cleanAadhaar.slice(-4)}`;
    const ckycSuffix = randomBytes(4).toString("hex").toUpperCase();
    const panMiddle = randomBytes(2).toString("hex").toUpperCase();

    return NextResponse.json(
      {
        success: true,
        message: "Digital KYC verified successfully via UIDAI CKYC Gateway",
        data: {
          aadhaarMasked: maskedAadhaar,
          cKycIdentifier: `IN-CKYC-2026-${ckycSuffix}`,
          maskedPan: `AAACB${panMiddle}K`,
          verifiedName: fullName || "Verified Investor",
          dob: "14/06/1979",
          gender: "Male",
          registeredAddress:
            "Flat 1402, Tower B, Sea Face Residency, Worli Sea Face, Mumbai, Maharashtra - 400018",
          uidaiTimestamp: new Date().toISOString(),
          complianceStatus: "SEBI_KRA_VERIFIED",
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error during KYC verification." },
      { status: 500 }
    );
  }
}
