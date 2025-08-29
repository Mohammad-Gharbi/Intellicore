"use client"

import MarkdownRenderer from "@/components/MarkdownRenderer"
import TagSelector from "@/components/dashboard/tags/TagSelector"
import { Skeleton } from "@/components/ui/skeleton"
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import type { Post } from "@/types/post"
import type { PostTag } from "@/types/post-tag"
import type { Comment } from "@/types/comment"
import CommentsSection from "@/components/dashboard/posts/Comment"

export default function PostPage() {
  const [post, setPost] = useState<Post>()

  const [loading, setLoading] = useState(true)

  const [tags, setTags] = useState<string[]>([])
  const [allTags, setAllTags] = useState<string[]>([])

  const [comments, setComments] = useState<Comment[]>([])

  const params = useParams()
  const id = params?.id as string

  const isFirstRender = useRef(true)

  const fetchPost = async (id: string) => {
    try {
      const res = await fetch(`/api/posts/${id}`)
      const data = await res.json()
      setPost(data)
      setTags(data.tags.map((postTag: PostTag) => postTag.tag.name))

      await fetch(`/api/posts/${id}/view`, { method: "POST" })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const res = await fetch("/api/tags")
      if (!res.ok) throw new Error("Failed to fetch tags")
      const data = await res.json()

      if (Array.isArray(data)) {
        setAllTags(data.map((tag) => tag.name))
      } else {
        setAllTags([])
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateTags = async (postId: string, newTags: string[]) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tagNames: newTags }),
    })
    return res.json()
  }

  useEffect(() => {
    fetchPost(id)
  }, [id])

  useEffect(() => {
    fetchTags()
  }, [id, tags])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    updateTags(id, tags)
  }, [id, tags])

  useEffect(() => {
    fetch(`/api/posts/${id}/comments`)
      .then((res) => res.json())
      .then(setComments)
  }, [id])

  const addNewComment = async (newComment: string) => {
    if (!newComment.trim()) return

    const res = await fetch(`/api/posts/${id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment, authorId: post?.author.id }),
    })

    const created = await res.json()
    setComments([created, ...comments])
  }

  if (loading)
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    )

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
            <TagSelector allTags={allTags} selected={tags} onChange={setTags} />
          </div>
        </div>

        <CommentsSection
          author={post?.author.name}
          comments={comments}
          addNewComment={addNewComment}
        />
      </div>
    )
}
