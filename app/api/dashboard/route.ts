import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const postsCount = await prisma.post.count()

    const totalViews = await prisma.post.aggregate({
      _sum: { views: true },
    })

    const postsOverTime = await prisma.post.groupBy({
      by: ["createdAt"],
      _count: { id: true },
      orderBy: { createdAt: "asc" },
    })

    const viewsOverTime = await prisma.postView.groupBy({
      by: ["createdAt"],
      _count: { id: true },
      orderBy: { createdAt: "asc" },
    })

    return NextResponse.json({
      postsCount,
      totalViews: totalViews._sum.views ?? 0,
      postsOverTime,
      viewsOverTime,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Failed to load dashboard" },
      { status: 500 }
    )
  }
}
