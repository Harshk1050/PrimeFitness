import type { GalleryProvider } from "@/models/Gallery";

export function detectProvider(url: string): GalleryProvider {
  if (!url) return "";
  let host = "";
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return "other";
  }

  if (host.includes("youtube.com") || host.includes("youtu.be"))
    return "youtube";
  if (host.includes("instagram.com")) return "instagram";
  if (host.includes("tiktok.com")) return "tiktok";
  if (host.includes("vimeo.com")) return "vimeo";
  if (host.includes("facebook.com") || host.includes("fb.watch"))
    return "facebook";
  return "other";
}

function getYoutubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function getTiktokId(url: string): string | null {
  const m = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
  return m ? m[1] : null;
}

export function getEmbedUrl(
  url: string,
  provider: GalleryProvider,
): string | null {
  switch (provider) {
    case "youtube": {
      const id = getYoutubeId(url);
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    case "vimeo": {
      const id = getVimeoId(url);
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
    case "instagram": {
      const clean = url.split("?")[0].replace(/\/$/, "");
      return `${clean}/embed`;
    }
    case "tiktok": {
      const id = getTiktokId(url);
      return id ? `https://www.tiktok.com/embed/v2/${id}` : null;
    }
    case "facebook": {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url,
      )}&show_text=false`;
    }
    default:
      return null;
  }
}

export function getAutoThumbnail(
  url: string,
  provider: GalleryProvider,
): string | null {
  if (provider === "youtube") {
    const id = getYoutubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }
  return null;
}

export function providerLabel(provider: GalleryProvider): string {
  switch (provider) {
    case "youtube":
      return "YouTube";
    case "instagram":
      return "Instagram";
    case "tiktok":
      return "TikTok";
    case "vimeo":
      return "Vimeo";
    case "facebook":
      return "Facebook";
    case "other":
      return "Link";
    default:
      return "";
  }
}
