import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

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

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const tagId = params.id

    await prisma.postTag.deleteMany({ where: { tagId } })

    await prisma.tag.delete({ where: { id: tagId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to delete tag" }, { status: 500 })
  }
}
