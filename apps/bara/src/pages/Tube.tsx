const videos = [
  { id: 'uzchvsE00UE', title: 'BARA STUDIO C홀' },
  { id: 'tT01CyjCQLc', title: 'BARA STUDIO C홀 (2)' },
  { id: 'Ube3p_4nEGA', title: 'BARA STUDIO B홀' },
  { id: 'zmRbm13_kWk', title: 'BARA CREW B-BOY FLY' },
]

export default function Tube() {
  return (
    <div className="b-page">
      <h1 className="sr-only">Tube</h1>
      <div className="b-page__head">
        <p className="b-label">Tube</p>
        <a
          href="https://www.youtube.com/@바라컴퍼니"
          target="_blank"
          rel="noopener noreferrer"
          className="b-channel-link"
        >
          @바라컴퍼니 →
        </a>
      </div>
      <div className="b-tube-grid">
        {videos.map((v) => (
          <article key={v.id} className="b-tube-item">
            <div className="b-tube-embed">
              <iframe
                src={`https://www.youtube.com/embed/${v.id}`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="b-tube-title">{v.title}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
