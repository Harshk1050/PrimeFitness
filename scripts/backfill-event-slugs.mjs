// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import { fileURLToPath } from "url";
// import { dirname, resolve } from "path";

// const __dirname = dirname(fileURLToPath(import.meta.url));
// dotenv.config({ path: resolve(__dirname, "../.env.local") });

// const MONGODB_URI = process.env.MONGODB_URI;
// if (!MONGODB_URI) throw new Error("MONGODB_URI not set");

// function slugify(text) {
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .trim()
//     .replace(/\s+/g, "-");
// }

// await mongoose.connect(MONGODB_URI);

// const Event = mongoose.model(
//   "Event",
//   new mongoose.Schema({ title: String, slug: String }, { strict: false }),
// );

// const events = await Event.find({ $or: [{ slug: { $exists: false } }, { slug: "" }, { slug: null }] });

// console.log(`Found ${events.length} events without a slug`);

// for (const event of events) {
//   let slug = slugify(event.title || "event");
//   // ensure uniqueness by appending id suffix if needed
//   const existing = await Event.findOne({ slug, _id: { $ne: event._id } });
//   if (existing) slug = `${slug}-${event._id.toString().slice(-4)}`;
//   await Event.updateOne({ _id: event._id }, { $set: { slug } });
//   console.log(`  Updated "${event.title}" → slug: "${slug}"`);
// }

// console.log("Done.");
// await mongoose.disconnect();
