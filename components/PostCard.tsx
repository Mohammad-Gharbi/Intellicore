import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Post } from "@/types/post"

export function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <Link href={`/dashboard/posts/${post.id}`}>
        <CardHeader>
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {post.author.name} · {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}
