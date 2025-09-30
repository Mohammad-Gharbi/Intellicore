import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

async function deleteCommentAndReplies(id: string) {
  const replies = await prisma.comment.findMany({
    where: { parentId: id },
    select: { id: true },
  })

  for (const reply of replies) {
    await deleteCommentAndReplies(reply.id)
  }

  await prisma.comment.delete({
    where: { id: id },
  })
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: commentId } = await context.params

  try {
    await deleteCommentAndReplies(commentId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting comment:", error)
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 }
    )
  }
}
