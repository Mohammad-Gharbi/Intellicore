import type { Post } from "@/types/post"

export interface PostTag {
  postId: string
  tagId: string
  tag: {
    id: string
    name: string
  }
  post: Post[]
}
