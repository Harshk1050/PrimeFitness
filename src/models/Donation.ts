import { Schema, model, models } from "mongoose";

export interface IDonation {
  name: string;
  email: string;
  amount: number;
  message?: string;
  eventId: string;
  eventTitle: string;
  eventSlug: string;
  paypalOrderId: string;
  createdAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String, default: "" },
    eventId: { type: String, required: true },
    eventTitle: { type: String, required: true },
    eventSlug: { type: String, required: true },
    paypalOrderId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Donation = models.Donation || model<IDonation>("Donation", DonationSchema);
