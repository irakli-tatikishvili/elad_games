import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import GamePicture from '../../components/GamePicture'
import { illo } from '../../theme/tokens'
import './DrawTheLetter.css'

const IMAGE_BASE = '/images/hebrew/draw-the-letter'

const LETTER_DATA = [
  { letter: 'א', word: 'אריה', english: 'Lion', emoji: '🦁', image: `${IMAGE_BASE}/lion.png` },
  { letter: 'ב', word: 'בננה', english: 'Banana', emoji: '🍌', image: `${IMAGE_BASE}/banana.png` },
  { letter: 'ג', word: 'גמל', english: 'Camel', emoji: '🐫', image: `${IMAGE_BASE}/camel.png` },
  { letter: 'ד', word: 'דג', english: 'Fish', emoji: '🐟', image: `${IMAGE_BASE}/fish.png` },
  { letter: 'ה', word: 'הר', english: 'Mountain', emoji: '🏔️', image: `${IMAGE_BASE}/mountain.png` },
  { letter: 'ו', word: 'ורד', english: 'Rose', emoji: '🌹', image: `${IMAGE_BASE}/rose.png` },
  { letter: 'ז', word: 'זברה', english: 'Zebra', emoji: '🦓', image: `${IMAGE_BASE}/zebra.png` },
  { letter: 'ח', word: 'חתול', english: 'Cat', emoji: '🐱', image: `${IMAGE_BASE}/cat.png` },
  { letter: 'ט', word: 'טלפון', english: 'Phone', emoji: '📞', image: `${IMAGE_BASE}/phone.png` },
  { letter: 'י', word: 'ילד', english: 'Boy', emoji: '👦', image: `${IMAGE_BASE}/boy.png` },
  { letter: 'כ', word: 'כלב', english: 'Dog', emoji: '🐕', image: `${IMAGE_BASE}/dog.png` },
  { letter: 'ל', word: 'לב', english: 'Heart', emoji: '❤️', image: `${IMAGE_BASE}/heart.png` },
  { letter: 'מ', word: 'מטריה', english: 'Umbrella', emoji: '☂️', image: `${IMAGE_BASE}/umbrella.png` },
  { letter: 'נ', word: 'נמלה', english: 'Ant', emoji: '🐜', image: `${IMAGE_BASE}/ant.png` },
  { letter: 'ס', word: 'סוס', english: 'Horse', emoji: '🐴', image: `${IMAGE_BASE}/horse.png` },
  { letter: 'ע', word: 'עוגה', english: 'Cake', emoji: '🎂', image: `${IMAGE_BASE}/cake.png` },
  { letter: 'פ', word: 'פיל', english: 'Elephant', emoji: '🐘', image: `${IMAGE_BASE}/elephant.png` },
  { letter: 'צ', word: 'צב', english: 'Turtle', emoji: '🐢', image: `${IMAGE_BASE}/turtle.png` },
  { letter: 'ק', word: 'קוף', english: 'Monkey', emoji: '🐒', image: `${IMAGE_BASE}/monkey.png` },
  { letter: 'ר', word: 'רכבת', english: 'Train', emoji: '🚂', image: `${IMAGE_BASE}/train.png` },
  { letter: 'ש', word: 'שמש', english: 'Sun', emoji: '☀️', image: `${IMAGE_BASE}/sun.png` },
  { letter: 'ת', word: 'תפוח', english: 'Apple', emoji: '🍎', image: `${IMAGE_BASE}/apple.png` },
]

const PEN_COLORS = [
  { color: '#1565c0', name: 'Blue' },
  { color: '#c62828', name: 'Red' },
  { color: '#2e7d32', name: 'Green' },
  { color: '#6a1b9a', name: 'Purple' },
  { color: '#e65100', name: 'Orange' },
  { color: illo.illustrationInk, name: 'Black' },
]

const PEN_SIZES = [
  { size: 6, label: 'S' },
  { size: 10, label: 'M' },
  { size: 16, label: 'L' },
]

function getRandomItem() {
  return LETTER_DATA[Math.floor(Math.random() * LETTER_DATA.length)]
}

function PenCursor({ color, size }) {
  return (
    <svg viewBox="0 0 32 32" width="32" height="32" className="dtl-pen-svg">
      <g transform="translate(4, 2) rotate(20, 12, 14)">
        {/* Pen body */}
        <rect x="8" y="0" width="8" height="20" rx="2" fill={color} />
        <rect x="8" y="0" width="8" height="5" rx="2" fill={illo.illustrationInk} />
        {/* Pen tip */}
        <polygon points="8,20 16,20 12,28" fill="#aaa" />
        <circle cx="12" cy="27" r="1.2" fill={color} />
        {/* Shine */}
        <rect x="9" y="6" width="2" height="10" rx="1" fill="rgba(255,255,255,0.3)" />
      </g>
    </svg>
  )
}

function DrawTheLetter() {
  const canvasRef = useRef(null)
  const [item, setItem] = useState(getRandomItem)
  const [imageError, setImageError] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [penColor, setPenColor] = useState(PEN_COLORS[0].color)
  const [penSize, setPenSize] = useState(PEN_SIZES[1].size)
  const [cursorPos, setCursorPos] = useState(null)
  const [cursorVisible, setCursorVisible] = useState(false)
  const lastPos = useRef(null)
  const penColorRef = useRef(penColor)
  const penSizeRef = useRef(penSize)

  useEffect(() => { penColorRef.current = penColor }, [penColor])
  useEffect(() => { penSizeRef.current = penSize }, [penSize])

  const drawGuide = useCallback((ctx, targetLetter) => {
    if (!ctx) return
    const size = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.45
    ctx.save()
    ctx.fillStyle = 'rgba(180, 180, 200, 0.35)'
    ctx.font = `${size}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(targetLetter, ctx.canvas.width / 2, ctx.canvas.height / 2)
    ctx.restore()
  }, [])

  const drawGrid = useCallback((ctx, w, h) => {
    ctx.save()
    ctx.strokeStyle = 'rgba(200, 200, 220, 0.3)'
    ctx.lineWidth = 1
    ctx.setLineDash([4, 4])
    ctx.beginPath()
    ctx.moveTo(w / 2, 0)
    ctx.lineTo(w / 2, h)
    ctx.moveTo(0, h / 2)
    ctx.lineTo(w, h / 2)
    ctx.stroke()
    ctx.setLineDash([])
    ctx.restore()
  }, [])

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.fillStyle = '#fafafa'
    ctx.fillRect(0, 0, rect.width, rect.height)
    drawGrid(ctx, rect.width, rect.height)
    drawGuide(ctx, item.letter)
  }, [item.letter, drawGuide, drawGrid])

  useEffect(() => {
    initCanvas()
  }, [initCanvas, item.letter])

  const getPos = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return null
    const rect = canvas.getBoundingClientRect()
    const clientX = e.clientX ?? e.touches?.[0]?.clientX
    const clientY = e.clientY ?? e.touches?.[0]?.clientY
    if (clientX == null || clientY == null) return null
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    }
  }

  const draw = (pos) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const x = pos.x * dpr
    const y = pos.y * dpr

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = penSizeRef.current * dpr
    ctx.strokeStyle = penColorRef.current

    if (lastPos.current) {
      ctx.beginPath()
      ctx.moveTo(lastPos.current.x, lastPos.current.y)
      ctx.lineTo(x, y)
      ctx.stroke()
    }
    lastPos.current = { x, y }
  }

  const handlePointerDown = (e) => {
    e.preventDefault()
    const pos = getPos(e)
    if (!pos) return
    setIsDrawing(true)
    setCursorPos({ x: e.clientX, y: e.clientY })
    const dpr = window.devicePixelRatio || 1
    lastPos.current = { x: pos.x * dpr, y: pos.y * dpr }
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.arc(lastPos.current.x, lastPos.current.y, (penSizeRef.current / 2) * dpr, 0, Math.PI * 2)
      ctx.fillStyle = penColorRef.current
      ctx.fill()
    }
  }

  const handlePointerMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
    if (!isDrawing) return
    e.preventDefault()
    const pos = getPos(e)
    if (pos) draw(pos)
  }

  const handlePointerEnter = (e) => {
    setCursorVisible(true)
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  const handlePointerLeave = () => {
    setCursorVisible(false)
    setIsDrawing(false)
    lastPos.current = null
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
    lastPos.current = null
  }

  const handleClear = () => initCanvas()

  const handleNextLetter = () => {
    setItem(getRandomItem())
    setImageError(false)
  }

  return (
    <div className="dtl-fullscreen" dir="rtl" lang="he">
      <div className="dtl-bg" />

      <Link to="/hebrew" className="dtl-back app-game-back" dir="ltr">← חזרה</Link>

      <div className="dtl-content">
        <div className="dtl-prompt-card">
          <p className="dtl-prompt">צייר את האות</p>
        </div>

        <div className="dtl-letter-row">
          <div className="dtl-item-card">
            <div className="dtl-item-image">
              {!imageError ? (
                <GamePicture pngUrl={item.image} alt={item.english} onError={() => setImageError(true)} />
              ) : null}
              <span className={`dtl-item-emoji ${imageError ? 'dtl-item-emoji--visible' : ''}`}>
                {item.emoji}
              </span>
            </div>
            <div className="dtl-item-word">
              <span className="dtl-word-highlight">{item.word[0]}</span>
              <span className="dtl-word-rest">{item.word.slice(1)}</span>
            </div>
            <span className="dtl-item-english">{item.english}</span>
          </div>

          <div className="dtl-target-card">
            <span className="dtl-target-letter">{item.letter}</span>
          </div>
        </div>

        <div className="dtl-workspace">
          <div className="dtl-canvas-frame">
            <canvas
              ref={canvasRef}
              className={`dtl-canvas ${isDrawing ? 'dtl-canvas--drawing' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerEnter={handlePointerEnter}
              onPointerLeave={handlePointerLeave}
              onTouchStart={(e) => e.preventDefault()}
            />
          </div>

          <div className="dtl-toolbar">
            <div className="dtl-tool-group">
              <span className="dtl-tool-label">צבע</span>
              <div className="dtl-colors">
                {PEN_COLORS.map((p) => (
                  <button
                    key={p.color}
                    type="button"
                    className={`dtl-color-btn ${penColor === p.color ? 'dtl-color-btn--active' : ''}`}
                    style={{ background: p.color }}
                    onClick={() => setPenColor(p.color)}
                    title={p.name}
                  />
                ))}
              </div>
            </div>
            <div className="dtl-tool-group">
              <span className="dtl-tool-label">גודל</span>
              <div className="dtl-sizes">
                {PEN_SIZES.map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    className={`dtl-size-btn ${penSize === s.size ? 'dtl-size-btn--active' : ''}`}
                    onClick={() => setPenSize(s.size)}
                  >
                    <span className="dtl-size-dot" style={{ width: s.size + 4, height: s.size + 4, background: penColor }} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dtl-actions">
          <button type="button" className="dtl-action-btn dtl-action-btn--clear" onClick={handleClear}>
            נקה
          </button>
          <button type="button" className="dtl-action-btn dtl-action-btn--next" onClick={handleNextLetter}>
            אות הבאה
          </button>
        </div>
      </div>

      {cursorVisible && cursorPos && (
        <div
          className={`dtl-floating-pen ${isDrawing ? 'dtl-floating-pen--drawing' : ''}`}
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
          }}
        >
          <PenCursor color={penColor} size={penSize} />
          <span
            className="dtl-pen-dot"
            style={{
              width: penSize,
              height: penSize,
              background: penColor,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default DrawTheLetter
