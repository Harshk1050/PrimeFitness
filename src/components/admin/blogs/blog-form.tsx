"use client";

import { useEffect, useState } from "react";

import { RichTextEditor } from "./rich-text-editor";
import { useRouter } from "next/navigation";

type BlogFormData = {
  title: string;
  slug: string;
  category: string;
  subCategory: string;
  shortDescription: string;
  content: string;
  featuredImage: string;
  imageAlt: string;
  tags: string[];
  metaTitle: string;
  canonicalUrl: string;
  metaDescription: string;
  published: boolean;
  publishedAt: string | null;
};

type Errors = Partial<Record<keyof BlogFormData, string>>;

const CATEGORIES = [
  "Fitness",
  "Nutrition",
  "Adaptive Training",
  "Mental Wellness",
  "Recovery",
  "Performance",
  "News",
];

interface Props {
  initialData?: Partial<BlogFormData> & { _id?: string };
  mode: "create" | "edit";
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function formatDateInputValue(value?: Date | string | null) {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toISOString().split("T")[0];
}

function validate(form: BlogFormData): Errors {
  const e: Errors = {};
  if (!form.title.trim()) e.title = "Blog title is required.";
  if (!form.slug.trim()) e.slug = "Slug is required.";
  else if (!/^[a-z0-9-]+$/.test(form.slug))
    e.slug = "Slug can only contain lowercase letters, numbers and hyphens.";
  if (!form.category) e.category = "Category is required.";
  if (!form.shortDescription.trim())
    e.shortDescription = "Short description is required.";
  if (!form.content.trim() || form.content === "<p><br></p>")
    e.content = "Blog content is required.";
  if (!form.publishedAt) e.publishedAt = "Publish date is required.";
  if (form.metaTitle && form.metaTitle.length > 60)
    e.metaTitle = "Meta title should be 60 characters or less.";
  if (form.metaDescription && form.metaDescription.length > 160)
    e.metaDescription = "Meta description should be 160 characters or less.";
  return e;
}

// helper: input class with error state
function inputCls(error?: string) {
  return `w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition-colors ${
    error
      ? "border-red-400 focus:ring-red-300 bg-red-50"
      : "border-slate-200 focus:ring-green-500"
  }`;
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="text-xs text-red-500 mt-1 font-medium">{msg}</p>;
}

export function BlogForm({ initialData, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [imagePreview, setImagePreview] = useState(
    initialData?.featuredImage || "",
  );
  const [previewObjectUrl, setPreviewObjectUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [tagsInput, setTagsInput] = useState(
    (initialData?.tags || []).join(", "),
  );
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<BlogFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || CATEGORIES[0],
    subCategory: initialData?.subCategory || "",
    shortDescription: initialData?.shortDescription || "",
    content: initialData?.content || "",
    featuredImage: initialData?.featuredImage || "",
    imageAlt: initialData?.imageAlt || "",
    tags: initialData?.tags || [],
    metaTitle: initialData?.metaTitle || "",
    canonicalUrl: initialData?.canonicalUrl || "",
    metaDescription: initialData?.metaDescription || "",
    published: initialData?.published ?? false,
    publishedAt: formatDateInputValue(
      initialData?.publishedAt as Date | string | null,
    ),
  });

  const set = (key: keyof BlogFormData, value: any) => {
    const updated = { ...form, [key]: value };
    setForm(updated);
    // live re-validate after first submit attempt
    if (submitted) setErrors(validate(updated));
  };

  const handleTitleChange = (title: string) => {
    const updated = {
      ...form,
      title,
      ...(mode === "create" ? { slug: slugify(title) } : {}),
    };
    setForm(updated);
    if (submitted) setErrors(validate(updated));
  };

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

      if (!res.ok || !data?.url) {
        throw new Error("Upload failed");
      }

      set("featuredImage", data.url);
      setImagePreview(data.url);
      if (previewObjectUrl) {
        URL.revokeObjectURL(previewObjectUrl);
        setPreviewObjectUrl(null);
      }
    } catch (error) {
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
    setSubmitted(true);
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // scroll to first error
      const firstKey = Object.keys(errs)[0];
      document
        .getElementById(`field-${firstKey}`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setSaving(true);
    const payload = {
      ...form,
      published,
      publishedAt: form.publishedAt
        ? new Date(form.publishedAt)
        : published
          ? new Date()
          : null,
    };
    const url =
      mode === "edit" ? `/api/blogs/${initialData?._id}` : "/api/blogs";
    const method = mode === "edit" ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (res.ok) router.push("/admin/blogs");
    else alert("Failed to save blog. Please try again.");
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div className="space-y-8 py-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl font-black uppercase tracking-tight text-green-600">
          {mode === "create" ? "New Blog Post" : "Edit Blog Post"}
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
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

      {submitted && errorCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-5 py-4 flex items-start gap-3">
          <span className="text-red-500 text-lg mt-0.5">⚠</span>
          <div>
            <p className="text-sm font-bold text-red-700">
              Please fix {errorCount} error{errorCount > 1 ? "s" : ""} before
              saving.
            </p>
            <ul className="mt-1 space-y-0.5">
              {Object.values(errors).map((msg, i) => (
                <li key={i} className="text-xs text-red-600">
                  • {msg}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <div className="border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Featured Image
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
                    set("featuredImage", "");
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
                Upload Image
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
            <div>
              <span className="block text-xs text-slate-500 mb-1">
                Image Alt Text
              </span>
              <input
                value={form.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)}
                placeholder="Describe the image..."
                className={inputCls()}
              />
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Core Details
            </h3>

            <div id="field-title">
              <label className="block text-xs text-slate-500 mb-1">
                Blog Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter blog title..."
                className={inputCls(errors.title) + " font-medium"}
              />
              <FieldError msg={errors.title} />
            </div>

            <div id="field-slug">
              <label className="block text-xs text-slate-500 mb-1">
                Slug *
              </label>
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="auto-generated-from-title"
                className={inputCls(errors.slug) + " font-mono text-slate-600"}
              />
              <FieldError msg={errors.slug} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div id="field-category">
                <label className="block text-xs text-slate-500 mb-1">
                  Category *
                </label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={inputCls(errors.category)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <FieldError msg={errors.category} />
              </div>
              <div>
                <label className="block text-xs text-slate-500 mb-1">
                  Sub Category
                </label>
                <input
                  value={form.subCategory}
                  onChange={(e) => set("subCategory", e.target.value)}
                  placeholder="e.g. Wheelchair Training"
                  className={inputCls()}
                />
              </div>
            </div>

            <div id="field-shortDescription">
              <label className="block text-xs text-slate-500 mb-1">
                Short Description *
              </label>
              <textarea
                value={form.shortDescription}
                onChange={(e) => set("shortDescription", e.target.value)}
                rows={3}
                placeholder="Brief summary shown on blog cards..."
                className={inputCls(errors.shortDescription) + " resize-none"}
              />
              <FieldError msg={errors.shortDescription} />
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Tags <span className="text-slate-400">(comma separated)</span>
              </label>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                onBlur={(e) =>
                  set(
                    "tags",
                    e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  )
                }
                placeholder="fitness, adaptive, strength"
                className={inputCls()}
              />
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            id="field-content"
            className={`border rounded-xl p-5 space-y-3 ${errors.content ? "border-red-400" : "border-slate-200"}`}
          >
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Blog Content *
            </h3>
            <RichTextEditor
              value={form.content}
              onChange={(v) => set("content", v)}
            />
            <FieldError msg={errors.content} />
          </div>
        </div>

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

          <div className="border border-slate-200 rounded-xl p-5 space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              Publish Date
            </h3>
            <div className="flex items-center gap-3">
              <input
                type="date"
                value={form.publishedAt || ""}
                onChange={(e) => set("publishedAt", e.target.value)}
                className={inputCls(errors.publishedAt)}
              />
              <FieldError msg={errors.publishedAt} />
            </div>
          </div>

          <div className="border border-slate-200 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-500">
              SEO
            </h3>

            <div id="field-metaTitle">
              <label className="block text-xs text-slate-500 mb-1">
                Meta Title
              </label>
              <input
                value={form.metaTitle}
                onChange={(e) => set("metaTitle", e.target.value)}
                placeholder={form.title || "Meta title..."}
                className={inputCls(errors.metaTitle)}
              />
              <div className="flex justify-between items-center mt-1">
                <FieldError msg={errors.metaTitle} />
                <span
                  className={`text-xs ml-auto ${form.metaTitle.length > 60 ? "text-red-500 font-bold" : "text-slate-400"}`}
                >
                  {form.metaTitle.length}/60
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-500 mb-1">
                Canonical URL
              </label>
              <input
                value={form.canonicalUrl}
                onChange={(e) => set("canonicalUrl", e.target.value)}
                placeholder="https://primefitnessplusllc.com/blogs/..."
                className={inputCls()}
              />
            </div>

            <div id="field-metaDescription">
              <label className="block text-xs text-slate-500 mb-1">
                Meta Description
              </label>
              <textarea
                value={form.metaDescription}
                onChange={(e) => set("metaDescription", e.target.value)}
                rows={4}
                placeholder={form.shortDescription || "Meta description..."}
                className={inputCls(errors.metaDescription) + " resize-none"}
              />
              <div className="flex justify-between items-center mt-1">
                <FieldError msg={errors.metaDescription} />
                <span
                  className={`text-xs ml-auto ${form.metaDescription.length > 160 ? "text-red-500 font-bold" : "text-slate-400"}`}
                >
                  {form.metaDescription.length}/160
                </span>
              </div>
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
