export type DashboardData = {
  postsCount: number
  totalViews: number
  postsOverTime: {
    createdAt: string
    _count: { id: number }
  }[]
  viewsOverTime: {
    createdAt: string
    _count: { id: number }
  }[]
}
