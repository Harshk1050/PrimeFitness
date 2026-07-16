import { NextRequest, NextResponse } from "next/server";

import { Donation } from "@/models/Donation";
import { connectDB } from "@/lib/mongoose";

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, amount, message, eventId, eventTitle, eventSlug, paypalOrderId } = await req.json();

  if (!name || !email || !amount || !eventId || !paypalOrderId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const donation = await Donation.create({ name, email, amount, message, eventId, eventTitle, eventSlug, paypalOrderId });
  return NextResponse.json(donation, { status: 201 });
}

export async function GET() {
  await connectDB();
  const donations = await Donation.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(donations);
}
