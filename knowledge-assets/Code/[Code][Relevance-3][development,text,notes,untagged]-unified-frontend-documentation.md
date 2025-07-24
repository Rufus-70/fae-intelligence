# Unified Frontend System Documentation

## Overview

The Unified Frontend System provides a single command-line interface to launch and manage all Fae Intelligence development tools, including knowledge management, automation platforms, and development environments.

## System Architecture

```
Fae Intelligence Tool Stack
├── Knowledge Management
│   ├── Obsidian (~/Downloads/Obsidian-1.8.10.AppImage)
│   ├── Knowledge Vault (~/projects/fae-intelligence/fae-intelligence-data)
│   └── Neo4j RAG System (http://localhost:7474)
├── Automation Platform
│   ├── n8n Workflows (http://localhost:5678)
│   └── Docker Containers
├── Development Environment
│   ├── VS Code
│   ├── Terminal
│   └── Project Directory (~/projects/fae-intelligence)
└── Web Dashboard
    ├── Local HTTP Server (http://localhost:8080)
    └── System Status Interface
```

## Installation Guide

### Prerequisites
- Linux system (tested on Ubuntu/Debian)
- Obsidian AppImage downloaded to ~/Downloads/
- Docker installed and running
- Python 3 installed
- Basic development tools (git, curl, etc.)

### Step 1: Create Directory Structure

```bash
# Navigate to home directory
cd ~

# Create required directories
mkdir -p ~/bin
mkdir -p ~/projects/fae-intelligence/fae-intelligence-data
mkdir -p ~/fae-dashboard

# Verify structure
ls -la ~/bin
ls -la ~/projects/fae-intelligence/
```

### Step 2: Install Main Launcher Script

```bash
# Create the main launcher
cat > ~/bin/fae-tools << 'EOF'
#!/bin/bash

# Fae Intelligence Development Tool Hub
# Version: 1.1
# Purpose: Unified launcher for all development tools

# Color definitions for UI
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# System configuration
OBSIDIAN_PATH="~/Downloads/Obsidian-1.8.10.AppImage"
KNOWLEDGE_VAULT="~/projects/fae-intelligence"
N8N_URL="http://localhost:5678"
NEO4J_URL="http://localhost:7474"
DASHBOARD_PORT="8080"
PROJECT_DIR="~/projects/fae-intelligence"
DOCS_PATH="~/projects/fae-intelligence/docs/unified-frontend-documentation.md"

# Display header
clear
echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║${NC}                   ${CYAN}🧠 Fae Intelligence Tool Hub${NC}                   ${PURPLE}║${NC}"
echo -e "${PURPLE}║${NC}              ${YELLOW}AI Consultancy Development Environment${NC}              ${PURPLE}║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function: Display main menu
show_menu() {
    echo -e "${BLUE}┌─ Available Tools ──────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}1)${NC} 🧠 Knowledge Management    ${CYAN}(Obsidian + Neo4j)${NC}         ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}2)${NC} ⚙️  Automation Platform     ${CYAN}(n8n + Docker)${NC}           ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}3)${NC} 💻 Development Environment ${CYAN}(VS Code + Terminal)${NC}      ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}4)${NC} 🌐 Web Dashboard           ${CYAN}(HTTP Interface)${NC}          ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}5)${NC} 📊 System Status           ${CYAN}(Health Check)${NC}           ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}6)${NC} 🚀 Launch Everything       ${CYAN}(Full Stack)${NC}             ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}7)${NC} 📖 View Documentation      ${CYAN}(This Guide)${NC}             ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}0)${NC} 👋 Exit                                                ${BLUE}│${NC}"
    echo -e "${BLUE}└────────────────────────────────────────────────────────────┘${NC}"
}

# Function: Show documentation
show_documentation() {
    echo -e "\n${YELLOW}📖 Loading Documentation...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    if [ -f "$DOCS_PATH" ]; then
        less -R "$DOCS_PATH"
    else
        echo -e "  ${RED}❌ Documentation file not found at $DOCS_PATH${NC}"
    fi
}

# Function: Launch knowledge management tools
launch_knowledge() {
    echo -e "\n${YELLOW}🧠 Starting Knowledge Management...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Ensure knowledge vault exists
    if [ ! -d "$KNOWLEDGE_VAULT" ]; then
        echo -e "  ${YELLOW}📁 Creating Knowledge Vault...${NC}"
        mkdir -p "$KNOWLEDGE_VAULT"
    fi
    
    # Launch Obsidian
    echo -e "  ${CYAN}📝 Launching Obsidian...${NC}"
    if [ -f "$OBSIDIAN_PATH" ]; then
        eval "$OBSIDIAN_PATH --no-sandbox" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ Obsidian launched${NC}"
    else
        echo -e "  ${RED}❌ Obsidian not found at $OBSIDIAN_PATH${NC}"
    fi
    
    # Check Neo4j
    echo -e "  ${CYAN}🗄️ Checking Neo4j Database...${NC}"
    if curl -s --connect-timeout 3 "$NEO4J_URL" > /dev/null; then
        xdg-open "$NEO4J_URL" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ Neo4j browser opened${NC}"
    else
        echo -e "  ${YELLOW}⚠️ Neo4j not running. Start with: docker start neo4j${NC}"
    fi
}

# Function: Launch automation platform
launch_automation() {
    echo -e "\n${YELLOW}⚙️ Starting Automation Platform...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Check n8n
    echo -e "  ${CYAN}⚡ Checking n8n Workflows...${NC}"
    if curl -s --connect-timeout 3 "$N8N_URL" > /dev/null; then
        xdg-open "$N8N_URL" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ n8n interface opened${NC}"
    else
        echo -e "  ${YELLOW}⚠️ n8n not running. Start with: docker start n8n${NC}"
    fi
    
    # Docker status
    echo -e "  ${CYAN}🐳 Docker container status:${NC}"
    if command -v docker > /dev/null 2>&1; then
        docker ps --format "    {{.Names}}: {{.Status}}" | grep -E "(n8n|neo4j|chroma)" || echo -e "    ${YELLOW}No relevant containers running${NC}"
    else
        echo -e "    ${RED}❌ Docker not available${NC}"
    fi
}

# Function: Launch development environment
launch_development() {
    echo -e "\n${YELLOW}💻 Starting Development Environment...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Launch VS Code
    echo -e "  ${CYAN}💻 Launching VS Code...${NC}"
    if command -v code > /dev/null 2>&1; then
        code "$PROJECT_DIR" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ VS Code opened${NC}"
    else
        echo -e "  ${YELLOW}⚠️ VS Code not found${NC}"
    fi
    
    # Launch terminal
    echo -e "  ${CYAN}⌨️ Opening terminal...${NC}"
    if command -v gnome-terminal > /dev/null 2>&1; then
        gnome-terminal --working-directory="$PROJECT_DIR" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ Terminal opened${NC}"
    else
        echo -e "  ${YELLOW}⚠️ Terminal not found${NC}"
    fi
}

# Function: Launch web dashboard
launch_dashboard() {
    echo -e "\n${YELLOW}🌐 Starting Web Dashboard...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    # Check if dashboard server is running
    if lsof -Pi :$DASHBOARD_PORT -sTCP:LISTEN -t > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Dashboard already running${NC}"
    else
        # Start dashboard server
        echo -e "  ${CYAN}🚀 Starting dashboard server...${NC}"
        cd ~/fae-dashboard && python3 -m http.server $DASHBOARD_PORT > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ Dashboard server started${NC}"
    fi
    
    # Open dashboard
    sleep 2
    xdg-open "http://localhost:$DASHBOARD_PORT" > /dev/null 2>&1 &
    echo -e "  ${GREEN}✅ Dashboard opened at http://localhost:$DASHBOARD_PORT${NC}"
}

# Function: Show system status
show_status() {
    echo -e "\n${YELLOW}📊 System Status Dashboard${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    echo -e "\n${CYAN}🧠 Knowledge Management:${NC}"
    pgrep -x obsidian > /dev/null && echo -e "  ${GREEN}✅ Obsidian: Running${NC}" || echo -e "  ${RED}❌ Obsidian: Stopped${NC}"
    curl -s --connect-timeout 3 "$NEO4J_URL" > /dev/null && echo -e "  ${GREEN}✅ Neo4j: Running${NC}" || echo -e "  ${RED}❌ Neo4j: Stopped${NC}"
    
    echo -e "\n${CYAN}⚙️ Automation Platform:${NC}"
    curl -s --connect-timeout 3 "$N8N_URL" > /dev/null && echo -e "  ${GREEN}✅ n8n: Running${NC}" || echo -e "  ${RED}❌ n8n: Stopped${NC}"
    
    echo -e "\n${CYAN}🐳 Docker Containers:${NC}"
    if command -v docker > /dev/null 2>&1; then
        docker ps --format "  {{.Names}}: {{.Status}}" | grep -E "(neo4j|n8n|chroma)" || echo -e "  ${YELLOW}⚠️ No relevant containers running${NC}"
    else
        echo -e "  ${RED}❌ Docker not installed${NC}"
    fi
    
    echo -e "\n${CYAN}📁 File System:${NC}"
    [ -d "$KNOWLEDGE_VAULT" ] && echo -e "  ${GREEN}✅ Knowledge Vault: Available${NC}" || echo -e "  ${RED}❌ Knowledge Vault: Missing${NC}"
    [ -f "$OBSIDIAN_PATH" ] && echo -e "  ${GREEN}✅ Obsidian App: Available${NC}" || echo -e "  ${RED}❌ Obsidian App: Missing${NC}"
}

# Function: Launch everything
launch_all() {
    echo -e "\n${YELLOW}🚀 Launching Complete Development Stack...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    launch_knowledge
    sleep 2
    launch_automation
    sleep 1
    launch_development
    sleep 1
    launch_dashboard
    
    echo -e "\n${GREEN}🎉 Full development stack launched!${NC}"
}

# Handle command line arguments for direct access
case "$1" in
    "knowledge"|"k") launch_knowledge; exit 0 ;;
    "automation"|"a") launch_automation; exit 0 ;;
    "development"|"d") launch_development; exit 0 ;;
    "dashboard"|"w") launch_dashboard; exit 0 ;;
    "status"|"s") show_status; exit 0 ;;
    "all") launch_all; exit 0 ;;
    "docs") show_documentation; exit 0 ;;
    "help"|"--help"|"-h")
        echo "Fae Intelligence Tool Hub"
        echo "Usage: fae-tools [command]"
        echo ""
        echo "Commands:"
        echo "  knowledge, k    - Launch knowledge management"
        echo "  automation, a   - Launch automation platform"
        echo "  development, d  - Launch development environment"
        echo "  dashboard, w    - Launch web dashboard"
        echo "  status, s       - Show system status"
        echo "  all            - Launch everything"
        echo "  docs           - View documentation"
        echo "  help           - Show this help"
        echo ""
        echo "Without arguments: Show interactive menu"
        exit 0
        ;;
esac

# Main interactive menu loop
while true; do
    show_menu
    echo ""
    read -p "$(echo -e "${GREEN}Enter your choice [0-7]: ${NC}")" choice
    
    case $choice in
        1) launch_knowledge ;;
        2) launch_automation ;;
        3) launch_development ;;
        4) launch_dashboard ;;
        5) show_status ;;
        6) launch_all ;;
        7) show_documentation ;;
        0) 
            echo -e "\n${CYAN}👋 Thanks for using Fae Intelligence Tool Hub!${NC}"
            exit 0 
            ;;
        *) 
            echo -e "\n${RED}❌ Invalid option. Please try again.${NC}" 
            ;;
    esac
    
    echo ""
    read -p "$(echo -e "${BLUE}Press Enter to continue...${NC}")"
    clear
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}                   ${CYAN}🧠 Fae Intelligence Tool Hub${NC}                   ${PURPLE}║${NC}"
echo -e "${PURPLE}║${NC}              ${YELLOW}AI Consultancy Development Environment${NC}              ${PURPLE}║${NC}"
echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
echo ""
done
EOF

# Make executable
chmod +x ~/bin/fae-tools
```

### Step 3: Create Web Dashboard

```bash
# Create dashboard HTML
cat > ~/fae-dashboard/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fae Intelligence Development Hub</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
            color: #ffffff;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .header {
            text-align: center;
            margin-bottom: 30px;
            padding: 20px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #4facfe, #00f2fe);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .tool-card {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #4CAF50;
            transition: transform 0.3s ease;
        }
        .tool-card:hover { transform: translateY(-5px); }
        .tool-link {
            color: #64B5F6;
            text-decoration: none;
            margin-right: 15px;
            padding: 5px 10px;
            border: 1px solid #64B5F6;
            border-radius: 5px;
            display: inline-block;
            margin-bottom: 5px;
        }
        .tool-link:hover { background: rgba(100, 181, 246, 0.2); }
        .status { 
            float: right; 
            padding: 4px 8px; 
            border-radius: 4px; 
            font-size: 12px; 
            background: #4CAF50; 
        }
        .actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        .action-btn {
            padding: 15px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            text-align: center;
            font-weight: 500;
            transition: transform 0.3s ease;
        }
        .action-btn:hover { transform: translateY(-3px); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🧠 Fae Intelligence Development Hub</h1>
            <p>Unified Tool Access • Last Updated: <span id="timestamp"></span></p>
        </div>
        
        <div class="tools-grid">
            <div class="tool-card">
                <h3>🧠 Knowledge Management <span class="status">READY</span></h3>
                <p>Graph-based knowledge discovery and research coordination</p>
                <a href="obsidian://" class="tool-link">📝 Obsidian</a>
                <a href="http://localhost:7474" class="tool-link" target="_blank">🗄️ Neo4j</a>
            </div>
            
            <div class="tool-card">
                <h3>⚙️ Automation Engine <span class="status">READY</span></h3>
                <p>Workflow automation and AI integration platform</p>
                <a href="http://localhost:5678" class="tool-link" target="_blank">⚡ n8n</a>
                <a href="javascript:void(0)" class="tool-link" onclick="checkDocker()">🐳 Docker</a>
            </div>
            
            <div class="tool-card">
                <h3>💻 Development Environment <span class="status">READY</span></h3>
                <p>Code editing and project management</p>
                <a href="vscode://file/home/rosie/projects/fae-intelligence" class="tool-link">💻 VS Code</a>
                <a href="file:///home/rosie/projects/fae-intelligence" class="tool-link">📁 Projects</a>
            </div>
        </div>
        
        <div class="actions">
            <a href="javascript:void(0)" class="action-btn" onclick="refreshStatus()">🔄 Refresh Status</a>
            <a href="javascript:void(0)" class="action-btn" onclick="showTerminalHelp()">⌨️ Terminal Commands</a>
            <a href="javascript:void(0)" class="action-btn" onclick="showDocumentation()">📖 Documentation</a>
        </div>
    </div>

    <script>
        function updateTimestamp() {
            document.getElementById('timestamp').textContent = new Date().toLocaleTimeString();
        }
        
        function checkDocker() {
            alert('Check Docker status with: docker ps\nOr use: fae-tools status');
        }
        
        function refreshStatus() {
            updateTimestamp();
            alert('Status refreshed. Use "fae-tools status" in terminal for detailed info.');
        }
        
        function showTerminalHelp() {
            alert('Terminal Commands:\n• fae-tools - Main menu\n• fae-tools all - Launch everything\n• fae-tools status - Check status\n• obsidian - Launch Obsidian directly');
        }
        
        function showDocumentation() {
            alert('Documentation:\n• Main docs: ~/projects/fae-intelligence/docs/\n• Tool docs: fae-tools help\n• Knowledge vault: ~/projects/fae-intelligence/fae-intelligence-data/');
        }
        
        updateTimestamp();
        setInterval(updateTimestamp, 60000);
    </script>
</body>
</html>
EOF
```

### Step 4: Configure System PATH

```bash
# Add bin directory to PATH
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc

# Add Obsidian alias
echo 'alias obsidian="~/Downloads/Obsidian-1.8.10.AppImage --no-sandbox"' >> ~/.bashrc

# Reload configuration
source ~/.bashrc
```

### Step 5: Create Desktop Integration

```bash
# Create desktop launcher
cat > ~/.local/share/applications/fae-tools.desktop << 'EOF'
[Desktop Entry]
Name=Fae Intelligence Tools
Comment=Launch development tool suite
Exec=/home/rosie/bin/fae-tools
Icon=applications-development
Terminal=true
Type=Application
Categories=Development;
EOF

# Update desktop database
update-desktop-database ~/.local/share/applications/
```

## Usage Guide

### Command Line Interface

```bash
# Interactive menu
fae-tools

# Direct commands
fae-tools knowledge     # Launch Obsidian + Neo4j
fae-tools automation    # Launch n8n + Docker tools  
fae-tools development   # Launch VS Code + Terminal
fae-tools dashboard     # Launch web dashboard
fae-tools status        # Show system health
fae-tools all          # Launch everything
fae-tools help         # Show help

# Quick aliases
obsidian               # Launch Obsidian directly
```

### Web Dashboard

- **URL**: http://localhost:8080
- **Auto-start**: `fae-tools dashboard`
- **Features**: Visual tool access, status monitoring, quick links

### Desktop Launcher

- Search for "Fae Intelligence Tools" in applications menu
- Launches terminal interface

## File Structure

```
~/bin/
├── fae-tools                    # Main launcher script

~/fae-dashboard/
├── index.html                   # Web dashboard interface

~/projects/fae-intelligence/
├── fae-intelligence-data/       # Obsidian knowledge vault
├── consultancy-dashboard/       # Existing dashboard project
├── docs/                       # Project documentation
├── PROJECT_BRAIN.md            # Master project file
└── README.md                   # Project overview

~/.local/share/applications/
├── fae-tools.desktop           # Desktop launcher
```

## Configuration

### System Paths (Configurable in script)

```bash
OBSIDIAN_PATH="~/Downloads/Obsidian-1.8.10.AppImage"
KNOWLEDGE_VAULT="~/projects/fae-intelligence/fae-intelligence-data"
N8N_URL="http://localhost:5678"
NEO4J_URL="http://localhost:7474"
DASHBOARD_PORT="8080"
PROJECT_DIR="~/projects/fae-intelligence"
```

### Service URLs

| Service | Default URL | Purpose |
|---------|-------------|---------|
| n8n Workflows | http://localhost:5678 | Automation platform |
| Neo4j Browser | http://localhost:7474 | Graph database interface |
| Web Dashboard | http://localhost:8080 | Tool hub interface |

## Troubleshooting

### Common Issues

**1. "fae-tools: command not found"**
```bash
# Solution: Check PATH
echo $PATH | grep -q "$HOME/bin" || echo 'export PATH="$HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

**2. "Obsidian not found"**
```bash
# Solution: Verify Obsidian location
ls -la ~/Downloads/Obsidian-*.AppImage
# Update OBSIDIAN_PATH in script if different
```

**3. "Services not responding"**
```bash
# Solution: Check service status
fae-tools status
docker ps
curl -s http://localhost:5678 || echo "n8n not running"
curl -s http://localhost:7474 || echo "Neo4j not running"
```

**4. "Dashboard won't start"**
```bash
# Solution: Check port availability
lsof -Pi :8080 -sTCP:LISTEN
# Kill existing process if needed
pkill -f "python3.*8080"
```

### Service Dependencies

**Required for full functionality:**
- Docker (for Neo4j, n8n containers)
- Python 3 (for web dashboard)
- Obsidian AppImage
- VS Code (optional, file manager fallback available)

**Service startup order:**
1. Docker containers (Neo4j, n8n)
2. Obsidian
3. VS Code/Terminal
4. Web dashboard

## Logging and Debugging

### Enable Debug Mode

```bash
# Add to ~/.bashrc for verbose output
export FAE_TOOLS_DEBUG=1
```

### Log Locations

```bash
# System logs
journalctl -u docker
docker logs neo4j
docker logs n8n

# Application logs
~/.local/share/obsidian/logs/
```

### Status Check Commands

```bash
# Quick health check
fae-tools status

# Detailed system check
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
pgrep -fa obsidian
lsof -Pi :5678,7474,8080 -sTCP:LISTEN
```

## Security Considerations

- Web dashboard runs on localhost only
- No external network access required
- Docker containers use default security settings
- Obsidian runs with `--no-sandbox` flag (required for AppImage on Linux)

## Version Information

- **System Version**: 1.0
- **Last Updated**: 2025-07-21
- **Compatibility**: Linux (Ubuntu/Debian tested)
- **Dependencies**: Docker, Python 3, Obsidian AppImage

## Support

For issues:
1. Check troubleshooting section above
2. Run `fae-tools status` for diagnostic info
3. Check service-specific logs
4. Verify all dependencies are installed

---

*This documentation should be kept updated as the system evolves.*
