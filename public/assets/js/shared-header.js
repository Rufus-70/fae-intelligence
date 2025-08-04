// Shared Header Component
function renderHeader() {
    return `
    <header class="blog-header">
        <div class="container">
            <div class="header-content">
                <div class="logo-section">
                    <div>
                        <h1>🤖 Fae Intelligence</h1>
                        <p class="tagline">AI & Automation Insights</p>
                    </div>
                </div>
                
                <nav class="main-nav">
                    <a href="/" class="nav-link">Home</a>
                    <a href="/index.html" class="nav-link">Blog</a>
                    <a href="/services" class="nav-link">Services</a>
                    <a href="/contact" class="nav-link">Contact</a>
                </nav>
                
                <button id="themeToggle" class="theme-toggle" onclick="toggleTheme()">
                    <span id="themeIcon">🌙</span>
                </button>
            </div>
        </div>
    </header>`;
}

// Auto-inject header
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = renderHeader();
    }
});
