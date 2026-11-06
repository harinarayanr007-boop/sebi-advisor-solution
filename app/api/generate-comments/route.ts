import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { imageBase64, mimeType = "image/png", customNotes = "" } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not configured" },
        { status: 500 }
      );
    }

    // Clean base64 data if it contains a data URL header
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");

    const systemPrompt = `You are an elite, razor-sharp ghostwriter and growth operator for Hari Narayan (@harinarayanfintech), founder of Advisor Solution (building digital client intake desks and sovereign client portals for Indian wealth managers, SEBI RIAs, and loan consultants).

Examine this screenshot carefully (it can be a LinkedIn post, tweet, chart, article, or industry visual).

Generate exactly 4 SHORT, PUNCHY, HIGH-IMPACT comments mapped directly to the 4 STAGES OF MARKET AWARENESS:

1. Level 1: Problem Aware
   - Target: Readers who feel the friction but ignore the root operational bleed.
   - Angle: Expose the invisible leak, manual chasing trap, or positioning friction.
   - Length: Exactly 1 to 2 tight sentences.

2. Level 2: Solution Aware
   - Target: Readers looking for modern operating mechanisms.
   - Angle: Introduce the systemic shift (e.g. digital intake pre-qualification instead of manual discovery calls).
   - Length: Exactly 1 to 2 tight sentences.

3. Level 3: Product / Mechanism Aware
   - Target: Practitioners comparing frameworks and standards.
   - Angle: Detail how a sovereign pre-qualification desk filters out retail noise and commands premium retainers.
   - Length: Exactly 1 to 2 tight sentences.

4. Level 4: Most Aware / High Conviction
   - Target: Sophisticated peers and high-ticket leads ready to act.
   - Angle: A definitive, unapologetic closing take that forces agreement and earns authority.
   - Length: Exactly 1 to 2 hard-hitting sentences.

CRITICAL RULES:
- STRICT BAN ON EM DASHES: NEVER use "—" or "--". Use periods, commas, or semicolons only.
- STRICTLY SHORT: Every comment must be 15 to 30 words maximum (1 to 2 sentences). No essays, no bullet points.
- NO AI BUZZWORDS: Never say "Great post", "Insightful", "In today's landscape", "Furthermore", "Delve", "Crucial".
- Speak like an authoritative peer in wealth management and client intake.
${customNotes ? `User steering instructions: ${customNotes}` : ""}

Return ONLY a valid JSON object matching this schema:
{
  "summary": "1-sentence summary of the screenshot",
  "comments": [
    {
      "level": "Level 1: Problem Aware",
      "stage": "Problem",
      "text": "...",
      "strategy": "Exposes the hidden leak in manual intake."
    },
    {
      "level": "Level 2: Solution Aware",
      "stage": "Solution",
      "text": "...",
      "strategy": "Positions the systemic shift to digital desks."
    },
    {
      "level": "Level 3: Product Aware",
      "stage": "Mechanism",
      "text": "...",
      "strategy": "Explains how the pre-qualification filter works."
    },
    {
      "level": "Level 4: Most Aware",
      "stage": "Conviction",
      "text": "...",
      "strategy": "High-conviction closing take."
    }
  ]
}`;

    // Call Gemini 3.1 Flash Lite with multimodal payload
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${apiKey}`;

    const geminiRes = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemPrompt },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: cleanBase64,
                },
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      }),
    });

    const data = await geminiRes.json();

    if (data.error) {
      console.error("Gemini API Error:", data.error);
      return NextResponse.json({ error: data.error.message || "API processing error" }, { status: 500 });
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return NextResponse.json({ error: "No response generated" }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      const cleaned = rawText.replace(/```json\n?/, "").replace(/```$/, "").trim();
      parsed = JSON.parse(cleaned);
    }

    // Safety scrub for any leftover em dashes
    if (parsed.comments && Array.isArray(parsed.comments)) {
      parsed.comments = parsed.comments.map((c: any) => ({
        ...c,
        text: (c.text || "").replace(/—/g, ", ").replace(/--/g, ", ").replace(/\s+/g, " ").trim(),
      }));
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error("Server Error in generate-comments:", err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
