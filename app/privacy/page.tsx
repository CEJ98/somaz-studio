import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Somaz Studio LLC — how we collect, use, and protect your information.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-6">Legal</p>
      <h1 className="font-serif font-light text-foreground mb-2 leading-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
        Privacy Policy
      </h1>
      <p className="font-sans text-xs text-foreground/30 mb-12">Last updated: March 31, 2025</p>

      <div className="architectural-line mb-12" />

      <div className="space-y-10 font-sans text-sm text-foreground/60 leading-relaxed">

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">1. Who We Are</h2>
          <p>
            Somaz Studio LLC ("Somaz Studio", "we", "us") is a design studio based in Miami, FL, operating globally. We provide 3D visualization, interior design, conceptual design, and consulting services. You can reach us at{' '}
            <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">hola@somazstudio.com</a>.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect information you provide directly when you:</p>
          <ul className="list-disc list-inside space-y-1 text-foreground/50">
            <li>Submit our contact form (name, email, phone, project type, budget, project size, message)</li>
            <li>Subscribe to our newsletter (email address only)</li>
          </ul>
          <p className="mt-3">
            We also collect anonymous usage data through Vercel Analytics, which measures page views and performance metrics without identifying individual visitors.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1 text-foreground/50">
            <li>To respond to project inquiries and communicate about potential engagements</li>
            <li>To send studio updates and project reveals via newsletter (only if you subscribed)</li>
            <li>To improve our website and services through aggregate analytics</li>
          </ul>
          <p className="mt-3">We do not use your information for automated decision-making or profiling.</p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">4. Data Storage</h2>
          <p>
            Your data is stored securely in Supabase (a PostgreSQL-based cloud database) hosted on AWS infrastructure in the United States. Data is protected with row-level security and encrypted at rest and in transit.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">5. Sharing Your Information</h2>
          <p>
            We do not sell, rent, or share your personal information with third parties for their marketing purposes. We may share data only with service providers necessary to operate our business (Supabase for storage, Resend for transactional email, Vercel for hosting and analytics), each bound by their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">6. Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc list-inside space-y-1 text-foreground/50">
            <li>Access the personal information we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Withdraw consent for newsletter communications at any time</li>
            <li>Lodge a complaint with your local data protection authority (for EU residents)</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email us at{' '}
            <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">hola@somazstudio.com</a>.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">7. Cookies</h2>
          <p>
            We do not use tracking cookies or advertising cookies. Vercel Analytics uses a privacy-friendly approach that does not rely on cookies to identify visitors.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">8. Data Retention</h2>
          <p>
            Contact form submissions are retained for up to 2 years to support ongoing business relationships. Newsletter subscriptions are retained until you unsubscribe.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. Material changes will be noted with an updated date at the top of this page. Continued use of our website after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground/40 mb-3">10. Contact</h2>
          <p>
            Questions about this policy? Email{' '}
            <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">hola@somazstudio.com</a>{' '}
            or write to: Somaz Studio LLC, Miami, FL, United States.
          </p>
        </section>

      </div>

      <div className="architectural-line mt-16 mb-8" />
      <Link
        href="/"
        className="font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-accent transition-colors duration-300"
      >
        ← Back to Home
      </Link>
    </div>
  )
}
