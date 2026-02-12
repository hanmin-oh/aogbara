const history = [
  { year: '2008', items: ['베이징올림픽 조직위 공식문화행사 초청공연'] },
  { year: '2009', items: ['중국 장가계 국제 컨츄리 음악주 조직위 공식문화행사 초청공연'] },
  { year: '2010', items: ['중국 상하이 세계엑스포 개막공연', '상하이 세계엑스포 아시아 광장 상설공연'] },
  { year: '2011', items: ['잠실 롯데월드 가든스테이지 월요스페셜 공연'] },
  { year: '2012', items: ['충주세계무술축제 오프닝 공연'] },
  { year: '2013', items: ['제1회 중국 중경 한국영화제 한국대표 초청공연'] },
  { year: '2014', items: ['수원화성국제연극제 폐막식 초청공연'] },
  { year: '2015', items: ['부산국제연극제 공식초청작', '신나는예술여행 학교순회공연 문화단체 선정'] },
  { year: '2016', items: ['문화가있는날 화천문화예술회관 공연', '김천국제가족연극제 폐막식 초청공연'] },
  { year: '2017', items: ['문예회관과 함께하는 방방곡곡 문화공감 우수예술단체 선정', 'UN합창단 한국공연 - 고양아람누리'] },
  { year: '2018', items: ['아프리카 짐바브웨 HIFA 페스티벌 공식초청공연', '블랙야크 창립45주년 기념식 메인공연'] },
  { year: '2019', items: ['고양예술인페스티벌 선정작', '학교로찾아가는 힐링문화콘서트 약 20개학교 투어'] },
  { year: '2020', items: ['비대면 컨텐츠 "온택트 플레이" 전국 약 150회 진행'] },
  { year: '2021', items: ['비대면 댄스교육 강좌 개발', '청소년 댄스 뮤지컬 "드리밍" 제작'] },
  { year: '2022', items: ['신나는예술여행 힐링문화콘서트 선정'] },
  { year: '2023', items: ['구로예술나무씨어터 공연', '대학로 룸씨어터 상설공연'] },
]

export default function History() {
  return (
    <div className="b-page">
      <div className="b-page__head">
        <p className="b-label">History</p>
      </div>
      <div className="b-history">
        {history.map((h) => (
          <article key={h.year} className="b-history__item">
            <span className="b-history__year">{h.year}</span>
            <div className="b-history__dot" />
            <ul className="b-history__list">
              {h.items.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  )
}
