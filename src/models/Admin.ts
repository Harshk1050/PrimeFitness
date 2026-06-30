import mongoose, { Schema, models, model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IAdmin {
  email: string;
  password: string;
  name: string;
}

const AdminSchema = new Schema<IAdmin>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

export const Admin = models.Admin || model<IAdmin>("Admin", AdminSchema);
