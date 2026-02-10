import { useMemo } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'

const navItems = [
  { key: '/', label: 'HOME' },
  { key: '/about', label: 'ABOUT' },
  { key: '/artists', label: 'ARTISTS' },
  { key: '/works', label: 'WORKS' },
  { key: '/audition', label: 'AUDITION' },
  { key: '/contact', label: 'CONTACT' },
]

function Content() {
  const location = useLocation()

  const data = useMemo(() => {
    if (location.pathname === '/about') {
      return {
        title: 'ABOUT TEAM BARA',
        subtitle: '브랜드와 아티스트의 가치를 무대 위에서 실현합니다.',
      }
    }
    if (location.pathname === '/artists') {
      return {
        title: 'ARTISTS',
        subtitle: '장르와 목적에 맞는 아티스트 협업 구조를 설계합니다.',
      }
    }
    if (location.pathname === '/works') {
      return {
        title: 'WORKS',
        subtitle: '현장에서 검증된 프로젝트를 축적합니다.',
      }
    }
    if (location.pathname === '/audition') {
      return {
        title: 'AUDITION',
        subtitle: '새로운 무대를 함께 만들 인재를 찾고 있습니다.',
      }
    }
    if (location.pathname === '/contact') {
      return {
        title: 'CONTACT',
        subtitle: '협업 문의: hello@teambara.com',
      }
    }
    return {
      title: 'TEAM BARA',
      subtitle: 'EVENT PLANNING & PRODUCTION',
    }
  }, [location.pathname])

  return (
    <section className="bara-hero">
      <p className="bara-sub">{data.subtitle}</p>
      <h1>{data.title}</h1>
      <p className="bara-desc">
        레퍼런스 사이트 구조를 기반으로 메뉴형 페이지 골격을 우선 구축했습니다.
      </p>
    </section>
  )
}

export default function App() {
  return (
    <div className="bara-page">
      <header className="bara-header">
        <div className="bara-logo">TEAM BARA</div>
        <nav className="bara-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.key}
              end={item.key === '/'}
              className={({ isActive }) => `bara-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="bara-main">
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/about" element={<Content />} />
          <Route path="/artists" element={<Content />} />
          <Route path="/works" element={<Content />} />
          <Route path="/audition" element={<Content />} />
          <Route path="/contact" element={<Content />} />
        </Routes>
      </main>
    </div>
  )
}
