'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User, Workspace } from '@/types'

interface AuthState {
  user: User | null
  workspace: Workspace | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  setWorkspace: (workspace: Workspace) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      workspace: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string) => {
        set({ isLoading: true })

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))

        // Demo user for prototype
        const user: User = {
          id: 'user-1',
          email,
          name: email.split('@')[0],
          role: 'admin',
          createdAt: new Date().toISOString(),
          workspaceId: 'workspace-1'
        }

        const workspace: Workspace = {
          id: 'workspace-1',
          name: 'My Workspace',
          niche: 'Technology & SaaS',
          description: 'Content for tech startups',
          createdAt: new Date().toISOString(),
          ownerId: user.id
        }

        set({ user, workspace, isAuthenticated: true, isLoading: false })
        return true
      },

      signup: async (name: string, email: string, _password: string) => {
        set({ isLoading: true })

        await new Promise(resolve => setTimeout(resolve, 500))

        const user: User = {
          id: 'user-' + Date.now(),
          email,
          name,
          role: 'admin',
          createdAt: new Date().toISOString(),
          workspaceId: 'workspace-' + Date.now()
        }

        const workspace: Workspace = {
          id: user.workspaceId,
          name: `${name}'s Workspace`,
          niche: '',
          createdAt: new Date().toISOString(),
          ownerId: user.id
        }

        set({ user, workspace, isAuthenticated: true, isLoading: false })
        return true
      },

      logout: () => {
        set({ user: null, workspace: null, isAuthenticated: false })
      },

      setWorkspace: (workspace: Workspace) => {
        set({ workspace })
      }
    }),
    {
      name: 'contentflow-auth'
    }
  )
)
