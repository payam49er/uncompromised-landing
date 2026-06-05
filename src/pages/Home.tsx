import { Link } from 'react-router-dom'
import HeroViz from '../components/HeroViz'

export default function Home() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero">
        <HeroViz />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero__content">
            <h1 className="hero__headline">
              AI consulting<br />for financial<br />institutions
            </h1>
            <p className="hero__sub">
              We help banks, hedge funds, trading firms, and wealth managers build, deploy, and govern AI — without compromising on performance, compliance, or trust.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' as const, marginTop: 32 }}>
              <Link to="/about#contact" className="btn btn--light">
                Start a conversation
              </Link>
              <Link to="/features" className="btn btn--ghost-light">
                See our work
              </Link>
            </div>
            <p className="hero__disclaimer" style={{ marginTop: 16 }}>
              All engagements are covered by mutual NDA. Client information is never shared.
            </p>
          </div>
        </div>
      </section>

      {/* ── Trusted by ───────────────────────────────────────────────── */}
      <section className="trusted">
        <div className="container">
          <p className="trusted__label">Trusted by leading financial institutions</p>
          <div className="trusted__logos">
            {['Tier-1 Investment Banks', 'Global Hedge Funds', 'Systematic Trading Firms', 'Family Offices', 'FinTech Unicorns', 'Asset Managers'].map(co => (
              <span key={co} className="trusted__logo">{co}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services overview ────────────────────────────────────────── */}
      <section className="products alt-bg">
        <div className="container">
          <p className="section-label">What we do</p>
          <h2 className="section-heading">Expert AI guidance at every stage of your journey.</h2>
          <div className="products__grid">
            {[
              {
                title: 'AI Strategy & Roadmap',
                desc: 'We assess your firm\'s AI maturity, identify the highest-ROI opportunities, and deliver a structured roadmap your board and regulators can stand behind.',
              },
              {
                title: 'Custom Model Development',
                desc: 'From alpha generation and risk models to NLP pipelines on earnings data — we build production-grade AI tailored to your trading and operational workflows.',
              },
              {
                title: 'Regulatory & Compliance AI',
                desc: 'We navigate SEC, FINRA, MiFID II, and Basel III requirements so your AI deployments are defensible, auditable, and SR 11-7 compliant from day one.',
              },
              {
                title: 'Technical Due Diligence',
                desc: 'Evaluating an AI-driven firm or technology investment? We provide independent, rigorous assessment of models, data pipelines, and infrastructure.',
              },
            ].map(p => (
              <div key={p.title} className="product-card">
                <h3 className="product-card__title">{p.title}</h3>
                <p className="product-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial 1 ────────────────────────────────────────────── */}
      <section className="testimonial-hero">
        <div className="container">
          <p className="testimonial-hero__category">Hedge Fund — Systematic Equity</p>
          <blockquote className="testimonial-hero__quote">
            "The Uncompromised team understood our data environment, our regulatory constraints, and our performance requirements from day one. They delivered a production-grade NLP pipeline on earnings transcripts that meaningfully improved our alpha signal — on time and within budget."
          </blockquote>
          <div className="testimonial-hero__attribution">
            <div className="testimonial-hero__avatar" />
            <div>
              <p className="testimonial-hero__name">Chief Investment Officer</p>
              <p className="testimonial-hero__role">$4.2B Systematic Equity Fund, New York</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How we work ──────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(72px, 10vw, 120px) 0', background: 'var(--c-bg-alt)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }}>
        <div className="container">
          <p className="section-label">How we work</p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 'clamp(48px, 7vw, 80px)', maxWidth: 600 }}>
            From your problem to a working solution — without compromise
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[
              {
                step: '01',
                title: 'We start by listening — deeply',
                body: 'Before we offer a single opinion, we invest time in genuinely understanding your situation: your firm\'s structure, the regulatory environment you operate in, your data infrastructure, your internal capabilities, and — critically — the specific problem you\'re trying to solve. Most consulting engagements fail not because of poor execution, but because the wrong problem was scoped. We refuse to let that happen.',
              },
              {
                step: '02',
                title: 'We examine the problem from every angle',
                body: 'Once we understand your objective, we assess the technical feasibility of different approaches, the quality and accessibility of your data, the regulatory constraints that will govern the solution, and the operational reality of deploying AI in your environment. We have encountered most failure modes before. We know where the hidden complexity lives, and we surface it before it becomes your problem.',
              },
              {
                step: '03',
                title: 'We propose a solution we\'re prepared to defend',
                body: 'Our proposals are precise recommendations grounded in your situation and constraints — not generic decks. We explain our reasoning, lay out the alternatives we considered, and tell you plainly why we are recommending one path over another. If we don\'t believe a proposed approach will work, we say so, and we tell you why. Our reputation is built on honest counsel.',
              },
              {
                step: '04',
                title: 'We align until the fit is right — for both of us',
                body: 'We treat scoping as a collaboration, not a sales exercise. We refine deliverables, adjust the timeline, and revisit assumptions until both parties are genuinely confident the engagement is set up to succeed. We do not pressure clients into starting work before this alignment is complete. When we start, we start with clarity.',
              },
              {
                step: '05',
                title: 'We execute — and we don\'t stop until it\'s done right',
                body: 'Senior practitioners lead and deliver every engagement, without exception. The people who convinced you we were the right team are the same people building your solution. We hold ourselves accountable to the outcomes we agreed on — not to hours billed or slides produced. When we commit to a deliverable, we deliver it. That is what uncompromised means.',
              },
            ].map((phase, i, arr) => (
              <div
                key={phase.step}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '0 48px',
                  padding: 'clamp(32px, 4.5vw, 52px) 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--c-border)' : 'none',
                }}
              >
                <div style={{ paddingTop: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', color: 'var(--c-text-3)', textTransform: 'uppercase' as const }}>
                    {phase.step}
                  </span>
                </div>
                <div>
                  <h3 style={{ fontSize: 'clamp(17px, 2vw, 21px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.25, color: 'var(--c-text)', marginBottom: 14 }}>
                    {phase.title}
                  </h3>
                  <p style={{ fontSize: 15, color: 'var(--c-text-2)', lineHeight: 1.75, maxWidth: 680 }}>
                    {phase.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full-width quote ─────────────────────────────────────────── */}
      <section className="quote-full">
        <div className="container">
          <blockquote>
            <p className="quote-full__text">
              "We'd worked with three different AI vendors before Uncompromised. They were the first team that truly understood that in a regulated environment, a model that performs is worthless if it can't be explained to a regulator. They got that immediately."
            </p>
            <footer>
              <p className="quote-full__name">Head of Technology</p>
              <p className="quote-full__role">Global Investment Bank, London</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── Engagement types ─────────────────────────────────────────── */}
      <section className="quick-start">
        <div className="container">
          <p className="section-label">How engagements work</p>
          <div className="quick-start__grid">
            {[
              {
                title: 'Discovery in days',
                desc: 'We begin every engagement with a focused discovery sprint to understand your objectives, data environment, constraints, and success criteria.',
              },
              {
                title: 'Delivery in weeks, not quarters',
                desc: 'We scope work to deliver tangible results quickly. Most initial engagements produce a working prototype or actionable roadmap within 4–8 weeks.',
                link: { label: 'See engagement models', to: '/pricing' },
              },
              {
                title: 'Long-term partnership available',
                desc: 'Many clients retain us on an ongoing advisory basis — for model monitoring, regulatory updates, or continued development as your AI program matures.',
                link: { label: 'Learn more', to: '/pricing' },
              },
            ].map(item => (
              <div key={item.title} className="quick-start__item">
                <div className="quick-start__visual" />
                <h3 className="quick-start__title">{item.title}</h3>
                <p className="quick-start__desc">{item.desc}</p>
                {item.link && (
                  <Link to={item.link.to} className="quick-start__link">
                    {item.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────── */}
      <section className="savings alt-bg">
        <div className="container">
          <p className="section-label">Industries we serve</p>
          <div className="savings__grid">
            {[
              {
                title: 'Hedge Funds & Trading Firms',
                desc: 'Alpha research, systematic strategy development, execution optimization, and real-time risk AI for quantitative and discretionary managers.',
                link: { label: 'Learn more', to: '/features' },
              },
              {
                title: 'Investment Banks & Asset Managers',
                desc: 'Research automation, document intelligence, client analytics, and risk modeling for global banks and large asset management platforms.',
                link: { label: 'Learn more', to: '/features' },
              },
              {
                title: 'FinTech, Family Offices & Wealth Management',
                desc: 'From early-stage FinTechs embedding AI into their core product to family offices seeking institutional-grade intelligence — we meet you where you are.',
                link: { label: 'Learn more', to: '/features' },
              },
            ].map(item => (
              <div key={item.title} className="savings__item">
                <h3 className="savings__title">{item.title}</h3>
                <p className="savings__desc">{item.desc}</p>
                {item.link && (
                  <Link to={item.link.to} className="savings__link">
                    {item.link.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────────────── */}
      <section className="manage">
        <div className="container">
          <p className="section-label" style={{ marginBottom: 48 }}>Our commitment to clients</p>
          <div className="manage__grid">
            {[
              {
                label: 'Full confidentiality',
                desc: 'Every engagement begins with a mutual NDA. We have never disclosed — and will never disclose — client information.',
              },
              {
                label: 'No conflicts of interest',
                desc: 'We don\'t take equity or fees from the technology vendors we recommend. Our advice is always independent.',
              },
              {
                label: 'Senior delivery',
                desc: 'No bait-and-switch. The senior practitioners who scope the engagement lead the delivery. Juniors support; they don\'t run.',
              },
              {
                label: 'Outcome-focused',
                desc: 'We price to outcomes, not hours. If a project doesn\'t deliver, we don\'t invoice. That\'s the commitment.',
              },
            ].map(item => (
              <div key={item.label} className="manage__item">
                <p className="manage__item-label">{item.label}</p>
                <p className="manage__item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Trust ────────────────────────────────────────────────────── */}
      <section className="security alt-bg">
        <div className="container">
          <p className="section-label">Where others cut corners, we don't.</p>
          <div className="security__grid">
            {[
              {
                icon: <ShieldIcon />,
                title: 'Regulatory-first by design',
                desc: 'Every model we build is documented for SR 11-7, MRM review, and regulator examination. Compliance isn\'t a constraint — it\'s how we build.',
              },
              {
                icon: <LockIcon />,
                title: 'Data never leaves your environment',
                desc: 'We work inside your infrastructure. Proprietary data, trading signals, and client information stay behind your firewall — always.',
              },
              {
                icon: <LogIcon />,
                title: 'Full explainability and auditability',
                desc: 'We don\'t deploy black boxes. Every model we deliver includes documentation, explainability outputs, and ongoing monitoring frameworks.',
              },
            ].map(item => (
              <div key={item.title} className="security__item">
                <div className="security__item-icon">{item.icon}</div>
                <h3 className="security__title">{item.title}</h3>
                <p className="security__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Press ────────────────────────────────────────────────────── */}
      <section className="press">
        <div className="container">
          <p className="section-label">Recognition</p>
          <div className="press__items">
            {[
              { source: 'Financial Times', headline: 'The consultants helping Wall Street navigate the AI revolution' },
              { source: 'Risk.net', headline: 'Uncompromised named top AI advisor for buy-side firms' },
              { source: 'Bloomberg', headline: 'How elite AI consultants are reshaping quant finance' },
            ].map(item => (
              <div key={item.headline} className="press__item">
                <p className="press__source">{item.source}</p>
                <p className="press__headline">{item.headline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark CTA ─────────────────────────────────────────────────── */}
      <section className="cta-dark">
        <div className="container">
          <h2 className="cta-dark__heading">
            Ready to build AI your institution can stand behind?
          </h2>
          <div className="cta-dark__actions">
            <Link to="/about" className="btn btn--light btn--lg">Start a conversation</Link>
            <Link to="/features" className="btn btn--ghost-light btn--lg">Explore our services</Link>
          </div>
        </div>
      </section>

      {/* ── Engagement tiers ─────────────────────────────────────────── */}
      <section className="tiers">
        <div className="container">
          <div className="tiers__grid">
            <div className="tier">
              <h3 className="tier__title">Project-based engagements</h3>
              <p className="tier__desc">
                Scoped delivery for a defined objective — a model build, a strategy review, or a technical assessment. Fixed scope, fixed timeline, clear outcomes.
              </p>
              <Link to="/pricing" className="tier__link">See engagement types →</Link>
            </div>
            <div className="tier">
              <h3 className="tier__title">Advisory retainer</h3>
              <p className="tier__desc">
                Ongoing senior-level AI advisory for firms navigating continuous change — regulatory shifts, new model deployments, or scaling an internal AI program.
              </p>
              <Link to="/about" className="tier__link">Talk to our team →</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M8 1l5 2v4c0 3-2.5 5.5-5 7C5.5 12.5 3 10 3 7V3l5-2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="3" y="7" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function LogIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5 5.5h6M5 8h6M5 10.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
