import type { ReactNode } from "react";
import type { ComponentProps } from "react";

type ButtonProps = {
    children: ReactNode;
    variant?: Variant;
} & ComponentProps<"button">;

type Variant = "primary" | "secondary" | "ghost-destructive";

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {

  return (
    <button
      {...props}
      className={`${getVariantStyles(variant)} transition-colors rounded px-2 py-1 disabled:opacity-30 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}

function getVariantStyles(variant: Variant) {
  switch (variant) {
    case "primary":
      return "bg-violet-600 hover:bg-violet-500";
    case "secondary":
      return "bg-zinc-700 hover:bg-zinc-600 text-zinc-400";
    case "ghost-destructive":
      return "hover:bg-red-800 text-red-800 hover:text-red-200";
    default:
      return variant satisfies never;
  }
}