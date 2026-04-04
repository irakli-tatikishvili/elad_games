import { Routes, Route } from 'react-router-dom'
import ThemeMusic from './components/ThemeMusic'
import Home from './pages/Home'
import Portal from './pages/Portal'
import HebrewSection from './sections/HebrewSection'
import MathsSection from './sections/MathsSection'
import EnglishSection from './sections/EnglishSection'

function App() {
  return (
    <>
    <ThemeMusic />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portal" element={<Portal />} />
      <Route path="/hebrew" element={<HebrewSection />} />
      <Route path="/hebrew/*" element={<HebrewSection />} />
      <Route path="/maths" element={<MathsSection />} />
      <Route path="/maths/*" element={<MathsSection />} />
      <Route path="/english" element={<EnglishSection />} />
      <Route path="/english/*" element={<EnglishSection />} />
    </Routes>
    </>
  )
}

export default App
