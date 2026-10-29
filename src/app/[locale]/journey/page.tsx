import { getTranslations } from "next-intl/server";

import { Container } from "@/components/Container";
import { PageTitleBanner } from "@/components/PageTitleBanner";
import JourneyTimeline from "@/components/JourneyTimeline";

export default async function Page() {
  const t = await getTranslations("Journey");

  const journeyItems = [
    {
      year: t("items.birth.year"),
      category: t("items.birth.category"),
      title: t("items.birth.title"),
      description: t("items.birth.description"),
      side: "left" as const,
      color: "gold" as const,
    },
    {
      year: t("items.childhood.year"),
      category: t("items.childhood.category"),
      title: t("items.childhood.title"),
      description: t("items.childhood.description"),
      side: "right" as const,
      color: "blue" as const,
    },
    {
      year: t("items.turningPoint.year"),
      category: t("items.turningPoint.category"),
      title: t("items.turningPoint.title"),
      description: t("items.turningPoint.description"),
      side: "left" as const,
      color: "gold" as const,
    },
    {
      year: t("items.undergroundMovement.year"),
      category: t("items.undergroundMovement.category"),
      title: t("items.undergroundMovement.title"),
      description: t("items.undergroundMovement.description"),
      side: "right" as const,
      color: "red" as const,
    },
    {
      year: t("items.militiaCommander.year"),
      category: t("items.militiaCommander.category"),
      title: t("items.militiaCommander.title"),
      description: t("items.militiaCommander.description"),
      side: "left" as const,
      color: "red" as const,
    },
    {
      year: t("items.pla.year"),
      category: t("items.pla.category"),
      title: t("items.pla.title"),
      description: t("items.pla.description"),
      side: "right" as const,
      color: "red" as const,
    },
    {
      year: t("items.basantaSmritiBrigade.year"),
      category: t("items.basantaSmritiBrigade.category"),
      title: t("items.basantaSmritiBrigade.title"),
      description: t("items.basantaSmritiBrigade.description"),
      side: "left" as const,
      color: "red" as const,
    },
    {
      year: t("items.armyIntegration.year"),
      category: t("items.armyIntegration.category"),
      title: t("items.armyIntegration.title"),
      description: t("items.armyIntegration.description"),
      side: "right" as const,
      color: "gold" as const,
    },
    {
      year: t("items.ruralMunicipalityChairman.year"),
      category: t("items.ruralMunicipalityChairman.category"),
      title: t("items.ruralMunicipalityChairman.title"),
      description: t("items.ruralMunicipalityChairman.description"),
      side: "left" as const,
      color: "blue" as const,
    },
    {
      year: t("items.publicLeadership.year"),
      category: t("items.publicLeadership.category"),
      title: t("items.publicLeadership.title"),
      description: t("items.publicLeadership.description"),
      side: "right" as const,
      color: "gold" as const,
    },
  ];

  return (
    <main className="pt-18.5 flex flex-col gap-[10px]">
      <Container className="flex flex-col gap-[10px]">
        <PageTitleBanner
          title={t("pageTitle")}
          breadcrumb={t("breadcrumb")}
        />

        <JourneyTimeline items={journeyItems} />
      </Container>
    </main>
  );
}
