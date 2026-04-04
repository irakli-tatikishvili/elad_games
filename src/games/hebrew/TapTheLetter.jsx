import { useState } from 'react'
import GameLayout from '../../components/GameLayout'
import BigButton from '../../components/BigButton'
import SuccessKid from '../../components/SuccessKid'
import './TapTheLetter.css'

// Hebrew alphabet (Alef-Bet) - first 8 letters for demo
const HEBREW_LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח']

function getRandomLetter() {
  return HEBREW_LETTERS[Math.floor(Math.random() * HEBREW_LETTERS.length)]
}

function getLetterOptions(target) {
  const options = new Set([target])
  while (options.size < 4) {
    options.add(getRandomLetter())
  }
  return [...options].sort(() => Math.random() - 0.5)
}

function initRound() {
  const target = getRandomLetter()
  return { targetLetter: target, letters: getLetterOptions(target) }
}

function TapTheLetter() {
  const [round, setRound] = useState(initRound)
  const [feedback, setFeedback] = useState(null)
  const { targetLetter, letters } = round

  const handleTap = (letter) => {
    if (feedback) return
    if (letter === targetLetter) {
      setFeedback('correct')
    } else {
      setFeedback('wrong')
    }
  }

  const playAgain = () => {
    setRound(initRound())
    setFeedback(null)
  }

  return (
    <GameLayout title="לחצו על האות" backTo="/hebrew">
      <div className="tap-the-letter" dir="rtl" lang="he">
        <p className="tap-the-letter-prompt">לחצו על האות: <strong>{targetLetter}</strong></p>
        <div className="tap-the-letter-options">
          {letters.map((letter) => (
            <button
              key={letter}
              type="button"
              className={`tap-the-letter-btn ${feedback === 'correct' && letter === targetLetter ? 'tap-the-letter-btn--correct' : ''} ${feedback === 'wrong' && letter === targetLetter ? 'tap-the-letter-btn--highlight' : ''}`}
              onClick={() => handleTap(letter)}
              disabled={!!feedback}
            >
              {letter}
            </button>
          ))}
        </div>
        {feedback === 'correct' && <SuccessKid />}
        {feedback === 'correct' && (
          <div className="tap-the-letter-feedback tap-the-letter-feedback--success">
            <p>כל הכבוד!</p>
            <BigButton onClick={playAgain}>שחק שוב</BigButton>
          </div>
        )}
        {feedback === 'wrong' && (
          <div className="tap-the-letter-feedback tap-the-letter-feedback--wrong">
            <p>נסה שוב! לחצו על האות {targetLetter}</p>
            <BigButton onClick={playAgain}>נסה שוב</BigButton>
          </div>
        )}
      </div>
    </GameLayout>
  )
}

export default TapTheLetter
