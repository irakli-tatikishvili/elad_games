import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  IceCreamTruck,
  CartoonKid,
  IceCreamCone,
  Seller,
  WalkingKid,
  CloudSVG,
  SunSVG,
} from './IceCreamIllustrations'
import './IceCreamSeller.css'

function initCustomer() {
  const requested = Math.floor(Math.random() * 4) + 1
  const kidIndex = Math.floor(Math.random() * 5)
  return { requested, kidIndex }
}

function IceCreamSeller() {
  const [customer, setCustomer] = useState(null)
  const [customerArriving, setCustomerArriving] = useState(true)
  const [given, setGiven] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [score, setScore] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const [flavorCounter, setFlavorCounter] = useState(0)
  const dropZoneRef = useRef(null)

  useEffect(() => {
    if (!customerArriving) return
    const timer = setTimeout(() => {
      setCustomer(initCustomer())
      setCustomerArriving(false)
      setFeedback(null)
      setGiven(0)
    }, 1200)
    return () => clearTimeout(timer)
  }, [customerArriving])

  const handlePointerDown = useCallback((e) => {
    if (!customer || feedback || customerArriving) return
    e.preventDefault()
    setDragging(true)
    setDragPos({ x: e.clientX, y: e.clientY })
  }, [customer, feedback, customerArriving])

  const handlePointerMove = useCallback((e) => {
    if (!dragging) return
    setDragPos({ x: e.clientX, y: e.clientY })
  }, [dragging])

  const handlePointerUp = useCallback((e) => {
    if (!dragging || !customer) return
    setDragging(false)

    const dropEl = dropZoneRef.current
    if (dropEl) {
      const rect = dropEl.getBoundingClientRect()
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const newCount = given + 1
        setGiven(newCount)
        setFlavorCounter((c) => c + 1)
        if (newCount === customer.requested) {
          setFeedback('correct')
          setScore((s) => s + 1)
          setTimeout(() => setCustomerArriving(true), 1500)
        } else if (newCount > customer.requested) {
          setFeedback('too-many')
        }
      }
    }
  }, [dragging, customer, given])

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

  const handleTryAgain = () => {
    setFeedback(null)
    setGiven(0)
  }

  return (
    <div className="ics-fullscreen">
      {/* Background layers */}
      <div className="ics-sky">
        <div className="ics-cloud ics-cloud--1"><CloudSVG /></div>
        <div className="ics-cloud ics-cloud--2"><CloudSVG /></div>
        <div className="ics-cloud ics-cloud--3"><CloudSVG /></div>
        <div className="ics-sun"><SunSVG /></div>
      </div>
      <div className="ics-grass" />
      <div className="ics-road">
        <div className="ics-road-lines" />
      </div>

      {/* UI */}
      <Link to="/maths" className="ics-back">← Back</Link>
      <div className="ics-scoreboard">
        <IceCreamCone flavor={0} />
        <span>{score}</span>
      </div>

      {/* Truck with seller */}
      <div className="ics-truck-area">
        <div className="ics-truck-wrapper">
          <IceCreamTruck />
          <div className="ics-seller-in-window">
            <Seller />
          </div>
        </div>
        <div
          className="ics-dispenser"
          onPointerDown={handlePointerDown}
        >
          <IceCreamCone flavor={flavorCounter} />
          <span className="ics-dispenser-label">Drag me!</span>
        </div>
      </div>

      {/* Customer area */}
      <div className="ics-customer-zone">
        {customerArriving ? (
          <div className="ics-customer-walking">
            <WalkingKid kidIndex={Math.floor(Math.random() * 5)} />
          </div>
        ) : customer ? (
          <div className="ics-customer">
            <CartoonKid kidIndex={customer.kidIndex} />
            <div className="ics-speech">
              <span className="ics-speech-number">{customer.requested}</span> please!
            </div>
            <div
              className={`ics-customer-tray ${feedback === 'correct' ? 'ics-customer-tray--happy' : ''}`}
              ref={dropZoneRef}
            >
              {given > 0
                ? Array.from({ length: given }, (_, i) => (
                    <span key={i} className="ics-tray-ice">
                      <IceCreamCone flavor={i} />
                    </span>
                  ))
                : <span className="ics-tray-hint">Drop here!</span>
              }
            </div>
          </div>
        ) : null}
      </div>

      {/* Drag preview */}
      {dragging && (
        <div
          className="ics-drag-preview"
          style={{ left: dragPos.x, top: dragPos.y }}
        >
          <IceCreamCone flavor={flavorCounter} />
        </div>
      )}

      {/* Feedback overlays */}
      {feedback === 'correct' && (
        <div className="ics-overlay ics-overlay--success">
          <div className="ics-overlay-stars">
            <span>⭐</span><span>🌟</span><span>⭐</span>
          </div>
          <p>Yummy! Perfect!</p>
          <p className="ics-overlay-sub">Next customer coming...</p>
        </div>
      )}
      {feedback === 'too-many' && (
        <div className="ics-overlay ics-overlay--wrong">
          <p>Oops! Too many!</p>
          <p className="ics-overlay-sub">They wanted {customer?.requested}</p>
          <button className="ics-retry" onClick={handleTryAgain}>Try again</button>
        </div>
      )}
    </div>
  )
}

export default IceCreamSeller
