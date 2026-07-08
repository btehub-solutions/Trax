import Link from 'next/link'
import { SectionBand } from '@/design-system/components'
import { Icon } from '@/design-system/icons'
import PlatformPageShell from '@/components/ui/PlatformPageShell'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <PlatformPageShell showNewsletter={false}>
      <SectionBand variant="default">
        <div className="container ds-legal-page">
          <Link href="/" className="ds-legal-page__back">
            <Icon name="arrow-left" size="xs" aria-hidden />
            Back to home
          </Link>
          <p className="ds-category-label">Legal</p>
          <h1 className="ds-legal-page__title">{title}</h1>
          <p className="type-meta ds-legal-page__updated">Last updated: {lastUpdated}</p>
          <div className="ds-legal-page__prose">{children}</div>
        </div>
      </SectionBand>
    </PlatformPageShell>
  )
}
