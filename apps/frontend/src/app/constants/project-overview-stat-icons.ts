// TYPES //
import type { IconComponentData } from "@/types/icon";

// COMPONENTS //
import TemplateThemeDesignLayout from "@/components/icons/neevo-icons/TemplateThemeDesignLayout";
import TextFile from "@/components/icons/neevo-icons/TextFile";
import TimeLapse from "@/components/icons/neevo-icons/TimeLapse";

export const projectOverviewStatIconMap = {
  TemplateThemeDesignLayout,
  TextFile,
  TimeLapse,
} satisfies Record<string, IconComponentData>;
