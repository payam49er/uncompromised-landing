import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { BlogViz } from '../components/PageViz'

const emailSchema = z.string().email('Please enter a valid work email address')

// ─── Featured Due Diligence article ──────────────────────────────────────────

const dueDiligenceArticle = {
  tag: 'Due Diligence',
  title: 'AI Agents for Due Diligence & KYC: Faster, Smarter, and More Effective Onboarding',
  date: 'April 7, 2026',
  readTime: '12 min read',
  intro: 'Due diligence and Know Your Customer (KYC) processes remain among the biggest operational bottlenecks for hedge funds, trading firms, asset managers, and banks. Manual reviews, fragmented data sources, high false positives, and increasing regulatory expectations are driving up costs and slowing down capital raising and client onboarding. At uncompromised.ai, we design and deploy intelligent AI Agents that automate and enhance due diligence and KYC workflows — delivering institutional-grade accuracy, speed, and compliance while significantly reducing manual effort.',
  painPoints: [
    'Time-intensive manual screening and document verification',
    'Poor entity resolution across disparate data sources',
    'High volumes of false positives in sanctions, PEP, and adverse media checks',
    'Difficulty maintaining continuous monitoring after onboarding',
    'Inconsistent risk scoring and limited audit transparency',
    'Scaling processes as your investor base or trading counterparties grow',
  ],
  solutions: [
    {
      number: '01',
      title: 'Intelligent Onboarding Agents',
      desc: 'Multi-agent systems that automatically ingest client documents, extract key information, verify identities, and perform initial risk assessments — completing 80% of the work before a human reviewer steps in.',
    },
    {
      number: '02',
      title: 'Advanced Screening & Risk Intelligence',
      desc: 'AI Agents that screen against global sanctions, watchlists, PEPs, and adverse media using real-time data. They perform deep entity resolution and link analysis to uncover hidden relationships and beneficial ownership.',
    },
    {
      number: '03',
      title: 'Continuous Monitoring Agents',
      desc: 'Post-onboarding agents that run 24/7 surveillance, alerting compliance teams only on material changes or elevated risks — dramatically reducing alert fatigue.',
    },
    {
      number: '04',
      title: 'Enhanced Due Diligence for Investors & Counterparties',
      desc: 'Specialized agents for investor due diligence, fund-level reviews, and trading counterparty assessments. They analyze financial statements, track records, litigation history, and ESG factors with explainable outputs.',
    },
    {
      number: '05',
      title: 'Audit-Ready Documentation & Workflow',
      desc: 'Every decision is logged with full transparency and source citations. Generative AI automatically drafts KYC summaries, risk memos, and regulatory reports for seamless audit and examination readiness.',
    },
    {
      number: '06',
      title: 'Secure, Compliant Deployment',
      desc: 'All agents are deployed on-prem, in private cloud, or hybrid — with human-in-the-loop oversight, fine-tuned on financial domain data, and aligned to AML, FATF, SEC, and other regulatory standards.',
    },
  ],
  impact: [
    '60–85% reduction in manual KYC processing time',
    '50%+ fewer false positive alerts',
    'Faster client and investor onboarding — days instead of weeks',
    'Stronger risk detection and fewer compliance breaches',
    'Lower compliance headcount costs with better audit outcomes',
  ],
  cta: 'Contact uncompromised.ai today for a complimentary Due Diligence & KYC AI Assessment. We\'ll review your current workflow and deliver a prioritized roadmap with clear ROI projections.',
}

// ─── Featured LLMs in Finance article ────────────────────────────────────────

const llmArticle = {
  tag: 'LLMs in Finance',
  title: 'LLM-Powered Workflows for Financial Institutions: Unlock Productivity and Intelligence at Scale',
  date: 'April 14, 2026',
  readTime: '11 min read',
  intro: 'Large Language Models are transforming how financial institutions operate — from research and decision-making to compliance and client communications. Yet many hedge funds, trading firms, and banks struggle to move beyond experimental pilots to secure, production-grade LLM deployments. At uncompromised.ai, we help financial institutions integrate LLMs safely and effectively into real business workflows, delivering measurable productivity gains while meeting strict security, compliance, and governance standards.',
  painPoints: [
    'Security and data privacy concerns with sensitive trading or client data',
    'Hallucinations and lack of reliability in high-stakes environments',
    'Integration with legacy systems and existing workflows',
    'Regulatory and model risk governance requirements',
    'Difficulty measuring ROI and scaling successful use cases',
  ],
  solutions: [
    {
      number: '01',
      title: 'Intelligent Research & Market Intelligence',
      desc: 'LLM agents that summarize earnings calls, news flow, research reports, and alternative data in real time — with source citations and customizable depth for portfolio managers and analysts.',
    },
    {
      number: '02',
      title: 'Automated Document Workflows',
      desc: 'Contract review and red-flag detection, instant summarization of offering memorandums and regulatory filings, and automated generation of investor reports with consistent tone and branding.',
    },
    {
      number: '03',
      title: 'Compliance & Regulatory Intelligence',
      desc: 'LLMs that monitor regulatory updates, map new rules to internal policies, and draft responses to regulator queries — combined with RAG for hallucination-resistant, always-accurate outputs.',
    },
    {
      number: '04',
      title: 'Internal Knowledge Assistant',
      desc: 'Secure, private chatbots that answer questions across your firm\'s policies, trade history, research library, and meeting notes — dramatically reducing search time for traders and operations teams.',
    },
    {
      number: '05',
      title: 'Code & Quant Productivity',
      desc: 'LLM-assisted code generation, documentation, and debugging for Python/R quant libraries, pricing models, and data pipelines — accelerating development while maintaining version control and review.',
    },
    {
      number: '06',
      title: 'Client & Investor Communications',
      desc: 'Personalized, timely client updates, ESG reports, and performance commentaries generated in natural language while preserving full data accuracy and compliance oversight.',
    },
  ],
  impact: [
    '40–70% reduction in time spent on research and documentation',
    '3–5× faster regulatory response and reporting cycles',
    'Significant boost in analyst and PM productivity',
    'Higher quality, more consistent client communications',
    'Faster model development cycles for quant teams',
  ],
  cta: 'Contact uncompromised.ai today for a complimentary LLM Opportunity Assessment. We\'ll identify your highest-ROI use cases and deliver a practical 90-day implementation roadmap.',
}

// ─── Featured Regulation article ─────────────────────────────────────────────

const regulationArticle = {
  tag: 'Regulation',
  title: 'AI-Powered Compliance for Hedge Funds & Trading Firms: Turn Regulation into a Competitive Edge',
  date: 'May 12, 2026',
  readTime: '13 min read',
  intro: 'Regulatory demands on hedge funds and proprietary trading firms continue to intensify. SEC Rule 606/607, Form PF, CFTC reporting, AML/KYC obligations, trade surveillance, market abuse detection, and Model Risk Management requirements are consuming more time, headcount, and budget than ever. Most smaller and mid-sized firms still rely on manual processes and fragmented tools — creating high costs, human error, and regulatory risk. At uncompromised.ai, we help hedge funds and trading firms transform compliance from a costly burden into an automated, intelligent capability.',
  painPoints: [
    'Overwhelming manual trade surveillance and false positives',
    'Time-consuming regulatory reporting and documentation',
    'Difficult AML/KYC screening at scale',
    'Model governance and explainability requirements',
    'Audit readiness and record-keeping obligations',
    'Rapidly evolving regulations across multiple jurisdictions',
  ],
  solutions: [
    {
      number: '01',
      title: 'Intelligent Trade Surveillance',
      desc: 'AI models detect market manipulation, layering, spoofing, and wash trading with far higher accuracy and fewer false positives than traditional rules-based systems. Real-time alerts with clear explainability help compliance teams act fast.',
    },
    {
      number: '02',
      title: 'Automated Regulatory Reporting',
      desc: 'Generative AI and NLP automatically extract, validate, and populate Form PF, 13F, 13H, CFTC reports, and other filings. Our solutions cut reporting cycles from weeks to days while maintaining full audit trails.',
    },
    {
      number: '03',
      title: 'AML/KYC & Onboarding Automation',
      desc: 'Advanced entity resolution, beneficial ownership detection, and risk scoring using machine learning. Screen against global watchlists with continuous monitoring and reduced manual review.',
    },
    {
      number: '04',
      title: 'Model Risk & Governance',
      desc: 'Automated validation, drift detection, and documentation for AI/ML trading models — helping you meet SR 11-7, SS1/23, and SEC expectations with confidence.',
    },
    {
      number: '05',
      title: 'Document Intelligence & Audit Support',
      desc: 'LLM-powered systems review contracts, policies, and communications for regulatory red flags. Instant search across years of records for regulators or internal audits.',
    },
    {
      number: '06',
      title: 'Proactive Regulatory Monitoring',
      desc: 'Continuous horizon scanning across SEC, CFTC, FCA, ESMA, and other regulators — with plain-language impact assessments delivered to your compliance team automatically.',
    },
  ],
  impact: [
    '50–75% reduction in compliance operational workload',
    '40–60% fewer false positive alerts in surveillance',
    'Faster onboarding and lower compliance headcount costs',
    'Stronger audit outcomes and smoother regulatory examinations',
    'Proactive risk identification before issues escalate',
  ],
  cta: 'Contact uncompromised.ai today for a complimentary Compliance AI Maturity Assessment. We\'ll analyze your current pain points and provide a clear, prioritized roadmap with expected ROI.',
}

// ─── Featured Strategy article ───────────────────────────────────────────────

const strategyArticle = {
  tag: 'Strategy',
  title: 'AI Strategy for Small and Medium-Sized Hedge Funds: Level the Playing Field',
  date: 'May 5, 2026',
  readTime: '12 min read',
  intro: 'Small and mid-sized hedge funds face a growing challenge: the world\'s largest players are pouring billions into AI, creating a widening technology gap in alpha generation, risk management, and operations. Yet most smaller funds lack the internal expertise, infrastructure, or budget to build sophisticated AI capabilities from scratch. At uncompromised.ai, we help small and medium-sized hedge funds design and implement practical, high-ROI AI strategies that deliver institutional-grade results without enterprise-level costs.',
  painPoints: [
    'Limited data science talent and high hiring costs',
    'Constrained compute budgets and legacy technology',
    'Pressure to compete on performance while controlling operational expenses',
    'Increasing regulatory and investor demands for transparency and risk controls',
  ],
  pillars: [
    {
      number: '01',
      title: 'Alpha Generation & Signal Discovery',
      bullets: [
        'Alternative data ingestion and NLP models for news, earnings calls, and social sentiment',
        'ML and deep learning models that identify non-linear patterns traditional quant approaches miss',
        'Ensemble models combining your existing signals with AI-enhanced predictions',
      ],
    },
    {
      number: '02',
      title: 'Portfolio Construction & Risk Management',
      bullets: [
        'AI-powered optimization that handles non-convex problems and tail risks better than classic mean-variance',
        'Real-time risk monitoring with anomaly detection and scenario generation',
        'Stress testing and drawdown prediction using generative AI and simulation',
      ],
    },
    {
      number: '03',
      title: 'Operational Efficiency',
      bullets: [
        'Automated trade reconciliation, TCA, and reporting',
        'Intelligent compliance monitoring and regulatory filing support',
        'Document processing and knowledge management using LLMs',
      ],
    },
    {
      number: '04',
      title: 'Execution & Infrastructure',
      bullets: [
        'Low-latency AI trading signals and execution algorithms',
        'Secure, cost-efficient cloud or hybrid infrastructure — no GPU farm required',
        'Model monitoring and automated retraining pipelines to prevent decay',
      ],
    },
  ],
  impact: [
    '15–40% improvement in signal Sharpe ratios',
    '30–60% reduction in manual operational workload',
    'Faster decision-making and reduced risk exposure',
    'Professional-grade technology that strengthens LP due diligence',
  ],
  whyUs: [
    'Senior quants and AI engineers on every engagement — not juniors',
    'Transparent pricing with no hidden infrastructure markups',
    'Knowledge transfer so your team owns the strategy long-term',
    'Solutions that are practical, not academic',
  ],
  cta: 'Contact uncompromised.ai today for a complimentary AI Strategy Assessment. We\'ll review your current setup and deliver a customized roadmap with clear priorities and expected ROI.',
}

// ─── Featured FRTB article ────────────────────────────────────────────────────

const frtbArticle = {
  tag: 'Risk Management',
  title: 'Unlocking FRTB Compliance with AI: Capital Efficiency at Scale',
  date: 'April 21, 2026',
  readTime: '15 min read',
  intro: 'The Fundamental Review of the Trading Book (FRTB) is reshaping market risk. With its demanding Expected Shortfall calculations, strict PLAT tests, NMRF capital charges, and dual SA/IMA requirements, traditional approaches are proving too slow, expensive, and rigid for today\'s banks. At uncompromised.ai, we turn FRTB complexity into a strategic advantage.',
  painPoints: [
    'Massive computational demands for full revaluations',
    'Persistent PLAT failures on hedged portfolios',
    'Punitive NMRF treatment due to poor proxy modeling',
    'Data quality gaps and lengthy reporting cycles',
  ],
  solutions: [
    {
      title: 'Intelligent Automation',
      desc: 'ML-driven data pipelines with anomaly detection and synthetic gap-filling cut reconciliation effort by up to 70% while ensuring full audit traceability.',
    },
    {
      title: 'Faster SA & Sensitivities',
      desc: 'AI surrogate models and smart mapping algorithms deliver rapid, explainable sensitivities and Standardized Approach calculations at a fraction of the usual compute cost.',
    },
    {
      title: 'Superior IMA Performance',
      bullets: [
        'Neural networks and gradient boosting dramatically improve PLAT pass rates by capturing non-linear hedging effects.',
        'Smart sampling + ML reduces ES revaluation workload by 90–95%.',
        'Dynamic proxy models minimize NMRF capital add-ons through validated, regulator-ready solutions.',
      ],
    },
    {
      title: 'Capital Optimization & Governance',
      desc: 'Real-time "what-if" simulations, SHAP attribution, and generative AI for automated reporting and documentation.',
    },
  ],
  impact: [
    '30–50% lower computational costs',
    'Meaningful reduction in market risk capital',
    'Accelerated timelines and smoother regulatory approval',
    'Actionable risk intelligence for traders and management',
  ],
  cta: 'Contact uncompromised.ai today for a complimentary FRTB AI Maturity Assessment and tailored ROI roadmap.',
}

const categories = ['All', 'Strategy', 'Regulation', 'Risk Management', 'LLMs in Finance', 'Due Diligence']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const showRegulation   = activeCategory === 'All' || activeCategory === 'Regulation'
  const showFrtb         = activeCategory === 'All' || activeCategory === 'Risk Management'
  const showStrategy     = activeCategory === 'All' || activeCategory === 'Strategy'
  const showLlm          = activeCategory === 'All' || activeCategory === 'LLMs in Finance'
  const showDueDiligence = activeCategory === 'All' || activeCategory === 'Due Diligence'
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    const result = emailSchema.safeParse(email)
    if (!result.success) {
      setEmailError(result.error.errors[0].message)
      return
    }
    setEmailError('')
    setSubscribed(true)
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <BlogViz />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="page-hero__label">Insights</p>
          <h1 className="page-hero__title">
            Research and perspective from the front lines of AI in finance
          </h1>
          <p className="page-hero__sub">
            Practical thinking on AI strategy, model development, regulation, and the real-world complexities of deploying AI in financial institutions.
          </p>
        </div>
      </section>

      {/* ── Posts ────────────────────────────────────────────────────── */}
      <section className="blog-grid">
        <div className="container">
          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  border: '1px solid var(--c-border)',
                  background: activeCategory === cat ? 'var(--c-text)' : 'transparent',
                  color: activeCategory === cat ? 'var(--c-text-inv)' : 'var(--c-text-2)',
                  fontSize: 13,
                  fontWeight: 500,
                  fontFamily: 'var(--font)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Featured articles ──────────────────────────────────── */}
          {showStrategy     && <StrategyArticle />}
          {showRegulation   && <Spaced above={showStrategy}><RegulationArticle /></Spaced>}
          {showLlm          && <Spaced above={showStrategy || showRegulation}><LlmArticle /></Spaced>}
          {showDueDiligence && <Spaced above={showStrategy || showRegulation || showLlm}><DueDiligenceArticle /></Spaced>}
          {showFrtb         && <Spaced above={showStrategy || showRegulation || showLlm || showDueDiligence}><FrtbArticle /></Spaced>}

        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────── */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="blog-newsletter__inner">
            <h2 className="blog-newsletter__title">Stay ahead of the curve</h2>
            <p className="blog-newsletter__sub">
              Get new research, regulatory updates, and practical AI insights delivered to your inbox. Written for financial services professionals — no noise, no generic AI content.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe}>
                <div className="newsletter-form">
                  <input
                    type="email"
                    className={`newsletter-input${emailError ? ' newsletter-input--error' : ''}`}
                    placeholder="your@firm.com"
                    value={email}
                    onChange={e => { setEmail(e.target.value); setEmailError('') }}
                  />
                  <button type="submit" className="btn btn--dark">Subscribe</button>
                </div>
                {emailError && <p className="newsletter-error">{emailError}</p>}
              </form>
            ) : (
              <p style={{ fontSize: 15, color: 'var(--c-text-2)' }}>
                You're subscribed. We'll be in touch at <strong style={{ color: 'var(--c-text)' }}>{email}</strong>.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

// ─── Spacing helper ───────────────────────────────────────────────────────────

function Spaced({ above, children }: { above: boolean; children: React.ReactNode }) {
  return <div style={{ marginTop: above ? 32 : 0 }}>{children}</div>
}

// ─── Due Diligence featured article component ─────────────────────────────────

function DueDiligenceArticle() {
  const a = dueDiligenceArticle
  return (
    <article style={{ border: '1px solid var(--c-border)', borderRadius: 14, background: 'var(--c-bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'var(--c-bg-dark)', padding: 'clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '3px 8px',
          }}>{a.tag}</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{a.date} · {a.readTime}</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500, letterSpacing: '-0.03em',
          lineHeight: 1.15, color: '#fff', marginBottom: 20, maxWidth: 720,
        }}>{a.title}</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 680 }}>{a.intro}</p>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(28px, 4vw, 52px)', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Pain points + impact */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16 }}>
              Key challenges in traditional due diligence & KYC
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.painPoints.map(pt => (
                <li key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-text-3)', flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)', borderRadius: 10, padding: '24px 28px' }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16 }}>
              Tangible results our clients achieve
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.impact.map(item => (
                <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M2.5 7l3 3 6-6" stroke="var(--c-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--c-text)', fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* Solutions grid */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 24 }}>
            How uncompromised.ai deploys AI agents for due diligence & KYC
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1, background: 'var(--c-border)',
            border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden',
          }}>
            {a.solutions.map(sol => (
              <div key={sol.number} style={{ background: 'var(--c-bg-alt)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-3)' }}>{sol.number}</span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', letterSpacing: '-0.01em' }}>{sol.title}</p>
                </div>
                <p style={{ fontSize: 13, color: 'var(--c-text-2)', lineHeight: 1.65 }}>{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* CTA strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--c-text)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              Ready to modernize your due diligence and KYC processes?
            </p>
            <p style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.65 }}>{a.cta}</p>
          </div>
          <Link to="/about" className="btn btn--dark" style={{ flexShrink: 0, padding: '12px 24px' }}>
            Request an assessment →
          </Link>
        </div>

      </div>
    </article>
  )
}

// ─── LLMs in Finance featured article component ───────────────────────────────

function LlmArticle() {
  const a = llmArticle
  return (
    <article style={{ border: '1px solid var(--c-border)', borderRadius: 14, background: 'var(--c-bg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ background: 'var(--c-bg-dark)', padding: 'clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '3px 8px',
          }}>{a.tag}</span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>{a.date} · {a.readTime}</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500, letterSpacing: '-0.03em',
          lineHeight: 1.15, color: '#fff', marginBottom: 20, maxWidth: 720,
        }}>{a.title}</h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 680 }}>{a.intro}</p>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(28px, 4vw, 52px)', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Pain points + impact */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16 }}>
              Common LLM adoption challenges in finance
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.painPoints.map(pt => (
                <li key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--c-text-3)', flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)', borderRadius: 10, padding: '24px 28px' }}>
            <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16 }}>
              Proven results
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.impact.map(item => (
                <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M2.5 7l3 3 6-6" stroke="var(--c-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--c-text)', fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* Solutions grid */}
        <div>
          <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 24 }}>
            How uncompromised.ai builds production LLM solutions
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1, background: 'var(--c-border)',
            border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden',
          }}>
            {a.solutions.map(sol => (
              <div key={sol.number} style={{ background: 'var(--c-bg-alt)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-3)' }}>{sol.number}</span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', letterSpacing: '-0.01em' }}>{sol.title}</p>
                </div>
                <p style={{ fontSize: 13, color: 'var(--c-text-2)', lineHeight: 1.65 }}>{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* CTA strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--c-text)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              Ready to make LLMs a true business advantage?
            </p>
            <p style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.65 }}>{a.cta}</p>
          </div>
          <Link to="/about" className="btn btn--dark" style={{ flexShrink: 0, padding: '12px 24px' }}>
            Request an assessment →
          </Link>
        </div>

      </div>
    </article>
  )
}

// ─── Regulation featured article component ────────────────────────────────────

function RegulationArticle() {
  const a = regulationArticle
  const hasPrev = false // no article above this one in this category
  void hasPrev
  return (
    <article style={{
      border: '1px solid var(--c-border)',
      borderRadius: 14,
      background: 'var(--c-bg)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--c-bg-dark)',
        padding: 'clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 4, padding: '3px 8px',
          }}>
            {a.tag}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            {a.date} · {a.readTime}
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500,
          letterSpacing: '-0.03em', lineHeight: 1.15,
          color: '#fff', marginBottom: 20, maxWidth: 720,
        }}>
          {a.title}
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 680 }}>
          {a.intro}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(28px, 4vw, 52px)', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Pain points + impact */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16,
            }}>
              Key compliance challenges we solve
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.painPoints.map(pt => (
                <li key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%', background: 'var(--c-text-3)',
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)',
            borderRadius: 10, padding: '24px 28px',
          }}>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16,
            }}>
              Real results our clients achieve
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.impact.map(item => (
                <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M2.5 7l3 3 6-6" stroke="var(--c-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--c-text)', fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* Solutions grid */}
        <div>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 24,
          }}>
            How uncompromised.ai delivers AI-driven compliance
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1, background: 'var(--c-border)',
            border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden',
          }}>
            {a.solutions.map(sol => (
              <div key={sol.number} style={{ background: 'var(--c-bg-alt)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-3)' }}>{sol.number}</span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', letterSpacing: '-0.01em' }}>
                    {sol.title}
                  </p>
                </div>
                <p style={{ fontSize: 13, color: 'var(--c-text-2)', lineHeight: 1.65 }}>{sol.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* CTA strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--c-text)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              Ready to make compliance smarter and cheaper?
            </p>
            <p style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.65 }}>
              {a.cta}
            </p>
          </div>
          <Link
            to="/about"
            className="btn btn--dark"
            style={{ flexShrink: 0, padding: '12px 24px' }}
          >
            Request an assessment →
          </Link>
        </div>

      </div>
    </article>
  )
}

// ─── Strategy featured article component ─────────────────────────────────────

function StrategyArticle() {
  const a = strategyArticle
  return (
    <article style={{
      border: '1px solid var(--c-border)',
      borderRadius: 14,
      background: 'var(--c-bg)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'var(--c-bg-dark)',
        padding: 'clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 4, padding: '3px 8px',
          }}>
            {a.tag}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            {a.date} · {a.readTime}
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500,
          letterSpacing: '-0.03em', lineHeight: 1.15,
          color: '#fff', marginBottom: 20, maxWidth: 720,
        }}>
          {a.title}
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 680 }}>
          {a.intro}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(28px, 4vw, 52px)', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Pain points + impact side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16,
            }}>
              The reality for smaller hedge funds
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.painPoints.map(pt => (
                <li key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%', background: 'var(--c-text-3)',
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)',
            borderRadius: 10, padding: '24px 28px',
          }}>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16,
            }}>
              Measurable results our clients see
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.impact.map(item => (
                <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M2.5 7l3 3 6-6" stroke="var(--c-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--c-text)', fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* Strategy pillars */}
        <div>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 24,
          }}>
            How we build winning AI strategies
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 1, background: 'var(--c-border)',
            border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden',
          }}>
            {a.pillars.map(pillar => (
              <div key={pillar.number} style={{ background: 'var(--c-bg-alt)', padding: '22px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--c-text-3)' }}>{pillar.number}</span>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', letterSpacing: '-0.01em' }}>
                    {pillar.title}
                  </p>
                </div>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                  {pillar.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{
                        width: 4, height: 4, borderRadius: '50%', background: 'var(--c-text-3)',
                        flexShrink: 0, marginTop: 7,
                      }} />
                      <span style={{ fontSize: 13, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* Why us */}
        <div>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16,
          }}>
            Why partner with uncompromised.ai
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 40px' }}>
            {a.whyUs.map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                  <path d="M2.5 7l3 3 6-6" stroke="var(--c-text-3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* CTA strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--c-text)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              Ready to build your fund's AI advantage?
            </p>
            <p style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.65 }}>
              {a.cta}
            </p>
          </div>
          <Link
            to="/about"
            className="btn btn--dark"
            style={{ flexShrink: 0, padding: '12px 24px' }}
          >
            Request an assessment →
          </Link>
        </div>

      </div>
    </article>
  )
}

// ─── FRTB featured article component ─────────────────────────────────────────

function FrtbArticle() {
  const a = frtbArticle
  return (
    <article style={{
      border: '1px solid var(--c-border)',
      borderRadius: 14,
      background: 'var(--c-bg)',
      overflow: 'hidden',
    }}>
      {/* Header bar */}
      <div style={{
        background: 'var(--c-bg-dark)',
        padding: 'clamp(32px, 4vw, 52px) clamp(28px, 4vw, 52px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 4, padding: '3px 8px',
          }}>
            {a.tag}
          </span>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            {a.date} · {a.readTime}
          </span>
        </div>
        <h2 style={{
          fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 500,
          letterSpacing: '-0.03em', lineHeight: 1.15,
          color: '#fff', marginBottom: 20, maxWidth: 720,
        }}>
          {a.title}
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 680 }}>
          {a.intro}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: 'clamp(28px, 4vw, 52px)', display: 'flex', flexDirection: 'column', gap: 40 }}>

        {/* Why traditional FRTB programs struggle */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16,
            }}>
              Why traditional FRTB programs struggle
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.painPoints.map(pt => (
                <li key={pt} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%', background: 'var(--c-text-3)',
                    flexShrink: 0, marginTop: 7,
                  }} />
                  <span style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact metrics */}
          <div style={{
            background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)',
            borderRadius: 10, padding: '24px 28px',
          }}>
            <p style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 16,
            }}>
              Tangible business impact
            </p>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.impact.map(item => (
                <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 3 }}>
                    <path d="M2.5 7l3 3 6-6" stroke="var(--c-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span style={{ fontSize: 14, color: 'var(--c-text)', fontWeight: 500, lineHeight: 1.5 }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* Solutions */}
        <div>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: '0.07em',
            textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 24,
          }}>
            How uncompromised.ai delivers results
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--c-border)', border: '1px solid var(--c-border)', borderRadius: 10, overflow: 'hidden' }}>
            {a.solutions.map(sol => (
              <div key={sol.title} style={{ background: 'var(--c-bg-alt)', padding: '22px 24px' }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--c-text)', marginBottom: 8, letterSpacing: '-0.01em' }}>
                  {sol.title}
                </p>
                {sol.desc && (
                  <p style={{ fontSize: 13, color: 'var(--c-text-2)', lineHeight: 1.65 }}>{sol.desc}</p>
                )}
                {sol.bullets && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 4 }}>
                    {sol.bullets.map(b => (
                      <li key={b} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span style={{
                          width: 4, height: 4, borderRadius: '50%', background: 'var(--c-text-3)',
                          flexShrink: 0, marginTop: 7,
                        }} />
                        <span style={{ fontSize: 13, color: 'var(--c-text-2)', lineHeight: 1.6 }}>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--c-border)' }} />

        {/* CTA strip */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--c-text)', marginBottom: 4, letterSpacing: '-0.01em' }}>
              Partner with uncompromised.ai
            </p>
            <p style={{ fontSize: 14, color: 'var(--c-text-2)', lineHeight: 1.65 }}>
              {a.cta}
            </p>
          </div>
          <Link
            to="/about"
            className="btn btn--dark"
            style={{ flexShrink: 0, padding: '12px 24px' }}
          >
            Request an assessment →
          </Link>
        </div>

      </div>
    </article>
  )
}
