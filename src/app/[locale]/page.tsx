import { getTranslations } from "next-intl/server";

import HeroSection from "../../components/HeroSection";
import SectionHeading from "../../components/SectionHeading";
import { FeaturedWork } from "../../components/FeaturedWork";
import JourneyTimeline from "../../components/JourneyTimeline";
import { LatestNews } from "../../components/LatestNews";
import { ContactCta } from "../../components/ContactCta";

export default async function Home() {
  const t = await getTranslations("Home");
  const tJourney = await getTranslations("Journey");

  const journeyItems = [
    {
      year: tJourney("items.birth.year"),
      category: tJourney("items.birth.category"),
      title: tJourney("items.birth.title"),
      description: tJourney("items.birth.description"),
      side: "left" as const,
      color: "gold" as const,
    },
    {
      year: tJourney("items.childhood.year"),
      category: tJourney("items.childhood.category"),
      title: tJourney("items.childhood.title"),
      description: tJourney("items.childhood.description"),
      side: "right" as const,
      color: "blue" as const,
    },
    {
      year: tJourney("items.turningPoint.year"),
      category: tJourney("items.turningPoint.category"),
      title: tJourney("items.turningPoint.title"),
      description: tJourney("items.turningPoint.description"),
      side: "left" as const,
      color: "gold" as const,
    },
    {
      year: tJourney("items.undergroundMovement.year"),
      category: tJourney("items.undergroundMovement.category"),
      title: tJourney("items.undergroundMovement.title"),
      description: tJourney("items.undergroundMovement.description"),
      side: "right" as const,
      color: "red" as const,
    },
    {
      year: tJourney("items.militiaCommander.year"),
      category: tJourney("items.militiaCommander.category"),
      title: tJourney("items.militiaCommander.title"),
      description: tJourney("items.militiaCommander.description"),
      side: "left" as const,
      color: "red" as const,
    },
    {
      year: tJourney("items.pla.year"),
      category: tJourney("items.pla.category"),
      title: tJourney("items.pla.title"),
      description: tJourney("items.pla.description"),
      side: "right" as const,
      color: "red" as const,
    },
    {
      year: tJourney("items.basantaSmritiBrigade.year"),
      category: tJourney("items.basantaSmritiBrigade.category"),
      title: tJourney("items.basantaSmritiBrigade.title"),
      description: tJourney("items.basantaSmritiBrigade.description"),
      side: "left" as const,
      color: "red" as const,
    },
    {
      year: tJourney("items.armyIntegration.year"),
      category: tJourney("items.armyIntegration.category"),
      title: tJourney("items.armyIntegration.title"),
      description: tJourney("items.armyIntegration.description"),
      side: "right" as const,
      color: "gold" as const,
    },
    {
      year: tJourney("items.ruralMunicipalityChairman.year"),
      category: tJourney("items.ruralMunicipalityChairman.category"),
      title: tJourney("items.ruralMunicipalityChairman.title"),
      description: tJourney("items.ruralMunicipalityChairman.description"),
      side: "left" as const,
      color: "blue" as const,
    },
    {
      year: tJourney("items.publicLeadership.year"),
      category: tJourney("items.publicLeadership.category"),
      title: tJourney("items.publicLeadership.title"),
      description: tJourney("items.publicLeadership.description"),
      side: "right" as const,
      color: "gold" as const,
    },
  ];

  return (
    <main className="min-h-screen w-full bg-white">

      {/* ================= HERO ================= */}
      <HeroSection />

      {/* ================= STATS ================= */}
      <section className="w-full bg-[#8a1538] py-12">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 text-center text-white">

          {/* Years of Service */}
          <div className="flex-1">
            <div className="text-4xl font-semibold">
              {t("stats.yearsOfServiceValue")}
            </div>

            <div className="mt-2 text-sm text-white/80">
              {t("stats.yearsOfService")}
            </div>
          </div>

          {/* Projects Completed */}
          <div className="flex-1">
            <div className="text-4xl font-semibold">
              {t("stats.projectsCompletedValue")}
            </div>

            <div className="mt-2 text-sm text-white/80">
              {t("stats.projectsCompleted")}
            </div>
          </div>

          {/* Wards Covered */}
          <div className="flex-1">
            <div className="text-4xl font-semibold">
              {t("stats.wardsCoveredValue")}
            </div>

            <div className="mt-2 text-sm text-white/80">
              {t("stats.wardsCovered")}
            </div>
          </div>

          {/* Budget Mobilized */}
          <div className="flex-1">
            <div className="text-4xl font-semibold">
              {t("stats.budgetMobilizedValue")}
            </div>

            <div className="mt-2 text-sm text-white/80">
              {t("stats.budgetMobilized")}
            </div>
          </div>

        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <SectionHeading
        label={t("about.label")}
        title={t("about.title")}
        description={t("about.description")}
      />

      {/* ================= FEATURED WORK ================= */}
      <FeaturedWork />

      {/* ================= JOURNEY ================= */}
      <JourneyTimeline items={journeyItems} />

      {/* ================= LATEST NEWS ================= */}
      <LatestNews />

      {/* ================= CONTACT ================= */}
      <ContactCta />

    </main>
  );
}