import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookie Policy | Trax',
  description: 'Trax Cookie Policy. Understand how and why we use cookies on our platform.',
}

export default function CookiePolicyPage() {
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
          Cookie Policy
        </h1>
        <p className="text-xs mb-8" style={{ color: 'var(--fg-subtle)', fontFamily: 'var(--font-dm-sans)' }}>
          Last updated: June 23, 2026
        </p>

        <div className="prose prose-invert max-w-none space-y-6 text-sm leading-relaxed" style={{ color: 'var(--fg-muted)', fontFamily: 'var(--font-dm-sans)' }}>
          <p>
            This Cookie Policy explains how Trax Media Ltd. ("we", "us", or "our") uses cookies and similar tracking technologies when you visit our website. By using our platform, you consent to the use of cookies as described in this policy.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            1. What Are Cookies?
          </h2>
          <p>
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide analytical information to the website owners.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            2. How We Use Cookies
          </h2>
          <p>
            We use cookies for several reasons, including:
          </p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><strong>Essential Cookies:</strong> These cookies are necessary for the core functionality of the website, such as managing user logins and security authentication.</li>
            <li><strong>Preference Cookies:</strong> These cookies allow us to remember decisions you make, such as theme settings (dark vs. light mode).</li>
            <li><strong>Analytics Cookies:</strong> We use analytic services (such as Google Analytics) to collect information about how users interact with our website. This helps us optimize content and structure.</li>
            <li><strong>Newsletter & Marketing Cookies:</strong> When you subscribe to our newsletter, cookies may be used to verify your subscription status and manage signup promotions.</li>
          </ul>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            3. Managing Cookie Settings
          </h2>
          <p>
            You can control and manage cookie settings in your web browser. Most browsers allow you to block cookies, delete existing cookies, or receive a warning before a cookie is stored. Please note that disabling cookies may affect the functionality of some parts of our platform.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            4. Third-Party Cookies
          </h2>
          <p>
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. These third parties have their own privacy policies.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            5. Changes to This Policy
          </h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this policy regularly to stay informed.
          </p>

          <h2 className="text-lg font-bold text-white mt-8" style={{ color: 'var(--fg)', fontFamily: 'var(--font-oxanium)' }}>
            6. Contact Us
          </h2>
          <p>
            If you have questions about our use of cookies or other tracking technologies, please email us at <strong>traxnewsng@gmail.com</strong>.
          </p>
        </div>
      </div>
    </div>
  )
}
