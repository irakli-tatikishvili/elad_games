import { useState } from 'react'
import GameLayout from '../../components/GameLayout'
import BigButton from '../../components/BigButton'
import './FirstLetter.css'

// Items: anything with a Hebrew word and its first letter. Add images to public/images/hebrew/first-letter/
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
  const [imageError, setImageError] = useState(false)
  const { item, letterOptions } = round

  const handleSelect = (letter) => {
    if (feedback) return
    setFeedback(letter === item.firstLetter ? 'correct' : 'wrong')
  }

  const playAgain = () => {
    setRound(initRound())
    setFeedback(null)
    setImageError(false)
  }

  return (
    <GameLayout title="First Letter" backTo="/hebrew">
      <div className="first-letter" dir="rtl" lang="he">
        <p className="first-letter-prompt">מה האות הראשונה של התמונה הזו?</p>
        <p className="first-letter-prompt-en">What is the first letter of this item?</p>
        <div className="first-letter-display">
          {!imageError ? (
            <img
              src={item.image}
              alt={item.label}
              onError={() => setImageError(true)}
            />
          ) : null}
          <span className={`first-letter-emoji-fallback ${imageError ? 'first-letter-emoji-fallback--visible' : ''}`}>
            {item.emoji}
          </span>
        </div>
        <p className="first-letter-word">{item.hebrewWord}</p>
        <div className="first-letter-options">
          {letterOptions.map((letter) => (
            <button
              key={letter}
              type="button"
              className={`first-letter-btn ${feedback === 'correct' && letter === item.firstLetter ? 'first-letter-btn--correct' : ''} ${feedback === 'wrong' && letter === item.firstLetter ? 'first-letter-btn--highlight' : ''}`}
              onClick={() => handleSelect(letter)}
              disabled={!!feedback}
            >
              {letter}
            </button>
          ))}
        </div>
        {feedback === 'correct' && (
          <div className="first-letter-feedback first-letter-feedback--success">
            <span className="first-letter-emoji">🎉</span>
            <p>כל הכבוד!</p>
            <p className="first-letter-feedback-en">Good job!</p>
            <BigButton onClick={playAgain}>Play again</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="first-letter-feedback first-letter-feedback--wrong">
            <p>האות הראשונה היא {item.firstLetter}</p>
            <p className="first-letter-feedback-en">The first letter is {item.firstLetter}</p>
            <BigButton onClick={playAgain}>Try again</BigButton>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default FirstLetter
