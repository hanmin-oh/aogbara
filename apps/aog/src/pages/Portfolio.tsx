import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../styles/portfolio.css'

type Category = 'all' | 'personal' | 'event' | 'protocol' | 'facility' | 'driver' | 'valet'

interface PortfolioItem {
    id: number
    category: Category
    title: string
    images: string[]
}

// 포트폴리오 데이터 (실제 이미지와 제목으로 나중에 대체)
const portfolioData: PortfolioItem[] = [
    // 신변경호
    { 
        id: 1, 
        category: 'personal', 
        title: 'VIP 인사 경호 서비스', 
        images: ['/securities/left1.png', '/securities/left2.png', '/securities/right1.png'] 
    },
    { 
        id: 2, 
        category: 'personal', 
        title: '기업 임원 신변 보호', 
        images: ['/securities/left2.png', '/securities/right1.png', '/securities/right2.png'] 
    },
    { 
        id: 3, 
        category: 'personal', 
        title: '해외 인사 방한 경호', 
        images: ['/securities/right1.png', '/securities/right2.png', '/securities/left1.png'] 
    },
    
    // 행사경호
    { 
        id: 4, 
        category: 'event', 
        title: '대규모 컨퍼런스 보안', 
        images: ['/securities/right2.png', '/securities/left1.png', '/securities/left2.png'] 
    },
    { 
        id: 5, 
        category: 'event', 
        title: '기업 행사 경호 서비스', 
        images: ['/securities/left1.png', '/securities/left2.png', '/securities/right1.png'] 
    },
    { 
        id: 6, 
        category: 'event', 
        title: '공연장 보안 관리', 
        images: ['/securities/left2.png', '/securities/right1.png', '/securities/right2.png'] 
    },
    
    // 의전경호
    { 
        id: 7, 
        category: 'protocol', 
        title: '정부 인사 의전 경호', 
        images: ['/securities/right1.png', '/securities/right2.png', '/securities/left1.png'] 
    },
    { 
        id: 8, 
        category: 'protocol', 
        title: '외교 행사 의전 서비스', 
        images: ['/securities/right2.png', '/securities/left1.png', '/securities/left2.png'] 
    },
    
    // 시설 보안경비
    { 
        id: 9, 
        category: 'facility', 
        title: '기업 본사 보안 관리', 
        images: ['/securities/left1.png', '/securities/left2.png', '/securities/right1.png'] 
    },
    { 
        id: 10, 
        category: 'facility', 
        title: '빌딩 통합 보안 시스템', 
        images: ['/securities/left2.png', '/securities/right1.png', '/securities/right2.png'] 
    },
    
    // 의전 드라이버
    { 
        id: 11, 
        category: 'driver', 
        title: 'VIP 의전 운행 서비스', 
        images: ['/securities/right1.png', '/securities/right2.png', '/securities/left1.png'] 
    },
    { 
        id: 12, 
        category: 'driver', 
        title: '공항 픽업/드롭 서비스', 
        images: ['/securities/right2.png', '/securities/left1.png', '/securities/left2.png'] 
    },
    
    // 발렛서비스
    { 
        id: 13, 
        category: 'valet', 
        title: '프리미엄 발렛 서비스', 
        images: ['/securities/left1.png', '/securities/left2.png', '/securities/right1.png'] 
    },
    { 
        id: 14, 
        category: 'valet', 
        title: '행사장 발렛 운영', 
        images: ['/securities/left2.png', '/securities/right1.png', '/securities/right2.png'] 
    },
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
    const [isAdminMode, setIsAdminMode] = useState(false)
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(portfolioData)
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAddMode, setIsAddMode] = useState(false)
    const [detailItem, setDetailItem] = useState<PortfolioItem | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
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
            category: 'personal',
            title: '새 포트폴리오',
            images: ['/securities/left1.png']
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
        const files = e.target.files
        if (!files || files.length === 0) return

        // 여러 파일 처리
        const newImages: string[] = []
        let processedCount = 0

        Array.from(files).forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                newImages.push(reader.result as string)
                processedCount++
                
                if (processedCount === files.length && editingItem) {
                    // 기존 이미지에 추가하거나 교체 (여기서는 추가로 구현)
                    setEditingItem(prev => prev ? {
                        ...prev,
                        images: [...prev.images, ...newImages]
                    } : null)
                }
            }
            reader.readAsDataURL(file)
        })
    }

    const removeImage = (index: number) => {
        if (!editingItem) return
        const newImages = editingItem.images.filter((_, i) => i !== index)
        setEditingItem({ ...editingItem, images: newImages })
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

    return (
        <div className="portfolio-page">
            <h1 className="sr-only">경호실적</h1>
            {/* Hero Section */}
            <section className="portfolio-hero">
                <div className="portfolio-hero-content">
                    <p className="portfolio-hero-subtitle">실제 수행한 경호 사례와 운영 실적을 소개합니다.</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="portfolio-main">
                <div className="portfolio-container">
                    {/* Admin Controls */}
                    {isAdminMode && (
                        <div className="portfolio-categories">
                            <div className="portfolio-category-header">
                                <div className="portfolio-category-actions">
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
                            </div>
                        </div>
                    )}

                    {/* Portfolio Grid */}
                    <div className="portfolio-grid">
                        {portfolioItems.map((item) => (
                            <div key={item.id} className="portfolio-card" onClick={() => !isAdminMode && setDetailItem(item)}>
                                <div className="portfolio-image">
                                    {/* 대표 이미지는 첫 번째 이미지 사용 */}
                                    <img src={item.images[0]} alt={item.title} />
                                    {isAdminMode && (
                                        <div className="admin-controls">
                                            <button 
                                                className="edit-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleEdit(item)
                                                }}
                                            >
                                                ✏️ 수정
                                            </button>
                                            <button 
                                                className="delete-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDelete(item.id)
                                                }}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="portfolio-info">
                                    <span className="portfolio-category-tag">
                                        {categories.find(c => c.id === item.category)?.name}
                                    </span>
                                    <h3 className="portfolio-title">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {portfolioItems.length === 0 && (
                        <div className="portfolio-empty">
                            <p>등록된 포트폴리오가 없습니다.</p>
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
                                <label>이미지 (여러 장 선택 가능)</label>
                                <div className="image-upload-list">
                                    {editingItem.images.map((img, idx) => (
                                        <div key={idx} className="image-preview-item">
                                            <img src={img} alt={`Preview ${idx}`} />
                                            <button 
                                                className="remove-image-btn"
                                                onClick={() => removeImage(idx)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        className="add-image-btn"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        + 이미지 추가
                                    </button>
                                    <input 
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
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

            {/* Detail View Modal (Lightbox style) */}
            {detailItem && (
                <div className="detail-modal-backdrop" onClick={() => setDetailItem(null)}>
                    <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="detail-header">
                            <h2 className="detail-title">{detailItem.title}</h2>
                            <button 
                                className="detail-close"
                                onClick={() => setDetailItem(null)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="detail-content">
                            {detailItem.images.map((img, idx) => (
                                <img 
                                    key={idx} 
                                    src={img} 
                                    alt={`${detailItem.title} - ${idx + 1}`} 
                                    className="detail-image"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
