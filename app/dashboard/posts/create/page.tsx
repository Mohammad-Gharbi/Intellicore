"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { PostPreview } from "@/components/PostPreview"

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit() {
    setIsLoading(true)

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    })

    if (res.ok) {
      toast.success("Post created")
      router.push("/dashboard/posts")
    } else {
      toast.error("Failed to create post")
    }

    setIsLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
      <div className=" flex flex-row gap-8">
        <div className="space-y-4 w-96">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              className="my-2"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your post title"
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              className="my-2 h-72"
              id="content"
              value={content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContent(e.target.value)
              }
              rows={8}
              placeholder="Write your post content using Markdown..."
              required
            />
          </div>
          <div className="w-52 p-1 flex flex-row items-center justify-between ">
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </div>
        <PostPreview title={title} content={content} />
      </div>
    </div>
  )
}
