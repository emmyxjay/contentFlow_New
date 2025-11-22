'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
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
import { Platform } from '@/types'
import {
  Sparkles,
  FileText,
  MessageSquare,
  Mail,
  Image as ImageIcon,
  Loader2,
  Save,
  Send,
  Calendar,
  RefreshCw,
  List,
  Type,
  Wand2,
  CheckCircle
} from 'lucide-react'

const contentTypes = [
  { id: 'blog', name: 'Blog Post', icon: FileText, description: 'Long-form SEO content' },
  { id: 'social', name: 'Social Post', icon: MessageSquare, description: 'Platform-specific posts' },
  { id: 'email', name: 'Email', icon: Mail, description: 'Newsletter or promotional' },
  { id: 'caption', name: 'Caption', icon: ImageIcon, description: 'Short-form captions' },
]

const tones = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'authoritative', label: 'Authoritative' },
  { value: 'humorous', label: 'Humorous' },
]

const lengths = [
  { value: 'short', label: 'Short (500-800 words)' },
  { value: 'medium', label: 'Medium (1000-1500 words)' },
  { value: 'long', label: 'Long (2000+ words)' },
]

const platforms: { value: Platform; label: string }[] = [
  { value: 'wordpress', label: 'WordPress' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'X (Twitter)' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'medium', label: 'Medium' },
]

const modes = [
  { value: 'generate', label: 'Generate', icon: Sparkles },
  { value: 'outline', label: 'Outline', icon: List },
  { value: 'rewrite', label: 'Rewrite', icon: RefreshCw },
  { value: 'headline', label: 'Headlines', icon: Type },
]

export default function CreatePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ideaId = searchParams.get('idea')
  const { ideas, addContent } = useContentStore()

  const selectedIdea = ideaId ? ideas.find(i => i.id === ideaId) : null

  const [contentType, setContentType] = useState<'blog' | 'social' | 'email' | 'caption'>('blog')
  const [mode, setMode] = useState('generate')
  const [topic, setTopic] = useState(selectedIdea?.title || '')
  const [keywords, setKeywords] = useState(selectedIdea?.keywords.join(', ') || '')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('medium')
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['wordpress'])
  const [title, setTitle] = useState(selectedIdea?.title || '')
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: contentType,
          topic,
          keywords,
          tone,
          length,
          mode,
          platform: selectedPlatforms[0] || 'twitter',
          existingContent: mode === 'rewrite' ? generatedContent : undefined
        })
      })

      const data = await response.json()

      if (data.error) {
        alert('Error: ' + data.error)
      } else {
        setGeneratedContent(data.content)
        if (!title) setTitle(topic)
      }
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate content. Please try again.')
    }
    setIsGenerating(false)
  }

  const handleSave = async (status: 'draft' | 'scheduled') => {
    if (!title.trim() || !generatedContent.trim()) return

    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))

    addContent({
      title,
      body: generatedContent,
      type: contentType,
      status,
      tone,
      keywords: keywords.split(',').map(k => k.trim()).filter(Boolean),
      platforms: selectedPlatforms,
      workspaceId: 'workspace-1',
      authorId: 'user-1',
      ideaId: selectedIdea?.id,
      mediaAssets: [],
      scheduledAt: status === 'scheduled' ? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() : undefined
    })

    setIsSaving(false)
    router.push('/content')
  }

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Create Content"
        description="Generate AI-powered content for any platform"
      />

      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Panel - Settings */}
          <div className="space-y-6">
            {/* Content Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Type</CardTitle>
                <CardDescription>Select the type of content you want to create</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {contentTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setContentType(type.id as typeof contentType)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        contentType === type.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <type.icon className={`w-5 h-5 mb-2 ${contentType === type.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <div className="font-medium">{type.name}</div>
                      <div className="text-xs text-muted-foreground">{type.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Generation Mode */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generation Mode</CardTitle>
                <CardDescription>Choose how you want to create content</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={mode} onValueChange={setMode}>
                  <TabsList className="grid grid-cols-4">
                    {modes.map((m) => (
                      <TabsTrigger key={m.value} value={m.value} className="flex items-center space-x-1">
                        <m.icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{m.label}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Content Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Topic / Title</Label>
                  <Input
                    id="topic"
                    placeholder="Enter your topic or title"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma-separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="keyword1, keyword2, keyword3"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tones.map((t) => (
                          <SelectItem key={t.value} value={t.value}>
                            {t.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Length</Label>
                    <Select value={length} onValueChange={setLength}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {lengths.map((l) => (
                          <SelectItem key={l.value} value={l.value}>
                            {l.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Target Platforms</Label>
                  <div className="flex flex-wrap gap-2">
                    {platforms.map((platform) => (
                      <Badge
                        key={platform.value}
                        variant={selectedPlatforms.includes(platform.value) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => togglePlatform(platform.value)}
                      >
                        {selectedPlatforms.includes(platform.value) && (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        )}
                        {platform.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !topic.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Editor */}
          <div className="space-y-6">
            <Card className="min-h-[600px] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Content Editor</CardTitle>
                    <CardDescription>Edit and refine your generated content</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSave('draft')}
                      disabled={isSaving || !generatedContent}
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Save Draft
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSave('scheduled')}
                      disabled={isSaving || !generatedContent}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Enter content title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder={isGenerating ? 'Generating content...' : 'Your generated content will appear here. You can edit it directly.'}
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      className="flex-1 min-h-[400px] font-mono text-sm"
                    />
                  </div>

                  {generatedContent && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {generatedContent.split(/\s+/).filter(Boolean).length} words
                      </span>
                      <span>
                        {generatedContent.length} characters
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
