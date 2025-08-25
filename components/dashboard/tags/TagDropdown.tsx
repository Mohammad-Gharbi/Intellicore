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
import { Tag } from "@/types/tag"

export function TagDropdown({
  tag,
  onDeleted,
}: {
  tag: Tag
  onDeleted: (id: string) => void
}) {
  const [isPending, startTransition] = useTransition()

  const deleteTag = async (tagId: string) => {
    const res = await fetch(`/api/tags/${tagId}`, {
      method: "DELETE",
    })

    if (!res.ok) throw new Error("Failed to delete tag")
    return res.json()
  }

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteTag(tag.id)
        onDeleted(tag.id)
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
