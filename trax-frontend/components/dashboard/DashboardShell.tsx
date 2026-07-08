'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  BookOpen,
  Building2,
  Layout,
  LogOut,
  Moon,
  Newspaper,
  PlusCircle,
  Settings,
  Sun,
  User,
  UserPlus,
  Users,
} from 'lucide-react'
import TraxWordmark from '@/design-system/components/TraxWordmark'
import type { LucideIcon } from 'lucide-react'

export type DashboardTab =
  | 'overview'
  | 'articles'
  | 'editor'
  | 'subscribers'
  | 'ads'
  | 'profile'
  | 'team'
  | 'partners'

interface DashboardUser {
  name?: string
  email?: string
  avatar?: string
  role?: string
}

interface DashboardShellProps {
  user: DashboardUser | null
  activeTab: DashboardTab
  mounted: boolean
  theme?: string
  connectionError?: string | null
  loading?: boolean
  onTabChange: (tab: DashboardTab) => void
  onResetEditor?: () => void
  onToggleTheme: () => void
  onSignOut: () => void
  onRetryConnection?: () => void
  children: React.ReactNode
}

const baseNav: Array<{
  id: DashboardTab
  label: string
  icon: LucideIcon
  resetEditor?: boolean
}> = [
  { id: 'overview', label: 'Overview', icon: Layout },
  { id: 'articles', label: 'All Articles', icon: Newspaper },
  { id: 'editor', label: 'Article Editor', icon: PlusCircle, resetEditor: true },
  { id: 'subscribers', label: 'Subscribers', icon: Users },
  { id: 'ads', label: 'Ad Zones', icon: Settings },
  { id: 'profile', label: 'Profile Settings', icon: User },
]

const adminNav: Array<{ id: DashboardTab; label: string; icon: LucideIcon }> = [
  { id: 'team', label: 'Team Management', icon: UserPlus },
  { id: 'partners', label: 'Partners Manager', icon: Building2 },
]

export default function DashboardShell({
  user,
  activeTab,
  mounted,
  theme,
  connectionError,
  loading,
  onTabChange,
  onResetEditor,
  onToggleTheme,
  onSignOut,
  onRetryConnection,
  children,
}: DashboardShellProps) {
  const navItems = user?.role === 'ADMIN' ? [...baseNav, ...adminNav] : baseNav

  return (
    <div className="ds-admin font-ui min-h-screen flex flex-col md:flex-row">
      <aside className="ds-admin__sidebar">
        <div className="ds-admin__sidebar-top">
          <div className="ds-admin__brand">
            <TraxWordmark id="dashboard-logo" className="ds-admin__wordmark" />
            <span className="ds-admin__badge">Publisher</span>
          </div>

          <div className="ds-admin__user">
            <Image
              src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&fit=crop'}
              alt={user?.name ?? 'User avatar'}
              width={40}
              height={40}
              className="ds-admin__avatar"
            />
            <div className="ds-admin__user-copy">
              <p className="ds-admin__user-name">{user?.name}</p>
              <p className="ds-admin__user-email">{user?.email}</p>
            </div>
          </div>

          <nav className="ds-admin__nav" aria-label="Dashboard">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onTabChange(item.id)
                    if ('resetEditor' in item && item.resetEditor) onResetEditor?.()
                  }}
                  className={`ds-admin__nav-item${isActive ? ' is-active' : ''}`}
                >
                  <Icon className="ds-admin__nav-icon" aria-hidden />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="ds-admin__sidebar-foot">
          {mounted && (
            <button type="button" onClick={onToggleTheme} className="ds-admin__foot-btn">
              {theme === 'dark' ? <Sun className="ds-admin__nav-icon" /> : <Moon className="ds-admin__nav-icon" />}
              <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
            </button>
          )}
          <button type="button" onClick={onSignOut} className="ds-admin__foot-btn ds-admin__foot-btn--accent">
            <LogOut className="ds-admin__nav-icon" />
            Sign out
          </button>
          <Link href="/" className="ds-admin__home-link">
            <BookOpen className="ds-admin__nav-icon" aria-hidden />
            View public site
          </Link>
        </div>
      </aside>

      <main className="ds-admin__main">
        {connectionError && (
          <div className="ds-admin__alert" role="alert">
            <p className="ds-admin__alert-title">Backend API server offline</p>
            <p className="ds-admin__alert-copy">{connectionError}</p>
            {onRetryConnection && (
              <button type="button" onClick={onRetryConnection} className="ds-admin__alert-btn">
                Retry connection
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="ds-admin__loading" aria-busy="true">
            <div className="ds-admin__spinner" />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  )
}
