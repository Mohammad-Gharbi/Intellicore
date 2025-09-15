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
import { Comment } from "@/types/comment"
import { toast } from "sonner"

export function CommentDropdown({
  postId,
  comment,
  onDeleted,
}: {
  postId: string
  comment: Comment
  onDeleted: (id: string) => void
}) {
  const [isPending, startTransition] = useTransition()

  const deleteComment = async (postId: string, commentId: string) => {
    const res = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
    })
    if (res.ok) {
      toast.success("Comment deleted")
    } else {
      toast.error("Failed to delete comment")
    }
    return res.json()
  }

  const handleDelete = async (postId: string, commentId: string) => {
    startTransition(async () => {
      try {
        await deleteComment(postId, commentId)
        onDeleted(comment.id)
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
            handleDelete(postId, comment.id)
          }}
        >
          <Trash2 className="text-red-600 mr-2 h-4 w-4" />
          {isPending ? "Removing..." : "Remove"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
