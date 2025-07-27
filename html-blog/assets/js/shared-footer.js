// Shared Footer Component
function renderFooter() {
    return `
    <footer class="blog-footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>🤖 Fae Intelligence</h3>
                    <p>Making AI practical and accessible for modern businesses. We help companies implement automation solutions that deliver real results.</p>
                </div>
                
                <div class="footer-section">
                    <h4>Categories</h4>
                    <ul>
                        <li><a href="#">AI Tools</a></li>
                        <li><a href="#">Business Automation</a></li>
                        <li><a href="#">Manufacturing</a></li>
                        <li><a href="#">Case Studies</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h4>Resources</h4>
                    <ul>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">API Reference</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2025 Fae Intelligence. AI Made Practical.</p>
            </div>
        </div>
    </footer>`;
}

// Auto-inject footer
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = renderFooter();
    }
});
