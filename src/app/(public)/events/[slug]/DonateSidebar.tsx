"use client";

import {
  IconCalendar,
  IconClock,
  IconPin,
  IconRun,
} from "@/components/admin/events";

import { DonateSection } from "@/components/DonateSection";
import Image from "next/image";
import { Lock } from "lucide-react";
import { useState } from "react";

interface Props {
  event: any;
  formattedDate: string;
}

export default function DonateSidebar({ event, formattedDate }: Props) {
  const [tab, setTab] = useState("paypal");

  return (
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
            <span>{formattedDate}</span>
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

        <div className="flex justify-center items-center gap-4  border-t border-gray-200 pt-4">
          <div>
            <button
              onClick={() => setTab("paypal")}
              className="text-white bg-sky-600 text-[12px] py-1 px-6 rounded-lg "
            >
              Paypal
            </button>

            <div
              className={`${tab === "paypal" ? " bg-sky-600 h-0.5 mt-1" : "opacity-0 h-0.5 mt-1"}`}
            />
          </div>
          <div>
            <button
              onClick={() => setTab("zelle")}
              className="text-white bg-purple-700 text-[12px] py-1 px-6 rounded-lg"
            >
              Zelle
            </button>
            <div
              className={`${tab === "zelle" ? "block bg-purple-700 h-0.5 mt-1" : "opacity-0 h-0.5 mt-1"}`}
            />
          </div>
        </div>

        {tab === "paypal" ? (
          <>
            {event.paypalQrImage && (
              <div className="border-t border-slate-100  text-center">
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
            <div className="border-t border-slate-100 pt-4">
              <DonateSection
                eventId={event._id.toString()}
                eventTitle={event.title}
                eventSlug={event.slug}
                paypalHostedButtonId={event.paypalHostedButtonId || ""}
              />
            </div>
          </>
        ) : (
          <div>
            <div className="border-t border-slate-100  text-center">
              <p className="font-black uppercase text-sm mb-2">
                Scan to Donate
              </p>
              <div className="relative w-50 h-60 mx-auto rounded-xl overflow-hidden border border-slate-200">
                <Image
                  src={"/zelle.jpg"}
                  alt="Scan to donate QR code"
                  fill
                  className="object-fill"
                />
              </div>
            </div>
            <p className="py-3 flex items-center justify-center font-semibold gap-1.5 text-[12px] text-slate-500">
              <Lock className="w-4 h-4" /> Secure Donations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
