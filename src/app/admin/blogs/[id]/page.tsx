import { Blog } from "@/models/Blog";
import { BlogForm } from "@/components/admin/blogs/blog-form";
import { connectDB } from "@/lib/mongoose";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connectDB();
  const { id } = await params;
  const blog = (await Blog.findById(id).lean()) as any;
  if (!blog) notFound();

  const data = {
    _id: blog._id.toString(),
    title: blog?.title,
    slug: blog?.slug,
    category: blog?.category,
    subCategory: blog?.subCategory,
    shortDescription: blog?.shortDescription,
    content: blog?.content,
    featuredImage: blog?.featuredImage,
    imageAlt: blog?.imageAlt,
    tags: blog?.tags,
    metaTitle: blog?.metaTitle,
    canonicalUrl: blog?.canonicalUrl,
    metaDescription: blog?.metaDescription,
    published: blog?.published,
    publishedAt: blog?.publishedAt,
    faqs: blog?.faqs || [],
  };

  return <BlogForm mode="edit" initialData={data} />;
}
