import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizeVariants = {
  sm: "h-6 w-auto sm:h-8 sm:w-auto",
  md: "h-8 w-auto sm:h-10 sm:w-auto",
  lg: "h-10 w-auto sm:h-12 sm:w-auto",
};

const Logo: React.FC<LogoProps> = ({
  className,
  size = "md",
  showText = false,
}) => {
  return (
    <Link href="/" className={cn("flex items-center flex-shrink-0", className)}>
      <Image
        src="/img/bmc-brand-logo.svg"
        alt="Надад Кофе Авч Өгөөрэй"
        width={120}
        height={32}
        priority
        className={sizeVariants[size]}
      />
      {showText && (
        <span className="ml-2 text-lg font-bold text-foreground hidden sm:block">
          Надад Кофе Авч Өгөөрэй
        </span>
      )}
    </Link>
  );
};

export default Logo;
