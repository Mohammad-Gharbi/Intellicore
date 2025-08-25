import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params

    const updatedPost = await prisma.$transaction([
      prisma.post.update({
        where: { id },
        data: { views: { increment: 1 } },
      }),
      prisma.postView.create({
        data: { postId: id },
      }),
    ])

    return NextResponse.json({ updatedPost, success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to log view" }, { status: 500 })
  }
}
