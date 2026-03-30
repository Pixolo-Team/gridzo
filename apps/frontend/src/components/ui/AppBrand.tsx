// REACT //
import type { ComponentProps, MouseEventHandler, ReactElement } from "react";

// STYLES //
import { ThemeImage } from "@/components/ui/ThemeImage";

// COMPONENTS //
import Link from "next/link";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

type AppBrandPropsData = {
  className: string;
  height: number;
  imageClassName: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  width: number;
} & Omit<ComponentProps<typeof ThemeImage>, "alt" | "className" | "darkSrc" | "height" | "lightSrc" | "width">;

/**
 * Renders the shared Pixolo brand logo with the exact responsive image sizing passed by each layout
 */
export function AppBrand({
  className,
  height,
  imageClassName,
  onClick,
  width,
  ...props
}: AppBrandPropsData): ReactElement {
  return (
    <Link
      href={ROUTES.APP.DASHBOARD}
      className={className}
      onClick={onClick}
    >
      <ThemeImage
        lightSrc="/images/brand/brand-logo.png"
        darkSrc="/images/brand/brand-logo-dark.png"
        alt="Pixolo"
        className={imageClassName}
        style={{ height: "auto" }}
        width={width}
        height={height}
        {...props}
      />
    </Link>
  );
}
