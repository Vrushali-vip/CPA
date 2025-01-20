import { getServerSession } from "next-auth";
import authOptions from "../auth/[...nextauth]/authOptions";
import pb from "@/lib/pocketbase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const fd = await request.formData();
  const session = await getServerSession(authOptions);

  if (!session || session?.user.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized: Admin access required" },
      { status: 403 }
    );
  }

  try {
    const name = fd.get("name") as string;
    const email = fd.get("email") as string;
    const sub = fd.get("sub") as string;
    const description = fd.get("description") as string;
    const password = fd.get("password") as string;
    const passwordConfirm = fd.get("passwordConfirm") as string;
    const role = fd.get("role") as string;

    // Validate required fields
    if (!name || !email || !password || !passwordConfirm || !sub || !description || !role) {
      return NextResponse.json(
        { error: "All fields (name, email, password, passwordConfirm, role) are required." },
        { status: 400 }
      );
    }

    const newUser = await pb.collection("users").create({
      name,
      email,
      sub,
      description,
      password,
      role,
      passwordConfirm,
    });

    return NextResponse.json(
      { success: true, user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "User could not be created." },
      { status: 500 }
    );
  }
}


