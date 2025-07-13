export interface Post {
  id: string
  title: string
  content: string
  published: boolean
  views: number
  createdAt: string // or Date if already parsed
  updatedAt: string

  author: {
    id: string
    name: string | null
    email: string | null
    image?: string | null
  }

  tags: {
    id: string
    name: string
  }[]

  comments: {
    id: string
    content: string
    createdAt: string
    author: {
      id: string
      name: string | null
      image?: string | null
    }
    parentId?: string | null
  }[]

  reactions: {
    id: string
    type: string // e.g. "💡", "🔥", "👍"
    userId: string
  }[]
}
