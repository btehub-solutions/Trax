'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Search, Moon, Sun, Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, articles } from '@/lib/articles'
import { BASE_URL } from '@/lib/api'

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const pathname            = usePathname()
  const [mounted, setMounted]       = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]           = useState('')
  const [dbArticles, setDbArticles] = useState<any[]>([])

  useEffect(() => {
    if (!searchOpen) return
    const fetchArticlesForSearch = async () => {
      try {
        const response = await fetch(`${BASE_URL}/articles?limit=100`)
        if (response.ok) {
          const json = await response.json()
          if (json && json.data) {
            setDbArticles(json.data.map((a: any) => ({
              id: a.id,
              slug: a.slug,
              title: a.title,
              excerpt: a.excerpt,
              category: a.category?.name || 'Ecosystem',
              date: a.publishedAt
                ? new Date(a.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                : 'June 5, 2026',
            })))
            return
          }
        }
      } catch (err) {
        console.warn('Backend API offline, search using static articles fallback:', err)
      }
      setDbArticles(articles)
    }
    fetchArticlesForSearch()
  }, [searchOpen])

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-xl border-b shadow-sm'
            : 'border-b border-transparent'
        }`}
        style={{ backgroundColor: 'var(--nav-bg)' } as React.CSSProperties}
        aria-label="Main navigation"
      >
        <div className="container">
          <div className="flex items-center justify-between h-16">

            {/* ── Logo ── */}
            <Link href="/" className="flex items-center gap-0.5 shrink-0" id="nav-logo">
              <span
                className="text-[22px] font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-oxanium)', color: '#C84B31' }}
              >
                Trax
              </span>
            </Link>

            {/* ── Desktop Nav Links (center) ── */}
            <nav className="hidden md:flex items-center gap-1" role="navigation">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    id={`nav-link-${link.label.toLowerCase()}`}
                    className="relative px-4 py-2 rounded-lg text-[12px] font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-[#C84B31]"
                    style={{
                      color:      active ? '#C84B31' : 'var(--fg-muted)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: 'rgba(200, 75, 49, 0.08)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Right Icons ── */}
            <div className="flex items-center gap-2">

              {/* Search */}
              <motion.button
                id="nav-search"
                aria-label="Search articles"
                onClick={() => setSearchOpen(true)}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-[rgba(200,75,49,0.1)] hover:text-[#C84B31]"
                style={{ color: 'var(--fg-muted)' }}
              >
                <Search size={19} />
              </motion.button>

              {/* Divider */}
              <div className="hidden md:block w-px h-4" style={{ backgroundColor: 'var(--border)' }} />

              {/* Theme Toggle */}
              {mounted && (
                <motion.button
                  id="nav-theme-toggle"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg transition-all duration-200 hover:bg-[rgba(200,75,49,0.1)] hover:text-[#C84B31]"
                  style={{ color: 'var(--fg-muted)' }}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                      <motion.span
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0,   opacity: 1 }}
                        exit={{ rotate: 90,     opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        <Sun size={19} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="moon"
                        initial={{ rotate: 90,  opacity: 0 }}
                        animate={{ rotate: 0,   opacity: 1 }}
                        exit={{ rotate: -90,    opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="block"
                      >
                        <Moon size={19} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              {/* Subscribe CTA (desktop) */}
              <Link
                href="/newsletter"
                id="nav-subscribe"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all duration-200 hover:opacity-90 shadow-sm"
                style={{
                  backgroundImage: 'var(--accent-gradient)',
                  fontFamily:      'var(--font-dm-sans)',
                }}
              >
                Subscribe
                <ArrowRight size={12} />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                id="nav-mobile-menu"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg transition-all duration-200 hover:bg-[rgba(200,75,49,0.1)]"
                style={{ color: 'var(--fg)' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="block">
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b"
            style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-base font-medium tracking-wide uppercase transition-colors hover:text-[#C84B31] flex items-center justify-between"
                    style={{
                      color:      active ? '#C84B31' : 'var(--fg-muted)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    {link.label}
                    {active && <ArrowRight size={14} color="#C84B31" />}
                  </Link>
                )
              })}
              <div className="h-px" style={{ backgroundColor: 'var(--border)' }} />
              <Link
                href="/newsletter"
                onClick={() => setMobileOpen(false)}
                id="nav-mobile-subscribe"
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white shadow-sm"
                style={{ backgroundImage: 'var(--accent-gradient)', fontFamily: 'var(--font-dm-sans)' }}
              >
                Subscribe Free <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search Overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-28 px-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: -16 }}
              animate={{ scale: 1,    opacity: 1, y: 0    }}
              exit={{ scale: 0.96,    opacity: 0, y: -16  }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor:     'var(--card-border)',
                boxShadow:       'var(--shadow-lg)',
              }}
            >
              <div className="flex items-center gap-3 p-4">
                <Search size={18} style={{ color: 'var(--fg-muted)', flexShrink: 0 }} />
                <input
                  id="search-input"
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search AI stories, startups, founders…"
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ color: 'var(--fg)', fontFamily: 'var(--font-dm-sans)' }}
                  onKeyDown={(e) => { if (e.key === 'Escape') setSearchOpen(false) }}
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="p-1 rounded-lg transition-colors hover:text-[#C84B31]"
                  style={{ color: 'var(--fg-muted)' }}
                  aria-label="Close search"
                >
                  <X size={16} />
                </button>
              </div>

              {/* ── Search Results List ── */}
              {query && (
                <div 
                  className="max-h-[360px] overflow-y-auto border-t divide-y"
                  style={{ 
                    borderColor: 'var(--border)', 
                    backgroundColor: 'var(--bg-alt)' 
                  }}
                >
                  {dbArticles.filter((article) => {
                    const q = query.toLowerCase()
                    return (
                      article.title.toLowerCase().includes(q) ||
                      article.excerpt.toLowerCase().includes(q) ||
                      article.category.toLowerCase().includes(q)
                    )
                  }).length > 0 ? (
                    dbArticles.filter((article) => {
                      const q = query.toLowerCase()
                      return (
                        article.title.toLowerCase().includes(q) ||
                        article.excerpt.toLowerCase().includes(q) ||
                        article.category.toLowerCase().includes(q)
                      )
                    }).map((article) => (
                      <Link
                        key={article.id}
                        href={`/articles/${article.slug}`}
                        onClick={() => {
                          setSearchOpen(false)
                          setQuery('')
                        }}
                        className="flex flex-col gap-1 p-4 transition-colors duration-150 hover:bg-[rgba(200,75,49,0.04)]"
                      >
                        <div className="flex items-center gap-2">
                          <span 
                            className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider"
                            style={{ 
                              backgroundColor: 'rgba(200,75,49,0.15)',
                              color: '#C84B31' 
                            }}
                          >
                            {article.category}
                          </span>
                          <span className="text-[11px]" style={{ color: 'var(--fg-subtle)' }}>
                            {article.date}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold transition-colors" style={{ color: 'var(--fg)' }}>
                          {article.title}
                        </h4>
                        <p className="text-xs line-clamp-1" style={{ color: 'var(--fg-muted)' }}>
                          {article.excerpt}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm" style={{ color: 'var(--fg-subtle)' }}>
                        No results found for &ldquo;<strong style={{ color: 'var(--fg)' }}>{query}</strong>&rdquo;
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--fg-muted)' }}>
                        Try searching for other tech terms like &quot;funding&quot; or &quot;LLM&quot;.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="px-4 pb-4 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                <p className="text-xs" style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}>
                  Press <kbd className="px-1.5 py-0.5 rounded text-[10px] border" style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}>Esc</kbd> to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
