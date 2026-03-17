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
    { 
        id: 1, 
        category: 'driver', 
        title: '주차관리,차량통제', 
        images: [
            '/photo/driver/1653561301786.jpg',
            '/photo/driver/1653561288874-0.jpg',
            '/photo/driver/1653561288874-1.jpg',
            '/photo/driver/20221231_132847.jpg',
            '/photo/driver/20221231_132906.jpg',
            '/photo/driver/20221231_133022.jpg',
            '/photo/driver/20240831_212109.jpg',
            '/photo/driver/20240831_212120.jpg',
            '/photo/driver/20240831_212348.jpg',
            '/photo/driver/20241120_090815.jpg',
            '/photo/driver/20241123_212647.jpg',
            '/photo/driver/20241123_212730.jpg',
            '/photo/driver/20241123_212734.jpg',
            '/photo/driver/20241123_212738.jpg',
            '/photo/driver/20241123_212753.jpg',
            '/photo/driver/20241120_090946(0).jpg',
            '/photo/driver/P20221218_185309200_11A4CCA0-41B6-4764-852F-150E1DA068F2.JPG',
            '/photo/driver/P20231029_104953039_2CB9438F-0380-4AB1-B4AB-5F31A31A4244.JPG',
            '/photo/driver/P20231029_220055126_E970F584-29FB-4F21-9C84-B09C4E9BEEBE.JPG',
            '/photo/driver/P20231030_103203053_5F1BE320-E0A9-4486-91B5-D22B94BEE0E3.JPG',
            '/photo/driver/P20240608_232312271_31C27D1B-D9DB-41D7-AAE8-4ACB1C0BF170.JPG'
        ]
    },
    { 
        id: 2, 
        category: 'event', 
        title: '2021패션위크 촬영경호', 
        images: [
            '/photo/event/20210912_124559.jpg',
            '/photo/event/20210912_124622.jpg',
            '/photo/event/20210912_124653.jpg',
            '/photo/event/20210915_142811.jpg',
            '/photo/event/20210915_142818.jpg',
            '/photo/event/20210924_115802.jpg',
            '/photo/event/20210927_102832.jpg',
            '/photo/event/20211005_092133.jpg'
        ]
    },
    { 
        id: 3, 
        category: 'facility', 
        title: '아파트 사전점검', 
        images: [
            '/photo/facility/20220611_075348.jpg',
            '/photo/facility/20220709_084423.jpg',
            '/photo/facility/20220806_091635.jpg',
            '/photo/facility/20220808_112619.jpg',
            '/photo/facility/20230114_151547.jpg',
            '/photo/facility/20230127_094334.jpg',
            '/photo/facility/20230128_093109.jpg',
            '/photo/facility/20230128_093112.jpg',
            '/photo/facility/20240218_123815.jpg',
            '/photo/facility/P20220611_084755000_A8DDCB4A-026C-469F-96FB-1567EC73A65A.JPG',
            '/photo/facility/P20230114_134934462_91F9D277-3E9D-43A2-91B4-BFEDF9789A78.JPG',
            '/photo/facility/P20231111_142730984_46FEC373-9211-47B3-A77E-FAFD40EBE1A0.JPG',
            '/photo/facility/P20240218_123801848_285C7EED-2B85-47D4-81DD-59B8322382AC.JPG',
            '/photo/facility/P20240218_124016138_A00DE410-E680-4B0E-B0BB-632E313992F6.JPG'
        ]
    },
    { 
        id: 4, 
        category: 'valet', 
        title: '발렛서비스', 
        images: [
            '/photo/valet/1664361613971.jpg',
            '/photo/valet/1665127794507.jpg',
            '/photo/valet/1670635949162.jpg',
            '/photo/valet/1710498213179.jpg',
            '/photo/valet/1670552186395-0.jpg',
            '/photo/valet/1670552193154-0.jpg',
            '/photo/valet/20221014_161550.jpg',
            '/photo/valet/20241111_195617.jpg',
            '/photo/valet/20241111_195633.jpg',
            '/photo/valet/20241111_195701.jpg',
            '/photo/valet/20241111_195807.jpg',
            '/photo/valet/P20230319_111102776_0B75EDC5-3400-413E-9C8F-F8FA2E5728A3.JPG'
        ]
    }
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
            id: portfolioItems.length > 0 ? Math.max(...portfolioItems.map(i => i.id)) + 1 : 1,
            category: 'personal',
            title: '새 포트폴리오',
            images: ['/main.png']
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
