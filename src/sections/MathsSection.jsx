import { Routes, Route, Link } from 'react-router-dom'
import CountTheObjects from '../games/maths/CountTheObjects'
import './SectionLayout.css'

const games = [
  { path: 'count-the-objects', title: 'Count the Objects', component: CountTheObjects },
]

function MathsSection() {
  return (
    <Routes>
      <Route path="/" element={<MathsSectionHome games={games} />} />
      {games.map(({ path, component: Game }) => (
        <Route key={path} path={path} element={<Game />} />
      ))}
    </Routes>
  )
}

function MathsSectionHome({ games }) {
  return (
    <div className="section-layout">
      <header className="section-layout-header">
        <Link to="/" className="section-layout-back">← Back</Link>
        <h1 className="section-layout-title">Maths Learning</h1>
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

export default MathsSection
