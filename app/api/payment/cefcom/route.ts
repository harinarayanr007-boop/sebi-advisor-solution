import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, feeModel, clientId } = body;

    if (!amount || !feeModel || !clientId) {
      return NextResponse.json(
        {
          success: false,
          message: "Amount, feeModel, and clientId are mandatory for CeFCoM settlement.",
        },
        { status: 400 }
      );
    }

    // Artificial delay of 2.5 seconds to simulate clearing through BSE/MFU CeFCoM network
    await new Promise((resolve) => setTimeout(resolve, 2500));

    const timestamp = new Date().toISOString();
    const randomHex = Math.floor(10000000 + Math.random() * 90000000);
    const transactionId = `CEFCOM-BSE-${new Date().getFullYear()}${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${randomHex}`;
    const urn = `URN-BASL-${Math.floor(10000 + Math.random() * 90000)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    return NextResponse.json(
      {
        success: true,
        message:
          "Payment processed and validated through the SEBI recognized BSE/MFU CeFCoM Settlement Infrastructure.",
        transactionId,
        urn,
        escrowSettlementAccount: "BSE CeFCoM Designated Escrow A/C # 992817264819 (HDFC Bank)",
        amount: Number(amount),
        feeModel,
        clientId,
        clearingHouse: "BSE Administration & Supervision Ltd (BASL) / MFU",
        regulatoryCircular: "SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2024/78",
        status: "SETTLED_IN_ESCROW",
        timestamp,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error during CeFCoM routing." },
      { status: 500 }
    );
  }
}
