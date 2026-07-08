import type { Metadata } from 'next'
import LegalPageLayout from '@/components/ui/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Cookie Policy | Trax',
  description: 'Trax Cookie Policy. Understand how and why we use cookies on our platform.',
}

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy" lastUpdated="June 23, 2026">
      <p>
        This Cookie Policy explains how Trax Media Ltd. uses cookies and similar tracking
        technologies when you visit our website. By using our platform, you consent to the use of
        cookies as described in this policy.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files that are stored on your computer or mobile device when you
        visit a website. They are widely used to make websites work more efficiently, remember
        your preferences, and provide analytical information to the website owners.
      </p>

      <h2>2. How we use cookies</h2>
      <p>We use cookies for several reasons, including:</p>
      <ul>
        <li>
          <strong>Essential cookies:</strong> Necessary for core functionality such as user logins
          and security authentication.
        </li>
        <li>
          <strong>Preference cookies:</strong> Remember decisions you make, such as theme settings.
        </li>
        <li>
          <strong>Analytics cookies:</strong> Collect information about how users interact with
          our website to optimize content and structure.
        </li>
        <li>
          <strong>Newsletter cookies:</strong> Verify subscription status and manage signup
          promotions.
        </li>
      </ul>

      <h2>3. Managing cookie settings</h2>
      <p>
        You can control and manage cookie settings in your web browser. Most browsers allow you to
        block cookies, delete existing cookies, or receive a warning before a cookie is stored.
        Disabling cookies may affect the functionality of some parts of our platform.
      </p>

      <h2>4. Third-party cookies</h2>
      <p>
        We may also use various third-party cookies to report usage statistics and deliver
        advertisements. These third parties have their own privacy policies.
      </p>

      <h2>5. Changes to this policy</h2>
      <p>
        We may update this Cookie Policy from time to time to reflect changes to the cookies we
        use or for other operational, legal, or regulatory reasons.
      </p>

      <h2>6. Contact us</h2>
      <p>
        If you have questions about our use of cookies or other tracking technologies, please
        email us at <strong>traxnewsng@gmail.com</strong>.
      </p>
    </LegalPageLayout>
  )
}
