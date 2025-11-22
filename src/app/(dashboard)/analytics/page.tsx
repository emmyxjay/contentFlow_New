'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useContentStore } from '@/store/content'
import { Progress } from '@/components/ui/progress'
import {
  Eye,
  MousePointer,
  ThumbsUp,
  MessageCircle,
  Share2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

const platformColors: Record<string, string> = {
  wordpress: 'bg-blue-500',
  linkedin: 'bg-blue-600',
  twitter: 'bg-sky-500',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-700',
  medium: 'bg-gray-900',
}

export default function AnalyticsPage() {
  const { content, analytics } = useContentStore()
  const [dateRange, setDateRange] = useState('7d')
  const [selectedPlatform, setSelectedPlatform] = useState('all')

  // Calculate totals
  const totalImpressions = analytics.reduce((sum, a) => sum + a.impressions, 0)
  const totalClicks = analytics.reduce((sum, a) => sum + a.clicks, 0)
  const totalEngagement = analytics.reduce((sum, a) => sum + a.engagement, 0)
  const totalShares = analytics.reduce((sum, a) => sum + a.shares, 0)
  const totalComments = analytics.reduce((sum, a) => sum + a.comments, 0)
  const totalLikes = analytics.reduce((sum, a) => sum + a.likes, 0)

  const ctr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0'
  const engagementRate = totalImpressions > 0 ? ((totalEngagement / totalImpressions) * 100).toFixed(2) : '0'

  // Platform breakdown
  const platformStats = analytics.reduce((acc, a) => {
    if (!acc[a.platform]) {
      acc[a.platform] = { impressions: 0, clicks: 0, engagement: 0 }
    }
    acc[a.platform].impressions += a.impressions
    acc[a.platform].clicks += a.clicks
    acc[a.platform].engagement += a.engagement
    return acc
  }, {} as Record<string, { impressions: number; clicks: number; engagement: number }>)

  const stats = [
    {
      title: 'Total Impressions',
      value: totalImpressions.toLocaleString(),
      change: '+23.5%',
      trend: 'up',
      icon: Eye,
    },
    {
      title: 'Total Clicks',
      value: totalClicks.toLocaleString(),
      change: '+18.2%',
      trend: 'up',
      icon: MousePointer,
    },
    {
      title: 'Click-Through Rate',
      value: `${ctr}%`,
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
    },
    {
      title: 'Engagement Rate',
      value: `${engagementRate}%`,
      change: '-0.3%',
      trend: 'down',
      icon: ThumbsUp,
    },
  ]

  const engagementBreakdown = [
    { name: 'Likes', value: totalLikes, icon: ThumbsUp, color: 'text-red-500' },
    { name: 'Comments', value: totalComments, icon: MessageCircle, color: 'text-blue-500' },
    { name: 'Shares', value: totalShares, icon: Share2, color: 'text-green-500' },
  ]

  // Top performing content
  const topContent = content
    .filter(c => c.status === 'published')
    .map(c => {
      const contentAnalytics = analytics.filter(a => a.contentId === c.id)
      const totalEng = contentAnalytics.reduce((sum, a) => sum + a.engagement, 0)
      const totalImp = contentAnalytics.reduce((sum, a) => sum + a.impressions, 0)
      return { ...c, engagement: totalEng, impressions: totalImp }
    })
    .sort((a, b) => b.engagement - a.engagement)
    .slice(0, 5)

  return (
    <div className="min-h-screen">
      <Header
        title="Analytics"
        description="Track your content performance across all platforms"
      />

      <div className="p-6 space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="wordpress">WordPress</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">X (Twitter)</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className={`flex items-center mt-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-muted">
                    <stat.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Platform Performance */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>Performance breakdown by platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(platformStats).map(([platform, stats]) => {
                  const maxImpressions = Math.max(...Object.values(platformStats).map(s => s.impressions))
                  const percentage = (stats.impressions / maxImpressions) * 100

                  return (
                    <div key={platform} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${platformColors[platform]}`} />
                          <span className="font-medium capitalize">{platform}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-muted-foreground">
                            <Eye className="w-4 h-4 inline mr-1" />
                            {stats.impressions.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            <MousePointer className="w-4 h-4 inline mr-1" />
                            {stats.clicks.toLocaleString()}
                          </span>
                          <span className="text-muted-foreground">
                            <ThumbsUp className="w-4 h-4 inline mr-1" />
                            {stats.engagement.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Progress value={percentage} className="h-2" />
                    </div>
                  )
                })}

                {Object.keys(platformStats).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No platform data available yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement Breakdown</CardTitle>
              <CardDescription>How users interact with your content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {engagementBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <span className="text-2xl font-bold">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Total Engagement</span>
                  <span className="font-bold">{totalEngagement.toLocaleString()}</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Content */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
            <CardDescription>Your best-performing published content</CardDescription>
          </CardHeader>
          <CardContent>
            {topContent.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Publish content to see performance data
              </div>
            ) : (
              <div className="space-y-4">
                {topContent.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {item.platforms.map(platform => (
                            <div
                              key={platform}
                              className={`w-3 h-3 rounded-full ${platformColors[platform]}`}
                              title={platform}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="text-center">
                        <p className="text-lg font-bold">{item.impressions.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Impressions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold">{item.engagement.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Engagement</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">
                          {item.impressions > 0 ? ((item.engagement / item.impressions) * 100).toFixed(1) : 0}%
                        </p>
                        <p className="text-xs text-muted-foreground">Rate</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
