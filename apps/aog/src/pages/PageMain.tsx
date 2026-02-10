import { useMemo } from 'react'

interface PageMainProps {
    activeKey: string
}

interface ContentShape {
    top: string
    left: string
    right: string
}

function PageMain({ activeKey }: PageMainProps) {
    const content = useMemo<ContentShape>(() => {
        if (activeKey === 'about') {
            return {
                top: 'About Us',
                left: '회사 소개 / 연혁 / 강점',
                right: '대표 이미지나 하이라이트 카드',
            }
        }
        if (activeKey === 'services') {
            return {
                top: 'Our Services',
                left: '서비스 목록',
                right: '포트폴리오 / 갤러리',
            }
        }
        return {
            top: 'Contact Us',
            left: '연락처/주소/운영시간',
            right: '문의 방법 (메일/카톡 링크 등)',
        }
    }, [activeKey])

    return (
        <div className="content">
            <section className="top">{content.top}</section>

            <div className="middle">
                <aside className="left">{content.left}</aside>
                <main className="right">{content.right}</main>
            </div>
        </div>
    )
}

export default PageMain
