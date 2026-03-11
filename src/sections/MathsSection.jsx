import { Routes, Route, Link } from 'react-router-dom'
import CountTheObjects from '../games/maths/CountTheObjects'
import IceCreamSeller from '../games/maths/IceCreamSeller'
import StrawberryLion from '../games/maths/StrawberryLion'
import './SectionLayout.css'

const games = [
  { path: 'count-the-objects', title: 'Count the Objects', desc: 'How many do you see?', emoji: '🍎', component: CountTheObjects },
  { path: 'ice-cream-seller', title: 'Ice Cream Seller', desc: 'Serve ice cream to kids!', emoji: '🍦', component: IceCreamSeller },
  { path: 'strawberry-lion', title: 'Strawberry Lion', desc: 'Feed the hungry lion!', emoji: '🦁', component: StrawberryLion },
]

const theme = {
  gradient: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 30%, #43a047 60%, #66bb6a 100%)',
  cardGradient: 'linear-gradient(135deg, #2e7d32, #66bb6a)',
  shadow: 'rgba(46, 125, 50, 0.35)',
  accent: '#1b5e20',
}

function MathsSection() {
  return (
    <Routes>
      <Route path="/" element={<MathsSectionHome />} />
      {games.map(({ path, component: Game }) => (
        <Route key={path} path={path} element={<Game />} />
      ))}
    </Routes>
  )
}

function MathsSectionHome() {
  return (
    <div className="sl" style={{ '--sl-gradient': theme.gradient }}>
      <div className="sl-bg" />
      <Link to="/portal" className="sl-back" dir="ltr">← Back</Link>

      <div className="sl-content">
        <div className="sl-header">
          <span className="sl-header-icon">🔢</span>
          <h1 className="sl-title">Maths Learning</h1>
          <p className="sl-subtitle">Numbers &amp; Counting</p>
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

export default MathsSection
