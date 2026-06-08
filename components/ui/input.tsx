import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border border-zinc bg-carbon px-3 py-2 text-sm text-foreground placeholder:text-zinc-600 focus-visible:outline-none focus-visible:border-acid transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 font-display",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
