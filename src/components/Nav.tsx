import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const servicesMenu: Record<string, { name: string; description: string }[]> = {
  'AI Strategy': [
    { name: 'AI Readiness Assessment', description: 'Evaluate your firm\'s AI maturity and identify the highest-value opportunities' },
    { name: 'Roadmap & Governance', description: 'Build a structured, board-ready AI transformation plan' },
    { name: 'Vendor & Model Selection', description: 'Independent guidance on choosing the right models and platforms' },
  ],
  'Model Development': [
    { name: 'Quantitative AI Models', description: 'Custom alpha generation, risk, and portfolio optimization models' },
    { name: 'NLP & Document Intelligence', description: 'Extract signal from earnings calls, filings, and research reports' },
    { name: 'LLM Integration', description: 'Production-grade LLM workflows tailored to financial data' },
  ],
  'Compliance & Risk': [
    { name: 'Regulatory AI Compliance', description: 'Navigate SEC, FINRA, MiFID II, and Basel III AI requirements' },
    { name: 'Model Risk Management', description: 'SR 11-7 compliant model validation and ongoing monitoring' },
    { name: 'AI Audit & Documentation', description: 'Complete audit trails and explainability for regulators' },
  ],
  'Technical Advisory': [
    { name: 'Technical Due Diligence', description: 'AI/ML stack evaluation for investments and acquisitions' },
    { name: 'Architecture Review', description: 'Assess and harden your firm\'s AI infrastructure and data pipelines' },
    { name: 'Team & Training', description: 'Upskill your quants, engineers, and analysts on AI best practices' },
  ],
}

const industriesMenu = [
  { name: 'Investment Banks', description: 'AI for deal intelligence, research automation, and risk management' },
  { name: 'Hedge Funds', description: 'Alpha generation, portfolio optimization, and systematic trading AI' },
  { name: 'Proprietary Trading Firms', description: 'Low-latency ML pipelines and predictive signal research' },
  { name: 'FinTech Companies', description: 'Accelerate product development with embedded AI capabilities' },
  { name: 'Family Offices', description: 'Institutional-grade AI for portfolio oversight and reporting' },
  { name: 'Wealth Management', description: 'Client intelligence, personalization, and compliance automation' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [location])

  const openMenu = (name: string) => {
    clearTimeout(menuTimeout.current)
    setActiveMenu(name)
  }

  const closeMenu = () => {
    menuTimeout.current = setTimeout(() => setActiveMenu(null), 120)
  }

  const keepOpen = (name: string) => {
    clearTimeout(menuTimeout.current)
    setActiveMenu(name)
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner container">
        <Link to="/" className="nav__logo">
          <LogoMark />
          <span className="nav__logo-text">UNCOMPROMISED</span>
        </Link>

        <div className="nav__links">
          {/* Services */}
          <div
            className={`nav__item${activeMenu === 'services' ? ' nav__item--active' : ''}`}
            onMouseEnter={() => openMenu('services')}
            onMouseLeave={closeMenu}
          >
            <button className="nav__link nav__link--dropdown">
              Services <ChevronDown />
            </button>
            {activeMenu === 'services' && (
              <div
                className="nav__dropdown nav__dropdown--mega"
                onMouseEnter={() => keepOpen('services')}
                onMouseLeave={closeMenu}
              >
                <div className="nav__mega-grid">
                  {Object.entries(servicesMenu).map(([category, items]) => (
                    <div key={category} className="nav__mega-col">
                      <p className="nav__mega-category">{category}</p>
                      {items.map(item => (
                        <Link key={item.name} to="/features" className="nav__mega-item">
                          <span className="nav__mega-item-name">{item.name}</span>
                          <span className="nav__mega-item-desc">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries */}
          <div
            className={`nav__item${activeMenu === 'industries' ? ' nav__item--active' : ''}`}
            onMouseEnter={() => openMenu('industries')}
            onMouseLeave={closeMenu}
          >
            <button className="nav__link nav__link--dropdown">
              Industries <ChevronDown />
            </button>
            {activeMenu === 'industries' && (
              <div
                className="nav__dropdown"
                onMouseEnter={() => keepOpen('industries')}
                onMouseLeave={closeMenu}
              >
                <div className="nav__dropdown-grid">
                  {industriesMenu.map(item => (
                    <Link key={item.name} to="/features" className="nav__mega-item">
                      <span className="nav__mega-item-name">{item.name}</span>
                      <span className="nav__mega-item-desc">{item.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink
            to="/features"
            className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
          >
            Our Work
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
          >
            Engagements
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
          >
            Insights
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav__link${isActive ? ' nav__link--active' : ''}`}
          >
            About
          </NavLink>
        </div>

        <div className="nav__actions">
          <Link to="/about" className="nav__action-link">Contact</Link>
          <Link to="/about" className="btn btn--dark btn--sm">Start a project</Link>
        </div>

        <button
          className="nav__mobile-toggle"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <IconX /> : <IconMenu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="nav__mobile">
          <div className="nav__mobile-links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/features">Our Work</NavLink>
            <NavLink to="/pricing">Engagements</NavLink>
            <NavLink to="/blog">Insights</NavLink>
            <NavLink to="/about">About</NavLink>
          </div>
          <div className="nav__mobile-actions">
            <Link to="/about" className="btn btn--outline btn--full">Contact us</Link>
            <Link to="/about" className="btn btn--dark btn--full">Start a project</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
      <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

function ChevronDown() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
