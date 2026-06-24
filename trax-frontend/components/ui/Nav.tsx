'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Search, Moon, Sun, Menu, X, ArrowRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { navLinks, articles } from '@/lib/articles'
import { BASE_URL } from '@/lib/api'
import Image from 'next/image'

export default function Nav() {
  const { theme, setTheme } = useTheme()
  const pathname            = usePathname()
  const [mounted, setMounted]       = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery]           = useState('')
  const [dbArticles, setDbArticles] = useState<any[]>([])
  const [menuOpen, setMenuOpen]     = useState(false)
  const [menuQuery, setMenuQuery]   = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [toastTimeoutId, setToastTimeoutId] = useState<any>(null)

  const [flagshipsExpanded, setFlagshipsExpanded] = useState(false)
  const [mediaExpanded, setMediaExpanded] = useState(false)
  const [platformExpanded, setPlatformExpanded] = useState(false)

  const showToast = (message: string) => {
    if (toastTimeoutId) clearTimeout(toastTimeoutId)
    setToastMessage(message)
    const id = setTimeout(() => setToastMessage(null), 2500)
    setToastTimeoutId(id)
  }

  const menuFilteredArticles = dbArticles.filter((article) => {
    const q = menuQuery.toLowerCase()
    return (
      article.title.toLowerCase().includes(q) ||
      article.excerpt.toLowerCase().includes(q) ||
      article.category.toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    if (!searchOpen && !menuOpen) return
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
  }, [searchOpen, menuOpen])

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile and menu on route change; clear query
  useEffect(() => {
    setMenuOpen(false)
    setMobileOpen(false)
    setMenuQuery('')
  }, [pathname])

  // Clear menu search query when menu closes
  useEffect(() => {
    if (!menuOpen) setMenuQuery('')
  }, [menuOpen])

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Escape key event listener
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

  return (
    <>
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b shadow-sm"
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderColor: 'rgba(200, 75, 49, 0.09)',
        }}
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
                  aria-label={`Switch to ${theme === 'dark' ? 'dark red' : 'dark'} mode`}
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

              {/* Menu Button (Desktop) */}
              <motion.button
                id="nav-desktop-menu"
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(true)}
                whileTap={{ scale: 0.9 }}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold uppercase tracking-wide transition-all duration-200 hover:bg-[rgba(200,75,49,0.1)] hover:text-[#C84B31]"
                style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
              >
                <Menu size={18} />
                <span>Menu</span>
              </motion.button>

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
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg transition-all duration-200 hover:bg-[rgba(200,75,49,0.1)]"
                style={{ color: 'var(--fg)' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
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

      {/* ── Menu Overlay (Unified Desktop & Mobile) ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg)', fontFamily: 'var(--font-dm-sans)' }}
          >
            <div className="container min-h-dvh py-8 flex flex-col justify-between">
              
              {/* Header row inside overlay */}
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'rgba(200, 75, 49, 0.09)' }}>
                <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-0.5 animate-pulse" id="menu-logo">
                  <span
                    className="text-2xl font-bold tracking-tight"
                    style={{ fontFamily: 'var(--font-oxanium)', color: '#C84B31' }}
                  >
                    Trax
                  </span>
                </Link>
                
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg text-zinc-400 hover:text-white transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Main content grid */}
              <div className="grid grid-cols-12 gap-8 my-8 md:my-12 flex-1">
                
                {/* Left Panel: Settings, Search & Socials */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 lg:border-r lg:pr-8" style={{ borderColor: 'rgba(200, 75, 49, 0.09)' }}>
                  
                  {/* Search */}
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider">
                      Search Platform
                    </p>
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl">
                      <Search size={16} className="text-zinc-500 shrink-0" />
                      <input
                        type="text"
                        value={menuQuery}
                        onChange={(e) => setMenuQuery(e.target.value)}
                        placeholder="Search articles, topics..."
                        className="bg-transparent outline-none text-base md:text-sm text-white w-full placeholder-zinc-500"
                      />
                      {menuQuery && (
                        <button onClick={() => setMenuQuery('')} className="text-zinc-500 hover:text-white text-xs">
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Inline Search Results inside Menu */}
                    {menuQuery && (
                      <div className="max-h-[200px] overflow-y-auto mt-2 divide-y divide-zinc-800 bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-2 flex flex-col gap-1.5">
                        {menuFilteredArticles.length > 0 ? (
                          menuFilteredArticles.slice(0, 5).map((article) => (
                            <Link
                              key={article.id}
                              href={`/articles/${article.slug}`}
                              onClick={() => {
                                setMenuOpen(false)
                                setMenuQuery('')
                              }}
                              className="block p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                            >
                              <p className="text-[10px] font-semibold text-[#C84B31] uppercase tracking-wider">{article.category}</p>
                              <h5 className="text-xs font-bold text-white line-clamp-1">{article.title}</h5>
                            </Link>
                          ))
                        ) : (
                          <p className="text-[10px] text-zinc-500 p-2 text-center">No results found.</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Theme Toggle */}
                  <div className="flex flex-col gap-2">
                    <p className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider">
                      Display Theme
                    </p>
                    <div className="flex items-center gap-2 p-1 bg-zinc-900 border border-zinc-800 rounded-xl w-fit">
                      <button
                        onClick={() => setTheme('light')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          theme === 'light' ? 'bg-[#e10600] text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Sun size={14} />
                        Dark Red
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          theme === 'dark' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Moon size={14} />
                        Dark
                      </button>
                    </div>
                  </div>

                  {/* Social Follow */}
                  <div className="flex flex-col gap-2.5 mt-auto">
                    <p className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider">
                      Follow Us
                    </p>
                    <div className="flex items-center gap-2.5">
                      {[
                        { label: 'X / Twitter', svg: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg> },
                        { label: 'LinkedIn', svg: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg> },
                        { label: 'Facebook', svg: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> },
                        { label: 'Instagram', svg: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
                        { label: 'YouTube', svg: <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.524 3.545 12 3.545 12 3.545s-7.525 0-9.388.51a3.002 3.002 0 0 0-2.11 2.108C0 8.029 0 12 0 12s0 3.972.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.863.51 9.388.51 9.388.51s7.524 0 9.388-.51a3.003 3.003 0 0 0 2.11-2.108C24 15.972 24 12 24 12s0-3.971-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" clipRule="evenodd" /></svg> },
                      ].map(({ label, svg }) => (
                        <motion.button
                          key={label}
                          onClick={() => showToast(`${label} page coming soon!`)}
                          aria-label={`Follow us on ${label}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-zinc-900 hover:bg-[#C84B31]/10 border border-zinc-800 hover:border-[#C84B31]/30 rounded-xl text-zinc-400 hover:text-[#C84B31] transition-all flex items-center justify-center w-8 h-8"
                        >
                          {svg}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Center Panel: Category Links */}
                <div className="col-span-12 md:col-span-8 lg:col-span-6">

                  {/* ── Mobile Accordion (hidden on sm+) ── */}
                  <div className="flex flex-col sm:hidden divide-y" style={{ borderColor: 'rgba(200, 75, 49, 0.09)' }}>
                    {[
                      {
                        label: 'Flagships & Beats',
                        expanded: flagshipsExpanded,
                        toggle: () => setFlagshipsExpanded((v) => !v),
                        links: [
                          { label: 'Funding Watch',       href: '/funding'   },
                          { label: 'Startups Directory',  href: '/startups'  },
                          { label: 'Tech Tools',          href: '/tools'     },
                          { label: 'Builder Spotlight',   href: '/people'    },
                          { label: 'Ecosystem Radar',     href: '/ecosystem' },
                          { label: 'Policy & Regulation', href: '/policy'    },
                        ],
                      },
                      {
                        label: 'Media Channel',
                        expanded: mediaExpanded,
                        toggle: () => setMediaExpanded((v) => !v),
                        links: [
                          { label: 'Tech News',         href: '/news'    },
                          { label: 'Podcast Beat',      href: '/podcast' },
                          { label: 'Ecosystem Events',  href: '/events'  },
                          { label: 'Startup Map',       href: '/map'     },
                        ],
                      },
                      {
                        label: 'Platform',
                        expanded: platformExpanded,
                        toggle: () => setPlatformExpanded((v) => !v),
                        links: [
                          { label: 'About Trax',          href: '/about'      },
                          { label: 'Advertise with Us',   href: '/advertise'  },
                          { label: 'Meet the Team',       href: '/team'       },
                          { label: 'Join the Team',       href: '/careers'    },
                          { label: 'Publisher Dashboard', href: '/dashboard'  },
                          { label: 'Subscription Centre', href: '/newsletter' },
                        ],
                      },
                    ].map(({ label, expanded, toggle, links }) => (
                      <div key={label} className="border-zinc-800">
                        {/* Accordion header */}
                        <button
                          onClick={toggle}
                          className="w-full flex items-center justify-between py-3.5 text-left"
                          aria-expanded={expanded}
                        >
                          <span className="text-zinc-400 font-extrabold uppercase text-[10px] tracking-wider">
                            {label}
                          </span>
                          <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="text-zinc-500"
                          >
                            <ChevronDown size={15} />
                          </motion.span>
                        </button>

                        {/* Accordion body */}
                        <AnimatePresence initial={false}>
                          {expanded && (
                            <motion.ul
                              key="content"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden flex flex-col gap-3 pb-4"
                            >
                              {links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm font-bold text-zinc-300 hover:text-[#C84B31] transition-colors pl-1"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  {/* ── Desktop 3-column grid (hidden below sm) ── */}
                  <div className="hidden sm:grid grid-cols-3 gap-8">

                    {/* Flagships Column */}
                    <div>
                      <h4 className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider mb-4">
                        Flagships &amp; Beats
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          { label: 'Funding Watch',       href: '/funding'   },
                          { label: 'Startups Directory',  href: '/startups'  },
                          { label: 'Tech Tools',          href: '/tools'     },
                          { label: 'Builder Spotlight',   href: '/people'    },
                          { label: 'Ecosystem Radar',     href: '/ecosystem' },
                          { label: 'Policy & Regulation', href: '/policy'    },
                        ].map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className="text-sm font-bold text-zinc-300 hover:text-[#C84B31] transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Media Channel Column */}
                    <div>
                      <h4 className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider mb-4">
                        Media Channel
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          { label: 'Tech News',        href: '/news'    },
                          { label: 'Podcast Beat',     href: '/podcast' },
                          { label: 'Ecosystem Events', href: '/events'  },
                          { label: 'Startup Map',      href: '/map'     },
                        ].map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className="text-sm font-bold text-zinc-300 hover:text-[#C84B31] transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Platform Column */}
                    <div>
                      <h4 className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider mb-4">
                        Platform
                      </h4>
                      <ul className="flex flex-col gap-3">
                        {[
                          { label: 'About Trax',          href: '/about'      },
                          { label: 'Advertise with Us',   href: '/advertise'  },
                          { label: 'Meet the Team',       href: '/team'       },
                          { label: 'Join the Team',       href: '/careers'    },
                          { label: 'Publisher Dashboard', href: '/dashboard'  },
                          { label: 'Subscription Centre', href: '/newsletter' },
                        ].map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={() => setMenuOpen(false)}
                              className="text-sm font-bold text-zinc-300 hover:text-[#C84B31] transition-colors"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                {/* Right Panel: Newsletter Banner Promo */}
                <div className="col-span-12 md:col-span-4 lg:col-span-3 flex flex-col">
                  <p className="text-zinc-500 font-extrabold uppercase text-[10px] tracking-wider mb-4">
                    Featured Dispatch
                  </p>
                  <Link
                    href="/newsletter"
                    onClick={() => setMenuOpen(false)}
                    className="group block relative overflow-hidden rounded-2xl border border-zinc-800 transition-all duration-300 hover:border-[#C84B31]/40"
                  >
                    <Image
                      src="/images/trax_newsletter_card.png"
                      alt="Trax Newsletter Subscription"
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </Link>
                </div>

              </div>

              {/* Bottom Row */}
              <div className="border-t pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500" style={{ borderColor: 'rgba(200, 75, 49, 0.09)' }}>
                <p>© {new Date().getFullYear()} Trax Media Platform. All rights reserved.</p>
                <div className="flex items-center gap-4">
                  <Link href="/privacy" onClick={() => setMenuOpen(false)} className="hover:text-white">Privacy Policy</Link>
                  <span>•</span>
                  <Link href="/terms" onClick={() => setMenuOpen(false)} className="hover:text-white">Terms of Service</Link>
                </div>
              </div>

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

      {/* ── Coming Soon Toast ── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0,  scale: 1   }}
            exit={{    opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[70] px-4 py-3 rounded-xl border text-sm font-semibold flex items-center gap-2.5 shadow-2xl backdrop-blur-md"
            style={{
              backgroundColor: 'rgba(20,20,20,0.85)',
              borderColor:     'rgba(255,255,255,0.08)',
              color:           '#F4F4F5',
              fontFamily:      'var(--font-dm-sans)',
            }}
          >
            <span style={{ color: '#C84B31' }}>✦</span>
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
