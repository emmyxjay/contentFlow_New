'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuthStore } from '@/store/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { getInitials } from '@/lib/utils'
import {
  User,
  Building,
  Link2,
  Bell,
  Shield,
  Key,
  CheckCircle,
  XCircle,
  ExternalLink,
  Plus,
  Trash2
} from 'lucide-react'

const platformIntegrations = [
  {
    id: 'wordpress',
    name: 'WordPress',
    description: 'Publish blog posts directly to your WordPress site',
    icon: '📝',
    connected: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Share content to your LinkedIn profile and company page',
    icon: '💼',
    connected: true,
  },
  {
    id: 'twitter',
    name: 'X (Twitter)',
    description: 'Post tweets and threads to your Twitter account',
    icon: '🐦',
    connected: false,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Schedule and publish posts to Instagram',
    icon: '📸',
    connected: false,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Publish to Facebook pages and groups',
    icon: '👍',
    connected: true,
  },
  {
    id: 'medium',
    name: 'Medium',
    description: 'Cross-post articles to your Medium publication',
    icon: '📖',
    connected: false,
  },
]

export default function SettingsPage() {
  const { user, workspace, setWorkspace } = useAuthStore()
  const [isSaving, setIsSaving] = useState(false)
  const [workspaceName, setWorkspaceName] = useState(workspace?.name || '')
  const [workspaceNiche, setWorkspaceNiche] = useState(workspace?.niche || '')
  const [userName, setUserName] = useState(user?.name || '')
  const [userEmail, setUserEmail] = useState(user?.email || '')
  const [integrations, setIntegrations] = useState(platformIntegrations)

  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    publishNotifications: true,
    weeklyDigest: true,
    analyticsAlerts: false,
    teamActivity: true,
  })

  const handleSaveProfile = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    setIsSaving(false)
  }

  const handleSaveWorkspace = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 500))
    if (workspace) {
      setWorkspace({ ...workspace, name: workspaceName, niche: workspaceNiche })
    }
    setIsSaving(false)
  }

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(i =>
        i.id === id ? { ...i, connected: !i.connected } : i
      )
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        title="Settings"
        description="Manage your account, workspace, and integrations"
      />

      <div className="p-6">
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profile" className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="workspace" className="flex items-center">
              <Building className="w-4 h-4 mr-2" />
              Workspace
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center">
              <Link2 className="w-4 h-4 mr-2" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center">
              <Key className="w-4 h-4 mr-2" />
              API Keys
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Manage your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarFallback className="text-xl bg-primary text-primary-foreground">
                      {user?.name ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>
                  Manage your password and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Last changed 30 days ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Workspace Settings */}
          <TabsContent value="workspace">
            <Card>
              <CardHeader>
                <CardTitle>Workspace Settings</CardTitle>
                <CardDescription>
                  Configure your workspace details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workspace-name">Workspace Name</Label>
                    <Input
                      id="workspace-name"
                      value={workspaceName}
                      onChange={(e) => setWorkspaceName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="niche">Niche / Industry</Label>
                    <Input
                      id="niche"
                      value={workspaceNiche}
                      onChange={(e) => setWorkspaceNiche(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveWorkspace} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>
                  Manage who has access to this workspace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {user?.name ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Badge>Owner</Badge>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Team Member
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Platform Integrations</CardTitle>
                <CardDescription>
                  Connect your social media accounts and publishing platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{integration.icon}</span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="font-medium">{integration.name}</p>
                            {integration.connected ? (
                              <Badge variant="success" className="text-xs">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Connected
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">
                                <XCircle className="w-3 h-3 mr-1" />
                                Not Connected
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {integration.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={integration.connected ? 'outline' : 'default'}
                        onClick={() => toggleIntegration(integration.id)}
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified about activity
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries({
                  emailUpdates: { label: 'Email Updates', description: 'Receive emails about new features and updates' },
                  publishNotifications: { label: 'Publish Notifications', description: 'Get notified when content is published' },
                  weeklyDigest: { label: 'Weekly Digest', description: 'Receive a weekly summary of your content performance' },
                  analyticsAlerts: { label: 'Analytics Alerts', description: 'Get alerts about significant changes in performance' },
                  teamActivity: { label: 'Team Activity', description: 'Notifications about team member actions' },
                }).map(([key, { label, description }]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{label}</p>
                      <p className="text-sm text-muted-foreground">{description}</p>
                    </div>
                    <Switch
                      checked={notifications[key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Configure API keys for AI content generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="openai-key">OpenAI API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="openai-key"
                        type="password"
                        placeholder="sk-..."
                        className="font-mono"
                      />
                      <Button variant="outline">Save</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Required for AI content generation.{' '}
                      <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        Get your API key <ExternalLink className="w-3 h-3 inline" />
                      </a>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unsplash-key">Unsplash API Key (Optional)</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="unsplash-key"
                        type="password"
                        placeholder="Your Unsplash Access Key"
                        className="font-mono"
                      />
                      <Button variant="outline">Save</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      For accessing stock photos.
                    </p>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-medium mb-4">Your API Keys</h4>
                  <div className="p-4 rounded-lg border bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-sm">cf_live_xxxxxxxxxxxxx</p>
                        <p className="text-xs text-muted-foreground">Created Dec 1, 2024</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Generate New API Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
