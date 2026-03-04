import { Link } from 'react-router-dom'
import './GameLayout.css'

function GameLayout({ title, backTo, children }) {
  return (
    <div className="game-layout">
      <header className="game-layout-header">
        <Link to={backTo} className="game-layout-back">
          ← Back
        </Link>
        <h2 className="game-layout-title">{title}</h2>
      </header>
      <main className="game-layout-content">
        {children}
      </main>
    </div>
  )
}

export default GameLayout
