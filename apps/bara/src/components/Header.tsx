import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { key: '/', label: 'CREW' },
  { key: '/history', label: 'HISTORY' },
  { key: '/program', label: 'PROGRAM' },
  { key: '/tube', label: 'TUBE' },
  { key: '/contact', label: 'CONTACT' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="b-header">
        <NavLink to="/" className="b-logo">B.A.R.A</NavLink>

        <nav className="b-nav b-nav--desktop">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.key}
              end={item.key === '/'}
              className={({ isActive }) =>
                `b-nav__link ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="b-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <span /><span /><span />
        </button>
      </header>

      <div className={`b-drawer ${menuOpen ? 'open' : ''}`}>
        <div className="b-drawer__backdrop" onClick={() => setMenuOpen(false)} />
        <nav className="b-drawer__nav">
          <button className="b-drawer__close" onClick={() => setMenuOpen(false)}>
            ✕
          </button>
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.key}
              end={item.key === '/'}
              className={({ isActive }) =>
                `b-drawer__link ${isActive ? 'active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  )
}
