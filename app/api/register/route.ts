import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { hash } from "bcryptjs"

import prisma from "@/core/lib/prisma"

export async function POST(req: Request) {
  const { email, password } = await req.json()
  const exists = await prisma.users.findUnique({
    where: {
      email,
    },
  })
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  } else {
    const user = await prisma.users.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    })
    return NextResponse.json(user)
  }
}
