import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card
      className={cn(
        "border-0 shadow-sm hover:shadow-md transition-shadow duration-200",
        className
      )}
    >
      <CardContent className="p-6 sm:p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 mt-1">{icon}</div>
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-2 text-foreground">
              {title}
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
