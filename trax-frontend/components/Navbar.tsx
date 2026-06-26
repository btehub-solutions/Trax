'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Search, Sun, Moon, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',        href: '/'           },
  { label: 'Startups', href: '/startups'   },
  { label: 'Funding',     href: '/funding'    },
  { label: 'Tools',       href: '/tools'      },
  { label: 'People',      href: '/people'     },
  { label: 'Policy',      href: '/policy'     },
]

// ── Framer Motion variants ───────────────────────────────────────────────────
const drawerVariants = {
  hidden: {
    opacity: 0,
    y:       -8,
    transition: { duration: 0.2, ease: 'easeIn' as const },
  },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const linkItemVariants = {
  hidden:   { opacity: 0, x: -12 },
  visible:  (i: number) => ({
    opacity: 1,
    x:       0,
    transition: { delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

const iconToggleVariants = {
  initial:  { rotate: -30, opacity: 0, scale: 0.7 },
  animate:  { rotate: 0,   opacity: 1, scale: 1    },
  exit:     { rotate:  30, opacity: 0, scale: 0.7  },
}

// ── Component ────────────────────────────────────────────────────────────────
export default function Navbar() {
  const pathname             = usePathname()
  const { theme, setTheme }  = useTheme()

  const [mounted,    setMounted]    = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query,      setQuery]      = useState('')

  // Hydration guard for next-themes
  useEffect(() => { setMounted(true) }, [])

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Close search on Escape
  useEffect(() => {
    if (!searchOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSearchOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [searchOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <motion.header
        role="banner"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(180%)' : 'none',
          borderBottom:    scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow:       scrolled ? 'var(--shadow-sm)' : 'none',
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 gap-6">

            {/* ── Logo ──────────────────────────────────────────────────── */}
            <Link
              href="/"
              id="navbar-logo"
              aria-label="Trax home"
              className="flex items-center shrink-0 select-none"
            >
              <span
                className="text-[22px] font-extrabold leading-none tracking-tight"
                style={{ fontFamily: 'var(--font-oxanium)', color: '#C84B31' }}
              >
                Trax
              </span>
            </Link>

            {/* ── Desktop links (center) ────────────────────────────────── */}
            <nav
              className="hidden md:flex items-center gap-1 flex-1 justify-center"
              role="navigation"
              aria-label="Primary navigation"
            >
              {NAV_LINKS.map((link) => {
                const active = isActive(link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    id={`navbar-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="relative flex flex-col items-center px-3.5 py-2 rounded-lg text-[13px] font-medium tracking-wide transition-colors duration-200 hover:text-[#C84B31]"
                    style={{
                      color:      active ? '#C84B31' : 'var(--fg-muted)',
                      fontFamily: 'var(--font-dm-sans)',
                    }}
                  >
                    {link.label}

                    {/* Active underline: spring-animated shared layout */}
                    {active && (
                      <motion.span
                        layoutId="navbar-active-indicator"
                        className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full"
                        style={{ backgroundColor: '#C84B31' }}
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* ── Right controls ────────────────────────────────────────── */}
            <div className="flex items-center gap-1 shrink-0">

              {/* Search button */}
              <motion.button
                id="navbar-search"
                aria-label="Open search"
                onClick={() => setSearchOpen(true)}
                whileHover={{ backgroundColor: 'rgba(200,75,49,0.08)' }}
                whileTap={{ scale: 0.88 }}
                className="p-2 rounded-lg transition-colors duration-200 hover:text-[#C84B31]"
                style={{ color: 'var(--fg-muted)' }}
              >
                <Search size={19} strokeWidth={1.9} />
              </motion.button>

              {/* X / Twitter Link in main Menu Bar */}
              <motion.a
                id="navbar-twitter"
                href="https://x.com/traxnewsng?s=11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on X / Twitter"
                whileTap={{ scale: 0.88 }}
                className="hidden sm:flex items-center justify-center p-2 rounded-lg transition-colors duration-200 hover:text-[#C84B31] hover:bg-[rgba(200,75,49,0.08)]"
                style={{ color: 'var(--fg-muted)' }}
              >
                <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>

              {/* Separator */}
              <div className="hidden md:block w-px h-4 mx-1" style={{ backgroundColor: 'var(--border)' }} />

              {/* Theme toggle */}
              {mounted && (
                <motion.button
                  id="navbar-theme-toggle"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  whileHover={{ backgroundColor: 'rgba(200,75,49,0.08)' }}
                  whileTap={{ scale: 0.88 }}
                  className="p-2 rounded-lg transition-colors duration-200 hover:text-[#C84B31]"
                  style={{ color: 'var(--fg-muted)' }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                      <motion.span
                        key="sun"
                        variants={iconToggleVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.18 }}
                        className="block"
                      >
                        <Sun size={19} strokeWidth={1.9} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="moon"
                        variants={iconToggleVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.18 }}
                        className="block"
                      >
                        <Moon size={19} strokeWidth={1.9} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )}

              {/* Hamburger (mobile only) */}
              <motion.button
                id="navbar-menu-toggle"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="navbar-mobile-drawer"
                onClick={() => setMenuOpen((o) => !o)}
                whileTap={{ scale: 0.88 }}
                className="md:hidden p-2 rounded-lg transition-colors duration-200 hover:text-[#C84B31]"
                style={{ color: 'var(--fg)' }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="x"
                      variants={iconToggleVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <X size={21} strokeWidth={1.9} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      variants={iconToggleVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.15 }}
                      className="block"
                    >
                      <Menu size={21} strokeWidth={1.9} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="navbar-mobile-drawer"
            role="dialog"
            aria-label="Mobile navigation"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed top-16 left-0 right-0 z-40 md:hidden border-b overflow-hidden"
            style={{
              backgroundColor:      'var(--nav-bg)',
              backdropFilter:       'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              borderColor:          'var(--border)',
              boxShadow:            'var(--shadow-md)',
            }}
          >
            <nav className="container py-3 grid grid-cols-2 gap-1">
              {NAV_LINKS.map((link, i) => {
                const active = isActive(link.href)
                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={linkItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-150"
                      style={{
                        color:           active ? '#C84B31' : 'var(--fg-muted)',
                        backgroundColor: active ? 'rgba(200,75,49,0.07)' : 'transparent',
                        fontFamily:      'var(--font-dm-sans)',
                      }}
                    >
                      {link.label}
                      {active && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: '#C84B31' }}
                        />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search Overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[60] flex items-start justify-center px-4"
            style={{ paddingTop: '96px', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false) }}
          >
            <motion.div
              initial={{ y: -16, opacity: 0, scale: 0.97 }}
              animate={{ y: 0,   opacity: 1, scale: 1    }}
              exit={{ y: -12,    opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
              className="w-full max-w-xl rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor:     'var(--card-border)',
                boxShadow:       'var(--shadow-lg)',
              }}
            >
              {/* Input row */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <Search size={17} style={{ color: 'var(--fg-muted)', flexShrink: 0 }} />
                <input
                  id="navbar-search-input"
                  type="search"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stories, founders, startups…"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--fg)', fontFamily: 'var(--font-dm-sans)' }}
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="transition-colors hover:text-[#C84B31]"
                    style={{ color: 'var(--fg-subtle)' }}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Footer hint */}
              <div
                className="flex items-center justify-between px-4 py-2.5 border-t text-xs"
                style={{ borderColor: 'var(--border)', color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}
              >
                <span>Type to search Trax</span>
                <kbd
                  className="px-1.5 py-0.5 rounded border text-[10px]"
                  style={{ borderColor: 'var(--border)', color: 'var(--fg-muted)' }}
                >
                  Esc
                </kbd>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
