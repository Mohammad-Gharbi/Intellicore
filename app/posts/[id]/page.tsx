import MarkdownRenderer from "@/components/MarkdownRenderer"
import type { Post } from "@/types/post"

const mockPost = {
  id: "post_123",
  title: "Boosting Team Knowledge with Intellicore",
  content: `
  ## Why Internal Knowledge Matters
  
  Every team has knowledge trapped in Slack, Notion, and people's heads. Intellicore fixes that.
  
  ### Features
  
  - ✅ Markdown editing
  - 🔄 Real-time updates
  - 🔐 Role-based access
  
  Try writing your first internal post today!
  
  \`\`\`ts
  console.log("Welcome to Intellicore")
  \`\`\`
    `,
  published: true,
  views: 187,
  createdAt: "2024-10-21T10:15:00.000Z",
  updatedAt: "2024-11-01T12:32:00.000Z",

  author: {
    id: "user_1",
    name: "Leila Bensalem",
    email: "leila@intellicore.io",
    image: "https://i.pravatar.cc/100?img=3",
  },

  tags: [
    { id: "tag_1", name: "team" },
    { id: "tag_2", name: "knowledge" },
    { id: "tag_3", name: "intellicore" },
  ],

  comments: [
    {
      id: "comment_1",
      content: "This is exactly what our team needed!",
      createdAt: "2024-11-02T08:30:00.000Z",
      author: {
        id: "user_2",
        name: "Yassine Messaoudi",
        image: "https://i.pravatar.cc/100?img=5",
      },
      parentId: null,
    },
    {
      id: "comment_2",
      content: "Can we also embed diagrams?",
      createdAt: "2024-11-03T11:15:00.000Z",
      author: {
        id: "user_3",
        name: "Imen Lahmar",
        image: "https://i.pravatar.cc/100?img=7",
      },
      parentId: null,
    },
  ],

  reactions: [
    { id: "r1", type: "💡", userId: "user_2" },
    { id: "r2", type: "🔥", userId: "user_3" },
    { id: "r3", type: "💡", userId: "user_1" },
  ],
}

export default function PostPage({ post }: { post: Post }) {
  post = mockPost
  return (
    <div className="flex flex-col justify-center items-center my-8">
      <div className="prose dark:prose-invert max-w-none">
        <h1>{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          By {post.author.name} •{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div className="mt-6">
          <MarkdownRenderer content={post.content} />
        </div>

        <div className="mt-4 flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag.id}
              className="text-sm text-primary-foreground bg-primary/10 px-2 py-1 rounded"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
