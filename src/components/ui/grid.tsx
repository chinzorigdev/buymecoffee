import React from "react";
import { cn } from "@/lib/utils";

interface GridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: "sm" | "md" | "lg" | "xl";
}

const Grid: React.FC<GridProps> = ({
  children,
  className,
  cols = { default: 1, md: 2, lg: 3 },
  gap = "md",
}) => {
  const gapClasses = {
    sm: "gap-3",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12",
  };

  const getColsClass = () => {
    const classes = ["grid"];

    if (cols.default) classes.push(`grid-cols-${cols.default}`);
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`);
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`);
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`);
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`);

    return classes.join(" ");
  };

  return (
    <div className={cn(getColsClass(), gapClasses[gap], className)}>
      {children}
    </div>
  );
};

export default Grid;
