import { Routes, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'

import AogMain from './pages/AogMain'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'

import './styles/layout.css'
import './styles/page.css'

export default function App() {
    const location = useLocation()
    const isAogMain = location.pathname === '/'

    return (
        <div className="layout">
            {!isAogMain && <Header />}

            <div className="pageFrame">
                <div key={location.pathname} className="pageAnim">
                    <Routes location={location}>
                        <Route path="/" element={<AogMain />} />
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
