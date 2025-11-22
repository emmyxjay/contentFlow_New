'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useContentStore } from '@/store/content'
import { formatDate, truncate } from '@/lib/utils'
import {
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Eye,
  FileText,
  MessageSquare,
  Mail,
  Image as ImageIcon
} from 'lucide-react'

const contentTypeIcons = {
  blog: FileText,
  social: MessageSquare,
  email: Mail,
  caption: ImageIcon,
}

const statusConfig = {
  draft: { variant: 'secondary' as const, label: 'Draft' },
  scheduled: { variant: 'info' as const, label: 'Scheduled' },
  published: { variant: 'success' as const, label: 'Published' },
  failed: { variant: 'destructive' as const, label: 'Failed' },
}

export default function ContentPage() {
  const { content, removeContent, updateContent } = useContentStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || item.status === activeTab
    return matchesSearch && matchesTab
  })

  const contentCounts = {
    all: content.length,
    draft: content.filter(c => c.status === 'draft').length,
    scheduled: content.filter(c => c.status === 'scheduled').length,
    published: content.filter(c => c.status === 'published').length,
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Content Library"
        description="Manage all your content in one place"
      />

      <div className="p-6 space-y-6">
        {/* Search and Actions */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Link href="/create">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Content
            </Button>
          </Link>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">
              All ({contentCounts.all})
            </TabsTrigger>
            <TabsTrigger value="draft">
              Drafts ({contentCounts.draft})
            </TabsTrigger>
            <TabsTrigger value="scheduled">
              Scheduled ({contentCounts.scheduled})
            </TabsTrigger>
            <TabsTrigger value="published">
              Published ({contentCounts.published})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredContent.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No content found</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? 'Try adjusting your search query'
                      : 'Create your first piece of content to get started'}
                  </p>
                  <Link href="/create">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Content
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredContent.map((item) => {
                  const TypeIcon = contentTypeIcons[item.type]
                  const status = statusConfig[item.status]

                  return (
                    <Card key={item.id} className="hover:border-primary/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1 min-w-0">
                            <div className="p-2 rounded-lg bg-muted">
                              <TypeIcon className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-semibold truncate">{item.title}</h3>
                                <Badge variant={status.variant}>{status.label}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {truncate(item.body.replace(/<[^>]*>/g, ''), 120)}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <span className="capitalize">{item.type}</span>
                                <span>Created {formatDate(item.createdAt)}</span>
                                {item.scheduledAt && (
                                  <span className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    Scheduled {formatDate(item.scheduledAt)}
                                  </span>
                                )}
                                <div className="flex items-center space-x-1">
                                  {item.platforms.map((platform) => (
                                    <Badge key={platform} variant="outline" className="text-xs">
                                      {platform}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="w-4 h-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Calendar className="w-4 h-4 mr-2" />
                                Schedule
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => removeContent(item.id)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
