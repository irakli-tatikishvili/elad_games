import { useState, useCallback, useRef, useId } from 'react'
import { Link } from 'react-router-dom'
import { illo } from '../../theme/tokens'
import SuccessKid from '../../components/SuccessKid'
import './StrawberryLion.css'

function LionSVG({ mood }) {
  const mouthOpen = mood === 'asking' || mood === 'eating'
  const isFull = mood === 'full'
  const isHappy = mood === 'happy'

  const bodyColor = '#d4920b'
  const bellyColor = '#f5d77a'

  return (
    <svg viewBox="0 0 200 220" className="sl-lion-svg">
      <defs>
        <radialGradient id="sl-lion-mane" cx="45%" cy="35%">
          <stop offset="0%" stopColor="#c47f00" />
          <stop offset="100%" stopColor="#7a4a00" />
        </radialGradient>
      </defs>
      {/* Mane */}
      <ellipse cx="100" cy="105" rx="75" ry="72" fill="url(#sl-lion-mane)" />
      <circle cx="40" cy="70" r="18" fill="url(#sl-lion-mane)" />
      <circle cx="55" cy="45" r="18" fill="url(#sl-lion-mane)" />
      <circle cx="85" cy="35" r="18" fill="url(#sl-lion-mane)" />
      <circle cx="115" cy="35" r="18" fill="url(#sl-lion-mane)" />
      <circle cx="145" cy="45" r="18" fill="url(#sl-lion-mane)" />
      <circle cx="160" cy="70" r="18" fill="url(#sl-lion-mane)" />
      <circle cx="160" cy="100" r="16" fill="url(#sl-lion-mane)" />
      <circle cx="40" cy="100" r="16" fill="url(#sl-lion-mane)" />

      {/* Face */}
      <ellipse cx="100" cy="108" rx="56" ry="52" fill={bodyColor} />

      {/* Belly (visible when full) */}
      {isFull && (
        <ellipse cx="100" cy="185" rx="45" ry="32" fill={bellyColor} opacity="0.8" className="sl-lion-belly" />
      )}

      {/* Ears */}
      <circle cx="55" cy="65" r="12" fill={bodyColor} />
      <circle cx="55" cy="65" r="7" fill="#c47f00" />
      <circle cx="145" cy="65" r="12" fill={bodyColor} />
      <circle cx="145" cy="65" r="7" fill="#c47f00" />

      {/* Eyes */}
      <ellipse cx="78" cy="95" rx="10" ry={isHappy ? 3 : isFull ? 6 : 10} fill="white" />
      <ellipse cx="122" cy="95" rx="10" ry={isHappy ? 3 : isFull ? 6 : 10} fill="white" />
      {!isHappy && (
        <>
          <circle cx="80" cy={isFull ? 94 : 97} r="5" fill={illo.illustrationInk} />
          <circle cx="124" cy={isFull ? 94 : 97} r="5" fill={illo.illustrationInk} />
          <circle cx="81" cy={isFull ? 92 : 95} r="1.5" fill="white" />
          <circle cx="125" cy={isFull ? 92 : 95} r="1.5" fill="white" />
        </>
      )}
      {isHappy && (
        <>
          <path d="M70,95 Q78,88 86,95" fill="none" stroke={illo.illustrationInk} strokeWidth={illo.strokeWidth} strokeLinecap="round" />
          <path d="M114,95 Q122,88 130,95" fill="none" stroke={illo.illustrationInk} strokeWidth={illo.strokeWidth} strokeLinecap="round" />
        </>
      )}

      {/* Nose */}
      <ellipse cx="100" cy="112" rx="8" ry="6" fill="#6d3b00" />
      <ellipse cx="100" cy="110" rx="3" ry="2" fill="#8d5b20" />

      {/* Mouth */}
      {mouthOpen && (
        <ellipse cx="100" cy="128" rx="14" ry="10" fill="#8b0000" className="sl-lion-mouth-open" />
      )}
      {isFull && (
        <>
          <path d="M88,125 Q100,118 112,125" fill="none" stroke="#6d3b00" strokeWidth="2.5" strokeLinecap="round" />
          {/* Dizzy sparkles (vector, no emoji) */}
          <g className="sl-lion-dizzy">
            <path d="M58,76 L61,80 L64,76 L61,72 Z" fill="#90caf9" opacity="0.95" />
          </g>
          <g className="sl-lion-dizzy sl-lion-dizzy--late">
            <path d="M134,76 L137,80 L140,76 L137,72 Z" fill="#90caf9" opacity="0.85" />
          </g>
        </>
      )}
      {isHappy && (
        <path d="M85,122 Q100,138 115,122" fill="none" stroke="#6d3b00" strokeWidth="3" strokeLinecap="round" />
      )}
      {!mouthOpen && !isFull && !isHappy && (
        <path d="M90,124 Q100,130 110,124" fill="none" stroke="#6d3b00" strokeWidth="2.5" strokeLinecap="round" />
      )}

      {/* Whiskers */}
      <line x1="55" y1="110" x2="35" y2="105" stroke="#8d5b20" strokeWidth="1.5" />
      <line x1="55" y1="115" x2="33" y2="118" stroke="#8d5b20" strokeWidth="1.5" />
      <line x1="145" y1="110" x2="165" y2="105" stroke="#8d5b20" strokeWidth="1.5" />
      <line x1="145" y1="115" x2="167" y2="118" stroke="#8d5b20" strokeWidth="1.5" />

      {/* Cheeks */}
      <circle cx="68" cy="118" r="8" fill="#e8a040" opacity="0.5" />
      <circle cx="132" cy="118" r="8" fill="#e8a040" opacity="0.5" />

      {isFull && (
        <>
          <circle cx="68" cy="118" r="10" fill="#5cb85c" opacity="0.3" />
          <circle cx="132" cy="118" r="10" fill="#5cb85c" opacity="0.3" />
        </>
      )}
    </svg>
  )
}

export function StrawberrySVG({ size = 48 }) {
  const gid = useId().replace(/:/g, '')
  const shineId = `strawberry-shine-${gid}`
  return (
    <svg viewBox="0 0 40 48" width={size} height={size * 1.2} className="sbl-strawberry-svg">
      <defs>
        <radialGradient id={shineId} cx="35%" cy="30%">
          <stop offset="0%" stopColor="white" stopOpacity="0.25" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Stem */}
      <path d="M16,8 Q20,2 24,8" fill="none" stroke="#2e7d32" strokeWidth="2" />
      {/* Leaves */}
      <path d="M14,12 Q8,4 20,10" fill="#4caf50" />
      <path d="M26,12 Q32,4 20,10" fill="#4caf50" />
      <path d="M20,10 Q20,2 20,10" fill="#388e3c" />
      {/* Berry */}
      <ellipse cx="20" cy="28" rx="14" ry="17" fill="#e53935" />
      <ellipse cx="20" cy="28" rx="14" ry="17" fill={`url(#${shineId})`} />
      {/* Seeds */}
      <ellipse cx="14" cy="22" rx="1.2" ry="1.5" fill="#ffcdd2" transform="rotate(-15,14,22)" />
      <ellipse cx="26" cy="22" rx="1.2" ry="1.5" fill="#ffcdd2" transform="rotate(15,26,22)" />
      <ellipse cx="12" cy="30" rx="1.2" ry="1.5" fill="#ffcdd2" />
      <ellipse cx="28" cy="30" rx="1.2" ry="1.5" fill="#ffcdd2" />
      <ellipse cx="20" cy="25" rx="1.2" ry="1.5" fill="#ffcdd2" />
      <ellipse cx="16" cy="35" rx="1.2" ry="1.5" fill="#ffcdd2" />
      <ellipse cx="24" cy="35" rx="1.2" ry="1.5" fill="#ffcdd2" />
      <ellipse cx="20" cy="40" rx="1.2" ry="1.5" fill="#ffcdd2" />
    </svg>
  )
}

function getTarget() {
  return Math.floor(Math.random() * 5) + 1
}

function StrawberryLion() {
  const [target, setTarget] = useState(getTarget)
  const [fed, setFed] = useState(0)
  const [mood, setMood] = useState('asking')
  const [flyingBerries, setFlyingBerries] = useState([])
  const [message, setMessage] = useState('')
  const flyIdRef = useRef(0)

  const totalBerries = 8

  const handleFeed = useCallback((index) => {
    if (mood === 'happy' || mood === 'full') return

    const newFed = fed + 1
    setFed(newFed)

    flyIdRef.current += 1
    const flyId = flyIdRef.current
    setFlyingBerries((prev) => [...prev, { id: flyId, index }])
    setTimeout(() => {
      setFlyingBerries((prev) => prev.filter((b) => b.id !== flyId))
    }, 600)

    if (newFed === target) {
      setMood('eating')
      setTimeout(() => {
        setMood('happy')
        setMessage('טעים! תודה!')
      }, 500)
    } else if (newFed > target) {
      setMood('full')
      setMessage('יותר מדי! אני שבע מדי!')
    } else {
      setMood('eating')
      setTimeout(() => setMood('asking'), 400)
    }
  }, [fed, target, mood])

  const handleNext = () => {
    setTarget(getTarget())
    setFed(0)
    setMood('asking')
    setMessage('')
    setFlyingBerries([])
  }

  const handleRetry = () => {
    setFed(0)
    setMood('asking')
    setMessage('')
    setFlyingBerries([])
  }

  const remaining = target - fed
  const berrySlots = Array.from({ length: totalBerries }, (_, i) => i)

  return (
    <div className="sbl-fullscreen">
      <div className="sbl-bg" />

      {/* Grass */}
      <div className="sbl-grass" />

      {/* Clouds */}
      <div className="sbl-cloud sbl-cloud--1" />
      <div className="sbl-cloud sbl-cloud--2" />
      <div className="sbl-cloud sbl-cloud--3" />

      <Link to="/maths" className="sbl-back app-game-back">← חזרה</Link>

      <div className="sbl-content">
        {/* Speech bubble */}
        <div className={`sbl-speech ${mood === 'full' || mood === 'happy' ? 'sbl-speech--result' : ''}`}>
          {mood === 'asking' || mood === 'eating' ? (
            <p className="sbl-speech-text">
              אני רוצה{' '}
              <span className="sbl-speech-num">{target}</span>
              {target === 1 ? ' תות' : ' תותים'}!
            </p>
          ) : (
            <p className="sbl-speech-text">{message}</p>
          )}
          {(mood === 'asking' || mood === 'eating') && fed > 0 && remaining > 0 && (
            <p className="sbl-speech-sub">עוד {remaining} בבקשה!</p>
          )}
        </div>

        {/* Lion */}
        <div className={`sbl-lion ${mood === 'eating' ? 'sbl-lion--eating' : ''} ${mood === 'full' ? 'sbl-lion--full' : ''} ${mood === 'happy' ? 'sbl-lion--happy' : ''}`}>
          <LionSVG mood={mood} />
          {/* Fed counter */}
          <div className="sbl-fed-counter">
            {Array.from({ length: fed }, (_, i) => (
              <span key={i} className="sbl-fed-berry" aria-hidden>
                <StrawberrySVG size={18} />
              </span>
            ))}
          </div>
        </div>

        {/* Strawberry patch */}
        {mood !== 'happy' && mood !== 'full' && (
          <div className="sbl-patch">
            <p className="sbl-patch-label">לחצו על תות להאכיל את האריה!</p>
            <div className="sbl-berries">
              {berrySlots.map((i) => {
                const isFed = i < fed
                return (
                  <button
                    key={i}
                    type="button"
                    className={`sbl-berry-btn ${isFed ? 'sbl-berry-btn--fed' : ''}`}
                    onClick={() => !isFed && handleFeed(i)}
                    disabled={isFed}
                  >
                    <StrawberrySVG size={40} />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Result actions */}
        {mood === 'happy' && <SuccessKid />}
        {mood === 'happy' && (
          <div className="sbl-result">
            <button type="button" className="sbl-btn sbl-btn--next" onClick={handleNext}>
              סיבוב הבא!
            </button>
          </div>
        )}

        {mood === 'full' && (
          <div className="sbl-result">
            <button type="button" className="sbl-btn sbl-btn--retry" onClick={handleRetry}>
              נסה שוב
            </button>
          </div>
        )}
      </div>

      {/* Flying strawberry animations */}
      {flyingBerries.map((b) => (
        <div key={b.id} className="sbl-flying-berry" aria-hidden>
          <StrawberrySVG size={36} />
        </div>
      ))}
    </div>
  )
}

export default StrawberryLion
