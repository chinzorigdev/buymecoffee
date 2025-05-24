"use client";
import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Container, Logo, SearchInput, MobileMenu } from "@/components/common";
import { Navigation, AuthButtons } from "@/components/layout";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigationItems = [
    { label: "Судлах", href: "#explore" },
    { label: "Асуулт хариулт", href: "#faq" },
    { label: "Нөөц", href: "#resources" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Desktop Navigation - Left */}
          <Navigation items={navigationItems} />

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={toggleMobileMenu}
          >
            <FiMenu className="h-5 w-5" />
          </Button>

          {/* Logo - Center */}
          <Logo />

          {/* Search & Actions - Right */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Desktop Search */}
            <SearchInput variant="desktop" />

            {/* Mobile Search Icon */}
            <SearchInput variant="compact" />

            {/* Auth Buttons */}
            <AuthButtons />
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onToggle={toggleMobileMenu}
        navigationItems={navigationItems}
      />
    </header>
  );
};

export default Header;
