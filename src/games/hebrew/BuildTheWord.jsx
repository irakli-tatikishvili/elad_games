import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BigButton from '../../components/BigButton'
import GamePicture from '../../components/GamePicture'
import SuccessKid from '../../components/SuccessKid'
import './BuildTheWord.css'

const IMAGE_BASE = '/images/hebrew/build-the-word'
const ITEMS = [
  { hebrewWord: 'בית', label: 'House', image: `${IMAGE_BASE}/house.png`, emoji: '🏠' },
  { hebrewWord: 'דוב', label: 'Bear', image: `${IMAGE_BASE}/bear.png`, emoji: '🐻' },
  { hebrewWord: 'שמש', label: 'Sun', image: `${IMAGE_BASE}/sun.png`, emoji: '☀️' },
  { hebrewWord: 'חתול', label: 'Cat', image: `${IMAGE_BASE}/cat.png`, emoji: '🐱' },
  { hebrewWord: 'כלב', label: 'Dog', image: `${IMAGE_BASE}/dog.png`, emoji: '🐕' },
  { hebrewWord: 'פיל', label: 'Elephant', image: `${IMAGE_BASE}/elephant.png`, emoji: '🐘' },
]

const SLOT_COLORS = ['#42a5f5', '#ef5350', '#66bb6a', '#ffa726', '#ab47bc']

function getRandomItem() {
  return ITEMS[Math.floor(Math.random() * ITEMS.length)]
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

function initRound() {
  const item = getRandomItem()
  const letters = item.hebrewWord.split('')
  return { item, letterPool: shuffle(letters) }
}

function BuildTheWord() {
  const [round, setRound] = useState(initRound)
  const [slots, setSlots] = useState([])
  const [pool, setPool] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [imageError, setImageError] = useState(false)
  const [dragging, setDragging] = useState(null)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })

  const { item } = round
  const targetLetters = item.hebrewWord.split('')
  const currentSlots = slots.length ? slots : Array(targetLetters.length).fill(null)
  const currentPool = pool.length ? pool : round.letterPool

  const handlePointerDown = useCallback((e, letter, source, index) => {
    if (feedback) return
    e.preventDefault()
    setDragging({ letter, source, index })
    setDragPos({ x: e.clientX, y: e.clientY })
  }, [feedback])

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return
    setDragPos({ x: e.clientX, y: e.clientY })
  }, [dragging])

  const handlePointerUp = useCallback((e) => {
    if (!dragging) return
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY)
    const slotEl = dropTarget?.closest('[data-slot-index]')
    if (slotEl) {
      const slotIndex = parseInt(slotEl.dataset.slotIndex, 10)
      const newSlots = [...currentSlots]
      const newPool = [...currentPool]
      const replacedLetter = newSlots[slotIndex]
      if (dragging.source === 'pool') {
        newPool.splice(dragging.index, 1)
      } else {
        newSlots[dragging.source] = null
      }
      if (replacedLetter) newPool.push(replacedLetter)
      newSlots[slotIndex] = dragging.letter
      setSlots(newSlots)
      setPool(newPool)
      const filledCount = newSlots.filter(Boolean).length
      if (filledCount === targetLetters.length) {
        const built = newSlots.join('')
        setFeedback(built === item.hebrewWord ? 'correct' : 'wrong')
      }
    }
    setDragging(null)
  }, [dragging, currentSlots, currentPool, item.hebrewWord, targetLetters.length])

  useEffect(() => {
    if (dragging) {
      document.addEventListener('pointermove', handlePointerMove)
      document.addEventListener('pointerup', handlePointerUp)
      document.addEventListener('pointercancel', handlePointerUp)
      return () => {
        document.removeEventListener('pointermove', handlePointerMove)
        document.removeEventListener('pointerup', handlePointerUp)
        document.removeEventListener('pointercancel', handlePointerUp)
      }
    }
  }, [dragging, handlePointerMove, handlePointerUp])

  const playAgain = () => {
    setRound(initRound())
    setSlots([])
    setPool([])
    setFeedback(null)
    setImageError(false)
  }

  const resetWord = () => {
    setSlots([])
    setPool([...shuffle(targetLetters)])
  }

  return (
    <div className="btw-fullscreen" dir="rtl" lang="he">
      <div className="btw-bg" />
      <div className="btw-bg-shapes">
        <span className="btw-shape btw-shape--1">✏️</span>
        <span className="btw-shape btw-shape--2">📝</span>
        <span className="btw-shape btw-shape--3">🔤</span>
      </div>

      <Link to="/hebrew" className="btw-back app-game-back" dir="ltr">← חזרה</Link>

      <div className="btw-content">
        <div className="btw-prompt-card">
          <p className="btw-prompt">בנה את המילה</p>
          <p className="btw-prompt-en">גרור אותיות לבניית המילה</p>
        </div>

        <div className="btw-item-card">
          <div className="btw-image-frame">
            {!imageError ? (
              <GamePicture pngUrl={item.image} alt={item.label} onError={() => setImageError(true)} />
            ) : null}
            <span className={`btw-emoji-fallback ${imageError ? 'btw-emoji-fallback--visible' : ''}`}>
              {item.emoji}
            </span>
          </div>
        </div>

        <div className="btw-slots-section">
          <div className="btw-slots">
            {currentSlots.map((letter, i) => (
              <div
                key={i}
                data-slot-index={i}
                className={`btw-slot ${letter ? 'btw-slot--filled' : ''}`}
                style={{ '--slot-color': SLOT_COLORS[i % SLOT_COLORS.length] }}
              >
                {letter ? (
                  <span
                    className="btw-slot-letter"
                    onPointerDown={(e) => handlePointerDown(e, letter, i, i)}
                  >
                    {letter}
                  </span>
                ) : (
                  <span className="btw-slot-placeholder">{i + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="btw-pool-section">
          <p className="btw-pool-label">אותיות זמינות:</p>
          <div className="btw-pool">
            {currentPool.map((letter, i) => (
              <span
                key={`${letter}-${i}`}
                className="btw-pool-letter"
                onPointerDown={(e) => handlePointerDown(e, letter, 'pool', i)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="btw-reset"
          onClick={resetWord}
          disabled={!!feedback}
        >
          התחל מחדש
        </button>

        {feedback === 'correct' && <SuccessKid />}
        {feedback === 'correct' && (
          <div className="btw-feedback btw-feedback--success">
            <p className="btw-feedback-text">כל הכבוד!</p>
            <BigButton onClick={playAgain} variant="success">מילה הבאה</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="btw-feedback btw-feedback--wrong">
            <p className="btw-feedback-text">נסה שוב!</p>
            <p className="btw-feedback-sub">המילה: {item.hebrewWord}</p>
            <BigButton onClick={playAgain}>נסה שוב</BigButton>
          </div>
        )}
      </div>

      {dragging && (
        <div
          className="btw-drag-preview"
          style={{ left: dragPos.x, top: dragPos.y }}
        >
          {dragging.letter}
        </div>
      )}
    </div>
  )
}

export default BuildTheWord
