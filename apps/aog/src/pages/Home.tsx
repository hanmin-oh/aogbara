import { useEffect, useState } from 'react'
import '../styles/home.css'

const INTRO_IMAGES = ['/securities/left1.png', '/securities/left2.png', '/securities/right1.png', '/securities/right2.png']

interface CrossFadeProps {
    images: string[]
    interval?: number
}

function CrossFade({ images, interval = 3500 }: CrossFadeProps) {
    const [idx, setIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setIdx(v => (v + 1) % images.length), interval)
        return () => clearInterval(t)
    }, [images.length, interval])

    return (
        <div className="xfade">
            {images.map((src, i) => (
                <img key={src} src={src} alt="" className={`xfadeImg ${i === idx ? 'on' : ''}`} />
            ))}
            <div className="xfadeShade" />
        </div>
    )
}

interface HomeProps {
    onEnterTeamAog: () => void
    onEnterTeamBara: () => void
}

export default function Home({ onEnterTeamAog, onEnterTeamBara }: HomeProps) {
    useEffect(() => {
        // 스크롤 완전 차단
        const preventScroll = (e: Event) => {
            e.preventDefault()
            e.stopPropagation()
            return false
        }

        const preventWheel = (e: WheelEvent) => {
            e.preventDefault()
        }

        // 모든 스크롤 이벤트 차단
        window.addEventListener('scroll', preventScroll, { passive: false })
        window.addEventListener('wheel', preventWheel, { passive: false })
        window.addEventListener('touchmove', preventScroll, { passive: false })
        document.body.style.overflow = 'hidden'
        document.documentElement.style.overflow = 'hidden'

        return () => {
            window.removeEventListener('scroll', preventScroll)
            window.removeEventListener('wheel', preventWheel)
            window.removeEventListener('touchmove', preventScroll)
            document.body.style.overflow = ''
            document.documentElement.style.overflow = ''
        }
    }, [])

    return (
        <div className="introLayout">
            <section className="introTwoCol">
                <div
                    className="introPane introPaneClickable"
                    role="button"
                    tabIndex={0}
                    onClick={onEnterTeamAog}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onEnterTeamAog()
                        }
                    }}
                    aria-label="Enter TEAM AOG"
                >
                    <CrossFade images={INTRO_IMAGES} interval={3800} />
                    <div className="introPaneOverlay">
                        <div className="introLogoButton introLogoStatic">
                            <div className="introAogTitle">TEAM A.O.G</div>
                            <p className="introAogDesc">
                                Always On Guard, 언제나 곁에서<br />
                                당신의 안전을 지키는 경호팀
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="introPane introPaneClickable"
                    role="button"
                    tabIndex={0}
                    onClick={onEnterTeamBara}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            onEnterTeamBara()
                        }
                    }}
                    aria-label="Go to TeamBARA"
                >
                    <div className="xfade">
                        <img src="/teamBara" alt="TEAM BARA" className="xfadeImg on" />
                    </div>
                    <div className="introPaneOverlay">
                        <div className="introLink introLinkButton">
                            <span className="introAogTitle">TEAM BARA</span>
                            <p className="introAogDesc">
                                바라컴퍼니 소속 5명이 재미있는 <br/>이야기를 만들어가는 채널
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
