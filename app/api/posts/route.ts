import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    })
    return NextResponse.json(posts)
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

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { title, content } = await req.json()
  const user = session.user as typeof session.user & { id: string }

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
    },
  })

  return NextResponse.json(post)
}
