import { useState } from 'react'
import { NavLink } from 'react-router-dom'

interface HeaderProps {
    onGoMain: () => void
}

export default function Header({ onGoMain }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <header className="menu">
                <div
                    className="brand"
                    role="button"
                    onClick={onGoMain}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="/logo/header_1.png" alt="AOG Company Logo" className="brandLogo" />
                </div>

                <nav className="nav desktop-nav">
                    <NavLink to="/" end>회사소개</NavLink>
                    <NavLink to="/about">사업영역</NavLink>
                    <NavLink to="/portfolio">주요실적</NavLink>
                    <NavLink to="/contact">상담</NavLink>
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
                    <NavLink to="/portfolio" onClick={() => setIsMenuOpen(false)}>주요실적</NavLink>
                    <NavLink to="/contact" onClick={() => setIsMenuOpen(false)}>상담</NavLink>
                </nav>
            </div>
        </>
    )
}
