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

// Custom middleware for HTML files to process SSI
app.use((req, res, next) => {
    let filePath = path.join(__dirname, req.path);

    // If the request is for a directory, try to serve index.html
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
    }

    // If it's an HTML file, process SSI
    if (filePath.endsWith('.html') && fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', (err, content) => {
            if (err) {
                console.error(`❌ Error reading file ${filePath}:`, err.message);
                return next(); // Pass to next middleware (e.g., 404 handler)
            }
            // Process SSI directives
            content = processSSI(content, __dirname);
            res.setHeader('Content-Type', 'text/html');
            res.send(content);
        });
    } else {
        next(); // Not an HTML file or doesn't exist, let express.static handle it
    }
});



app.listen(port, () => {
    console.log(`🚀 SSI Server running at http://localhost:${port}`);
    console.log(`📁 Serving from: ${__dirname}`);
    console.log(`✅ Server-Side Includes enabled`);
});
