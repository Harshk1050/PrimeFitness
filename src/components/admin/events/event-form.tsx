"use client";

import { useEffect, useState } from "react";

import { RichTextEditor } from "@/components/admin/blogs/rich-text-editor";
import { useRouter } from "next/navigation";

export const HIGHLIGHT_OPTIONS = [
  { label: "Family Fun", icon: "family" },
  { label: "Food Vendors", icon: "vendor" },
  { label: "Music", icon: "music" },
  { label: "Giveaways", icon: "gift" },
  { label: "Local Resources", icon: "map" },
  { label: "Kids Activities", icon: "kids" },
  { label: "Autism Booths", icon: "puzzle" },
  { label: "Volunteer", icon: "volunteer" },
  { label: "Awards", icon: "crown" },
  { label: "Raffle", icon: "star" },
] as const;

type Highlight = { label: string; icon: string };
type Faq = { question: string; answer: string };
type SponsorTier = {
  level: string;
  price: string;
  highlight: boolean;
  icon: string;
  perks: string[];
};
type EventDetail = {
  date: string;
  time: string;
  location: string;
  distance: string;
};

type EventFormData = {
  bannerImage: string;
  title: string;
  slug: string;
  subtitle: string;
  eventDetails: EventDetail;
  about: string;
  highlights: Highlight[];
  faqs: Faq[];
  sponsorTiers: SponsorTier[];
  published: boolean;
};

interface Props {
  initialData?: Partial<EventFormData> & { _id?: string };
  mode: "create" | "edit";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function inputCls(error?: boolean) {
  return `w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition-colors ${
    error
      ? "border-red-400 focus:ring-red-300 bg-red-50"
      : "border-slate-200 focus:ring-green-500"
  }`;
}

const EMPTY_TIER: SponsorTier = {
  level: "",
  price: "",
  highlight: false,
  icon: "star",
  perks: [""],
};

export function EventForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    initialData?.bannerImage || "",
  );
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState<EventFormData>({
    bannerImage: initialData?.bannerImage || "",
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    subtitle: initialData?.subtitle || "",
    eventDetails: initialData?.eventDetails || {
      date: "",
      time: "",
      location: "",
      distance: "",
    },
    about: initialData?.about || "",
    highlights: initialData?.highlights?.length ? initialData.highlights : [],
    faqs: initialData?.faqs?.length
      ? initialData.faqs
      : [{ question: "", answer: "" }],
    sponsorTiers: initialData?.sponsorTiers?.length
      ? initialData.sponsorTiers
      : [{ ...EMPTY_TIER }],
    published: initialData?.published ?? false,
  });

  const set = (key: keyof EventFormData, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      ...(mode === "create" ? { slug: slugify(title) } : {}),
    }));
  };

  const setDetail = (key: keyof EventDetail, value: string) =>
    setForm((prev) => ({
      ...prev,
      eventDetails: { ...prev.eventDetails, [key]: value },
    }));

  const toggleHighlight = (option: Highlight) => {
    const exists = form.highlights.some((h) => h.icon === option.icon);
    set(
      "highlights",
      exists
        ? form.highlights.filter((h) => h.icon !== option.icon)
        : [...form.highlights, option],
    );
  };

  const updateFaq = (i: number, field: keyof Faq, value: string) =>
    set(
      "faqs",
      form.faqs.map((f, idx) => (idx === i ? { ...f, [field]: value } : f)),
    );
  const addFaq = () =>
    set("faqs", [...form.faqs, { question: "", answer: "" }]);
  const removeFaq = (i: number) =>
    set(
      "faqs",
      form.faqs.length > 1
        ? form.faqs.filter((_, idx) => idx !== i)
        : form.faqs,
    );

  // Sponsor tiers
  const updateTier = (i: number, field: keyof SponsorTier, value: any) =>
    set(
      "sponsorTiers",
      form.sponsorTiers.map((t, idx) =>
        idx === i ? { ...t, [field]: value } : t,
      ),
    );
  const updatePerk = (tierIdx: number, perkIdx: number, value: string) => {
    const tiers = form.sponsorTiers.map((t, i) => {
      if (i !== tierIdx) return t;
      const perks = t.perks.map((p, j) => (j === perkIdx ? value : p));
      return { ...t, perks };
    });
    set("sponsorTiers", tiers);
  };
  const addPerk = (tierIdx: number) =>
    set(
      "sponsorTiers",
      form.sponsorTiers.map((t, i) =>
        i === tierIdx ? { ...t, perks: [...t.perks, ""] } : t,
      ),
    );
  const removePerk = (tierIdx: number, perkIdx: number) =>
    set(
      "sponsorTiers",
      form.sponsorTiers.map((t, i) =>
        i === tierIdx
          ? { ...t, perks: t.perks.filter((_, j) => j !== perkIdx) }
          : t,
      ),
    );
  const addTier = () =>
    set("sponsorTiers", [...form.sponsorTiers, { ...EMPTY_TIER }]);
  const removeTier = (i: number) =>
    set(
      "sponsorTiers",
      form.sponsorTiers.filter((_, idx) => idx !== i),
    );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setPreviewObjectUrl(previewUrl);
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data?.url) throw new Error("Upload failed");
      set("bannerImage", data.url);
      setImagePreview(data.url);
      if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        setPreviewObjectUrl(null);
      }
    } catch {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    };
  }, [previewObjectUrl]);

  const handleSubmit = async (published: boolean) => {
    if (!form.title.trim()) return alert("Title is required.");
    setSaving(true);
    const payload = {
      ...form,
      published,
      faqs: form.faqs.filter((f) => f.question.trim() || f.answer.trim()),
      sponsorTiers: form.sponsorTiers.filter((t) => t.level.trim()),
    };
    const url =
      mode === "edit" ? `/api/events/${initialData?._id}` : "/api/events";
    const method = mode === "edit" ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) router.push("/admin/events");
    else alert("Failed to save. Please try again.");
  };

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-green-600">
          {mode === "create" ? "New Event" : "Edit Event"}
        </h2>
        <div className="flex gap-3">
          <button
            disabled={saving}
            onClick={() => handleSubmit(false)}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            disabled={saving}
            onClick={() => handleSubmit(true)}
            className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Banner Image
            </h3>
            {imagePreview && (
              <div className="relative w-full h-52 rounded-lg overflow-hidden border border-slate-200">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => {
                    set("bannerImage", "");
                    setImagePreview("");
                    if (previewObjectUrl) {
                      URL.revokeObjectURL(previewObjectUrl);
                      setPreviewObjectUrl(null);
                    }
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            )}
            <label className="block">
              <span className="block text-xs text-slate-500 mb-1">
                Upload Banner
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-green-50 file:text-green-700 file:font-medium hover:file:bg-green-100"
              />
              {uploadingImage && (
                <span className="text-xs text-slate-400 mt-1 block">
                  Uploading...
                </span>
              )}
            </label>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Core Details
            </h3>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Event Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Walk/Run for Autism Awareness"
                className={inputCls(!form.title) + " font-medium"}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Slug *
              </label>
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="walk-run-autism-awareness-2026"
                className={inputCls(!form.slug) + " font-mono text-slate-600"}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Subtitle
              </label>
              <input
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="One Mile. One Community. Endless Possibilities."
                className={inputCls()}
              />
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Event Details
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Date
                </label>
                <input
                  value={form.eventDetails.date}
                  onChange={(e) => setDetail("date", e.target.value)}
                  placeholder="Saturday, October 10, 2026"
                  className={inputCls()}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Time
                </label>
                <input
                  value={form.eventDetails.time}
                  onChange={(e) => setDetail("time", e.target.value)}
                  placeholder="10:00 AM – 4:00 PM"
                  className={inputCls()}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Location
                </label>
                <input
                  value={form.eventDetails.location}
                  onChange={(e) => setDetail("location", e.target.value)}
                  placeholder="De Benedetti Park, Lodi, CA 95240"
                  className={inputCls()}
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Distance / Format
                </label>
                <input
                  value={form.eventDetails.distance}
                  onChange={(e) => setDetail("distance", e.target.value)}
                  placeholder="1 Mile Walk / Run"
                  className={inputCls()}
                />
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              About the Event
            </h3>
            <RichTextEditor
              value={form.about}
              onChange={(v) => set("about", v)}
            />
          </div>

          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Event Highlights
            </h3>
            <p className="text-xs text-slate-400">
              Select highlights to display on the event page.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {HIGHLIGHT_OPTIONS.map((opt) => {
                const active = form.highlights.some((h) => h.icon === opt.icon);
                return (
                  <button
                    key={opt.icon}
                    type="button"
                    onClick={() => toggleHighlight(opt)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                      active
                        ? "bg-green-50 border-green-500 text-green-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${active ? "bg-green-500" : "bg-slate-300"}`}
                    />
                    {opt.label}
                  </button>
                );
              })}
            </div>
            {form.highlights.length > 0 && (
              <p className="text-xs text-slate-500">
                Selected: {form.highlights.map((h) => h.label).join(", ")}
              </p>
            )}
          </div>

          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
                FAQs
              </h3>
              <button
                type="button"
                onClick={addFaq}
                className="text-sm font-semibold text-green-600 hover:text-green-700"
              >
                + Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {form.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      FAQ {i + 1}
                    </p>
                    {form.faqs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFaq(i)}
                        className="text-xs font-medium text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    value={faq.question}
                    onChange={(e) => updateFaq(i, "question", e.target.value)}
                    placeholder="Question"
                    className={inputCls()}
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, "answer", e.target.value)}
                    rows={3}
                    placeholder="Answer"
                    className={inputCls() + " resize-none"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sponsor Tiers */}
          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
                Sponsor Tiers
              </h3>
              <button
                type="button"
                onClick={addTier}
                className="text-sm font-semibold text-green-600 hover:text-green-700"
              >
                + Add Tier
              </button>
            </div>
            <div className="space-y-5">
              {form.sponsorTiers.map((tier, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-slate-200 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      Tier {i + 1}
                    </p>
                    {form.sponsorTiers.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTier(i)}
                        className="text-xs font-medium text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">
                        Level Name
                      </label>
                      <input
                        value={tier.level}
                        onChange={(e) => updateTier(i, "level", e.target.value)}
                        placeholder="Presenting Sponsor"
                        className={inputCls()}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">
                        Price
                      </label>
                      <input
                        value={tier.price}
                        onChange={(e) => updateTier(i, "price", e.target.value)}
                        placeholder="$2,500"
                        className={inputCls()}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div>
                      <label className="block text-xs text-slate-500 mb-1">
                        Icon
                      </label>
                      <select
                        value={tier.icon}
                        onChange={(e) => updateTier(i, "icon", e.target.value)}
                        className={inputCls()}
                      >
                        <option value="crown">Crown (Presenting)</option>
                        <option value="star">Star</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <button
                        type="button"
                        onClick={() =>
                          updateTier(i, "highlight", !tier.highlight)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${tier.highlight ? "bg-green-600" : "bg-slate-300"}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${tier.highlight ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                      <span className="text-xs text-slate-600">
                        Featured tier
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs text-slate-500">
                        Perks
                      </label>
                      <button
                        type="button"
                        onClick={() => addPerk(i)}
                        className="text-xs font-semibold text-green-600 hover:text-green-700"
                      >
                        + Add Perk
                      </button>
                    </div>
                    <div className="space-y-2">
                      {tier.perks.map((perk, j) => (
                        <div key={j} className="flex gap-2">
                          <input
                            value={perk}
                            onChange={(e) => updatePerk(i, j, e.target.value)}
                            placeholder={`Perk ${j + 1}`}
                            className={inputCls()}
                          />
                          {tier.perks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removePerk(i, j)}
                              className="text-red-400 hover:text-red-600 text-xs px-2"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* rigght part */}
        <div className="space-y-6">
          <div className="border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Status
            </h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => set("published", !form.published)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${form.published ? "bg-green-600" : "bg-slate-300"}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
              <span className="text-sm font-medium text-slate-700">
                {form.published ? "Published" : "Draft"}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              disabled={saving}
              onClick={() => handleSubmit(true)}
              className="w-full py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Publish"}
            </button>
            <button
              disabled={saving}
              onClick={() => handleSubmit(false)}
              className="w-full py-3 border border-slate-300 rounded-lg font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            >
              Save as Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
