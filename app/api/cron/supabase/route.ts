import { prisma } from "@/lib/prisma"

export async function POST() {
  return await prisma.supabase.create({
    data: {
      checkedAt: new Date(),
    },
  })
}
