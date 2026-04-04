import { Link } from 'react-router-dom'
import {
  BookOpen,
  Calculator,
  Languages,
  Star,
  Sparkles,
  Candy,
  Flower2,
  PartyPopper,
  Wand2,
} from 'lucide-react'
import './Portal.css'

const sections = [
  {
    path: '/hebrew',
    title: 'עברית',
    subtitle: 'אותיות ומילים',
    Icon: BookOpen,
    badge: 'אבג',
    color: '#1565c0',
    gradient: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
    shadow: 'rgba(21, 101, 192, 0.4)',
  },
  {
    path: '/maths',
    title: 'חשבון',
    subtitle: 'מספרים וספירה',
    Icon: Calculator,
    badge: '123',
    color: '#2e7d32',
    gradient: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
    shadow: 'rgba(46, 125, 50, 0.4)',
  },
  {
    path: '/english',
    title: 'English',
    subtitle: 'מילים ואותיות',
    Icon: Languages,
    badge: 'ABC',
    color: '#c62828',
    gradient: 'linear-gradient(135deg, #c62828 0%, #ef5350 100%)',
    shadow: 'rgba(198, 40, 40, 0.4)',
  },
]

const decoIcons = [
  { Icon: Star, className: 'portal-deco--1' },
  { Icon: Sparkles, className: 'portal-deco--2' },
  { Icon: Candy, className: 'portal-deco--3' },
  { Icon: Flower2, className: 'portal-deco--4' },
  { Icon: PartyPopper, className: 'portal-deco--5' },
  { Icon: Wand2, className: 'portal-deco--6' },
]

function Portal() {
  return (
    <div className="portal">
      <div className="portal-bg" />

      <div className="portal-deco" aria-hidden>
        {decoIcons.map(({ Icon, className }) => (
          <span key={className} className={`portal-deco-item ${className}`}>
            <Icon className="portal-deco-svg" strokeWidth={1.75} size={28} />
          </span>
        ))}
      </div>

      <Link to="/" className="portal-home-btn">← בית</Link>

      <div className="portal-content">
        <h1 className="portal-title">?מה נלמד היום</h1>

        <div className="portal-cards">
          {sections.map(({ path, title, subtitle, Icon, badge, gradient, shadow }, i) => (
            <Link
              key={path}
              to={path}
              className="portal-card"
              style={{
                '--card-gradient': gradient,
                '--card-shadow': shadow,
                animationDelay: `${0.1 + i * 0.12}s`,
              }}
            >
              <span className="portal-card-top">
                <span className="portal-card-icon-ring">
                  <Icon
                    className="portal-card-icon"
                    size={36}
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
                {badge && (
                  <span className="portal-card-badge">{badge}</span>
                )}
              </span>
              <span className="portal-card-body">
                <span className="portal-card-title">{title}</span>
                <span className="portal-card-subtitle">{subtitle}</span>
              </span>
              <span className="portal-card-cta" aria-hidden>
                <span className="portal-card-arrow">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portal
