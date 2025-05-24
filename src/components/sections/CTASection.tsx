"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/common";
import { Heading, Text } from "@/components/ui";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  variant?: "default" | "gradient" | "outlined";
}

const CTASection: React.FC<CTASectionProps> = ({
  title = "Эхлэхэд бэлэн үү?",
  description = "Одоо өөрийн дэмжлэгийн платформыг бүтээж, дэмжигчидтэйгээ холбогдоорой.",
  primaryButtonText = "Бүртгүүлэх",
  secondaryButtonText = "Дэлгэрэнгүй мэдээлэл",
  primaryButtonHref = "/signup",
  secondaryButtonHref = "/about",
  onPrimaryClick,
  onSecondaryClick,
  variant = "default",
}) => {
  const handlePrimaryClick = () => {
    if (onPrimaryClick) {
      onPrimaryClick();
    } else if (primaryButtonHref) {
      window.location.href = primaryButtonHref;
    } else {
      alert("Бүртгүүлэхийг эхлүүлж байна...");
    }
  };

  const handleSecondaryClick = () => {
    if (onSecondaryClick) {
      onSecondaryClick();
    } else if (secondaryButtonHref) {
      window.location.href = secondaryButtonHref;
    } else {
      alert("Дэлгэрэнгүй мэдээлэл...");
    }
  };
  if (variant === "gradient") {
    return (
      <Section
        className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 relative overflow-hidden"
        padding="xl"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl sm:w-32 sm:h-32 md:w-40 md:h-40" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/10 rounded-full blur-xl sm:w-28 sm:h-28 md:w-36 md:h-36" />

        <div className="relative text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heading
            variant="h2"
            className={cn(
              "text-gray-900 mb-4 sm:mb-6 md:mb-8",
              "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
              "leading-tight font-bold"
            )}
          >
            {title}
          </Heading>
          <Text
            variant="large"
            className={cn(
              "text-gray-800 mb-6 sm:mb-8 md:mb-10",
              "text-base sm:text-lg md:text-xl",
              "max-w-3xl mx-auto leading-relaxed"
            )}
          >
            {description}
          </Text>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
            <Button
              size="lg"
              variant="outline"
              className={cn(
                "w-full sm:w-auto min-w-[200px]",
                "bg-white text-gray-900 border-2 border-gray-900",
                "hover:bg-gray-100 hover:border-gray-800",
                "py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-10",
                "text-base sm:text-lg md:text-xl font-semibold",
                "rounded-full transition-all duration-200",
                "shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              )}
              onClick={handlePrimaryClick}
            >
              {primaryButtonText}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className={cn(
                "w-full sm:w-auto min-w-[200px]",
                "text-gray-900 hover:bg-white/20 hover:text-gray-800",
                "py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-10",
                "text-base sm:text-lg md:text-xl font-semibold",
                "rounded-full transition-all duration-200",
                "border-2 border-transparent hover:border-white/30"
              )}
              onClick={handleSecondaryClick}
            >
              {secondaryButtonText}
            </Button>
          </div>
        </div>
      </Section>
    );
  }
  if (variant === "outlined") {
    return (
      <Section padding="xl" className="px-4 sm:px-6 lg:px-8">
        <Card
          className={cn(
            "border-2 border-yellow-200 bg-yellow-50/50 backdrop-blur-sm",
            "shadow-lg hover:shadow-xl transition-all duration-300",
            "mx-auto max-w-5xl"
          )}
        >
          <CardContent className="p-6 sm:p-8 md:p-12 lg:p-16 text-center">
            <Heading
              variant="h2"
              className={cn(
                "mb-4 sm:mb-6 md:mb-8",
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                "leading-tight font-bold text-gray-900"
              )}
            >
              {title}
            </Heading>
            <Text
              variant="large"
              textColor="muted"
              className={cn(
                "mb-6 sm:mb-8 md:mb-10",
                "text-base sm:text-lg md:text-xl",
                "max-w-4xl mx-auto leading-relaxed"
              )}
            >
              {description}
            </Text>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
              <Button
                size="lg"
                className={cn(
                  "w-full sm:w-auto min-w-[200px]",
                  "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
                  "py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-10",
                  "text-base sm:text-lg md:text-xl font-semibold",
                  "rounded-full transition-all duration-200",
                  "shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                )}
                onClick={handlePrimaryClick}
              >
                {primaryButtonText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "w-full sm:w-auto min-w-[200px]",
                  "border-2 border-yellow-400 text-yellow-600",
                  "hover:bg-yellow-50 hover:border-yellow-500",
                  "py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-10",
                  "text-base sm:text-lg md:text-xl font-semibold",
                  "rounded-full transition-all duration-200"
                )}
                onClick={handleSecondaryClick}
              >
                {secondaryButtonText}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Section>
    );
  }
  return (
    <Section background="muted" padding="xl" className="px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-5xl mx-auto">
        <Heading
          variant="h2"
          className={cn(
            "mb-4 sm:mb-6 md:mb-8",
            "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
            "leading-tight font-bold"
          )}
        >
          {title}
        </Heading>
        <Text
          variant="large"
          textColor="muted"
          className={cn(
            "mb-6 sm:mb-8 md:mb-10",
            "text-base sm:text-lg md:text-xl",
            "max-w-4xl mx-auto leading-relaxed"
          )}
        >
          {description}
        </Text>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6">
          <Button
            size="lg"
            className={cn(
              "w-full sm:w-auto min-w-[200px]",
              "bg-yellow-400 hover:bg-yellow-500 text-gray-900",
              "py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-10",
              "text-base sm:text-lg md:text-xl font-semibold",
              "rounded-full transition-all duration-200",
              "shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            )}
            onClick={handlePrimaryClick}
          >
            {primaryButtonText}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={cn(
              "w-full sm:w-auto min-w-[200px]",
              "border-2 hover:bg-accent hover:text-accent-foreground",
              "py-3 px-6 sm:py-4 sm:px-8 md:py-6 md:px-10",
              "text-base sm:text-lg md:text-xl font-semibold",
              "rounded-full transition-all duration-200"
            )}
            onClick={handleSecondaryClick}
          >
            {secondaryButtonText}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;
