import { useState } from 'react'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid work email'),
  firm: z.string().min(2, 'Please enter your firm name'),
  message: z.string().min(10, 'Please tell us a bit about your project'),
})

type ContactForm = z.infer<typeof contactSchema>

const values = [
  {
    number: '01',
    title: 'Practitioners, not theorists',
    desc: 'Everyone on our team has built and run AI in production at tier-1 financial institutions. We know what breaks in the real world because we\'ve watched it break.',
  },
  {
    number: '02',
    title: 'Compliance is a feature, not a constraint',
    desc: 'Regulators are paying close attention to AI in finance. We build models that perform and that can withstand regulatory scrutiny — because one without the other is worthless.',
  },
  {
    number: '03',
    title: 'Radical transparency',
    desc: 'We tell you what we don\'t know. We tell you when a project is more complex than scoped. We\'d rather be honest and solve the real problem than look good and miss the point.',
  },
  {
    number: '04',
    title: 'Client data stays with clients',
    desc: 'We have never and will never use client data to train models for other clients, sell to third parties, or publish in research. Your data is yours, full stop.',
  },
  {
    number: '05',
    title: 'Senior delivery, no exceptions',
    desc: 'Senior practitioners lead engagements and do the work. We do not staff client projects with analysts fresh out of school while senior people sell the next engagement.',
  },
  {
    number: '06',
    title: 'Outcomes, not outputs',
    desc: 'We measure success by whether your business is better off. Not by slide count, report length, or hours billed. If the outcome isn\'t there, we keep working.',
  },
]

export default function About() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', firm: '', message: '' })
  const [errors, setErrors] = useState<Partial<ContactForm>>({})
  const [sent, setSent] = useState(false)

  const handleChange = (field: keyof ContactForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    setErrors(er => ({ ...er, [field]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors: Partial<ContactForm> = {}
      result.error.errors.forEach(err => {
        const field = err.path[0] as keyof ContactForm
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      return
    }
    setSent(true)
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="container">
          <p className="page-hero__label">Who we are</p>
          <h1 className="page-hero__title">
            Built by practitioners.<br />For practitioners.
          </h1>
          <p className="page-hero__sub">
            Uncompromised was founded by veterans of the world's most demanding quantitative finance and AI organizations — specifically to raise the bar for AI consulting in financial services.
          </p>
        </div>
      </section>

      {/* ── Origin story ─────────────────────────────────────────────── */}
      <section className="about-mission">
        <div className="container">
          <div className="about-mission__grid">
            <div>
              <h2 className="about-mission__heading">
                We started because the advice available wasn't good enough.
              </h2>
            </div>
            <div className="about-mission__body">
              <p>
                In 2022, our founders were watching the same pattern play out across the firms they'd spent their careers in: financial institutions under enormous pressure to adopt AI, and a wave of consultants — many with no domain expertise in finance — rushing in to capture that demand.
              </p>
              <p>
                The results were predictable. Models that performed in backtests but failed in production. Projects that produced beautiful presentations but no deployable code. Compliance officers blindsided by AI systems their firms didn't understand and couldn't explain to regulators.
              </p>
              <p>
                Uncompromised was founded on a simple thesis: the only way to do AI consulting in financial services well is to combine deep quantitative finance expertise with genuine ML engineering capability — and to refuse to compromise on either.
              </p>
              <p>
                Today, our team has worked with over 60 institutions across investment banking, buy-side, FinTech, and wealth management. We remain small by design — senior practitioners on every project, always.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────── */}
      <section className="about-values">
        <div className="container">
          <p className="section-label">How we operate</p>
          <h2 className="section-heading" style={{ marginBottom: 0 }}>Our principles</h2>
          <div className="about-values__grid">
            {values.map(v => (
              <div key={v.number} className="about-value">
                <p className="about-value__number">{v.number}</p>
                <h3 className="about-value__title">{v.title}</h3>
                <p className="about-value__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recognition ──────────────────────────────────────────────── */}
      <section className="trusted" style={{ paddingTop: 72, paddingBottom: 72, borderTop: '1px solid var(--c-border)', borderBottom: 'none' }}>
        <div className="container">
          <p className="trusted__label">Recognized by</p>
          <div className="trusted__logos">
            {['Financial Times', 'Risk.net', 'Bloomberg', 'Institutional Investor', 'The Trade'].map(pub => (
              <span key={pub} className="trusted__logo">{pub}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact form ─────────────────────────────────────────────── */}
      <section style={{ padding: 'var(--section-y) 0', borderTop: '1px solid var(--c-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
            <div>
              <p className="section-label">Get in touch</p>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 20 }}>
                Start a conversation with our team
              </h2>
              <p style={{ fontSize: 15, color: 'var(--c-text-2)', lineHeight: 1.7, marginBottom: 32 }}>
                Every engagement begins with a no-obligation discovery call. Tell us about your firm, your objectives, and where AI fits into your plans — and we'll come prepared with relevant experience and honest perspective.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Email', value: 'hello@uncompromised.ai' },
                  { label: 'New York', value: '+1 (212) 555 0190' },
                  { label: 'London', value: '+44 20 7946 0958' },
                ].map(c => (
                  <div key={c.label}>
                    <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--c-text-3)', marginBottom: 4 }}>{c.label}</p>
                    <p style={{ fontSize: 15, color: 'var(--c-text)' }}>{c.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {sent ? (
                <div style={{ padding: '40px', background: 'var(--c-bg-alt)', border: '1px solid var(--c-border)', borderRadius: 12 }}>
                  <p style={{ fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em', marginBottom: 8 }}>Message received.</p>
                  <p style={{ fontSize: 15, color: 'var(--c-text-2)', lineHeight: 1.6 }}>
                    Thank you, {form.name}. Our team will respond to <strong style={{ color: 'var(--c-text)' }}>{form.email}</strong> within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { field: 'name' as const, label: 'Your name', placeholder: 'Jane Smith', type: 'text' },
                    { field: 'email' as const, label: 'Work email', placeholder: 'jane@yourfirm.com', type: 'email' },
                    { field: 'firm' as const, label: 'Firm name', placeholder: 'Acme Capital', type: 'text' },
                  ].map(({ field, label, placeholder, type }) => (
                    <div key={field} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--c-text)' }}>{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={handleChange(field)}
                        style={{
                          padding: '10px 14px',
                          border: `1px solid ${errors[field] ? '#e05a47' : 'var(--c-border)'}`,
                          borderRadius: 8,
                          fontFamily: 'var(--font)',
                          fontSize: 14,
                          color: 'var(--c-text)',
                          background: 'var(--c-bg)',
                          outline: 'none',
                        }}
                      />
                      {errors[field] && <p style={{ fontSize: 12, color: '#e05a47' }}>{errors[field]}</p>}
                    </div>
                  ))}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--c-text)' }}>How can we help?</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your project, your data environment, or the challenge you're trying to solve..."
                      value={form.message}
                      onChange={handleChange('message')}
                      style={{
                        padding: '10px 14px',
                        border: `1px solid ${errors.message ? '#e05a47' : 'var(--c-border)'}`,
                        borderRadius: 8,
                        fontFamily: 'var(--font)',
                        fontSize: 14,
                        color: 'var(--c-text)',
                        background: 'var(--c-bg)',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.55,
                      }}
                    />
                    {errors.message && <p style={{ fontSize: 12, color: '#e05a47' }}>{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn btn--dark" style={{ alignSelf: 'flex-start', padding: '12px 24px' }}>
                    Send message
                  </button>
                  <p style={{ fontSize: 12, color: 'var(--c-text-3)', lineHeight: 1.5 }}>
                    Covered by mutual NDA. We never disclose client inquiries.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
