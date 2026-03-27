// COMPONENTS //
import { Button } from "@/components/ui/button";

const buttonVariantItems = [
  {
    description: "Dark filled action used for primary actions across screens.",
    title: "Primary",
    variant: "primary" as const,
  },
  {
    description:
      "Bordered neutral action for secondary flows and alternate choices.",
    title: "Secondary",
    variant: "secondary" as const,
  },
  {
    description:
      "High-emphasis success action for deploy and completion moments.",
    title: "Success",
    variant: "success" as const,
  },
  {
    description: "Minimal surface action for subtle page-level interactions.",
    title: "Ghost",
    variant: "ghost" as const,
  },
];

const buttonSizeItems = [
  {
    label: "Small",
    size: "small" as const,
  },
  {
    label: "Default",
    size: "default" as const,
  },
  {
    label: "Medium",
    size: "medium" as const,
  },
];

/**
 * Renders a component library page to preview shared UI building blocks
 */
export default function ComponentLibraryPage() {
  return (
    <section className="px-5 py-10 md:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-n-500">
            Design Library
          </p>
          <h1 className="text-3xl font-semibold text-n-950">
            Component Library
          </h1>
          <p className="max-w-3xl text-base text-n-500">
            Preview shared UI patterns in one place so we can quickly verify
            styles before reusing them across pages.
          </p>
        </header>

        <section className="flex flex-col gap-5 rounded-[28px] border border-n-200 bg-n-50 p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-n-950">Buttons</h2>
            <p className="text-sm leading-6 text-n-500">
              This section documents the current shared button system and leaves
              room to add more reusable components later.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {buttonVariantItems.map((buttonVariantItem) => (
              <article
                key={buttonVariantItem.title}
                className="rounded-[28px] border border-n-200 bg-n-50 p-6 shadow-sm"
              >
                <div className="mb-5 flex flex-col gap-2">
                  <h3 className="text-2xl font-semibold text-n-950">
                    {buttonVariantItem.title}
                  </h3>
                  <p className="text-sm leading-6 text-n-500">
                    {buttonVariantItem.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <Button variant={buttonVariantItem.variant}>
                    Button Label
                  </Button>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Button variant={buttonVariantItem.variant} size="small">
                      Small Button
                    </Button>

                    <Button variant={buttonVariantItem.variant} size="medium">
                      Medium Button
                    </Button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Button variant={buttonVariantItem.variant}>
                      <span aria-hidden="true">+</span>
                      Button With Icon
                    </Button>

                    <Button disabled variant={buttonVariantItem.variant}>
                      Disabled Button
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-n-200 bg-n-50 p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-n-950">Button Sizes</h2>
            <p className="text-sm leading-6 text-n-500">
              Compare the shared size scale independently from button color.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {buttonSizeItems.map((buttonSizeItem) => (
              <div
                key={buttonSizeItem.label}
                className="flex flex-col gap-3 rounded-[24px] border border-dashed border-n-300 bg-n-100/60 p-4"
              >
                <p className="text-sm font-medium text-n-500">
                  {buttonSizeItem.label}
                </p>

                <Button size={buttonSizeItem.size} variant="primary">
                  <span aria-hidden="true">+</span>
                  {buttonSizeItem.label} Primary Button
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-n-200 bg-n-50 p-6 shadow-sm">
          <div className="mb-5 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-n-950">
              Button Use Cases
            </h2>
            <p className="text-sm leading-6 text-n-500">
              These examples mirror the styles already used across the project
              screens.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Button size="medium" variant="primary">
              <span aria-hidden="true">+</span>
              Create New Project
            </Button>

            <Button size="default" variant="success">
              <span aria-hidden="true">+</span>
              Deploy Now
            </Button>

            <div className="grid gap-4 md:grid-cols-2">
              <Button size="small" variant="secondary">
                Back
              </Button>

              <Button size="medium" variant="primary">
                Complete Project
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Button size="small" variant="secondary">
                API Data
              </Button>

              <Button size="small" variant="primary">
                API URL
              </Button>
            </div>

            <Button size="medium" variant="primary">
              <span aria-hidden="true">+</span>
              Send Invite
            </Button>
          </div>
        </section>
      </div>
    </section>
  );
}
