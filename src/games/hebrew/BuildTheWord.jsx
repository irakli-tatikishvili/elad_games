import { useState, useRef, useCallback, useEffect } from 'react'
import GameLayout from '../../components/GameLayout'
import BigButton from '../../components/BigButton'
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
  const containerRef = useRef(null)

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
    <GameLayout title="Build the Word" backTo="/hebrew">
      <div className="build-the-word" dir="rtl" lang="he" ref={containerRef}>
        <p className="build-the-word-prompt">בנה את המילה</p>
        <p className="build-the-word-prompt-en">Drag the letters to build the word</p>
        <div className="build-the-word-display">
          {!imageError ? (
            <img src={item.image} alt={item.label} onError={() => setImageError(true)} />
          ) : null}
          <span className={`build-the-word-emoji-fallback ${imageError ? 'build-the-word-emoji-fallback--visible' : ''}`}>
            {item.emoji}
          </span>
        </div>
        <div className="build-the-word-slots">
          {currentSlots.map((letter, i) => (
            <div
              key={i}
              data-slot-index={i}
              className={`build-the-word-slot ${!letter ? 'build-the-word-slot--empty' : ''}`}
            >
              {letter ? (
                <span
                  className="build-the-word-slot-letter"
                  onPointerDown={(e) => handlePointerDown(e, letter, 'slot', i)}
                >
                  {letter}
                </span>
              ) : (
                <span className="build-the-word-slot-placeholder">?</span>
              )}
            </div>
          ))}
        </div>
        <div className="build-the-word-pool">
          {currentPool.map((letter, i) => (
            <span
              key={`${letter}-${i}`}
              className="build-the-word-pool-letter"
              onPointerDown={(e) => handlePointerDown(e, letter, 'pool', i)}
            >
              {letter}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="build-the-word-reset"
          onClick={resetWord}
          disabled={!!feedback}
        >
          Start over
        </button>
        {feedback === 'correct' && (
          <div className="build-the-word-feedback build-the-word-feedback--success">
            <span className="build-the-word-emoji">🎉</span>
            <p>כל הכבוד!</p>
            <p className="build-the-word-feedback-en">Good job!</p>
            <BigButton onClick={playAgain}>Play again</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="build-the-word-feedback build-the-word-feedback--wrong">
            <p>נסה שוב! המילה היא {item.hebrewWord}</p>
            <p className="build-the-word-feedback-en">Try again! The word is {item.hebrewWord}</p>
            <BigButton onClick={playAgain}>Try again</BigButton>
          </div>
        )}
      </div>
      {dragging && (
        <div
          className="build-the-word-drag-preview"
          style={{ left: dragPos.x, top: dragPos.y }}
        >
          {dragging.letter}
        </div>
      )}
    </GameLayout>
  )
}

export default BuildTheWord
