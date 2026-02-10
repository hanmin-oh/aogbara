import '../styles/contact.css'

export default function Contact() {
    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title">CONTACT US</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="contact-main">
                <div className="contact-container">
                    {/* Contact Info */}
                    <div className="contact-info-section">
                        <h2 className="contact-section-title">Contact Information</h2>
                        
                        <div className="contact-info-grid">
                            <div className="contact-info-card">
                                <div className="info-icon">📍</div>
                                <h3>Address</h3>
                                <p>서울특별시 마포구 홍대입구역 인근</p>
                                <p className="info-sub">상세 주소는 문의 시 안내드립니다</p>
                            </div>

                            <div className="contact-info-card">
                                <div className="info-icon">📞</div>
                                <h3>Phone</h3>
                                <p>02-XXXX-XXXX</p>
                                <p className="info-sub">평일 09:00 - 18:00</p>
                            </div>

                            <div className="contact-info-card">
                                <div className="info-icon">✉️</div>
                                <h3>Email</h3>
                                <p>contact@aog-company.com</p>
                                <p className="info-sub">24시간 접수 가능</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="contact-map-section">
                        <h2 className="contact-section-title">Location</h2>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.5989990234587!2d126.92308391531682!3d37.55682297980043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98e1f5e6f5c1%3A0x4b4e4b4e4b4e4b4e!2z7ZmN64yA7J6F6rWs7Jet!5e0!3m2!1sko!2skr!4v1234567890123"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="AOG Company Location"
                            />
                        </div>
                        <div className="map-info">
                            <p><strong>지하철:</strong> 2호선, 공항철도, 경의중앙선 홍대입구역</p>
                            <p><strong>주차:</strong> 인근 공영주차장 이용 가능</p>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="contact-hours-section">
                        <h2 className="contact-section-title">Business Hours</h2>
                        <div className="hours-table">
                            <div className="hours-row">
                                <div className="hours-label">평일</div>
                                <div className="hours-value">09:00 - 18:00</div>
                            </div>
                            <div className="hours-row">
                                <div className="hours-label">주말 및 공휴일</div>
                                <div className="hours-value">예약 상담 가능</div>
                            </div>
                            <div className="hours-row highlight">
                                <div className="hours-label">긴급 연락</div>
                                <div className="hours-value">24시간 대응 가능</div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Message */}
                    <div className="contact-bottom">
                        <p className="contact-bottom-title">전문 경호 서비스 상담이 필요하신가요?</p>
                        <p className="contact-bottom-text">
                            A.O.G Company는 고객의 안전과 신뢰를 최우선으로 하는<br/>
                            전문 경호회사입니다. 언제든 문의해 주세요.
                        </p>
                        <div className="contact-bottom-license">
                            서울지방경찰청 허가 제 4915호
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
