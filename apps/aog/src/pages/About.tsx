import { useState } from 'react'
import '../styles/about.css'

interface ServiceDetail {
    id: string
    title: string
    description: string
    features: string[]
    image?: string
}

const serviceDetails: Record<string, ServiceDetail> = {
    personal: {
        id: 'personal',
        title: '신변 경호',
        description: 'VIP 및 주요 인사의 안전을 최우선으로 하는 전문 신변 경호 서비스입니다.',
        features: [
            '24시간 밀착 경호',
            '사전 동선 파악 및 위험 요소 제거',
            '긴급 상황 대응 시스템',
            '비밀 유지 및 프라이버시 보호'
        ]
    },
    event: {
        id: 'event',
        title: '행사 경호',
        description: '각종 행사 및 이벤트의 안전한 진행을 위한 전문 경호 서비스입니다.',
        features: [
            '행사장 사전 보안 점검',
            '입퇴장 통제 및 관리',
            'VIP 및 참석자 안전 관리',
            '돌발 상황 대응 체계'
        ]
    },
    protocol: {
        id: 'protocol',
        title: '의전 경호',
        description: '공식 일정 및 의전 행사의 원활한 진행을 위한 전문 서비스입니다.',
        features: [
            '공식 일정 동선 관리',
            '의전 절차 지원',
            '수행 인력 배치',
            '프로토콜 준수 관리'
        ]
    },
    facility: {
        id: 'facility',
        title: '시설 보안경비',
        description: '건물 및 시설의 체계적인 보안 관리 서비스입니다.',
        features: [
            '24시간 순찰 및 감시',
            '출입 통제 시스템 운영',
            '시설물 안전 점검',
            '비상 상황 대응'
        ]
    },
    driver: {
        id: 'driver',
        title: '의전 드라이버',
        description: '안전하고 품격 있는 이동 서비스를 제공합니다.',
        features: [
            '안전 운전 전문 교육 이수',
            '최적 경로 선정',
            '차량 관리 및 점검',
            '의전 매너 및 에티켓'
        ]
    },
    valet: {
        id: 'valet',
        title: '발렛 서비스',
        description: '행사 및 시설의 프리미엄 차량 관리 서비스입니다.',
        features: [
            '안전한 차량 주차 관리',
            '신속한 입출차 서비스',
            '차량 안전 점검',
            '고객 응대 서비스'
        ]
    }
}

export default function About() {
    const [selectedService, setSelectedService] = useState<string | null>('personal')
    const [showContact, setShowContact] = useState(false)

    const handleServiceClick = (serviceId: string) => {
        setSelectedService(serviceId)
    }

    return (
        <div className="about-page">
            <h1 className="sr-only">사업영역</h1>
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-content">
                    <p className="about-hero-subtitle">A.O.G의 전문 경호 서비스를 한눈에 확인하세요.</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="about-main">
                <div className="about-container">
                    {/* Services Grid - 6개 가로 배치 */}
                    <div className="about-services-grid">
                        <div 
                            className={`about-service-card ${selectedService === 'personal' ? 'active' : ''}`}
                            onClick={() => handleServiceClick('personal')}
                        >
                            <h3 className="about-service-title">신변 경호</h3>
                            <p className="about-service-subtitle">VIP 신변 보호</p>
                        </div>

                        <div 
                            className={`about-service-card ${selectedService === 'event' ? 'active' : ''}`}
                            onClick={() => handleServiceClick('event')}
                        >
                            <h3 className="about-service-title">행사 경호</h3>
                            <p className="about-service-subtitle">이벤트 보안</p>
                        </div>

                        <div 
                            className={`about-service-card ${selectedService === 'protocol' ? 'active' : ''}`}
                            onClick={() => handleServiceClick('protocol')}
                        >
                            <h3 className="about-service-title">의전 경호</h3>
                            <p className="about-service-subtitle">동선 관리</p>
                        </div>

                        <div 
                            className={`about-service-card ${selectedService === 'facility' ? 'active' : ''}`}
                            onClick={() => handleServiceClick('facility')}
                        >
                            <h3 className="about-service-title">시설 보안경비</h3>
                            <p className="about-service-subtitle">시설 보안</p>
                        </div>

                        <div 
                            className={`about-service-card ${selectedService === 'driver' ? 'active' : ''}`}
                            onClick={() => handleServiceClick('driver')}
                        >
                            <h3 className="about-service-title">의전 드라이버</h3>
                            <p className="about-service-subtitle">안전 운행</p>
                        </div>

                        <div 
                            className={`about-service-card ${selectedService === 'valet' ? 'active' : ''}`}
                            onClick={() => handleServiceClick('valet')}
                        >
                            <h3 className="about-service-title">발렛 서비스</h3>
                            <p className="about-service-subtitle">차량 관리</p>
                        </div>
                    </div>

                    {/* Service Detail Section */}
                    {selectedService && (
                        <div className="about-service-detail">
                            <div className="about-service-detail-header">
                                <p className="about-service-detail-description">
                                    {serviceDetails[selectedService].description}
                                </p>
                            </div>

                            <div className="about-service-detail-body">
                                <div className="about-service-detail-features">
                                    <h3>주요 서비스</h3>
                                    <ul>
                                        {serviceDetails[selectedService].features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="about-service-detail-image">
                                    <div className="about-service-image-placeholder">
                                        <p>서비스 이미지</p>
                                        <span>이미지는 추후 추가 예정</span>
                                    </div>
                                </div>
                            </div>

                            <div className="about-service-detail-footer">
                                <p>상세한 상담이 필요하신가요?</p>
                                <button className="about-service-contact-btn" onClick={() => setShowContact(true)}>
                                    상담 문의하기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Modal (AogMain과 동일한 UX) */}
            {showContact && (
                <div className="about-modal-backdrop" onClick={() => setShowContact(false)}>
                    <div className="about-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="about-modal-header">
                            <h2>Contact A.O.G</h2>
                            <button
                                className="about-modal-close"
                                onClick={() => setShowContact(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="about-modal-body">
                            <p>여기에 카카오톡 오픈채팅 QR, 연락처, 주소 등을 배치합니다.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
