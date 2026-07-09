import mongoose, { Schema, model, models } from "mongoose";

export interface IFaqItem {
  question: string;
  answer: string;
}

export interface IBlog {
  title: string;
  slug: string;
  category: string;
  subCategory: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  imageAlt: string;
  tags: string[];
  metaTitle: string;
  canonicalUrl: string;
  metaDescription: string;
  published: boolean;
  publishedAt: Date | null;
  faqs: IFaqItem[];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subCategory: { type: String, default: "" },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    featuredImage: { type: String, default: "" },
    imageAlt: { type: String, default: "" },
    tags: [{ type: String }],
    metaTitle: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
    faqs: {
      type: [
        {
          question: { type: String, default: "" },
          answer: { type: String, default: "" },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
