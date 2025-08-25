"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import type { Tag } from "@/types/tag"
import { PostCard } from "@/components/dashboard/posts/PostCard"

export default function TagPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id

  const [tag, setTag] = useState<Tag | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const res = await fetch(`/api/tags/${id}`)
        const data = await res.json()
        setTag(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTag()
  }, [id])

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }

  if (!tag) {
    return <p className="text-center text-muted-foreground">Tag not found.</p>
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        {tag.name} <Badge>{tag.PostTag.length}</Badge>
      </h1>

      <div className="space-y-3">
        {tag.PostTag.map((postTag) => (
          <PostCard key={postTag.post.id} post={postTag.post} />
        ))}
      </div>
    </div>
  )
}
