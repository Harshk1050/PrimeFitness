import { Event } from "@/models/Event";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/mongoose";

export const metadata: Metadata = {
  title: "Events | Prime Fitness Plus",
  description:
    "Join Prime Fitness Plus for upcoming community events, walks, runs, and more.",
};

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function EventsPage() {
  await connectDB();
  const events = (await Event.find({ published: true })
    .sort({ createdAt: -1 })
    .lean()) as any[];

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="bg-slate-900 pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10 text-center">
          <span className="text-green-500 font-bold uppercase tracking-[0.3em] text-sm block mb-4">
            Upcoming <span className="text-[#f0a500]">Events</span>
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase leading-none tracking-tighter text-white">
            Our <span className="text-green-500">Events</span>
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-xl mx-auto font-medium">
            Community events, walks, runs, and more — join us and make a
            difference.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          {events?.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-lg font-medium">No upcoming events</p>
              <p className="text-sm mt-1">Check back soon!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events
                ?.filter((e) => e?.slug)
                .map((event) => (
                  <Link
                    key={event._id.toString()}
                    href={`/events/${event.slug}`}
                    className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative w-full h-52 bg-[#0f1f16]">
                      {event?.bannerImage ? (
                        <Image
                          src={event?.bannerImage}
                          alt={event?.title}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-[#f0a500] text-4xl font-black opacity-20">
                          PF+
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-2">
                      {event?.eventDetails?.date && (
                        <p className="text-xs font-bold text-[#f0a500] uppercase tracking-widest">
                          {formatDate(event.eventDetails.date)}
                        </p>
                      )}
                      <h2 className="font-black text-slate-900 text-lg leading-tight group-hover:text-[#0f1f16] transition-colors">
                        {event?.title || "-"}
                      </h2>
                      {event?.subtitle && (
                        <p className="text-sm text-slate-500 line-clamp-2">
                          {event?.subtitle || "-"}
                        </p>
                      )}
                      {event?.eventDetails?.location && (
                        <p className="text-xs text-slate-400">
                          {event?.eventDetails?.location}
                        </p>
                      )}
                      <span className="inline-block mt-2 text-xs font-bold text-[#f0a500] uppercase tracking-widest group-hover:underline">
                        Learn More →
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
