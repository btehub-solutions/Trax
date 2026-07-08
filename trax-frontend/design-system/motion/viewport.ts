import type { ViewportOptions } from 'framer-motion'

/** Standard scroll reveal — editorial sections */
export const viewportEditorial: ViewportOptions = {
  once: true,
  margin: '-40px',
  amount: 0.2,
}

/** Grid / card batches — trigger slightly earlier */
export const viewportGrid: ViewportOptions = {
  once: true,
  margin: '-60px',
  amount: 0.15,
}

/** Compact sidebar / feed items */
export const viewportFeed: ViewportOptions = {
  once: true,
  margin: '-30px',
  amount: 0.25,
}

/** Homepage masthead — immediate on load */
export const viewportHero: ViewportOptions = {
  once: true,
  amount: 0.35,
}
