import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { transaction_id, status } = body;

  if (status === "ACCEPTED") {
    // Paiement confirmé → argent bloqué en escrow
    console.log(`Transaction ${transaction_id} acceptée - argent bloqué`);
    // TODO: mettre à jour la base de données
  }

  return NextResponse.json({ message: "OK" });
}
