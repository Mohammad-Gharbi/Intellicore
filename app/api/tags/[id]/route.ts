import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  try {
    const tag = await prisma.tag.findUnique({
      where: { id: id },
      include: {
        PostTag: {
          include: {
            post: {
              include: {
                author: { select: { name: true } },
              },
            },
          },
        },
      },
    })

    if (!tag) {
      return NextResponse.json({ error: "Tag not found" }, { status: 404 })
    }

    return NextResponse.json(tag)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(
        JSON.stringify({
          status: "error",
          message: error.message,
        }),
        { status: 500 }
      )
    }
  }
}
