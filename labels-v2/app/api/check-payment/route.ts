// app/api/payment-status/route.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10" as any,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing payment intent ID" },
      { status: 400 }
    );
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(id);
    console.log("PaymentIntent status:", paymentIntent.status);
    return NextResponse.json({ status: paymentIntent.status });
  } catch (error: any) {
    console.error("Stripe check error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
