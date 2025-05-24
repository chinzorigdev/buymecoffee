"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/common";
import { Heading, Text } from "@/components/ui";

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
    onPrimaryClick?.();
    // Default action if no handler provided
    if (!onPrimaryClick) {
      alert("Бүртгүүлэхийг эхлүүлж байна...");
    }
  };

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
    // Default action if no handler provided
    if (!onSecondaryClick) {
      alert("Дэлгэрэнгүй мэдээлэл...");
    }
  };

  if (variant === "gradient") {
    return (
      <Section
        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900"
        padding="xl"
      >
        <div className="text-center max-w-4xl mx-auto">
          <Heading variant="h2" className="text-gray-900 mb-6 sm:mb-8">
            {title}
          </Heading>
          <Text variant="large" className="text-gray-800 mb-8 sm:mb-10 px-4">
            {description}
          </Text>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white text-gray-900 border-gray-900 hover:bg-gray-100 py-6 px-8 text-lg font-semibold rounded-full"
              onClick={handlePrimaryClick}
            >
              {primaryButtonText}
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto text-gray-900 hover:bg-white/20 py-6 px-8 text-lg font-semibold rounded-full"
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
      <Section padding="xl">
        <Card className="border-2 border-yellow-200 bg-yellow-50/50">
          <CardContent className="p-8 sm:p-12 text-center">
            <Heading variant="h2" className="mb-6 sm:mb-8">
              {title}
            </Heading>
            <Text
              variant="large"
              textColor="muted"
              className="mb-8 sm:mb-10 max-w-3xl mx-auto px-4"
            >
              {description}
            </Text>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-6 px-8 text-lg font-semibold rounded-full"
                onClick={handlePrimaryClick}
              >
                {primaryButtonText}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto py-6 px-8 text-lg font-semibold rounded-full"
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
    <Section background="muted" padding="xl">
      <div className="text-center max-w-4xl mx-auto">
        <Heading variant="h2" className="mb-6 sm:mb-8">
          {title}
        </Heading>
        <Text variant="large" textColor="muted" className="mb-8 sm:mb-10 px-4">
          {description}
        </Text>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Button
            size="lg"
            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-6 px-8 text-lg font-semibold rounded-full"
            onClick={handlePrimaryClick}
          >
            {primaryButtonText}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto py-6 px-8 text-lg font-semibold rounded-full"
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
