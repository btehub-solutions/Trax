/**
 * Trax Design Direction — 4-LAYER ZONE SYSTEM (LOCKED)
 *
 * 3 style layers — each owns a fixed UI zone and visual language. Never mix across zones.
 * 1 cross-cutting layer (Premium) — production quality underneath all zones; not a style.
 *
 * Reference: Newsflash — flat stories, red nav, masthead stroke, sidebar secondary stories.
 */

/** Style Layer 1 — Brutalism */
export const brutalismLayer = {
  id: 'brutalism',
  order: 1,
  zone: 'masthead band only (MastheadLabelBand)',
  language:
    'One loud beat — outline stroke, sticky label, hard rule (2px; heavier than any 1px Swiss grid line)',
  font: 'Instrument Sans outline stroke; Space Mono for watermark accents only in this band',
  color: {
    allowed: 'Flat page surface + outline stroke + solid label text — no tints or gradients in-band',
    forbidden: 'Tinted panels, gradients, drop shadows, editorial serif in the band chrome',
  },
  forbiddenZones: [
    'feeds',
    'cards',
    'newsletter',
    'nav',
    'hero body',
    'anywhere outside MastheadLabelBand',
  ],
  responsive: {
    below768: 'Outline stroke hidden; sticky label row + SectionMarker persist',
    above768: 'Full stroke bleed behind label band',
  },
} as const

/** Style Layer 2 — Swiss */
export const swissLayer = {
  id: 'swiss',
  order: 2,
  zone: 'nav, meta, filters, grid structure, buttons, section markers, module chrome',
  language: 'Functional chrome — Instrument Sans, neutral grid, 1px hairline rules',
  font: 'Instrument Sans',
  color: {
    allowed: 'Neutral monochrome surfaces; solid red nav bar; red accent on active states, markers, labels, CTAs',
    forbidden: 'Gradients on chrome, rainbow category colors, serif in UI controls',
  },
  forbiddenZones: ['headlines', 'article prose', 'deck copy', 'lead titles'],
} as const

/** Style Layer 3 — Editorial */
export const editorialLayer = {
  id: 'editorial',
  order: 3,
  zone: 'headlines, decks, article prose, story card titles',
  language:
    'Fraunces, text-first hierarchy — authoritative paper-of-record (low wonk), not indie-blog trendy',
  font: 'Fraunces',
  color: {
    allowed: 'Neutral text primary/secondary on story copy; red only via links and hover on titles',
    forbidden: 'UI chrome styling, pill buttons, nav colors on prose blocks',
  },
  forbiddenZones: ['nav', 'buttons', 'filter pills', 'section marker titles', 'form labels'],
} as const

/** Cross-cutting — Premium (production quality, not a style layer) */
export const premiumExecution = {
  id: 'premium',
  applies: 'everywhere, underneath all 3 style layers',
  governs: [
    'Section band alternation (default / tint / muted)',
    'Spacing rhythm (--space-section-y, --space-grid-gap)',
    'Image crop discipline (object-cover, consistent aspect ratios)',
    'Hairline dividers between feed rows',
    'Type rhythm (leading, max-width on prose)',
  ],
  forbidden: ['Drop shadows', 'elevation', 'skeuomorphic depth', 'card lift on hover'],
  spacing: 'Tight editorial rhythm — not airy magazine spreads; not cramped either',
} as const

export const styleLayers = {
  brutalism: brutalismLayer,
  swiss: swissLayer,
  editorial: editorialLayer,
} as const

/**
 * When a component sits on a zone boundary, the more specific content layer wins.
 */
export const dominanceRules = {
  mastheadBand: 'Brutalism — MastheadLabelBand only; no second brutalist block below it',
  heroBlock:
    'Editorial — SectionHero / HeroLead owns lead + featured; brutalism does not repeat here',
  sectionHeaders: 'Swiss — SectionMarker titles and filters',
  storyRows: 'Editorial titles + Swiss meta; flat dividers from Premium',
  sidebarModules: 'Swiss chrome + copy; module titles in Swiss (not Fraunces)',
  newsletter: 'Editorial headline in copy column; Swiss form controls; Premium border band',
} as const

/** Single style-layer owner per UI element (+ Premium execution underneath) */
export const componentLayerMap = {
  utilityBar: { style: 'swiss', premium: ['spacing'] },
  logoWordmark: { style: 'swiss', premium: [] },
  categoryNav: { style: 'swiss', premium: [] },
  menuSearch: { style: 'swiss', premium: ['motion'] },
  mastheadLabelBand: { style: 'brutalism', premium: ['sticky offset'] },
  homeCategoryHero: { style: 'editorial', premium: ['band border-bottom', 'image radius'] },
  heroFeaturedSidebar: { style: 'editorial', premium: ['hairline between items'] },
  heroSectionMarker: { style: 'swiss', premium: [] },
  feedRows: { style: 'editorial', premium: ['flat dividers', 'grid gap'] },
  feedMeta: { style: 'swiss', premium: [] },
  categoryLabelsOnStories: { style: 'swiss', premium: [] },
  trackerPanel: { style: 'swiss', premium: ['border', 'tint', 'padding'] },
  briefingCtaPanel: { style: 'swiss', premium: ['border', 'tint'] },
  storyGridCards: { style: 'editorial', premium: ['flat layout', 'image radius'] },
  pressRoomCards: { style: 'editorial', premium: ['flat layout'] },
  filterPills: { style: 'swiss', premium: [] },
  newsletterBlock: { style: 'swiss', premium: ['border', 'red stripe', 'muted band'] },
  newsletterHeadline: { style: 'editorial', premium: [] },
  articleProse: { style: 'editorial', premium: ['measure', 'prose rhythm'] },
  articleBreadcrumbShare: { style: 'swiss', premium: [] },
  buttons: { style: 'swiss', premium: ['motion'] },
  footer: { style: 'swiss', premium: ['inverse band'] },
  platformEvents: { style: 'swiss', premium: ['module borders', 'bands'] },
} as const

/** @deprecated Use styleLayers — kept for backwards compatibility */
export const designLayers = {
  brutalism: {
    id: 'brutalism',
    role: 'masthead-only',
    description: brutalismLayer.language,
    font: 'Space Mono',
    scope: 'masthead',
  },
  swiss: {
    id: 'swiss',
    role: 'secondary',
    description: swissLayer.language,
    font: 'Instrument Sans',
  },
  editorial: {
    id: 'editorial',
    role: 'primary',
    description: editorialLayer.language,
    font: 'Fraunces',
  },
} as const

export const lockedDesignRules = {
  zoneBoundary: 'Never mix a style layer language into another style layer zone',
  elevation: {
    stories: 'Flat — no box-shadow on feeds, grids, press cards, related stories',
    modules: 'Border + optional tint only — no drop shadow',
    hover: 'Title color + image scale — never card lift or shadow on hover',
  },
  spacing: premiumExecution.spacing,
  sectionPadding: 'Use --space-section-y only',
  markers: 'SectionMarker margin-bottom --space-8 max',
  grids: '--space-grid-gap between cards',
  color: 'Monochrome surfaces + #E7040D accent — no rainbow category colors',
  templates: {
    homepage: 'Hero → feed + sidebar → briefing → press → newsletter',
    category: 'Lead + featured → intro/filters → flat grid → newsletter',
    article: 'Hero image → prose → flat related grid',
    platform: 'Events/tools — same tokens, purpose-built layout',
  },
  reference: 'Newsflash',
} as const

export const designPrinciples = {
  color: lockedDesignRules.color,
  rhythm: 'Tinted neutral bands — tight section-y',
  hero: 'Lead story focus — Editorial zone (SectionHero)',
  elevation: lockedDesignRules.elevation.stories,
  zones: lockedDesignRules.zoneBoundary,
  reference: lockedDesignRules.reference,
} as const

export const accentUsage = [
  'Nav bar (solid red)',
  'Nav active / hover states',
  'Section marker bars',
  'Category labels (Swiss typography, red ink)',
  'Links & CTAs',
  'Breaking / live indicators',
] as const
