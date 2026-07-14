export type AppUser = {
  id: string
  username: string
  role?: 'admin' | 'user'
}

// 7 days in milliseconds
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

export function getStoredUser(): AppUser | null {
  if (typeof window === 'undefined') return null

  const stored = sessionStorage.getItem('user')
  if (!stored) return null

  try {
    const data = JSON.parse(stored) as AppUser & { _savedAt?: number }
    if (!data._savedAt) {
      // No timestamp – treat as expired
      clearUser()
      return null
    }
    if (Date.now() - data._savedAt > SESSION_TTL_MS) {
      // Session expired
      clearUser()
      return null
    }
    // Strip internal field before returning
    const { _savedAt, ...user } = data
    return user as AppUser
  } catch {
    return null
  }
}

export function saveUser(user: AppUser) {
  const payload = {
    ...user,
    _savedAt: Date.now(),
  }
  sessionStorage.setItem('user', JSON.stringify(payload))
  window.dispatchEvent(new Event('user-changed'))
}

export function clearUser() {
  sessionStorage.removeItem('user')
  window.dispatchEvent(new Event('user-changed'))
}

export function isAdminUser(): boolean {
  const user = getStoredUser()
  return user?.role === 'admin'
}
