import { Routes, Route, Link } from 'react-router-dom'
import { Calculator, Apple, IceCream, Cherry, Fish } from 'lucide-react'
import CountTheObjects from '../games/maths/CountTheObjects'
import IceCreamSeller from '../games/maths/IceCreamSeller'
import StrawberryLion from '../games/maths/StrawberryLion'
import FishEatsBread from '../games/maths/FishEatsBread'
import './SectionLayout.css'

const games = [
  { path: 'count-the-objects', title: 'Count the Objects', desc: 'How many do you see?', Icon: Apple, component: CountTheObjects },
  { path: 'ice-cream-seller', title: 'Ice Cream Seller', desc: 'Serve ice cream to kids!', Icon: IceCream, component: IceCreamSeller },
  { path: 'strawberry-lion', title: 'Strawberry Lion', desc: 'Feed the hungry lion!', Icon: Cherry, component: StrawberryLion },
  { path: 'fish-eats-bread', title: 'דג אוכל לחם', desc: 'האכילו את הדג!', Icon: Fish, component: FishEatsBread },
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
          <span className="sl-header-icon sl-header-icon--illustrated">
            <Calculator className="sl-header-icon-svg" size={32} strokeWidth={2.25} aria-hidden />
            <span className="sl-header-icon-label">123</span>
          </span>
          <h1 className="sl-title">Maths Learning</h1>
          <p className="sl-subtitle">Numbers &amp; Counting</p>
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

export default MathsSection
