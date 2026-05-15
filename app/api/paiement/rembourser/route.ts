import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { transaction_id } = body;

  // Recycleur absent → remboursement automatique au client
  console.log(`Transaction ${transaction_id} - remboursement client`);

  return NextResponse.json({ success: true, message: "Client remboursé" });
}
