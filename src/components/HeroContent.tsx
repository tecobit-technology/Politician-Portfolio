"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function HeroContent() {
  const t = useTranslations("Hero");

  return (
    <>
      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(74,10,23,0.28),rgba(26,3,10,0.56))]" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto grid min-h-full w-full max-w-[1300px] grid-cols-1 items-end gap-6 px-4 pt-28 sm:px-6 lg:h-full lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-0 xl:px-0">

        {/* Portrait (below the text on phones, left on desktop) */}
        <div className="relative order-2 h-[340px] w-full sm:h-[440px] lg:order-1 lg:h-[590px]">
          <Image
            src="/images/image2.png"
            alt="Bishnu Bahadur Rokaya"
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-contain object-bottom"
          />
        </div>

        {/* Right Content (above the portrait on phones) */}
        <div className="z-20 order-1 flex flex-col items-start justify-center lg:order-2 lg:pb-24">

          {/* Affiliation */}
          <div className="mb-4 flex items-center gap-2 sm:mb-5">
            <Image
              src="/icons/logo1.png"
              alt="Affiliation"
              width={20}
              height={20}
            />

            <span className="text-sm text-white">
              {t("affiliation")}
            </span>
          </div>

          {/* Subtitle */}
          <p className="mb-3 text-sm font-semibold tracking-wider text-[#D4AF37] sm:mb-4">
            {t("subtitle")}
          </p>

          {/* Title */}
          <h1 className="mb-4 font-serif text-4xl font-semibold leading-[1.15] text-white sm:mb-5 sm:text-5xl lg:text-6xl">
            {t("titleFirst")}
            <br />
            {t("titleLast")}
          </h1>

          {/* Description */}
          <p className="mb-6 text-sm leading-7 text-white/90 sm:mb-8 sm:text-base sm:leading-8">
            {t("descriptionFirst")}
            <br />
            {t("descriptionSecond")}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Link
              href="/work"
              className="rounded-md bg-[#8a1538] px-5 py-3 text-sm font-medium text-white transition hover:bg-primary sm:px-6 sm:text-base"
            >
              {t("viewWork")}
            </Link>

            <Link
              href="/contact"
              className="rounded-md border border-black bg-white px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-gray-100 sm:px-6 sm:text-base"
            >
              {t("contact")}
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}