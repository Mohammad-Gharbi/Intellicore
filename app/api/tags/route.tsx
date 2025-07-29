import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const tags = await prisma.tag.findMany()
  return NextResponse.json(tags)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name } = body

  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 })
  }

  const existing = await prisma.tag.findUnique({ where: { name } })
  if (existing) {
    return NextResponse.json(existing)
  }

  const tag = await prisma.tag.create({
    data: { name },
  })

  return NextResponse.json(tag)
}
