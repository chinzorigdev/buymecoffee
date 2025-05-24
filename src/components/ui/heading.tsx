import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    variant: {
      h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
      h2: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
      h3: "text-2xl sm:text-3xl md:text-4xl",
      h4: "text-xl sm:text-2xl md:text-3xl",
      h5: "text-lg sm:text-xl md:text-2xl",
      h6: "text-base sm:text-lg md:text-xl",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      accent: "text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "h2",
    color: "default",
  },
});

export interface HeadingProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">,
    Omit<VariantProps<typeof headingVariants>, "color"> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  textColor?: "default" | "muted" | "primary" | "accent";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, variant, textColor, as = "h2", ...props }, ref) => {
    const Comp = as;
    return (
      <Comp
        className={cn(
          headingVariants({ variant, color: textColor, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Heading.displayName = "Heading";

export { Heading, headingVariants };
