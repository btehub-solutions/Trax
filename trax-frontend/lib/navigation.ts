/**
 * Trax navigation — single source of truth for header, mobile drawer, masthead, footer.
 */

export interface NavItem {
  /** Red bar + mobile drawer label */
  label: string
  href: string
  /** Visual separator after this item (newsflash: after Latest) */
  dividerAfter?: boolean
  /** Section masthead marker + stroke watermark */
  markerTitle: string
  /** Masthead fallback when no lead article */
  fallbackTitle: string
  categorySlug?: string
  categorySlugs?: string[]
}

/** Primary site sections — red category bar & mobile drawer */
export const primaryNav: NavItem[] = [
  {
    label: 'Latest',
    href: '/',
    dividerAfter: true,
    markerTitle: 'Latest News',
    fallbackTitle: "Tracking the builders rewriting Ogun's future",
  },
  {
    label: 'News',
    href: '/news',
    markerTitle: 'News',
    categorySlug: 'news',
    fallbackTitle: "The latest from Ogun State's tech corridor",
  },
  {
    label: 'Startups',
    href: '/startups',
    markerTitle: 'Startups',
    categorySlug: 'startups',
    fallbackTitle: 'Startups building from Ogun State',
  },
  {
    label: 'Funding',
    href: '/funding',
    markerTitle: 'Funding',
    categorySlug: 'funding',
    fallbackTitle: 'Capital flows shaping the region',
  },
  {
    label: 'People',
    href: '/people',
    markerTitle: 'People',
    categorySlugs: ['people', 'profiles', 'interview'],
    fallbackTitle: 'Founders and operators to watch',
  },
  {
    label: 'Ecosystem',
    href: '/ecosystem',
    markerTitle: 'Ecosystem',
    categorySlugs: ['ecosystem', 'policy'],
    fallbackTitle: 'Policy, hubs, and community signals across the corridor',
  },
  {
    label: 'Events',
    href: '/events',
    markerTitle: 'Events',
    categorySlug: 'events',
    fallbackTitle: "What's happening across the corridor",
  },
  {
    label: 'Press',
    href: '/press',
    markerTitle: 'Press',
    fallbackTitle: 'Partner stories and sponsored dispatches',
  },
]

/** Secondary links — mobile drawer footer only (not in red bar) */
export const secondaryNav: NavItem[] = [
  {
    label: 'Newsletter',
    href: '/newsletter',
    markerTitle: 'Newsletter',
    fallbackTitle: 'Subscribe to Trax dispatches',
  },
  {
    label: 'About',
    href: '/about',
    markerTitle: 'About',
    fallbackTitle: 'About Trax',
  },
]

export interface MenuLink {
  label: string
  href: string
}

export interface MenuGroup {
  title: string
  links: MenuLink[]
}

/** Full site menu overlay — Flagships, Media, Platform (not in red bar) */
export const menuGroups: MenuGroup[] = [
  {
    title: 'Flagships & Beats',
    links: [
      { label: 'Funding Watch', href: '/funding' },
      { label: 'Startups Directory', href: '/startups' },
      { label: 'Tech Tools', href: '/tools' },
      { label: 'Builder Spotlight', href: '/people' },
      { label: 'Ecosystem Radar', href: '/ecosystem' },
      { label: 'Policy & Regulation', href: '/policy' },
    ],
  },
  {
    title: 'Media Channel',
    links: [
      { label: 'Tech News', href: '/news' },
      { label: 'Podcast Beat', href: '/podcast' },
      { label: 'Ecosystem Events', href: '/events' },
      { label: 'Startup Map', href: '/map' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'About Trax', href: '/about' },
      { label: 'Advertise with Us', href: '/advertise' },
      { label: 'Meet the Team', href: '/team' },
      { label: 'Join the Team', href: '/careers' },
      { label: 'Publisher Dashboard', href: '/dashboard' },
      { label: 'Subscription Centre', href: '/newsletter' },
    ],
  },
]

export const menuSocials = [
  { label: 'X (Twitter)', href: 'https://x.com/traxnewsng?s=11', placeholder: false },
  { label: 'LinkedIn', href: 'https://linkedin.com', placeholder: true },
  { label: 'Instagram', href: 'https://instagram.com', placeholder: true },
  { label: 'YouTube', href: 'https://youtube.com', placeholder: true },
] as const

export function isNavActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function resolveNavSection(pathname: string): NavItem {
  const sorted = [...primaryNav].sort((a, b) => b.href.length - a.href.length)

  for (const item of sorted) {
    if (item.href === '/') {
      if (pathname === '/') return item
      continue
    }
    if (pathname === item.href || pathname.startsWith(`${item.href}/`)) {
      return item
    }
  }

  return primaryNav[0]
}

export type NavLink = Pick<NavItem, 'label' | 'href' | 'dividerAfter'>

/** @deprecated Use primaryNav — kept for existing imports */
export const navLinks: NavLink[] = primaryNav.map(({ label, href, dividerAfter }) => ({
  label,
  href,
  dividerAfter,
}))
