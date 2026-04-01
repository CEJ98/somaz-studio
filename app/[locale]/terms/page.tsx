import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import PageFade from '@/components/PageFade'
import { Link } from '@/i18n/navigation'

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'legal.terms' })
  return {
    title: t('metaTitle'),
    description: t('metaDesc'),
    robots: { index: false, follow: false },
  }
}

export default async function TermsPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const { locale } = params
  const tl = await getTranslations({ locale, namespace: 'legal' })
  const t = await getTranslations({ locale, namespace: 'legal.terms' })

  return (
    <PageFade className="min-h-screen pt-32 pb-28 px-6 md:px-10">
      <div className="max-w-3xl mx-auto">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-accent mb-5">{tl('label')}</p>
        <h1 className="font-serif font-light text-foreground mb-16" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>
          {t('title')}
        </h1>

        <div className="architectural-line mb-12" />

        <div className="space-y-10 font-sans font-light text-foreground/55 leading-relaxed">
          <p className="font-sans text-xs text-foreground/30 tracking-widest uppercase">
            Last updated: {new Date().getFullYear()}
          </p>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">1. Services</h2>
            <p>
              Somaz Studio LLC (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;the Studio&rdquo;) provides 3D visualization, interior design,
              conceptual design, and design consulting services. By engaging our services or submitting
              a project inquiry, you agree to these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">2. Project Agreements</h2>
            <p>
              Each project is governed by a separate written agreement or proposal specifying scope,
              deliverables, timeline, and fees. These Terms supplement — and do not replace — any
              project-specific agreement. In case of conflict, the project agreement controls.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">3. Intellectual Property</h2>
            <p>
              All designs, renderings, drawings, and creative works produced by Somaz Studio remain
              the intellectual property of Somaz Studio until full payment is received. Upon payment,
              clients receive a license to use the deliverables as specified in the project agreement.
              We retain the right to display completed work in our portfolio unless otherwise agreed
              in writing.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">4. Payments</h2>
            <p>
              Payment terms are specified in each project agreement. A deposit is typically required
              before work begins. Unpaid balances may result in work being paused or deliverables
              withheld until payment is received.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">5. Revisions and Scope</h2>
            <p>
              Each proposal includes a defined number of revision rounds. Additional revisions or
              scope changes beyond the agreed terms will be billed at our standard hourly rate or
              via a change order, to be agreed upon in writing before work proceeds.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">6. Limitation of Liability</h2>
            <p>
              Somaz Studio is not a licensed architecture or engineering firm. Our visualizations
              and designs are for representational and planning purposes only and are not construction
              documents. We are not liable for decisions made based on our work without appropriate
              professional review. Our total liability for any claim shall not exceed the fees paid
              for the specific project giving rise to the claim.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">7. Confidentiality</h2>
            <p>
              We treat all client project information as confidential and will not disclose it to
              third parties without your consent, except as required by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">8. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Florida, United States. Any
              disputes shall be resolved in the courts of Miami-Dade County, Florida.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-foreground/80 mb-4">9. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
              <a href="mailto:hola@somazstudio.com" className="text-accent hover:text-foreground transition-colors duration-300">
                hola@somazstudio.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="architectural-line mt-16 mb-8" />
        <Link
          href="/"
          className="font-sans text-[10px] tracking-[0.25em] uppercase text-foreground/30 hover:text-accent transition-colors duration-300"
        >
          {tl('backHome')}
        </Link>
      </div>
    </PageFade>
  )
}
