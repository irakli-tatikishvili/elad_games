import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="home-hero">
        <img
          src="/images/home/homepage.png"
          alt="Elad Kids Games"
          className="home-hero-image"
        />
        <div className="home-hero-overlay" />
      </div>

      <div className="home-center">
        <h1 className="home-title">Elad Kids Games</h1>
        <p className="home-subtitle">Learn &amp; Play!</p>
        <Link to="/portal" className="home-enter-btn">
          <span className="home-enter-text">Let's Go!</span>
          <span className="home-enter-arrow">→</span>
        </Link>
      </div>
    </div>
  )
}

export default Home
