import { Blog } from "@/models/Blog";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/mongoose";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB();
  const { slug } = await params;
  const blog = (await Blog.findOne({ slug, published: true }).lean()) as any;
  if (!blog) return {};
  return {
    title: blog?.metaTitle || blog?.title,
    description: blog?.metaDescription || blog?.shortDescription,
    alternates: { canonical: blog.canonicalUrl || undefined },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.shortDescription,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  await connectDB();
  const { slug } = await params;
  const blog = (await Blog.findOne({ slug, published: true }).lean()) as any;
  if (!blog) notFound();

  const related = (await Blog.find({
    published: true,
    category: blog.category,
    _id: { $ne: blog._id },
  })
    .limit(3)
    .lean()) as any[];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative bg-slate-900 pt-28 pb-16 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
        {blog?.featuredImage && (
          <div className="absolute inset-0 opacity-20">
            <Image
              src={blog?.featuredImage}
              alt={blog?.imageAlt || blog?.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/80" />
          </div>
        )}
        <div className="container mx-auto relative z-10 max-w-4xl">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-green-500 font-bold text-sm uppercase tracking-widest mb-6 hover:underline"
          >
            ← Back to Blogs
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {blog?.category}
            </span>
            {blog?.subCategory && (
              <span className="bg-white/10 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {blog.subCategory}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase leading-tight tracking-tighter text-white mb-6">
            {blog?.title || "-"}
          </h1>
          <p className="text-slate-300 text-lg font-medium max-w-2xl leading-relaxed">
            {blog?.shortDescription || "-"}
          </p>
          <div className="mt-6 flex items-center gap-4 text-slate-400 text-sm font-medium">
            <span>
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </span>
            {blog?.tags?.length > 0 && (
              <>
                <span>·</span>
                <div className="flex gap-2 flex-wrap">
                  {blog?.tags.map((tag: string) => (
                    <span key={tag} className="text-green-400">
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {blog?.featuredImage && (
        <div className="container mx-auto max-w-4xl px-6 -mt-10 relative z-10">
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src={blog.featuredImage}
              alt={blog.imageAlt || blog.title}
              fill
              className="object-cover h-full w-full"
              priority
            />
          </div>
        </div>
      )}

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <article
            className="blog-content max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>
      </section>

      {blog?.faqs?.filter(
        (faq: { question: string; answer: string }) =>
          faq.question?.trim() || faq.answer?.trim(),
      ).length > 0 && (
        <section className="py-8 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-tight text-slate-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {blog.faqs
                  .filter(
                    (faq: { question: string; answer: string }) =>
                      faq.question?.trim() || faq.answer?.trim(),
                  )
                  .map(
                    (
                      faq: { question: string; answer: string },
                      index: number,
                    ) => (
                      <details
                        key={`${faq.question}-${index}`}
                        className="group rounded-xl border border-slate-200 p-2"
                      >
                        <summary className="cursor-pointer list-none font-semibold text-slate-800 text-base">
                          <span className="flex items-center justify-between gap-3">
                            <span>{faq.question || `FAQ ${index + 1}`}</span>
                            <span className="text-xl text-green-600 transition group-open:rotate-45">
                              +
                            </span>
                          </span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                          {faq.answer}
                        </p>
                      </details>
                    ),
                  )}
              </div>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="py-16 px-6 bg-white border-t border-slate-100">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-0.5 w-12 bg-green-600" />
              <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                Related Posts
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related?.map((r: any) => (
                <Link
                  key={r._id.toString()}
                  href={`/blogs/${r.slug}`}
                  className="group block bg-slate-50 rounded-xl overflow-hidden border border-slate-100 hover:border-green-200 hover:shadow-md transition-all"
                >
                  <div className="relative h-36 bg-slate-900">
                    {r?.featuredImage ? (
                      <Image
                        src={r?.featuredImage}
                        alt={r?.imageAlt || r?.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-4xl font-black text-green-500/20">
                          {r?.category.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-black uppercase text-sm tracking-tight line-clamp-2 group-hover:text-green-600 transition-colors">
                      {r?.title || "-"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {r?.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-6 bg-slate-900 text-center">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-3xl font-black uppercase text-white mb-4">
            Ready to <span className="text-green-500">Transform?</span>
          </h2>
          <p className="text-slate-400 mb-8">
            Join Prime Fitness Plus and start your adaptive fitness journey
            today.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-green-500 text-slate-900 px-10 py-4 rounded-full font-black text-lg uppercase hover:bg-white transition-colors shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </main>
  );
}
