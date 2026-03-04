import { useState } from 'react'
import GameLayout from '../../components/GameLayout'
import BigButton from '../../components/BigButton'
import './CountTheObjects.css'

// Add apple.png to public/images/maths/count-the-objects/ to use your image
const APPLE_IMAGE = '/images/maths/count-the-objects/apple.png'
const APPLE_EMOJI = '🍎'

function ObjectIcon({ src, emoji }) {
  const [useFallback, setUseFallback] = useState(false)
  if (useFallback) return <span className="count-the-objects-item">{emoji}</span>
  return (
    <span className="count-the-objects-item">
      <img src={src} alt="" onError={() => setUseFallback(true)} />
    </span>
  )
}

function initRound() {
  const count = Math.floor(Math.random() * 3) + 1 // 1, 2, or 3
  const wrongOptions = [1, 2, 3].filter((n) => n !== count)
  const options = [count, wrongOptions[Math.floor(Math.random() * 2)]].sort(() => Math.random() - 0.5)
  return { count, options }
}

function CountTheObjects() {
  const [round, setRound] = useState(initRound)
  const [feedback, setFeedback] = useState(null)
  const { count, options } = round

  const handleSelect = (selected) => {
    if (feedback) return
    setFeedback(selected === count ? 'correct' : 'wrong')
  }

  const playAgain = () => {
    setRound(initRound())
    setFeedback(null)
  }

  return (
    <GameLayout title="Count the Objects" backTo="/maths">
      <div className="count-the-objects">
        <p className="count-the-objects-prompt">How many apples?</p>
        <div className="count-the-objects-display">
          {Array.from({ length: count }, (_, i) => (
            <ObjectIcon key={i} src={APPLE_IMAGE} emoji={APPLE_EMOJI} />
          ))}
        </div>
        <div className="count-the-objects-options">
          {options.map((num) => (
            <button
              key={num}
              type="button"
              className={`count-the-objects-btn ${feedback === 'correct' && num === count ? 'count-the-objects-btn--correct' : ''}`}
              onClick={() => handleSelect(num)}
              disabled={!!feedback}
            >
              {num}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="count-the-objects-feedback count-the-objects-feedback--success">
            <span className="count-the-objects-emoji">🎉</span>
            <p>Good job!</p>
            <BigButton onClick={playAgain}>Play again</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="count-the-objects-feedback count-the-objects-feedback--wrong">
            <p>Count again! There are {count} apples.</p>
            <BigButton onClick={playAgain}>Try again</BigButton>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default CountTheObjects
