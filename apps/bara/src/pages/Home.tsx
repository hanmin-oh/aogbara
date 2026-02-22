/* ═══════════════════════════════════════
   B.A.R.A — Home (BARA CREW)
   tsartcompany.com 구조 참고 — 풍부한 비주얼 랜딩
   ═══════════════════════════════════════ */

import { NavLink } from 'react-router-dom'

// ═══════════════════════════════════════
// CREW DATA (여기서 이름과 설명을 수정하세요)
// ═══════════════════════════════════════
const crewImages = [
  {
    src: '/profile/crew_1.png',
    alt: 'BARA crew 1',
    name: 'CREW MEMBER 1',
    desc: 'Performance Artist / Director',
  },
  {
    src: '/profile/crew_2.png',
    alt: 'BARA crew 2',
    name: 'CREW MEMBER 2',
    desc: 'Main Dancer / Choreographer',
  },
  {
    src: '/profile/crew_3.png',
    alt: 'BARA crew 3',
    name: 'CREW MEMBER 3',
    desc: 'Visual Artist / Designer',
  },
  {
    src: '/profile/crew_4.png',
    alt: 'BARA crew 4',
    name: 'CREW MEMBER 4',
    desc: 'Performance Artist',
  },
  {
    src: '/profile/crew_5.png',
    alt: 'BARA crew 5',
    name: 'CREW MEMBER 5',
    desc: 'Performance Artist',
  },
  {
    src: '/profile/crew_6.png',
    alt: 'BARA crew 6',
    name: 'CREW MEMBER 6',
    desc: 'Performance Artist',
  },
  {
    src: '/profile/crew_7.png',
    alt: 'BARA crew 7',
    name: 'CREW MEMBER 7',
    desc: 'Performance Artist',
  },
]

const stats = [
  { number: '12만+', label: '누적 관람객', sub: '2020 ~ 2023' },
  { number: '15+', label: '국내외 페스티벌', sub: '초청공연 다수' },
  { number: '1위', label: '선호도 · 만족도', sub: '학교 및 단체 관람' },
  { number: '6회', label: '국가 지원사업', sub: '보조사업 선정' },
]

const programs = [
  { title: '극장 상설 공연', desc: '공간 특성에 맞춘 라이브 퍼포먼스와 관객 참여형 연출.' },
  { title: '문예회관 기획 공연', desc: '지역 문화 기관과 연계한 시즌형 프로그램 운영.' },
  { title: '셀럽 합동 쇼케이스', desc: '아티스트 협업으로 확장되는 브랜디드 스테이지.' },
  { title: '행사/섭외 공연', desc: '행사 목적에 최적화된 맞춤형 퍼포먼스 패키지.' },
]

export default function Home() {
  return (
    <div className="b-home">

      {/* ═══ HERO ═══ */}
      <section className="b-hero">
        <div className="b-hero__media" aria-hidden="true">
          <div className="b-hero__media-image" />
          <div className="b-hero__media-video">
            <iframe
              src="https://www.youtube.com/embed/zmRbm13_kWk?autoplay=1&mute=1&controls=0&loop=1&playlist=zmRbm13_kWk&modestbranding=1&playsinline=1&rel=0"
              title="BARA Hero Video"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
          <div className="b-hero__media-overlay" />
        </div>
        <div className="b-hero__content">
          <p className="b-hero__label">B.A.R.A</p>
          <h1>Born Again as<br />Remarkable Art</h1>
          <p className="b-hero__sub">"특별한 예술로 다시 태어나다"</p>
        </div>
        <div className="b-hero__fade" />
      </section>

      {/* ═══ YOUTUBE LINK ═══ */}
      <section className="b-yt-quick">
        <a
          href="https://www.youtube.com/@바라컴퍼니"
          target="_blank"
          rel="noopener noreferrer"
          className="b-yt-quick__link"
        >
          <span className="b-yt-quick__icon">▶</span>
          <div className="b-yt-quick__copy">
            <p className="b-yt-quick__title">B.A.R.A YouTube</p>
            <p className="b-yt-quick__desc">무대의 순간을 영상으로 만나보세요</p>
          </div>
          <span className="b-yt-quick__arrow">→</span>
        </a>
      </section>

      {/* ═══ CREW ═══ */}
      <section className="b-section b-section--crew">
        <div className="b-section__head">
          <span className="b-section__label">BARA CREW</span>
        </div>
        <div className="b-crew-list">
          {crewImages.map((image, i) => (
            <a
              key={`crew-frame-${i + 1}`}
              className={`b-crew-card${i % 2 === 1 ? ' b-crew-card--offset' : ''}${i === crewImages.length - 1 ? ' b-crew-card--last' : ''}`}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="b-crew-card__visual">
                <img src={image.src} alt={image.alt} loading="lazy" />
              </div>
              <div className="b-crew-card__info">
                <h3 className="b-crew-name">{image.name}</h3>
                <p className="b-crew-desc">{image.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT / STATS ═══ */}
      <section className="b-section b-section--about">
        <div className="b-about__head">
          <span className="b-about__tag">WHAT IS</span>
          <h2 className="b-about__title">B.A.R.A?</h2>
          <p className="b-about__desc">
            이전에 경험하지 못한 뉴 멀티 퍼포먼스로써<br />
            바라크루만이 가지고 있는 다양한 퍼포먼스를 기반으로<br />
            관객의 시각, 청각은 물론 마음까지 사로잡는 공연입니다.
          </p>
        </div>
        <div className="b-stats">
          {stats.map((s) => (
            <article key={s.label} className="b-stat">
              <p className="b-stat__sub">{s.sub}</p>
              <p className="b-stat__number">{s.number}</p>
              <p className="b-stat__label">{s.label}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ PROGRAM PREVIEW ═══ */}
      <section className="b-section b-section--program">
        <div className="b-section__head">
          <span className="b-section__label">PROGRAM</span>
        </div>
        <div className="b-programs">
          {programs.map((p) => (
            <article key={p.title} className="b-program-card">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </article>
          ))}
        </div>
        <div className="b-section__more">
          <NavLink to="/program" className="b-more-link">자세히 보기 →</NavLink>
        </div>
      </section>

      {/* ═══ YOUTUBE BANNER ═══ */}
      <section className="b-section b-section--yt-banner">
        <div className="b-yt-banner">
          <p className="b-yt-banner__ment">팬들과 소통하는<br />BARA CREW의 일상을 만나보세요!</p>
          <a
            href="https://www.youtube.com/@바라컴퍼니"
            target="_blank"
            rel="noopener noreferrer"
            className="b-yt-banner__btn"
          >
            YouTube 바로가기 →
          </a>
        </div>
      </section>

      {/* ═══ END BANNER ═══ */}
      <section className="b-end-banner">
        <p className="b-end-banner__text">
          고민은 공연만 늦출 뿐!<br />
          <strong>최고의 퍼포먼스 공연으로 보답하겠습니다.</strong>
        </p>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="b-footer">
        <div className="b-footer__inner">
          <div className="b-footer__info">
            <p className="b-footer__brand">B.A.R.A</p>
            <p className="b-footer__copy">Born Again as Remarkable Art</p>
          </div>
          <div className="b-footer__sns">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.youtube.com/@바라컴퍼니" target="_blank" rel="noopener noreferrer">YouTube</a>
          </div>
          <p className="b-footer__copyright">© B.A.R.A All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
