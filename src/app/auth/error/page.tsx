"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCw, Coffee } from "lucide-react";

// Error mappings for better UX
const errorMessages: Record<
  string,
  { title: string; description: string; action?: string }
> = {
  Configuration: {
    title: "Тохиргооны алдаа",
    description:
      "Сервер дээр тохиргооны алдаа гарлаа. Та администраторт мэдэгдээрэй.",
  },
  AccessDenied: {
    title: "Хандах эрх байхгүй",
    description: "Таны аккаунтад хандах эрх олгогдоогүй байна.",
  },
  Verification: {
    title: "Баталгаажуулалтын алдаа",
    description: "Имэйл хаягаа баталгаажуулах шаардлагатай.",
  },
  OAuthSignin: {
    title: "OAuth нэвтрэлтийн алдаа",
    description:
      "Google серверт холбогдохд алдаа гарлаа. Интернет холболтоо шалгаад дахин оролдоно уу.",
    action: "retry",
  },
  OAuthCallback: {
    title: "OAuth callback алдаа",
    description:
      "Google нэвтрэлтийн процессыг дуусгахад алдаа гарлаа. Браузерийн cookie болон JavaScript-г идэвхжүүлээд дахин оролдоно уу.",
    action: "retry",
  },
  OAuthCreateAccount: {
    title: "Аккаунт үүсгэх алдаа",
    description:
      "Google аккаунтаар шинэ хэрэглэгч үүсгэхэд алдаа гарлаа. Энэ имэйл хаяг аль хэдийн бүртгэлтэй байж магадгүй.",
    action: "signin",
  },
  EmailCreateAccount: {
    title: "Имэйл аккаунт үүсгэх алдаа",
    description: "Энэ имэйл хаягаар аккаунт үүсгэх боломжгүй.",
  },
  Callback: {
    title: "Callback алдаа",
    description: "Нэвтрэлтийн процессыг дуусгахад алдаа гарлаа.",
    action: "retry",
  },
  OAuthAccountNotLinked: {
    title: "Аккаунт холбогдоогүй",
    description:
      "Энэ Google аккаунт өөр имэйл хаягтай холбогдсон байна. Эхлээд имэйл/нууц үгээр нэвтэрч, дараа нь Google аккаунтаа холбоно уу.",
    action: "signin",
  },
  SessionRequired: {
    title: "Session шаардлагатай",
    description: "Энэ хуудсанд хандахын тулд нэвтрэх шаардлагатай.",
    action: "signin",
  },
  Default: {
    title: "Тодорхойгүй алдаа",
    description: "Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.",
    action: "retry",
  },
};

export default function AuthErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("Default");
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam && errorMessages[errorParam]) {
      setError(errorParam);
    } else {
      setError("Default");
    }
  }, [searchParams]);

  const errorInfo = errorMessages[error];

  const handleRetry = async () => {
    setIsRetrying(true);

    // Clear any stored error states
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("auth-error");
      localStorage.removeItem("auth-error");
    }

    // Wait a moment for visual feedback
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect based on the type of error
    if (errorInfo.action === "signin") {
      router.push("/signin");
    } else if (errorInfo.action === "retry") {
      // Go back to signin and attempt Google OAuth again
      router.push("/signin?retry=google");
    } else {
      router.push("/signin");
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const handleGoToSignin = () => {
    router.push("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="bg-yellow-400 p-3 rounded-lg">
            <Coffee className="h-8 w-8 text-black" />
          </div>
          <span className="text-2xl font-bold text-gray-900">БүйМиКофи</span>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {errorInfo.title}
          </h1>

          <p className="text-gray-600 mb-8 leading-relaxed">
            {errorInfo.description}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {errorInfo.action && (
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Дахин оролдож байна...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Дахин оролдох
                  </>
                )}
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleGoToSignin}
              className="w-full"
            >
              Нэвтрэх хуудас руу буцах
            </Button>

            <Button
              variant="ghost"
              onClick={handleGoHome}
              className="w-full text-gray-600 hover:text-gray-800"
            >
              <Home className="w-4 h-4 mr-2" />
              Нүүр хуудас руу буцах
            </Button>
          </div>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Асуудал үргэлжилж байгаа бол{" "}
              <Link
                href="/contact"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                тусламж хүсэх
              </Link>{" "}
              эсвэл бидэнтэй{" "}
              <Link
                href="/support"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                холбогдоно уу
              </Link>
              .
            </p>
          </div>
        </div>

        {/* Additional Info */}
        {error !== "Default" && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">Алдааны код: {error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
