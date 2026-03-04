import { Link } from 'react-router-dom'
import './SectionCard.css'

function SectionCard({ to, title, emoji }) {
  return (
    <Link to={to} className="section-card">
      <span className="section-card-emoji">{emoji}</span>
      <span className="section-card-title">{title}</span>
    </Link>
  )
}

export default SectionCard
