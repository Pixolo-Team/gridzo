interface PageIntroPropsData {
  description: string;
  title: string;
}

/**
 * Renders a reusable page intro block with title and supporting description
 */
export default function PageIntro({ description, title }: PageIntroPropsData) {
  // Define Navigation

  // Define Context

  // Define Refs

  // Define States

  // Helper Functions

  // Use Effects

  return (
    <div className="flex flex-col gap-3.5">
      {/* Title */}
      <h1 className="text-2xl font-bold text-n-900 md:text-3xl">{title}</h1>

      {/* Description */}
      <p className="max-w-full text-xs text-n-500 md:max-w-[70%] md:text-base">
        {description}
      </p>
    </div>
  );
}
