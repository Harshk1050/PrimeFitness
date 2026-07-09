import { Eye, Pencil, Plus, Trash2 } from "lucide-react";

import { Blog } from "@/models/Blog";
import { DeleteBlogButton } from "@/components/admin/blogs/delete-blog-button";
import Link from "next/link";
import { connectDB } from "@/lib/mongoose";

export default async function AdminBlogsPage() {
  await connectDB();
  const blogs = await Blog.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            Blogs
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {blogs.length} total posts
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition-colors"
        >
          <Plus size={16} /> New Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No blogs yet</p>
          <p className="text-sm mt-1">Create your first blog post</p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs">
                  Title
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs hidden lg:table-cell">
                  Tags
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs">
                  Status
                </th>
                <th className="text-left px-4 py-3 font-bold text-slate-600 uppercase tracking-wider text-xs hidden lg:table-cell">
                  Date
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs?.map((blog: any) => (
                <tr
                  key={blog._id.toString()}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-4 py-4">
                    <p className="font-semibold text-slate-900 line-clamp-1">
                      {blog?.title || "-"}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {blog?.slug || "-"}
                    </p>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      {blog?.category || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {blog?.tags?.slice(0, 3).map((tag: string) => (
                        <span
                          key={tag}
                          className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-bold ${blog?.published ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}
                    >
                      {blog?.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell text-slate-400 text-xs">
                    {new Date(
                      blog.publishedAt || blog.createdAt,
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      {blog?.published && (
                        <Link
                          href={`/blogs/${blog.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      <Link
                        href={`/admin/blogs/${blog._id}`}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <DeleteBlogButton id={blog._id.toString()} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
