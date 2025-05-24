"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import SearchInput from "./SearchInput";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  navigationItems: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  navigationItems,
  className,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetContent side="left" className={cn("w-full sm:w-80", className)}>
        <SheetHeader>
          <SheetTitle className="text-left">Навигаци</SheetTitle>
        </SheetHeader>

        <div className="py-6 space-y-6">
          {/* Search */}
          <div className="px-1">
            <SearchInput variant="mobile" placeholder="Хайх..." />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navigationItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-yellow-500 hover:bg-muted/50 rounded-md transition-colors"
                onClick={onToggle}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="border-t pt-6 space-y-3">
            <Button
              variant="ghost"
              className="w-full justify-start text-base font-medium"
              onClick={onToggle}
            >
              Нэвтрэх
            </Button>
            <Button
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-medium rounded-full"
              onClick={onToggle}
            >
              Бүртгүүлэх
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
