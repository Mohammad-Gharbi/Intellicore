"use client"

import MarkdownRenderer from "@/components/MarkdownRenderer"

interface PostPreviewProps {
  title: string
  content: string
}

export function PostPreview({ title, content }: PostPreviewProps) {
  return (
    <div>
      <div className=" mt-5 dark:bg-input/30 bg-transparent w-96 h-[86%] rounded-xl border p-6 shadow-sm  overflow-y-auto max-h-[80vh]">
        <div>
          <div className="text-2xl">
            {title || <div className="text-neutral-500">Untitled Post</div>}
          </div>
        </div>
        <div className=" mt-4">
          <MarkdownRenderer content={content} />
        </div>
      </div>
    </div>
  )
}
