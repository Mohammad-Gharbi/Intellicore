import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      include: {
        _count: {
          select: { PostTag: true },
        },
      },
    })
    return NextResponse.json(tags)
  } catch (error: unknown) {
    return NextResponse.json(
      { status: "error", message: (error as Error).message },
      { status: 500 }
    )
  }
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
