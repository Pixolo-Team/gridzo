// COMPONENTS //
import Copy1 from "@/components/icons/neevo-icons/Copy1";
import CopyDocument from "@/components/icons/neevo-icons/CopyDocument";
import { Button } from "@/components/ui/button";

// OTHERS //
import { cn } from "@/lib/utils";

export type InputActionCardActionData = {
  iconToneClassName?: string;
  id: string;
  label: string;
  variant: "primary" | "secondary";
};

export type InputActionCardData = {
  actionItems: InputActionCardActionData[];
  description: string;
  title: string;
  value: string;
};

/**
 * Renders a reusable project overview input card with side actions
 */
export default function InputActionCard({
  actionItems,
  description,
  title,
  value,
}: InputActionCardData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions
  /**
   * Renders the correct action icon for the provided action item
   */
  const renderActionIcon = (actionItem: InputActionCardActionData) => {
    if (actionItem.id === "api-url") {
      return (
        <Copy1
          primaryColor="currentColor"
          className={cn("size-4 md:size-5", actionItem.iconToneClassName)}
        />
      );
    }

    return (
      <CopyDocument
        primaryColor="currentColor"
        className={cn("size-4 md:size-5", actionItem.iconToneClassName)}
      />
    );
  };

  // Use Effects

  return (
    <section className="flex flex-col gap-3 md:gap-3.5">
      {/* Section Title */}
      <h2 className="text-sm font-medium text-n-950 md:text-lg">{title}</h2>

      {/* Card Container */}
      <div className="rounded-2xl border border-n-200 bg-n-50 px-[25px] py-[21px] md:rounded-[18.5px] md:p-[29px]">
        {/* Endpoint Content */}
        <div className="flex flex-col gap-3.5 2xl:flex-row 2xl:items-center 2xl:gap-3">
          {/* Endpoint Value */}
          <div className="flex min-h-[72px] w-full items-center rounded-lg bg-n-100 px-5 py-4 2xl:min-h-14 2xl:min-w-0 2xl:flex-1 2xl:px-[14px] 2xl:py-4">
            <p className="w-full break-all font-mono text-sm leading-6 text-n-700 md:text-lg md:leading-normal">
              {value}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 2xl:flex 2xl:shrink-0 2xl:items-center">
            {actionItems.map((actionItem) => (
              <Button
                key={actionItem.id}
                type="button"
                size="small"
                variant={actionItem.variant}
                className="h-12 w-full gap-2 px-6 text-sm md:text-base 2xl:h-14 2xl:w-auto 2xl:px-8 2xl:text-lg"
              >
                {/* Action Icon */}
                {renderActionIcon(actionItem)}

                {/* Action Label */}
                <span>{actionItem.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Section Description */}
      <p className="text-xs leading-normal text-n-500 md:text-sm">
        {description}
      </p>
    </section>
  );
}
