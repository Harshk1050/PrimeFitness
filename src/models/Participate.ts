import { Schema, model, models } from "mongoose";

export interface IParticipate {
  name: string;
  email: string;
  phone: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ParticipateSchema = new Schema<IParticipate>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventId: { type: String, required: true },
  },
  { timestamps: true },
);

export const Participate =
  models.Participate || model<IParticipate>("Participate", ParticipateSchema);
