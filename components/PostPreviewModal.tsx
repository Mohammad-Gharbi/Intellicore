"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import ReactMarkdown from "react-markdown"

interface PostPreviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  content: string
}

export function PostPreviewModal({
  open,
  onOpenChange,
  title,
  content,
}: PostPreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {title || "Untitled Post"}
          </DialogTitle>
        </DialogHeader>
        <div className="prose dark:prose-invert max-w-none mt-4">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  )
}
