import {
  CORE_VALUE_ICONS,
  FEATURE_ICONS,
  IconCalendar,
  IconClock,
  IconCrown,
  IconHeart,
  IconMail,
  IconPin,
  IconRun,
  IconStar,
} from "@/components/admin/events";

import { Corinthia } from "next/font/google";
import { DonateSection } from "@/components/DonateSection";
import { Event } from "@/models/Event";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { connectDB } from "@/lib/mongoose";
import { notFound } from "next/navigation";

const corinthia = Corinthia({ weight: ["400", "700"] });

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  await connectDB();
  const { slug } = await params;
  const event = (await Event.findOne({ slug, published: true }).lean()) as any;
  if (!event) return {};

  return {
    title: event?.title || "Prime Fitness Plus",
    description: event?.metaDescription || event?.subtitle,
    alternates: {
      canonical: event.canonicalUrl || "https://primefitnessplusllc.com/events",
    },
    openGraph: {
      title: event.metaTitle || event.title,
      description: event.metaDescription || event.shortDescription,
      images: event.bannerImage ? [event.bannerImage] : [],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  await connectDB();
  const { slug } = await params;
  const event = (await Event.findOne({ slug, published: true }).lean()) as any;
  if (!event) notFound();

  console.log("event : ", event);

  const visibleFaqs = event.faqs?.filter(
    (faq: any) => faq.question?.trim() || faq.answer?.trim(),
  );

  const faqJsonLd =
    visibleFaqs && visibleFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: visibleFaqs.map((faq: any) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <div className="relative w-full min-h-[640px] bg-[#0f1f16] overflow-hidden">
        <Image
          src={event?.bannerImage || "/walk_run.jpg"}
          alt={event?.title}
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

        <div className="relative z-10 container mx-auto max-w-6xl px-6 pt-24 pb-10 grid lg:grid-cols-[1.4fr_0.6fr] gap-10 items-center">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black uppercase text-white leading-[0.95] tracking-tighter">
              {event?.title
                .split("/")
                .map((part: string, i: number, arr: string[]) => (
                  <span key={i}>
                    {part.trim()}
                    {i < arr.length - 1 && (
                      <>
                        {" "}
                        <span className="text-[#f0a500]">/</span>{" "}
                      </>
                    )}
                  </span>
                ))}
            </h1>

            {event?.subtitle && (
              <p className="mt-5 text-[#f0a500] font-bold tracking-wide flex items-center gap-2">
                <IconHeart className="w-4 h-4" />
                {event?.subtitle}
                <IconHeart className="w-4 h-4" />
              </p>
            )}

            {event?.tags?.length > 0 && (
              <>
                <span>·</span>
                <div className="flex gap-2 flex-wrap">
                  {event?.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-white border border-white rounded-xl p-1 px-3 text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-white text-sm">
              {event?.eventDetails?.date && (
                <span className="flex items-center gap-2">
                  <IconCalendar className="w-8 h-8 text-[#f0a500]" />
                  <span>{formatDate(event.eventDetails.date)}</span>
                </span>
              )}
              {event?.eventDetails?.time && (
                <span className="flex items-center gap-2">
                  <IconClock className="w-8 h-8 text-[#f0a500]" />
                  <span>{event?.eventDetails.time}</span>
                </span>
              )}
              {event?.eventDetails?.location && (
                <span className="flex items-center gap-2">
                  <IconPin className="w-8 h-8 text-[#f0a500]" />
                  <span>{event?.eventDetails?.location}</span>
                </span>
              )}
              {event?.eventDetails?.distance && (
                <span className="flex items-center gap-2">
                  <IconRun className="w-8 h-8 text-[#f0a500]" />
                  <span>
                    {event?.eventDetails?.distance}
                    <br />
                    <span className="text-white/60">
                      All Ages &amp; Abilities Welcome!
                    </span>
                  </span>
                </span>
              )}
            </div>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#donate"
                className="inline-flex items-center gap-2 bg-[#f0a500] text-[#0f1f16] px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#ffb81c] transition-colors"
              >
                Donate Now
                <HeartIcon className="w-8 h-8 text-red-500" />
              </a>
              {event?.sponsorTiers?.length > 0 && (
                <a
                  href="#sponsors"
                  className="inline-flex items-center gap-2 border-2 border-[#f0a500]/60 text-white px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
                >
                  Become a Sponsor
                </a>
              )}
            </div>
          </div>

          <div className="hidden lg:flex flex-col items-center gap-4">
            <img src="/ribbon_1.png" alt="ribbon" className="w-50 h-60" />
            <p
              className={`text-white/80 ${corinthia.className} font-bold text-4xl! text-center leading-relaxed`}
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
          <div className="lg:col-span-2 min-w-0 space-y-14">
            {event?.about && (
              <div>
                <div className="flex flex-col mb-4">
                  <h2 className="text-xl font-black uppercase mb-2 tracking-tight">
                    About the Event
                  </h2>
                  <div className="w-20 h-0.5 bg-[#f0a500]" />
                </div>

                <article
                  className="blog-content max-w-none"
                  dangerouslySetInnerHTML={{ __html: event.about }}
                />
              </div>
            )}

            {event?.coreValues?.length > 0 && (
              <div>
                {/* <div className="flex flex-col mb-6">
                  <h2 className="text-xl font-black uppercase mb-2 tracking-tight">
                    Core Values
                  </h2>
                  <div className="w-20 h-0.5 bg-[#f0a500]" />
                </div> */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 text-center">
                  {event?.coreValues?.map(
                    (h: { label: string; icon: string }) => (
                      <div
                        key={h?.icon}
                        className="flex flex-col items-center gap-2 text-slate-700  border border-[#e5d3ab] rounded-md p-2"
                      >
                        {CORE_VALUE_ICONS[h.label]}
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {event?.highlights?.length > 0 && (
              <div>
                <div className="flex flex-col mb-6">
                  <h2 className="text-xl font-black uppercase mb-2 tracking-tight">
                    Event Highlights
                  </h2>
                  <div className="w-20 h-0.5 bg-[#f0a500]" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 text-center">
                  {event?.highlights?.map(
                    (h: { label: string; icon: string }) => (
                      <div
                        key={h?.icon}
                        className="flex flex-col items-center gap-2 text-slate-700  border border-[#e5d3ab] rounded-md p-2"
                      >
                        {FEATURE_ICONS[h.icon] ?? FEATURE_ICONS["star"]}
                        <span className="text-xs font-semibold">
                          {h?.label}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            )}

            {event?.faqs?.length > 0 && (
              <div>
                <div className="flex flex-col mb-6">
                  <h2 className="text-xl font-black uppercase tracking-tight mb-1">
                    FAQ
                  </h2>
                  <span className="w-20 h-0.5 bg-[#f0a500] inline-block" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {event?.faqs.map(
                    (f: { question: string; answer: string }) => (
                      <details
                        key={f?.question}
                        className="group rounded-xl border border-slate-200 bg-white px-4 py-3 open:shadow-sm"
                      >
                        <summary className="flex items-center justify-between cursor-pointer list-none text-sm font-semibold text-slate-800">
                          {f?.question}
                          <span className="ml-3 text-[#f0a500] font-black group-open:rotate-45 transition-transform">
                            +
                          </span>
                        </summary>
                        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                          {f?.answer}
                        </p>
                      </details>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-2xl border border-[#f0a500]/40 overflow-hidden shadow-sm">
              <div className="bg-[#0f1f16] px-5 py-5">
                <h3 className="text-white font-black text-center uppercase tracking-wide text-sm">
                  Event Details
                </h3>
              </div>
              <div className="bg-white p-5 space-y-4 text-sm">
                {event?.eventDetails?.date && (
                  <div className="flex items-start gap-3">
                    <IconCalendar className="w-6 h-6 text-[#0f1f16]" />
                    <span>{formatDate(event.eventDetails.date)}</span>
                  </div>
                )}
                {event?.eventDetails?.time && (
                  <div className="flex items-start gap-3">
                    <IconClock className="w-6 h-6 text-[#0f1f16]" />
                    <span>{event?.eventDetails?.time}</span>
                  </div>
                )}
                {event?.eventDetails?.location && (
                  <div className="flex items-start gap-3">
                    <IconPin className="w-6 h-6 text-[#0f1f16]" />
                    <span>{event?.eventDetails?.location}</span>
                  </div>
                )}
                {event?.eventDetails?.distance && (
                  <div className="flex items-start gap-3">
                    <IconRun className="w-8 h-6 text-[#0f1f16]" />
                    <span>
                      {event?.eventDetails?.distance}
                      <br />
                      <span className="text-slate-500 text-xs">
                        All Ages &amp; Abilities Welcome!
                      </span>
                    </span>
                  </div>
                )}

                {event.paypalQrImage && (
                  <div className="border-t border-slate-100 pt-4 text-center">
                    <p className="font-black uppercase text-sm mb-2">
                      Scan to Donate
                    </p>
                    <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden border border-slate-200">
                      <Image
                        src={event.paypalQrImage}
                        alt="Scan to donate QR code"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                <div id="donate" className="border-t border-slate-100 pt-4">
                  {/* <DonateSection paypalQrImage={event.paypalQrImage || ""} /> */}
                  <DonateSection
                    eventId={event._id.toString()}
                    eventTitle={event.title}
                    eventSlug={event.slug}
                    paypalHostedButtonId={event.paypalHostedButtonId || ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* sponsors part */}
      {event?.sponsorTiers?.length > 0 && (
        <section id="sponsors" className="bg-[#0f1f16] py-16 px-6">
          <div className="container mx-auto max-w-6xl text-center">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white">
              Become a Sponsor
            </h2>
            <p
              className={`text-[#f0a500] ${corinthia.className} text-4xl! font-semibold mt-2`}
            >
              Partner with Purpose.
            </p>
            <p className="text-white/60 text-sm mt-3 max-w-xl mx-auto">
              Your sponsorship helps provide resources, raise awareness, and
              build a more inclusive community.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 xl:grid-cols-4 gap-5 text-left">
              {event?.sponsorTiers?.map((tier: any) => (
                <div
                  key={tier?.level}
                  className={`rounded-2xl group hover:text-black p-6 flex flex-col transition-all duration-300 bg-[#132a1d] hover:bg-white hover:border-[#f0a500]  border border-white/10 hover:border-[#f0a500]/70 hover:shadow-[0_0_25px_-5px_rgba(240,165,0,0.35)] `}
                >
                  <span className="  text-white/70 group-hover:text-[#f0a500]">
                    {tier?.icon === "crown" ? <IconCrown /> : <IconStar />}
                  </span>
                  <p
                    className={`mt-3 text-xs font-black uppercase tracking-widest  text-white/70 group-hover:text-[#f0a500]`}
                  >
                    {tier?.level}
                  </p>
                  <h3
                    className={`mt-1 text-2xl font-black text-white/80 group-hover:text-black `}
                  >
                    {tier?.price}
                  </h3>
                  <ul
                    className={`mt-5 space-y-2 text-xs flex-1   text-white/80 group-hover:text-slate-600 `}
                  >
                    {tier?.perks.filter(Boolean).map((p: string) => (
                      <li key={p} className="flex items-start gap-1.5">
                        <span className="text-emerald-400   group-hover:text-[#f0a500] ">
                          ✓
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="mailto:info@primefitnessplusllc.com"
                    className={`mt-6 bg-white group-hover:bg-[#f0a500] text-[#0f1f16] hover:bg-white/90 flex items-center justify-center gap-2 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-colors `}
                  >
                    <IconMail className="w-3.5 h-3.5" /> Sponsor Now
                  </Link>
                  <Link
                    href="mailto:info@primefitnessplusllc.com"
                    className="mt-2 text-center text-[11px] underline underline-offset-2 text-white/50 group-hover:text-gray-800"
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
                . Our team will reach out to discuss opportunities and how we
                can partner together.
              </span>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
