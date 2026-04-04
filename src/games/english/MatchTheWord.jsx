import { useState } from 'react'
import { Link } from 'react-router-dom'
import BigButton from '../../components/BigButton'
import GamePicture from '../../components/GamePicture'
import SuccessKid from '../../components/SuccessKid'
import './MatchTheWord.css'

const IMAGE_BASE = '/images/english/match-the-word'
const WORD_ITEMS = [
  { word: 'Cat', image: `${IMAGE_BASE}/cat.png`, emoji: '🐱' },
  { word: 'Dog', image: `${IMAGE_BASE}/dog.png`, emoji: '🐕' },
  { word: 'Sun', image: `${IMAGE_BASE}/sun.png`, emoji: '☀️' },
  { word: 'Star', image: `${IMAGE_BASE}/star.png`, emoji: '⭐' },
]

const BUTTON_COLORS = [
  { bg: '#e8f5e9', border: '#66bb6a', text: '#2e7d32' },
  { bg: '#fff3e0', border: '#ffa726', text: '#e65100' },
  { bg: '#f3e5f5', border: '#ab47bc', text: '#6a1b9a' },
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
  const [selected, setSelected] = useState(null)
  const [imageError, setImageError] = useState(false)
  const { correct, options } = round

  const handleSelect = (word) => {
    if (feedback) return
    setSelected(word)
    setFeedback(word === correct.word ? 'correct' : 'wrong')
  }

  const playAgain = () => {
    setRound(initRound())
    setFeedback(null)
    setSelected(null)
    setImageError(false)
  }

  return (
    <div className="mtw-fullscreen">
      <div className="mtw-bg" />
      <div className="mtw-bg-letters">
        <span className="mtw-letter mtw-letter--1">A</span>
        <span className="mtw-letter mtw-letter--2">B</span>
        <span className="mtw-letter mtw-letter--3">C</span>
        <span className="mtw-letter mtw-letter--4">D</span>
      </div>

      <Link to="/english" className="mtw-back app-game-back">← חזרה</Link>

      <div className="mtw-content">
        <div className="mtw-prompt-card">
          <p className="mtw-prompt">איזו מילה באנגלית מתאימה?</p>
        </div>

        <div className="mtw-image-card">
          <div className="mtw-image-frame">
            {!imageError ? (
              <GamePicture pngUrl={correct.image} alt={correct.word} onError={() => setImageError(true)} />
            ) : null}
            <span className={`mtw-emoji-fallback ${imageError ? 'mtw-emoji-fallback--visible' : ''}`}>
              {correct.emoji}
            </span>
          </div>
          <span className="mtw-image-label">?</span>
        </div>

        <div className="mtw-options">
          {options.map((word, i) => {
            const color = BUTTON_COLORS[i]
            const isCorrect = feedback === 'correct' && word === correct.word
            const isWrong = feedback === 'wrong' && word === selected
            const isAnswer = feedback === 'wrong' && word === correct.word
            return (
              <button
                key={word}
                type="button"
                className={`mtw-btn ${isCorrect ? 'mtw-btn--correct' : ''} ${isWrong ? 'mtw-btn--wrong' : ''} ${isAnswer ? 'mtw-btn--answer' : ''}`}
                style={{
                  '--btn-bg': color.bg,
                  '--btn-border': color.border,
                  '--btn-text': color.text,
                }}
                onClick={() => handleSelect(word)}
                disabled={!!feedback}
              >
                {word}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && <SuccessKid />}
        {feedback === 'correct' && (
          <div className="mtw-feedback mtw-feedback--success">
            <p className="mtw-feedback-text">כל הכבוד!</p>
            <BigButton onClick={playAgain} variant="success">הבא</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="mtw-feedback mtw-feedback--wrong">
            <p className="mtw-feedback-text">
              המילה: <strong>{correct.word}</strong> {correct.emoji}
            </p>
            <BigButton onClick={playAgain}>נסה שוב</BigButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default MatchTheWord
