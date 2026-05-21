import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { PricingViz } from '../components/PageViz'

const emailSchema = z.string().email('Please enter a valid work email address')

const engagements = [
  {
    name: 'AI Assessment',
    duration: '2–3 weeks',
    desc: 'A structured evaluation of your firm\'s AI maturity, opportunities, and risks — delivered as an actionable report with prioritized recommendations.',
    cta: 'Discuss scope',
    ctaTo: '/about',
    deliverables: [
      'AI readiness assessment across data, talent, and infrastructure',
      'Prioritized opportunity map with ROI estimates',
      'Regulatory risk review for proposed AI use cases',
      'Vendor and technology landscape briefing',
      'Executive presentation and board-ready summary',
    ],
    ideal: 'Ideal for institutions at the start of their AI journey, or those seeking an independent second opinion.',
    featured: false,
  },
  {
    name: 'Project Engagement',
    duration: '6–16 weeks',
    desc: 'End-to-end delivery of a defined AI project — a custom model, an NLP pipeline, a compliance framework, or a production deployment.',
    cta: 'Start a conversation',
    ctaTo: '/about',
    badge: 'Most common',
    deliverables: [
      'Full requirements and data discovery sprint',
      'Model development, testing, and validation',
      'SR 11-7 compliant model documentation',
      'Integration into your existing infrastructure',
      'Knowledge transfer and internal team training',
    ],
    ideal: 'Ideal for firms with a clear use case who need senior practitioners to design and build it properly.',
    featured: true,
  },
  {
    name: 'Advisory Retainer',
    duration: 'Ongoing',
    desc: 'Continuous senior-level AI advisory for firms navigating ongoing model governance, regulatory change, or an expanding internal AI program.',
    cta: 'Talk to our team',
    ctaTo: '/about',
    deliverables: [
      'Dedicated senior practitioner access (defined hours per month)',
      'Ongoing model monitoring and governance support',
      'Regulatory horizon scanning and impact briefings',
      'Architecture and code review for internal AI work',
      'Quarterly strategy sessions and roadmap updates',
    ],
    ideal: 'Ideal for firms with an existing AI program who need experienced oversight and independent counsel.',
    featured: false,
  },
]

const faqs = [
  {
    q: 'How do engagements typically begin?',
    a: 'Every engagement starts with a no-obligation discovery call — usually 60 minutes. We come prepared with relevant questions and, where applicable, examples of similar work. If there\'s a mutual fit, we follow up with a detailed scope proposal within a week.',
  },
  {
    q: 'Do you work under NDA?',
    a: 'Yes, a mutual NDA is executed before any substantive discussion of your firm\'s data, strategies, or technology. We have never disclosed client information, and we maintain strict conflict-of-interest protocols across our client portfolio.',
  },
  {
    q: 'Can you work inside our environment?',
    a: 'Yes. We routinely work inside client infrastructure — on-premises, cloud-hosted, or air-gapped. Our team is accustomed to operating within the security and access control requirements of tier-1 financial institutions.',
  },
  {
    q: 'Do you take equity or vendor referral fees?',
    a: 'No. We do not take equity in client companies and do not accept fees from technology vendors. Our recommendations are always independent. This is fundamental to how we operate.',
  },
  {
    q: 'How is the scope and cost of an engagement determined?',
    a: 'Every engagement is scoped individually based on your firm\'s objectives, data environment, and timeline. After an initial discovery conversation we put together a detailed proposal outlining deliverables, timeline, and commercial terms — tailored to your situation.',
  },
  {
    q: 'Can you work with our existing internal AI team?',
    a: 'Absolutely. Many engagements are collaborative — we embed with your team, provide senior oversight and direction, and transfer knowledge throughout. Our goal is to make your internal capability stronger, not to create dependency on us.',
  },
]

export default function Pricing() {
  const [contactEmail, setContactEmail] = useState('')
  const [contactError, setContactError] = useState('')
  const [contactSent, setContactSent] = useState(false)

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault()
    const result = emailSchema.safeParse(contactEmail)
    if (!result.success) {
      setContactError(result.error.errors[0].message)
      return
    }
    setContactError('')
    setContactSent(true)
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <PricingViz />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="page-hero__label">Engagements</p>
          <h1 className="page-hero__title">
            Structured engagements.<br />Clear outcomes.
          </h1>
          <p className="page-hero__sub">
            We work in three primary engagement models, each designed around a different stage of your AI journey. Every engagement is scoped before any work begins.
          </p>
        </div>
      </section>

      {/* ── Engagement models ────────────────────────────────────────── */}
      <section className="pricing-plans">
        <div className="container">
          <div className="pricing-plans__grid">
            {engagements.map(eng => (
              <div key={eng.name} className={`plan${eng.featured ? ' plan--featured' : ''}`}>
                {eng.badge && <span className="plan__badge">{eng.badge}</span>}
                <p className="plan__name">{eng.name}</p>
                <p className="plan__period" style={{ marginBottom: 16 }}>{eng.duration}</p>
                <p className="plan__desc">{eng.desc}</p>
                <ul className="plan__features">
                  {eng.deliverables.map(d => (
                    <li key={d} className="plan__feature">
                      <span className="plan__feature-icon">
                        <CheckIcon />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: 12, color: 'var(--c-text-3)', lineHeight: 1.5, marginBottom: 20, fontStyle: 'italic' }}>
                  {eng.ideal}
                </p>
                <Link
                  to={eng.ctaTo}
                  className={`btn btn--full${eng.featured ? ' btn--dark' : ' btn--outline'}`}
                >
                  {eng.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we work ──────────────────────────────────────────────── */}
      <section style={{ padding: '64px 0', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              {
                label: 'Scoped before anything begins',
                desc: 'Every engagement starts with a discovery conversation. We agree on objectives, deliverables, and timeline before any work starts — no ambiguity.',
              },
              {
                label: 'Outcomes, not outputs',
                desc: 'We measure success by whether your business is better off. Not by slide count, report length, or time spent. If the outcome isn\'t there, we keep working.',
              },
              {
                label: 'Senior delivery, no exceptions',
                desc: 'Senior practitioners lead and deliver every engagement. The people who scope the work are the people who do it.',
              },
            ].map(item => (
              <div key={item.label}>
                <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--c-text)', marginBottom: 8, letterSpacing: '-0.01em' }}>{item.label}</p>
                <p style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="pricing-faq">
        <div className="container">
          <p className="section-label">Common questions</p>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>How we work with clients</h2>
          <div className="pricing-faq__grid">
            {faqs.map(faq => (
              <div key={faq.q} className="faq-item">
                <p className="faq-item__q">{faq.q}</p>
                <p className="faq-item__a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ──────────────────────────────────────────────── */}
      <section className="cta-dark">
        <div className="container">
          <h2 className="cta-dark__heading">Not sure which engagement is right?</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)', marginBottom: 32, maxWidth: 480, lineHeight: 1.6 }}>
            Tell us where you are and what you're trying to accomplish — we'll recommend the right starting point.
          </p>
          {!contactSent ? (
            <form onSubmit={handleContact} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="email"
                  className={`hero__input${contactError ? ' hero__input--error' : ''}`}
                  placeholder="Enter your work email"
                  value={contactEmail}
                  onChange={e => { setContactEmail(e.target.value); setContactError('') }}
                  style={{ flex: 1 }}
                />
                <button type="submit" className="btn btn--light">
                  Get in touch
                </button>
              </div>
              {contactError && <p className="hero__error">{contactError}</p>}
            </form>
          ) : (
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)' }}>
              Thank you — our team will reach out to <strong style={{ color: '#fff' }}>{contactEmail}</strong> within one business day.
            </p>
          )}
          <div style={{ marginTop: 40 }}>
            <Link to="/about" className="btn btn--ghost-light btn--lg">Go to full contact form →</Link>
          </div>
        </div>
      </section>
    </>
  )
}

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 5l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
