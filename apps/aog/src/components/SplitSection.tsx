function SplitSection() {
    return (
        <div className="middle">
            <aside className="left">
                <h2>About</h2>
                <p>여기에 소개 텍스트를 넣고, 나중에 aog HTML에서 복붙해도 됨.</p>
            </aside>

            <main className="right">
                <h2>Gallery</h2>
                <div className="grid">
                    <div className="card">Photo 1</div>
                    <div className="card">Photo 2</div>
                    <div className="card">Photo 3</div>
                    <div className="card">Photo 4</div>
                </div>
            </main>
        </div>
    )
}

export default SplitSection
