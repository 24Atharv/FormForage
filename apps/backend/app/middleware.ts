import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return NextResponse.json(
      { message: "No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ message: "Token valid", decoded });
  } catch (e) {
    return NextResponse.json(
      { message: "Token not valid" },
      { status: 403 }
    );
  }
}

