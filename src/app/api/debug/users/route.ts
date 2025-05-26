import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get all users with their googleId
    const users = await User.find(
      {},
      {
        _id: 1,
        username: 1,
        email: 1,
        googleId: 1,
        providers: 1,
      }
    ).limit(10);

    return NextResponse.json({
      success: true,
      count: users.length,
      users: users,
    });
  } catch (error) {
    console.error("❌ Debug users алдаа:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
