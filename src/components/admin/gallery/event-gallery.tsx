"use client";

import { getEmbedUrl, providerLabel } from "@/lib/media-embed";

import type { IEventGalleryItem } from "@/models/Event";
import { useState } from "react";

interface Props {
  gallery: IEventGalleryItem[];
}

export function EventGallery({ gallery }: Props) {
  const [active, setActive] = useState<IEventGalleryItem | null>(null);

  if (!gallery?.length) return null;

  return (
    <div className="">
      <div className="flex flex-col mb-6">
        <h2 className="text-xl font-black uppercase mb-2 tracking-tight">
          Gallery
        </h2>
        <div className="w-20 h-0.5 bg-[#f0a500]" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {gallery.map((item, i) => (
          <GalleryCard key={i} item={item} onOpen={() => setActive(item)} />
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <GalleryMedia item={active} large />
            {active.caption && (
              <p className="p-4 text-sm text-slate-600">{active.caption}</p>
            )}
            <button
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 bg-white/90 rounded-full w-8 h-8 text-slate-700 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function GalleryCard({
  item,
  onOpen,
}: {
  item: IEventGalleryItem;
  onOpen: () => void;
}) {
  if (item.mediaType === "video" && item.videoSource === "external") {
    return (
      <button
        onClick={onOpen}
        className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100 group"
      >
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt={item.caption}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-slate-400">
            {providerLabel(item.provider as any)}
          </div>
        )}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-slate-800">
            ▶
          </span>
        </div>
        <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide">
          {providerLabel(item.provider as any)}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={onOpen}
      className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100"
    >
      {item.mediaType === "image" ? (
        <img
          src={item.fileUrl}
          alt={item.caption}
          className="object-cover w-full h-full"
        />
      ) : (
        <video
          src={item.fileUrl}
          className="object-cover w-full h-full"
          muted
        />
      )}
    </button>
  );
}

function GalleryMedia({
  item,
  large,
}: {
  item: IEventGalleryItem;
  large?: boolean;
}) {
  const cls = large ? "w-full aspect-video" : "w-full h-full";

  if (item.mediaType === "image") {
    return (
      <img
        src={item.fileUrl}
        alt={item.caption}
        className={cls + " object-cover"}
      />
    );
  }

  if (item.videoSource === "upload") {
    return (
      <video
        src={item.fileUrl}
        controls
        autoPlay
        className={cls + " bg-black"}
      />
    );
  }

  const embedUrl = getEmbedUrl(item.externalUrl, item.provider as any);
  if (embedUrl) {
    return (
      <div className={cls + " bg-black"}>
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <a
      href={item.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full aspect-video bg-slate-100 text-sm font-semibold text-slate-600"
    >
      Watch on {providerLabel(item.provider as any)} ↗
    </a>
  );
}
