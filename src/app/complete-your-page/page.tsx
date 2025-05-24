"use client";

import React, { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee, Camera, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CompleteYourPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [website, setWebsite] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      setName(session.user.name || "");
      setProfileImageUrl(session.user.image || null);
    } else if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [session, status, router]);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };
  const handleSaveAndContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", { name, about, website, profileImageUrl });

    // Create user profile link using the name
    const userName = name.toLowerCase().replace(/\s+/g, "");
    router.push(`/${userName}?new=1`);
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center">
          <Coffee className="h-12 w-12 text-yellow-500 animate-pulse mb-4" />
          <p className="text-lg font-semibold text-gray-700">
            Таны хуудас ачааллаж байна...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Header */}
      <div className="flex justify-between items-center pt-6 px-4 md:pt-12 md:px-12">
        <Link href="/" title="Buy Me a Coffee">
          <div className="flex items-center space-x-3">
            <div className="bg-black p-2 rounded-lg">
              <Coffee className="h-6 w-6 md:h-8 md:w-8 text-yellow-400" />
            </div>{" "}
            <span className="text-xl md:text-2xl font-bold text-black">
              БүйМиКофи
            </span>
          </div>
        </Link>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="bg-white border border-gray-200 rounded-lg text-black hover:bg-gray-50 h-8 px-3 text-xs md:h-10 md:px-4 md:text-sm font-medium"
        >
          Гарах
        </Button>
      </div>

      <div className="flex flex-col justify-between min-h-[calc(100vh-100px)]">
        <div className="w-full max-w-[700px] mx-auto px-4 md:px-0">
          {/* Title */}
          <div className="text-center font-medium text-2xl md:text-3xl mb-6 md:mb-10 mt-6 md:mt-0">
            Хуудсаа бөглөх
          </div>

          {/* Form Content */}
          <div className="px-4 md:px-0">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-0">
              {/* Profile Photo Section */}
              <div className="flex flex-col items-center md:w-1/3">
                <div className="relative mb-4">
                  <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center overflow-hidden">
                    {profileImageUrl ? (
                      <Image
                        src={profileImageUrl}
                        alt="Профайл зураг"
                        className="w-full h-full object-cover"
                        width={128}
                        height={128}
                      />
                    ) : (
                      <User className="w-8 h-8 md:w-12 md:h-12 text-gray-400" />
                    )}
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="profile-photo"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full md:w-auto px-4 py-2 text-sm font-medium border border-gray-300 rounded-full hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Профайл зураг оруулах
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="md:w-2/3 md:ml-8 space-y-5">
                {/* Name Field */}
                <div>
                  <Label
                    htmlFor="name"
                    className="text-black text-sm font-medium mb-2 block"
                  >
                    Нэр
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Нэр"
                    className="w-full border-2 border-transparent bg-gray-100 hover:bg-gray-200 focus:bg-white focus:border-yellow-400 h-12 rounded-xl text-sm px-4 py-3 text-black font-medium placeholder:text-gray-500 placeholder:font-normal outline-none"
                    required
                  />
                </div>
                {/* About Field */}
                <div>
                  <Label
                    htmlFor="about"
                    className="text-black text-sm font-medium mb-2 block"
                  >
                    Танилцуулга
                  </Label>
                  <div className="relative group border-2 border-transparent focus-within:bg-white focus-within:border-yellow-400 cursor-text bg-gray-100 hover:bg-gray-200 rounded-xl">
                    <textarea
                      id="about"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      placeholder="Өөрийгөө танилцуулж, юу хийдэг, дэмжлэг таны ажилд хэрхэн тусална талаар бичнэ үү..."
                      className="w-full bg-transparent border-none outline-none resize-none px-4 pt-3 pb-2 text-sm font-medium placeholder:font-normal placeholder:text-gray-500 min-h-[100px]"
                      maxLength={300}
                    />
                  </div>
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {about.length}/300
                  </div>
                </div>
                {/* Website Field */}
                <div>
                  <Label
                    htmlFor="website"
                    className="text-black text-sm font-medium mb-2 block"
                  >
                    Вебсайт эсвэл нийгмийн сүлжээ
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://"
                    className="w-full border-2 border-transparent bg-gray-100 hover:bg-gray-200 focus:bg-white focus:border-yellow-400 h-12 rounded-xl text-sm px-4 py-3 text-black font-medium placeholder:text-gray-500 placeholder:font-normal outline-none"
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 md:mt-0">
          {/* Action Button */}
          <div className="flex justify-end items-center py-4 px-4 md:py-6 md:px-16">
            <Button
              onClick={handleSaveAndContinue}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium h-12 px-8 md:h-14 md:px-12 text-sm md:text-base rounded-full w-full md:w-auto"
              disabled={!name.trim()}
            >
              Дараах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
