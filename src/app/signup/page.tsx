"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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

export default function SignupPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: username, 2: signup details
  const [username, setUsername] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  // Carousel data for left panel
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

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setStep(2);
    }
  };
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/");
      } else {
        console.error("Signup failed:", result?.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
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
      {/* Left Panel - Yellow Carousel */}
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
            {/* User Testimonial */}{" "}
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

      {/* Right Panel - White Signup Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Coffee className="h-8 w-8 text-black" />
            </div>
            <span className="text-2xl font-bold">БүйМиКофи</span>
          </div>

          {step === 1 ? (
            /* Step 1: Choose Username */
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  Таны хуудасны нэрийг сонгоно уу
                </h1>
                <p className="text-gray-600">
                  Энэ нэр таны профайлын URL-д ашиглагдана
                </p>
              </div>

              <form onSubmit={handleUsernameSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Хэрэглэгчийн нэр
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                      buymeacoffee.mn/
                    </span>
                    <Input
                      id="username"
                      type="text"
                      placeholder="yourname"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-32 text-lg py-3 border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Зөвхөн үсэг, тоо болон доогуур зураас ашиглаж болно
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 text-lg"
                  disabled={!username.trim()}
                >
                  Үргэлжлүүлэх
                </Button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  Аль хэдийн бүртгэлтэй юу?{" "}
                  <Link
                    href="/signin"
                    className="text-yellow-600 hover:text-yellow-700 font-medium"
                  >
                    Нэвтрэх
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            /* Step 2: Complete Signup */
            <div className="space-y-6">
              <div className="space-y-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Буцах
                </button>
                <h1 className="text-3xl font-bold text-gray-900">
                  Бүртгэлээ дуусгаарай
                </h1>
                <p className="text-gray-600">
                  Таны хуудас: buymeacoffee.mn/
                  <span className="font-medium text-yellow-600">
                    {username}
                  </span>
                </p>
              </div>

              {/* Google Sign-In Button */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center space-x-2 py-3 text-lg"
                onClick={handleGoogleSignIn} // Added onClick handler
              >
                <Image
                  src="/google-logo.svg" 
                  alt="Google"
                  width={20}
                  height={20}
                />
                <span>Google-ээр нэвтрэх</span>
              </Button>

              {/* OR Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">эсвэл</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSignupSubmit} className="space-y-4">
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
                  Бүртгүүлэх
                </Button>
              </form>
              <div className="text-xs text-gray-500 text-center">
                Бүртгүүлснээр та манай{" "}
                <Link href="/terms" className="text-yellow-600 hover:underline">
                  үйлчилгээний нөхцөл
                </Link>{" "}
                болон{" "}
                <Link
                  href="/privacy"
                  className="text-yellow-600 hover:underline"
                >
                  нууцлалын бодлого
                </Link>
                -той зөвшөөрч байна.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
