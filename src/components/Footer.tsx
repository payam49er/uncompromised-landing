import { Link } from 'react-router-dom'

const columns = [
  {
    title: 'Services',
    links: [
      { label: 'AI Strategy & Roadmap', to: '/features' },
      { label: 'Model Development', to: '/features' },
      { label: 'Regulatory Compliance', to: '/features' },
      { label: 'Technical Due Diligence', to: '/features' },
      { label: 'Team & Training', to: '/features' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Hedge Funds', to: '/features' },
      { label: 'Investment Banks', to: '/features' },
      { label: 'Trading Firms', to: '/features' },
      { label: 'FinTech', to: '/features' },
      { label: 'Family Offices', to: '/features' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Insights & Research', to: '/blog' },
      { label: 'Case Studies', to: '/blog' },
      { label: 'Whitepapers', to: '/blog' },
      { label: 'Engagements', to: '/pricing' },
      { label: 'Contact', to: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Our Team', to: '/about' },
      { label: 'Press', to: '/about' },
      { label: 'Legal', to: '/' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5" />
                <path
                  d="M8 14c0-3.314 2.686-6 6-6s6 2.686 6 6-2.686 6-6 6"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                />
                <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.5" />
              </svg>
              <span>UNCOMPROMISED</span>
            </Link>
            <p className="footer__tagline">
              AI consulting for financial institutions — where precision, compliance, and performance are non-negotiable.
            </p>
            <div className="footer__social">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">X</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">LinkedIn</a>
            </div>
          </div>

          <div className="footer__columns">
            {columns.map(col => (
              <div key={col.title} className="footer__column">
                <p className="footer__column-title">{col.title}</p>
                <ul className="footer__column-links">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <Link to={link.to} className="footer__link">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__legal">
            © 2026 Uncompromised AI, Inc. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/" className="footer__link">Privacy Policy</Link>
            <Link to="/" className="footer__link">Terms of Service</Link>
            <Link to="/" className="footer__link">NDA & Confidentiality</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
