// STYLES //
import ThemeImage from "@/components/ui/ThemeImage";

// COMPONENTS //
import Link from "next/link";

// CONSTANTS //
import { ROUTES } from "@/app/constants/routes";

interface BrandLogoPropsData {
  className: string;
  height: number;
  imageClassName: string;
  onClick?: () => void;
  width: number;
}

/**
 * Renders the shared Pixolo brand logo with the exact responsive image sizing passed by each layout
 */
export default function BrandLogo({
  className,
  height,
  imageClassName,
  onClick,
  width,
  ...props
}: BrandLogoPropsData) {
  return (
    <Link href={ROUTES.APP.DASHBOARD} className={className} onClick={onClick}>
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
