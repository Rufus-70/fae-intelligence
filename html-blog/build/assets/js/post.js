// Individual blog post JavaScript functionality
console.log('📄 Post page loaded');

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scrolling to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add reading progress indicator
    createReadingProgress();
    
    // Add copy to clipboard for code blocks
    addCodeCopyButtons();
    
    // Add image zoom functionality
    addImageZoom();
    
    // Newsletter form handling
    handleNewsletterForm();
});

// Reading progress indicator
function createReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    
    const progressBarInner = progressBar.querySelector('.reading-progress-bar');
    
    // Add CSS for reading progress
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: rgba(99, 102, 241, 0.1);
            z-index: 1001;
        }
        .reading-progress-bar {
            height: 100%;
            background-color: #6366f1;
            width: 0%;
            transition: width 0.1s ease-out;
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const article = document.querySelector('.post-article');
        if (!article) return;
        
        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const progress = Math.min(
            Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
            1
        );
        
        progressBarInner.style.width = `${progress * 100}%`;
    });
}

// Add copy buttons to code blocks
function addCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('code');
    
    codeBlocks.forEach(codeBlock => {
        if (codeBlock.textContent.length < 20) return; // Skip short code snippets
        
        const wrapper = document.createElement('div');
        wrapper.className = 'code-wrapper';
        wrapper.style.position = 'relative';
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = 'Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            background: #6366f1;
            color: white;
            border: none;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            cursor: pointer;
            opacity: 0.8;
            transition: opacity 0.2s;
        `;
        
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                copyButton.innerHTML = 'Copied!';
                setTimeout(() => {
                    copyButton.innerHTML = 'Copy';
                }, 2000);
            });
        });
        
        codeBlock.parentNode.insertBefore(wrapper, codeBlock);
        wrapper.appendChild(codeBlock);
        wrapper.appendChild(copyButton);
    });
}

// Add image zoom functionality
function addImageZoom() {
    const images = document.querySelectorAll('.post-content img');
    
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            createImageModal(img);
        });
    });
}

function createImageModal(img) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: zoom-out;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalImg.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
    `;
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    modal.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Newsletter form handling
function handleNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (!email) return;
        
        // Here you would integrate with your newsletter service
        console.log('Newsletter signup:', email);
        
        // Show success message
        const button = newsletterForm.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Subscribed!';
        button.disabled = true;
        button.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.backgroundColor = '';
            newsletterForm.reset();
        }, 3000);
    });
}

// Scroll to top functionality
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 300 && !document.querySelector('.scroll-to-top')) {
        const scrollButton = document.createElement('button');
        scrollButton.className = 'scroll-to-top';
        scrollButton.innerHTML = '↑';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #6366f1;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollButton);
    } else if (scrollTop <= 300) {
        const scrollButton = document.querySelector('.scroll-to-top');
        if (scrollButton) {
            document.body.removeChild(scrollButton);
        }
    }
});

// Add table of contents for long articles
function createTableOfContents() {
    const headings = document.querySelectorAll('.post-content h2, .post-content h3');
    if (headings.length < 3) return; // Only show TOC for articles with 3+ headings
    
    const toc = document.createElement('div');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h4>Table of Contents</h4><ul></ul>';
    
    const tocList = toc.querySelector('ul');
    
    headings.forEach((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        
        const listItem = document.createElement('li');
        listItem.className = heading.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = `#${id}`;
        link.textContent = heading.textContent;
        link.addEventListener('click', (e) => {
            e.preventDefault();
            heading.scrollIntoView({ behavior: 'smooth' });
        });
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
    
    // Insert TOC after the first paragraph
    const firstParagraph = document.querySelector('.post-content p');
    if (firstParagraph) {
        firstParagraph.parentNode.insertBefore(toc, firstParagraph.nextSibling);
    }
    
    // Add TOC styles
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents {
            background-color: var(--gray-50);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: var(--spacing-4);
            margin: var(--spacing-6) 0;
        }
        .table-of-contents h4 {
            margin: 0 0 var(--spacing-3) 0;
            font-size: var(--font-size-lg);
            color: var(--text-primary);
        }
        .table-of-contents ul {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        .table-of-contents li {
            margin-bottom: var(--spacing-2);
        }
        .table-of-contents li.h3 {
            padding-left: var(--spacing-4);
        }
        .table-of-contents a {
            color: var(--text-secondary);
            text-decoration: none;
            transition: color var(--transition-fast);
        }
        .table-of-contents a:hover {
            color: var(--primary-color);
        }
        .dark-theme .table-of-contents {
            background-color: var(--gray-800);
        }
    `;
    document.head.appendChild(style);
}

// Initialize table of contents
document.addEventListener('DOMContentLoaded', createTableOfContents);
