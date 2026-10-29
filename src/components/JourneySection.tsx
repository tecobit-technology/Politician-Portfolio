"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function JourneySection() {
  const t = useTranslations("JourneySection");

  return (
    <section className="mt-10 bg-white px-4 py-14 sm:px-6 sm:py-20 md:mt-[59px] lg:px-16">
      <div className="mx-auto w-full max-w-[1066px]">

        {/* Heading */}
        <div className="mx-auto mb-10 flex max-w-[558px] flex-col items-center gap-4 text-center sm:mb-12">
          <p className="text-[13px] font-semibold text-[#C9982A]">
            {t("label")}
          </p>

          <h2 className="font-serif text-2xl font-bold leading-tight text-[#221F1A] sm:text-[32px]">
            {t("title")}
          </h2>

          <p className="text-base leading-7 text-[#4A483F] sm:text-[18px]">
            {t("description")}
          </p>
        </div>

        {/* Journey Cards */}
        <div className="relative grid gap-6 md:grid-cols-2 xl:block xl:h-[772px]">

          {/* ================= EARLY LIFE ================= */}
          <article
            className="
              relative
              border border-[#C5C6CD]
              bg-white
              p-5 sm:p-6
              shadow-[0_4px_10px_rgba(15,28,46,0.05)]
              xl:absolute xl:left-0 xl:top-0 xl:w-[511px]
            "
          >
            <div className="flex items-start gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-[#E5E9EB]">
                <span className="text-xl">⌂</span>
              </div>

              <div>
                <span className="inline-flex rounded-sm bg-[#FFDEA5] px-2 py-1 text-sm font-bold tracking-wide text-[#775A19]">
                  2040–2056 B.S.
                </span>

                <h3 className="mt-2 font-serif text-xl text-black sm:text-2xl">
                  {t("earlyLife.title")}
                </h3>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.1em] text-[#181C1E]">
                {t("earlyLife.subtitle")}
              </p>

              <p className="text-[15px] leading-6 text-[#44474C]">
                {t("earlyLife.description")}
              </p>

              <div className="border-t border-[#C5C6CD] pt-4">
                <div className="h-[160px] overflow-hidden border border-[#C5C6CD] sm:h-[192px]">
                  <Image
                    src="/images/Journey1.jpg"
                    alt={t("earlyLife.imageAlt")}
                    width={800}
                    height={500}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* ================= PARTY ROLES ================= */}
          <article
            className="
              relative
              border border-[#C5C6CD]
              bg-white
              p-5 sm:p-6
              shadow-[0_4px_10px_rgba(15,28,46,0.05)]
              xl:absolute xl:left-[546px] xl:top-0 xl:w-[511px]
            "
          >
            <div className="flex items-start gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-[#E5E9EB]">
                <span className="text-xl">🏛</span>
              </div>

              <div>
                <span className="inline-flex rounded-sm bg-[#D6E3FC] px-2 py-1 text-sm font-bold tracking-wide text-[#3B475B]">
                  2065–2074
                </span>

                <h3 className="mt-2 font-serif text-xl text-black sm:text-2xl">
                  {t("partyRoles.title")}
                </h3>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.1em] text-[#181C1E]">
                {t("partyRoles.subtitle")}
              </p>

              <p className="text-[15px] leading-6 text-[#44474C]">
                {t("partyRoles.description")}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="h-24 w-full overflow-hidden border border-[#C5C6CD] sm:h-28">
                  <Image
                    src="/images/Journey2.jpg"
                    alt={t("partyRoles.imageAlt1")}
                    width={640}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="h-24 w-full overflow-hidden border border-[#C5C6CD] sm:h-28">
                  <Image
                    src="/images/Journey3.jpg"
                    alt={t("partyRoles.imageAlt2")}
                    width={640}
                    height={480}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </article>

          {/* ================= ENTRY INTO POLITICS ================= */}
          <article
            className="
              relative
              border border-[#C5C6CD]
              bg-white
              p-5 sm:p-6
              shadow-[0_4px_10px_rgba(15,28,46,0.05)]
              xl:absolute xl:left-[546px] xl:top-[412px] xl:w-[511px]
            "
          >
            <div className="flex items-start gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-[#E5E9EB]">
                <span className="text-xl">👥</span>
              </div>

              <div>
                <span className="inline-flex rounded-sm bg-[#D6E3FC] px-2 py-1 text-sm font-bold tracking-wide text-[#3B475B]">
                  2062–2065
                </span>

                <h3 className="mt-2 font-serif text-xl text-black sm:text-2xl">
                  {t("politics.title")}
                </h3>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.1em] text-[#3B475B]">
                {t("politics.subtitle")}
              </p>

              <p className="text-[15px] leading-6 text-[#44474C]">
                {t("politics.description")}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="rounded-xl bg-[#E5E9EB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#44474C]">
                  {t("politics.mobilization")}
                </span>

                <span className="rounded-xl bg-[#E5E9EB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#44474C]">
                  {t("politics.advocacy")}
                </span>
              </div>
            </div>
          </article>

          {/* ================= ONGOING INITIATIVES ================= */}
          <article
            className="
              relative
              border border-[#BA1A1A]
              bg-white
              p-5 sm:p-6
              shadow-[0_4px_10px_rgba(186,26,26,0.05)]
              xl:absolute xl:left-0 xl:top-[503px] xl:w-[511px]
            "
          >
            <div className="flex items-start gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-sm bg-[#FFDAD6]">
                <span className="text-xl">🚧</span>
              </div>

              <div>
                <span className="inline-flex rounded-sm bg-[#FFD9DD] px-2 py-1 text-sm font-bold tracking-wide text-[#400013]">
                  2079–Present
                </span>

                <h3 className="mt-2 font-serif text-xl text-black sm:text-2xl">
                  {t("ongoing.title")}
                </h3>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <p className="text-xs font-bold tracking-[0.1em] text-[#BA1A1A]">
                {t("ongoing.subtitle")}
              </p>

              <p className="text-[15px] leading-6 text-[#44474C]">
                {t("ongoing.description")}
              </p>

              {/* Progress */}
              <div className="mt-1 flex items-center gap-4">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E5E9EB]">
                  <div className="h-full w-3/4 bg-[#BA1A1A]" />
                </div>

                <span className="whitespace-nowrap text-xs font-extrabold tracking-wide text-[#BA1A1A]">
                  {t("ongoing.progress")}
                </span>
              </div>
            </div>
          </article>
        </div>

        {/* View Journey */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/journey"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-[#8A1538]"
          >
            {t("viewJourney")}

            <Image
              src="/icons/Arrow1.svg"
              alt=""
              width={15}
              height={15}
              className="h-auto w-[15px]"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}