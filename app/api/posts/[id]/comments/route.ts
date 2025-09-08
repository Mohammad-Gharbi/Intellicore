import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params

  const comments = await prisma.comment.findMany({
    where: { postId: id },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  })
  return NextResponse.json(comments)
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { content, authorId } = await req.json()

  if (!content || !authorId) {
    return NextResponse.json(
      { error: "Missing content or authorId" },
      { status: 400 }
    )
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      postId: params.id,
      authorId,
    },
    include: { author: true },
  })

  return NextResponse.json(newComment)
}
