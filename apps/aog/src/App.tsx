import { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import AogMain from './pages/AogMain'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

import Home from './pages/Home'

import './styles/layout.css'
import './styles/page.css'

export default function App() {
    const location = useLocation()
    const navigate = useNavigate()
    const [activeTeam, setActiveTeam] = useState<'home' | 'aog'>('home')

    const handleEnterTeamAog = () => {
        setActiveTeam('aog')
        navigate('/')
    }

    const handleEnterTeamBara = () => {
        window.location.href = 'https://teambara.vercel.app/'
    }

    if (activeTeam === 'home') {
        return <Home onEnterTeamAog={handleEnterTeamAog} onEnterTeamBara={handleEnterTeamBara} />
    }

    const isAogMain = location.pathname === '/'

    return (
        <div className="layout">
            {!isAogMain && <Header onGoMain={() => setActiveTeam('home')} />}

            <div className="pageFrame">
                <div key={location.pathname} className="pageAnim">
                    <Routes location={location}>
                        <Route path="/" element={<AogMain onGoMain={() => setActiveTeam('home')} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>

            {!isAogMain && <Footer />}
        </div>
    )
}
