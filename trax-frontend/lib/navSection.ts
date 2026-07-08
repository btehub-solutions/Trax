export {
  primaryNav,
  secondaryNav,
  navLinks,
  isNavActive,
  resolveNavSection,
  type NavItem,
} from './navigation'

import { resolveNavSection } from './navigation'

export function getNavSectionLabel(pathname: string): string {
  return resolveNavSection(pathname).markerTitle
}
