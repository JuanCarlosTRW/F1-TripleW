import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "secondary";
  size?: "default" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        variant === "secondary" && "bg-white/10 backdrop-blur-sm text-white hover:bg-white/20",
        size === "lg" && "h-12 px-6",
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
