'use client'

import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { useContentStore } from '@/store/content'
import { useAuthStore } from '@/store/auth'
import {
  FileText,
  TrendingUp,
  Eye,
  MousePointer,
  Calendar,
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default function DashboardPage() {
  const { content, analytics, ideas } = useContentStore()
  const { workspace } = useAuthStore()

  const publishedContent = content.filter(c => c.status === 'published')
  const scheduledContent = content.filter(c => c.status === 'scheduled')
  const draftContent = content.filter(c => c.status === 'draft')

  const totalImpressions = analytics.reduce((sum, a) => sum + a.impressions, 0)
  const totalClicks = analytics.reduce((sum, a) => sum + a.clicks, 0)
  const totalEngagement = analytics.reduce((sum, a) => sum + a.engagement, 0)

  const stats = [
    {
      title: 'Total Content',
      value: content.length.toString(),
      change: '+12%',
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      title: 'Impressions',
      value: totalImpressions.toLocaleString(),
      change: '+23%',
      icon: Eye,
      color: 'text-green-500'
    },
    {
      title: 'Clicks',
      value: totalClicks.toLocaleString(),
      change: '+18%',
      icon: MousePointer,
      color: 'text-purple-500'
    },
    {
      title: 'Engagement',
      value: totalEngagement.toLocaleString(),
      change: '+31%',
      icon: TrendingUp,
      color: 'text-orange-500'
    },
  ]

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        description={`Welcome back! Here's what's happening in ${workspace?.name || 'your workspace'}.`}
      />

      <div className="p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-muted ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Jump into your most common tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/ideas">
                <Button variant="outline" className="w-full justify-start">
                  <Sparkles className="w-4 h-4 mr-3 text-yellow-500" />
                  Generate Content Ideas
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
              <Link href="/create">
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="w-4 h-4 mr-3 text-blue-500" />
                  Create New Content
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
              <Link href="/calendar">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-3 text-green-500" />
                  Schedule Posts
                  <ArrowRight className="w-4 h-4 ml-auto" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Content Overview */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Content Overview</CardTitle>
                <CardDescription>Your content by status</CardDescription>
              </div>
              <Link href="/content">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Published</span>
                    <span className="text-sm text-muted-foreground">{publishedContent.length}</span>
                  </div>
                  <Progress value={(publishedContent.length / Math.max(content.length, 1)) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Scheduled</span>
                    <span className="text-sm text-muted-foreground">{scheduledContent.length}</span>
                  </div>
                  <Progress value={(scheduledContent.length / Math.max(content.length, 1)) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Drafts</span>
                    <span className="text-sm text-muted-foreground">{draftContent.length}</span>
                  </div>
                  <Progress value={(draftContent.length / Math.max(content.length, 1)) * 100} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Content */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Content</CardTitle>
                <CardDescription>Your latest pieces</CardDescription>
              </div>
              <Link href="/content">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {content.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        item.status === 'published'
                          ? 'success'
                          : item.status === 'scheduled'
                          ? 'info'
                          : 'secondary'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Ideas */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Top Ideas</CardTitle>
                <CardDescription>High-scoring content opportunities</CardDescription>
              </div>
              <Link href="/ideas">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ideas
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 4)
                  .map((idea) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{idea.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {idea.searchIntent}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {idea.searchVolume.toLocaleString()} searches/mo
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{idea.score}</p>
                          <p className="text-xs text-muted-foreground">score</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
