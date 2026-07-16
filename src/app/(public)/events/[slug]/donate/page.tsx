"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { HeartIcon } from "lucide-react";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function DonatePage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<{ _id: string; title: string; slug: string; paypalButtonId?: string } | null>(null);
  const [form, setForm] = useState({ name: "", email: "", amount: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"form" | "paypal" | "done">("form");
  const paypalRef = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    fetch(`/api/events/by-slug/${slug}`)
      .then((r) => r.json())
      .then(setEvent);
  }, [slug]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email is required.";
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0) e.amount = "Enter a valid amount.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const loadPayPal = () => {
    if (!event?.paypalButtonId) return;
    if (scriptRef.current) scriptRef.current.remove();

    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=BAAfrEoymptni2mDkzWfnDoPRSbLkD6obtQg0XstMPWxH2ehiwaspYHSzLZuF6HOf1XjLQlrN1pPu0HhFM&components=hosted-buttons&enable-funding=venmo&currency=USD`;
    script.async = true;
    script.onload = () => {
      if (!paypalRef.current || !window.paypal) return;
      paypalRef.current.innerHTML = "";
      window.paypal
        .HostedButtons({ hostedButtonId: event.paypalButtonId })
        .render(paypalRef.current)
        .then(() => {
          // PayPal hosted buttons don't expose onApprove — record after render via polling or manual confirm
        });
    };
    document.body.appendChild(script);
    scriptRef.current = script;
  };

  const handleProceed = () => {
    if (!validate()) return;
    setStep("paypal");
    setTimeout(loadPayPal, 100);
  };

  const handleManualConfirm = async (paypalOrderId: string) => {
    await fetch("/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        amount: Number(form.amount),
        eventId: event!._id,
        eventTitle: event!.title,
        eventSlug: event!.slug,
        paypalOrderId,
      }),
    });
    setStep("done");
  };

  if (!event) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>;

  if (step === "done") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-6">
        <HeartIcon className="w-16 h-16 text-red-500" />
        <h1 className="text-3xl font-black uppercase text-[#0f1f16]">Thank You, {form.name}!</h1>
        <p className="text-slate-500 max-w-sm">Your donation to <strong>{event.title}</strong> has been recorded. We truly appreciate your support.</p>
        <button onClick={() => router.push(`/events/${slug}`)} className="mt-4 bg-[#f0a500] text-[#0f1f16] px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#ffb81c]">
          Back to Event
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16">
      <div className="max-w-lg mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-black uppercase text-[#0f1f16] tracking-tight">Donate</h1>
          <p className="text-slate-500 text-sm mt-1">{event.title}</p>
        </div>

        {step === "form" && (
          <div className="space-y-4">
            {(["name", "email", "amount"] as const).map((field) => (
              <div key={field}>
                <label className="block text-xs text-slate-500 mb-1 capitalize">{field === "amount" ? "Amount (USD)" : field}</label>
                <input
                  type={field === "email" ? "email" : field === "amount" ? "number" : "text"}
                  value={form[field]}
                  onChange={(e) => setForm((p) => ({ ...p, [field]: e.target.value }))}
                  placeholder={field === "amount" ? "e.g. 25" : ""}
                  className={`w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition-colors ${errors[field] ? "border-red-400 focus:ring-red-300 bg-red-50" : "border-slate-200 focus:ring-green-500"}`}
                />
                {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
              </div>
            ))}
            <div>
              <label className="block text-xs text-slate-500 mb-1">Message (optional)</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500 resize-none"
              />
            </div>
            <button
              onClick={handleProceed}
              className="w-full bg-[#f0a500] text-[#0f1f16] py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#ffb81c] transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        )}

        {step === "paypal" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600 space-y-1">
              <p><span className="font-semibold">Name:</span> {form.name}</p>
              <p><span className="font-semibold">Email:</span> {form.email}</p>
              <p><span className="font-semibold">Amount:</span> ${form.amount}</p>
            </div>

            {event.paypalButtonId ? (
              <>
                <div ref={paypalRef} />
                <div className="border-t pt-4 space-y-2">
                  <p className="text-xs text-slate-400 text-center">After completing PayPal payment, enter your PayPal Order ID below to confirm your donation.</p>
                  <input
                    id="paypal-order-id"
                    type="text"
                    placeholder="PayPal Order ID"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <button
                    onClick={() => {
                      const id = (document.getElementById("paypal-order-id") as HTMLInputElement)?.value?.trim();
                      if (!id) return alert("Please enter your PayPal Order ID.");
                      handleManualConfirm(id);
                    }}
                    className="w-full bg-[#0f1f16] text-white py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#1a3325] transition-colors"
                  >
                    Confirm Donation
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-sm text-slate-500">Scan the QR code to complete your PayPal donation, then confirm below.</p>
                <input
                  id="paypal-order-id"
                  type="text"
                  placeholder="PayPal Order ID (from PayPal receipt)"
                  className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => {
                    const id = (document.getElementById("paypal-order-id") as HTMLInputElement)?.value?.trim();
                    if (!id) return alert("Please enter your PayPal Order ID.");
                    handleManualConfirm(id);
                  }}
                  className="w-full bg-[#0f1f16] text-white py-3 rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#1a3325] transition-colors"
                >
                  Confirm Donation
                </button>
              </div>
            )}

            <button onClick={() => setStep("form")} className="text-xs text-slate-400 underline w-full text-center">
              ← Back
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
