import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/common";

const Footer = () => {
  const footerLinks = [
    { href: "/about", label: "Бидний тухай" },
    { href: "/help", label: "Тусламжийн төв", external: true },
    { href: "/privacy", label: "Нууцлал" },
    { href: "/terms", label: "Үйлчилгээний нөхцөл" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", label: "Facebook" },
    { href: "https://twitter.com", label: "Twitter" },
    { href: "https://instagram.com", label: "Instagram" },
  ];

  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-8 sm:py-12 lg:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="font-semibold text-foreground mb-4">Надад Кофе Авч Өгөөрэй</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Бүтээлчдэд дэмжлэг үзүүлэх хялбар, найрсаг платформ.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Холбоосууд</h3>
              <nav className="space-y-3">
                {footerLinks.slice(0, 2).map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Хуулийн</h3>
              <nav className="space-y-3">
                {footerLinks.slice(2).map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Биднийг дагаарай</h3>
              <nav className="space-y-3">
                {socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Separator */}
          <Separator className="my-6 sm:my-8" />
          
          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-xs sm:text-sm text-muted-foreground">
              © 2024 Надад Кофе Авч Өгөөрэй. Бүх эрх хуулиар хамгаалагдсан.
            </p>
            
            {/* Language/Theme Toggle - Future enhancement */}
            <div className="flex items-center space-x-4">
              <span className="text-xs sm:text-sm text-muted-foreground">
                Монгол хэл
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
