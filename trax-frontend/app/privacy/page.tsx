import type { Metadata } from 'next'
import LegalPageLayout from '@/components/ui/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Trax',
  description: 'Trax Privacy Policy. Learn how we handle and protect your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="June 23, 2026">
      <p>
        Welcome to Trax. We are committed to protecting your personal information and your right
        to privacy. If you have any questions or concerns about this policy or our practices with
        regard to your personal info, please contact us at traxnewsng@gmail.com.
      </p>

      <h2>1. Information we collect</h2>
      <p>
        We collect personal information that you voluntarily provide to us when you subscribe to
        our newsletter, register for an account, or contact us. This may include your email
        address, name, job title, company name, and any other details you choose to share.
      </p>

      <h2>2. How we use your information</h2>
      <p>
        We use your personal information to deliver our weekly newsletter, send editorial
        briefings, manage your account, and improve the content and performance of our platform.
        We will never sell, rent, or lease your personal information to third parties.
      </p>

      <h2>3. Cookies and tracking technologies</h2>
      <p>
        We use cookies and similar tracking technologies to analyze web traffic, remember user
        preferences, and enhance your browsing experience. You can choose to disable cookies in
        your browser settings, though some features of our site may not function properly as a
        result.
      </p>

      <h2>4. Data security</h2>
      <p>
        We implement appropriate technical and organizational security measures to protect the
        security of any personal information we process. However, please remember that no
        transmission over the internet can be guaranteed 100% secure.
      </p>

      <h2>5. Your choices and rights</h2>
      <p>
        You can opt out of receiving our newsletter at any time by clicking the unsubscribe link
        at the bottom of our emails, or by contacting us directly. Depending on your location, you
        may have legal rights regarding access to, correction, or deletion of your personal data.
      </p>

      <h2>6. Contact us</h2>
      <p>
        If you have questions or comments about this Privacy Policy, please email us at{' '}
        <strong>traxnewsng@gmail.com</strong>.
      </p>
    </LegalPageLayout>
  )
}
