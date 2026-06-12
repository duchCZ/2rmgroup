/* eslint-disable @next/next/no-img-element */

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  /** Use the white-text variant for dark backgrounds (default). */
  dark?: boolean;
  priority?: boolean;
}

// Logo artwork is 801 × 276 (≈ 2.9 : 1). Size = rendered height in px.
const heights: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 28,
  md: 42,
  lg: 68,
  xl: 116,
};

export function Logo({
  className = "",
  size = "lg",
  dark = true,
  priority = false,
}: LogoProps) {
  const height = heights[size];
  const width = Math.round((height * 801) / 276);
  const src = dark ? "/2rm-logo-white.svg" : "/2rm-logo.svg";

  return (
    <img
      src={src}
      alt="2RM Group"
      width={width}
      height={height}
      className={`select-none ${className}`}
      style={{ height, width: "auto" }}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
    />
  );
}
