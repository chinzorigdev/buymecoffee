// Username-ээр хэрэглэгчийн мэдээлэл авах API
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

/**
 * GET /api/user/[username]
 * Username-ээр хэрэглэгчийн нийтийн мэдээлэл авах
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    if (!username) {
      return NextResponse.json(
        {
          success: false,
          message: "Username шаардлагатай",
        },
        { status: 400 }
      );
    }

    console.log(`🔍 Хэрэглэгч хайж байна: ${username}`);

    // MongoDB-тай холбогдох
    await connectToDatabase();

    // Username-ээр хэрэглэгч хайх
    const user = await User.findByUsername(username);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Хэрэглэгч олдсонгүй",
        },
        { status: 404 }
      );
    }

    // Нийтийн мэдээллийг буцаах (нууц мэдээлэл орохгүй)
    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        username: user.username,
        name: user.name || user.username,
        about: user.about,
        website: user.website,
        profileImage: user.profileImage,
        coverImage: user.coverImage,
        socialLinks: user.socialLinks,
        coffeePrice: user.coffeePrice,
        totalCoffees: user.totalCoffees,
        createdAt: user.createdAt,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("❌ User fetch алдаа:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Хэрэглэгчийн мэдээлэл авахад алдаа гарлаа",
        error: error instanceof Error ? error.message : "Тодорхойгүй алдаа",
      },
      { status: 500 }
    );
  }
}
