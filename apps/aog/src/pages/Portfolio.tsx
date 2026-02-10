import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../styles/portfolio.css'

type Category = 'all' | 'personal' | 'event' | 'protocol' | 'facility' | 'driver' | 'valet'

interface PortfolioItem {
    id: number
    category: Category
    title: string
    image: string
}

// 포트폴리오 데이터 (실제 이미지와 제목으로 나중에 대체)
const portfolioData: PortfolioItem[] = [
    // 신변경호
    { id: 1, category: 'personal', title: 'VIP 인사 경호 서비스', image: '/securities/left1.png' },
    { id: 2, category: 'personal', title: '기업 임원 신변 보호', image: '/securities/left2.png' },
    { id: 3, category: 'personal', title: '해외 인사 방한 경호', image: '/securities/right1.png' },
    
    // 행사경호
    { id: 4, category: 'event', title: '대규모 컨퍼런스 보안', image: '/securities/right2.png' },
    { id: 5, category: 'event', title: '기업 행사 경호 서비스', image: '/securities/left1.png' },
    { id: 6, category: 'event', title: '공연장 보안 관리', image: '/securities/left2.png' },
    
    // 의전경호
    { id: 7, category: 'protocol', title: '정부 인사 의전 경호', image: '/securities/right1.png' },
    { id: 8, category: 'protocol', title: '외교 행사 의전 서비스', image: '/securities/right2.png' },
    
    // 시설 보안경비
    { id: 9, category: 'facility', title: '기업 본사 보안 관리', image: '/securities/left1.png' },
    { id: 10, category: 'facility', title: '빌딩 통합 보안 시스템', image: '/securities/left2.png' },
    
    // 의전 드라이버
    { id: 11, category: 'driver', title: 'VIP 의전 운행 서비스', image: '/securities/right1.png' },
    { id: 12, category: 'driver', title: '공항 픽업/드롭 서비스', image: '/securities/right2.png' },
    
    // 발렛서비스
    { id: 13, category: 'valet', title: '프리미엄 발렛 서비스', image: '/securities/left1.png' },
    { id: 14, category: 'valet', title: '행사장 발렛 운영', image: '/securities/left2.png' },
]

const categories = [
    { id: 'all', name: '전체' },
    { id: 'personal', name: '신변경호' },
    { id: 'event', name: '행사경호' },
    { id: 'protocol', name: '의전경호' },
    { id: 'facility', name: '시설 보안경비' },
    { id: 'driver', name: '의전 드라이버' },
    { id: 'valet', name: '발렛서비스' },
] as const

export default function Portfolio() {
    const [searchParams] = useSearchParams()
    const [selectedCategory, setSelectedCategory] = useState<Category>('all')
    const [isAdminMode, setIsAdminMode] = useState(false)
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(portfolioData)
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAddMode, setIsAddMode] = useState(false)
    const [lightboxImage, setLightboxImage] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const category = searchParams.get('category') as Category
        if (category && categories.find(cat => cat.id === category)) {
            setSelectedCategory(category)
        }
        
        // URL에서 admin 모드 확인
        const admin = searchParams.get('admin')
        if (admin === 'true') {
            setIsAdminMode(true)
        }

        // localStorage에서 저장된 데이터 불러오기
        const savedData = localStorage.getItem('portfolioData')
        if (savedData) {
            try {
                setPortfolioItems(JSON.parse(savedData))
            } catch (e) {
                console.error('Failed to load portfolio data:', e)
            }
        }
    }, [searchParams])

    const handleEdit = (item: PortfolioItem) => {
        setEditingItem(item)
        setIsAddMode(false)
        setIsModalOpen(true)
    }

    const handleAdd = () => {
        const newItem: PortfolioItem = {
            id: Math.max(...portfolioItems.map(i => i.id)) + 1,
            category: selectedCategory === 'all' ? 'personal' : selectedCategory,
            title: '새 포트폴리오',
            image: '/securities/left1.png'
        }
        setEditingItem(newItem)
        setIsAddMode(true)
        setIsModalOpen(true)
    }

    const handleSave = () => {
        if (!editingItem) return

        let updatedItems: PortfolioItem[]
        if (isAddMode) {
            updatedItems = [...portfolioItems, editingItem]
        } else {
            updatedItems = portfolioItems.map(item => 
                item.id === editingItem.id ? editingItem : item
            )
        }

        setPortfolioItems(updatedItems)
        localStorage.setItem('portfolioData', JSON.stringify(updatedItems))
        setIsModalOpen(false)
        setEditingItem(null)
    }

    const handleDelete = (id: number) => {
        if (!confirm('정말 삭제하시겠습니까?')) return
        
        const updatedItems = portfolioItems.filter(item => item.id !== id)
        setPortfolioItems(updatedItems)
        localStorage.setItem('portfolioData', JSON.stringify(updatedItems))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            if (editingItem) {
                setEditingItem({ ...editingItem, image: reader.result as string })
            }
        }
        reader.readAsDataURL(file)
    }

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(portfolioItems, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'portfolio-data.json'
        link.click()
    }

    const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string)
                setPortfolioItems(data)
                localStorage.setItem('portfolioData', JSON.stringify(data))
                alert('데이터를 불러왔습니다!')
            } catch (e) {
                alert('잘못된 JSON 파일입니다.')
            }
        }
        reader.readAsText(file)
    }

    const filteredItems = selectedCategory === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === selectedCategory)

    return (
        <div className="portfolio-page">
            {/* Hero Section */}
            <section className="portfolio-hero">
                <div className="portfolio-hero-content">
                    <h1 className="portfolio-hero-title">PORTFOLIO</h1>
                </div>
            </section>

            {/* Main Content */}
            <section className="portfolio-main">
                <div className="portfolio-container">
                    {/* Category Filter */}
                    <div className="portfolio-categories">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h2 className="portfolio-section-title" style={{ marginBottom: 0 }}>포트폴리오 카테고리</h2>
                            {isAdminMode && (
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button className="admin-btn" onClick={handleAdd}>
                                        ➕ 추가
                                    </button>
                                    <button className="admin-btn" onClick={handleExportJSON}>
                                        💾 저장
                                    </button>
                                    <label className="admin-btn" style={{ cursor: 'pointer' }}>
                                        📂 불러오기
                                        <input 
                                            type="file" 
                                            accept=".json" 
                                            onChange={handleImportJSON}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="category-buttons">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.id as Category)}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="portfolio-grid">
                        {filteredItems.map((item) => (
                            <div key={item.id} className="portfolio-card">
                                <div 
                                    className="portfolio-image"
                                    onClick={() => !isAdminMode && setLightboxImage(item.image)}
                                    style={{ cursor: isAdminMode ? 'default' : 'pointer' }}
                                >
                                    <img src={item.image} alt={item.title} />
                                    {isAdminMode && (
                                        <div className="admin-controls">
                                            <button 
                                                className="edit-btn"
                                                onClick={() => handleEdit(item)}
                                            >
                                                ✏️ 수정
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="portfolio-info">
                                    <h3 className="portfolio-title">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredItems.length === 0 && (
                        <div className="portfolio-empty">
                            <p>해당 카테고리의 포트폴리오가 준비 중입니다.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Edit Modal */}
            {isModalOpen && editingItem && (
                <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
                    <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{isAddMode ? '포트폴리오 추가' : '포트폴리오 수정'}</h2>
                            <button 
                                className="modal-close"
                                onClick={() => setIsModalOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>제목</label>
                                <input 
                                    type="text"
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>카테고리</label>
                                <select 
                                    value={editingItem.category}
                                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value as Category })}
                                >
                                    {categories.filter(cat => cat.id !== 'all').map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>이미지</label>
                                <div className="image-upload">
                                    <img src={editingItem.image} alt="Preview" className="preview-image" />
                                    <input 
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                    <button 
                                        className="upload-btn"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        📷 이미지 변경
                                    </button>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button className="save-btn" onClick={handleSave}>
                                    저장
                                </button>
                                <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Lightbox */}
            {lightboxImage && (
                <div className="lightbox" onClick={() => setLightboxImage(null)}>
                    <button 
                        className="lightbox-close"
                        onClick={() => setLightboxImage(null)}
                    >
                        ✕
                    </button>
                    <img 
                        src={lightboxImage} 
                        alt="확대 이미지" 
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    )
}
