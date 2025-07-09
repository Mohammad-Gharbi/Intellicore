import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST() {
  const result = await prisma.supabase.create({
    data: {
      checkedAt: new Date(),
    },
  })

  return NextResponse.json(result)
}
