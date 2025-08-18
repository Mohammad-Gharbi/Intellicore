"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

import type { Post } from "@/types/post"
import { Skeleton } from "@/components/ui/skeleton"
import { PostCard } from "@/components/PostCard"

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        if (!res.ok) throw new Error("Failed to fetch tags")

        const data = await res.json()

        if (Array.isArray(data)) {
          setPosts(data)
        } else {
          setPosts([])
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold mb-4">All Posts</h1>
        <Button asChild>
          <Link href="posts/create">Create Post</Link>
        </Button>
      </div>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : (
        posts.map((post: Post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  )
}
