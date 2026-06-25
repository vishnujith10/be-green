"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/utils/supabase/client'
import { saveUser } from '@/lib/user'
import { Plus, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const trimmedUsername = username.trim()
    if (trimmedUsername.length < 3) {
      setError('Username must be at least 3 characters.')
      setLoading(false)
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      setLoading(false)
      return
    }

    try {
      if (isSignUp) {
        const { data: existing } = await supabaseBrowser
          .from('users')
          .select('id')
          .eq('username', trimmedUsername)
          .maybeSingle()

        if (existing) {
          throw new Error('Username already taken. Please choose a different one.')
        }

        const { data: newUser, error: insertError } = await supabaseBrowser
          .from('users')
          .insert([{ username: trimmedUsername, password }])
          .select('id, username')
          .single()

        if (insertError) throw insertError

        saveUser({ id: newUser.id, username: newUser.username })
        router.push('/')
      } else {
        const { data: foundUser, error: selectError } = await supabaseBrowser
          .from('users')
          .select('id, username, password')
          .eq('username', trimmedUsername)
          .maybeSingle()

        if (selectError) throw selectError

        if (!foundUser) {
          throw new Error('No account found with this username. Please sign up first!')
        }

        if (foundUser.password !== password) {
          throw new Error('Incorrect password. Please try again.')
        }

        saveUser({ id: foundUser.id, username: foundUser.username })
        router.push('/')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-foreground">
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>
        {error && (
          <p className="text-sm text-red-600 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Choose a username"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-foreground/50 hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-full transition-colors disabled:opacity-50"
          >
            {isSignUp ? (
              <>
                <Plus className="w-5 h-5" />
                {loading ? 'Creating account...' : 'Sign Up'}
              </>
            ) : (
              <>
                <ArrowRight className="w-5 h-5" />
                {loading ? 'Signing in...' : 'Sign In'}
              </>
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-foreground/70">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(null); setShowPassword(false) }}
            className="ml-1 text-primary font-medium underline"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </div>
    </main>
  )
}
