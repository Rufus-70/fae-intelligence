let currentBlocks = [];
        let selectedBlock = null;
        let selectedBlocks = []; // New: for multi-selection

        // Panel collapse functionality
        function togglePanel() {
            const markdownPanel = document.getElementById('markdownPanel');
            const visualPanel = document.querySelector('.visual-panel');
            const toggleBtn = document.getElementById('collapseToggle');
            
            if (markdownPanel.classList.contains('collapsed')) {
                // Expand
                markdownPanel.classList.remove('collapsed');
                visualPanel.classList.remove('expanded');
                toggleBtn.innerHTML = '◀';
                toggleBtn.style.left = '0';
            } else {
                // Collapse
                markdownPanel.classList.add('collapsed');
                visualPanel.classList.add('expanded');
                toggleBtn.innerHTML = '▶';
                toggleBtn.style.left = '10px';
            }
        }

        // New side-by-side functionality
        function startSideBySide() {
            if (selectedBlocks.length !== 2) {
                alert('Please select exactly two blocks to place them side-by-side.\n(Hold Ctrl/Cmd and click to select a second block)');
                return;
            }

            const index1 = currentBlocks.findIndex(b => b.id === selectedBlocks[0]);
            const index2 = currentBlocks.findIndex(b => b.id === selectedBlocks[1]);

            // Ensure blocks are adjacent
            if (Math.abs(index1 - index2) !== 1) {
                alert('Please select two adjacent blocks to place them side-by-side.');
                return;
            }

            const firstBlock = currentBlocks[Math.min(index1, index2)];
            const secondBlock = currentBlocks[Math.max(index1, index2)];

            firstBlock.sideBySide = true;
            secondBlock.sideBySide = true;
            firstBlock.layoutRatio = 'two-column'; // Default layout
            secondBlock.layoutRatio = 'two-column';

            // Clear selection and re-render
            selectedBlocks = [];
            document.querySelectorAll('.editable-block.selected').forEach(el => el.classList.remove('selected'));
            renderBlocks();
        }

        // Parse Markdown to editable blocks (with reconciliation)
        window.parseMarkdown = function parseMarkdown() {
            const markdown = document.getElementById('markdownInput').value;
            if (!markdown.trim()) {
                alert('Please enter some markdown content first!');
                return;
            }

            const lines = markdown.split('\n');
            const newBlocks = [];
            let currentParagraph = [];

            // Helper to create a paragraph from accumulated lines
            const makeParagraph = () => {
                if (currentParagraph.length > 0) {
                    let content = currentParagraph.join('\n');
                    // Convert markdown bold/italic to HTML tags
                    content = content
                        .replace(/\*\*([^\*]+)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*([^\*]+)\*/g, '<em>$1</em>');
                    
                    newBlocks.push({
                        type: 'paragraph', 
                        content: content,
                        attributes: {
                            alignment: 'left',
                            blockPosition: 'center',
                            marginTop: '0px',
                            marginBottom: '16px',
                            color: '#2C2C2C',
                            backgroundColor: '#FFFFFF',
                            border: 'none'
                        }
                    });
                    currentParagraph = [];
                }
            };

            lines.forEach(line => {
                const trimmed = line.trim();
                
                if (trimmed.startsWith('# ')) {
                    makeParagraph();
                    newBlocks.push({
                        type: 'heading', 
                        level: 'h1', 
                        content: trimmed.substring(2),
                        attributes: {
                            alignment: 'left',
                            blockPosition: 'center',
                            marginTop: '40px',
                            marginBottom: '20px',
                            color: '#2C2C2C',
                            backgroundColor: '#FFFFFF',
                            border: 'none'
                        }
                    });
                } else if (trimmed.startsWith('## ')) {
                    makeParagraph();
                    newBlocks.push({
                        type: 'heading', 
                        level: 'h2', 
                        content: trimmed.substring(3),
                        attributes: {
                            alignment: 'left',
                            blockPosition: 'center',
                            marginTop: '32px',
                            marginBottom: '16px',
                            color: '#2C2C2C',
                            backgroundColor: '#FFFFFF',
                            border: 'none'
                        }
                    });
                } else if (trimmed.startsWith('### ')) {
                    makeParagraph();
                    newBlocks.push({
                        type: 'heading', 
                        level: 'h3', 
                        content: trimmed.substring(4),
                        attributes: {
                            alignment: 'left',
                            blockPosition: 'center',
                            marginTop: '24px',
                            marginBottom: '12px',
                            color: '#2C2C2C',
                            backgroundColor: '#FFFFFF',
                            border: 'none'
                        }
                    });
                } else if (trimmed.startsWith('![')) {
                    makeParagraph();
                    const imageMatch = trimmed.match(/!\[([^\]]*)\]\(([^)]+)\)/);
                    if (imageMatch) {
                        newBlocks.push({
                            type: 'image', 
                            src: imageMatch[2], 
                            alt: imageMatch[1],
                            attributes: {
                                width: '100%',
                                alignment: 'center',
                                marginTop: '30px',
                                marginBottom: '30px',
                                color: '#2C2C2C',
                                backgroundColor: '#FFFFFF',
                                border: 'none',
                                zoom: 1,
                                objectPositionX: 50,
                                objectPositionY: 50,
                                containerHeight: 'auto'
                            }
                        });
                    }
                } else if (trimmed === '') {
                    makeParagraph();
                } else {
                    currentParagraph.push(trimmed);
                }
            });
            makeParagraph();

            // --- Reconciliation Logic ---
            const reconciledBlocks = [];
            const maxLen = Math.max(newBlocks.length, currentBlocks.length);

            for (let i = 0; i < maxLen; i++) {
                const oldBlock = currentBlocks[i];
                const newBlockInfo = newBlocks[i];

                if (oldBlock && newBlockInfo && oldBlock.type === newBlockInfo.type) {
                    // Same type, update content but keep attributes
                    oldBlock.content = newBlockInfo.content;
                    // For images, update src/alt as well
                    if(oldBlock.type === 'image') {
                        oldBlock.src = newBlockInfo.src;
                        oldBlock.alt = newBlockInfo.alt;
                    }
                    reconciledBlocks.push(oldBlock);
                } else if (newBlockInfo) {
                    // It's a new block or a different type, create a fresh one
                    switch(newBlockInfo.type) {
                        case 'heading':
                            addHeadingBlock(newBlockInfo.content, newBlockInfo.level, reconciledBlocks);
                            break;
                        case 'paragraph':
                            addParagraphBlock(newBlockInfo.content, reconciledBlocks);
                            break;
                        case 'image':
                            addImageBlock(newBlockInfo.src, newBlockInfo.alt, reconciledBlocks);
                            break;
                    }
                }
                // If oldBlock exists but newBlockInfo doesn't, it's a deletion and we do nothing,
                // effectively removing it from the reconciled list.
            }

            currentBlocks = reconciledBlocks;
            renderBlocks();
            
            // Send updated content to dashboard
            sendContentToDashboard();
        }

        function addHeadingBlock(content, level, targetArray = currentBlocks) {
            targetArray.push({
                id: 'block-' + Date.now() + Math.random(),
                type: 'heading',
                level: level,
                content: content,
                attributes: {
                    alignment: 'left',
                    blockPosition: 'center',
                    marginTop: '40px',
                    marginBottom: '20px',
                    color: '#2C2C2C',
                    width: '100%',
                    maxWidth: 'none'
                }
            });
        }

        function addParagraphBlock(content, targetArray = currentBlocks) {
            if (!content.trim()) {
                return;
            }
            const block = {
                id: 'block-' + Date.now() + Math.random(),
                type: 'paragraph',
                content: content,
                attributes: {
                    alignment: 'left',
                    blockPosition: 'center',
                    marginTop: '15px',
                    marginBottom: '15px',
                    color: '#4A5568',
                    lineHeight: '1.7',
                    width: '100%',
                    maxWidth: 'none'
                }
            };
            targetArray.push(block);
        }

        function addImageBlock(src, alt, targetArray = currentBlocks) {
            targetArray.push({
                id: 'block-' + Date.now() + Math.random(),
                type: 'image',
                src: src,
                alt: alt,
                attributes: {
                    width: '100%',
                    alignment: 'center',
                    marginTop: '30px',
                    marginBottom: '30px'
                }
            });
        }

        // Generic add block function for toolbar buttons
        function addBlock(type) {
            switch(type) {
                case 'heading':
                    addHeadingBlock('New Heading', 'h2');
                    break;
                case 'paragraph':
                    addParagraphBlock('New paragraph content. Click to edit this text.');
                    break;
                case 'image':
                    // Create file input for local images
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.onchange = function(e) {
                        const file = e.target.files[0];
                        if (file) {
                            // Create a URL for the local file
                            const imageUrl = URL.createObjectURL(file);
                            const imageAlt = prompt('Enter alt text for this image:', file.name.split('.')[0]);
                            addImageBlock(imageUrl, imageAlt || file.name);
                            renderBlocks(); // This was missing!
                        }
                    };
                    fileInput.click();
                    return; // Return early since we handle renderBlocks() inside the callback
                default:
                    console.log('Unknown block type:', type);
                    return;
            }
            renderBlocks();
        }

        function renderBlocks() {
            console.log('renderBlocks called with', currentBlocks.length, 'blocks');
            const preview = document.getElementById('blogPreview');
            
            if (!preview) {
                console.error('blogPreview element not found!');
                return;
            }
            
            if (currentBlocks.length === 0) {
                console.log('No blocks to render');
                preview.innerHTML = '<div style="padding: 2rem; text-align: center; color: #718096;"><h3>No blocks parsed</h3><p>Enter some Markdown content and try again.</p></div>';
                return;
            }

            let html = '';
            let i = 0;
            
            while (i < currentBlocks.length) {
                const block = currentBlocks[i];
                
                // Check if this block and the next one should be side by side
                if (block.sideBySide && i + 1 < currentBlocks.length && currentBlocks[i + 1].sideBySide) {
                    const nextBlock = currentBlocks[i + 1];
                    const blockHtml1 = renderBlock(block);
                    const blockHtml2 = renderBlock(nextBlock);
                    
                    // Get layout ratio from first block's attributes
                    const layoutClass = block.layoutRatio || 'two-column';
                    
                    console.log('Rendering side-by-side blocks with layout:', layoutClass);
                    
                    html += `
                        <div class="block-row ${layoutClass}">
                            <div class="editable-block" data-block-id="${block.id}">
                                ${blockHtml1}
                                <div class="block-controls">
                                    <span>${block.type}</span>
                                    <button onclick="moveUp('${block.id}')">↑</button>
                                    <button onclick="moveDown('${block.id}')">↓</button>
                                    <button onclick="deleteBlock('${block.id}')">✕</button>
                                </div>
                            </div>
                            <div class="editable-block" data-block-id="${nextBlock.id}">
                                ${blockHtml2}
                                <div class="block-controls">
                                    <span>${nextBlock.type}</span>
                                    <button onclick="moveUp('${nextBlock.id}')">↑</button>
                                    <button onclick="moveDown('${nextBlock.id}')">↓</button>
                                    <button onclick="deleteBlock('${nextBlock.id}')">✕</button>
                                </div>
                            </div>
                        </div>
                    `;
                    i += 2; // Skip the next block since we've rendered both
                } else {
                    // Regular single block
                    const blockHtml = renderBlock(block);
                    html += `
                        <div class="editable-block" data-block-id="${block.id}">
                            ${blockHtml}
                            <div class="block-controls">
                                <span>${block.type}</span>
                                <button onclick="moveUp('${block.id}')">↑</button>
                                <button onclick="moveDown('${block.id}')">↓</button>
                                <button onclick="deleteBlock('${block.id}')">✕</button>
                            </div>
                        </div>
                    `;
                    i++;
                }
            }
            
            preview.innerHTML = html;
            
            
            // Test that functions are globally accessible
            console.log('Global functions check:', {
                selectBlock: typeof window.selectBlock,
                parseMarkdown: typeof window.parseMarkdown,
                moveUp: typeof window.moveUp,
                deleteBlock: typeof window.deleteBlock
            });
        }

        function renderBlock(block) {
            const attrs = block.attributes;
            let classes = 'prose max-w-none'; // Base classes from Tailwind Typography

            // Alignment
            if (attrs.alignment) {
                classes += ` text-${attrs.alignment}`;
            }

            // Margins
            // Background and Border
            if (attrs.backgroundColor && attrs.backgroundColor !== '#FFFFFF') {
                classes += ` p-6 rounded-lg`;
            }
            if (attrs.border && attrs.border !== 'none') {
                classes += ` p-6 rounded-lg`;
            }

            let style = ``;
            if (attrs.backgroundColor) {
                style += `background-color: ${attrs.backgroundColor};`;
            }
            if (attrs.marginTop) {
                style += `margin-top: ${attrs.marginTop};`;
            }
            if (attrs.marginBottom) {
                style += `margin-bottom: ${attrs.marginBottom};`;
            }
            if (attrs.border && attrs.border !== 'none') {
                style += ` border: ${attrs.border};`;
            }
            if (attrs.color) {
                style += ` color: ${attrs.color};`;
            }

            switch (block.type) {
                case 'heading':
                    return `<${block.level} class="${classes}" style="${style}" contenteditable="true" onblur="updateBlockContent('${block.id}', this.innerHTML)">${block.content}</${block.level}>`;
                case 'paragraph':
                    return `<p class="${classes}" style="${style} line-height: ${attrs.lineHeight};" contenteditable="true" onblur="updateBlockContent('${block.id}', this.innerHTML)">${block.content}</p>`;
                case 'image':
                    const zoom = attrs.zoom || 1;
                    const posX = attrs.objectPositionX || 50;
                    const posY = attrs.objectPositionY || 50;
                    const containerHeight = attrs.containerHeight || 'auto';

                    const containerStyle = `width: ${attrs.width}; height: ${containerHeight}; overflow: hidden; border-radius: 0.5rem; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin: 0 auto;`;
                    const imageStyle = `width: 100%; height: 100%; object-fit: cover; object-position: ${posX}% ${posY}%; transform: scale(${zoom}); transition: transform 0.2s ease;`;

                    return `<div class="${classes}" style="${style}">
                                <div style="${containerStyle}">
                                    <img src="${block.src}" alt="${block.alt}" style="${imageStyle}">
                                </div>
                           </div>`;
                default:
                    return `<div class="${classes}" style="${style}">${block.content}</div>`;
            }
        }

        // Dashboard integration - message listener
        window.addEventListener('message', function(event) {
            console.log('📨 Received message from dashboard:', event.data);
            
            if (event.data.type === 'LOAD_CONTENT') {
                // Load content from dashboard
                const markdownInput = document.getElementById('markdownInput');
                if (markdownInput && event.data.content) {
                    markdownInput.value = event.data.content;
                    parseMarkdown(); // Parse the loaded content
                    console.log('✅ Content loaded from dashboard');
                }
                
                if (event.data.title) {
                    console.log('📝 Post title:', event.data.title);
                }
            }
        });

        // Function to send content updates back to dashboard
        function sendContentToDashboard() {
            const markdownInput = document.getElementById('markdownInput');
            if (markdownInput && window.opener) {
                window.opener.postMessage({
                    type: 'UPDATE_CONTENT',
                    content: markdownInput.value,
                    blocks: currentBlocks
                }, '*');
                console.log('📤 Content sent to dashboard');
            }
        }

        // Auto-save content to dashboard every 30 seconds
        setInterval(sendContentToDashboard, 30000);

        // Make selectBlock globally accessible
        window.selectBlock = function selectBlock(blockId, event) {
            console.log('🖱️ selectBlock called with blockId:', blockId);
            console.log('🖱️ selectBlock: Event object:', event);
            console.log('🖱️ selectBlock: Event type:', event ? event.type : 'no event');
            console.log('🖱️ selectBlock: Ctrl key:', event ? event.ctrlKey : 'no event');
            console.log('🖱️ selectBlock: Meta key:', event ? event.metaKey : 'no event');
            
            const blockEl = document.querySelector(`[data-block-id="${blockId}"]`);
            if (!blockEl) {
                console.error('❌ selectBlock: Block element not found for ID:', blockId);
                return;
            }
            
            console.log('✅ selectBlock: Block element found, proceeding with selection');
            console.log('📋 selectBlock: Current selected blocks before:', selectedBlocks);

            const isMultiSelect = event && (event.ctrlKey || event.metaKey); // Ctrl or Cmd key
            console.log('🔀 selectBlock: Multi-select mode:', isMultiSelect);

            if (isMultiSelect) {
                if (selectedBlocks.includes(blockId)) {
                    // Deselect if already selected
                    selectedBlocks = selectedBlocks.filter(id => id !== blockId);
                    blockEl.classList.remove('selected');
                } else {
                    // Add to selection
                    selectedBlocks.push(blockId);
                    blockEl.classList.add('selected');
                }
            } else {
                // Single selection
                document.querySelectorAll('.editable-block.selected').forEach(el => el.classList.remove('selected'));
                selectedBlocks = [blockId];
                blockEl.classList.add('selected');
            }

            console.log('📋 selectBlock: Selected blocks after:', selectedBlocks);
            console.log('📋 selectBlock: Total selected count:', selectedBlocks.length);

            // For the properties panel, we only show properties for the *last* selected block
            if (selectedBlocks.length > 0) {
                selectedBlock = currentBlocks.find(b => b.id === selectedBlocks[selectedBlocks.length - 1]);
                console.log('🎯 selectBlock: Set selectedBlock to:', selectedBlock ? selectedBlock.id : 'not found');
                showProperties();
            } else {
                selectedBlock = null;
                console.log('🎯 selectBlock: No blocks selected, closing properties');
                closeProperties();
            }
        }

        function showProperties() {
            if (!selectedBlock) {
                console.log('showProperties: No selected block');
                return;
            }

            console.log('showProperties: Selected block:', selectedBlock);
            const panel = document.getElementById('propertiesPanel');
            const content = document.getElementById('propertiesContent');
            
            // Initialize attributes if they don't exist
            if (!selectedBlock.attributes) {
                console.log('showProperties: Initializing attributes for block');
                selectedBlock.attributes = {};
            }
            const attrs = selectedBlock.attributes;

            let propertiesHtml = `
                <div class="property-group">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Block Type</label>
                    <select onchange="changeBlockType(this.value)" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="paragraph" ${selectedBlock.type === 'paragraph' ? 'selected' : ''}>Paragraph</option>
                        <option value="heading" ${selectedBlock.type === 'heading' ? 'selected' : ''}>Heading</option>
                        <option value="image" ${selectedBlock.type === 'image' ? 'selected' : ''}>Image</option>
                    </select>
                </div>

                <div class="property-group">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
                    <select onchange="updateProperty('alignment', this.value)" class="w-full p-2 border border-gray-300 rounded-md">
                        <option value="left" ${attrs.alignment === 'left' ? 'selected' : ''}>Left</option>
                        <option value="center" ${attrs.alignment === 'center' ? 'selected' : ''}>Center</option>
                        <option value="right" ${attrs.alignment === 'right' ? 'selected' : ''}>Right</option>
                    </select>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div class="property-group">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Margin Top</label>
                        <input type="text" value="${attrs.marginTop || '0'}" onchange="updateProperty('marginTop', this.value)" class="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 8px">
                    </div>
                    <div class="property-group">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Margin Bottom</label>
                        <input type="text" value="${attrs.marginBottom || '0'}" onchange="updateProperty('marginBottom', this.value)" class="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 8px">
                    </div>
                </div>

                <div class="property-group">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
                    <input type="color" value="${attrs.color || '#2C2C2C'}" onchange="updateProperty('color', this.value)" class="w-full h-10 p-1 border border-gray-300 rounded-md">
                </div>

                <div class="property-group">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Background Color</label>
                    <input type="color" value="${attrs.backgroundColor || '#FFFFFF'}" onchange="updateProperty('backgroundColor', this.value)" class="w-full h-10 p-1 border border-gray-300 rounded-md">
                </div>

                <div class="property-group">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Border Style</label>
                    <input type="text" value="${attrs.border || 'none'}" onchange="updateProperty('border', this.value)" class="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 1px solid #ccc">
                </div>
            `;

            if (selectedBlock.type === 'image') {
                propertiesHtml += `
                    <div class="border-t pt-4 mt-4">
                        <h4 class="text-md font-semibold text-gray-800 mb-2">Image Settings</h4>
                        <div class="property-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Image Source</label>
                            <input type="text" value="${selectedBlock.src}" onchange="updateBlockProperty('src', this.value)" class="w-full p-2 border border-gray-300 rounded-md">
                        </div>
                        <div class="property-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                            <input type="text" value="${selectedBlock.alt}" onchange="updateBlockProperty('alt', this.value)" class="w-full p-2 border border-gray-300 rounded-md">
                        </div>
                        <div class="property-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Container Height</label>
                            <input type="text" value="${attrs.containerHeight || 'auto'}" onchange="updateProperty('containerHeight', this.value)" class="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 400px">
                        </div>
                        <div class="property-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Zoom (${(attrs.zoom * 100).toFixed(0)}%)</label>
                            <input type="range" min="1" max="3" step="0.05" value="${attrs.zoom || 1}" oninput="updateProperty('zoom', this.value)" class="w-full">
                        </div>
                        <div class="property-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Horizontal Position (${attrs.objectPositionX || 50}%)</label>
                            <input type="range" min="0" max="100" step="1" value="${attrs.objectPositionX || 50}" oninput="updateProperty('objectPositionX', this.value)" class="w-full">
                        </div>
                        <div class="property-group">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Vertical Position (${attrs.objectPositionY || 50}%)</label>
                            <input type="range" min="0" max="100" step="1" value="${attrs.objectPositionY || 50}" oninput="updateProperty('objectPositionY', this.value)" class="w-full">
                        </div>
                    </div>
                `;
            }

            content.innerHTML = propertiesHtml;
            panel.classList.remove('translate-x-full');
        }

        function updateBlockContent(blockId, newContent) {
            const block = currentBlocks.find(b => b.id === blockId);
            if (block) {
                block.content = newContent;
                console.log(`Content for block ${blockId} updated.`);
            }
        }

        function updateProperty(property, value) {
            if (selectedBlock) {
                selectedBlock.attributes[property] = value;
                
                // Reset other width properties when one is changed
                if (property === 'maxWidth' && value !== 'none') {
                    selectedBlock.attributes.width = '100%';
                } else if (property === 'width' && value !== '100%') {
                    selectedBlock.attributes.maxWidth = 'none';
                }
                
                console.log('Updated property:', property, 'to:', value);
                console.log('Block attributes:', selectedBlock.attributes);
                
                renderBlocks();
            }
        }

        function updateBlockProperty(property, value) {
            if (selectedBlock) {
                selectedBlock[property] = value;
                renderBlocks();
            }
        }

        // Update layout ratio for side-by-side blocks
        function updateLayoutRatio(ratio) {
            if (selectedBlock && selectedBlock.sideBySide) {
                // Find the index of the current block
                const index = currentBlocks.findIndex(b => b.id === selectedBlock.id);
                
                // Update both blocks in the pair with the same layout ratio
                if (index !== -1) {
                    selectedBlock.layoutRatio = ratio;
                    
                    // Update the paired block
                    if (index + 1 < currentBlocks.length && currentBlocks[index + 1].sideBySide) {
                        currentBlocks[index + 1].layoutRatio = ratio;
                    } else if (index > 0 && currentBlocks[index - 1].sideBySide) {
                        currentBlocks[index - 1].layoutRatio = ratio;
                    }
                }
                
                renderBlocks();
            }
        }

        // Move block up
        function moveBlockUp() {
            if (!selectedBlock) return;
            
            const index = currentBlocks.findIndex(b => b.id === selectedBlock.id);
            if (index <= 0) {
                console.log('Block is already at the top');
                return;
            }
            
            // Handle side-by-side blocks - they move as pairs
            if (selectedBlock.sideBySide) {
                const nextBlock = currentBlocks[index - 1];
                if (nextBlock && nextBlock.sideBySide) {
                    // Move side-by-side pair up
                    if (index <= 1) return; // Can't move pair to position 0 or -1
                    
                    // Remove both blocks from current position
                    const pairBlocks = currentBlocks.splice(index - 1, 2);
                    // Insert them 2 positions earlier
                    currentBlocks.splice(index - 3, 0, ...pairBlocks);
                } else {
                    // This shouldn't happen in a properly formed side-by-side, but handle it
                    const block = currentBlocks.splice(index, 1)[0];
                    currentBlocks.splice(index - 1, 0, block);
                }
            } else {
                // Regular block move
                const block = currentBlocks.splice(index, 1)[0];
                currentBlocks.splice(index - 1, 0, block);
            }
            
            renderBlocks();
        }

        // Move block down
        function moveBlockDown() {
            if (!selectedBlock) return;
            
            const index = currentBlocks.findIndex(b => b.id === selectedBlock.id);
            if (index >= currentBlocks.length - 1) {
                console.log('Block is already at the bottom');
                return;
            }
            
            // Handle side-by-side blocks - they move as pairs
            if (selectedBlock.sideBySide) {
                const nextBlock = currentBlocks[index + 1];
                if (nextBlock && nextBlock.sideBySide) {
                    // Move side-by-side pair down
                    if (index >= currentBlocks.length - 2) return; // Can't move pair beyond end
                    
                    // Remove both blocks from current position
                    const pairBlocks = currentBlocks.splice(index, 2);
                    // Insert them 2 positions later
                    currentBlocks.splice(index + 2, 0, ...pairBlocks);
                } else {
                    // This shouldn't happen in a properly formed side-by-side, but handle it
                    const block = currentBlocks.splice(index, 1)[0];
                    currentBlocks.splice(index + 1, 0, block);
                }
            }
            else {
                // Regular block move
                const block = currentBlocks.splice(index, 1)[0];
                currentBlocks.splice(index + 1, 0, block);
            }
            
            renderBlocks();
        }

        // Duplicate block
        function duplicateBlock() {
            if (!selectedBlock) return;
            
            const index = currentBlocks.findIndex(b => b.id === selectedBlock.id);
            const newBlock = JSON.parse(JSON.stringify(selectedBlock)); // Deep copy
            newBlock.id = Date.now() + Math.random(); // New unique ID
            
            // If duplicating a side-by-side block, clear the side-by-side status
            // (user can re-enable it if needed)
            if (newBlock.sideBySide) {
                delete newBlock.sideBySide;
                delete newBlock.layoutRatio;
            }
            
            // Add the duplicated block right after the original
            currentBlocks.splice(index + 1, 0, newBlock);
            
            renderBlocks();
        }

        // Change block type
        function changeBlockType(newType) {
            if (!selectedBlock) return;
            
            const oldType = selectedBlock.type;
            if (oldType === newType) return;
            
            console.log('Changing block type from', oldType, 'to', newType);
            
            // Convert the block based on the new type
            if (newType === 'paragraph') {
                selectedBlock.type = 'paragraph';
                if (!selectedBlock.content || selectedBlock.content === '') {
                    selectedBlock.content = 'New paragraph content. Click to edit this text.';
                }
                // Ensure proper attributes for paragraph
                if (!selectedBlock.attributes) selectedBlock.attributes = {};
                selectedBlock.attributes = {
                    ...selectedBlock.attributes,
                    alignment: selectedBlock.attributes.alignment || 'left',
                    blockPosition: selectedBlock.attributes.blockPosition || 'center',
                    marginTop: '15px',
                    marginBottom: '15px',
                    color: '#4A5568',
                    lineHeight: '1.7',
                    width: '100%',
                    maxWidth: 'none'
                };
                // Remove image/heading specific properties
                delete selectedBlock.src;
                delete selectedBlock.alt;
                delete selectedBlock.level;
                
            } else if (newType === 'heading') {
                selectedBlock.type = 'heading';
                selectedBlock.level = 'h2'; // Default heading level
                if (!selectedBlock.content || selectedBlock.content === '') {
                    selectedBlock.content = 'New Heading';
                }
                // Ensure proper attributes for heading
                if (!selectedBlock.attributes) selectedBlock.attributes = {};
                selectedBlock.attributes = {
                    ...selectedBlock.attributes,
                    alignment: selectedBlock.attributes.alignment || 'left',
                    blockPosition: selectedBlock.attributes.blockPosition || 'center',
                    marginTop: '40px',
                    marginBottom: '20px',
                    color: '#2C2C2C',
                    width: '100%',
                    maxWidth: 'none'
                };
                // Remove image specific properties
                delete selectedBlock.src;
                delete selectedBlock.alt;
                
            } else if (newType === 'image') {
                selectedBlock.type = 'image';
                selectedBlock.src = selectedBlock.src || 'https://via.placeholder.com/600x300/00ACC1/FFFFFF?text=New+Image';
                selectedBlock.alt = selectedBlock.alt || 'New Image';
                // Ensure proper attributes for image
                if (!selectedBlock.attributes) selectedBlock.attributes = {};
                selectedBlock.attributes = {
                    width: '100%',
                    alignment: 'center',
                    marginTop: '30px',
                    marginBottom: '30px'
                };
                // Remove heading specific properties
                delete selectedBlock.level;
            }
            
            renderBlocks();
        }

        // Image upload functions
        function uploadLocalImage() {
            if (!selectedBlock || selectedBlock.type !== 'image') return;
            
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    selectedBlock.src = imageUrl;
                    renderBlocks();
                    showProperties(); // Refresh properties panel
                }
            };
            fileInput.click();
        }

        function setImageUrl() {
            if (!selectedBlock || selectedBlock.type !== 'image') return;
            
            const url = prompt('Enter image URL:', selectedBlock.src);
            if (url) {
                selectedBlock.src = url;
                renderBlocks();
                showProperties(); // Refresh properties panel
            }
        }

        function removeImage() {
            if (selectedBlock && selectedBlock.type === 'image') {
                selectedBlock.src = 'https://via.placeholder.com/600x300/E0E0E0/BDBDBD?text=Image+Removed';
                selectedBlock.alt = 'Image removed';
                renderBlocks();
                showProperties();
            }
        }

        function togglePropertiesPanel() {
            const panel = document.getElementById('propertiesPanel');
            const btn = document.getElementById('minimizeBtn');
            panel.classList.toggle('translate-x-full'); // Toggle visibility
            if (panel.classList.contains('translate-x-full')) {
                btn.innerHTML = '[+]'; // Panel is hidden
            } else {
                btn.innerHTML = '—'; // Panel is visible
            }
        }

        function closeProperties(event) {
            document.getElementById('propertiesPanel').classList.add('translate-x-full'); // Hide the panel
            document.querySelectorAll('.editable-block').forEach(el => el.classList.remove('selected'));
            selectedBlock = null;
            if (event) event.stopPropagation();
        }

        // Block manipulation functions
        // Make functions globally accessible for onclick handlers
        window.moveUp = function moveUp(blockId) {
            const index = currentBlocks.findIndex(b => b.id === blockId);
            if (index > 0) {
                [currentBlocks[index], currentBlocks[index - 1]] = [currentBlocks[index - 1], currentBlocks[index]];
                renderBlocks();
            }
            event.stopPropagation();
        }

        window.moveDown = function moveDown(blockId) {
            const index = currentBlocks.findIndex(b => b.id === blockId);
            if (index < currentBlocks.length - 1) {
                [currentBlocks[index], currentBlocks[index + 1]] = [currentBlocks[index + 1], currentBlocks[index]];
                renderBlocks();
            }
            event.stopPropagation();
        }

        window.deleteBlock = function deleteBlock(blockId) {
            if (confirm('Delete this block?')) {
                currentBlocks = currentBlocks.filter(b => b.id !== blockId);
                renderBlocks();
                closeProperties();
            }
            event.stopPropagation();
        }

        function exportHTML() {
            const contentHtml = currentBlocks.map(block => renderBlock(block)).join('\n');
            
            const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post</title>
    <link rel="stylesheet" href="/assets/css/blog-styles.css">
    <script src="/assets/js/shared-theme.js" defer></script>
</head>
<body class="bg-background text-foreground antialiased">
    <!--#include virtual="/includes/header.html" -->
    
    <main class="post-main py-12">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <article class="prose lg:prose-xl max-w-none">
                ${contentHtml}
            </article>
        </div>
    </main>
    
    <!--#include virtual="/includes/footer.html" -->
</body>
</html>`;

            // Create download
            const blob = new Blob([fullHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'blog-post.html';
            a.click();
            URL.revokeObjectURL(url);
        }

        function savePost() {
            // In a real implementation, this would save to your backend
            console.log('Saving post:', currentBlocks);
            alert('Post structure saved! (In a real implementation, this would save to your backend)');
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Fetch and inject header
            fetch('/includes/header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('live-preview-header').innerHTML = data;
                });

            // Fetch and inject footer
            fetch('/includes/footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('live-preview-footer').innerHTML = data;
                });

            // Event delegation for block selection
            const preview = document.getElementById('blogPreview');
            if (preview) {
                preview.addEventListener('click', function(event) {
                    const blockEl = event.target.closest('.editable-block');
                    if (blockEl) {
                        const blockId = blockEl.dataset.blockId;
                        if (blockId) {
                            selectBlock(blockId, event);
                        }
                    }
                });
            }
        });

        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            const toolbar = document.getElementById('formattingToolbar');
            if (selection.rangeCount > 0 && !selection.isCollapsed) {
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                toolbar.style.display = 'block';
                toolbar.style.top = `${window.scrollY + rect.top - toolbar.offsetHeight - 5}px`;
                toolbar.style.left = `${window.scrollX + rect.left + (rect.width / 2) - (toolbar.offsetWidth / 2)}px`;
            } else {
                toolbar.style.display = 'none';
            }
        });

        function formatText(command) {
            document.execCommand(command, false, null);
        }

        // Initialize with sample content
        document.getElementById('markdownInput').value = `# Welcome to AI-Powered Content Creation

Artificial intelligence is revolutionizing how we create, edit, and optimize content across all industries.

## The Power of Visual Editing

![AI Workspace](https://via.placeholder.com/600x300/00ACC1/FFFFFF?text=AI+Content+Creation)

With our new visual blog editor, you can:

### Key Features

- Parse Markdown into editable blocks
- Adjust spacing, alignment, and colors
- Drag and drop to reorder content
- Export clean HTML for your blog
## Getting Started

Simply paste your Markdown content and start customizing the visual layout to match your brand perfectly.

Ready to transform your content creation workflow?`;