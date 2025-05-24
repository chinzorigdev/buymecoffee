import React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

interface NavigationProps {
  items: NavigationItem[];
  className?: string;
  variant?: "desktop" | "mobile";
}

const Navigation: React.FC<NavigationProps> = ({
  items,
  className,
  variant = "desktop",
}) => {
  if (variant === "mobile") {
    return (
      <nav className={cn("space-y-1", className)}>
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="block px-4 py-3 text-base font-medium text-muted-foreground hover:text-yellow-500 hover:bg-muted/50 rounded-md transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <NavigationMenu className={cn("hidden lg:flex", className)}>
      <NavigationMenuList className="flex space-x-6">
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="text-sm font-medium text-muted-foreground hover:text-yellow-500 transition-colors cursor-pointer"
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
