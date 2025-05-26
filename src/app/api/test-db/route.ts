// MongoDB холболтыг тест хийх API endpoint
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

/**
 * GET /api/test-db
 * MongoDB холболт болон User model-ийг тест хийх
 */
export async function GET(request: NextRequest) {
  try {
    console.log("🔍 MongoDB холболтыг тест хийж байна...");

    // MongoDB-тай холбогдох
    await connectToDatabase();
    console.log("✅ MongoDB холболт амжилттай");

    // Хэрэглэгчдийн тоог тоолох
    const userCount = await User.countDocuments();
    console.log(`📊 Нийт хэрэглэгчийн тоо: ${userCount}`);

    // Сүүлийн 5 хэрэглэгчийг авах
    const recentUsers = await User.find({})
      .select("username email createdAt providers")
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json({
      success: true,
      message: "MongoDB холболт амжилттай ажиллаж байна",
      data: {
        userCount,
        recentUsers,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ MongoDB тест алдаа:", error);

    return NextResponse.json(
      {
        success: false,
        message: "MongoDB холболтод алдаа гарлаа",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
