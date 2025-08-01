"use client"

import MarkdownRenderer from "@/components/MarkdownRenderer"
import TagSelector from "@/components/TagSelector"
import type { Post } from "@/types/post"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PostPage() {
  const [post, setPost] = useState<Post>()
  const [loading, setLoading] = useState(true)
  const [tags, setTags] = useState<string[]>([])

  const params = useParams()
  const id = params?.id as string

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`)
        const data = await res.json()
        setPost(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  if (loading) return <div>Loading...</div>

  if (post)
    return (
      <div className="flex flex-col justify-center items-start mx-24 my-8">
        <div className="prose dark:prose-invert max-w-none">
          <h1>{post.title}</h1>
          <p className="text-sm text-muted-foreground">
            By {post.author.name} •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-6">
            <MarkdownRenderer content={post.content} />
          </div>

          <div className="w-32">
            <TagSelector
              allTags={["React", "Next.js", "TypeScript"]}
              selected={tags}
              onChange={setTags}
            />
          </div>
        </div>
      </div>
    )
}
