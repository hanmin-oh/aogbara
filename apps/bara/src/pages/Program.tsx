const programs = [
  {
    title: '극장 상설 공연',
    desc: '공간 특성에 맞춘 라이브 퍼포먼스와 관객 참여형 연출.',
  },
  {
    title: '문예회관 기획 공연',
    desc: '지역 문화 기관과 연계한 시즌형 프로그램 운영.',
  },
  {
    title: '셀럽 합동 쇼케이스',
    desc: '아티스트 협업으로 확장되는 브랜디드 스테이지.',
  },
  {
    title: '행사/섭외 공연',
    desc: '행사 목적에 최적화된 맞춤형 퍼포먼스 패키지.',
  },
]

export default function Program() {
  return (
    <div className="b-page">
      <h1 className="sr-only">Program</h1>
      <div className="b-page__head">
        <p className="b-label">Program</p>
      </div>
      <div className="b-programs">
        {programs.map((p) => (
          <article key={p.title} className="b-program-card">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
