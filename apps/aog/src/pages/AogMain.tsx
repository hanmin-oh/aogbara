import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../styles/aog.css'

const IMAGES = [
    '/securities/left1.png',
    '/securities/left2.png',
    '/securities/right1.png',
    '/securities/right2.png',
]

interface CrossFadeProps {
    images: string[]
    interval?: number
}

function CrossFade({ images, interval = 4000 }: CrossFadeProps) {
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => {
            setIdx((v) => (v + 1) % images.length)
        }, interval)
        return () => clearInterval(t)
    }, [images.length, interval])

    return (
        <div className="hero-bg">
            {images.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt=""
                    className={`hero-img ${i === idx ? 'active' : ''}`}
                />
            ))}
            <div className="hero-overlay" />
        </div>
    )
}

const SECTION_COUNT = 4

interface AogMainProps {
    onGoMain: () => void
}

export default function AogMain({ onGoMain }: AogMainProps) {
    const navigate = useNavigate()
    const [showContact, setShowContact] = useState(false)
    const [currentSection, setCurrentSection] = useState(0)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const isScrolling = useRef(false)
    const touchStart = useRef(0)
    const touchEnd = useRef(0)

    const handleServiceClick = (category: string) => {
        navigate(`/portfolio?category=${category}`)
    }

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            
            if (isScrolling.current) return
            
            const delta = e.deltaY
            if (Math.abs(delta) < 10) return

            if (delta > 0 && currentSection < SECTION_COUNT - 1) {
                isScrolling.current = true
                setCurrentSection(prev => prev + 1)
                setTimeout(() => { isScrolling.current = false }, 800)
            } else if (delta < 0 && currentSection > 0) {
                isScrolling.current = true
                setCurrentSection(prev => prev - 1)
                setTimeout(() => { isScrolling.current = false }, 800)
            }
        }

        const handleTouchStart = (e: TouchEvent) => {
            touchStart.current = e.touches[0].clientY
        }

        const handleTouchMove = (e: TouchEvent) => {
            touchEnd.current = e.touches[0].clientY
        }

        const handleTouchEnd = () => {
            if (isScrolling.current) return

            const distance = touchStart.current - touchEnd.current
            const minSwipeDistance = 50

            if (Math.abs(distance) < minSwipeDistance) return

            if (distance > 0 && currentSection < SECTION_COUNT - 1) {
                isScrolling.current = true
                setCurrentSection(prev => prev + 1)
                setTimeout(() => { isScrolling.current = false }, 800)
            } else if (distance < 0 && currentSection > 0) {
                isScrolling.current = true
                setCurrentSection(prev => prev - 1)
                setTimeout(() => { isScrolling.current = false }, 800)
            }
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })
            container.addEventListener('touchstart', handleTouchStart, { passive: true })
            container.addEventListener('touchmove', handleTouchMove, { passive: true })
            container.addEventListener('touchend', handleTouchEnd, { passive: true })
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handleWheel)
                container.removeEventListener('touchstart', handleTouchStart)
                container.removeEventListener('touchmove', handleTouchMove)
                container.removeEventListener('touchend', handleTouchEnd)
            }
        }
    }, [currentSection])

    return (
        <div className="aog-wrapper" ref={containerRef}>
            {/* Header - Only visible on first section */}
            <header className={`aog-header ${currentSection === 0 ? 'visible' : 'hidden'}`}>
                <div
                    className="aog-brand"
                    role="button"
                    onClick={onGoMain}
                    style={{ cursor: 'pointer' }}
                >
                    <img src="/logo/header_1.png" alt="AOG" className="aog-brand-logo" />
                </div>

                <nav className="aog-nav desktop-nav">
                    <NavLink to="/" end>회사소개</NavLink>
                    <NavLink to="/about">사업영역</NavLink>
                    <NavLink to="/portfolio">주요실적</NavLink>
                    <NavLink to="/contact">상담</NavLink>
                </nav>

                <button 
                    className="aog-hamburger-btn"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="메뉴"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </header>

            {/* Mobile Menu */}
            <div className={`aog-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="aog-mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
                <nav className="aog-mobile-nav">
                    <button 
                        className="aog-close-btn"
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

            <div 
                className="aog-container"
                style={{
                    transform: `translateY(-${currentSection * 100}vh)`,
                }}
            >
                {/* Section 1: Hero */}
                <section className="section section-hero">
                    <CrossFade images={IMAGES} />
                    <div className="section-content">
                        <div className="hero-logo">
                            <img src="/logo/aog.png" alt="AOG" />
                        </div>
                        <h1 className="hero-title">
                            A.O.G<br/>COMPANY
                        </h1>
                        <p className="hero-subtitle">Professional Security & Protection</p>
                        <p className="hero-permit">서울지방경찰청 허가 제 4915호</p>
                    </div>
                    <div className="scroll-hint">SCROLL DOWN</div>
                </section>

                {/* Section 2: Company Philosophy */}
                <section className="section section-philosophy">
                    <CrossFade images={IMAGES} />
                    <div className="section-content">
                        <div className="philosophy-header">
                            <h2 className="philosophy-main-title">Our Philosophy</h2>
                            <p className="philosophy-subtitle">우리의 철학</p>
                        </div>
                        
                        <div className="philosophy-grid">
                            {/* Philosophy 1 */}
                            <div className="philosophy-card">
                                <div className="philosophy-number">No.1</div>
                                <h3 className="philosophy-title">Professional Security,<br/>Trusted Protection</h3>
                                <p className="philosophy-text">
                                    고객의 안전과 신뢰를 최우선으로 생각합니다.
                                    전문적인 경호 서비스로 고객의 소중한 순간을 안전하게 지킵니다.
                                </p>
                            </div>
                            
                            {/* Philosophy 2 */}
                            <div className="philosophy-card">
                                <div className="philosophy-number">No.2</div>
                                <h3 className="philosophy-title">Experience Meets<br/>Excellence</h3>
                                <p className="philosophy-text">
                                    10년 이상 경력의 전문가들로 구성된 팀.
                                    신변, 행사, 의전 경호, 시설 보안경비, 의전 드라이버, 발렛 서비스 등
                                    다양한 분야에서 최상의 서비스를 제공합니다.
                                </p>
                            </div>
                            
                            {/* Philosophy 3 */}
                            <div className="philosophy-card">
                                <div className="philosophy-number">No.3</div>
                                <h3 className="philosophy-title">Systematic &<br/>Reliable Service</h3>
                                <p className="philosophy-text">
                                    사전 위험 분석부터 현장 대응까지, 철저한 준비와 체계적인 운영으로
                                    예상치 못한 상황에도 즉각적으로 대응합니다.
                                </p>
                            </div>
                            
                            {/* Philosophy 4 */}
                            <div className="philosophy-card">
                                <div className="philosophy-number">No.4</div>
                                <h3 className="philosophy-title">Building<br/>Long-term Trust</h3>
                                <p className="philosophy-text">
                                    혁신적이고 역동적인 접근으로 새로운 기준을 제시하며,
                                    고객과 함께 성장하는 신뢰할 수 있는 파트너가 되겠습니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Services */}
                <section className="section section-services">
                    <div className="section-content">
                        <div 
                            className="section-header" 
                            onClick={() => navigate('/portfolio')}
                            style={{ cursor: 'pointer' }}
                        >
                            <h2>Our Services</h2>
                            <p>전문 경호 서비스</p>
                        </div>
                        
                        <div className="services-grid">
                            <div className="service-card" onClick={() => handleServiceClick('personal')}>
                                <div className="service-number">01</div>
                                <h3>신변 경호</h3>
                                <p>VIP 및 주요 인사 신변 보호</p>
                            </div>
                            <div className="service-card" onClick={() => handleServiceClick('event')}>
                                <div className="service-number">02</div>
                                <h3>행사 경호</h3>
                                <p>각종 행사 및 이벤트 보안</p>
                            </div>
                            <div className="service-card" onClick={() => handleServiceClick('protocol')}>
                                <div className="service-number">03</div>
                                <h3>의전 경호</h3>
                                <p>공식 일정 수행 및 동선 관리</p>
                            </div>
                            <div className="service-card" onClick={() => handleServiceClick('facility')}>
                                <div className="service-number">04</div>
                                <h3>시설 보안경비</h3>
                                <p>건물 및 시설 보안 관리</p>
                            </div>
                            <div className="service-card" onClick={() => handleServiceClick('driver')}>
                                <div className="service-number">05</div>
                                <h3>의전 드라이버</h3>
                                <p>안전 운행 및 이동 지원</p>
                            </div>
                            <div className="service-card" onClick={() => handleServiceClick('valet')}>
                                <div className="service-number">06</div>
                                <h3>발렛 서비스</h3>
                                <p>행사 및 시설 차량 관리</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 4: Contact */}
                <section className="section section-contact">
                    <div className="section-content">
                        <h2>Contact Us</h2>
                        <p className="contact-text">
                            전문 경호 서비스 상담이 필요하신가요?<br/>
                            언제든 문의해 주세요.
                        </p>
                        <button
                            className="contact-button"
                            onClick={() => setShowContact(true)}
                        >
                            문의하기
                        </button>
                        <p className="contact-footer">
                            Professional Security & Protection Since 2024
                        </p>
                    </div>
                </section>
            </div>

            {/* Section Indicators */}
            <div className={`section-indicators ${currentSection === 2 ? 'dark' : ''}`}>
                {Array.from({ length: SECTION_COUNT }).map((_, i) => (
                    <button
                        key={i}
                        className={`indicator ${i === currentSection ? 'active' : ''}`}
                        onClick={() => setCurrentSection(i)}
                        aria-label={`Go to section ${i + 1}`}
                    />
                ))}
            </div>

            {/* Contact Modal */}
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
                            <p>여기에 카카오톡 오픈채팅 QR, 연락처, 주소 등을 배치합니다.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
