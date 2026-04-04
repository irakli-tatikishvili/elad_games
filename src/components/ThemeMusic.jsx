import { useEffect, useRef, useState } from 'react'
import './ThemeMusic.css'

/**
 * Calm instrumental piano (no vocals). Instrumental tracks avoid lyrics competing with reading and counting.
 * Beethoven — Piano Sonata No. 15 “Pastorale”, II. Andante (~7 min loop). Public domain recording (Wikimedia Commons).
 * Replace `public/audio/theme.mp3` to swap; optional synthetic loop: `node scripts/generate-theme.mjs` → `theme.wav`.
 */
const THEME_SRC = '/audio/theme.mp3'

export default function ThemeMusic() {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem('elad-theme-music-muted') === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('elad-theme-music-muted', muted ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [muted])

  useEffect(() => {
    const audio = new Audio(THEME_SRC)
    audio.loop = true
    audio.volume = 0.3
    audioRef.current = audio
    return () => {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (muted) {
      audio.pause()
      return
    }

    const unlock = () => {
      audio.play().then(() => {
        document.removeEventListener('pointerdown', unlock, true)
      }).catch(() => {})
    }

    const p = audio.play()
    if (p !== undefined) {
      p.then(() => {
        document.removeEventListener('pointerdown', unlock, true)
      }).catch(() => {})
    }
    document.addEventListener('pointerdown', unlock, true)
    return () => document.removeEventListener('pointerdown', unlock, true)
  }, [muted])

  return (
    <button
      type="button"
      className="theme-music-toggle"
      aria-pressed={!muted}
      aria-label={muted ? 'Turn music on' : 'Turn music off'}
      onClick={() => setMuted((m) => !m)}
    >
      <span className="theme-music-toggle-icon" aria-hidden>
        {muted ? '🔇' : '🔊'}
      </span>
      <span className="theme-music-toggle-text">{muted ? 'Music off' : 'Music on'}</span>
    </button>
  )
}
