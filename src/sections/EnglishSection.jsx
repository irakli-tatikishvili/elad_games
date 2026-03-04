import { Routes, Route, Link } from 'react-router-dom'
import MatchTheWord from '../games/english/MatchTheWord'
import './SectionLayout.css'

const games = [
  { path: 'match-the-word', title: 'Match the Word', component: MatchTheWord },
]

function EnglishSection() {
  return (
    <Routes>
      <Route path="/" element={<EnglishSectionHome games={games} />} />
      {games.map(({ path, component: Game }) => (
        <Route key={path} path={path} element={<Game />} />
      ))}
    </Routes>
  )
}

function EnglishSectionHome({ games }) {
  return (
    <div className="section-layout">
      <header className="section-layout-header">
        <Link to="/portal" className="section-layout-back">← Back</Link>
        <h1 className="section-layout-title">English Learning</h1>
      </header>
      <main className="section-layout-games">
        {games.map(({ path, title }) => (
          <Link key={path} to={path} className="section-layout-game-card">
            {title}
          </Link>
        ))}
      </main>
    </div>
  )
}

export default EnglishSection
