import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { User } from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Нэвтэрч орно уу" }, { status: 401 });
    }

    const { newUsername } = await request.json();

    if (!newUsername || typeof newUsername !== "string") {
      return NextResponse.json(
        { error: "Шинэ хэрэглэгчийн нэр заавал оруулна уу" },
        { status: 400 }
      );
    }

    // Username валидация
    const usernameRegex = /^[a-z0-9_.-]+$/;
    if (!usernameRegex.test(newUsername)) {
      return NextResponse.json(
        {
          error:
            "Зөвхөн жижиг үсэг, тоо, доогуур зураас, цэг, зураас ашиглана уу",
        },
        { status: 400 }
      );
    }

    if (newUsername.length < 3 || newUsername.length > 30) {
      return NextResponse.json(
        { error: "Хэрэглэгчийн нэр 3-30 тэмдэгт байх ёстой" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Одоогийн хэрэглэгчийг олох
    const currentUser = await User.findByEmail(session.user.email);
    if (!currentUser) {
      return NextResponse.json(
        { error: "Хэрэглэгч олдсонгүй" },
        { status: 404 }
      );
    }

    // Хэрэв ижил username бол өөрчлөх шаардлагагүй
    if (currentUser.username === newUsername.toLowerCase()) {
      return NextResponse.json(
        { message: "Username амжилттай шинэчлэгдлээ" },
        { status: 200 }
      );
    }

    // Username давхцаж байгаа эсэхийг шалгах
    const existingUser = await User.findByUsername(newUsername);
    if (existingUser) {
      return NextResponse.json(
        { error: "Энэ хэрэглэгчийн нэр аль хэдийн ашиглагдаж байна" },
        { status: 409 }
      );
    }

    // Username өөрчлөх
    const oldUsername = currentUser.username;
    currentUser.username = newUsername.toLowerCase();
    await currentUser.save();

    console.log(`✅ Username өөрчлөгдлөө: ${oldUsername} → ${newUsername}`);

    return NextResponse.json(
      {
        message: "Username амжилттай шинэчлэгдлээ",
        oldUsername,
        newUsername: currentUser.username,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Username шинэчлэхэд алдаа:", error);
    return NextResponse.json({ error: "Серверийн алдаа" }, { status: 500 });
  }
}
