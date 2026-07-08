import NewsletterSection from '@/components/ui/NewsletterSection'
import { SectionBand } from '@/design-system/components'

interface PlatformPageShellProps {
  children: React.ReactNode
  showNewsletter?: boolean
}

export default function PlatformPageShell({
  children,
  showNewsletter = true,
}: PlatformPageShellProps) {
  return (
    <div className="ds-platform-page ds-premium-home">
      {children}
      {showNewsletter && (
        <SectionBand variant="muted">
          <NewsletterSection />
        </SectionBand>
      )}
    </div>
  )
}
