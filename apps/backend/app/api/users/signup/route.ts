import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password, provider } = body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        provider,
      },
    });
    if (user) {
      return NextResponse.json({ message: "user created" }, { status: 200 });
    } else {
      return NextResponse.json({ maessage: "Error" }, { status: 403 });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 403 }
    );
  }
}
