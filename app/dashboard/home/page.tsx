"use client"


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
        <p className="text-muted-foreground">
          Manage your posts, tags, and insights all in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Create and manage your posts.
            </p>
            <Button asChild>
              <Link href="/posts">View Posts</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Organize and categorize content.
            </p>
            <Button asChild variant="secondary">
              <Link href="/tags">Manage Tags</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Track performance and insights.
            </p>
            <Button asChild variant="outline">
              <Link href="/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Customize your account and app preferences.
            </p>
            <Button asChild variant="ghost">
              <Link href="/settings">Go to Settings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
