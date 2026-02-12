import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <header className="menu">
                <NavLink to="/" className="brand">
                    <img src="/logo/logo-header.svg" alt="AOG Company Logo" className="brandLogo" />
                </NavLink>

                <nav className="nav desktop-nav">
                    <NavLink to="/" end>회사소개</NavLink>
                    <NavLink to="/about">사업영역</NavLink>
                    <NavLink to="/portfolio">경호실적</NavLink>
                    <NavLink to="/contact">상담</NavLink>
                    <a href="https://teambara.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-bara">
                        TEAM BARA
                    </a>
                </nav>

                <button 
                    className="hamburger-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="메뉴"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
                <nav className="mobile-nav">
                    <button 
                        className="close-btn"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        ✕
                    </button>
                    <NavLink to="/" end onClick={() => setIsMenuOpen(false)}>회사소개</NavLink>
                    <NavLink to="/about" onClick={() => setIsMenuOpen(false)}>사업영역</NavLink>
                    <NavLink to="/portfolio" onClick={() => setIsMenuOpen(false)}>경호실적</NavLink>
                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>상담</NavLink>
                    <a href="https://teambara.vercel.app/" target="_blank" rel="noopener noreferrer" className="nav-bara mobile-bara" onClick={() => setIsMenuOpen(false)}>
                        TEAM BARA
                    </a>
                </nav>
            </div>
        </>
    )
}
