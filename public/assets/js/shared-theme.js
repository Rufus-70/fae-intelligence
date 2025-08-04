// Shared Theme Toggle Functionality
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    
    // Update icon
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
    
    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    console.log('Theme toggled to:', isDark ? 'dark' : 'light');
}

// Apply saved theme on load
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.textContent = '☀️';
        }
    }
}

// Initialize theme when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure header is loaded first
    setTimeout(applyTheme, 100);
    console.log('✅ Fae Intelligence Theme System loaded successfully!');
});
