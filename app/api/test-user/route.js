import { getUserByEmail } from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    console.log("Testing user lookup for:", email);
    const user = await getUserByEmail(email);

    if (user) {
      return NextResponse.json({
        success: true,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
          hasPassword: !!user.password,
        },
      });
    } else {
      return NextResponse.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
