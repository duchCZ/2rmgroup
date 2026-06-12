import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  dark?: boolean;
}

const sizes = {
  sm: "text-3xl",
  md: "text-5xl",
  lg: "text-7xl",
  xl: "text-9xl",
};

const stripeSizes = {
  sm: { width: "w-1.5", gap: "gap-1", padding: "py-0.5" },
  md: { width: "w-2", gap: "gap-1.5", padding: "py-0.5" },
  lg: { width: "w-3", gap: "gap-2", padding: "py-1" },
  xl: { width: "w-4", gap: "gap-2.5", padding: "py-1.5" },
};

export function Logo({ className = "", size = "lg", dark = true }: LogoProps) {
  const textColor = dark ? "text-white" : "text-[#111]";
  const s = stripeSizes[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      <span
        className={`${anton.className} ${sizes[size]} ${textColor} leading-none tracking-tight`}
      >
        2RM
      </span>
      <div
        className={`flex ${s.gap} ml-2 self-stretch ${s.padding}`}
        aria-hidden
      >
        <div
          className={`${s.width} bg-[#F5C200] rounded-[2px]`}
          style={{ transform: "skewX(-8deg)" }}
        />
        <div
          className={`${s.width} bg-[#62BAE8] rounded-[2px]`}
          style={{ transform: "skewX(-8deg)" }}
        />
      </div>
    </div>
  );
}
