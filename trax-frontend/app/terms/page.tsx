import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Trax',
  description: 'Trax Terms of Service. Understand the rules and regulations for using the Trax platform.',
}

export default function TermsOfServicePage() {
  return (
    <div className="relative pt-28 pb-20 min-h-screen" style={{ backgroundColor: 'var(--bg)' }}>
      {/* Background patterns */}
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-[0.1]"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />

      <div className="container relative z-10 max-w-3xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-8 transition-colors hover:text-[#C84B31]"
          style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        <h1 
          className="font-extrabold tracking-tight mb-4"
          style={{
            fontFamily: 'var(--font-oxanium)',
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            color: 'var(--fg)',
            lineHeight: 1.1,
          }}
        >
          Terms of Service
        </h1>
        <p className="text-xs mb-8" style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}>
          Last updated: June 23, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}>
          <p>
            By accessing or using the Trax website and services, you agree to comply with and be bound by these Terms of Service. Please read them carefully. If you do not agree to these terms, you should not access or use our services.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            1. Acceptance of Terms
          </h2>
          <p>
            Trax provides its services subject to the following Terms of Service ("TOS"), which may be updated by us from time to time without notice to you. Your continued use of the platform constitutes acceptance of any updates.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            2. Intellectual Property Rights
          </h2>
          <p>
            All content, logos, designs, graphics, and articles on Trax are the property of Trax Media Ltd. or its content creators and are protected by applicable copyright, trademark, and intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without express written consent.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            3. User Conduct
          </h2>
          <p>
            You agree not to use the services to:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li>Engage in any form of data scraping, mining, harvesting, or automated extraction.</li>
            <li>Post or transmit unsolicited promotional material, spam, or malicious software.</li>
            <li>Disrupt or compromise the security or integrity of our servers or networks.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity.</li>
          </ul>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            4. Disclaimer of Warranties
          </h2>
          <p>
            The services are provided on an "as is" and "as available" basis. Trax makes no representations or warranties of any kind, express or implied, regarding the accuracy, completeness, availability, or security of the platform or its contents.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            5. Limitation of Liability
          </h2>
          <p>
            To the maximum extent permitted by law, Trax Media Ltd. and its officers, employees, or agents shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the services.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            6. Governing Law
          </h2>
          <p>
            These Terms of Service shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria, specifically within the jurisdiction of Ogun State, without regard to conflict of law principles.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            7. Contact Us
          </h2>
          <p>
            If you have questions or concerns about these Terms of Service, please contact us at <strong>info@trax.media</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
