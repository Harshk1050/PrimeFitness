"use client";

import { HeartIcon, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

interface Props {
  eventId: string;
  eventTitle: string;
  eventSlug: string;
  paypalHostedButtonId: string;
}

export function DonateSection({
  eventId,
  eventTitle,
  eventSlug,
  paypalHostedButtonId,
}: Props) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    if (!open || !paypalHostedButtonId || rendered.current) return;

    const init = () => {
      if (!paypalRef.current || !window.paypal) return;
      rendered.current = true;
      paypalRef.current.innerHTML = "";
      window.paypal
        .HostedButtons({ hostedButtonId: paypalHostedButtonId })
        .render(paypalRef.current)
        .then(() => {
          fetch("/api/donations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: "PayPal Donor",
              email: "paypal@donor.com",
              amount: 0,
              eventId,
              eventTitle,
              eventSlug,
              paypalOrderId: `hosted-${Date.now()}`,
            }),
          });
        });
    };

    if (window.paypal) {
      init();
      return;
    }

    // remove stale script if any (e.g. different button id)
    const existing = document.getElementById("paypal-sdk");
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=BAAfrEoymptni2mDkzWfnDoPRSbLkD6obtQg0XstMPWxH2ehiwaspYHSzLZuF6HOf1XjLQlrN1pPu0HhFM&components=hosted-buttons&enable-funding=venmo&currency=USD";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, [open, paypalHostedButtonId, eventId, eventTitle, eventSlug]);

  if (done) {
    return (
      <div className="text-center space-y-2 py-2">
        <HeartIcon className="w-8 h-8 text-red-500 mx-auto" />
        <p className="font-black uppercase text-sm text-[#0f1f16]">
          Thank You!
        </p>
        <p className="text-xs text-slate-500">
          Your donation has been recorded.
        </p>
      </div>
    );
  }

  if (open) {
    return (
      <div className="space-y-3">
        {paypalHostedButtonId ? (
          <div ref={paypalRef} className="min-h-[50px]" />
        ) : (
          <p className="text-xs text-amber-600 text-center bg-amber-50 border border-amber-200 rounded-lg p-3">
            PayPal button not configured for this event yet.
          </p>
        )}
        <button
          onClick={() => {
            setOpen(false);
            rendered.current = false;
          }}
          className="text-xs text-slate-400 underline w-full text-center"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-[#f0a500] text-[#0f1f16] px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#ffb81c] transition-colors"
      >
        <HeartIcon className="w-4 h-4" /> Donate Now
      </button>
      <p className="flex items-center justify-center font-semibold gap-1.5 text-[12px] text-slate-500">
        <Lock className="w-4 h-4" /> Secure Donations
      </p>
    </div>
  );
}
