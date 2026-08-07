import { NextRequest, NextResponse } from "next/server";

import { Event } from "@/models/Event";
import { Participate } from "@/models/Participate";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongoose";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  await connectDB();
  const { name, email, phone, eventId } = await req.json();

  if (!name || !email || !phone || !eventId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  const event = (await Event.findById(eventId).lean()) as any;
  const eventTitle = event?.title ?? "Unknown Event";

  const participation = await Participate.create({
    name,
    email,
    phone,
    eventId,
  });

  const data = await resend.emails.send({
    from: "Prime Fitness <onboarding@resend.dev>",
    to: ["info@primefitnessplusllc.com"],
    subject: `New Participant: ${name} — ${eventTitle}`,
    replyTo: email,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333;">
        <h2 style="color: #16a34a; text-transform: uppercase;">New Event Participation</h2>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p><strong>Event:</strong> ${eventTitle}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999;">Submitted via Prime Fitness website.</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true, status: 201, participation, data });
}

export async function GET() {
  await connectDB();
  const participations = await Participate.find()
    .sort({ createdAt: -1 })
    .lean();
  return NextResponse.json(participations);
}
