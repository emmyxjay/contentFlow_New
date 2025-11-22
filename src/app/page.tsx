'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Sparkles,
  Calendar,
  BarChart3,
  Globe,
  Zap,
  PenTool,
  Image,
  Send,
  TrendingUp,
  Users,
  CheckCircle,
  ArrowRight,
  Play,
  Star
} from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'AI Content Ideation',
    description: 'Get trending topics, keywords, and content ideas tailored to your niche with search intent scoring.'
  },
  {
    icon: PenTool,
    title: 'Smart Content Generation',
    description: 'Generate SEO-optimized blogs, social posts, captions, and emails with customizable tone and style.'
  },
  {
    icon: Image,
    title: 'Visual Assistant',
    description: 'Create AI-generated images or access royalty-free stock photos with brand template presets.'
  },
  {
    icon: Calendar,
    title: 'Publishing & Scheduling',
    description: 'Bulk schedule and auto-publish to WordPress, LinkedIn, X, Instagram, Facebook, and Medium.'
  },
  {
    icon: BarChart3,
    title: 'Performance Analytics',
    description: 'Track clicks, impressions, engagement, and ranking changes to optimize your content strategy.'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work together with your team on content creation with approval workflows and shared workspaces.'
  }
]

const workflow = [
  { step: 1, title: 'Enter Your Topic', description: 'Start with a topic or niche you want to create content about' },
  { step: 2, title: 'Get AI Ideas', description: 'Receive trending ideas, keywords, and optimized headlines' },
  { step: 3, title: 'Generate Content', description: 'Create polished content with AI assistance and direct editing' },
  { step: 4, title: 'Schedule & Publish', description: 'Distribute across all your platforms with one click' },
  { step: 5, title: 'Track Performance', description: 'Monitor engagement and optimize based on real data' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechFlow Inc',
    quote: 'ContentFlow has revolutionized our content workflow. We went from creating 4 pieces a week to 20, all while maintaining quality.',
    avatar: 'SC'
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder',
    company: 'GrowthLab',
    quote: 'The AI ideation is incredibly accurate. It feels like having a senior content strategist on the team 24/7.',
    avatar: 'MJ'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Content Lead',
    company: 'StartupScale',
    quote: 'Finally, a tool that handles everything from ideation to distribution. Our engagement is up 340% since we started using it.',
    avatar: 'ER'
  }
]

const platforms = [
  { name: 'WordPress', color: 'bg-blue-500' },
  { name: 'LinkedIn', color: 'bg-blue-600' },
  { name: 'X (Twitter)', color: 'bg-gray-900' },
  { name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { name: 'Facebook', color: 'bg-blue-700' },
  { name: 'Medium', color: 'bg-gray-800' }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">ContentFlow</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
              <a href="#workflow" className="text-sm text-muted-foreground hover:text-foreground transition">How it Works</a>
              <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition">Pricing</a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Get Started Free</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Content Platform
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            From Idea to Publication
            <br />
            <span className="text-primary">In One Seamless Workflow</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Create, schedule, and distribute content across multiple platforms with AI assistance.
            Stop juggling tools — manage your entire content operation in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Start Creating Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Play className="w-4 h-4 mr-2" />
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            No credit card required. 14-day free trial.
          </p>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <div className="max-w-6xl mx-auto mt-16 relative">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8 border shadow-2xl">
            <div className="bg-background rounded-lg shadow-lg overflow-hidden">
              <div className="bg-muted px-4 py-3 flex items-center space-x-2 border-b">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="p-6 bg-gradient-to-br from-background to-muted/30">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-4">
                    <div className="h-8 bg-muted rounded animate-pulse" />
                    <div className="h-6 bg-muted/60 rounded w-3/4 animate-pulse" />
                    <div className="h-6 bg-muted/60 rounded w-2/3 animate-pulse" />
                    <div className="h-6 bg-muted/60 rounded w-4/5 animate-pulse" />
                  </div>
                  <div className="col-span-2 space-y-4">
                    <div className="h-40 bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-primary/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-muted/40 rounded-lg" />
                      <div className="h-24 bg-muted/40 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-y bg-muted/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-medium text-muted-foreground mb-8">
            PUBLISH TO ALL YOUR FAVORITE PLATFORMS
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className="flex items-center space-x-2 px-4 py-2 bg-background rounded-full border shadow-sm"
              >
                <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Scale Content
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A complete suite of tools designed to help you create more content, faster,
              without sacrificing quality or burning out.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple 5-Step Content Workflow
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Go from a blank page to published content in minutes, not hours.
            </p>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {workflow.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                {index < workflow.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by Content Teams Everywhere
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="border-2">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade when you&apos;re ready. No hidden fees.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For individuals getting started</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['5 AI-generated posts/month', '1 connected platform', 'Basic analytics', 'Email support'].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant="outline">Get Started</Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="border-2 border-primary relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge>Most Popular</Badge>
              </div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For growing content teams</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['Unlimited AI generation', 'All 6 platforms', 'Advanced analytics', 'Content calendar', 'Team collaboration (3 users)', 'Priority support'].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6">Start Free Trial</Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large organizations</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {['Everything in Pro', 'Unlimited users', 'Custom integrations', 'API access', 'Dedicated account manager', 'SLA guarantee'].map((feature) => (
                    <li key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-6" variant="outline">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Content Workflow?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of content creators who are saving hours every week with ContentFlow.
          </p>
          <Link href="/signup">
            <Button size="lg">
              Start Your Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ContentFlow</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered content creation and distribution platform for modern teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ContentFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
