export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'editor' | 'viewer'
  createdAt: string
  workspaceId: string
}

export interface Workspace {
  id: string
  name: string
  niche: string
  description?: string
  createdAt: string
  ownerId: string
}

export interface ContentIdea {
  id: string
  title: string
  description: string
  keywords: string[]
  searchVolume: number
  competition: 'low' | 'medium' | 'high'
  searchIntent: 'informational' | 'commercial' | 'transactional' | 'navigational'
  score: number
  source: 'trending' | 'competitor' | 'keyword' | 'question'
  createdAt: string
  workspaceId: string
}

export interface Content {
  id: string
  title: string
  body: string
  type: 'blog' | 'social' | 'email' | 'caption'
  status: 'draft' | 'scheduled' | 'published' | 'failed'
  tone: string
  seoScore?: number
  readabilityScore?: number
  keywords: string[]
  platforms: Platform[]
  scheduledAt?: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  workspaceId: string
  authorId: string
  ideaId?: string
  mediaAssets: MediaAsset[]
}

export interface MediaAsset {
  id: string
  url: string
  type: 'image' | 'video' | 'gif'
  source: 'ai-generated' | 'stock' | 'uploaded'
  alt?: string
  width?: number
  height?: number
  createdAt: string
  workspaceId: string
}

export interface BrandTemplate {
  id: string
  name: string
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  logoUrl?: string
  createdAt: string
  workspaceId: string
}

export type Platform = 'wordpress' | 'linkedin' | 'twitter' | 'instagram' | 'facebook' | 'medium'

export interface ScheduledPost {
  id: string
  contentId: string
  platform: Platform
  scheduledAt: string
  status: 'pending' | 'published' | 'failed'
  publishedUrl?: string
  error?: string
  createdAt: string
}

export interface Integration {
  id: string
  platform: Platform
  accessToken: string
  refreshToken?: string
  expiresAt?: string
  accountName: string
  accountId: string
  isActive: boolean
  createdAt: string
  workspaceId: string
}

export interface Analytics {
  id: string
  contentId: string
  platform: Platform
  impressions: number
  clicks: number
  engagement: number
  shares: number
  comments: number
  likes: number
  rankingPosition?: number
  date: string
}

export interface ContentGenerationRequest {
  type: 'blog' | 'social' | 'email' | 'caption'
  topic: string
  keywords?: string[]
  tone: 'professional' | 'casual' | 'friendly' | 'authoritative' | 'humorous'
  length: 'short' | 'medium' | 'long'
  mode: 'generate' | 'outline' | 'rewrite' | 'headline'
  existingContent?: string
  platform?: Platform
}

export interface AIPrompt {
  id: string
  name: string
  template: string
  type: ContentGenerationRequest['type']
  variables: string[]
  createdAt: string
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  platform: Platform
  contentId: string
  status: 'scheduled' | 'published' | 'failed'
}

export interface DashboardStats {
  totalContent: number
  publishedContent: number
  scheduledContent: number
  totalImpressions: number
  totalEngagement: number
  topPerformingContent: Content[]
  platformBreakdown: {
    platform: Platform
    count: number
    engagement: number
  }[]
}
