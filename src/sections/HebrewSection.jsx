import { Routes, Route, Link } from 'react-router-dom'
import {
  BookOpen,
  Hand,
  TextSearch,
  Puzzle,
  PenLine,
  LayoutGrid,
} from 'lucide-react'
import TapTheLetter from '../games/hebrew/TapTheLetter'
import FirstLetter from '../games/hebrew/FirstLetter'
import BuildTheWord from '../games/hebrew/BuildTheWord'
import DrawTheLetter from '../games/hebrew/DrawTheLetter'
import LetterAnimalCards from '../games/hebrew/LetterAnimalCards'
import './SectionLayout.css'

const games = [
  { path: 'tap-the-letter', title: 'Tap the Letter', desc: 'Find the right letter', Icon: Hand, component: TapTheLetter },
  { path: 'first-letter', title: 'First Letter', desc: 'What letter starts the word?', Icon: TextSearch, component: FirstLetter },
  { path: 'build-the-word', title: 'Build the Word', desc: 'Drag letters into place', Icon: Puzzle, component: BuildTheWord },
  { path: 'draw-the-letter', title: 'Draw the Letter', desc: 'Trace and draw letters', Icon: PenLine, component: DrawTheLetter },
  { path: 'letter-animal-cards', title: 'Letter & Animal Cards', desc: 'Flip cards — letter to animal', Icon: LayoutGrid, component: LetterAnimalCards },
]

const theme = {
  gradient: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 30%, #1976d2 60%, #42a5f5 100%)',
  cardGradient: 'linear-gradient(135deg, #1565c0, #42a5f5)',
  shadow: 'rgba(21, 101, 192, 0.35)',
  accent: '#0d47a1',
}

function HebrewSection() {
  return (
    <Routes>
      <Route path="/" element={<HebrewSectionHome />} />
      {games.map(({ path, component: Game }) => (
        <Route key={path} path={path} element={<Game />} />
      ))}
    </Routes>
  )
}

function HebrewSectionHome() {
  return (
    <div className="sl" style={{ '--sl-gradient': theme.gradient }}>
      <div className="sl-bg" />
      <Link to="/portal" className="sl-back" dir="ltr">← Back</Link>

      <div className="sl-content">
        <div className="sl-header">
          <span className="sl-header-icon sl-header-icon--illustrated">
            <BookOpen className="sl-header-icon-svg" size={30} strokeWidth={2.25} aria-hidden />
            <span className="sl-header-icon-label">אבג</span>
          </span>
          <h1 className="sl-title">Hebrew Learning</h1>
          <p className="sl-subtitle">לימוד עברית</p>
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

export default HebrewSection
