import { NextRequest, NextResponse } from "next/server";

import { Participate } from "@/models/Participate";
import { connectDB } from "@/lib/mongoose";

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await params;
  await Participate.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
