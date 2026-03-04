import { Link } from 'react-router-dom'
import './Portal.css'

const sections = [
  {
    path: '/hebrew',
    title: 'עברית',
    subtitle: 'Hebrew',
    emoji: 'אבג',
    emojiBox: true,
    color: '#1565c0',
    gradient: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
    shadow: 'rgba(21, 101, 192, 0.4)',
  },
  {
    path: '/maths',
    title: 'Maths',
    subtitle: 'Numbers & Counting',
    emoji: '🔢',
    color: '#2e7d32',
    gradient: 'linear-gradient(135deg, #2e7d32 0%, #66bb6a 100%)',
    shadow: 'rgba(46, 125, 50, 0.4)',
  },
  {
    path: '/english',
    title: 'English',
    subtitle: 'Words & Letters',
    emoji: '🔤',
    color: '#c62828',
    gradient: 'linear-gradient(135deg, #c62828 0%, #ef5350 100%)',
    shadow: 'rgba(198, 40, 40, 0.4)',
  },
]

function Portal() {
  return (
    <div className="portal">
      <div className="portal-bg" />

      <div className="portal-deco">
        <span className="portal-deco-item portal-deco--1">⭐</span>
        <span className="portal-deco-item portal-deco--2">🌈</span>
        <span className="portal-deco-item portal-deco--3">🎈</span>
        <span className="portal-deco-item portal-deco--4">✨</span>
        <span className="portal-deco-item portal-deco--5">🎉</span>
        <span className="portal-deco-item portal-deco--6">💫</span>
      </div>

      <Link to="/" className="portal-home-btn">← Home</Link>

      <div className="portal-content">
        <h1 className="portal-title">What do you want to learn?</h1>
        <p className="portal-subtitle">?מה נלמד היום</p>

        <div className="portal-cards">
          {sections.map(({ path, title, subtitle, emoji, emojiBox, gradient, shadow }, i) => (
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
              <span className={`portal-card-emoji ${emojiBox ? 'portal-card-emoji--box' : ''}`}>{emoji}</span>
              <span className="portal-card-title">{title}</span>
              <span className="portal-card-subtitle">{subtitle}</span>
              <span className="portal-card-arrow">→</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Portal
