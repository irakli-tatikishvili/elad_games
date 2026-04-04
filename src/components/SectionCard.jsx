import { Link } from 'react-router-dom'
import './SectionCard.css'

/** @param {{ to: string, title: string, emoji?: string, Icon?: import('lucide-react').LucideIcon }} props */
function SectionCard({ to, title, emoji, Icon }) {
  return (
    <Link to={to} className="section-card">
      <span className="section-card-emoji" aria-hidden>
        {Icon ? <Icon className="section-card-icon" size={28} strokeWidth={2.25} /> : emoji}
      </span>
      <span className="section-card-title">{title}</span>
    </Link>
  )
}

export default SectionCard
