// Хэрэглэгчийн профайл мэдээлэл шинэчлэх API
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

/**
 * PATCH /api/user/update-profile
 * Хэрэглэгчийн профайл мэдээлэл шинэчлэх
 */
export async function PATCH(request: NextRequest) {
  try {
    // Session шалгах
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Нэвтрэх шаардлагатай",
        },
        { status: 401 }
      );
    } // Request body авах
    const body = await request.json();
    const {
      userId,
      name,
      about,
      website,
      profileImage,
      needsProfileCompletion,
    } = body;

    // Хэрэглэгч өөрийн мэдээллийг л засах эрхтэй
    if (session.user.id !== userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Зөвхөн өөрийн профайлыг засах боломжтой",
        },
        { status: 403 }
      );
    }

    console.log(`👤 Хэрэглэгчийн профайл шинэчлэж байна: ${userId}`);

    // MongoDB-тай холбогдох
    await connectToDatabase();

    // Хэрэглэгчийг олж шинэчлэх
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Хэрэглэгч олдсонгүй",
        },
        { status: 404 }
      );
    }

    // Мэдээлэл шинэчлэх
    if (name) user.name = name.trim();
    if (about !== undefined) user.about = about.trim();
    if (website) {
      // URL форматыг шалгах
      if (website.trim() && !website.startsWith("http")) {
        user.website = `https://${website.trim()}`;
      } else {
        user.website = website.trim();
      }
    }
    if (profileImage) user.profileImage = profileImage;

    // Хадгалах
    const updatedUser = await user.save();

    console.log(`✅ Профайл амжилттай шинэчлэгдлээ: ${updatedUser.username}`);

    // Response
    return NextResponse.json({
      success: true,
      message: "Профайл амжилттай шинэчлэгдлээ",
      user: {
        id: updatedUser._id.toString(),
        username: updatedUser.username,
        email: updatedUser.email,
        name: updatedUser.name,
        about: updatedUser.about,
        website: updatedUser.website,
        profileImage: updatedUser.profileImage,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error("❌ Profile update алдаа:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Профайл шинэчлэхэд алдаа гарлаа",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/user/update-profile
 * Хэрэглэгчийн одоогийн профайл мэдээлэл авах
 */
export async function GET(request: NextRequest) {
  try {
    // Session шалгах
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Нэвтрэх шаардлагатай",
        },
        { status: 401 }
      );
    } // MongoDB-тай холбогдох
    await connectToDatabase(); // Хэрэглэгчийн мэдээлэл авах - Google ID эсвэл MongoDB ObjectId-ээр хайх
    let user;
    try {
      // Эхлээд MongoDB ObjectId гэж үзээд хайх
      user = await User.findById(session.user.id);
    } catch {
      // Хэрэв ObjectId биш бол Google ID гэж үзээд хайх
      console.log("🔍 Google ID-ээр хэрэглэгч хайж байна:", session.user.id);
      user = await User.findOne({ googleId: session.user.id });
    }

    if (!user) {
      console.log("❌ Хэрэглэгч олдсонгүй:", {
        sessionUserId: session.user.id,
        sessionUserEmail: session.user.email,
        message: "Session-д байгаа ID-ээр хэрэглэгч олдсонгүй",
      });

      return NextResponse.json(
        {
          success: false,
          message: "Хэрэглэгч олдсонгүй",
          debug: {
            sessionUserId: session.user.id,
            sessionUserEmail: session.user.email,
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        name: user.name,
        about: user.about,
        website: user.website,
        profileImage: user.profileImage,
        coffeePrice: user.coffeePrice,
        totalCoffees: user.totalCoffees,
        totalEarnings: user.totalEarnings,
      },
    });
  } catch (error) {
    console.error("❌ Profile fetch алдаа:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Профайл мэдээлэл авахад алдаа гарлаа",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
