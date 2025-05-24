"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/common";

const Hero: React.FC = () => {
  const handleStartPage = () => {
    alert("Таны Кофе авч өгөх хуудсыг эхлүүлж байна!");
    // Жинхэнэ апп-д энийг navigation-р солих боломжтой
    // router.push('/signup');
  };

  return (
    <Section padding="xl" className="relative overflow-hidden">
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        {/* Trust Badge */}
        <Badge
          variant="secondary"
          className="flex items-center gap-2 sm:gap-3 mb-8 sm:mb-12 mt-8 sm:mt-16 px-4 py-2 animate-in fade-in duration-600"
        >
          <div className="flex" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                fill="none"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4"
              >
                <path
                  d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                  fill="#2E813A"
                />
              </svg>
            ))}
          </div>
          <span className="text-xs sm:text-sm font-normal">
            1,000,000+ бүтээлчдэд хайртай
          </span>
        </Badge>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-foreground mb-6 sm:mb-8 animate-in fade-in duration-600 delay-200 max-w-5xl px-4">
          Өөрийн бүтээлч ажлаа санхүүжүүлээрэй
        </h1>

        {/* Subtitle */}
        <p className="mb-8 sm:mb-10 text-lg sm:text-xl lg:text-2xl font-normal leading-relaxed text-muted-foreground max-w-3xl mx-auto animate-in fade-in duration-600 delay-300 px-4">
          Дэмжлэгийг хүлээн ав. Энэ нь бодсоноос тань хялбар байх болно
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 animate-in fade-in duration-600 delay-400">
          <Button
            size="lg"
            className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg sm:text-xl py-6 sm:py-7 px-8 sm:px-12 transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
            onClick={handleStartPage}
          >
            Миний хуудсыг бүтээ
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-2 py-6 sm:py-7 px-8 sm:px-12 text-lg sm:text-xl font-semibold w-full sm:w-auto"
          >
            Жишээ үзэх
          </Button>
        </div>

        {/* Additional Info */}
        <p className="text-sm sm:text-base lg:text-lg font-normal text-muted-foreground mt-6 sm:mt-8 animate-in fade-in duration-600 delay-500 px-4">
          Нэг хоромоос ч бага хугацаа зарцуулна!
        </p>
      </div>
    </Section>
  );
};

export default Hero;
