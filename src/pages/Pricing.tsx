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
      <section style={{ padding: 'clamp(72px, 10vw, 120px) 0', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)', background: 'var(--c-bg-alt)' }}>
        <div className="container">
          <p className="section-label">Our process</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 'clamp(48px, 7vw, 80px)', maxWidth: 600 }}>
            How we move from your problem to a working solution
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              {
                step: '01',
                title: 'We start by listening — deeply',
                body: [
                  'Before we offer a single opinion, we invest time in genuinely understanding your situation. That means understanding your firm\'s structure, the regulatory environment you operate in, your data infrastructure, your internal capabilities, and — critically — the specific problem you\'re trying to solve.',
                  'Most consulting engagements fail not because of poor execution, but because the wrong problem was scoped. We refuse to let that happen. Our senior practitioners ask hard questions, push back on assumptions, and challenge the framing of the problem itself. We have seen enough financial institutions make expensive AI mistakes to know that clarity at the outset is worth more than speed.',
                ],
              },
              {
                step: '02',
                title: 'We examine the problem from every angle',
                body: [
                  'Once we understand what you\'re trying to accomplish, we examine the landscape of your challenge with the rigour of someone who has to live with the consequences. We assess the technical feasibility of different approaches, the quality and accessibility of your data, the regulatory constraints that will govern the solution, and the operational reality of deploying and maintaining AI in your environment.',
                  'This is not a box-ticking exercise. It is a genuine analytical effort — the kind that only practitioners with direct experience in quantitative finance and production AI systems can do well. We have encountered most failure modes before. We know where the hidden complexity lives, and we surface it before it becomes your problem.',
                ],
              },
              {
                step: '03',
                title: 'We propose a solution we\'re prepared to defend',
                body: [
                  'Our proposals are not generic. They are precise recommendations, grounded in your situation, your constraints, and your objectives. We explain our reasoning, lay out the alternatives we considered, and tell you plainly why we are recommending one path over another. We include what success looks like, how it will be measured, and what the risks are.',
                  'If we don\'t think a proposed approach will work, we say so — and we tell you why. If the problem is more complex than initially scoped, we tell you before you commit, not after. Our reputation is built on honest counsel, and we will not compromise that to win a contract.',
                ],
              },
              {
                step: '04',
                title: 'We align until the fit is right — for both of us',
                body: [
                  'We treat the scoping process as a collaboration, not a sales exercise. Once we have put a proposal in front of you, we work through it together. We refine the deliverables, adjust the timeline, revisit assumptions, and iterate until both parties are genuinely confident that the engagement is set up to succeed.',
                  'We do not pressure clients into starting work before this alignment is complete. Rushing into execution with an ambiguous scope is one of the most common and most costly mistakes in consulting. We will not do it, even if it means a longer discovery phase. When we start, we start with clarity.',
                ],
              },
              {
                step: '05',
                title: 'We execute — and we do not stop until it\'s done right',
                body: [
                  'Senior practitioners lead and deliver every engagement, without exception. The people who convinced you we were the right team are the same people building your solution. There are no handoffs to junior staff, no project managers acting as intermediaries, no distance between the people who understand your problem and the people writing the code or building the models.',
                  'We hold ourselves accountable to the outcomes we agreed on — not to the hours we billed or the slides we produced. If something is not working, we adapt. If an approach needs to change, we change it and we tell you immediately. When we commit to a deliverable, we deliver it. That is what uncompromised means.',
                ],
              },
            ].map((phase, i, arr) => (
              <div
                key={phase.step}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '0 48px',
                  padding: 'clamp(36px, 5vw, 56px) 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--c-border)' : 'none',
                }}
              >
                <div style={{ paddingTop: 4 }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'var(--c-text-3)',
                    textTransform: 'uppercase',
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {phase.step}
                  </span>
                </div>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(18px, 2.2vw, 22px)',
                    fontWeight: 500,
                    letterSpacing: '-0.025em',
                    lineHeight: 1.25,
                    color: 'var(--c-text)',
                    marginBottom: 20,
                  }}>
                    {phase.title}
                  </h3>
                  {phase.body.map((para, j) => (
                    <p
                      key={j}
                      style={{
                        fontSize: 15,
                        color: 'var(--c-text-2)',
                        lineHeight: 1.75,
                        marginBottom: j < phase.body.length - 1 ? 16 : 0,
                        maxWidth: 680,
                      }}
                    >
                      {para}
                    </p>
                  ))}
                </div>
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
