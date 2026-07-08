import type { Metadata } from 'next'
import LegalPageLayout from '@/components/ui/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service | Trax',
  description: 'Trax Terms of Service. Understand the rules and regulations for using the Trax platform.',
}

export default function TermsOfServicePage() {
  return (
    <LegalPageLayout title="Terms of Service" lastUpdated="June 23, 2026">
      <p>
        By accessing or using the Trax website and services, you agree to comply with and be bound
        by these Terms of Service. Please read them carefully. If you do not agree to these
        terms, you should not access or use our services.
      </p>

      <h2>1. Acceptance of terms</h2>
      <p>
        Trax provides its services subject to the following Terms of Service, which may be updated
        by us from time to time without notice to you. Your continued use of the platform
        constitutes acceptance of any updates.
      </p>

      <h2>2. Intellectual property rights</h2>
      <p>
        All content, logos, designs, graphics, and articles on Trax are the property of Trax Media
        Ltd. or its content creators and are protected by applicable copyright, trademark, and
        intellectual property laws. You may not copy, reproduce, distribute, or create derivative
        works without express written consent.
      </p>

      <h2>3. User conduct</h2>
      <p>You agree not to use the services to:</p>
      <ul>
        <li>Engage in any form of data scraping, mining, harvesting, or automated extraction.</li>
        <li>Post or transmit unsolicited promotional material, spam, or malicious software.</li>
        <li>Disrupt or compromise the security or integrity of our servers or networks.</li>
        <li>Impersonate any person or entity or misrepresent your affiliation with a person or entity.</li>
      </ul>

      <h2>4. Disclaimer of warranties</h2>
      <p>
        The services are provided on an as is and as available basis. Trax makes no
        representations or warranties of any kind, express or implied, regarding the accuracy,
        completeness, availability, or security of the platform or its contents.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by law, Trax Media Ltd. and its officers, employees, or
        agents shall not be liable for any direct, indirect, incidental, special, consequential, or
        punitive damages arising out of your access to or use of the services.
      </p>

      <h2>6. Governing law</h2>
      <p>
        These Terms of Service shall be governed by and construed in accordance with the laws of
        the Federal Republic of Nigeria, specifically within the jurisdiction of Ogun State,
        without regard to conflict of law principles.
      </p>

      <h2>7. Contact us</h2>
      <p>
        If you have questions or concerns about these Terms of Service, please contact us at{' '}
        <strong>traxnewsng@gmail.com</strong>.
      </p>
    </LegalPageLayout>
  )
}
