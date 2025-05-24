import React from "react";
import { cn } from "@/lib/utils";
import Container from "./Container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "card";
}

const paddingVariants = {
  sm: "py-8 sm:py-12",
  md: "py-12 sm:py-16",
  lg: "py-12 sm:py-16 lg:py-20",
  xl: "py-16 sm:py-20 lg:py-24",
};

const backgroundVariants = {
  default: "",
  muted: "bg-muted/50",
  card: "bg-card",
};

const Section: React.FC<SectionProps> = ({
  children,
  className,
  containerSize = "lg",
  padding = "lg",
  background = "default",
}) => {
  return (
    <section
      className={cn(
        paddingVariants[padding],
        backgroundVariants[background],
        className
      )}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
};

export default Section;
