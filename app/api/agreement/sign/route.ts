import { NextRequest, NextResponse } from "next/server";
import { createHash, randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { signatureDataUrl, clientId, clientName } = body;

    if (!signatureDataUrl || typeof signatureDataUrl !== "string") {
      return NextResponse.json(
        { success: false, message: "Valid digital signature data is required." },
        { status: 400 }
      );
    }

    // Validate signature format (base64 data URL)
    if (!signatureDataUrl.startsWith("data:image/")) {
      return NextResponse.json(
        { success: false, message: "Signature must be a valid image data URL." },
        { status: 400 }
      );
    }

    const executionTimestamp = new Date().toISOString();
    const safeClientId = (typeof clientId === "string" && clientId.trim()) ? clientId.trim().substring(0, 64) : "AURUM-HNI-DEFAULT";
    const safeClientName = (typeof clientName === "string" && clientName.trim()) ? clientName.trim().substring(0, 100) : "Valued Fiduciary Client";

    // Generate cryptographic SHA-256 seal using crypto
    const hashPayload = `${safeClientId}:${safeClientName}:${executionTimestamp}:${signatureDataUrl}`;
    const cryptographicHash = "sha256_" + createHash("sha256").update(hashPayload).digest("hex");
    const agreementId = `SEBI-RIA-AGR-${randomBytes(4).toString("hex").toUpperCase()}`;

    return NextResponse.json(
      {
        success: true,
        message:
          "SEBI Mandated Investment Advisory Agreement executed and digitally sealed under Indian IT Act 2000 & SEBI IA Regulations.",
        agreementId,
        clientId: safeClientId,
        clientName: safeClientName,
        signedAt: executionTimestamp,
        legalHash: cryptographicHash,
        pdfDownloadUrl: `/api/agreement/download?agreementId=${agreementId}`,
        data: {
          agreementId,
          signedAt: executionTimestamp,
          sha256Hash: cryptographicHash,
          downloadUrl: `/api/agreement/download?agreementId=${agreementId}`,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error during agreement execution." },
      { status: 500 }
    );
  }
}
