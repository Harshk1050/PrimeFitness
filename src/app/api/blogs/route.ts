import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const publishedOnly = searchParams.get("published") === "true";
  const query = publishedOnly ? { published: true } : {};
  const blogs = await Blog.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json(blogs);
}

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const blog = await Blog.create(body);
  return NextResponse.json(blog, { status: 201 });
}
