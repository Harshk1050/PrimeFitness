import jsQR from "jsqr";

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

export type Highlight = { label: string; icon: string };
export type Faq = { question: string; answer: string };

export const CORE_VALUES = [
  { label: "Inclusion", icon: "People" },
  { label: "Awareness", icon: "Heart" },
  { label: "Community", icon: "Community" },
  { label: "Acceptance", icon: "Star" },
] as const;

export type Core = { label: string; icon: string };

export type SponsorTier = {
  level: string;
  price: string;
  highlight: boolean;
  icon: string;
  perks: string[];
};
export type EventDetail = {
  date: string; //  "2026-10-10"
  time: string;
  location: string;
  distance: string;
};

export type GalleryMediaType = "image" | "video";
export type GalleryVideoSource = "upload" | "external";
export type GalleryItem = {
  mediaType: GalleryMediaType;
  videoSource: GalleryVideoSource;
  fileUrl: string;
  externalUrl: string;
  provider: string;
  thumbnail: string;
  caption: string;
};

export function formatDisplayDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function decodeQrImage(file: File): Promise<string | null> {
  const imageBitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = imageBitmap.width;
  canvas.height = imageBitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.drawImage(imageBitmap, 0, 0);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const result = jsQR(imageData.data, imageData.width, imageData.height);
  return result?.data ?? null; // this is the decoded URL string
}

export function extractHostedButtonId(qrText: string): string | null {
  const match =
    qrText.match(/hosted_button_id=([A-Za-z0-9]+)/) ||
    qrText.match(/\/ncp\/payment\/([A-Za-z0-9]+)/);
  return match?.[1] ?? null;
}

export type EventFormData = {
  bannerImage: string;
  paypalQrImage: string;
  paypalHostedButtonId: string;
  title: string;
  slug: string;
  subtitle: string;
  eventDetails: EventDetail;
  about: string;
  highlights: Highlight[];
  coreValues: Core[];
  faqs: Faq[];
  sponsorTiers: SponsorTier[];
  gallery: GalleryItem[];
  published: boolean;
  tags: string[];
  metaTitle: string;
  canonicalUrl: string;
  metaDescription: string;
};

export interface Props {
  initialData?: Partial<EventFormData> & { _id?: string };
  mode: "create" | "edit";
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function inputCls(error?: boolean) {
  return `w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 transition-colors ${
    error
      ? "border-red-400 focus:ring-red-300 bg-red-50"
      : "border-slate-200 focus:ring-green-500"
  }`;
}

export const EMPTY_TIER: SponsorTier = {
  level: "",
  price: "",
  highlight: false,
  icon: "star",
  perks: [""],
};

export const EMPTY_GALLERY_ITEM: GalleryItem = {
  mediaType: "image",
  videoSource: "upload",
  fileUrl: "",
  externalUrl: "",
  provider: "",
  thumbnail: "",
  caption: "",
};
