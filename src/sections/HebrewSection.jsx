import { Routes, Route, Link } from 'react-router-dom'
import TapTheLetter from '../games/hebrew/TapTheLetter'
import FirstLetter from '../games/hebrew/FirstLetter'
import BuildTheWord from '../games/hebrew/BuildTheWord'
import DrawTheLetter from '../games/hebrew/DrawTheLetter'
import './SectionLayout.css'

const games = [
  { path: 'tap-the-letter', title: 'Tap the Letter', component: TapTheLetter },
  { path: 'first-letter', title: 'First Letter', component: FirstLetter },
  { path: 'build-the-word', title: 'Build the Word', component: BuildTheWord },
  { path: 'draw-the-letter', title: 'Draw the Letter', component: DrawTheLetter },
]

function HebrewSection() {
  return (
    <Routes>
      <Route path="/" element={<HebrewSectionHome games={games} />} />
      {games.map(({ path, component: Game }) => (
        <Route key={path} path={path} element={<Game />} />
      ))}
    </Routes>
  )
}

function HebrewSectionHome({ games }) {
  return (
    <div className="section-layout" dir="rtl" lang="he">
      <header className="section-layout-header">
        <Link to="/portal" className="section-layout-back">← Back</Link>
        <h1 className="section-layout-title">Hebrew Learning</h1>
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

export default HebrewSection
