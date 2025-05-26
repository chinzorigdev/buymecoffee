"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Home,
  Users,
  Heart,
  TrendingUp,
  MessageCircle,
  Settings,
  LogOut,
  ArrowDown,
  Share,
  PanelsTopLeft,
  ExternalLink,
  Coffee,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Хэрэглэгчийн мэдээллийн төрөл
interface UserData {
  id: string;
  username: string;
  email: string;
  name: string;
  about?: string;
  website?: string;
  profileImage?: string;
  coffeePrice: number;
  totalCoffees: number;
  totalEarnings: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [activePage, setActivePage] = useState("dashboard");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Dropdown toggle function
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
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

  // Profile menu handlers
  const handleDashboard = () => {
    setIsDropdownOpen(false);
    // Already on dashboard, just scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = async () => {
    setIsDropdownOpen(false);
    await signOut({ callbackUrl: "/" });
  };
  // MongoDB-оос хэрэглэгчийн мэдээлэл авах
  useEffect(() => {
    async function fetchUserData() {
      if (status === "authenticated" && session?.user?.id) {
        try {
          console.log("📊 Хэрэглэгчийн мэдээлэл татаж байна...");

          const response = await fetch("/api/user/update-profile");
          if (response.ok) {
            const data = await response.json();
            setUserData(data.user);
            console.log("✅ Хэрэглэгчийн мэдээлэл амжилттай авлаа:", data.user);          } else {
            const errorData = await response.json();
            console.error(
              "❌ Хэрэглэгчийн мэдээлэл авахад алдаа:",
              errorData.message
            );

            // Хэрэв authentication алдаа бол signin хуудас руу шилжүүлэх
            if (response.status === 401) {
              console.log(
                "🔐 Session дууссан байна, signin хуудас руу шилжүүлж байна..."
              );
              window.location.href = "/signin";
              return;
            }
            
            // Хэрэв хэрэглэгч олдсонгүй бол session цэвэрлээд signin руу шилжүүлэх
            if (response.status === 404) {
              console.log(
                "🔍 Хэрэглэгч олдсонгүй. Session цэвэрлэж байна..."
              );
              await signOut({ callbackUrl: "/signin" });
              return;
            }
          }        } catch (error) {
          console.error("❌ Хэрэглэгчийн мэдээлэл авахад алдаа:", error);
          
          // Network эсвэл бусад алдааны хувьд session цэвэрлэх
          if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            console.log("🌐 Сүлжээний алдаа байна");
          } else {
            console.log("🔄 Тодорхойгүй алдаа. Session шалгаж байна...");
            await signOut({ callbackUrl: "/signin" });
            return;
          }
        } finally {
          setIsLoading(false);
        }
      } else if (status === "unauthenticated") {
        // Хэрэв session байхгүй бол loading-г зогсоож signin руу шилжүүлэх
        setIsLoading(false);
        console.log(
          "❌ Нэвтрээгүй хэрэглэгч, signin хуудас руу шилжүүлж байна..."
        );
        window.location.href = "/signin";
      } else if (status === "loading") {
        // Session loading байх үед хүлээх
        console.log("⏳ Session ачааллаж байна...");
      }
    }

    fetchUserData();
  }, [session, status]);
  // Authentication шалгалт
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Ачааллаж байна...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    // Client талд redirect хийх нь илүү тогтвортой
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Нэвтрэх хуудас руу шилжүүлж байна...</p>
        </div>
      </div>
    );
  }

  // Debug: Session мэдээллийг шалгах
  console.log("Session data:", session);
  console.log("Username:", session?.user?.username);

  const recentSupporters = [
    {
      name: "Болдбаатар",
      amount: "₮50,000",
      message: "Таны ажилд их талархаж байна! 🙌",
      time: "2 цагийн өмнө",
      avatar: "B",
    },
    {
      name: "Сэцэнгэрэл",
      amount: "₮25,000",
      message: "Кофе уугаарай ☕",
      time: "5 цагийн өмнө",
      avatar: "С",
    },
    {
      name: "Мөнхбаяр",
      amount: "₮100,000",
      message: "Та маш сайхан ажил хийж байна!",
      time: "1 өдрийн өмнө",
      avatar: "М",
    },
    {
      name: "Цэцэгмаа",
      amount: "₮15,000",
      message: "Дэмжье! 💪",
      time: "2 өдрийн өмнө",
      avatar: "Ц",
    },
  ];
  const sidebarItems = [
    { id: "dashboard", label: "Удирдлагын самбар", icon: Home },
    {
      id: "viewpage",
      label: "Хуудас харах",
      icon: PanelsTopLeft,
      externalIcon: ExternalLink,
    },
    { id: "supporters", label: "Дэмжигчид", icon: Users },
    { id: "donations", label: "Хандив", icon: Heart },
    { id: "analytics", label: "Шинжилгээ", icon: TrendingUp },
    { id: "messages", label: "Зурвас", icon: MessageCircle },
    { id: "settings", label: "Тохиргоо", icon: Settings },
  ];

  const SidebarContent = ({
    onItemClick,
  }: {
    onItemClick?: (id: string) => void;
  }) => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          Coffee Dashboard
        </h2>
        <p className="text-sm text-gray-600">Удирдлагын самбар</p>
      </div>{" "}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.id}
            variant={activePage === item.id ? "default" : "ghost"}
            className={`w-full justify-start ${
              activePage === item.id
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
            onClick={() => {
              if (item.id === "viewpage") {
                // Нэвтэрсэн хэрэглэгчийн хуудсыг шинэ tab-д нээх
                if (session?.user?.username) {
                  window.open(`/${session.user.username}`, "_blank");
                } else {
                  alert("Хэрэглэгчийн нэр олдсонгүй. Дахин нэвтэрнэ үү.");
                }
              } else {
                setActivePage(item.id);
                onItemClick?.(item.id);
              }
            }}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
            {item.externalIcon && (
              <item.externalIcon className="w-3 h-3 ml-auto" />
            )}
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-3" />
          Гарах
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {" "}
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-semibold">Dashboard</h1>

        {/* Mobile Profile Menu */}
        <div className="relative" ref={dropdownRef}>
          <Button
            variant="outline"
            className="relative cursor-pointer flex justify-center items-center pl-2 pr-1 border border-gray-200 hover:bg-gray-50 rounded-full h-10"
            onClick={toggleDropdown}
          >
            <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={userData?.username || session?.user?.username || "User"}
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

          {/* Mobile Dropdown Menu */}
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
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 min-h-screen">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
          {/* Desktop Header with Profile Menu */}
          <div className="hidden lg:flex justify-end mb-4">
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
                      alt={
                        userData?.username || session?.user?.username || "User"
                      }
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

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Сайн байна уу! 👋
            </h1>
            <p className="text-gray-600">Өнөөдрийн үр дүнгээ харцгаая</p>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-2xl space-y-6">
              {/* Statistics Cards */}
              <div className="space-y-4">
                {/* User Profile Card */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      {" "}
                      <div className="flex items-center space-x-4">
                        {" "}
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={
                              userData?.profileImage ||
                              session?.user?.image ||
                              "/user-photo.jpg"
                            }
                          />{" "}
                          <AvatarFallback className="bg-yellow-500 text-white text-lg">
                            {(userData?.name || session?.user?.name)
                              ?.charAt(0)
                              ?.toUpperCase() || "Х"}
                          </AvatarFallback>
                        </Avatar>{" "}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {userData?.name ||
                              session?.user?.name ||
                              "Хэрэглэгч"}
                          </h3>{" "}
                          <p className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                            {userData?.username || session?.user?.username
                              ? `buymecoffee.com/${
                                  userData?.username || session?.user?.username
                                }`
                              : "Хэрэглэгчийн нэр тодорхойгүй"}
                          </p>
                        </div>
                      </div>
                      <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                        <Share className="ml-2 h-4 w-4" />
                        Хуваалцах
                      </Button>
                    </div>
                    <div className="flex items-center justify-start mt-4 space-x-6">
                      <h3>Earnings</h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="text-gray-700">
                            <div>Нийт</div>
                            <ArrowDown className="ml-2 h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Сүүлийн 30 өдөр</DropdownMenuItem>
                          <DropdownMenuItem> Сүүлийн 90 өдөр</DropdownMenuItem>
                          <DropdownMenuItem>Нийт</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>{" "}
                    </div>
                  </CardContent>
                </Card>

                {/* Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Total Coffees */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Нийт кофе
                      </CardTitle>
                      <Coffee className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading ? "..." : userData?.totalCoffees || 0}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +2 энэ сарын
                      </p>
                    </CardContent>
                  </Card>

                  {/* Total Earnings */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Нийт орлого
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading
                          ? "..."
                          : `₮${
                              userData?.totalEarnings?.toLocaleString() || 0
                            }`}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +₮{userData?.coffeePrice || 5000} сүүлийн кофе
                      </p>
                    </CardContent>
                  </Card>

                  {/* Coffee Price */}
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Кофе үнэ
                      </CardTitle>
                      <Badge variant="outline" className="text-yellow-600">
                        Идэвхтэй
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {isLoading
                          ? "..."
                          : `₮${
                              userData?.coffeePrice?.toLocaleString() || 5000
                            }`}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Кофе тутамд
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Supporters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 text-red-500 mr-2" />
                    Сүүлийн дэмжигчид
                  </CardTitle>
                  <CardDescription>
                    Танд саяхан дэмжлэг үзүүлсэн хүмүүс
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentSupporters.map((supporter, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-yellow-500 text-white">
                          {supporter.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">
                            {supporter.name}
                          </h4>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {supporter.amount}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {supporter.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {supporter.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
