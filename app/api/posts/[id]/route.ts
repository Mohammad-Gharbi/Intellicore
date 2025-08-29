import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  try {
    const post = await prisma.post.findUnique({
      where: { id: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json(post)
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

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const { tagNames } = await req.json()

    const tags = await Promise.all(
      tagNames.map((name: string) =>
        prisma.tag.upsert({
          where: { name },
          update: {},
          create: { name },
        })
      )
    )

    await prisma.postTag.deleteMany({ where: { postId: id } })
    await prisma.postTag.createMany({
      data: tags.map((tag) => ({ postId: id, tagId: tag.id })),
    })

    const updatedPost = await prisma.post.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to update tags" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: postId } = await context.params

    await prisma.postTag.deleteMany({ where: { postId } })

    await prisma.post.delete({ where: { id: postId } })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    )
  }
}
