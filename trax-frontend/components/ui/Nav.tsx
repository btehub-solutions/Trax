'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/design-system/components/ThemeToggle'
import TraxWordmark from '@/design-system/components/TraxWordmark'
import SiteUtilityBar from '@/design-system/components/SiteUtilityBar'
import SiteMenuOverlay from '@/components/ui/SiteMenuOverlay'
import { MotionIconButton } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import { primaryNav, isNavActive } from '@/lib/navigation'
import { articles } from '@/lib/articles'
import { BASE_URL } from '@/lib/api'

export default function Nav() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [dbArticles, setDbArticles] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!searchOpen) return
    const fetchArticlesForSearch = async () => {
      try {
        const response = await fetch(`${BASE_URL}/articles?limit=100`)
        if (response.ok) {
          const json = await response.json()
          if (json?.data) {
            setDbArticles(
              json.data.map((a: any) => ({
                id: a.id,
                slug: a.slug,
                title: a.title,
                excerpt: a.excerpt,
                category: a.category?.name || 'Ecosystem',
                date: a.publishedAt
                  ? new Date(a.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  : 'June 5, 2026',
              })),
            )
            return
          }
        }
      } catch {
        console.warn('Backend API offline, search using static articles fallback')
      }
      setDbArticles(articles)
    }
    fetchArticlesForSearch()
  }, [searchOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return

    const scrollY = window.scrollY
    const { body, documentElement } = document
    const previousBodyOverflow = body.style.overflow
    const previousBodyPosition = body.style.position
    const previousBodyTop = body.style.top
    const previousBodyWidth = body.style.width
    const previousHtmlOverflow = documentElement.style.overflow

    body.style.overflow = 'hidden'
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    documentElement.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previousBodyOverflow
      body.style.position = previousBodyPosition
      body.style.top = previousBodyTop
      body.style.width = previousBodyWidth
      documentElement.style.overflow = previousHtmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openMenu = () => {
    setSearchOpen(false)
    setMenuOpen(true)
  }

  const openSearch = () => {
    setMenuOpen(false)
    setSearchOpen(true)
  }

  const filteredArticles = dbArticles.filter((article) => {
    const q = query.toLowerCase()
    return (
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q)
    )
  })

  return (
    <>
      <motion.header
        initial={mounted ? { y: -48, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="ds-site-header"
      >
        <SiteUtilityBar
          weatherLabel="28°C"
          center={<TraxWordmark />}
          actions={
            <ThemeToggle
              id="nav-theme-toggle"
              className="ds-theme-toggle"
              style={{ color: 'var(--neutral-text-muted)' }}
            />
          }
        />

        <nav className="ds-category-bar" aria-label="Main navigation">
          <div className="container ds-category-bar__inner">
            <div className="ds-category-bar__links" role="navigation">
              {primaryNav.map((item) => {
                const active = isNavActive(pathname, item.href)
                return (
                  <span key={item.href} className="inline-flex items-center">
                    <Link
                      href={item.href}
                      id={`nav-link-${item.label.toLowerCase()}`}
                      className={`ds-category-link${active ? ' is-active' : ''}`}
                    >
                      {item.label}
                    </Link>
                    {item.dividerAfter && <span className="ds-category-divider" aria-hidden />}
                  </span>
                )
              })}
            </div>

            <div className="ds-category-bar__end">
              <MotionIconButton
                id="nav-menu"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="nav-menu-overlay"
                onClick={() => (menuOpen ? setMenuOpen(false) : openMenu())}
                className={`ds-category-bar__menu-trigger${menuOpen ? ' is-active' : ''}`}
              >
                <Icon name={menuOpen ? 'close' : 'menu'} size="sm" />
                <span>Menu</span>
              </MotionIconButton>

              <MotionIconButton
                id="nav-search"
                aria-label="Search articles"
                onClick={openSearch}
                className="ds-icon-btn"
              >
                <Icon name="search" size="sm" />
              </MotionIconButton>
            </div>
          </div>
        </nav>
      </motion.header>

      <div className="ds-site-header-spacer" aria-hidden />

      <SiteMenuOverlay
        open={menuOpen}
        mounted={mounted}
        onClose={() => setMenuOpen(false)}
        onOpenSearch={openSearch}
      />

      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[70] flex items-start justify-center px-4"
            style={{
              paddingTop: 'calc(var(--site-header-height) + 2rem)',
              backgroundColor: 'var(--surface-overlay)',
              backdropFilter: 'blur(6px)',
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSearchOpen(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: -16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--card-border)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <div className="flex items-center gap-3 p-4">
                <Icon name="search" size="sm" style={{ color: 'var(--fg-muted)', flexShrink: 0 }} />
                <input
                  id="search-input"
                  type="search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stories, startups, founders…"
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ color: 'var(--fg)', fontFamily: 'var(--font-family-ui)' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setSearchOpen(false)
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ds-menu-icon-btn"
                  aria-label="Close search"
                >
                  <Icon name="close" size="sm" />
                </button>
              </div>

              {query && (
                <div
                  className="max-h-[360px] overflow-y-auto border-t divide-y"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-alt)',
                  }}
                >
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        onClick={() => {
                          setSearchOpen(false)
                          setQuery('')
                        }}
                        className="flex flex-col gap-1 p-4 transition-colors duration-150 hover:bg-[rgba(231,4,13,0.06)]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="ds-category-pill">{article.category}</span>
                          <span className="type-meta">{article.date}</span>
                        </div>
                        <h4 className="text-sm font-bold" style={{ color: 'var(--fg)' }}>
                          {article.title}
                        </h4>
                        <p className="text-xs line-clamp-1 type-meta">{article.excerpt}</p>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm type-meta">No results for &ldquo;{query}&rdquo;</p>
                    </div>
                  )}
                </div>
              )}

              <div className="px-4 pb-4 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                <p className="type-meta text-xs">
                  Press{' '}
                  <kbd
                    className="px-1.5 py-0.5 rounded text-[10px] border"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    Esc
                  </kbd>{' '}
                  to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
