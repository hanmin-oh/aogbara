import { useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

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
  const seo = useMemo(() => {
    if (location.pathname === '/history') {
      return {
        title: 'B.A.R.A | History',
        description: 'B.A.R.A가 만들어 온 주요 공연과 프로젝트 히스토리.',
      }
    }
    if (location.pathname === '/program') {
      return {
        title: 'B.A.R.A | Program',
        description: '극장 공연, 기획 공연, 쇼케이스 등 프로그램 안내.',
      }
    }
    if (location.pathname === '/tube') {
      return {
        title: 'B.A.R.A | Tube',
        description: 'B.A.R.A의 무대와 퍼포먼스를 영상으로 만나보세요.',
      }
    }
    if (location.pathname === '/contact') {
      return {
        title: 'B.A.R.A | Contact',
        description: '프로젝트 협업 및 공연 문의 안내.',
      }
    }
    return {
      title: 'B.A.R.A | Born Again as Remarkable Art',
      description: '바라컴퍼니 소속 5명이 특별한 예술로 다시 태어나는 무대를 만듭니다.',
    }
  }, [location.pathname])

  return (
    <div className="b-root">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>
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
