export type Author = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

export type Comment = {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  author: Author
}
