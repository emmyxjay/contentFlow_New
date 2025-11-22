'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'
import { Zap, Loader2, CheckCircle } from 'lucide-react'

const benefits = [
  'AI-powered content generation',
  'Publish to 6 platforms',
  'Built-in analytics',
  '14-day free trial'
]

export default function SignupPage() {
  const router = useRouter()
  const { signup, isLoading } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password) {
      setError('Please fill in all fields')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const success = await signup(name, email, password)
    if (success) {
      router.push('/onboarding')
    } else {
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Left side - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary p-12 items-center justify-center">
        <div className="max-w-md text-white">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold">ContentFlow</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Start creating amazing content today
          </h2>
          <p className="text-white/80 mb-8">
            Join thousands of creators who are scaling their content production with AI-powered tools.
          </p>
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-white/80" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md border-0 shadow-none lg:shadow-sm lg:border">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ContentFlow</span>
            </div>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Start your 14-day free trial today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              By creating an account, you agree to our{' '}
              <a href="#" className="underline">Terms of Service</a> and{' '}
              <a href="#" className="underline">Privacy Policy</a>
            </p>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Already have an account?</span>{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
