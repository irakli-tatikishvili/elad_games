let audioCtx = null

function getContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return null
    audioCtx = new Ctx()
  }
  return audioCtx
}

/** Short UI “pop” for taps on buttons and links (Web Audio, no asset file). */
export function playClickSound() {
  const ctx = getContext()
  if (!ctx) return
  try {
    if (ctx.state === 'suspended') void ctx.resume()

    const t0 = ctx.currentTime
    const osc = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(580, t0)
    osc.frequency.exponentialRampToValueAtTime(920, t0 + 0.045)

    osc2.type = 'triangle'
    osc2.frequency.setValueAtTime(1160, t0)
    osc2.frequency.exponentialRampToValueAtTime(1480, t0 + 0.04)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(4200, t0)

    gain.gain.setValueAtTime(0.0001, t0)
    gain.gain.exponentialRampToValueAtTime(0.11, t0 + 0.006)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.085)

    osc.connect(filter)
    osc2.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(t0)
    osc2.start(t0)
    osc.stop(t0 + 0.09)
    osc2.stop(t0 + 0.09)
  } catch {
    /* ignore */
  }
}

/** Delegated click listener for buttons and navigation links. */
export function initClickSounds() {
  if (typeof document === 'undefined') return () => {}

  const onClick = (e) => {
    const el = e.target?.closest?.(
      'button, a[href], [role="button"], input[type="submit"], input[type="button"]',
    )
    if (!el || el.closest('[data-no-click-sound]') || el.closest('.theme-music-toggle')) return
    if ((el.tagName === 'BUTTON' || el.tagName === 'INPUT') && el.disabled) return
    if (el.tagName === 'A' && !el.getAttribute('href')) return
    playClickSound()
  }

  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}
