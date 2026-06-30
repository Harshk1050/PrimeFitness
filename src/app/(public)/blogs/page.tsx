import { Blog } from "@/models/Blog";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/mongoose";

export const metadata: Metadata = {
  title: "Blogs | Prime Fitness Plus",
  description:
    "Read the latest fitness, adaptive training, and wellness articles from Prime Fitness Plus.",
};

export default async function BlogsPage() {
  await connectDB();
  const blogs = (await Blog.find({ published: true })
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-900 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10 text-center">
          <span className="text-green-500 font-bold uppercase tracking-[0.3em] text-sm block mb-4">
            Knowledge Hub
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase leading-none tracking-tighter text-white">
            OUR <span className="text-green-500">BLOGS</span>
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-xl mx-auto font-medium">
            Expert insights on adaptive fitness, performance, nutrition, and
            mental wellness.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto">
          {blogs.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-2xl font-black uppercase">No posts yet</p>
              <p className="text-sm mt-2">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs?.map((blog, i) => (
                <Link
                  key={blog._id.toString()}
                  href={`/blogs/${blog.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-52 bg-slate-900 overflow-hidden">
                    {blog.featuredImage ? (
                      <Image
                        src={blog?.featuredImage}
                        alt={blog?.imageAlt || blog?.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl font-black text-green-500/20 uppercase">
                          {blog?.category.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {blog?.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="text-lg font-black uppercase leading-tight tracking-tight text-slate-900 group-hover:text-green-600 transition-colors line-clamp-2">
                      {blog?.title || "-"}
                    </h2>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {blog?.shortDescription || "-"}
                    </p>
                    {blog.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {blog.tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="pt-2 flex items-center gap-2 text-green-600 font-bold text-sm">
                      Read More
                      <span className="group-hover:translate-x-1 transition-transform inline-block">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
