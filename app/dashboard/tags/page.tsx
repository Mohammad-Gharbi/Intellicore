"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import type { Tag } from "@/types/tag"

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/tags")
      const data = await res.json()
      setTags(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Tags</h1>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-6 space-y-4">
          {tags.map((tag) => (
            <Link key={tag.id} href={`tags/${tag.id}`} className="block">
              <Card className="hover:shadow-md hover:bg-muted transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    {tag.name}
                  </CardTitle>
                  <Badge variant="secondary">
                    {tag._count.PostTag == 1
                      ? "1 post"
                      : `${tag._count.PostTag} posts`}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Click to explore posts with{" "}
                    <span className="font-medium">{tag.name}</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
