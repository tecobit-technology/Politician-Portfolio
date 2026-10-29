"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type JourneyItem = {
  year: string;
  category: string;
  title: string;
  description: string;
  side: "left" | "right";
  image?: string;
  images?: string[];
  color?: "blue" | "gold" | "red";
};

type JourneyTimelineProps = {
  items: JourneyItem[];
};

export default function JourneyTimeline({
  items,
}: JourneyTimelineProps) {
  const t = useTranslations("JourneyTimeline");

  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-16">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.25em] text-[#8A1538]">
            {t("label")}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">
            {t("title")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-500">
            {t("description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-5xl">
          {/* Desktop Center Line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gray-300 md:block" />

          {/* Mobile Line */}
          <div className="absolute left-3 top-0 h-full w-px bg-gray-300 md:hidden" />

          <div className="space-y-8 sm:space-y-12 md:space-y-20">
            {items.map((item, index) => {
              const dotColor =
                item.color === "gold"
                  ? "bg-[#D7AE55]"
                  : item.color === "red"
                    ? "bg-[#B51F4B]"
                    : "bg-[#1D3F72]";

              const borderColor =
                item.color === "gold"
                  ? "border-[#E7D29B]"
                  : item.color === "red"
                    ? "border-[#E9AABD]"
                    : "border-gray-200";

              const badgeColor =
                item.color === "gold"
                  ? "bg-[#F8EAC3] text-[#8B681D]"
                  : item.color === "red"
                    ? "bg-[#F9DCE4] text-[#9D183F]"
                    : "bg-[#E7EEF8] text-[#1D3F72]";

              return (
                <div key={index} className="relative">
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-3 top-7 z-20 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white shadow ${dotColor} md:left-1/2`}
                  />

                  {/* Connector */}
                  <div
                    className={`absolute top-[31px] hidden h-px w-9 bg-gray-300 md:block ${
                      item.side === "left" ? "right-1/2" : "left-1/2"
                    }`}
                  />

                  {/* Card Position */}
                  <div
                    className={`pl-7 sm:pl-8 md:w-[calc(50%-36px)] md:pl-0 ${
                      item.side === "left" ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    {/* Card */}
                    <div
                      className={`border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-6 ${borderColor}`}
                    >
                      {/* Year + Category */}
                      <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                        <span
                          className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${badgeColor}`}
                        >
                          {item.year}
                        </span>

                        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                          {item.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-3 break-words text-lg font-semibold leading-7 text-gray-900 md:text-xl">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="break-words text-sm leading-6 text-gray-500 md:text-base">
                        {item.description}
                      </p>

                      {/* One Image */}
                      {item.image && !item.images?.length && (
                        <div className="relative mt-4 h-40 w-full overflow-hidden sm:h-48">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Multiple Images */}
                      {item.images && item.images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {item.images.map((image, imageIndex) => (
                            <div
                              key={imageIndex}
                              className="relative h-24 overflow-hidden sm:h-28"
                            >
                              <Image
                                src={image}
                                alt={`${item.title} ${imageIndex + 1}`}
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}