import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { transaction_id } = body;

  // Collecte confirmée → argent libéré au recycleur
  console.log(`Transaction ${transaction_id} - argent libéré au recycleur`);

  return NextResponse.json({ success: true, message: "Paiement libéré au recycleur" });
}
