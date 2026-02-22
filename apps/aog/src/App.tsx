import { useMemo, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

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
    const [showContact, setShowContact] = useState(false)
    const seo = useMemo(() => {
        if (location.pathname === '/about') {
            return {
                title: 'A.O.G | 사업영역',
                description: '신변 경호, 행사 경호, 의전 경호 등 A.O.G의 전문 경호 서비스를 소개합니다.',
            }
        }
        if (location.pathname === '/portfolio') {
            return {
                title: 'A.O.G | 경호실적',
                description: 'A.O.G가 수행한 주요 경호 사례와 운영 실적을 확인하세요.',
            }
        }
        if (location.pathname === '/contact') {
            return {
                title: 'A.O.G | 상담',
                description: '전문 경호 서비스 상담 및 견적 문의 안내.',
            }
        }
        return {
            title: 'A.O.G Company | Professional Security',
            description: 'A.O.G Company는 고객의 안전과 신뢰를 최우선으로 하는 전문 경호회사입니다.',
        }
    }, [location.pathname])

    return (
        <div className="layout">
            <Helmet>
                <title>{seo.title}</title>
                <meta name="description" content={seo.description} />
            </Helmet>
            {!isAogMain && <Header />}

            <div className="pageFrame">
                <div key={location.pathname} className="pageAnim">
                    <Routes location={location}>
                        <Route path="/" element={<AogMain onOpenContact={() => setShowContact(true)} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/portfolio" element={<Portfolio />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </div>
            </div>

            <a
                className="kakao-quick-box"
                href="http://pf.kakao.com/_zxozxfn"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kakao Open Chat"
            >
                <img src="/kakaotalk.png" alt="KakaoTalk" className="kakao-quick-img" />
            </a>

            {showContact && (
                <div className="modal-backdrop" onClick={() => setShowContact(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Contact A.O.G</h2>
                            <button
                                className="modal-close"
                                onClick={() => setShowContact(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="contact-modal-grid">
                                <div className="contact-qr">
                                    <div className="contact-qr-box">QR</div>
                                    <p>카카오톡 채널 QR</p>
                                </div>
                                <div className="contact-details">
                                    <p className="contact-item"><span>이메일</span> contact@aog.co.kr</p>
                                    <p className="contact-item"><span>휴대번호</span> 010-0000-0000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {!isAogMain && <Footer />}
        </div>
    )
}
