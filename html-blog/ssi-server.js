const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8086;

// Middleware to handle Server-Side Includes
function processSSI(content, basePath) {
    // Process <!--#include virtual="/path/to/file" --> directives
    return content.replace(/<!--#include virtual="([^"]+)" -->/g, (match, includePath) => {
        try {
            // Remove leading slash and construct full path
            const cleanPath = includePath.startsWith('/') ? includePath.slice(1) : includePath;
            const fullPath = path.join(basePath, cleanPath);
            
            console.log(`📁 Including: ${fullPath}`);
            
            if (fs.existsSync(fullPath)) {
                const includeContent = fs.readFileSync(fullPath, 'utf8');
                return includeContent;
            } else {
                console.error(`❌ Include file not found: ${fullPath}`);
                return `<!-- Include file not found: ${includePath} -->`;
            }
        } catch (error) {
            console.error(`❌ Error processing include ${includePath}:`, error.message);
            return `<!-- Error processing include: ${includePath} -->`;
        }
    });
}

// Serve static files
app.use(express.static('.'));

// Handle all requests
app.use('/', (req, res) => {
    let filePath = req.path === '/' ? '/index.html' : req.path;
    
    // If path is a directory, try index.html
    let fullPath = path.join(__dirname, filePath);
    if (fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()) {
        fullPath = path.join(fullPath, 'index.html');
        filePath = path.join(filePath, 'index.html');
    }
    
    // Add .html if no extension
    if (!path.extname(fullPath) && !fs.existsSync(fullPath)) {
        fullPath += '.html';
        filePath += '.html';
    }
    
    console.log(`🔍 Request: ${req.path} -> ${fullPath}`);
    
    // Only process HTML files with SSI
    if (filePath.endsWith('.html') && fs.existsSync(fullPath)) {
        try {
            let content = fs.readFileSync(fullPath, 'utf8');
            
            // Process SSI directives
            content = processSSI(content, __dirname);
            
            res.setHeader('Content-Type', 'text/html');
            res.send(content);
        } catch (error) {
            console.error(`❌ Error reading file ${fullPath}:`, error.message);
            res.status(404).send('File not found');
        }
    } else {
        res.status(404).send('File not found');
    }
});

app.listen(port, () => {
    console.log(`🚀 SSI Server running at http://localhost:${port}`);
    console.log(`📁 Serving from: ${__dirname}`);
    console.log(`✅ Server-Side Includes enabled`);
});
