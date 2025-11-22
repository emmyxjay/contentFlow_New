'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/store/auth'
import { Zap, ArrowRight, Check } from 'lucide-react'

const niches = [
  { id: 'tech', name: 'Technology & SaaS', icon: '💻' },
  { id: 'marketing', name: 'Marketing & Growth', icon: '📈' },
  { id: 'finance', name: 'Finance & Business', icon: '💼' },
  { id: 'health', name: 'Health & Wellness', icon: '🏃' },
  { id: 'ecommerce', name: 'E-commerce & Retail', icon: '🛍️' },
  { id: 'education', name: 'Education & Training', icon: '📚' },
  { id: 'lifestyle', name: 'Lifestyle & Travel', icon: '✈️' },
  { id: 'creative', name: 'Creative & Design', icon: '🎨' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const { workspace, setWorkspace } = useAuthStore()
  const [step, setStep] = useState(1)
  const [workspaceName, setWorkspaceName] = useState(workspace?.name || '')
  const [selectedNiche, setSelectedNiche] = useState('')

  const handleContinue = () => {
    if (step === 1 && workspaceName) {
      setStep(2)
    } else if (step === 2 && selectedNiche) {
      // Update workspace with niche
      if (workspace) {
        setWorkspace({
          ...workspace,
          name: workspaceName,
          niche: selectedNiche
        })
      }
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              {step > 1 ? <Check className="w-5 h-5" /> : '1'}
            </div>
            <div className={`w-24 h-1 rounded ${step > 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
          </div>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ContentFlow</span>
            </div>
            {step === 1 ? (
              <>
                <CardTitle className="text-2xl">Name your workspace</CardTitle>
                <CardDescription>
                  This is where all your content will live. You can change this later.
                </CardDescription>
              </>
            ) : (
              <>
                <CardTitle className="text-2xl">Select your niche</CardTitle>
                <CardDescription>
                  We&apos;ll customize your content ideas and suggestions based on your industry.
                </CardDescription>
              </>
            )}
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="workspace">Workspace Name</Label>
                  <Input
                    id="workspace"
                    type="text"
                    placeholder="e.g., My Company, Marketing Team, Personal Blog"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="text-lg h-12"
                  />
                </div>
                <Button
                  onClick={handleContinue}
                  className="w-full h-12"
                  disabled={!workspaceName}
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  {niches.map((niche) => (
                    <button
                      key={niche.id}
                      onClick={() => setSelectedNiche(niche.name)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        selectedNiche === niche.name
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl mb-2 block">{niche.icon}</span>
                      <span className="font-medium">{niche.name}</span>
                    </button>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1 h-12"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="flex-1 h-12"
                    disabled={!selectedNiche}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
