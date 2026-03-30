// REACT //
import type { ComponentType, SVGProps } from "react";

export type IconPropsData = SVGProps<SVGSVGElement> & {
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
};

export type IconComponent = ComponentType<IconPropsData>;
