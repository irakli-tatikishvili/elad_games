import { Routes, Route, Link } from 'react-router-dom'
import { Languages, ImageIcon } from 'lucide-react'
import MatchTheWord from '../games/english/MatchTheWord'
import './SectionLayout.css'

const games = [
  { path: 'match-the-word', title: 'Match the Word', desc: 'Pick the right word for the picture', Icon: ImageIcon, component: MatchTheWord },
]

const theme = {
  gradient: 'linear-gradient(135deg, #b71c1c 0%, #c62828 30%, #e53935 60%, #ef5350 100%)',
  cardGradient: 'linear-gradient(135deg, #c62828, #ef5350)',
  shadow: 'rgba(198, 40, 40, 0.35)',
  accent: '#b71c1c',
}

function EnglishSection() {
  return (
    <Routes>
      <Route path="/" element={<EnglishSectionHome />} />
      {games.map(({ path, component: Game }) => (
        <Route key={path} path={path} element={<Game />} />
      ))}
    </Routes>
  )
}

function EnglishSectionHome() {
  return (
    <div className="sl" style={{ '--sl-gradient': theme.gradient }}>
      <div className="sl-bg" />
      <Link to="/portal" className="sl-back" dir="ltr">← Back</Link>

      <div className="sl-content">
        <div className="sl-header">
          <span className="sl-header-icon sl-header-icon--illustrated">
            <Languages className="sl-header-icon-svg" size={30} strokeWidth={2.25} aria-hidden />
            <span className="sl-header-icon-label">ABC</span>
          </span>
          <h1 className="sl-title">English Learning</h1>
          <p className="sl-subtitle">Words &amp; Letters</p>
        </div>

        <div className="sl-grid">
          {games.map(({ path, title, desc, Icon }, i) => (
            <Link
              key={path}
              to={path}
              className="sl-card"
              style={{
                '--card-gradient': theme.cardGradient,
                '--card-shadow': theme.shadow,
                '--sl-icon-color': theme.accent,
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <span className="sl-card-icon-wrap">
                <Icon className="sl-card-icon" size={36} strokeWidth={2.25} aria-hidden />
              </span>
              <span className="sl-card-title">{title}</span>
              <span className="sl-card-desc">{desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EnglishSection
