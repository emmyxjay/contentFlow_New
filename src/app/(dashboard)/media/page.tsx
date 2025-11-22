'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Search,
  Plus,
  Image as ImageIcon,
  Sparkles,
  Upload,
  Link2,
  Loader2,
  Download,
  Trash2,
  Grid,
  List
} from 'lucide-react'

// Sample stock images
const stockImages = [
  { id: '1', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop', alt: 'Person working on laptop' },
  { id: '2', url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop', alt: 'Team collaboration' },
  { id: '3', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', alt: 'Analytics dashboard' },
  { id: '4', url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop', alt: 'Team meeting' },
  { id: '5', url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=300&fit=crop', alt: 'Creative workspace' },
  { id: '6', url: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop', alt: 'Business presentation' },
  { id: '7', url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop', alt: 'Developer coding' },
  { id: '8', url: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400&h=300&fit=crop', alt: 'Startup office' },
]

interface MediaItem {
  id: string
  url: string
  alt: string
  type: 'ai-generated' | 'stock' | 'uploaded'
  createdAt: string
}

export default function MediaPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([
    { id: '1', url: stockImages[0].url, alt: 'Content marketing visual', type: 'stock', createdAt: new Date().toISOString() },
    { id: '2', url: stockImages[3].url, alt: 'Team collaboration', type: 'uploaded', createdAt: new Date().toISOString() },
  ])

  const handleGenerateImage = async () => {
    if (!aiPrompt.trim()) return

    setIsGenerating(true)
    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Use a placeholder for the "generated" image
    const newImage: MediaItem = {
      id: Date.now().toString(),
      url: `https://images.unsplash.com/photo-${1550000000000 + Math.floor(Math.random() * 10000000)}?w=400&h=300&fit=crop`,
      alt: aiPrompt,
      type: 'ai-generated',
      createdAt: new Date().toISOString()
    }

    // Actually use a random stock image as placeholder
    const randomStock = stockImages[Math.floor(Math.random() * stockImages.length)]
    newImage.url = randomStock.url

    setMediaLibrary(prev => [newImage, ...prev])
    setGeneratedImage(newImage.url)
    setIsGenerating(false)
    setAiPrompt('')
  }

  const handleAddStock = (image: typeof stockImages[0]) => {
    const newImage: MediaItem = {
      id: Date.now().toString(),
      url: image.url,
      alt: image.alt,
      type: 'stock',
      createdAt: new Date().toISOString()
    }
    setMediaLibrary(prev => [newImage, ...prev])
  }

  const handleDelete = (id: string) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id))
  }

  const filteredMedia = mediaLibrary.filter(item => {
    const matchesSearch = item.alt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === 'all' || item.type === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen">
      <Header
        title="Media Library"
        description="Manage images, videos, and visual assets"
      />

      <div className="p-6 space-y-6">
        {/* Search and Actions */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Media
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Media</DialogTitle>
                  <DialogDescription>
                    Generate AI images, browse stock photos, or upload your own
                  </DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="ai" className="mt-4">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="ai">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Generate
                    </TabsTrigger>
                    <TabsTrigger value="stock">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Stock Photos
                    </TabsTrigger>
                    <TabsTrigger value="upload">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="ai" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Describe the image you want to generate</Label>
                      <Textarea
                        placeholder="A modern workspace with a laptop showing analytics, natural lighting, minimalist style..."
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleGenerateImage}
                      disabled={isGenerating || !aiPrompt.trim()}
                      className="w-full"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Image
                        </>
                      )}
                    </Button>
                    {generatedImage && (
                      <div className="mt-4">
                        <img
                          src={generatedImage}
                          alt="Generated"
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="stock" className="mt-4">
                    <div className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">
                      {stockImages.map((image) => (
                        <button
                          key={image.id}
                          onClick={() => handleAddStock(image)}
                          className="relative group rounded-lg overflow-hidden"
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Plus className="w-8 h-8 text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="upload" className="mt-4">
                    <div className="border-2 border-dashed rounded-lg p-12 text-center">
                      <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Drop files here or click to upload</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <Button variant="outline">
                        Choose Files
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Media Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="ai-generated">AI Generated</TabsTrigger>
            <TabsTrigger value="stock">Stock</TabsTrigger>
            <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredMedia.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No media found</h3>
                  <p className="text-muted-foreground mb-4">
                    Add images to your media library to use in your content
                  </p>
                </CardContent>
              </Card>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredMedia.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-lg overflow-hidden border"
                  >
                    <img
                      src={item.url}
                      alt={item.alt}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                      <Button size="icon" variant="secondary">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        {item.type === 'ai-generated' ? 'AI' : item.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredMedia.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4 flex items-center space-x-4">
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.alt}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {item.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Added recently
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="icon" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
