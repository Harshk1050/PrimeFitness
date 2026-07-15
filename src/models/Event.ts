import mongoose, { Schema, model, models } from "mongoose";

export interface IEventHighlight {
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

export interface IEvent {
  bannerImage: string;
  title: string;
  slug: string;
  subtitle: string;
  eventDetails: IEventDetail;
  about: string;
  highlights: IEventHighlight[];
  faqs: IEventFaq[];
  sponsorTiers: IEventSponsorTier[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = new Schema<IEvent>(
  {
    bannerImage: { type: String, default: "" },
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
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Event = models.Event || model<IEvent>("Event", EventSchema);
