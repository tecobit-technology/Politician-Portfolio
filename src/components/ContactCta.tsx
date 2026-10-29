
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function ContactCta() {
  const t = useTranslations("ContactCta");

  return (
    <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-center gap-6 rounded-2xl bg-[#8a1538] px-5 py-8 shadow-xl shadow-slate-900/20 sm:gap-8 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:flex-row lg:gap-12 lg:px-16 lg:py-14">
        <div className="min-w-0 flex-1 text-center">
          <h2 className="text-2xl font-serif font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">
            {t("title")}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
            {t("description")}
          </p>
        </div>

        <div className="flex shrink-0 justify-center">
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-foreground shadow-lg shadow-rose-900/20 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#8a1538]"
          >
            {t("button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
