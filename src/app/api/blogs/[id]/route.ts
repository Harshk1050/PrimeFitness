import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const blog = await Blog.findById(id).lean();
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(blog);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  const body = await req.json();
  const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(blog);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;
  await Blog.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
