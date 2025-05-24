"use client";

import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  Home,
  Users,
  Coffee,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  MessageCircle,
  Star,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");

  // Sample data for the dashboard
  const stats = [
    {
      title: "Нийт орлого",
      value: "₮2,847,000",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Идэвхтэй дэмжигчид",
      value: "1,245",
      change: "+15.2%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Кофе авсан",
      value: "3,892",
      change: "+8.3%",
      trend: "up",
      icon: Coffee,
      color: "text-yellow-600",
    },
    {
      title: "Үзсэн тоо",
      value: "28,456",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      color: "text-purple-600",
    },
  ];

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

  const activities = [
    {
      type: "donation",
      user: "Батбаяр",
      action: "танд ₮75,000 илгээсэн",
      time: "10 минутын өмнө",
      icon: Heart,
    },
    {
      type: "comment",
      user: "Оюунчимэг",
      action: "таны нийтлэлд сэтгэгдэл үлдээсэн",
      time: "30 минутын өмнө",
      icon: MessageCircle,
    },
    {
      type: "follow",
      user: "Гантулга",
      action: "таныг дагаж эхэлсэн",
      time: "1 цагийн өмнө",
      icon: Users,
    },
    {
      type: "goal",
      user: "Систем",
      action: "Таны зорилгын 75% биелсэн",
      time: "2 цагийн өмнө",
      icon: Star,
    },
  ];

  const sidebarItems = [
    { id: "dashboard", label: "Удирдлагын самбар", icon: Home },
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
      </div>

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
              setActivePage(item.id);
              onItemClick?.(item.id);
            }}
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.label}
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

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-sm">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span
                      className={
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {stat.change}
                    </span>
                    <span className="text-gray-600 ml-1">сүүлийн сараас</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                      <p className="text-xs text-gray-400">{supporter.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 text-blue-500 mr-2" />
                  Сүүлийн үйл ажиллагаа
                </CardTitle>
                <CardDescription>
                  Таны профайл дахь сүүлийн үйлдлүүд
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <activity.icon className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Хурдан тоо баримт</CardTitle>
                <CardDescription>
                  Өнөөдрийн гүйцэтгэлийн хураангуй
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">
                      12
                    </div>
                    <div className="text-sm text-gray-600">
                      Өнөөдөр авсан кофе
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      ₮150,000
                    </div>
                    <div className="text-sm text-gray-600">
                      Өнөөдрийн орлого
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      89%
                    </div>
                    <div className="text-sm text-gray-600">Зорилгын хувь</div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Сарын зорилго</span>
                      <span>89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "89%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Дэмжигчдийн зорилго</span>
                      <span>76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "76%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
