import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FeaturesViz } from '../components/PageViz'

const serviceSections = [
  {
    id: 'ai-strategy',
    label: 'AI Strategy & Advisory',
    title: 'Know where to go before you start moving.',
    sub: 'The biggest risk in AI isn\'t building the wrong model — it\'s building the right model in the wrong context. We help your firm establish the strategic foundation that makes every subsequent AI investment defensible and compounding.',
    features: [
      { title: 'AI Readiness Assessment', desc: 'An honest, independent evaluation of your data infrastructure, talent, technology, and organizational readiness for AI — with no vendor agenda.' },
      { title: 'Use Case Prioritization', desc: 'We map your business against the AI opportunity landscape and score use cases by ROI potential, regulatory complexity, and feasibility — so you invest where it matters most.' },
      { title: 'AI Governance Framework', desc: 'Board-ready governance structures covering model ownership, change management, oversight responsibilities, and escalation paths for AI failures.' },
      { title: 'Vendor & Model Evaluation', desc: 'Independent, rigorous evaluation of AI vendors, foundation models, and platform providers — with no referral fees or commercial relationships distorting our analysis.' },
      { title: 'Regulatory Strategy', desc: 'Forward-looking guidance on SEC, FINRA, MiFID II, FCA, ESMA, and Basel III AI requirements — including how to structure your program to meet anticipated future regulation.' },
      { title: 'Build vs. Buy Analysis', desc: 'Structured decision frameworks for whether a capability should be built internally, acquired, or sourced from a vendor — with total cost of ownership analysis.' },
    ],
  },
  {
    id: 'model-development',
    label: 'Custom Model Development',
    title: 'Models that perform in production, not just backtests.',
    sub: 'We build AI and ML models for the real-world complexity of financial data: sparse signals, non-stationary distributions, regulatory constraints, and infrastructure that can\'t afford to fail.',
    features: [
      { title: 'Alpha & Signal Research', desc: 'Design and development of predictive models for equity, fixed income, FX, and derivatives — from factor research to ensemble ML strategies.' },
      { title: 'Portfolio Optimization AI', desc: 'Constrained optimization models incorporating risk, liquidity, transaction costs, regulatory limits, and ESG considerations with ML-enhanced return forecasts.' },
      { title: 'NLP on Financial Documents', desc: 'Production-grade NLP pipelines for earnings transcripts, SEC filings, analyst reports, news, and alternative text data — structured for alpha extraction and risk detection.' },
      { title: 'LLM Integration', desc: 'Design and deployment of LLM workflows tailored to financial data: structured output extraction, retrieval-augmented generation on proprietary knowledge bases, and agentic research tools.' },
      { title: 'Real-Time Risk Models', desc: 'Low-latency risk calculation engines and market microstructure models for trading desks, risk management, and margin estimation.' },
      { title: 'Credit & Default Models', desc: 'Machine learning models for credit risk, probability of default, and loss-given-default — designed for interpretability and regulatory review.' },
    ],
  },
  {
    id: 'compliance',
    label: 'Regulatory & Compliance AI',
    title: 'AI that performs and survives regulatory scrutiny.',
    sub: 'A model your regulator can\'t understand is a liability, not an asset. Every engagement we lead is built with regulatory defensibility as a first-class requirement.',
    features: [
      { title: 'SR 11-7 / Model Risk Management', desc: 'Complete model risk management frameworks: conceptual soundness documentation, independent validation, ongoing monitoring, and model inventory governance.' },
      { title: 'AI Compliance Assessment', desc: 'Independent review of existing AI systems for compliance gaps across relevant regulatory frameworks — with a prioritized remediation roadmap.' },
      { title: 'Explainability & Documentation', desc: 'Post-hoc explainability frameworks (SHAP, LIME, attention analysis) and human-readable model cards designed to satisfy regulators and internal audit.' },
      { title: 'AML & Transaction Monitoring', desc: 'ML-enhanced anti-money laundering models that improve detection rates while reducing false positives — built with BSA/AML compliance embedded from design.' },
      { title: 'Trade Surveillance AI', desc: 'Pattern detection models for market manipulation, spoofing, layering, and wash trading — with alert management workflows for compliance teams.' },
      { title: 'Data Governance for AI', desc: 'Data lineage, provenance tracking, and input validation frameworks that satisfy both model risk management and data privacy requirements.' },
    ],
  },
  {
    id: 'due-diligence',
    label: 'Technical Due Diligence',
    title: 'Independent assessment you can rely on.',
    sub: 'Whether you\'re evaluating an acquisition, an investment, or a technology vendor, you need an independent expert who can read the code, interrogate the data, and tell you the truth.',
    features: [
      { title: 'AI-Driven Company Diligence', desc: 'Deep technical assessment of AI-centric companies: model validity, data quality, infrastructure scalability, team capability, and the gap between marketing claims and reality.' },
      { title: 'ML Infrastructure Review', desc: 'Evaluation of ML platforms, data pipelines, training infrastructure, and deployment architecture for scalability, reliability, and operational risk.' },
      { title: 'Model Performance Validation', desc: 'Independent backtesting, walk-forward analysis, and stress testing of quantitative strategies and ML models — including regime analysis and tail risk characterization.' },
      { title: 'Vendor Technology Evaluation', desc: 'Assessment of AI platform vendors, data providers, and technology partners — covering capability, roadmap credibility, financial stability, and integration complexity.' },
      { title: 'Competitive Intelligence', desc: 'Structured analysis of competitor AI capabilities and technology strategy for strategic planning and competitive positioning.' },
      { title: 'Expert Witness & Litigation Support', desc: 'Expert opinions and testimony in disputes involving AI systems, algorithmic trading, model failure, and financial technology — available in the US and UK.' },
    ],
  },
]

const caseStudies = [
  {
    tag: 'Hedge Fund',
    title: 'NLP alpha signal for systematic equity manager',
    result: '+40bps annual Sharpe improvement',
    desc: 'Built a production NLP pipeline on earnings call transcripts and 10-K filings for a $4B systematic equity fund. Delivered SR 11-7 documentation and integrated with existing risk systems.',
  },
  {
    tag: 'Investment Bank',
    title: 'AI governance framework for a global bank\'s trading AI',
    result: 'Passed regulatory examination first attempt',
    desc: 'Designed and implemented a comprehensive model risk management framework for 14 ML models across three trading desks, including model cards, validation reports, and ongoing monitoring dashboards.',
  },
  {
    tag: 'FinTech',
    title: 'Credit risk model for alternative lending platform',
    result: '22% reduction in default rate vs. prior model',
    desc: 'Developed an ML credit risk model incorporating alternative data sources for a Series B FinTech lender, with full regulatory documentation and fair lending analysis.',
  },
  {
    tag: 'Family Office',
    title: 'AI-powered portfolio monitoring and reporting',
    result: '80% reduction in reporting time',
    desc: 'Built an LLM-powered reporting system that automatically generates weekly portfolio commentary, risk attribution, and manager summaries from raw portfolio data.',
  },
  {
    tag: 'Wealth Management',
    title: 'Client intelligence platform for private bank',
    result: '3× increase in advisor productivity',
    desc: 'Designed a client profiling and next-best-action system that surfaces personalized product recommendations and risk alerts for relationship managers, with full GDPR compliance.',
  },
  {
    tag: 'Trading Firm',
    title: 'Technical due diligence for systematic strategy acquisition',
    result: '$200M acquisition decision supported',
    desc: 'Provided independent technical diligence on an acquisition target\'s systematic trading strategies, data infrastructure, and team capability. Identified critical risks and negotiated protections.',
  },
]

export default function Features() {
  const location = useLocation()
  const highlightRef = useRef<string | null>(null)

  useEffect(() => {
    const hash = location.hash.replace('#', '')
    if (!hash) return

    // Small delay lets the page render before scrolling
    const timer = setTimeout(() => {
      const el = document.getElementById(hash)
      if (!el) return

      const navHeight = 72
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 24
      window.scrollTo({ top, behavior: 'smooth' })

      // Trigger highlight — remove previous, force reflow, re-add
      if (highlightRef.current) {
        document.getElementById(highlightRef.current)?.classList.remove('section--highlighted')
      }
      el.classList.remove('section--highlighted')
      void el.offsetWidth // reflow
      el.classList.add('section--highlighted')
      highlightRef.current = hash
    }, 80)

    return () => clearTimeout(timer)
  }, [location.hash])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <FeaturesViz />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="page-hero__label">Our Services</p>
          <h1 className="page-hero__title">
            What we do, and how we do it
          </h1>
          <p className="page-hero__sub">
            Four practice areas. Each built around a specific challenge financial institutions face when adopting AI at an institutional level.
          </p>
        </div>
      </section>

      {/* ── Service sections ─────────────────────────────────────────── */}
      {serviceSections.map((section, i) => (
        <section
          key={section.label}
          id={section.id}
          className="features-section"
          style={i % 2 === 1 ? { background: 'var(--c-bg-alt)' } : {}}
        >
          <div className="container">
            <div className="features-section__inner">
              <div className="features-section__meta">
                <p className="features-section__label">{section.label}</p>
                <h2 className="features-section__title">{section.title}</h2>
                <p className="features-section__sub">{section.sub}</p>
                <Link to="/about" className="quick-start__link" style={{ display: 'inline-block', marginTop: 20 }}>
                  Discuss this service →
                </Link>
              </div>
              <div className="features-list">
                {section.features.map(f => (
                  <div key={f.title} className="features-list-item">
                    <p className="features-list-item__title">{f.title}</p>
                    <p className="features-list-item__desc">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── Case studies ─────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-y) 0', borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <p className="section-label">Selected work</p>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>
            Results from recent engagements
          </h2>
          <p style={{ fontSize: 14, color: 'var(--c-text-3)', marginBottom: 48, marginTop: 8, fontStyle: 'italic' }}>
            Client names withheld under NDA. Details accurate and available under signed confidentiality agreement.
          </p>
          <div className="blog-grid__posts">
            {caseStudies.map(cs => (
              <article key={cs.title} className="blog-post" style={{ cursor: 'default' }}>
                <div className="blog-post__body">
                  <p className="blog-post__tag">{cs.tag}</p>
                  <h2 className="blog-post__title">{cs.title}</h2>
                  <p style={{
                    fontSize: 13, fontWeight: 600, color: 'var(--c-text)',
                    background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)',
                    borderRadius: 6, padding: '5px 10px', display: 'inline-block',
                    marginBottom: 12, letterSpacing: '-0.01em',
                  }}>
                    {cs.result}
                  </p>
                  <p className="blog-post__excerpt">{cs.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ───────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-y) 0', background: 'var(--c-bg-alt)', borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <p className="section-label">Industries</p>
          <h2 className="section-heading" style={{ marginBottom: 48 }}>
            Financial services expertise, end to end
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'var(--c-border)', border: '1px solid var(--c-border)', borderRadius: 12, overflow: 'hidden' }}>
            {[
              { name: 'Investment Banks', desc: 'Deal intelligence, research automation, trading AI, and enterprise risk management.' },
              { name: 'Hedge Funds', desc: 'Alpha research, systematic strategies, portfolio optimization, and fund analytics.' },
              { name: 'Proprietary Trading', desc: 'Execution AI, microstructure models, and real-time signal research for HFT and mid-frequency.' },
              { name: 'FinTech Companies', desc: 'Embedded AI for credit, fraud, payments, compliance, and customer intelligence.' },
              { name: 'Family Offices', desc: 'Bespoke portfolio intelligence, reporting automation, and manager due diligence tools.' },
              { name: 'Wealth & Asset Management', desc: 'Client analytics, personalization, regulatory reporting, and advisor productivity AI.' },
            ].map(ind => (
              <div key={ind.name} style={{
                padding: '28px 32px', background: 'var(--c-bg)',
                transition: 'background 150ms ease',
              }}>
                <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--c-text)', marginBottom: 8, letterSpacing: '-0.01em' }}>{ind.name}</p>
                <p style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="cta-dark">
        <div className="container">
          <h2 className="cta-dark__heading">Ready to talk about your project?</h2>
          <div className="cta-dark__actions">
            <Link to="/about" className="btn btn--light btn--lg">Start a conversation</Link>
            <Link to="/pricing" className="btn btn--ghost-light btn--lg">View engagement models</Link>
          </div>
        </div>
      </section>
    </>
  )
}
