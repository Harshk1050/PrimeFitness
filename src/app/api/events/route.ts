import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Event } from "@/models/Event";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const publishedOnly = searchParams.get("published") === "true";
  const query = publishedOnly ? { published: true } : {};
  const events = await Event.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json(events);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const event = await Event.create(body);
  return NextResponse.json(event, { status: 201 });
}
