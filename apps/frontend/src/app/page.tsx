"use client";

// REACT //
import { useEffect } from "react";
import type { JSX } from "react";
import { useRouter } from "next/navigation";

// COMPONENTS //
import Image from "next/image";
import Link from "next/link";
import ArrowsStepInto from "@/components/icons/neevo-icons/ArrowsStepInto";
import CheckCircle from "@/components/icons/neevo-icons/CheckCircle";
import ConnectionIntegrationSystemApi from "@/components/icons/neevo-icons/ConnectionIntegrationSystemApi";
import DatabaseServer1 from "@/components/icons/neevo-icons/DatabaseServer1";
import GridDots from "@/components/icons/neevo-icons/GridDots";
import Log from "@/components/icons/neevo-icons/Log";
import MoneyTrend from "@/components/icons/neevo-icons/MoneyTrend";
import ShareLink from "@/components/icons/neevo-icons/ShareLink";
import Table from "@/components/icons/neevo-icons/Table";
import UsersGroupOff from "@/components/icons/neevo-icons/UsersGroupOff";
import Webhook from "@/components/icons/neevo-icons/Webhook";

// CONTEXTS //
import { useAuthContext } from "@/contexts/AuthContext";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

// OTHERS //
import { cn } from "@/lib/utils";

// DATA //
import type {
  LandingPageAudienceCardData,
  LandingPageFeatureCardData,
  LandingPageProblemCardData,
  LandingPageStepData,
} from "@/app/data/landing-page";
import { landingPageDetails } from "@/app/data/landing-page";

// HOOKS //

// LIBRARIES //

const problemCardToneClassNameMap: Record<
  LandingPageProblemCardData["tone"],
  string
> = {
  red: "bg-red-50 text-red-500",
  blue: "bg-blue-50 text-blue-500",
  violet: "bg-fuchsia-50 text-fuchsia-500",
};

const audienceCardToneClassNameMap: Record<
  LandingPageAudienceCardData["tone"],
  string
> = {
  blue: "border border-[#1b66c8] bg-[linear-gradient(135deg,#0B5FBC_0%,#1462BD_100%)] text-[#f8fbff]",
  violet:
    "border border-[#c1cdfd] bg-[linear-gradient(135deg,#D9DFFD_0%,#D6DCFF_100%)] text-[#2c3967]",
};

const stepToneClassNameMap: Record<LandingPageStepData["tone"], string> = {
  blue: "bg-[#0058ba] text-[#f0f2ff]",
  violet: "bg-[#8b3ea8] text-[#f8f1ff]",
};

/**
 * Renders the public marketing landing page for Gridzo.
 */
export default function LandingPage() {
  // Define Navigation
  const router = useRouter();

  // Define Context
  const { session, isLoading } = useAuthContext();

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Routes authenticated users directly to the dashboard.
   */
  const routeAuthenticatedUserService = (): void => {
    router.replace(ROUTES.APP.DASHBOARD);
  };

  /**
   * Returns the role-specific treatment for audience cards.
   */
  const getAudienceCardClassNameService = (
    tone: LandingPageAudienceCardData["tone"],
  ): string => {
    return audienceCardToneClassNameMap[tone];
  };

  /**
   * Returns the icon shell class name for a problem card.
   */
  const getProblemCardIconClassNameService = (
    tone: LandingPageProblemCardData["tone"],
  ): string => {
    return problemCardToneClassNameMap[tone];
  };

  /**
   * Returns the matching icon for a landing page problem card.
   */
  const getProblemCardIconService = (
    tone: LandingPageProblemCardData["tone"],
  ): JSX.Element => {
    const problemIconPropsData = {
      className: "h-7 w-7",
    };

    switch (tone) {
      case "red":
        return <MoneyTrend {...problemIconPropsData} primaryColor="#c92b2b" />;
      case "blue":
        return (
          <UsersGroupOff {...problemIconPropsData} primaryColor="#0C61BF" />
        );
      case "violet":
        return (
          <DatabaseServer1 {...problemIconPropsData} primaryColor="#8b3ea8" />
        );
      default:
        return <MoneyTrend {...problemIconPropsData} primaryColor="#c92b2b" />;
    }
  };

  /**
   * Returns the timeline badge treatment for a landing page step.
   */
  const getStepBadgeClassNameService = (
    tone: LandingPageStepData["tone"],
  ): string => {
    return stepToneClassNameMap[tone];
  };

  /**
   * Returns the matching feature icon for a landing page capability card.
   */
  const getFeatureIconService = (
    iconName: LandingPageFeatureCardData["iconName"],
  ): JSX.Element | null => {
    const featureIconPropsData = {
      className: "h-8 w-8",
      primaryColor: "#0C61BF",
    };

    switch (iconName) {
      case "project-management":
        return <GridDots {...featureIconPropsData} />;
      case "sheets-integration":
        return <Table {...featureIconPropsData} />;
      case "api-gen":
        return <ConnectionIntegrationSystemApi {...featureIconPropsData} />;
      case "mapping":
        return <ArrowsStepInto {...featureIconPropsData} />;
      case "instant-deploy":
        return <Webhook {...featureIconPropsData} />;
      case "activity-logs":
        return <Log {...featureIconPropsData} />;
      default:
        return null;
    }
  };

  // Use Effects
  useEffect(() => {
    if (isLoading || !session?.token) {
      return;
    }

    routeAuthenticatedUserService();
  }, [isLoading, router, session?.token]);

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#f7f5ff]">
        <p className="text-sm text-n-700">Loading experience...</p>
      </section>
    );
  }

  if (session?.token) {
    return null;
  }

  return (
    <main id="top" className="bg-[#f7f5ff] text-[#232c51]">
      <header className="sticky top-0 z-20 border-b border-white/50 bg-[rgba(255,255,255,0.8)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-[1280px] items-center justify-between px-6 md:px-10 xl:px-16">
          <Link
            href={ROUTES.APP.HOME}
            className="text-xl font-semibold tracking-[-0.04em] text-[#0f172a]"
          >
            Gridzo
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-medium text-[#475569] transition-colors hover:bg-[#e8ecff]"
            >
              Login
            </Link>

            <Link
              href={ROUTES.AUTH.LOGIN}
              className="inline-flex items-center justify-center rounded-lg bg-[linear-gradient(135deg,#0058BA_0%,#6C9FFF_100%)] px-6 py-2.5 text-sm font-semibold text-[#f0f2ff] shadow-[0_10px_15px_-3px_rgba(0,88,186,0.2),0_4px_6px_-4px_rgba(0,88,186,0.2)] transition-transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="px-6 pt-16 pb-20 md:px-10 md:pt-20 xl:px-16 xl:pt-24 xl:pb-24">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-14 xl:flex-row xl:items-center xl:gap-16">
          <div className="flex flex-1 flex-col items-start gap-8">
            <span className="inline-flex rounded-full bg-[#c6cfff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3px] text-[#1f3ea2]">
              {landingPageDetails.heroSectionDetails.eyebrow}
            </span>

            <div className="max-w-[640px]">
              <h1 className="text-5xl leading-[1.02] font-extrabold tracking-[-0.06em] text-[#232c51] md:text-6xl xl:text-7xl">
                {landingPageDetails.heroSectionDetails.title}
                <span className="text-[#0058ba]">
                  {landingPageDetails.heroSectionDetails.titleAccent}
                </span>
              </h1>
            </div>

            <p className="max-w-[520px] text-base leading-[1.65] text-[#505a81] md:text-lg">
              {landingPageDetails.heroSectionDetails.description}
            </p>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row">
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="inline-flex items-center justify-center rounded-xl bg-[linear-gradient(135deg,#0058BA_0%,#6C9FFF_100%)] px-8 py-4 text-base font-semibold text-[#f0f2ff] shadow-[0_20px_25px_-5px_rgba(0,88,186,0.25),0_8px_10px_-6px_rgba(0,88,186,0.25)] transition-transform hover:-translate-y-0.5"
              >
                {landingPageDetails.heroSectionDetails.ctaLabel}
              </Link>

              <Link
                href="#product-preview"
                className="inline-flex items-center justify-center rounded-xl bg-[#dde1ff] px-8 py-4 text-base font-semibold text-[#0058ba] transition-colors hover:bg-[#d1d8ff]"
              >
                {landingPageDetails.heroSectionDetails.demoLabel}
              </Link>
            </div>
          </div>

          <div className="flex flex-1 justify-center xl:justify-end">
            <div className="w-full max-w-[620px] rotate-2 rounded-2xl border-4 border-[#d5dbff] bg-white p-1 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <div className="overflow-hidden rounded-xl bg-[#04112f]">
                <Image
                  src={landingPageDetails.heroSectionDetails.imageUrl}
                  alt={landingPageDetails.heroSectionDetails.imageAlt}
                  width={1152}
                  height={1152}
                  className="h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efefff] px-6 py-20 md:px-10 xl:px-16 xl:py-24">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12">
          <div className="text-center">
            <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#293462] md:text-5xl">
              {landingPageDetails.problemSectionDetails.title}
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {landingPageDetails.problemSectionDetails.cardItems.map(
              (problemCardItem) => (
                <article
                  key={problemCardItem.title}
                  className="rounded-[26px] bg-white p-10 shadow-[0_12px_28px_rgba(114,126,184,0.05)]"
                >
                  <div
                    className={cn(
                      "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl",
                      getProblemCardIconClassNameService(problemCardItem.tone),
                    )}
                  >
                    {getProblemCardIconService(problemCardItem.tone)}
                  </div>
                  <h3 className="mb-4 max-w-[300px] text-[2rem] leading-[1.18] font-semibold tracking-[-0.04em] text-[#293462]">
                    {problemCardItem.title}
                  </h3>
                  <p className="max-w-[320px] text-base leading-[1.7] text-[#5a6897] md:text-[1.05rem]">
                    {problemCardItem.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 px-6 py-24 text-center md:px-10 xl:px-16 xl:py-28"
      >
        <h2 className="max-w-[860px] text-4xl leading-[1.1] font-extrabold tracking-[-0.05em] text-[#232c51] md:text-5xl xl:text-6xl">
          Meet Gridzo - a smarter way to
          <span className="text-[#0058ba]"> manage website content</span>
        </h2>
        <p className="max-w-[700px] text-lg leading-[1.65] text-[#505a81]">
          We bridge the gap between technical flexibility and non-technical ease
          of use. Your frontend gets an API; your client gets a spreadsheet.
        </p>
      </section>

      <section
        id="how-it-works"
        className="bg-[#e4e7ff] px-6 py-20 md:px-10 xl:px-16 xl:py-24"
      >
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="relative grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-16">
            <div className="absolute top-9 right-0 left-0 hidden h-1 bg-[#c6cfff] xl:block" />
            {landingPageDetails.stepSectionDetails.stepItems.map((stepItem) => (
              <article
                key={stepItem.stepNumber}
                className="relative flex flex-col gap-6"
              >
                <div
                  className={cn(
                    "relative z-10 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-semibold shadow-[0_10px_25px_rgba(0,88,186,0.12)]",
                    getStepBadgeClassNameService(stepItem.tone),
                  )}
                >
                  <span className="leading-none">{stepItem.stepNumber}</span>
                </div>
                <div className="h-1 w-full bg-[#c6cfff] xl:hidden" />
                <div>
                  <h3 className="mb-4 text-[2rem] leading-[1.12] font-semibold tracking-[-0.04em] text-[#2a3562]">
                    {stepItem.title}
                  </h3>
                  <p className="max-w-[320px] text-base leading-[1.55] text-[#53618f] md:text-[1.05rem]">
                    {stepItem.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1280px] px-6 py-24 md:px-10 xl:px-16 xl:py-28">
        <div className="mb-12">
          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-[#293462] md:text-5xl">
            {landingPageDetails.featureSectionDetails.title}
          </h2>
          <div className="mt-5 h-2 w-14 rounded-full bg-[#4f89e8]" />
        </div>

        <div className="grid overflow-hidden rounded-[30px] border border-[#d6dcfb] bg-white shadow-[0_10px_30px_rgba(114,126,184,0.06)] md:grid-cols-2 xl:grid-cols-3">
          {landingPageDetails.featureSectionDetails.cardItems.map(
            (featureCardItem) => (
              <article
                key={featureCardItem.title}
                className="border-b border-[#dfe3f8] p-10 md:min-h-[290px] md:[&:nth-last-child(-n+2)]:border-b-0 xl:[&:nth-last-child(-n+3)]:border-b-0 xl:[&:not(:nth-child(3n))]:border-r md:[&:not(:nth-child(2n))]:border-r xl:border-b"
              >
                <div className="mb-8 text-[#0C61BF]">
                  {getFeatureIconService(featureCardItem.iconName)}
                </div>
                <h3 className="mb-4 text-[2rem] leading-[1.15] font-semibold tracking-[-0.04em] text-[#293462]">
                  {featureCardItem.title}
                </h3>
                <p className="max-w-[310px] text-base leading-[1.55] text-[#5a6897] md:text-[1.05rem]">
                  {featureCardItem.description}
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1280px] gap-6 px-6 pb-24 md:px-10 xl:grid-cols-2 xl:px-16 xl:pb-28">
        {landingPageDetails.audienceSectionDetails.cardItems.map(
          (audienceCardItem) => (
            <article
              key={audienceCardItem.eyebrow}
              className={cn(
                "rounded-[28px] p-8 shadow-[0_18px_40px_rgba(80,96,160,0.10)] md:p-9",
                getAudienceCardClassNameService(audienceCardItem.tone),
              )}
            >
              <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-current/80">
                {audienceCardItem.eyebrow}
              </p>
              <h3 className="mb-4 max-w-[520px] text-[2rem] leading-[1.15] font-semibold tracking-[-0.04em] text-current md:text-[2.125rem]">
                {audienceCardItem.title}
              </h3>
              <p className="mb-8 max-w-[520px] text-base leading-[1.55] text-current/80 md:text-[1.05rem]">
                {audienceCardItem.description}
              </p>
              <ul className="space-y-5">
                {audienceCardItem.bulletItems.map((bulletItem) => (
                  <li
                    key={bulletItem}
                    className="flex items-start gap-3.5 text-base leading-[1.55] text-current/90 md:text-[1.05rem]"
                  >
                    <span className="mt-0.5 shrink-0">
                      <CheckCircle
                        className="h-6 w-6"
                        primaryColor={
                          audienceCardItem.tone === "blue"
                            ? "#F8FAFF"
                            : "#0C61BF"
                        }
                      />
                    </span>
                    <span>{bulletItem}</span>
                  </li>
                ))}
              </ul>
            </article>
          ),
        )}
      </section>

      <section
        id="product-preview"
        className="bg-[#020a2f] px-6 py-24 md:px-10 xl:px-16 xl:py-28"
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 xl:flex-row xl:items-center xl:gap-16">
          <div className="max-w-[390px]">
            <div className="mb-10">
              <h2 className="mb-3 text-3xl font-bold text-[#f7f5ff]">
                {landingPageDetails.previewSectionDetails.editorTitle}
              </h2>
              <p className="text-base leading-[1.65] text-[#929bc6]">
                {landingPageDetails.previewSectionDetails.editorDescription}
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-3xl font-bold text-[#f7f5ff]">
                {landingPageDetails.previewSectionDetails.activityTitle}
              </h2>
              <p className="text-base leading-[1.65] text-[#929bc6]">
                {landingPageDetails.previewSectionDetails.activityDescription}
              </p>
            </div>
          </div>

          <div className="grid flex-1 gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <Image
                src={landingPageDetails.previewSectionDetails.editorImageUrl}
                alt={landingPageDetails.previewSectionDetails.editorImageAlt}
                width={754}
                height={750}
                className="h-full w-full"
              />
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <Image
                src={landingPageDetails.previewSectionDetails.activityImageUrl}
                alt={landingPageDetails.previewSectionDetails.activityImageAlt}
                width={754}
                height={750}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 xl:px-16 xl:py-24">
        <div className="mx-auto w-full max-w-[1280px] rounded-[40px] bg-[linear-gradient(135deg,#0058BA_0%,#6C9FFF_100%)] px-8 py-16 text-center shadow-[0_35px_80px_rgba(0,88,186,0.18)] md:px-16">
          <h2 className="mx-auto max-w-[760px] text-4xl font-bold text-[#f0f2ff] md:text-5xl">
            {landingPageDetails.ctaSectionDetails.title}
          </h2>
          <p className="mx-auto mt-4 max-w-[580px] text-base leading-[1.65] text-[#f0f2ff]/90 md:text-lg">
            {landingPageDetails.ctaSectionDetails.description}
          </p>
          <div className="mt-8">
            <Link
              href={ROUTES.AUTH.LOGIN}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-10 py-5 text-lg font-semibold text-[#0058ba] transition-transform hover:-translate-y-0.5"
            >
              Get Started Free
            </Link>
          </div>
          <p className="mt-6 text-sm text-[#f0f2ff]/70">
            {landingPageDetails.ctaSectionDetails.footnote}
          </p>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f080] bg-[#f8fafc] px-6 pt-20 pb-10 md:px-10 xl:px-16">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12">
          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-[#0f172a]">
                {landingPageDetails.footerSectionDetails.title}
              </h3>
              <p className="text-sm leading-[1.65] text-[#64748b]">
                {landingPageDetails.footerSectionDetails.description}
              </p>
            </div>

            {landingPageDetails.footerSectionDetails.groupItems.map(
              (footerGroupItem) => (
                <div key={footerGroupItem.label}>
                  <h4 className="mb-4 text-base font-semibold text-[#0f172a]">
                    {footerGroupItem.label}
                  </h4>
                  <div className="flex flex-col gap-3">
                    {footerGroupItem.linkItems.map((footerLinkItem) => (
                      <Link
                        key={footerLinkItem.label}
                        href={footerLinkItem.href}
                        className="text-sm text-[#64748b] transition-colors hover:text-[#0058ba] hover:underline"
                      >
                        {footerLinkItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="flex flex-col gap-5 border-t border-[#e2e8f080] pt-8 text-sm text-[#64748b] md:flex-row md:items-center md:justify-between">
            <p>{landingPageDetails.footerSectionDetails.copyrightText}</p>
            <Link
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e2e8f0] text-[#0f172a] transition-colors hover:bg-[#d8e0ea]"
            >
              <ShareLink className="h-4 w-4" primaryColor="currentColor" />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
