import type { PostTag } from "@/types/post-tag"

export interface Tag {
  id: string
  name: string
  PostTag: PostTag[]
  _count: {
    PostTag: number
  }
}
