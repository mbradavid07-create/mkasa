import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { montant, description, client_nom, client_email, transaction_id } = body;

  const payload = {
    apikey: process.env.CINETPAY_API_KEY,
    site_id: process.env.CINETPAY_SITE_ID,
    transaction_id: transaction_id,
    amount: montant,
    currency: "XOF",
    description: description,
    customer_name: client_nom,
    customer_email: client_email,
    notify_url: `${process.env.NEXT_PUBLIC_URL}/api/paiement/notify`,
    return_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    channels: "MOBILE_MONEY",
    lang: "fr",
  };

  const response = await fetch("https://api-checkout.cinetpay.com/v2/payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
