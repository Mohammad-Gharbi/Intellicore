import { prisma } from "@/lib/prisma"

export async function GET() {
  return await prisma.supabase.create({
    data: {
      checkedAt: new Date(),
    },
  })
}
