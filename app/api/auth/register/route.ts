import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log({ email, password })

    const response = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${password})
    `
  } catch (e) {
    console.logdwdwdw("")
  }

  return NextResponse.json({ message: "success" })
}
