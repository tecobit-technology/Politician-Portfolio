"use client";

import { useState } from "react";
import { getYouTubeId } from "@/lib/youtube";

type YouTubeCardProps = {
  url: string;
  title: string;
  description?: string;
};

export default function YouTubeCard({
  url,
  title,
  description,
}: YouTubeCardProps) {
  const [playing, setPlaying] = useState(false);
  const id = getYouTubeId(url);

  if (!id) return null;

  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
      <div className="relative aspect-video w-full bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-rose-900 text-white shadow-lg transition group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutral-950">{title}</h3>
        {description && (
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {description}
          </p>
        )}
      </div>
    </article>
  );
}