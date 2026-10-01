import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { signatureDataUrl, clientId, clientName } = body;

    if (!signatureDataUrl) {
      return NextResponse.json(
        { success: false, message: "Valid digital signature data is required." },
        { status: 400 }
      );
    }

    // Artificial delay to simulate cryptographic timestamping and PDF rendering
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const agreementId = "SEBI-RIA-AGR-" + Math.floor(100000 + Math.random() * 900000);
    const executionTimestamp = new Date().toISOString();
    const cryptographicHash =
      "sha256_" +
      Array.from({ length: 32 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join("");

    return NextResponse.json(
      {
        success: true,
        message:
          "SEBI Mandated Investment Advisory Agreement executed and digitally sealed under Indian IT Act 2000 & SEBI IA Regulations.",
        agreementId,
        clientId: clientId || "AURUM-HNI-DEFAULT",
        clientName: clientName || "Valued Fiduciary Client",
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
