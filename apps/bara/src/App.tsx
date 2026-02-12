import { Route, Routes, useLocation } from 'react-router-dom'

import Header from './components/Header'

import Home from './pages/Home'
import History from './pages/History'
import Program from './pages/Program'
import Tube from './pages/Tube'
import Contact from './pages/Contact'

import './styles/layout.css'
import './styles/home.css'

export default function App() {
  const location = useLocation()

  return (
    <div className="b-root">
      <Header />

      <main className="b-main">
        <div key={location.pathname} className="b-transition">
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/program" element={<Program />} />
            <Route path="/tube" element={<Tube />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
