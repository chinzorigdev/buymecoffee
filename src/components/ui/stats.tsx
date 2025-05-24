import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Text, Heading } from "@/components/ui";
import { cn } from "@/lib/utils";

interface StatItem {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
}

interface StatsProps {
  stats: StatItem[];
  className?: string;
  variant?: "default" | "minimal" | "highlighted";
}

const Stats: React.FC<StatsProps> = ({
  stats,
  className,
  variant = "default",
}) => {
  if (variant === "minimal") {
    return (
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6",
          className
        )}
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <Heading variant="h4" className="text-yellow-500 mb-1 sm:mb-2">
              {stat.value}
            </Heading>
            <Text variant="small" textColor="muted">
              {stat.label}
            </Text>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "highlighted") {
    return (
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
          className
        )}
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="border-2 border-yellow-200 hover:border-yellow-300 transition-colors"
          >
            <CardContent className="p-6 text-center">
              {stat.icon && (
                <div className="flex justify-center mb-3">{stat.icon}</div>
              )}
              <Heading variant="h4" className="text-yellow-600 mb-2">
                {stat.value}
              </Heading>
              <Text variant="small" weight="medium">
                {stat.label}
              </Text>
              {stat.description && (
                <Text variant="caption" textColor="muted" className="mt-1">
                  {stat.description}
                </Text>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
        className
      )}
    >
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            {stat.icon && (
              <div className="flex justify-center mb-3">{stat.icon}</div>
            )}
            <Heading variant="h4" className="mb-2">
              {stat.value}
            </Heading>
            <Text variant="small" weight="medium">
              {stat.label}
            </Text>
            {stat.description && (
              <Text variant="caption" textColor="muted" className="mt-1">
                {stat.description}
              </Text>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Stats;
