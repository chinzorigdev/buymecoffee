import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textVariants = cva("leading-relaxed", {
  variants: {
    variant: {
      default: "text-base sm:text-lg",
      small: "text-sm sm:text-base",
      large: "text-lg sm:text-xl lg:text-2xl",
      caption: "text-xs sm:text-sm",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-yellow-600",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, "color">,
    Omit<VariantProps<typeof textVariants>, "color"> {
  as?: "p" | "span" | "div";
  textColor?: "default" | "muted" | "primary" | "accent";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, textColor, weight, as = "p", ...props }, ref) => {
    const Comp = as;
    return (
      <Comp
        className={cn(
          textVariants({ variant, color: textColor, weight, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
