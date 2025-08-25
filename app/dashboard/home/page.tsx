import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ViewsChart } from "@/components/dashboard/home/views-chart"

export default async function DashboardPage() {
  const [
    postCount,
    tagCount,
    publishedCount,
    views,
    recentPosts,
    topTags,
    viewsOverTime,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.tag.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.aggregate({ _sum: { views: true } }),
    prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { tags: { include: { tag: true } } },
    }),
    prisma.tag.findMany({
      take: 5,
      include: { posts: true },
      orderBy: { posts: { _count: "desc" } },
    }),
    prisma.post.groupBy({
      by: ["createdAt"],
      _sum: { views: true },
      orderBy: { createdAt: "asc" },
    }),
  ])

  const chartData = viewsOverTime.map((entry) => ({
    date: entry.createdAt.toISOString().split("T")[0],
    views: entry._sum.views ?? 0,
  }))

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground">
        Quick insights into your posts, tags, and activity.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Posts" value={postCount} />
        <StatCard title="Published Posts" value={publishedCount} />
        <StatCard title="Tags" value={tagCount} />
        <StatCard title="Total Views" value={views._sum.views ?? 0} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Views Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ViewsChart data={chartData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentPosts.length === 0 && (
            <p className="text-sm text-muted-foreground">No posts yet.</p>
          )}
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between border-b last:border-none py-2"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()} ·{" "}
                  {post.tags.map((t) => t.tag.name).join(", ") || "No tags"}
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/posts/${post.id}`}>View</Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {topTags.length === 0 && (
            <p className="text-sm text-muted-foreground">No tags yet.</p>
          )}
          {topTags.map((tag) => (
            <div
              key={tag.id}
              className="flex items-center justify-between border-b last:border-none py-2"
            >
              <span className="font-medium">{tag.name}</span>
              <span className="text-sm text-muted-foreground">
                {tag.posts.length} posts
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <Card className="hover:shadow-md transition">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
