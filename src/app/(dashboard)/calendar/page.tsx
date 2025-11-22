'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useContentStore } from '@/store/content'
import { formatDate } from '@/lib/utils'
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  FileText,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const platformColors: Record<string, string> = {
  wordpress: 'bg-blue-500',
  linkedin: 'bg-blue-600',
  twitter: 'bg-sky-500',
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-700',
  medium: 'bg-gray-900',
}

export default function CalendarPage() {
  const { content } = useContentStore()
  const [currentDate, setCurrentDate] = useState(new Date())

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  // Get scheduled content
  const scheduledContent = content.filter(c =>
    c.status === 'scheduled' && c.scheduledAt
  )

  // Create calendar grid
  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  // Get content for a specific day
  const getContentForDay = (day: number) => {
    const date = new Date(year, month, day)
    return scheduledContent.filter(c => {
      if (!c.scheduledAt) return false
      const scheduledDate = new Date(c.scheduledAt)
      return (
        scheduledDate.getDate() === day &&
        scheduledDate.getMonth() === month &&
        scheduledDate.getFullYear() === year
      )
    })
  }

  const goToPrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const isToday = (day: number) => {
    const today = new Date()
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Content Calendar"
        description="Schedule and manage your content publication"
      />

      <div className="p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="icon" onClick={goToPrevMonth}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {MONTHS[month]} {year}
                  </h2>
                  <Button variant="outline" size="icon" onClick={goToNextMonth}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={goToToday}>
                    Today
                  </Button>
                  <Link href="/create">
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-px mb-2">
                {DAYS.map(day => (
                  <div
                    key={day}
                    className="p-2 text-center text-sm font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-px bg-border rounded-lg overflow-hidden">
                {calendarDays.map((day, index) => {
                  const dayContent = day ? getContentForDay(day) : []
                  return (
                    <div
                      key={index}
                      className={`min-h-[120px] bg-background p-2 ${
                        day ? 'hover:bg-muted/50' : ''
                      }`}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium mb-1 ${
                            isToday(day)
                              ? 'w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center'
                              : ''
                          }`}>
                            {day}
                          </div>
                          <div className="space-y-1">
                            {dayContent.slice(0, 3).map(item => (
                              <div
                                key={item.id}
                                className="text-xs p-1 rounded bg-primary/10 text-primary truncate cursor-pointer hover:bg-primary/20"
                              >
                                <div className="flex items-center space-x-1">
                                  {item.type === 'blog' ? (
                                    <FileText className="w-3 h-3" />
                                  ) : (
                                    <MessageSquare className="w-3 h-3" />
                                  )}
                                  <span className="truncate">{item.title}</span>
                                </div>
                              </div>
                            ))}
                            {dayContent.length > 3 && (
                              <div className="text-xs text-muted-foreground">
                                +{dayContent.length - 3} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Posts Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Posts</CardTitle>
                <CardDescription>Your scheduled content</CardDescription>
              </CardHeader>
              <CardContent>
                {scheduledContent.length === 0 ? (
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      No scheduled posts
                    </p>
                    <Link href="/create">
                      <Button size="sm" className="mt-4">
                        <Plus className="w-4 h-4 mr-2" />
                        Schedule Content
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {scheduledContent
                      .sort((a, b) => new Date(a.scheduledAt!).getTime() - new Date(b.scheduledAt!).getTime())
                      .slice(0, 5)
                      .map(item => (
                        <div
                          key={item.id}
                          className="p-3 rounded-lg border hover:border-primary/50 transition-colors"
                        >
                          <h4 className="font-medium text-sm truncate">{item.title}</h4>
                          <div className="flex items-center space-x-2 mt-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{formatDate(item.scheduledAt!)}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {item.platforms.map(platform => (
                              <div
                                key={platform}
                                className={`w-4 h-4 rounded-full ${platformColors[platform]}`}
                                title={platform}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Platform Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.entries(platformColors).map(([platform, color]) => (
                    <div key={platform} className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${color}`} />
                      <span className="text-sm capitalize">{platform}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
