import { Link } from 'react-router-dom'
import './Home.css'

const sections = [
  { path: '/hebrew', title: 'Hebrew Learning', emoji: '✡️' },
  { path: '/maths', title: 'Maths Learning', emoji: '🔢' },
  { path: '/english', title: 'English Learning', emoji: '🔤' },
]

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <img
          src="/images/home/homepage.png"
          alt="Elad Kids Games - Learn and play!"
          className="home-hero-image"
        />
        <div className="home-hero-overlay" aria-hidden="true" />
      </div>
      <div className="home-ctas">
        <h1 className="home-title">Elad Kids Games</h1>
        <p className="home-subtitle">Choose what to learn today!</p>
        <nav className="home-sections" aria-label="Learning sections">
          {sections.map(({ path, title, emoji }) => (
            <Link key={path} to={path} className="home-cta-card">
              <span className="home-cta-emoji">{emoji}</span>
              <span className="home-cta-title">{title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Home
