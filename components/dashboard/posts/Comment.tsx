"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { Comment } from "@/types/comment"

export default function CommentsSection({
  author,
  comments,
  addNewComment,
}: {
  author: string | null
  comments: Comment[]
  addNewComment: (newComment: string) => Promise<void>
}) {
  const [newComment, setNewComment] = useState("")

  return (
    <div className="space-y-6 my-12">
      <div className="flex items-start gap-3">
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback> {author?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div className="flex items-baseline justify-between gap-2 space-y-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="resize-none min-h-9 w-56"
          />
          <Button
            onClick={() => {
              addNewComment(newComment)
              setNewComment("")
            }}
          >
            Post
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id} className="shadow-sm p-2">
            <CardContent className="flex gap-3 p-1">
              <Avatar>
                <AvatarImage src={comment.author.image || ""} />
                <AvatarFallback>
                  {comment.author.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="font-medium">
                    {comment.author.name || "Anonymous"}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
