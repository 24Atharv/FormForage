import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      return NextResponse.json({ message: "User not exists" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, findUser.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: findUser.id,
      },
      JWT_SECRET
    );

    return NextResponse.json({ success: true, token });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Error" }, { status: 403 });
  }
}
