import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono tracking-wider",
  {
    variants: {
      variant: {
        default: "border-acid text-acid",
        secondary: "border-zinc-700 text-zinc-400",
        destructive: "border-red-500 text-red-500",
        outline: "border-zinc-700 text-zinc-400",
        live: "border-[#00ff88] text-[#00ff88] animate-pulse",
        confirmed: "border-[#ff6b00] text-[#ff6b00]",
        predicted: "border-acid text-acid",
        ended: "border-[#333] text-[#555]",
        watching: "border-[#555] text-[#555]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
