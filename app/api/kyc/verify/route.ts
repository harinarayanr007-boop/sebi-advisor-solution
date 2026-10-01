import { NextRequest, NextResponse } from "next/server";

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

    // Artificial delay of 2 seconds as specified in docs/api_guidelines.md
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulation of failed verification if OTP is "000000"
    if (otp === "000000") {
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

    // Clean and format Aadhaar
    const cleanAadhaar = aadhaarNumber.replace(/\D/g, "");
    const maskedAadhaar =
      cleanAadhaar.length >= 4
        ? `XXXX-XXXX-${cleanAadhaar.slice(-4)}`
        : "XXXX-XXXX-8821";

    return NextResponse.json(
      {
        success: true,
        message: "Digital KYC verified successfully via UIDAI CKYC Gateway",
        data: {
          aadhaarMasked: maskedAadhaar,
          cKycIdentifier: "IN-CKYC-2026-" + Math.floor(1000000 + Math.random() * 9000000),
          maskedPan: "AAACB" + Math.floor(1000 + Math.random() * 9000) + "K",
          verifiedName: fullName || "Vikramaditya Singhania",
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
