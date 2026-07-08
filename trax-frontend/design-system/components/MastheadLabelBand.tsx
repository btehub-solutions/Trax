'use client'

import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import SectionMarker from '@/design-system/components/SectionMarker'
import { resolveNavSection } from '@/lib/navSection'

/** newsflash band — solid label left · large outline title right · bleeds into hero */
export default function MastheadLabelBand() {
  const pathname = usePathname()
  const section = resolveNavSection(pathname)

  return (
    <div className="ds-masthead-zone">
      <div className="container ds-masthead__shell">
        <div className="ds-masthead__band">
          <div className="ds-masthead__stroke" aria-hidden>
            <AnimatePresence mode="wait">
              <motion.span
                key={section.href}
                className="ds-masthead__stroke-text"
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {section.markerTitle}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="ds-masthead__label-row">
            <SectionMarker title={section.markerTitle} className="ds-masthead__marker" />
          </div>
        </div>
      </div>
    </div>
  )
}
