import mongoose, { Schema, model, models } from "mongoose";

export interface IEventHighlight {
  label: string;
  icon: string;
}

export interface IEventCoreValue {
  label: string;
  icon: string;
}

export interface IEventFaq {
  question: string;
  answer: string;
}

export interface IEventSponsorTier {
  level: string;
  price: string;
  highlight: boolean;
  icon: string;
  perks: string[];
}

export interface IEventDetail {
  date: string;
  time: string;
  location: string;
  distance: string;
}

export type EventGalleryMediaType = "image" | "video";
export type EventGalleryVideoSource = "upload" | "external";

export interface IEventGalleryItem {
  mediaType: EventGalleryMediaType;
  // Only meaningful when mediaType === "video".
  videoSource: EventGalleryVideoSource;
  fileUrl: string; // uploaded image, or uploaded video file
  externalUrl: string; // pasted link (YouTube / Instagram / TikTok / Vimeo / Facebook / other)
  provider: string; // derived from externalUrl, cached for convenience
  thumbnail: string; // optional/auto thumbnail for external video cards
  caption: string;
}

export interface IEvent {
  bannerImage: string;
  paypalQrImage: string;
  paypalHostedButtonId: string;
  title: string;
  slug: string;
  subtitle: string;
  eventDetails: IEventDetail;
  about: string;
  highlights: IEventHighlight[];
  coreValues: IEventCoreValue[];
  faqs: IEventFaq[];
  sponsorTiers: IEventSponsorTier[];
  gallery: IEventGalleryItem[];
  published: boolean;
  tags: string[];
  metaTitle: string;
  canonicalUrl: string;
  metaDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    bannerImage: { type: String, default: "" },
    paypalQrImage: { type: String, default: "" },
    paypalHostedButtonId: { type: String, default: "" },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: { type: String, default: "" },
    eventDetails: {
      date: { type: String, default: "" },
      time: { type: String, default: "" },
      location: { type: String, default: "" },
      distance: { type: String, default: "" },
    },
    about: { type: String, default: "" },
    highlights: {
      type: [{ label: String, icon: String }],
      default: [],
    },
    coreValues: {
      type: [{ label: String, icon: String }],
      default: [],
    },
    faqs: {
      type: [{ question: String, answer: String }],
      default: [],
    },
    sponsorTiers: {
      type: [
        {
          level: String,
          price: String,
          highlight: { type: Boolean, default: false },
          icon: { type: String, default: "star" },
          perks: [String],
        },
      ],
      default: [],
    },
    gallery: {
      type: [
        {
          mediaType: {
            type: String,
            enum: ["image", "video"],
            default: "image",
          },
          videoSource: {
            type: String,
            enum: ["upload", "external"],
            default: "upload",
          },
          fileUrl: { type: String, default: "" },
          externalUrl: { type: String, default: "" },
          provider: { type: String, default: "" },
          thumbnail: { type: String, default: "" },
          caption: { type: String, default: "" },
        },
      ],
      default: [],
    },
    published: { type: Boolean, default: false },
    tags: [{ type: String }],
    metaTitle: { type: String, default: "" },
    canonicalUrl: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
  },
  { timestamps: true },
);

export const Event = models.Event || model<IEvent>("Event", EventSchema);
