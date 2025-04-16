import { NextRequest, NextResponse } from "next/server";
import stripe from "@/app/lib/stripe";
import { auth } from "@/app/lib/auth";
import { getOrCreateCustomerId } from "@/app/server/stripe/get-or-create-customer";

export async function POST(req: NextRequest) {
  const { testeID } = await req.json();
  const session = await auth();
  const userId = session?.user?.id;
  const userEmail = session?.user?.email;

  if (!userId || !userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const price = process.env.STRIPE_SUBSCRIPTION_PRICE_ID;

  if (!price) {
    return NextResponse.json({ error: "Price not found" }, { status: 404 });
  }

  const metadata = {
    testeID,
  };

  const customer = await getOrCreateCustomerId(userId, userEmail);

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: "subscription",
      payment_method_types: ["card"],
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/`,
      metadata,
      customer,
    });

    if (!session.url) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.error();
  }
}
