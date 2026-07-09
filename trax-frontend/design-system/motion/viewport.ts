import type { ViewportOptions } from 'framer-motion'

/** Standard scroll reveal — editorial sections */
export const viewportEditorial: ViewportOptions = {
  once: true,
  margin: '0px 0px -40px 0px',
  amount: 'some',
}

/** Grid / card batches — trigger slightly earlier */
export const viewportGrid: ViewportOptions = {
  once: true,
  margin: '0px 0px -60px 0px',
  amount: 'some',
}

/** Compact sidebar / feed items */
export const viewportFeed: ViewportOptions = {
  once: true,
  margin: '0px 0px -30px 0px',
  amount: 'some',
}

/** Homepage masthead — immediate on load */
export const viewportHero: ViewportOptions = {
  once: true,
  amount: 'some',
}

