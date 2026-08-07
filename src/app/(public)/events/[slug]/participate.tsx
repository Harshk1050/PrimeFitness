"use client";

import { HeartIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

interface ParticipateDialogBoxProps {
  slug: string;
  eventId: string;
  eventTitle: string;
  open: boolean;
  onClose: () => void;
}

export default function ParticipateDialogBox({
  slug,
  eventId,
  eventTitle,
  open,
  onClose,
}: ParticipateDialogBoxProps) {
  const router = useRouter();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<"form" | "done">("form");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setStep("form");
      setForm({ name: "", email: "", phone: "" });
      setErrors({});
    }
  }, [open]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address.";
    if (
      !form.phone.trim() ||
      !/^[+]?[(]?\d{1,4}[)]?[-\s.]?\d{1,4}[-\s.]?\d{4,10}$/.test(
        form.phone.trim(),
      )
    )
      e.phone = "Enter a valid phone number (e.g. 555-123-4567).";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleProceed = async () => {
    if (!validate() || !eventId) return;

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      eventId,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/participations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit participation");
      setStep("done");
    } catch (err) {
      console.error(err);
      setErrors((p) => ({ ...p, form: "Something went wrong. Try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="  z-999! relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
          aria-label="Close"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {!eventId ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            Loading...
          </div>
        ) : step === "done" ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <HeartIcon className="w-16 h-16 text-red-500" />
            <h1 className="text-3xl font-black uppercase text-[#0f1f16]">
              Thank You, {form.name}!
            </h1>
            <p className="max-w-sm text-slate-500">
              Your registration for <strong>{eventTitle}</strong> has been
              recorded. We truly appreciate your support.
            </p>
            <button
              onClick={() => {
                onClose();
                router.push(`/events/${slug}`);
              }}
              className="mt-4 rounded-full bg-[#f0a500] px-8 py-3 text-sm font-black uppercase tracking-widest text-[#0f1f16] hover:bg-[#ffb81c]"
            >
              Back to Event
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-[#0f1f16]">
              Participate in {eventTitle}
            </h2>

            {(["name", "email", "phone"] as const).map((field) => (
              <div key={field}>
                <label
                  className={` mb-1  block text-xs capitalize text-slate-500`}
                >
                  {field}
                </label>
                <input
                  type={
                    field === "email"
                      ? "email"
                      : field === "phone"
                        ? "tel"
                        : "text"
                  }
                  value={form[field]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [field]: e.target.value }))
                  }
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 ${
                    errors[field]
                      ? "border-red-400 bg-red-50 focus:ring-red-300"
                      : "border-slate-200 focus:ring-green-500"
                  }`}
                />
                {errors[field] && (
                  <p className="mt-1 text-xs text-red-500">{errors[field]}</p>
                )}
              </div>
            ))}

            {errors.form && (
              <p className="text-xs text-red-500">{errors.form}</p>
            )}

            <button
              onClick={handleProceed}
              disabled={submitting}
              className="w-full rounded-full bg-[#f0a500] py-3 text-sm font-bold uppercase tracking-widest text-[#0f1f16] transition-colors hover:bg-[#ffb81c] disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Continue to participation"}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
