import { createUser } from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const userData = await request.json();

    console.log("Creating test user:", userData);

    // Validate required fields
    if (!userData.email || !userData.password || !userData.name) {
      return NextResponse.json(
        {
          error: "Email, password, and name are required",
        },
        { status: 400 }
      );
    }

    const user = await createUser({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "User",
      fields: userData.fields || "",
    });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Create user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
