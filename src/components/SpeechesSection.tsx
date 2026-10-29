"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getYouTubeId } from "@/lib/youtube";

type Locale = "en" | "ne";

type VideoItem = {
  id: string;
  youtubeUrl: string;
  date: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

// =====================================================
// ADD YOUR VIDEOS HERE (one object per card)
// =====================================================
const videos: VideoItem[] = [
  {
    id: "video-1",
    youtubeUrl: "https://youtu.be/Bj2swdMr7lM?si=xAcRYFKdWXID1aCF",
    date: {
      en: "2026",
      ne: "२०८२",
    },
   title: {
    en: "Eye Health Camp Documentary: Bringing Eye Care to Palata Rural Municipality, Kalikot",
    ne: "आँखा स्वास्थ्य शिविर वृत्तचित्र: कालिकोट, पलाता गाउँपालिकामा आँखा स्वास्थ्य सेवा",
  },
  description: {
    en: "This documentary follows the Eye Health Camp organized in Palata Rural Municipality, Kalikot, a public service initiative to bring eye health care closer to local people in a remote hill district. Through scenes from the camp, the video shows the effort of the local government, health workers and community members who came together to serve residents. Watch the full documentary to see how this public service reached the community.",
    ne: "कालिकोटको पलाता गाउँपालिकामा सञ्चालन गरिएको आँखा स्वास्थ्य शिविरमा आधारित यो वृत्तचित्रले दुर्गम पहाडी जिल्लाका स्थानीयवासीको नजिकै आँखा स्वास्थ्य सेवा पुर्‍याउने सार्वजनिक सेवा पहललाई देखाउँछ। शिविरका दृश्यमार्फत स्थानीय सरकार, स्वास्थ्यकर्मी र समुदायका सदस्यहरू मिलेर नागरिकको सेवामा जुटेको प्रयासलाई यस भिडियोले प्रस्तुत गर्छ। यो सार्वजनिक सेवा समुदायसम्म कसरी पुग्यो भन्ने कुरा हेर्न पूरा वृत्तचित्र हेर्नुहोस्।",
  },
  },
  // Copy the block above to add another video card
];

type GalleryPhoto = {
  _id: string;
  title: string;
  image: string;
  description?: string;
  date?: string;
};

function VideoCard({
  video,
  locale,
}: {
  video: VideoItem;
  locale: Locale;
}) {
  const [playing, setPlaying] = useState(false);

  const videoId = getYouTubeId(video.youtubeUrl);
  const title = video.title[locale];

  if (!videoId) return null;

  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-black/5">
      {/* VIDEO */}
      <div className="relative aspect-[5/3] w-full overflow-hidden bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1`}
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
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.05]"
            />
            <span className="absolute inset-0 bg-black/10 transition group-hover:bg-black/25" />
            <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-lg transition group-hover:scale-110">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6 text-slate-900"
              >
                <path d="M10 8l6 4-6 4V8Z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* TEXT */}
      <div className="space-y-3 px-5 pb-6 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-900/80">
          {video.date[locale]}
        </p>

        <h3 className="text-lg font-semibold text-slate-950">{title}</h3>

        <p className="text-sm leading-6 text-slate-600">
          {video.description[locale]}
        </p>
      </div>
    </article>
  );
}

export function SpeechesSection() {
  const t = useTranslations("SpeechesSection");
  const locale = (useLocale() === "ne" ? "ne" : "en") as Locale;

  const [gallery, setGallery] = useState<GalleryPhoto[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch("/api/gallery");

        if (!response.ok) {
          throw new Error("Failed to fetch gallery");
        }

        const result = await response.json();

        setGallery(result.data);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoadingGallery(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section className="mt-20 bg-white">
      <div className="mx-auto w-full max-w-7xl px-9 sm:px-6 lg:px-8">

        {/* Speeches / Videos */}
        <div className="mb-8">
          <h2 className="font-serif text-4xl font-semibold tracking-[0.02em] text-slate-950">
            {t("title")}
          </h2>
        </div>

        <div
  className={`grid gap-8 ${
    videos.length === 1
      ? "grid-cols-1"
      : "grid-cols-1 md:grid-cols-2"
  }`}
>
  {videos.map((video) => (
    <VideoCard key={video.id} video={video} locale={locale} />
  ))}
</div>

        {/* Press Photo Gallery */}
        <div className="mt-16">
          <div className="mb-8">
            <h3 className="font-serif text-3xl font-semibold tracking-[0.02em] text-slate-950">
              {t("gallery.title")}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              {t("gallery.description")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loadingGallery ? (
              <div className="col-span-full py-10 text-center text-sm text-slate-600">
                {t("gallery.loading")}
              </div>
            ) : gallery.length === 0 ? (
              <div className="col-span-full py-10 text-center text-sm text-slate-600">
                {t("gallery.empty")}
              </div>
            ) : (
              gallery.map((photo) => (
                <article
                  key={photo._id}
                  className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div className="relative aspect-[5/3] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      className="object-cover transition duration-300 hover:scale-105"
                      sizes="(min-width: 1280px) 420px, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>

                  <div className="px-4 py-4 text-sm text-slate-700">
                    {photo.title}
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Media & Press */}
          <div className="mb-12 mt-12 rounded-[1.5rem] border border-rose-900 bg-rose-50/30 p-6 text-sm text-slate-900 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold text-rose-900/80">
                  {t("media.title")}
                </p>

                <p className="mt-1 font-semibold text-slate-900">
                  {t("media.officer")}
                </p>
              </div>

              <div className="space-y-2 text-sm text-slate-900 sm:text-right">
                <p>{t("media.phone")}: +977-98XXXXXXXX</p>
                <p>{t("media.email")}: press@kalikot.gov.np</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}