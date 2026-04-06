import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import SuccessKid from '../../components/SuccessKid'
import './FishEatsBread.css'

/* ─── inline SVGs ─── */

function SunSVG() {
  return (
    <svg className="feb-svg-sun" viewBox="0 0 80 80" fill="none">
      <circle cx="40" cy="40" r="18" fill="#FFD54F" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i * 36 * Math.PI) / 180
        const x1 = 40 + 22 * Math.cos(a)
        const y1 = 40 + 22 * Math.sin(a)
        const x2 = 40 + 34 * Math.cos(a)
        const y2 = 40 + 34 * Math.sin(a)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#FFD54F" strokeWidth="3.5" strokeLinecap="round" />
        )
      })}
    </svg>
  )
}

function CloudSVG() {
  return (
    <svg className="feb-svg-cloud" viewBox="0 0 120 50" fill="none">
      <ellipse cx="60" cy="32" rx="50" ry="16" fill="white" opacity="0.92" />
      <ellipse cx="38" cy="26" rx="24" ry="18" fill="white" opacity="0.95" />
      <ellipse cx="76" cy="28" rx="20" ry="14" fill="white" opacity="0.9" />
    </svg>
  )
}

function FishSVG({ mood = 'swimming' }) {
  const happy = mood === 'happy' || mood === 'eating'
  const yuck = mood === 'yuck'
  return (
    <svg className="feb-svg-fish" viewBox="0 0 140 90" fill="none">
      <defs>
        <linearGradient id="fish-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8A65" />
          <stop offset="50%" stopColor="#FF7043" />
          <stop offset="100%" stopColor="#F4511E" />
        </linearGradient>
        <linearGradient id="fish-belly" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFCC80" />
          <stop offset="100%" stopColor="#FFB74D" />
        </linearGradient>
      </defs>

      <path d="M15 45 L2 28 Q8 45 2 62Z" fill="#FF7043" stroke="#E64A19" strokeWidth="1.5" />
      <ellipse cx="68" cy="45" rx="52" ry="30" fill="url(#fish-body)"
        stroke="#E64A19" strokeWidth="2" />
      <ellipse cx="72" cy="54" rx="36" ry="16" fill="url(#fish-belly)" opacity="0.7" />
      <path d="M55 16 Q65 2 80 16" fill="#FF8A65" stroke="#E64A19" strokeWidth="1.5" />
      <path d="M52 55 Q42 68 56 70 Q54 60 52 55Z" fill="#FF8A65" stroke="#E64A19" strokeWidth="1" />

      <circle cx="95" cy="38" r="8" fill="white" />
      {yuck ? (
        <>
          <line x1="91" y1="34" x2="99" y2="42" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="99" y1="34" x2="91" y2="42" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="97" cy="37" r="4.5" fill="#333" />
          <circle cx="99" cy="35" r="1.8" fill="white" />
        </>
      )}

      {yuck ? (
        <path d="M108 54 Q114 48 120 54" stroke="#C62828" strokeWidth="2.5"
          fill="none" strokeLinecap="round" />
      ) : happy ? (
        <path d="M112 48 Q120 55 112 58" stroke="#C62828" strokeWidth="2.5"
          fill="none" strokeLinecap="round" />
      ) : (
        <ellipse cx="114" cy="50" rx="4" ry="3" fill="#C62828" />
      )}

      <path d="M45 35 Q50 30 55 35" stroke="#E64A19" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M55 40 Q60 35 65 40" stroke="#E64A19" strokeWidth="0.8" fill="none" opacity="0.4" />
      <path d="M45 48 Q50 43 55 48" stroke="#E64A19" strokeWidth="0.8" fill="none" opacity="0.4" />

      {happy && (
        <>
          <circle cx="125" cy="30" r="3" fill="none" stroke="#90CAF9" strokeWidth="1.2" opacity="0.7" />
          <circle cx="130" cy="22" r="2" fill="none" stroke="#90CAF9" strokeWidth="1" opacity="0.5" />
        </>
      )}
    </svg>
  )
}

/* ─── Food SVGs ─── */

function BreadSVG({ small }) {
  const s = small ? 0.7 : 1
  return (
    <svg className="feb-svg-food" viewBox="0 0 50 40" fill="none" width={50 * s} height={40 * s}>
      <defs>
        <linearGradient id="bread-fill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFECB3" />
          <stop offset="100%" stopColor="#FFE082" />
        </linearGradient>
      </defs>
      <rect x="3" y="8" width="44" height="28" rx="6" fill="#D7A04A" stroke="#A1662F" strokeWidth="1.5" />
      <rect x="7" y="12" width="36" height="20" rx="4" fill="url(#bread-fill)" />
      <path d="M8 10 Q25 2 42 10" fill="#C68B2C" stroke="#A1662F" strokeWidth="1.2" />
      <circle cx="18" cy="22" r="1.2" fill="#D7A04A" opacity="0.5" />
      <circle cx="30" cy="25" r="1" fill="#D7A04A" opacity="0.4" />
      <circle cx="24" cy="19" r="0.8" fill="#D7A04A" opacity="0.35" />
    </svg>
  )
}

function AppleSVG({ small }) {
  const s = small ? 0.7 : 1
  return (
    <svg className="feb-svg-food" viewBox="0 0 44 48" fill="none" width={44 * s} height={48 * s}>
      <defs>
        <radialGradient id="apple-g" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#EF5350" />
          <stop offset="100%" stopColor="#C62828" />
        </radialGradient>
      </defs>
      <ellipse cx="22" cy="30" rx="18" ry="17" fill="url(#apple-g)" stroke="#B71C1C" strokeWidth="1.5" />
      <path d="M22 14 Q22 6 28 4" stroke="#5D4037" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M26 10 Q30 8 28 14" fill="#66BB6A" stroke="#388E3C" strokeWidth="0.8" />
      <ellipse cx="16" cy="26" rx="4" ry="6" fill="rgba(255,255,255,0.18)" />
    </svg>
  )
}

function WormSVG({ small }) {
  const s = small ? 0.7 : 1
  return (
    <svg className="feb-svg-food" viewBox="0 0 56 40" fill="none" width={56 * s} height={40 * s}>
      <defs>
        <linearGradient id="worm-g" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F48FB1" />
          <stop offset="100%" stopColor="#EC407A" />
        </linearGradient>
      </defs>
      <path d="M6 28 Q14 10 22 26 Q30 42 38 22 Q44 10 52 18"
        stroke="url(#worm-g)" strokeWidth="7" fill="none" strokeLinecap="round" />
      <circle cx="52" cy="16" r="6" fill="#F48FB1" stroke="#EC407A" strokeWidth="1.2" />
      <circle cx="50" cy="15" r="1.5" fill="#333" />
      <circle cx="54" cy="15" r="1.5" fill="#333" />
      <path d="M49 19 Q52 22 55 19" stroke="#C2185B" strokeWidth="1" fill="none" strokeLinecap="round" />
    </svg>
  )
}

function CheeseSVG({ small }) {
  const s = small ? 0.7 : 1
  return (
    <svg className="feb-svg-food" viewBox="0 0 50 44" fill="none" width={50 * s} height={44 * s}>
      <defs>
        <linearGradient id="cheese-g" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF176" />
          <stop offset="100%" stopColor="#FFD54F" />
        </linearGradient>
      </defs>
      <path d="M4 38 L25 4 L46 38Z" fill="url(#cheese-g)" stroke="#F9A825" strokeWidth="1.8"
        strokeLinejoin="round" />
      <circle cx="20" cy="28" r="4" fill="#FBC02D" opacity="0.6" />
      <circle cx="32" cy="32" r="3" fill="#FBC02D" opacity="0.5" />
      <circle cx="26" cy="20" r="2.5" fill="#FBC02D" opacity="0.45" />
    </svg>
  )
}

function CookieSVG({ small }) {
  const s = small ? 0.7 : 1
  return (
    <svg className="feb-svg-food" viewBox="0 0 46 46" fill="none" width={46 * s} height={46 * s}>
      <defs>
        <radialGradient id="cookie-g" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FFCC80" />
          <stop offset="100%" stopColor="#E6A23C" />
        </radialGradient>
      </defs>
      <circle cx="23" cy="23" r="20" fill="url(#cookie-g)" stroke="#A1662F" strokeWidth="1.5" />
      <circle cx="16" cy="18" r="2.5" fill="#5D4037" />
      <circle cx="28" cy="16" r="2" fill="#5D4037" />
      <circle cx="20" cy="28" r="2.2" fill="#5D4037" />
      <circle cx="32" cy="26" r="1.8" fill="#5D4037" />
      <circle cx="24" cy="22" r="1.5" fill="#5D4037" />
    </svg>
  )
}

function KidSVG({ throwing }) {
  return (
    <svg className="feb-svg-kid" viewBox="0 0 80 130" fill="none">
      <defs>
        <linearGradient id="kid-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#42A5F5" />
          <stop offset="100%" stopColor="#1E88E5" />
        </linearGradient>
        <linearGradient id="kid-pants" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5C6BC0" />
          <stop offset="100%" stopColor="#3949AB" />
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="128" rx="18" ry="3" fill="rgba(0,0,0,0.12)" />
      <rect x="30" y="88" width="10" height="30" rx="5" fill="url(#kid-pants)" />
      <rect x="44" y="88" width="10" height="30" rx="5" fill="url(#kid-pants)" />
      <ellipse cx="35" cy="120" rx="8" ry="5" fill="#F44336" />
      <ellipse cx="49" cy="120" rx="8" ry="5" fill="#F44336" />
      <rect x="26" y="55" width="32" height="38" rx="10" fill="url(#kid-shirt)" />
      <rect x="16" y="58" width="10" height="26" rx="5" fill="#FFCC80"
        transform="rotate(-10, 21, 58)" />
      <g className={throwing ? 'feb-kid-arm--throw' : 'feb-kid-arm--idle'}>
        <rect x="58" y="56" width="10" height="26" rx="5" fill="#FFCC80"
          style={{ transformOrigin: '63px 58px' }} />
      </g>
      <circle cx="42" cy="40" r="20" fill="#FFCC80" />
      <path d="M22 36 Q26 15 42 18 Q58 15 62 36" fill="#5D4037" />
      <ellipse cx="42" cy="22" rx="14" ry="6" fill="#5D4037" />
      <circle cx="35" cy="40" r="3" fill="#333" />
      <circle cx="49" cy="40" r="3" fill="#333" />
      <circle cx="36" cy="39" r="1.2" fill="white" />
      <circle cx="50" cy="39" r="1.2" fill="white" />
      {throwing ? (
        <circle cx="42" cy="48" rx="4" ry="3" fill="#E57373" />
      ) : (
        <path d="M35 48 Q42 54 49 48" stroke="#C62828" strokeWidth="2"
          fill="none" strokeLinecap="round" />
      )}
      <circle cx="28" cy="45" r="4" fill="#FFAB91" opacity="0.5" />
      <circle cx="56" cy="45" r="4" fill="#FFAB91" opacity="0.5" />
    </svg>
  )
}

function ReedSVG({ flip }) {
  return (
    <svg className="feb-svg-reed" viewBox="0 0 24 80" fill="none"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}>
      <path d="M12 80 Q10 50 14 30 Q12 15 10 5" stroke="#558B2F" strokeWidth="2.5"
        fill="none" strokeLinecap="round" />
      <ellipse cx="10" cy="6" rx="5" ry="10" fill="#7CB342" opacity="0.8" />
      <path d="M14 40 Q22 35 18 28" stroke="#66BB6A" strokeWidth="1.5"
        fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ─── food data ─── */

const FOODS = [
  { id: 'bread',  name: 'לחם',    namePlural: 'פרוסות לחם',   Svg: BreadSVG,  border: '#A1887F' },
  { id: 'apple',  name: 'תפוח',   namePlural: 'תפוחים',       Svg: AppleSVG,  border: '#C62828' },
  { id: 'worm',   name: 'תולעת',  namePlural: 'תולעים',       Svg: WormSVG,   border: '#EC407A' },
  { id: 'cheese', name: 'גבינה',  namePlural: 'חתיכות גבינה', Svg: CheeseSVG, border: '#F9A825' },
  { id: 'cookie', name: 'עוגייה', namePlural: 'עוגיות',       Svg: CookieSVG, border: '#A1662F' },
]

const FOOD_MAP = Object.fromEntries(FOODS.map((f) => [f.id, f]))

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickRound(currentScore) {
  const shuffled = shuffle(FOODS)
  const mixCount = currentScore >= 4 ? (Math.random() < 0.5 ? 2 : 3)
    : currentScore >= 2 ? (Math.random() < 0.6 ? 1 : 2)
    : 1

  const order = shuffled.slice(0, mixCount).map((food) => ({
    foodId: food.id,
    count: Math.floor(Math.random() * (mixCount > 1 ? 4 : 9)) + 1,
  }))

  const orderedIds = new Set(order.map((o) => o.foodId))
  const distractors = shuffled.filter((f) => !orderedIds.has(f.id))
  const extraCount = Math.max(0, 3 - order.length)
  const options = shuffle([
    ...order.map((o) => FOOD_MAP[o.foodId]),
    ...distractors.slice(0, extraCount),
  ])

  return { order, options }
}

/* ─── main component ─── */

export default function FishEatsBread() {
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(() => pickRound(0))
  const [fed, setFed] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [dragging, setDragging] = useState(null)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const [floatingItems, setFloatingItems] = useState([])
  const [fishMood, setFishMood] = useState('swimming')
  const [arriving, setArriving] = useState(false)
  const pondRef = useRef(null)
  const itemIdRef = useRef(0)

  const { order, options } = round
  const wantedIds = new Set(order.map((o) => o.foodId))

  useEffect(() => {
    if (!arriving) return
    const timer = setTimeout(() => {
      setRound(pickRound(score))
      setFed({})
      setFeedback(null)
      setFloatingItems([])
      setFishMood('swimming')
      setArriving(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [arriving, score])

  useEffect(() => {
    if (fishMood !== 'eating' && fishMood !== 'yuck') return
    const timer = setTimeout(() => {
      if (!feedback) setFishMood('swimming')
    }, 600)
    return () => clearTimeout(timer)
  }, [fishMood, feedback])

  const handlePointerDown = useCallback((foodId, e) => {
    if (feedback || arriving) return
    e.preventDefault()
    setDragging(foodId)
    setDragPos({ x: e.clientX, y: e.clientY })
  }, [feedback, arriving])

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return
    setDragPos({ x: e.clientX, y: e.clientY })
  }, [dragging])

  const handlePointerUp = useCallback((e) => {
    if (!dragging) return
    const draggedFoodId = dragging
    setDragging(null)

    const pondEl = pondRef.current
    if (!pondEl) return
    const rect = pondEl.getBoundingClientRect()
    const inPond = (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    )
    if (!inPond) return

    const xPct = ((e.clientX - rect.left) / rect.width) * 100
    const id = ++itemIdRef.current
    setFloatingItems((prev) => [...prev, { id, x: xPct, foodId: draggedFoodId }])

    if (!wantedIds.has(draggedFoodId)) {
      setFishMood('yuck')
      setFeedback('wrong-food')
      return
    }

    const orderEntry = order.find((o) => o.foodId === draggedFoodId)
    const currentFed = fed[draggedFoodId] || 0
    const newCount = currentFed + 1

    if (newCount > orderEntry.count) {
      setFishMood('yuck')
      setFeedback({ type: 'too-many-item', foodId: draggedFoodId })
      return
    }

    const newFed = { ...fed, [draggedFoodId]: newCount }
    setFed(newFed)
    setFishMood('eating')

    const allDone = order.every((o) => (newFed[o.foodId] || 0) === o.count)
    if (allDone) {
      setFeedback('correct')
      setFishMood('happy')
      setScore((s) => s + 1)
      setTimeout(() => setArriving(true), 1800)
    }
  }, [dragging, fed, order, wantedIds])

  useEffect(() => {
    if (!dragging) return
    const onMove = (e) => handlePointerMove(e)
    const onUp = (e) => handlePointerUp(e)
    document.addEventListener('pointermove', onMove)
    document.addEventListener('pointerup', onUp)
    document.addEventListener('pointercancel', onUp)
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
    }
  }, [dragging, handlePointerMove, handlePointerUp])

  const handleRetry = () => {
    setFeedback(null)
    setFed({})
    setFloatingItems([])
    setFishMood('swimming')
  }

  const DragFoodSvg = dragging ? FOOD_MAP[dragging]?.Svg : null

  return (
    <div className="feb-fullscreen">
      {/* Sky */}
      <div className="feb-sky">
        <div className="feb-cloud feb-cloud--1"><CloudSVG /></div>
        <div className="feb-cloud feb-cloud--2"><CloudSVG /></div>
        <div className="feb-cloud feb-cloud--3"><CloudSVG /></div>
        <div className="feb-sun"><SunSVG /></div>
      </div>

      {/* Bank / dock strip */}
      <div className="feb-bank">
        <div className="feb-reed feb-reed--1"><ReedSVG /></div>
        <div className="feb-reed feb-reed--2"><ReedSVG flip /></div>
        <div className="feb-reed feb-reed--3"><ReedSVG /></div>
      </div>

      {/* Pond */}
      <div className="feb-pond" ref={pondRef}>
        <div className="feb-wave feb-wave--1" />
        <div className="feb-wave feb-wave--2" />

        {floatingItems.map(({ id, x, foodId }) => {
          const F = FOOD_MAP[foodId]?.Svg
          return F ? (
            <div key={id} className="feb-floating-bread" style={{ left: `${x}%` }}>
              <F small />
            </div>
          ) : null
        })}

        {/* Fish + speech — one column so bubble sits right above the fish */}
        <div className="feb-fish-zone">
          {!feedback && !arriving && (
            <div className="feb-speech">
              <div className="feb-speech-order">
                <span className="feb-speech-label">!אני רוצה</span>
                {order.map((o, i) => {
                  const food = FOOD_MAP[o.foodId]
                  const done = (fed[o.foodId] || 0) >= o.count
                  return (
                    <span key={o.foodId}
                      className={`feb-speech-item ${done ? 'feb-speech-item--done' : ''}`}>
                      <span className="feb-speech-icon"><food.Svg small /></span>
                      <span className="feb-speech-number">{o.count}</span>
                      <span className="feb-speech-fname">{food.namePlural}</span>
                      {i < order.length - 1 && <span className="feb-speech-sep"> + </span>}
                    </span>
                  )
                })}
              </div>
            </div>
          )}
          <div className={`feb-fish feb-fish--${fishMood}`}>
            <FishSVG mood={fishMood} />
          </div>
        </div>
      </div>

      {/* Progress tracker */}
      {!feedback && !arriving && order.length > 1 && (
        <div className="feb-progress">
          {order.map((o) => {
            const food = FOOD_MAP[o.foodId]
            const current = fed[o.foodId] || 0
            const done = current >= o.count
            return (
              <div key={o.foodId}
                className={`feb-progress-item ${done ? 'feb-progress-item--done' : ''}`}>
                <food.Svg small />
                <span className="feb-progress-count">{current}/{o.count}</span>
              </div>
            )
          })}
        </div>
      )}

      {/* UI chrome */}
      <Link to="/maths" className="feb-back app-game-back">← חזרה</Link>
      <div className="feb-score app-game-chip">
        <span className="feb-score-icon">🐟</span>
        <span>{score}</span>
      </div>

      {/* Kid on the bank */}
      <div className={`feb-kid ${dragging ? 'feb-kid--throwing' : ''}`}>
        <KidSVG throwing={!!dragging} />
      </div>

      {/* Food options row */}
      <div className="feb-baskets">
        {options.map((food) => (
          <div
            key={food.id}
            className="feb-basket"
            style={{ '--basket-border': food.border }}
            onPointerDown={(e) => handlePointerDown(food.id, e)}
          >
            <div className="feb-basket-food"><food.Svg /></div>
            <span className="feb-basket-label">{food.name}</span>
          </div>
        ))}
      </div>

      {/* Drag preview */}
      {dragging && DragFoodSvg && (
        <div
          className="feb-drag-preview"
          style={{ left: dragPos.x, top: dragPos.y }}
        >
          <DragFoodSvg />
        </div>
      )}

      {/* Feedback */}
      {feedback === 'correct' && <SuccessKid />}
      {feedback === 'correct' && (
        <div className="feb-overlay feb-overlay--success">
          <p>יאמי! הדג שבע!</p>
          <p className="feb-overlay-sub">הדג הבא מגיע…</p>
        </div>
      )}
      {feedback?.type === 'too-many-item' && (
        <div className="feb-overlay feb-overlay--wrong">
          <p>אופס! יותר מדי {FOOD_MAP[feedback.foodId]?.namePlural}!</p>
          <p className="feb-overlay-sub">
            הדג ביקש {order.find((o) => o.foodId === feedback.foodId)?.count}
          </p>
          <button type="button" className="feb-retry" onClick={handleRetry}>נסה שוב</button>
        </div>
      )}
      {feedback === 'wrong-food' && (
        <div className="feb-overlay feb-overlay--wrong-food">
          <p>זה לא מה שביקשתי!</p>
          <p className="feb-overlay-sub">
            תסתכלו מה הדג רוצה
          </p>
          <button type="button" className="feb-retry" onClick={handleRetry}>נסה שוב</button>
        </div>
      )}
    </div>
  )
}
