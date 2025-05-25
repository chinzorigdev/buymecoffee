"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
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
  Bell,
  ArrowDown,
  Share,
  PanelsTopLeft,
  ExternalLink,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [activePage, setActivePage] = useState("dashboard");

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

  if (status === "unauthenticated" || !session) {
    window.location.href = "/signin";
    return null;
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

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-white border-r border-gray-200 min-h-screen">
          <SidebarContent />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 lg:p-8">
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
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={session?.user?.image || "/user-photo.jpg"}
                          />{" "}
                          <AvatarFallback className="bg-yellow-500 text-white text-lg">
                            {session?.user?.name?.charAt(0)?.toUpperCase() ||
                              "Х"}
                          </AvatarFallback>
                        </Avatar>{" "}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {session?.user?.name || "Хэрэглэгч"}
                          </h3>{" "}
                          <p className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                            {session?.user?.username
                              ? `buymecoffee.com/${session.user.username}`
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
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
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
