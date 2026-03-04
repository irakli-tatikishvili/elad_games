import { useState } from 'react'
import { Link } from 'react-router-dom'
import BigButton from '../../components/BigButton'
import './FirstLetter.css'

const IMAGE_BASE = '/images/hebrew/first-letter'
const ITEMS = [
  { hebrewWord: 'חתול', firstLetter: 'ח', label: 'Cat', image: `${IMAGE_BASE}/cat.png`, emoji: '🐱' },
  { hebrewWord: 'כלב', firstLetter: 'כ', label: 'Dog', image: `${IMAGE_BASE}/dog.png`, emoji: '🐕' },
  { hebrewWord: 'שמש', firstLetter: 'ש', label: 'Sun', image: `${IMAGE_BASE}/sun.png`, emoji: '☀️' },
  { hebrewWord: 'כוכב', firstLetter: 'כ', label: 'Star', image: `${IMAGE_BASE}/star.png`, emoji: '⭐' },
  { hebrewWord: 'דוב', firstLetter: 'ד', label: 'Bear', image: `${IMAGE_BASE}/bear.png`, emoji: '🐻' },
  { hebrewWord: 'פיל', firstLetter: 'פ', label: 'Elephant', image: `${IMAGE_BASE}/elephant.png`, emoji: '🐘' },
  { hebrewWord: 'תפוח', firstLetter: 'ת', label: 'Apple', image: `${IMAGE_BASE}/apple.png`, emoji: '🍎' },
  { hebrewWord: 'בית', firstLetter: 'ב', label: 'House', image: `${IMAGE_BASE}/house.png`, emoji: '🏠' },
]

const HEBREW_LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת']

const LETTER_COLORS = [
  { bg: '#e3f2fd', border: '#42a5f5', text: '#1565c0' },
  { bg: '#fce4ec', border: '#ef5350', text: '#c62828' },
  { bg: '#e8f5e9', border: '#66bb6a', text: '#2e7d32' },
  { bg: '#fff3e0', border: '#ffa726', text: '#e65100' },
]

function getRandomItem() {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)]
}

function getLetterOptions(correctLetter) {
  const options = new Set([correctLetter])
  while (options.size < 4) {
    options.add(HEBREW_LETTERS[Math.floor(Math.random() * HEBREW_LETTERS.length)])
  }
  return [...options].sort(() => Math.random() - 0.5)
}

function initRound() {
  const item = getRandomItem()
  return { item, letterOptions: getLetterOptions(item.firstLetter) }
}

function FirstLetter() {
  const [round, setRound] = useState(initRound)
  const [feedback, setFeedback] = useState(null)
  const [selected, setSelected] = useState(null)
  const [imageError, setImageError] = useState(false)
  const { item, letterOptions } = round

  const handleSelect = (letter) => {
    if (feedback) return
    setSelected(letter)
    setFeedback(letter === item.firstLetter ? 'correct' : 'wrong')
  }

  const playAgain = () => {
    setRound(initRound())
    setFeedback(null)
    setSelected(null)
    setImageError(false)
  }

  return (
    <div className="fl-fullscreen" dir="rtl" lang="he">
      <div className="fl-bg" />
      <div className="fl-bg-shapes">
        <span className="fl-shape fl-shape--1">א</span>
        <span className="fl-shape fl-shape--2">ב</span>
        <span className="fl-shape fl-shape--3">ג</span>
        <span className="fl-shape fl-shape--4">ד</span>
      </div>

      <Link to="/hebrew" className="fl-back" dir="ltr">← Back</Link>

      <div className="fl-content">
        <div className="fl-prompt-card">
          <p className="fl-prompt">מה האות הראשונה?</p>
          <p className="fl-prompt-en">What is the first letter?</p>
        </div>

        <div className="fl-item-card">
          <div className="fl-image-frame">
            {!imageError ? (
              <img src={item.image} alt={item.label} onError={() => setImageError(true)} />
            ) : null}
            <span className={`fl-emoji-fallback ${imageError ? 'fl-emoji-fallback--visible' : ''}`}>
              {item.emoji}
            </span>
          </div>
          <div className="fl-word-badge">
            <span className="fl-word-text">{item.hebrewWord}</span>
            <span className="fl-word-highlight">?</span>
            <span className="fl-word-rest">{item.hebrewWord.slice(1)}</span>
          </div>
        </div>

        <div className="fl-options">
          {letterOptions.map((letter, i) => {
            const color = LETTER_COLORS[i]
            const isCorrect = feedback === 'correct' && letter === item.firstLetter
            const isWrong = feedback === 'wrong' && letter === selected
            const isAnswer = feedback === 'wrong' && letter === item.firstLetter
            return (
              <button
                key={letter}
                type="button"
                className={`fl-btn ${isCorrect ? 'fl-btn--correct' : ''} ${isWrong ? 'fl-btn--wrong' : ''} ${isAnswer ? 'fl-btn--answer' : ''}`}
                style={{
                  '--btn-bg': color.bg,
                  '--btn-border': color.border,
                  '--btn-text': color.text,
                }}
                onClick={() => handleSelect(letter)}
                disabled={!!feedback}
              >
                {letter}
              </button>
            )
          })}
        </div>

        {feedback === 'correct' && (
          <div className="fl-feedback fl-feedback--success">
            <div className="fl-stars">
              <span style={{ animationDelay: '0s' }}>⭐</span>
              <span style={{ animationDelay: '0.15s' }}>🌟</span>
              <span style={{ animationDelay: '0.3s' }}>⭐</span>
            </div>
            <p className="fl-feedback-text">כל הכבוד!</p>
            <p className="fl-feedback-sub">Good job!</p>
            <BigButton onClick={playAgain} variant="success">Next</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="fl-feedback fl-feedback--wrong">
            <p className="fl-feedback-text">האות הראשונה היא <strong>{item.firstLetter}</strong></p>
            <p className="fl-feedback-sub">The first letter is {item.firstLetter}</p>
            <BigButton onClick={playAgain}>Try again</BigButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default FirstLetter
