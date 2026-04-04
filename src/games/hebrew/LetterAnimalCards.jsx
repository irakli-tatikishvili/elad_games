import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import GamePicture from '../../components/GamePicture'
import { LETTER_ANIMAL_CARDS } from './letterAnimalCardsData'
import './LetterAnimalCards.css'

function LetterAnimalCards() {
  const [flipped, setFlipped] = useState(() => ({}))

  const toggle = useCallback((index) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }))
  }, [])

  return (
    <div className="lac" dir="rtl" lang="he">
      <div className="lac-bg" aria-hidden />
      <Link to="/hebrew" className="lac-back app-game-back" dir="ltr">
        ← חזרה
      </Link>

      <header className="lac-header">
        <span className="lac-header-badge" aria-hidden>
          <span className="lac-header-badge-icon">🃏</span>
        </span>
        <h1 className="lac-title">אותיות ובעלי חיים</h1>
        <p className="lac-subtitle">לחצו על כרטיס — האות מתהפכת לחיה שמתחילה באותה אות</p>
      </header>

      <div className="lac-grid">
        {LETTER_ANIMAL_CARDS.map((item, index) => {
          const isFlipped = !!flipped[index]
          const wordFirst = item.word.charAt(0)
          const wordRest = item.word.slice(1)
          return (
            <button
              key={item.letter}
              type="button"
              className={`lac-card ${isFlipped ? 'lac-card--flipped' : ''}`}
              onClick={() => toggle(index)}
              aria-label={
                isFlipped
                  ? `${item.word}. לחיצה נוספת מחזירה לאות.`
                  : `אות ${item.letter}. לחיצה מחשיפה חיה.`
              }
            >
              <span className="lac-card-inner" aria-hidden>
                <span className="lac-card-face lac-card-face--front">
                  <span className="lac-card-shine" aria-hidden />
                  <span className="lac-letter">{item.letter}</span>
                  <span className="lac-card-hint" aria-hidden>
                    ↻
                  </span>
                </span>
                <span className="lac-card-face lac-card-face--back">
                  <span className="lac-card-back-frame" aria-hidden />
                  {item.image ? (
                    <GamePicture
                      className="lac-img"
                      pngUrl={item.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : null}
                  <span className="lac-emoji-wrap" aria-hidden>
                    <span className="lac-emoji">{item.emoji}</span>
                  </span>
                  <span className="lac-word">
                    <span className="lac-word-first">{wordFirst}</span>
                    <span className="lac-word-rest">{wordRest}</span>
                  </span>
                </span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default LetterAnimalCards
