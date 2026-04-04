import { useEffect, useState } from 'react'
import './SuccessKid.css'

export default function SuccessKid() {
  const [stage, setStage] = useState('fly-in')

  useEffect(() => {
    const t1 = setTimeout(() => setStage('celebrate'), 600)
    const t2 = setTimeout(() => setStage('settle'), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className={`sk sk--${stage}`} aria-hidden>
      <div className="sk-burst">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className="sk-ray" style={{ '--i': i }} />
        ))}
      </div>

      <img
        className="sk-img"
        src="/images/shared/elad-success.png"
        alt=""
        draggable={false}
      />

      <div className="sk-sparkles">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="sk-sparkle" style={{ '--j': i }}>✦</span>
        ))}
      </div>
    </div>
  )
}
