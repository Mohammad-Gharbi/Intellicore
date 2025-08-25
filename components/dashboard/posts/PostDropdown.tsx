"use client"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Trash2, MoreHorizontal } from "lucide-react"
import { useTransition } from "react"
import { Post } from "@/types/post"

export function PostDropdown({
  post,
  onDeleted,
}: {
  post: Post
  onDeleted: (id: string) => void
}) {
  const [isPending, startTransition] = useTransition()

  const deletePost = async (postId: string) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    })

    if (!res.ok) throw new Error("Failed to delete post")
    return res.json()
  }

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deletePost(post.id)
        onDeleted(post.id)
      } catch (err) {
        console.error(err)
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-red-600 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation()
            handleDelete()
          }}
        >
          <Trash2 className="text-red-600 mr-2 h-4 w-4" />
          {isPending ? "Removing..." : "Remove"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
