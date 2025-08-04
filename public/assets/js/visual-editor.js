// FAE Intelligence Visual Editor with Multi-Select
console.log('🎨 Loading FAE Intelligence Visual Editor...');

// Global variables for multi-select
let selectedElements = [];
let isMultiSelectMode = false;

// ✅ MULTI-SELECT FUNCTIONALITY
function initializeMultiSelect() {
    console.log('🔧 Initializing multi-select functionality...');
    
    // Enable multi-select with Ctrl+Click
    document.addEventListener('click', function(event) {
        // Check if Ctrl key is pressed (or Cmd on Mac)
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            event.stopPropagation();
            isMultiSelectMode = true;
            
            const clickedElement = event.target.closest('[data-block], .editable-block, p, h1, h2, h3, h4, h5, h6, li, div[contenteditable], .block');
            
            if (clickedElement && !clickedElement.closest('#selection-indicator')) {
                toggleElementSelection(clickedElement);
            }
        } else if (!event.shiftKey) {
            // Clear selection if not holding Ctrl/Cmd or Shift
            clearSelection();
            isMultiSelectMode = false;
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        console.log('⌨️ Key pressed:', event.key, 'Ctrl:', event.ctrlKey, 'Selected:', selectedElements.length);
        
        // Ctrl+A or Cmd+A to select all
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'a' && isMultiSelectMode) {
            event.preventDefault();
            selectAll();
            return;
        }
        
        // Delete key to delete selected
        if (event.key === 'Delete' && selectedElements.length > 0) {
            event.preventDefault();
            deleteSelected();
            return;
        }
        
        // Escape to clear selection
        if (event.key === 'Escape') {
            clearSelection();
            isMultiSelectMode = false;
            return;
        }
        
        // Ctrl+C to copy selected
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c' && selectedElements.length > 0) {
            event.preventDefault();
            copySelected();
            return;
        }
    });
    
    console.log('✅ Multi-select functionality initialized');
}

// Toggle element selection
function toggleElementSelection(element) {
    console.log('🎯 Toggling selection for:', element);
    const index = selectedElements.indexOf(element);
    
    if (index > -1) {
        // Remove from selection
        selectedElements.splice(index, 1);
        element.classList.remove('multi-selected');
        console.log('➖ Removed from selection');
    } else {
        // Add to selection
        selectedElements.push(element);
        element.classList.add('multi-selected');
        console.log('➕ Added to selection');
    }
    
    updateSelectionIndicator();
    console.log(`📦 Multi-select: ${selectedElements.length} items selected`);
}

// Clear all selections
function clearSelection() {
    console.log('🧹 Clearing all selections');
    selectedElements.forEach(el => el.classList.remove('multi-selected'));
    selectedElements = [];
    updateSelectionIndicator();
}

// Update selection indicator
function updateSelectionIndicator() {
    let indicator = document.getElementById('selection-indicator');
    
    if (selectedElements.length > 0) {
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'selection-indicator';
            indicator.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                background: #3b82f6;
                color: white;
                padding: 12px 16px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                min-width: 200px;
            `;
            document.body.appendChild(indicator);
        }
        
        indicator.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 8px;">
                📦 ${selectedElements.length} items selected
            </div>
            <div class="action-buttons" style="display: flex; gap: 4px;">
                <button onclick="deleteSelected()" style="background: #ef4444; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">🗑️ Delete</button>
                <button onclick="copySelected()" style="background: #10b981; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">📋 Copy</button>
                <button onclick="clearSelection()" style="background: #6b7280; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;">❌ Clear</button>
            </div>
        `;
    } else if (indicator) {
        indicator.remove();
    }
}

// Actions for selected elements
function deleteSelected() {
    if (selectedElements.length === 0) return;
    
    if (confirm(`Delete ${selectedElements.length} selected items?`)) {
        console.log('🗑️ Deleting selected items:', selectedElements.length);
        selectedElements.forEach(el => {
            el.style.transition = 'opacity 0.3s ease';
            el.style.opacity = '0';
            setTimeout(() => el.remove(), 300);
        });
        selectedElements = [];
        updateSelectionIndicator();
        console.log('✅ Selected items deleted');
    }
}

function copySelected() {
    if (selectedElements.length === 0) return;
    
    const content = selectedElements.map(el => el.outerHTML).join('\n');
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(content).then(() => {
            console.log('📋 Selected items copied to clipboard');
            showNotification('✅ Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
            fallbackCopyText(content);
        });
    } else {
        fallbackCopyText(content);
    }
}

function fallbackCopyText(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showNotification('✅ Copied to clipboard!');
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showNotification('❌ Copy failed');
    }
    document.body.removeChild(textArea);
}

function selectAll() {
    console.log('🎯 Selecting all elements...');
    const allBlocks = document.querySelectorAll('[data-block], .editable-block, p, h1, h2, h3, h4, h5, h6, li, div[contenteditable], .block');
    
    allBlocks.forEach(block => {
        if (!selectedElements.includes(block) && !block.closest('#selection-indicator')) {
            selectedElements.push(block);
            block.classList.add('multi-selected');
        }
    });
    
    updateSelectionIndicator();
    console.log(`📦 Selected all ${selectedElements.length} items`);
    showNotification(`📦 Selected ${selectedElements.length} items`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #1f2937;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 2000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMultiSelect);
} else {
    initializeMultiSelect();
}

// Also initialize after a delay to catch dynamically added content
setTimeout(initializeMultiSelect, 1000);

console.log(`
✅ FAE Intelligence Visual Editor Loaded!

🎯 MULTI-SELECT CONTROLS:
• Ctrl+Click (or Cmd+Click on Mac) - Toggle selection
• Ctrl+A - Select all elements
• Delete - Delete selected items  
• Ctrl+C - Copy selected items
• Escape - Clear selection

📋 Use the selection indicator in the top-right for actions!
`);
