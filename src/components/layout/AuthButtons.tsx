import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  className?: string;
  variant?: "desktop" | "mobile";
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  className,
  variant = "desktop",
}) => {
  if (variant === "mobile") {
    return (
      <div className={cn("space-y-3", className)}>
        <Button
          variant="ghost"
          className="w-full justify-start text-base font-medium"
          asChild
        >
          <Link href="/signin">Нэвтрэх</Link>
        </Button>
        <Button
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-full"
          asChild
        >
          <Link href="/signup">Бүртгүүлэх</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button variant="ghost" size="sm" className="text-sm font-medium" asChild>
        <Link href="/signin">Нэвтрэх</Link>
      </Button>
      <Button
        size="sm"
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-full"
        asChild
      >
        <Link href="/signup">Бүртгүүлэх</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
