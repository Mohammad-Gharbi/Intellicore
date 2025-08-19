import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Post } from "@/types/post"
import { PostDropdown } from "./PostDropdown"

export function PostCard({
  post,
  handlePostDeleted,
}: {
  post: Post
  handlePostDeleted: (id: string) => void
}) {
  return (
    <Card className="hover:shadow-md hover:bg-muted transition-colors cursor-pointer">
      <Link href={`/dashboard/posts/${post.id}`}>
        <CardHeader>
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            {post.author.name} · {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <PostDropdown post={post} onDeleted={handlePostDeleted} />
        </CardContent>
      </Link>
    </Card>
  )
}
