"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Coffee,
  Globe,
  Heart,
  Menu,
  Share,
  Plus,
  Camera,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function UserProfilePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const username = params.username as string;
  const isNewProfile = searchParams.get("new") === "1";
  const [followName, setFollowName] = useState("");
  const [followEmail, setFollowEmail] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleFollow = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Following with:", { followName, followEmail });
  };
  // Handle dropdown outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  const handleDashboard = () => {
    // Navigate to dashboard - you can implement this based on your routing
    window.location.href = "/dashboard";
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className="min-h-screen bg-white relative xs:pb-12"
      style={
        {
          "--theme-color": "#5F7FFF",
          "--theme-text-color": "#FFFFFF",
          "--generated-text-color": "#5F7FFF",
          "--theme-color-1": "rgba(95,127,255,0.1)",
          "--theme-color-05": "rgba(95,127,255,0.05)",
          "--theme-color-25": "rgba(95,127,255,0.25)",
          "--theme-color-08": "rgba(95,127,255,0.08)",
          "--theme-color-hover-color": "#3b62ff",
          "--btn-loader-color": "rgba(255,255,255,0.5)",
        } as React.CSSProperties
      }
    >
      {" "}
      {/* Header */}
      <div className="py-3 bg-white z-20 sticky top-0 xs:py-4 xxs:pb-1">
        <div className="text-dark flex items-center justify-between px-8 xl:px-3">
          {/* Left Side - User Profile Info */}
          <div className="flex items-center">
            <Link
              href={`/${username}`}
              className="flex-shrink-0"
              aria-label="navigate to creator profile"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-100">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={username}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    draggable="false"
                  />
                ) : (
                  <Coffee className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                )}
              </div>
            </Link>
            <div className="ml-3 hidden sm:block">
              <Link
                className="text-lg md:text-xl font-bold text-gray-900 hover:text-gray-700 capitalize transition-colors"
                href={`/${username}`}
              >
                {username}
              </Link>
            </div>
          </div>{" "}
          {/* Right Side - Action Buttons and BMC Logo */}
          <div className="flex items-center space-x-3">
            {/* BMC Logo */}
            <Link href="/" aria-label="navigate to Buy me a coffee">
              <Coffee className="h-8 w-8 md:h-10 md:w-10 text-yellow-400 transition-all duration-500" />
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Share Button */}
              <Button
                variant="outline"
                size="icon"
                className="relative flex justify-center items-center focus:outline-none ring-transparent cursor-pointer w-10 h-10 border border-gray-200 rounded-full"
                aria-label="share your Buy me a coffee profile"
              >
                <Share className="w-5 h-5 text-gray-600" />
              </Button>
              {/* Edit Button */}
              <Button
                variant="outline"
                className="px-3 h-10 font-medium border border-gray-200 rounded-full hidden sm:block"
              >
                Edit page
              </Button>
              {/* Create Button */}
              <Button
                className="px-4 h-10 font-medium text-white rounded-full text-sm"
                style={{ backgroundColor: "var(--theme-color)" }}
              >
                <Plus className="mr-1 w-4 h-4" />
                Create
              </Button>{" "}
              {/* Profile Menu */}
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="outline"
                  className="relative cursor-pointer flex justify-center items-center pl-2 pr-1 border border-gray-200 hover:bg-gray-50 rounded-full h-10"
                  onClick={toggleDropdown}
                >
                  <Menu className="mr-2 w-5 h-5 text-gray-600" />
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={username}
                        width={28}
                        height={28}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                      />
                    ) : (
                      <Coffee className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </Button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    <button
                      onClick={handleDashboard}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="mr-3 w-4 h-4" />
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="mr-3 w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="min-h-screen pb-10 md:pb-20 bg-gray-50">
        {/* Cover Image */}
        <div className="relative bg-white">
          <div
            className="h-32 md:h-78 w-full relative flex items-center justify-center"
            style={{ backgroundColor: "var(--theme-color-1)" }}
          >
            <div className="mb-8 md:mb-16">
              <Button
                variant="outline"
                className="flex items-center bg-white rounded-lg shadow-sm font-medium text-sm text-gray-600 px-3 h-8 hover:text-dark hover:bg-gray-50 transition-all duration-200 md:px-4 md:h-10"
              >
                <Camera className="mr-2 w-4 h-4" />
                <span className="hidden sm:inline">Add cover image</span>
                <span className="sm:hidden">Cover</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Content - Mobile First Design */}
        <div className="relative -mt-16 md:-mt-20 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            {" "}
            {/* Mobile Layout - Stack vertically */}
            <div className="block md:hidden space-y-4">
              {/* Follow Widget - Mobile */}
              <Card className="mt-8">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">
                    Follow{" "}
                    <span style={{ color: "var(--theme-color)" }}>
                      {username}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <Input
                    value={followName}
                    onChange={(e) => setFollowName(e.target.value)}
                    className="bg-gray-50 border-gray-200 h-10"
                    placeholder="Name or @yoursocial (optional)"
                  />
                  <Input
                    type="email"
                    value={followEmail}
                    onChange={(e) => setFollowEmail(e.target.value)}
                    className="bg-gray-50 border-gray-200 h-10"
                    placeholder="Enter your email"
                  />
                  <Button
                    onClick={handleFollow}
                    className="w-full h-10 text-white rounded-full font-medium text-sm"
                    style={{ backgroundColor: "var(--theme-color)" }}
                    disabled={!followEmail.trim()}
                  >
                    Follow
                  </Button>
                </CardContent>
              </Card>

              {/* About Section - Mobile */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold">
                      About {username}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-sm text-blue-600 p-0 h-auto hover:underline"
                    >
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {isNewProfile
                      ? "Шинэ профайл үүсгэгдлээ! Энд танилцуулга бичнэ үү."
                      : "Энэ хэрэглэгчийн тухай мэдээлэл байхгүй байна."}
                  </p>
                  {session?.user?.name && (
                    <div className="flex items-center">
                      <Button variant="ghost" size="sm" className="p-0 h-auto">
                        <Globe className="w-4 h-4 text-gray-600 hover:text-black transition-colors" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Supporters - Mobile */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold">
                    Recent supporters
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div
                    className="rounded-lg p-6 flex items-center justify-center min-h-[100px]"
                    style={{ backgroundColor: "var(--theme-color-05)" }}
                  >
                    <div className="text-center">
                      <Heart
                        className="w-4 h-4 mx-auto mb-2"
                        style={{ color: "var(--theme-color)" }}
                      />
                      <p
                        className="text-sm"
                        style={{ color: "var(--theme-color)" }}
                      >
                        Be the first one to support {username}.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>{" "}
            {/* Desktop Layout - Side by side */}
            <div className="hidden md:flex gap-6 mt-8">
              {/* Left Content - Profile Info */}
              <div className="flex-1 space-y-6">
                {/* About Section - Desktop */}
                <Card className="w-full">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg font-semibold">
                        About {username}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        className="text-blue-600 hover:underline p-0 h-auto text-sm"
                      >
                        Edit
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 leading-relaxed text-sm mb-4">
                      {isNewProfile
                        ? "Шинэ профайл үүсгэгдлээ! Энд танилцуулга бичнэ үү."
                        : "Энэ хэрэглэгчийн тухай мэдээлэл байхгүй байна."}
                    </p>
                    {session?.user?.name && (
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-0 h-auto"
                        >
                          <Globe className="w-4 h-4 text-gray-600 hover:text-black transition-colors" />
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Supporters - Desktop */}
                <Card className="w-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">
                      Recent supporters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div
                      className="rounded-lg p-8 flex items-center justify-center min-h-[120px]"
                      style={{ backgroundColor: "var(--theme-color-05)" }}
                    >
                      <div className="text-center">
                        <Heart
                          className="w-5 h-5 mx-auto mb-2"
                          style={{ color: "var(--theme-color)" }}
                        />
                        <p
                          className="text-sm"
                          style={{ color: "var(--theme-color)" }}
                        >
                          Be the first one to support {username}.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Sidebar - Follow Widget Desktop */}
              <div className="flex-1">
                <Card className="sticky top-24 w-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">
                      Follow{" "}
                      <span style={{ color: "var(--theme-color)" }}>
                        {username}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-0">
                    <Input
                      value={followName}
                      onChange={(e) => setFollowName(e.target.value)}
                      className="bg-gray-50 border-gray-200 h-10"
                      placeholder="Name or @yoursocial (optional)"
                    />
                    <Input
                      type="email"
                      value={followEmail}
                      onChange={(e) => setFollowEmail(e.target.value)}
                      className="bg-gray-50 border-gray-200 h-10"
                      placeholder="Enter your email"
                    />
                    <Button
                      onClick={handleFollow}
                      className="w-full h-10 text-white rounded-full font-medium text-sm"
                      style={{ backgroundColor: "var(--theme-color)" }}
                      disabled={!followEmail.trim()}
                    >
                      Follow
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Footer */}
      <footer className="py-8 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 text-sm">
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-2 text-gray-600 hover:text-gray-900"
            >
              <Globe className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">English</span>
              <span className="sm:hidden">EN</span>
            </Button>

            <div className="hidden md:block h-4 w-px bg-gray-300"></div>

            <Link
              href="/privacy-policy"
              className="px-2 py-1 text-gray-600 hover:text-gray-900 hover:underline rounded"
            >
              Privacy
            </Link>

            <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

            <Link
              href="/terms"
              className="px-2 py-1 text-gray-600 hover:text-gray-900 hover:underline rounded"
            >
              Terms
            </Link>

            <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

            <Link
              href="/report"
              className="px-2 py-1 text-gray-600 hover:text-gray-900 hover:underline rounded"
            >
              Report
            </Link>
          </div>

          {/* CTA */}
          <div className="mt-6 text-center">
            <Link
              href="/signup"
              className="inline-flex items-center font-semibold text-sm md:text-base group transition-colors"
              style={{
                backgroundImage:
                  "linear-gradient(113deg, rgb(0, 44, 222) 13.93%, rgb(95, 127, 255) 82.19%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              <span>Start your Buy Me a Coffee page</span>
              <svg
                viewBox="0 0 6 9"
                fill="none"
                className="w-2 h-2 ml-2 transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8"
                  stroke="#5F7FFF"
                  strokeWidth="2"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
