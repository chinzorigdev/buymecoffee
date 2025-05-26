import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { error: "Username заавал оруулна уу" },
        { status: 400 }
      );
    }

    const trimmedUsername = username.trim().toLowerCase();

    // Үндсэн валидация
    if (trimmedUsername.length < 3 || trimmedUsername.length > 30) {
      return NextResponse.json(
        { available: false, reason: "Урт буруу" },
        { status: 200 }
      );
    }

    const usernameRegex = /^[a-z0-9_.-]+$/;
    if (!usernameRegex.test(trimmedUsername)) {
      return NextResponse.json(
        { available: false, reason: "Зөвшөөрөгдөөгүй тэмдэгт" },
        { status: 200 }
      );
    }

    // Reserved нэрс шалгах
    const reservedNames = [
      "admin",
      "administrator",
      "root",
      "support",
      "help",
      "api",
      "www",
      "mail",
      "email",
      "test",
      "demo",
      "null",
      "undefined",
      "system",
      "buymecoffee",
      "buymeacoffee",
      "coffee",
      "payment",
      "donate",
    ];

    if (reservedNames.includes(trimmedUsername)) {
      return NextResponse.json(
        { available: false, reason: "Зориглолын нэр" },
        { status: 200 }
      );
    }

    await connectToDatabase();

    // Database-аас шалгах
    const existingUser = await User.findByUsername(trimmedUsername);
    const available = !existingUser;

    return NextResponse.json(
      {
        available,
        username: trimmedUsername,
        ...(available ? {} : { reason: "Ашиглагдсан" }),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Username шалгахад алдаа:", error);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
