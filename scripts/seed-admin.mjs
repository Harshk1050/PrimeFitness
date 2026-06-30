// Run: node scripts/seed-admin.mjs
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
envContent.split("\n").forEach((line) => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
});

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("MONGODB_URI not set in .env.local");
  process.exit(1);
}

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

await mongoose.connect(MONGODB_URI);

const email = "admin@primefitness.com";
const password = await bcrypt.hash("Admin@123", 10);
const name = "Admin";

await Admin.findOneAndUpdate(
  { email },
  { email, password, name },
  { upsert: true, new: true }
);

console.log(`✅ Admin seeded: ${email} / Admin@123`);
await mongoose.disconnect();
