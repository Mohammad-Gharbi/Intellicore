"use client"

import Hero from "@/components/landing/Hero"
import DotsBackground from "@/components/landing/DotsBackground"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Home() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard/home")
    }
  }, [status, router])

  if (status === "loading") {
    return <p>Loading...</p>
  }
  return (
    <div className="flex flex-col gap-4">
      <DotsBackground />
      <Hero />
    </div>
  )
}
