import { useState } from 'react'
import { Link } from 'react-router-dom'
import BigButton from '../../components/BigButton'
import './CountTheObjects.css'

const IMAGE_BASE = '/images/maths/count-the-objects'

const OBJECT_SETS = [
  { name: 'apple', image: `${IMAGE_BASE}/apple.png`, emoji: '🍎', color: '#ef5350' },
  { name: 'banana', image: `${IMAGE_BASE}/banana.png`, emoji: '🍌', color: '#fdd835' },
  { name: 'star', image: `${IMAGE_BASE}/star.png`, emoji: '⭐', color: '#ffb300' },
  { name: 'ball', image: `${IMAGE_BASE}/ball.png`, emoji: '🏀', color: '#ff7043' },
  { name: 'flower', image: `${IMAGE_BASE}/flower.png`, emoji: '🌸', color: '#f48fb1' },
]

const BUTTON_COLORS = [
  { bg: '#e3f2fd', border: '#42a5f5', text: '#1565c0' },
  { bg: '#fce4ec', border: '#ef5350', text: '#c62828' },
  { bg: '#e8f5e9', border: '#66bb6a', text: '#2e7d32' },
  { bg: '#fff3e0', border: '#ffa726', text: '#e65100' },
  { bg: '#f3e5f5', border: '#ab47bc', text: '#6a1b9a' },
]

function initRound() {
  const count = Math.floor(Math.random() * 5) + 1
  const objectSet = OBJECT_SETS[Math.floor(Math.random() * OBJECT_SETS.length)]
  const options = new Set([count])
  while (options.size < 5) {
    options.add(Math.floor(Math.random() * 5) + 1)
  }
  return { count, objectSet, options: [...options].sort((a, b) => a - b) }
}

function ObjectIcon({ objectSet }) {
  const [useFallback, setUseFallback] = useState(false)
  if (useFallback) {
    return <span className="cto-item">{objectSet.emoji}</span>
  }
  return (
    <span className="cto-item">
      <img src={objectSet.image} alt={objectSet.name} onError={() => setUseFallback(true)} />
    </span>
  )
}

function CountTheObjects() {
  const [round, setRound] = useState(initRound)
  const [feedback, setFeedback] = useState(null)
  const [selected, setSelected] = useState(null)
  const { count, objectSet, options } = round

  const handleSelect = (num) => {
    if (feedback) return
    setSelected(num)
    setFeedback(num === count ? 'correct' : 'wrong')
  }

  const playAgain = () => {
    setRound(initRound())
    setFeedback(null)
    setSelected(null)
  }

  return (
    <div className="cto-fullscreen">
      <div className="cto-bg-top" />
      <div className="cto-bg-bottom" />
      <div className="cto-bg-dots" />

      <Link to="/maths" className="cto-back">← Back</Link>

      <div className="cto-content">
        <div className="cto-prompt-card">
          <p className="cto-prompt">How many</p>
          <span className="cto-prompt-object">{objectSet.emoji}</span>
          <p className="cto-prompt">can you see?</p>
        </div>

        <div className="cto-display">
          <div className="cto-display-inner">
            {Array.from({ length: count }, (_, i) => (
              <span key={i} className="cto-object" style={{ animationDelay: `${i * 0.1}s` }}>
                <ObjectIcon objectSet={objectSet} />
              </span>
            ))}
          </div>
        </div>

        <div className="cto-options">
          {options.map((num, i) => {
            const color = BUTTON_COLORS[i]
            const isCorrect = feedback === 'correct' && num === count
            const isWrong = feedback === 'wrong' && num === selected
            const isAnswer = feedback === 'wrong' && num === count
            return (
              <button
                key={num}
                type="button"
                className={`cto-btn ${isCorrect ? 'cto-btn--correct' : ''} ${isWrong ? 'cto-btn--wrong' : ''} ${isAnswer ? 'cto-btn--answer' : ''}`}
                style={{
                  '--btn-bg': color.bg,
                  '--btn-border': color.border,
                  '--btn-text': color.text,
                }}
                onClick={() => handleSelect(num)}
                disabled={!!feedback}
              >
                {num}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && (
          <div className="cto-feedback cto-feedback--success">
            <div className="cto-stars">
              <span style={{ animationDelay: '0s' }}>⭐</span>
              <span style={{ animationDelay: '0.15s' }}>🌟</span>
              <span style={{ animationDelay: '0.3s' }}>⭐</span>
            </div>
            <p className="cto-feedback-text">Good job!</p>
            <BigButton onClick={playAgain} variant="success">Next round</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="cto-feedback cto-feedback--wrong">
            <p className="cto-feedback-text">
              There {count === 1 ? 'is' : 'are'} {count} {objectSet.emoji}
            </p>
            <BigButton onClick={playAgain}>Try again</BigButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default CountTheObjects
