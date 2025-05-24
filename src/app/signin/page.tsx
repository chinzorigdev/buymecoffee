"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Coffee,
  Star,
  ChevronLeft,
  ChevronRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SigninPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Same carousel data as signup page
  const carouselItems = [
    {
      title: "Таны бүтээлийг дэмжүүлэх",
      description:
        "Өөрийн хүсэл зорилгод хүрэхэд тусалж буй хүмүүсээсээ кофе авах боломжтой.",
      author: "Болдбаатар",
      role: "Зохиолч",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      title: "Хялбар, хурдан дэмжлэг",
      description:
        "Хэдхэн товшилтоор өөрт таалагдсан бүтээлчийг дэмжиж, урам өгөх боломжтой.",
      author: "Сарангэрэл",
      role: "Уран бүтээлч",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    },
    {
      title: "Олонтой хуваалцаарай",
      description:
        "Өөрийн ажил, хүсэл зорилгыг олон хүнтэй хуваалцаж, дэмжлэг авах боломжтой.",
      author: "Батбаяр",
      role: "Блогер",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselItems.length]);

  const handleSigninSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
        callbackUrl: "/complete-your-page",
      });

      if (result?.ok) {
        // Redirect to dashboard or home page after successful signin
        // window.location.href = "/"; // Will be handled by callbackUrl
      } else {
        console.error("Signin failed:", result?.error);
      }
    } catch (error) {
      console.error("Signin error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/complete-your-page" });
    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Yellow Carousel (same as signup) */}
      <div className="hidden lg:flex lg:w-1/2 bg-yellow-400 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-600 rounded-full"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-600 rounded-full"></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-yellow-600 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-12 h-12 bg-yellow-600 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-black">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-black p-2 rounded-lg">
              <Coffee className="h-8 w-8 text-yellow-400" />
            </div>
            <span className="text-2xl font-bold">БүйМиКофи</span>
          </div>

          {/* Main Content - Carousel */}
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight">
                {carouselItems[currentSlide].title}
              </h1>
              <p className="text-xl leading-relaxed opacity-90">
                {carouselItems[currentSlide].description}
              </p>
            </div>
            {/* User Testimonial */}
            <div className="bg-black/10 rounded-2xl p-6 backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <Image
                  src={carouselItems[currentSlide].avatar}
                  alt={carouselItems[currentSlide].author}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">
                    {carouselItems[currentSlide].author}
                  </h4>
                  <p className="text-sm opacity-75">
                    {carouselItems[currentSlide].role}
                  </p>
                </div>
                <div className="ml-auto flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-black" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentSlide ? "bg-black" : "bg-black/30"
                  }`}
                />
              ))}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() =>
                  setCurrentSlide(
                    (prev) =>
                      (prev - 1 + carouselItems.length) % carouselItems.length
                  )
                }
                className="p-2 bg-black/20 rounded-full hover:bg-black/30 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % carouselItems.length)
                }
                className="p-2 bg-black/20 rounded-full hover:bg-black/30 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - White Signin Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Coffee className="h-8 w-8 text-black" />
            </div>
            <span className="text-2xl font-bold">БүйМиКофи</span>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900">
                Эргэн нэвтрэх
              </h1>
              <p className="text-gray-600">
                Өөрийн хэрэглэгчийн эрхээр нэвтэрнэ үү
              </p>
            </div>

            {/* Social Login Options */}
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                className="w-full py-3 border-2 hover:bg-gray-50"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google-ээр нэвтрэх
              </Button>

              <Button
                variant="outline"
                onClick={() => signIn("facebook", { callbackUrl: "/" })}
                className="w-full py-3 border-2 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook-ээр нэвтрэх
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">эсвэл</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSigninSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Имэйл хаяг
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 py-3 border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Нууц үг
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Нууц үгээ оруулна уу"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 py-3 border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 text-lg"
              >
                Нэвтрэх
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-600">
                Бүртгэлгүй юу?{" "}
                <Link
                  href="/signup"
                  className="text-yellow-600 hover:text-yellow-700 font-medium"
                >
                  Бүртгүүлэх
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
