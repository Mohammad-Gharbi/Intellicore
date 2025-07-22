"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

import type { Post } from "@/types/post"

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        setPosts(data)
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

      {!loading && posts.length === 0 ? (
        <p className="text-muted-foreground">No posts found.</p>
      ) : (
        posts.map((post) => (
          <Card key={post.id}>
            <Link href={`posts/${post.id}`}>
              <CardHeader>
                <CardTitle className="text-lg">{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {post.author.name} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))
      )}
    </div>
  )
}
