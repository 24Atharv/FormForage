import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1] as string;
  const decodedToken = jwt.verify(token, JWT_SECRET) as unknown

  if (!decodedToken) {
    return NextResponse.json({
      message: "Invalid token",
    });
  }

  const findUser = await prisma.user.findUnique({
    where: {
      // @ts-ignore
      id: decodedToken.id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      provider: true,
    },
  });

  if (!findUser) {
    return NextResponse.json({ message: "User not exist" });
  }

  return NextResponse.json({ findUser });
}
