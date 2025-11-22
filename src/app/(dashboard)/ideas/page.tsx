'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useContentStore } from '@/store/content'
import {
  Sparkles,
  Search,
  TrendingUp,
  Target,
  HelpCircle,
  Users,
  ArrowRight,
  Loader2,
  Trash2,
  Plus
} from 'lucide-react'
import Link from 'next/link'

const sourceIcons = {
  trending: TrendingUp,
  competitor: Users,
  keyword: Target,
  question: HelpCircle,
}

const sourceLabels = {
  trending: 'Trending',
  competitor: 'Competitor',
  keyword: 'Keyword',
  question: 'Question',
}

export default function IdeasPage() {
  const { ideas, addIdea, removeIdea } = useContentStore()
  const [topic, setTopic] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  const generateIdeas = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)

    try {
      const response = await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      })

      const data = await response.json()

      if (data.error) {
        alert('Error: ' + data.error)
      } else if (data.ideas && Array.isArray(data.ideas)) {
        data.ideas.forEach((idea: any) => {
          addIdea({
            title: idea.title,
            description: idea.description,
            keywords: idea.keywords || [],
            searchVolume: idea.searchVolume || 5000,
            competition: idea.competition || 'medium',
            searchIntent: idea.searchIntent || 'informational',
            score: idea.score || 75,
            source: idea.source || 'keyword',
            workspaceId: 'workspace-1'
          })
        })
        setTopic('')
      }
    } catch (error) {
      console.error('Failed to generate ideas:', error)
      alert('Failed to generate ideas. Please try again.')
    }

    setIsGenerating(false)
  }

  const filteredIdeas = activeTab === 'all'
    ? ideas
    : ideas.filter(idea => idea.source === activeTab)

  const getCompetitionColor = (competition: string) => {
    switch (competition) {
      case 'low': return 'success'
      case 'medium': return 'warning'
      case 'high': return 'destructive'
      default: return 'secondary'
    }
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Content Ideas"
        description="Discover trending topics and generate AI-powered content ideas"
      />

      <div className="p-6 space-y-6">
        {/* Idea Generator */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span>AI Idea Generator</span>
            </CardTitle>
            <CardDescription>
              Enter a topic or niche to generate trending content ideas with keyword insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Enter a topic (e.g., AI automation, content marketing, remote work)"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generateIdeas()}
                  className="pl-10"
                />
              </div>
              <Button onClick={generateIdeas} disabled={isGenerating || !topic.trim()}>
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Ideas
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ideas List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Ideas</CardTitle>
                <CardDescription>
                  {ideas.length} idea{ideas.length !== 1 ? 's' : ''} available
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="keyword">Keywords</TabsTrigger>
                <TabsTrigger value="question">Questions</TabsTrigger>
                <TabsTrigger value="competitor">Competitors</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                {filteredIdeas.length === 0 ? (
                  <div className="text-center py-12">
                    <Sparkles className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No ideas yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Generate your first batch of content ideas above
                    </p>
                  </div>
                ) : (
                  filteredIdeas.map((idea) => {
                    const SourceIcon = sourceIcons[idea.source]
                    return (
                      <div
                        key={idea.id}
                        className="p-4 rounded-lg border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                <SourceIcon className="w-3 h-3 mr-1" />
                                {sourceLabels[idea.source]}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {idea.searchIntent}
                              </Badge>
                              <Badge variant={getCompetitionColor(idea.competition)} className="text-xs">
                                {idea.competition} competition
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-1">{idea.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                              {idea.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="text-muted-foreground">
                                <TrendingUp className="w-4 h-4 inline mr-1" />
                                {idea.searchVolume.toLocaleString()} searches/mo
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {idea.keywords.slice(0, 4).map((keyword) => (
                                  <Badge key={keyword} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end space-y-2 ml-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-primary">{idea.score}</div>
                              <div className="text-xs text-muted-foreground">score</div>
                            </div>
                            <div className="flex space-x-2">
                              <Link href={`/create?idea=${idea.id}`}>
                                <Button size="sm">
                                  <Plus className="w-4 h-4 mr-1" />
                                  Create
                                </Button>
                              </Link>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeIdea(idea.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
