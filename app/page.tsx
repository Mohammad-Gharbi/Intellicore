"use client"

import Hero from "@/components/Hero"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col gap-4">
      <Hero />
    </div>
  )
}
