// Main application initialization
console.log('🚀 Fae Intelligence HTML Blog Starting...');

// Ensure all required scripts are loaded
if (typeof window.demoData === 'undefined') {
    console.error('❌ Demo data not loaded');
}

if (typeof window.FirebaseClient === 'undefined') {
    console.error('❌ Firebase client not loaded');
}

// The blog engine will initialize itself when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM loaded, blog engine should initialize');
});

// Add any global error handling
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Add any global unhandled promise rejection handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});

console.log('📊 Blog system initialized with fallback demo data support');
