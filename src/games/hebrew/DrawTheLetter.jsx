import { useState, useRef, useEffect, useCallback } from 'react'
import GameLayout from '../../components/GameLayout'
import BigButton from '../../components/BigButton'
import './DrawTheLetter.css'

const HEBREW_LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת']

function getRandomLetter() {
  return HEBREW_LETTERS[Math.floor(Math.random() * HEBREW_LETTERS.length)]
}

function DrawTheLetter() {
  const canvasRef = useRef(null)
  const [letter, setLetter] = useState(getRandomLetter)
  const [isDrawing, setIsDrawing] = useState(false)
  const lastPos = useRef(null)

  const drawGuide = useCallback((ctx, targetLetter) => {
    if (!ctx) return
    const size = Math.min(ctx.canvas.width, ctx.canvas.height) * 0.4
    ctx.save()
    ctx.fillStyle = 'rgba(200, 200, 200, 0.6)'
    ctx.font = `${size}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(targetLetter, ctx.canvas.width / 2, ctx.canvas.height / 2)
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
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, rect.width, rect.height)
    drawGuide(ctx, letter)
  }, [letter, drawGuide])

  useEffect(() => {
    initCanvas()
  }, [initCanvas, letter])

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
    const rect = canvas.getBoundingClientRect()
    const dpr = window.devicePixelRatio || 1
    const x = pos.x * dpr
    const y = pos.y * dpr

    ctx.lineCap = 'round'
    ctx.lineWidth = 12 * dpr
    ctx.strokeStyle = '#2563eb'

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
    lastPos.current = {
      x: pos.x * (window.devicePixelRatio || 1),
      y: pos.y * (window.devicePixelRatio || 1),
    }
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.arc(lastPos.current.x, lastPos.current.y, 6 * (window.devicePixelRatio || 1), 0, Math.PI * 2)
      ctx.fillStyle = '#2563eb'
      ctx.fill()
    }
  }

  const handlePointerMove = (e) => {
    if (!isDrawing) return
    e.preventDefault()
    const pos = getPos(e)
    if (pos) draw(pos)
  }

  const handlePointerUp = () => {
    setIsDrawing(false)
    lastPos.current = null
  }

  const handleClear = () => {
    initCanvas()
  }

  const handleNextLetter = () => {
    setLetter(getRandomLetter())
  }

  return (
    <GameLayout title="Draw the Letter" backTo="/hebrew">
      <div className="draw-the-letter" dir="rtl" lang="he">
        <p className="draw-the-letter-prompt">צייר את האות</p>
        <p className="draw-the-letter-prompt-en">Draw the letter: {letter}</p>
        <div className="draw-the-letter-target">{letter}</div>
        <div className="draw-the-letter-canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="draw-the-letter-canvas"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={(e) => e.preventDefault()}
          />
        </div>
        <div className="draw-the-letter-actions">
          <BigButton onClick={handleClear}>Clear</BigButton>
          <BigButton onClick={handleNextLetter}>Next letter</BigButton>
        </div>
      </div>
    </GameLayout>
  )
}

export default DrawTheLetter
