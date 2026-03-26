// COMPONENTS //
import Image from "next/image";
import Link from "next/link";
import Database from "@/components/icons/neevo-icons/Database";
import { Button } from "@/components/ui/button";

const loginFooterLinkItems = [
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/terms-of-service",
    label: "Terms of Service",
  },
  {
    href: "/support",
    label: "Support",
  },
];

/**
 * Renders the login page
 */
export default function LoginPage() {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <section className="min-h-screen">
      {/* Container */}
      <div className="container mx-auto flex min-h-screen flex-col px-6 py-[clamp(1rem,3vh,3rem)] md:px-10 lg:px-16 lg:py-[clamp(1.5rem,4vh,3.5rem)]">
        {/* Center Content */}
        <div className="flex flex-1 items-start justify-center pt-[clamp(2rem,12vh,8rem)] pb-[clamp(1.5rem,5vh,3rem)] md:pt-[clamp(2.5rem,13vh,8.5rem)] md:pb-[clamp(2rem,6vh,3.5rem)] lg:pt-[clamp(3rem,14vh,9rem)] lg:pb-[clamp(2.5rem,7vh,4rem)]">
          <div className="flex w-full max-w-md flex-col items-center gap-8 md:gap-9 lg:gap-10">
            {/* Brand Block */}
            <div className="flex w-full flex-col items-center gap-3.5 text-center md:gap-5 lg:gap-6">
              <div className="flex size-12 items-center justify-center rounded-xl bg-n-950 shadow-lg shadow-black/10 md:size-14 lg:size-16">
                <Database
                  primaryColor="var(--color-n-50)"
                  className="size-6 md:size-6 lg:size-7"
                />
              </div>

              <div className="flex w-full flex-col items-center gap-2 md:gap-3 lg:gap-4">
                <h1 className="text-3xl leading-none font-semibold text-n-950 md:text-4xl lg:text-5xl">
                  PixSheet
                </h1>
                <p className="max-w-[80%] text-sm leading-normal text-n-500 md:max-w-[72%] md:text-[15px] lg:max-w-[65%] lg:text-base lg:leading-[1.35]">
                  The Google Sheets powered CMS for modern web teams.
                </p>
              </div>
            </div>

            {/* Sign In Card */}
            <div className="flex w-full flex-col items-center gap-6 rounded-xl border border-n-300 bg-n-50 px-7 py-5 md:px-8 lg:px-9">
              <Button
                type="button"
                className="h-12 w-full gap-3 rounded-lg px-6 py-3 text-sm"
                aria-label="Sign in with Google"
              >
                <Image
                  src="/images/google-logo.png"
                  alt=""
                  aria-hidden="true"
                  width={20}
                  height={20}
                  className="size-5"
                />
                <span>Sign in with Google</span>
              </Button>

              <p className="max-w-[84%] text-center text-xs leading-4 text-n-500 md:max-w-[76%] lg:max-w-[72%]">
                By signing in, you agree to our service protocols and data
                management policies.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full border-t border-n-300 pt-4 md:pt-6 lg:pt-8">
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 md:gap-5 lg:gap-6">
            <nav
              aria-label="Legal and support links"
              className="flex w-full items-center justify-between text-xs font-medium text-n-500 md:text-sm"
            >
              {loginFooterLinkItems.map((loginFooterLinkItem) => (
                <Link
                  key={loginFooterLinkItem.label}
                  href={loginFooterLinkItem.href}
                  className="transition-colors hover:text-n-950"
                >
                  {loginFooterLinkItem.label}
                </Link>
              ))}
            </nav>

            <p className="text-center text-sm leading-none font-semibold text-n-300 md:text-[15px] lg:text-base">
              © 2026 Pixolo
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
