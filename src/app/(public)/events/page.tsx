import { HeartIcon, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Corinthia } from "next/font/google";

const corinthia = Corinthia({
  weight: ["400", "700"],
});
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Walk/Run for Autism Awareness | Prime Fitness Plus",
  description:
    "One mile. One community. Endless possibilities. Join Prime Fitness Plus for the Walk/Run for Autism Awareness — a day of unity, acceptance, and hope.",
};

function IconCalendar({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}
function IconClock({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
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
  );
}
function IconPin({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}
function IconRun({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 4a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM9 20l2-6-2-2 1-5 4 1 2 3h3M6 12l3-2 3 2-2 3-4 1"
      />
    </svg>
  );
}
function IconHeart({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21s-6.7-4.35-9.3-8.2C.8 9.7 1.9 6 5.2 5c2-.6 3.9.3 4.8 2 1-1.7 2.8-2.6 4.8-2 3.3 1 4.4 4.7 2.5 7.8C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}
function IconMail({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}
function IconLock({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-12v3H8V7a4 4 0 118 0z"
      />
    </svg>
  );
}
function IconCrown({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M3 8l4 3 5-6 5 6 4-3-2 11H5L3 8zm2 13h14v2H5v-2z" />
    </svg>
  );
}
function IconStar({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

const FEATURE_ICONS: Record<string, JSX.Element> = {
  family: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 11a3 3 0 100-6 3 3 0 000 6zm7-1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20c0-3 3-5 7-5s7 2 7 5m1-8c2.8 0 5 1.6 5 4.5"
      />
    </svg>
  ),
  vendor: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M4 8l1-4h14l1 4M4 8v11a1 1 0 001 1h14a1 1 0 001-1V8M4 8h16M9 21v-6h6v6"
      />
    </svg>
  ),
  music: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 18V5l11-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm11-2a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  gift: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M20 12v9H4v-9M2 7h20v5H2V7zm10 0V22M12 7C10 3 6 3 6 6s3 1 6 1zm0 0c2-4 6-4 6-1s-3 1-6 1z"
      />
    </svg>
  ),
  map: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 20l-6 2V6l6-2 6 2 6-2v16l-6 2-6-2zm0-16v16m6-14v16"
      />
    </svg>
  ),
  kids: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="7" r="3" strokeWidth={1.7} />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M8 21c0-3 2-5 4-5s4 2 4 5"
      />
    </svg>
  ),
  puzzle: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M9 4h4v2.5a1.5 1.5 0 003 0V4h4v4h-2.5a1.5 1.5 0 000 3H20v4h-4v-2.5a1.5 1.5 0 00-3 0V15H9v-4H6.5a1.5 1.5 0 010-3H9V4z"
      />
    </svg>
  ),
  volunteer: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M12 21s-6-4.5-8.5-8C1.5 9.5 3 6 6.5 6c1.7 0 3 .9 3.5 2 .5-1.1 1.8-2 3.5-2 1 0 1.9.3 2.6.8M14 4l3 3-5 5-3-3M20 10l1 1-3 3-1-1"
      />
    </svg>
  ),
};

const STATIC_VALUES = [
  {
    title: "Inclusion",
    copy: "Creating opportunities for everyone.",
    icon: "family",
  },
  {
    title: "Awareness",
    copy: "Building understanding through community.",
    icon: "puzzle",
  },
  {
    title: "Community",
    copy: "Supporting local families together.",
    icon: "family",
  },
  {
    title: "Acceptance",
    copy: "Creating lasting positive change.",
    icon: "gift",
  },
] as const;

const HIGHLIGHTS = [
  { label: "Family Fun", icon: "family" },
  { label: "Food Vendors", icon: "vendor" },
  { label: "Music", icon: "music" },
  { label: "Giveaways", icon: "gift" },
  { label: "Local Resources", icon: "map" },
  { label: "Kids Activities", icon: "kids" },
  { label: "Autism Booths", icon: "puzzle" },
  { label: "Volunteer", icon: "volunteer" },
] as const;

const FAQS = [
  {
    q: "Is registration required to participate?",
    a: "Yes — a quick sign-up helps us plan supplies, routes, and safety for every walker and runner.",
  },
  {
    q: "Can I donate if I can't attend?",
    a: "Absolutely. Scan the QR code on this page or use the Donate Now button to give from anywhere.",
  },
  {
    q: "Can children participate in the walk/run?",
    a: "Yes, this is a family-friendly event welcoming all ages and abilities.",
  },
  {
    q: "Can businesses become sponsors?",
    a: "Yes — see the sponsorship levels below or email us to design a custom partnership.",
  },
  {
    q: "Is there a fee to participate?",
    a: "The walk/run is free to join; donations are welcomed and go directly to adaptive fitness access programs.",
  },
  {
    q: "How can I volunteer?",
    a: "Reach out through the Contact Us page and our team will match you with a role for the day.",
  },
];

const SPONSOR_TIERS = [
  {
    level: "Presenting Sponsor",
    price: "$2,500",
    highlight: true,
    icon: "crown",
    perks: [
      "Presenting Sponsor Recognition",
      "Logo on Event Banner",
      "Logo on Event T-Shirt",
      "Website Recognition",
      "Social Media Promotion",
      "Stage Recognition",
      "Vendor Booth (10x10)",
    ],
  },
  {
    level: "Gold Sponsor",
    price: "$1,000",
    highlight: false,
    icon: "star",
    perks: [
      "Event Signage",
      "Website Recognition",
      "Social Media Mention",
      "Stage Recognition",
      "Vendor Booth (10x10)",
    ],
  },
  {
    level: "Silver Sponsor",
    price: "$500",
    highlight: false,
    icon: "star",
    perks: ["Website Recognition", "Social Media Mention", "Stage Recognition"],
  },
  {
    level: "Bronze Sponsor",
    price: "$300",
    highlight: false,
    icon: "star",
    perks: ["Event Recognition", "Vendor Booth (10x10)"],
  },
] as const;

export default function EventPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="relative w-full min-h-[640px] bg-[#0f1f16] overflow-hidden">
        <Image
          src="/walk_run.jpg"
          alt="Walk/Run for Autism Awareness"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f1f16]/90 via-[#0f1f16]/60 to-[#0f1f16]" />

        <div className="absolute -top-6 left-6 z-20 w-24 h-24 rounded-full border-2 border-[#f0a500] bg-[#0f1f16] flex flex-col items-center justify-center text-[#f0a500] text-center leading-none">
          <span className="text-[9px] font-black tracking-widest">PRIME</span>
          <span className="text-[9px] font-black tracking-widest">
            FITNESS PLUS
          </span>
          <span className="text-[7px] mt-1 tracking-wider">
            1 CORINTHIANS 9:27
          </span>
        </div>

        {/* headline + ribbon */}
        <div className="relative z-10 container mx-auto max-w-6xl px-6 pt-24 pb-10 grid lg:grid-cols-[1.4fr_0.6fr] gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-white leading-[0.95] tracking-tighter">
              Walk <span className="text-[#f0a500]">/</span> Run
              <br />
              for
              <br />
              Autism Awareness
            </h1>
            <p className="mt-5 text-[#f0a500] font-bold tracking-wide flex items-center gap-2">
              <IconHeart className="w-4 h-4" /> One Mile. One Community. Endless
              Possibilities. <IconHeart className="w-4 h-4" />
            </p>

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-white text-sm">
              <span className="flex items-center gap-2">
                <IconCalendar className="w-8 h-8 text-[#f0a500]" />
                <span>
                  Saturday
                  <br />
                  October 10, 2026
                </span>
              </span>
              <span className="flex items-center gap-2">
                <IconClock className="w-8 h-8 text-[#f0a500]" />
                <span>10:00 AM – 4:00 PM</span>
              </span>
              <span className="flex items-center gap-2">
                <IconPin className="w-8 h-8 text-[#f0a500]" />
                <span>
                  De Benedetti Park
                  <br />
                  Lodi, CA 95240
                </span>
              </span>
              <span className="flex items-center gap-2">
                <IconRun className="w-8 h-8 text-[#f0a500]" />
                <span>
                  1 Mile Walk / Run
                  <br />
                  <span className="text-white/60">
                    All Ages &amp; Abilities Welcome!
                  </span>
                </span>
              </span>
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 bg-[#f0a500] text-[#0f1f16] px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#ffb81c] transition-colors"
              >
                Donate Now
                <HeartIcon className="w-8 h-8 text-red-500" />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 border-2 border-[#f0a500]/60 text-white px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>

          {/* ribbon part*/}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <img src="/ribbon_1.png" alt="ribbon" className="w-50 h-60" />

            <p
              className={`text-white/80 ${corinthia.className} font-bold  text-4xl! text-center leading-relaxed`}
            >
              Every Step Counts.
              <br />
              Every Person Matters.
            </p>
          </div>
        </div>
      </div>

      <section className="py-16 px-6">
        <div className="container mx-auto max-w-6xl grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-14">
            {/* about */}
            <div>
              <div className="flex flex-col mb-4">
                <h2 className="text-xl font-black uppercase mb-2 tracking-tight  flex items-center gap-3 ">
                  About the Event
                </h2>
                <div className="w-20 h-0.5 bg-[#f0a500] inline-block"> </div>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  The Walk/Run for Autism Awareness is more than just an event —
                  it&apos;s a movement toward a more inclusive and understanding
                  community.
                </p>
                <p>
                  Your support helps provide essential resources, programs, and
                  opportunities for individuals with autism and disabilities, as
                  well as their families.
                </p>
                <p>
                  Whether you walk, run, volunteer, or donate, you&apos;re
                  making a real difference in creating a future where everyone
                  belongs.
                </p>
                <p>
                  Join us for a day of unity, acceptance, and hope as we take
                  steps together for awareness and inclusion.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                {STATIC_VALUES?.map((v) => (
                  <div key={v.title}>
                    <div className="mx-auto mb-3 w-14 h-14 rounded-full border-2 border-[#f0a500] flex items-center justify-center text-[#f0a500]">
                      {FEATURE_ICONS[v.icon]}
                    </div>
                    <p className="font-black uppercase text-sm tracking-tight">
                      {v.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{v.copy}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col mb-6">
                <h2 className="text-xl font-black uppercase mb-2 tracking-tight  flex items-center gap-3">
                  Event Highlights
                </h2>
                <div className="w-20 h-0.5 bg-[#f0a500] inline-block"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 text-center">
                {HIGHLIGHTS.map((h) => (
                  <div
                    key={h.label}
                    className="flex flex-col items-center gap-2 text-slate-700"
                  >
                    {FEATURE_ICONS[h.icon]}
                    <span className="text-xs font-semibold">{h.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-col mb-6">
                <h2 className="text-xl font-black uppercase tracking-tight mb-1 flex items-center gap-3">
                  FAQ
                </h2>
                <div>
                  <span className="w-20 h-0.5 bg-[#f0a500] inline-block" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {FAQS.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-xl border border-slate-200 bg-white px-4 py-3 open:shadow-sm"
                  >
                    <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-slate-800">
                      {f.q}
                      <span className="ml-3 text-[#f0a500] font-black group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-[#f0a500]/40 overflow-hidden shadow-sm">
              <div className="bg-[#0f1f16] px-5 py-5">
                <h3 className="text-white font-black text-center uppercase tracking-wide text-sm">
                  Event Details
                </h3>
              </div>
              <div className="bg-white p-5 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <IconCalendar className="w-6 h-6 text-[#0f1f16] " />
                  <span>Saturday, October 10, 2026</span>
                </div>
                <div className="flex items-start gap-3">
                  <IconClock className="w-6 h-6 text-[#0f1f16] " />
                  <span>10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex items-start gap-3">
                  <IconPin className="w-6 h-6 text-[#0f1f16] " />
                  <span>Stockton, CA 95209</span>
                </div>
                <div className="flex items-start gap-3">
                  <IconRun className="w-8 h-6 text-[#0f1f16] " />
                  <span>
                    1 Mile Walk / Run
                    <br />
                    <span className="text-slate-500 text-xs">
                      All Ages &amp; Abilities Welcome!
                    </span>
                  </span>
                </div>

                <div className="border-t border-slate-100 pt-4 text-center">
                  <p className="font-black uppercase text-sm">Scan to Donate</p>
                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    Your donation helps create a more inclusive community.
                  </p>
                  <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src="/paypal.jpg"
                      alt="Scan to donate QR code"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                <Link
                  href="/donate"
                  className="mt-2 flex items-center justify-center gap-2 bg-[#f0a500] text-[#0f1f16] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#ffb81c] transition-colors"
                >
                  <HeartIcon className="w-4 h-4" /> Donate Now
                </Link>
                <p className="flex items-center justify-center font-semibold gap-1.5 text-[12px] text-slate-500">
                  <Lock className="w-4 h-4" />
                  Secure Donations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*sponsorship part */}
      <section className="bg-[#0f1f16] py-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
            Become a Sponsor
          </h2>
          <p
            className={`text-[#f0a500] ${corinthia.className} text-4xl!  font-semibold mt-2`}
          >
            Partner with Purpose.
          </p>
          <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">
            Your sponsorship helps provide resources, raise awareness, and build
            a more inclusive community.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5 text-left">
            {SPONSOR_TIERS.map((tier) => (
              <div
                key={tier.level}
                className={`rounded-2xl p-6 flex flex-col ${
                  tier.highlight
                    ? "bg-white border-2 border-[#f0a500]"
                    : "bg-white/[0.04] border border-white/10"
                }`}
              >
                <span
                  className={
                    tier.highlight ? "text-[#f0a500]" : "text-white/70"
                  }
                >
                  {tier.icon === "crown" ? <IconCrown /> : <IconStar />}
                </span>
                <p
                  className={`mt-3 text-xs font-black uppercase tracking-widest ${
                    tier.highlight ? "text-[#c8860a]" : "text-white/80"
                  }`}
                >
                  {tier.level}
                </p>
                <h3
                  className={`mt-1 text-2xl font-black ${tier.highlight ? "text-slate-900" : "text-white"}`}
                >
                  {tier.price}
                </h3>

                <ul
                  className={`mt-5 space-y-2 text-xs flex-1 ${tier.highlight ? "text-slate-600" : "text-white/70"}`}
                >
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-start gap-1.5">
                      <span
                        className={
                          tier.highlight ? "text-[#f0a500]" : "text-emerald-400"
                        }
                      >
                        ✓
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/events"
                  className={`mt-6 flex items-center justify-center gap-2 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-colors ${
                    tier.highlight
                      ? "bg-[#f0a500] text-[#0f1f16] hover:bg-[#ffb81c]"
                      : "bg-white text-[#0f1f16] hover:bg-white/90"
                  }`}
                >
                  <IconMail className="w-3.5 h-3.5" /> Sponsor Now
                </Link>
                <Link
                  href="mailto:info@primefitnessplusllc.com"
                  className="mt-2 text-center text-[11px] underline underline-offset-2 text-white/50 hover:text-white"
                >
                  Email Us
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-white/95 rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-slate-700">
            <IconMail className="w-4 h-4 text-[#0f1f16]" />
            <span>
              Interested in sponsoring? Contact us at{" "}
              <span className="font-semibold">
                info@primefitnessplusllc.com
              </span>
              . Our team will reach out to discuss opportunities and how we can
              partner together.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
