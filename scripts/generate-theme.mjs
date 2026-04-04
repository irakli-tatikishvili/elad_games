/**
 * Generates a cheerful looping background theme (WAV) for the kids app.
 * Run: node scripts/generate-theme.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const sampleRate = 44100
const duration = 12.8
const numSamples = Math.floor(sampleRate * duration)

function noteHz(midi) {
  return 440 * 2 ** ((midi - 69) / 12)
}

/** C major pentatonic + octave for a bright kids-game feel */
const MELODY = [
  { m: 72, t: 0, d: 0.35 },
  { m: 74, t: 0.4, d: 0.35 },
  { m: 76, t: 0.8, d: 0.4 },
  { m: 79, t: 1.35, d: 0.45 },
  { m: 76, t: 1.95, d: 0.35 },
  { m: 74, t: 2.45, d: 0.35 },
  { m: 72, t: 2.9, d: 0.5 },
  { m: 74, t: 3.55, d: 0.35 },
  { m: 76, t: 4.0, d: 0.4 },
  { m: 79, t: 4.5, d: 0.45 },
  { m: 81, t: 5.1, d: 0.5 },
  { m: 79, t: 5.75, d: 0.35 },
  { m: 76, t: 6.25, d: 0.4 },
  { m: 74, t: 6.8, d: 0.45 },
  { m: 72, t: 7.4, d: 0.55 },
  { m: 74, t: 8.1, d: 0.35 },
  { m: 76, t: 8.55, d: 0.4 },
  { m: 79, t: 9.05, d: 0.45 },
  { m: 76, t: 9.65, d: 0.35 },
  { m: 74, t: 10.1, d: 0.35 },
  { m: 72, t: 10.55, d: 0.55 },
  { m: 74, t: 11.25, d: 0.35 },
  { m: 76, t: 11.7, d: 0.45 },
]

const CHORD_ROOTS = [
  { t: 0, m: 60 },
  { t: 3.2, m: 65 },
  { t: 6.4, m: 67 },
  { t: 9.6, m: 65 },
]

function envelope(t, attack, release, total) {
  if (t < 0 || t > total) return 0
  if (t < attack) return t / attack
  if (t > total - release) return (total - t) / release
  return 1
}

function sampleAt(timeSec) {
  const loopT = timeSec % duration
  let sum = 0

  for (const { t, m } of CHORD_ROOTS) {
    const rel = loopT - t
    if (rel < 0 || rel > 3.15) continue
    const hz1 = noteHz(m)
    const hz2 = noteHz(m + 7)
    const hz3 = noteHz(m + 12)
    const env = envelope(rel, 0.08, 0.35, 3.15) * 0.09
    sum += Math.sin(2 * Math.PI * hz1 * loopT) * env
    sum += Math.sin(2 * Math.PI * hz2 * loopT) * env * 0.55
    sum += Math.sin(2 * Math.PI * hz3 * loopT) * env * 0.35
  }

  for (const { m, t, d } of MELODY) {
    const rel = loopT - t
    if (rel < 0 || rel > d) continue
    const hz = noteHz(m)
    const env = envelope(rel, 0.02, 0.06, d) * 0.14
    sum += Math.sin(2 * Math.PI * hz * loopT) * env
    sum += Math.sin(2 * Math.PI * hz * 2 * loopT) * env * 0.25
  }

  const pulse = 0.018 * Math.sin(2 * Math.PI * 2 * loopT)
  sum += pulse

  const soft = Math.sin(2 * Math.PI * 0.25 * loopT) * 0.02
  sum *= 0.85 + soft

  return Math.max(-1, Math.min(1, sum))
}

const dataSize = numSamples * 2
const buffer = Buffer.alloc(44 + dataSize)

buffer.write('RIFF', 0)
buffer.writeUInt32LE(36 + dataSize, 4)
buffer.write('WAVE', 8)
buffer.write('fmt ', 12)
buffer.writeUInt32LE(16, 16)
buffer.writeUInt16LE(1, 20)
buffer.writeUInt16LE(1, 22)
buffer.writeUInt32LE(sampleRate, 24)
buffer.writeUInt32LE(sampleRate * 2, 28)
buffer.writeUInt16LE(2, 32)
buffer.writeUInt16LE(16, 34)
buffer.write('data', 36)
buffer.writeUInt32LE(dataSize, 40)

for (let i = 0; i < numSamples; i++) {
  const t = i / sampleRate
  const fadeIn = Math.min(1, t / 0.25)
  const fadeOut = Math.min(1, (duration - t) / 0.35)
  const v = sampleAt(t) * fadeIn * fadeOut
  buffer.writeInt16LE(Math.round(v * 32000), 44 + i * 2)
}

const outDir = path.join(root, 'public', 'audio')
fs.mkdirSync(outDir, { recursive: true })
const outPath = path.join(outDir, 'theme.wav')
fs.writeFileSync(outPath, buffer)
console.log('Wrote', outPath, `(${(buffer.length / 1024).toFixed(1)} KB)`)
