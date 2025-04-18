import Header from "@/components/Header";
import React from "react";
import Footer from "../../components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-floral-white">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
