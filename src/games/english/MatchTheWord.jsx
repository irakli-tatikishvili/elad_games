import { useState } from 'react'
import GameLayout from '../../components/GameLayout'
import BigButton from '../../components/BigButton'
import './MatchTheWord.css'

// Word-image pairs. Add images to public/images/english/match-the-word/
// Fallback: emoji shown if image fails to load
const IMAGE_BASE = '/images/english/match-the-word'
const WORD_ITEMS = [
  { word: 'Cat', image: `${IMAGE_BASE}/cat.png`, emoji: '🐱' },
  { word: 'Dog', image: `${IMAGE_BASE}/dog.png`, emoji: '🐕' },
  { word: 'Sun', image: `${IMAGE_BASE}/sun.png`, emoji: '☀️' },
  { word: 'Star', image: `${IMAGE_BASE}/star.png`, emoji: '⭐' },
]

function getRandomItem() {
  return WORD_ITEMS[Math.floor(Math.random() * WORD_ITEMS.length)]
}

function getWrongOptions(correctWord) {
  return WORD_ITEMS.filter((item) => item.word !== correctWord)
}

function initRound() {
  const correct = getRandomItem()
  const wrong = getWrongOptions(correct.word)
  const options = [correct.word, wrong[0].word, wrong[1].word].sort(() => Math.random() - 0.5)
  return { correct, options }
}

function MatchTheWord() {
  const [round, setRound] = useState(initRound)
  const [feedback, setFeedback] = useState(null)
  const [imageError, setImageError] = useState(false)
  const { correct, options } = round

  const handleSelect = (selected) => {
    if (feedback) return
    setFeedback(selected === correct.word ? 'correct' : 'wrong')
  }

  const playAgain = () => {
    setRound(initRound())
    setFeedback(null)
    setImageError(false)
  }

  return (
    <GameLayout title="Match the Word" backTo="/english">
      <div className="match-the-word">
        <p className="match-the-word-prompt">Which word matches the picture?</p>
        <div className="match-the-word-image">
          {!imageError ? (
            <img
              src={correct.image}
              alt={correct.word}
              onError={() => setImageError(true)}
            />
          ) : null}
          <span className={`match-the-word-emoji-fallback ${imageError ? 'match-the-word-emoji-fallback--visible' : ''}`}>
            {correct.emoji}
          </span>
        </div>
        <div className="match-the-word-options">
          {options.map((word) => (
            <button
              key={word}
              type="button"
              className={`match-the-word-btn ${feedback === 'correct' && word === correct.word ? 'match-the-word-btn--correct' : ''}`}
              onClick={() => handleSelect(word)}
              disabled={!!feedback}
            >
              {word}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="match-the-word-feedback match-the-word-feedback--success">
            <span className="match-the-word-emoji-large">🎉</span>
            <p>Good job!</p>
            <BigButton onClick={playAgain}>Play again</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="match-the-word-feedback match-the-word-feedback--wrong">
            <p>The word is {correct.word}. Try again!</p>
            <BigButton onClick={playAgain}>Try again</BigButton>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default MatchTheWord
