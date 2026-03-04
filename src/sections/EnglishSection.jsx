import { Routes, Route, Link } from 'react-router-dom'
import MatchTheWord from '../games/english/MatchTheWord'
import './SectionLayout.css'

const games = [
  { path: 'match-the-word', title: 'Match the Word', desc: 'Pick the right word for the picture', emoji: '🖼️', component: MatchTheWord },
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
          <span className="sl-header-icon">ABC</span>
          <h1 className="sl-title">English Learning</h1>
          <p className="sl-subtitle">Words &amp; Letters</p>
        </div>

        <div className="sl-grid">
          {games.map(({ path, title, desc, emoji }, i) => (
            <Link
              key={path}
              to={path}
              className="sl-card"
              style={{
                '--card-gradient': theme.cardGradient,
                '--card-shadow': theme.shadow,
                animationDelay: `${0.1 + i * 0.08}s`,
              }}
            >
              <span className="sl-card-emoji">{emoji}</span>
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
