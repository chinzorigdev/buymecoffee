import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import SessionRefresh from "@/components/auth/SessionRefresh";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Надад Кофе Авч Өгөөрэй - Бүтээлчдэд дэмжлэг үзүүлэх платформ",
  description:
    "Бүтээлчдэд дэмжлэг үзүүлэх хялбар, найрсаг платформ. Хэдхэн товшилтоор дэмжлэг илэрхийл.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >        <SessionProvider>
          <SessionRefresh>
            {/* Апп фолдер доторх үндсэн LAYOUT */}
            {children}
          </SessionRefresh>
        </SessionProvider>
      </body>
    </html>
  );
}
