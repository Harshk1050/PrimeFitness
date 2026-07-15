import { MetadataRoute } from "next";
import { connectDB } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Event } from "@/models/Event";
const baseUrl = "https://primefitnessplusllc.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connectDB();

  const blogs = await Blog.find(
    { published: true },
    {
      slug: 1,
      updatedAt: 1,
      publishedAt: 1,
      createdAt: 1,
    },
  ).lean();

  const events = await Event.find(
    { published: true },
    { slug: 1, updatedAt: 1 },
  ).lean();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trainers`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.updatedAt || blog.createdAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((event: any) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: event.updatedAt || event.createdAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes, ...eventRoutes];
}
