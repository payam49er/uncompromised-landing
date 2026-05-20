import { useState } from 'react'
import { z } from 'zod'

const emailSchema = z.string().email('Please enter a valid work email address')

const posts = [
  {
    tag: 'Regulation',
    title: 'What the SEC\'s AI guidance means for buy-side firms in 2026',
    excerpt: 'The SEC\'s latest statements on AI in investment management have significant implications for model governance, disclosure obligations, and the way firms document their AI-assisted decisions.',
    author: 'Ananya Rao',
    date: 'May 12, 2026',
    readTime: '9 min read',
  },
  {
    tag: 'Strategy',
    title: 'The AI maturity gap: why most financial institutions are further behind than they think',
    excerpt: 'After assessing over 60 institutions, we\'ve identified a consistent pattern: AI maturity is systematically overestimated. Here\'s how to measure it honestly — and what to do about it.',
    author: 'Marcus Holt',
    date: 'May 5, 2026',
    readTime: '11 min read',
  },
  {
    tag: 'Model Development',
    title: 'Earnings call NLP: what actually works for alpha extraction',
    excerpt: 'After three years building NLP alpha signals for systematic managers, we\'ve learned what the academic literature doesn\'t tell you. This is an honest account of what works, what doesn\'t, and why.',
    author: 'Priya Iyer',
    date: 'April 28, 2026',
    readTime: '14 min read',
  },
  {
    tag: 'Risk Management',
    title: 'SR 11-7 in the age of machine learning: a practical guide for model risk managers',
    excerpt: 'Federal Reserve Guidance SR 11-7 was written for statistical models. Applying it to ML systems requires interpretation, judgment, and a framework most firms don\'t yet have.',
    author: 'David Chen',
    date: 'April 21, 2026',
    readTime: '12 min read',
  },
  {
    tag: 'LLMs in Finance',
    title: 'When to use RAG and when not to: lessons from financial document intelligence deployments',
    excerpt: 'Retrieval-augmented generation is powerful — but it\'s not the right architecture for every problem. We\'ve deployed RAG in production at several institutions and here\'s what we\'ve learned.',
    author: 'Leila Nassar',
    date: 'April 14, 2026',
    readTime: '10 min read',
  },
  {
    tag: 'Due Diligence',
    title: 'How to evaluate an AI-driven investment strategy: a framework for allocators',
    excerpt: 'As more systematic managers incorporate machine learning, allocators face a challenge: how do you evaluate AI risk when you can\'t read the code? We\'ve built a framework for exactly this.',
    author: 'Marcus Holt',
    date: 'April 7, 2026',
    readTime: '10 min read',
  },
  {
    tag: 'Strategy',
    title: 'The case against buying a generic AI platform for your trading desk',
    excerpt: 'The temptation to buy a turnkey AI platform is understandable. The reasons not to are often underappreciated. Here\'s an honest look at the build vs. buy decision for quantitative finance.',
    author: 'Tom Eriksson',
    date: 'March 31, 2026',
    readTime: '8 min read',
  },
  {
    tag: 'Regulation',
    title: 'MiFID II and algorithmic trading: preparing for the next wave of AI oversight',
    excerpt: 'European regulators are sharpening their focus on algorithmic and AI-driven trading. Here\'s what MiFID II amendments under consideration could mean for your firm\'s AI governance program.',
    author: 'Ananya Rao',
    date: 'March 24, 2026',
    readTime: '7 min read',
  },
  {
    tag: 'Model Development',
    title: 'Alternative data in 2026: what\'s working, what\'s overcrowded, and what\'s coming',
    excerpt: 'The alternative data landscape has matured significantly. Many signals that generated alpha in 2019 are now commodity. Here\'s our view on where the genuine edge still lives.',
    author: 'Priya Iyer',
    date: 'March 17, 2026',
    readTime: '13 min read',
  },
]

const categories = ['All', 'Strategy', 'Regulation', 'Model Development', 'Risk Management', 'LLMs in Finance', 'Due Diligence']

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter(p => p.tag === activeCategory)

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
        <div className="container">
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

          {filteredPosts.length === 0 ? (
            <p style={{ color: 'var(--c-text-2)', fontSize: 15 }}>No articles in this category yet.</p>
          ) : (
            <div className="blog-grid__posts">
              {filteredPosts.map(post => (
                <article key={post.title} className="blog-post">
                  <div className="blog-post__cover" />
                  <div className="blog-post__body">
                    <p className="blog-post__tag">{post.tag}</p>
                    <h2 className="blog-post__title">{post.title}</h2>
                    <p className="blog-post__excerpt">{post.excerpt}</p>
                    <div className="blog-post__meta">
                      <div className="blog-post__author-avatar" />
                      <span className="blog-post__author-name">{post.author}</span>
                      <span className="blog-post__date">{post.date} · {post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
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
