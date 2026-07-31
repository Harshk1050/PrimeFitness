import mongoose, { Schema, model, models } from "mongoose";

export type GalleryMediaType = "image" | "video";
export type GalleryVideoSource = "upload" | "external";
export type GalleryProvider =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "vimeo"
  | "facebook"
  | "other"
  | "";

export interface IGalleryItem {
  mediaType: GalleryMediaType;
  // Images are always "upload". Videos can be an uploaded file or an
  // external link (YouTube / Instagram / TikTok / Vimeo / Facebook / other).
  videoSource: GalleryVideoSource;
  fileUrl: string; // uploaded image or uploaded video file
  externalUrl: string; // pasted video link (when videoSource === "external")
  provider: GalleryProvider; // derived from externalUrl, cached for convenience
  thumbnail: string; // optional custom/auto thumbnail
  caption: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema = new Schema<IGalleryItem>(
  {
    mediaType: { type: String, enum: ["image", "video"], required: true },
    videoSource: {
      type: String,
      enum: ["upload", "external"],
      default: "upload",
    },
    fileUrl: { type: String, default: "" },
    externalUrl: { type: String, default: "" },
    provider: {
      type: String,
      enum: [
        "youtube",
        "instagram",
        "tiktok",
        "vimeo",
        "facebook",
        "other",
        "",
      ],
      default: "",
    },
    thumbnail: { type: String, default: "" },
    caption: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const GalleryItem =
  models.GalleryItem || model<IGalleryItem>("GalleryItem", GallerySchema);
