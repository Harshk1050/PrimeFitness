import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adaptive Fitness Fundraiser 2025 | Prime Fitness Plus",
  description:
    "Join us for a full day of adaptive fitness challenges, live demos, and community connection.",
};

const SCHEDULE = [
  { time: "10:00 AM", title: "Doors Open & Registration" },
  { time: "11:00 AM", title: "Adaptive Strength Showcase" },
  { time: "12:30 PM", title: "Lunch & Networking" },
  { time: "2:00 PM", title: "Para-Sport Demonstrations" },
  { time: "3:00 PM", title: "Fundraiser Raffle & Awards" },
  { time: "4:00 PM", title: "Closing Remarks" },
];

export default function EventPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="relative w-full h-[55vh] min-h-[380px] bg-slate-900">
        <Image
          src="/slide1.jpg"
          alt="Adaptive Fitness Fundraiser 2025"
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full px-6 pb-10">
          <div className="container mx-auto max-w-4xl">
            <span className="inline-block bg-green-500 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Community Event
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase text-white leading-tight tracking-tighter">
              Adaptive Fitness <br />
              <span className="text-green-400">Fundraiser 2025</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 text-white">
        <div className="container mx-auto max-w-4xl px-6 py-5 flex flex-wrap gap-6 text-sm font-medium">
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            August 16, 2025
          </span>
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            10:00 AM – 4:00 PM
          </span>
          <span className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Prime Fitness Plus, Toronto, ON
          </span>
        </div>
      </div>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-4 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-green-500 inline-block" />
                About This Event
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Join us for a full day of adaptive fitness challenges, live
                demonstrations, and community connection. This fundraiser brings
                together athletes, trainers, and supporters to celebrate
                inclusive fitness and raise funds for those who need it most.
              </p>
              <p className="text-slate-600 leading-relaxed mt-4">
                Every dollar raised goes directly toward subsidizing training
                sessions for individuals with disabilities who cannot afford
                access to adaptive fitness programs at Prime Fitness Plus.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase tracking-tight text-slate-900 mb-6 flex items-center gap-3">
                <span className="w-6 h-0.5 bg-green-500 inline-block" />
                Schedule
              </h2>
              <div className="space-y-3">
                {SCHEDULE.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:border-green-200 transition-colors"
                  >
                    <span className="text-green-600 font-black text-sm w-24 shrink-0">
                      {item.time}
                    </span>
                    <span className="w-px h-5 bg-slate-200 shrink-0" />
                    <span className="text-slate-800 font-medium text-sm">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-800 px-3 py-3">
                <h3 className="text-white font-semibold text-center uppercase tracking-tight text-base">
                  Support This Event
                </h3>
                <p className="text-slate-400 text-xs text-center mt-1">
                  Scan to donate via PayPal
                </p>
              </div>
              <div className="bg-white p-3 py-2! flex flex-col items-center gap-4">
                <div className="relative w-48 h-48 rounded-xl overflow-hidden ">
                  <Image
                    src="/paypal.jpg"
                    alt="PayPal QR Code"
                    fill
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="text-center">
                  <p className="text-slate-800 font-bold text-sm">
                    Scan with your camera
                  </p>
                </div>
                <div className="w-full border-t border-slate-100 pt-1 text-center">
                  <p className="text-xs text-slate-400">
                    100% of donations go toward <br />
                    adaptive fitness access programs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-6 bg-slate-900 text-center">
        <div className="container mx-auto max-w-xl">
          <h2 className="text-2xl font-black uppercase text-white mb-3">
            Have Questions?
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Reach out to learn more about the event or volunteering
            opportunities.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-green-500 text-slate-900 px-10 py-3.5 rounded-full font-black text-sm uppercase hover:bg-green-400 transition-colors tracking-widest"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
