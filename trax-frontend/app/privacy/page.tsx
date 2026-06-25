import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Trax',
  description: 'Trax Privacy Policy. Learn how we handle and protect your personal data.',
}

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-xs mb-8" style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}>
          Last updated: June 23, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}>
          <p>
            Welcome to Trax. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this policy or our practices with regard to your personal info, please contact us at traxnewsng@gmail.com.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide to us when you subscribe to our newsletter, register for an account, or contact us. This may include your email address, name, job title, company name, and any other details you choose to share.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            2. How We Use Your Information
          </h2>
          <p>
            We use your personal information to deliver our weekly newsletter, send editorial briefings, manage your account, and improve the content and performance of our platform. We will never sell, rent, or lease your personal information to third parties.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            3. Cookies and Tracking Technologies
          </h2>
          <p>
            We use cookies and similar tracking technologies to analyze web traffic, remember user preferences, and enhance your browsing experience. You can choose to disable cookies in your browser settings, though some features of our site may not function properly as a result.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            4. Data Security
          </h2>
          <p>
            We implement appropriate technical and organizational security measures to protect the security of any personal information we process. However, please remember that no transmission over the internet can be guaranteed 100% secure.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            5. Your Choices and Rights
          </h2>
          <p>
            You can opt out of receiving our newsletter at any time by clicking the "unsubscribe" link at the bottom of our emails, or by contacting us directly. Depending on your location, you may have legal rights regarding access to, correction, or deletion of your personal data.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            6. Contact Us
          </h2>
          <p>
            If you have questions or comments about this Privacy Policy, please email us at <strong>traxnewsng@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
