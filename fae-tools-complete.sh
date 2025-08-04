#!/bin/bash

# Fae Intelligence Development Tool Hub
# Version: 1.6 (Knowledge Graph Integration)
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
KNOWLEDGE_VAULT="/home/rosie/projects/fae-intelligence" # Corrected path
N8N_URL="http://localhost:5678"
NEO4J_URL="http://localhost:7474"
DASHBOARD_PORT="8080"
PROJECT_DIR="/home/rosie/projects/fae-intelligence"
DOCS_PATH="/home/rosie/projects/fae-intelligence/docs/unified-frontend-documentation.md"
INGEST_SCRIPT="/home/rosie/projects/fae-intelligence/scripts/ingest_video_analysis.sh" # Original video ingest script
RAG_SERVICE_DIR="/home/rosie/projects/fae-intelligence-rag"
RAG_SERVICE_URL="http://127.0.0.1:8001"

# Function to display header
display_header() {
    clear
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}         ${CYAN}Fae Intelligence Tool Hub${NC}                      ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}           ${YELLOW}Enhanced Host Machine Version${NC}            ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Function to launch Consultancy Dashboard
launch_consultancy_dashboard() {
    echo -e "\n${YELLOW}🚀 Launching Consultancy Dashboard...${NC}"
    gnome-terminal -- bash -c "/home/rosie/projects/fae-intelligence/start_fae_dashboard.sh; exec bash"
    echo -e "${GREEN}✅ Consultancy Dashboard launched in a new terminal. ${NC}"
}

# Function to launch Project Explorer
launch_project_explorer() {
    echo -e "\n${YELLOW}📂 Opening Project Explorer...${NC}"
    xdg-open "${PROJECT_DIR}" > /dev/null 2>&1
    echo -e "${GREEN}✅ Project Explorer opened. ${NC}"
}

# Function: Show general documentation
show_documentation() {
    echo -e "\n${YELLOW}📖 Loading Documentation...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    if [ -f "${DOCS_PATH}" ]; then
        less -R "${DOCS_PATH}"
    else
        echo -e "  ${RED}❌ Documentation file not found at  ${DOCS_PATH}${NC}"
    fi
}

# Function: Ingest Video Analysis (original function, kept for compatibility)
ingest_video_analysis() {
    echo -e "\n${YELLOW}📥 Ingesting Video Analysis into Knowledge Graph (Original)...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    if [ -f "${INGEST_SCRIPT}" ]; then
        "${INGEST_SCRIPT}"
    else
        echo -e "  ${RED}❌ Ingestion script not found at  ${INGEST_SCRIPT}${NC}"
        echo -e "  ${YELLOW}Please ensure /home/rosie/projects/fae-intelligence/scripts/ingest_video_analysis.sh exists and is executable.${NC}"
    fi
}

# Function: Reset Neo4j Database
reset_neo4j_db() {
    echo -e "\n${YELLOW}⚠️ Clearing Neo4j Database... This will delete ALL data!${NC}"
    read -p "$(echo -e "${RED}Are you sure you want to proceed? (yes/no): ${NC}")" confirm
    if [[ "$confirm" == "yes" ]]; then
        docker exec database cypher-shell -u neo4j -p password "MATCH (n) DETACH DELETE n;"
        echo -e "${GREEN}✅ Neo4j database cleared. ${NC}"
    else
        echo -e "${CYAN}❌ Neo4j database clear cancelled. ${NC}"
    fi
}

# Function: View Knowledge Base Documentation
view_kb_docs() {
    echo -e "\n${YELLOW}📖 Loading Knowledge Base Documentation...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    local KB_DOCS_PATH="/home/rosie/projects/fae-intelligence/docs/knowledge-base-tools.md"
    if [ -f "${KB_DOCS_PATH}" ]; then
        less -R "${KB_DOCS_PATH}"
    else
        echo -e "  ${RED}❌ Knowledge Base Documentation file not found at  ${KB_DOCS_PATH}${NC}"
    fi
}

# Function: Show Knowledge Base Sub-Menu
show_knowledge_base_menu() {
    while true; do
        display_header
        echo -e "${BLUE}┌─ Knowledge Base Operations ────────────────────────────────┐${NC}"
        echo -e "${BLUE}│${NC} ${GREEN}1)${NC}  Launch Obsidian                                   ${BLUE}│${NC}"
        echo -e "${BLUE}│${NC} ${GREEN}2)${NC}  Launch Neo4j Browser                              ${BLUE}│${NC}"
        echo -e "${BLUE}│${NC} ${GREEN}3)${NC}  Run Triage & Tagging Script                     ${BLUE}│${NC}"
        echo -e "${BLUE}│${NC} ${GREEN}4)${NC}  Run Knowledge Ingestion Script                  ${BLUE}│${NC}"
        echo -e "${BLUE}│${NC} ${GREEN}5)${NC}  Reset Neo4j Database ${RED}(DANGER ZONE)${NC}           ${BLUE}│${NC}"
        echo -e "${BLUE}│${NC} ${GREEN}6)${NC}  View Knowledge Base Docs                        ${BLUE}│${NC}"
        echo -e "${BLUE}│${NC} ${GREEN}0)${NC}  Back to Main Menu                               ${BLUE}│${NC}"
        echo -e "${BLUE}└────────────────────────────────────────────────────────────┘${NC}"
        echo ""
        read -p "$(echo -e "${GREEN}Enter your choice [0-6]: ${NC}")" kb_choice

        case $kb_choice in
            1)
                echo -e "\n${CYAN}📝 Launching Obsidian...${NC}\n"
                if [ -f "${OBSIDIAN_PATH}" ]; then
                    eval "${OBSIDIAN_PATH} --no-sandbox" > /dev/null 2>&1 &
                    echo -e "  ${GREEN}✅ Obsidian launched ${NC}"
                else
                    echo -e "  ${RED}❌ Obsidian not found at  ${OBSIDIAN_PATH}${NC}"
                fi
                ;;
            2)
                echo -e "\n${CYAN}🗄️ Checking Neo4j Database..${NC}\n"
                if curl -s --connect-timeout 3 "${NEO4J_URL}" > /dev/null; then
                    xdg-open "${NEO4J_URL}" > /dev/null 2>&1 &
                    echo -e "  ${GREEN}✅ Neo4j browser opened ${NC}"
                else
                    echo -e "  ${YELLOW}⚠️ Neo4j not running. Start with: docker start database${NC}"
                fi
                ;;
            3)
                echo -e "\n${YELLOW}Running Triage & Tagging Script...${NC}"
                python3 /home/rosie/projects/fae-intelligence/scripts/triage_and_tag.py
                ;;
            4)
                echo -e "\n${YELLOW}Running Knowledge Ingestion Script...${NC}"
                python3 /home/rosie/projects/fae-intelligence/scripts/ingest_to_neo4j.py
                ;;
            5) reset_neo4j_db ;;
            6) view_kb_docs ;;
            0) break ;;
            *) echo -e "\n${RED}❌ Invalid option. Please try again. ${NC}" ;;
        esac
        echo ""
        read -p "$(echo -e "${BLUE}Press Enter to continue...${NC}")"
    done
}

# Function: Launch knowledge management tools
launch_knowledge() {
    show_knowledge_base_menu
}

# Function: Launch automation platform
launch_automation() {
    echo -e "\n${YELLOW}⚙️ Starting Automation Platform...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    # Check n8n
    echo -e "  ${CYAN}⚡ Checking n8n Workflows... ${NC}\n"
    if curl -s --connect-timeout 3 "${N8N_URL}" > /dev/null; then
        xdg-open "${N8N_URL}" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ n8n interface opened ${NC}"
    else
        echo -e "  ${YELLOW}⚠️ n8n not running. Start with: docker start n8n_permanent_n8n_1${NC}"
    fi

    # Docker status
    echo -e "  ${CYAN}🐳 Docker container status:${NC}\n"
    if command -v docker > /dev/null 2>&1; then
        docker ps --format "    {{.Names}}: {{.Status}}" | grep -E "(n8n|database|chroma)" || echo -e "    ${YELLOW}No relevant containers running${NC}"
    else
        echo -e "    ${RED}❌ Docker not available ${NC}"
    fi
}

# Function: Launch development environment
launch_development() {
    echo -e "\n${YELLOW}💻 Starting Development Environment...${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    # Launch VS Code
    echo -e "  ${CYAN}💻 Launching VS Code...${NC}\n"
    if command -v code > /dev/null 2>&1; then
        code "${PROJECT_DIR}" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ VS Code opened ${NC}"
    else
        echo -e "  ${YELLOW}⚠️ VS Code not found${NC}"
    fi

    # Launch terminal
    echo -e "  ${CYAN}⌨️ Opening terminal...${NC}\n"
    if command -v gnome-terminal > /dev/null 2>&1; then
        gnome-terminal --working-directory="${PROJECT_DIR}" > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ Terminal opened ${NC}"
    else
        echo -e "  ${YELLOW}⚠️ Terminal not found${NC}"
    fi
}

# Function: Launch web dashboard
launch_dashboard() {
    echo -e "\n${YELLOW}🌐 Starting Web Dashboard...${NC}\n"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    # Check if dashboard server is running
    if lsof -Pi :$DASHBOARD_PORT -sTCP:LISTEN -t > /dev/null 2>&1; then
        echo -e "  ${GREEN}✅ Dashboard already running ${NC}"
    else
        # Start dashboard server
        echo -e "  ${CYAN}🚀 Starting dashboard server...${NC}\n"
        # Ensure '~/fae-dashboard' exists and contains an index.html or similar for the http.server
        cd "${HOME}/fae-dashboard" && python3 -m http.server $DASHBOARD_PORT > /dev/null 2>&1 &
        echo -e "  ${GREEN}✅ Dashboard server started ${NC}"
    fi

    # Open dashboard
    sleep 2
    xdg-open "http://localhost:${DASHBOARD_PORT}" > /dev/null 2>&1 &
    echo -e "  ${GREEN}✅ Dashboard opened at http://localhost:${DASHBOARD_PORT}${NC}\n"
}

# Function: Show system status
show_status() {
    echo -e "\n${YELLOW}📊 System Status Dashboard${NC}\n"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    echo -e "${CYAN}🧠 Knowledge Management:${NC}\n"
    pgrep -x obsidian > /dev/null && echo -e "  ${GREEN}✅ Obsidian: Running ${NC}" || echo -e "  ${RED}❌ Obsidian: Stopped ${NC}"
    curl -s --connect-timeout 3 "${NEO4J_URL}" > /dev/null && echo -e "  ${GREEN}✅ Neo4j: Running ${NC}" || echo -e "  ${RED}❌ Neo4j: Stopped ${NC}"

    echo -e "${CYAN}⚙️ Automation Platform:${NC}\n"
    curl -s --connect-timeout 3 "${N8N_URL}" > /dev/null && echo -e "  ${GREEN}✅ n8n: Running ${NC}" || echo -e "  ${RED}❌ n8n: Stopped ${NC}"

    echo -e "${CYAN}🎯 RAG Service:${NC}\n"
    curl -s --connect-timeout 3 "${RAG_SERVICE_URL}/health" > /dev/null && echo -e "  ${GREEN}✅ RAG Service: Running ${NC}" || echo -e "  ${RED}❌ RAG Service: Stopped ${NC}"
    pgrep -x ollama > /dev/null && echo -e "  ${GREEN}✅ Ollama: Running ${NC}" || echo -e "  ${RED}❌ Ollama: Stopped ${NC}"

    echo -e "${CYAN}🐳 Docker Containers:${NC}\n"
    if command -v docker > /dev/null 2>&1; then
        docker ps --format "    {{.Names}}: {{.Status}}" | grep -E "(n8n|database|chroma)" || echo -e "    ${YELLOW}No relevant containers running${NC}"
    else
        echo -e "    ${RED}❌ Docker not available ${NC}"
    fi

    echo -e "${CYAN}📁 File System:${NC}\n"
    [ -d "${KNOWLEDGE_VAULT}" ] && echo -e "  ${GREEN}✅ Knowledge Vault: Available ${NC}" || echo -e "  ${RED}❌ Knowledge Vault: Missing ${NC}"
    [ -f "${OBSIDIAN_PATH}" ] && echo -e "  ${GREEN}✅ Obsidian App: Available ${NC}" || echo -e "  ${RED}❌ Obsidian App: Missing ${NC}"
}

# Function: Launch everything
launch_all() {
    echo -e "\n${YELLOW}🚀 Launching Complete Development Stack...${NC}\n"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

    launch_knowledge
    sleep 2
    launch_consultancy_dashboard
    launch_automation
    sleep 1
    launch_development
    sleep 1
    launch_dashboard

    echo -e "\n${GREEN}🎉 Full development stack launched!${NC}\n"
}

# Function: RAG Service Management
launch_rag_service() {
    echo -e "\n${YELLOW}🎯 RAG Service Management Hub${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    while true; do
        echo -e "${CYAN}Available Options:${NC}\n"
        echo -e "${GREEN}1)${NC} Start RAG Service (Optimized)"
        echo -e "${GREEN}2)${NC} Stop RAG Service"
        echo -e "${GREEN}3)${NC} Check RAG Service Status"
        echo -e "${GREEN}4)${NC} Test RAG Service (Run Test Suite)"
        echo -e "${GREEN}5)${NC} Query RAG Service (Interactive)"
        echo -e "${GREEN}6)${NC} View RAG Service Logs"
        echo -e "${GREEN}7)${NC} Open RAG API Documentation"
        echo -e "${GREEN}8)${NC} Restart Ollama Service"
        echo -e "${GREEN}0)${NC} Back to Main Menu"
        echo ""
        
        read -p "$(echo -e "${GREEN}Enter your choice [0-8]: ${NC}")" rag_choice
        
        case $rag_choice in
            1)
                echo -e "\n${YELLOW}🚀 Starting RAG Service (Optimized)...${NC}"
                if curl -s --connect-timeout 3 "${RAG_SERVICE_URL}/health" > /dev/null 2>&1; then
                    echo -e "${YELLOW}⚠️ RAG Service is already running!${NC}"
                    echo -e "${GREEN}✅ Service URL: ${RAG_SERVICE_URL}${NC}"
                else
                    echo -e "${CYAN}🔧 Checking Ollama service...${NC}"
                    if ! pgrep -x ollama > /dev/null; then
                        echo -e "${YELLOW}⚠️ Starting Ollama service first...${NC}"
                        ollama serve > /dev/null 2>&1 &
                        sleep 3
                    fi
                    
                    echo -e "${CYAN}🎯 Starting optimized RAG service...${NC}"
                    cd "${RAG_SERVICE_DIR}"
                    gnome-terminal -- bash -c "echo 'Starting RAG Service...'; source venv/bin/activate && python3 rag_server_optimized.py; exec bash"
                    sleep 3
                    
                    echo -e "${GREEN}✅ RAG Service started in new terminal${NC}"
                    echo -e "${CYAN}📄 Access URLs:${NC}"
                    echo -e "   • Health Check: ${RAG_SERVICE_URL}/health"
                    echo -e "   • API Documentation: ${RAG_SERVICE_URL}/docs"
                    echo -e "   • Service Status: ${RAG_SERVICE_URL}/"
                fi
                echo ""
                ;;
            2)
                echo -e "\n${YELLOW}🛑 Stopping RAG Service...${NC}"
                pkill -f "rag_server_optimized.py" 2>/dev/null && echo -e "   ${GREEN}✅ RAG Service stopped${NC}" || echo -e "   ${YELLOW}⚠️ No RAG Service found running${NC}"
                echo ""
                ;;
            3)
                echo -e "\n${YELLOW}🔍 Checking RAG Service Status...${NC}"
                echo -e "${CYAN}Service Health:${NC}"
                if curl -s --connect-timeout 3 "${RAG_SERVICE_URL}/health" > /dev/null 2>&1; then
                    echo -e "   ${GREEN}✅ RAG Service is running and healthy${NC}"
                    curl -s "${RAG_SERVICE_URL}/health" | python3 -m json.tool 2>/dev/null || echo "   (Health check response received)"
                else
                    echo -e "   ${RED}❌ RAG Service is not responding${NC}"
                fi
                
                echo -e "${CYAN}Process Status:${NC}"
                if pgrep -f "rag_server_optimized.py" > /dev/null; then
                    echo -e "   ${GREEN}✅ RAG Service process is running${NC}"
                else
                    echo -e "   ${RED}❌ RAG Service process not found${NC}"
                fi
                
                echo -e "${CYAN}Ollama Status:${NC}"
                if pgrep -x ollama > /dev/null; then
                    echo -e "   ${GREEN}✅ Ollama service is running${NC}"
                else
                    echo -e "   ${RED}❌ Ollama service is not running${NC}"
                fi
                echo ""
                ;;
            4)
                echo -e "\n${YELLOW}🧪 Running RAG Service Test Suite...${NC}"
                if [ -f "${RAG_SERVICE_DIR}/test_rag_service.sh" ]; then
                    cd "${RAG_SERVICE_DIR}"
                    chmod +x test_rag_service.sh
                    ./test_rag_service.sh
                else
                    echo -e "${RED}❌ Test script not found at ${RAG_SERVICE_DIR}/test_rag_service.sh${NC}"
                fi
                echo ""
                ;;
            5)
                echo -e "\n${YELLOW}💬 Interactive RAG Query${NC}"
                echo -e "${CYAN}Enter your query (or 'quit' to exit):${NC}"
                read -p "> " user_query
                if [ "$user_query" != "quit" ] && [ ! -z "$user_query" ]; then
                    echo -e "\n${YELLOW}🔍 Querying RAG service...${NC}"
                    curl -s -X POST "${RAG_SERVICE_URL}/query" \
                        -H "Content-Type: application/json" \
                        -d "{\"query\": \"$user_query\"}" | \
                        python3 -m json.tool 2>/dev/null || echo "Query failed - check service status"
                fi
                echo ""
                ;;
            6)
                echo -e "\n${YELLOW}📜 Viewing RAG Service Logs...${NC}"
                if [ -f "${RAG_SERVICE_DIR}/rag_service_startup.log" ]; then
                    echo -e "${CYAN}Recent startup logs:${NC}"
                    tail -20 "${RAG_SERVICE_DIR}/rag_service_startup.log"
                else
                    echo -e "${YELLOW}⚠️ No log files found. Check terminal where service was started.${NC}"
                fi
                echo ""
                ;;
            7)
                echo -e "\n${YELLOW}📖 Opening RAG API Documentation...${NC}"
                if curl -s --connect-timeout 3 "${RAG_SERVICE_URL}/health" > /dev/null 2>&1; then
                    xdg-open "${RAG_SERVICE_URL}/docs" > /dev/null 2>&1 &
                    echo -e "${GREEN}✅ API documentation opened in browser${NC}"
                    echo -e "${CYAN}URL: ${RAG_SERVICE_URL}/docs${NC}"
                else
                    echo -e "${RED}❌ RAG Service is not running. Start it first with option 1.${NC}"
                fi
                echo ""
                ;;
            8)
                echo -e "\n${YELLOW}🔄 Restarting Ollama Service...${NC}"
                pkill -x ollama 2>/dev/null
                sleep 2
                ollama serve > /dev/null 2>&1 &
                sleep 3
                if pgrep -x ollama > /dev/null; then
                    echo -e "${GREEN}✅ Ollama service restarted successfully${NC}"
                else
                    echo -e "${RED}❌ Failed to restart Ollama service${NC}"
                fi
                echo ""
                ;;
            0)
                break
                ;;
            *)
                echo -e "\n${RED}❌ Invalid option. Please try again.${NC}\n"
                ;;
        esac
        
        if [ "$rag_choice" != "0" ]; then
            read -p "$(echo -e "${BLUE}Press Enter to continue...${NC}")"
        fi
    done
}

# Function: Visual Content Editors Management
launch_visual_editors() {
    echo -e "\n${YELLOW}🎨 Visual Content Editors Hub${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
    
    while true; do
        echo -e "${CYAN}Available Options:${NC}\n"
        echo -e "${GREEN}1)${NC} Start JavaScript Content Editor Server (Port 8085)"
        echo -e "${GREEN}2)${NC} Start Server-Side Includes Editor Server (Port 8086)"
        echo -e "${GREEN}3)${NC} Visual Content Editor (Markdown to Visual Layout)"
        echo -e "${GREEN}4)${NC} View Shared Components Guide"
        echo -e "${GREEN}5)${NC} Check Server Status"
        echo -e "${GREEN}6)${NC} Stop All Editor Servers"
        echo -e "${GREEN}0)${NC} Back to Main Menu"
        echo ""
        
        read -p "$(echo -e "${GREEN}Enter your choice [0-6]: ${NC}")" editor_choice
        
        case $editor_choice in
            1)
                echo -e "\n${YELLOW}🚀 Starting JavaScript Content Editor Server...${NC}"
                if lsof -Pi :8085 -sTCP:LISTEN -t >/dev/null; then
                    echo -e "${YELLOW}⚠️ Server already running on port 8085${NC}"
                else
                    cd /home/rosie/projects/fae-intelligence/html-blog
                    echo -e "${CYAN}Starting npx serve on port 8085...${NC}"
                    nohup npx serve -p 8085 . > /tmp/serve-8085.log 2>&1 &
                    sleep 3
                    if lsof -Pi :8085 -sTCP:LISTEN -t >/dev/null; then
                        echo -e "${GREEN}✅ JavaScript Content Editor server started successfully${NC}"
                        echo -e "${CYAN}📄 Access URLs:${NC}"
                        echo -e "   • Visual Editor: http://localhost:8085/visual-editor.html"
                        echo -e "   • Sample Content: http://localhost:8085/post/getting-started-ai-automation/"
                        echo -e "   • Server logs: tail -f /tmp/serve-8085.log"
                    else
                        echo -e "${RED}❌ Failed to start server. Check logs: cat /tmp/serve-8085.log${NC}"
                    fi
                fi
                echo ""
                ;;
            2)
                echo -e "\n${YELLOW}🚀 Starting Server-Side Includes Content Editor...${NC}"
                if lsof -Pi :8086 -sTCP:LISTEN -t >/dev/null; then
                    echo -e "${YELLOW}⚠️ Server already running on port 8086${NC}"
                else
                    cd /home/rosie/projects/fae-intelligence/html-blog
                    echo -e "${CYAN}Starting SSI server on port 8086...${NC}"
                    nohup node ssi-server.js > /tmp/ssi-8086.log 2>&1 &
                    sleep 3
                    if lsof -Pi :8086 -sTCP:LISTEN -t >/dev/null; then
                        echo -e "${GREEN}✅ Server-Side Includes server started successfully${NC}"
                        echo -e "${CYAN}📄 Access URLs:${NC}"
                        echo -e "   • Visual Editor: http://localhost:8086/visual-editor.html"
                        echo -e "   • Sample Content: http://localhost:8086/post/getting-started-ai-automation/index-ssi.html"
                        echo -e "   • Server logs: tail -f /tmp/ssi-8086.log"
                    else
                        echo -e "${RED}❌ Failed to start server. Check logs: cat /tmp/ssi-8086.log${NC}"
                    fi
                fi
                echo ""
                ;;
            3)
                echo -e "\n${YELLOW}🎨 Opening Visual Content Editor...${NC}"
                xdg-open "http://localhost:8085/visual-editor.html"
                echo -e "${GREEN}✅ Visual Content Editor opened${NC}"
                echo -e "${CYAN}📝 Features:${NC}"
                echo -e "   • Parse Markdown into editable blocks"
                echo -e "   • Change block types (paragraph ↔ heading ↔ image)"
                echo -e "   • Drag & drop to reorder content"
                echo -e "   • Side-by-side layouts with ratio controls"
                echo -e "   • Upload local images or use URLs"
                echo -e "   • Export clean HTML for any content"
                echo ""
                ;;
            4)
                echo -e "\n${YELLOW}📖 Opening Shared Components Guide...${NC}"
                if [ -f "/home/rosie/projects/fae-intelligence/html-blog/SHARED-COMPONENTS-GUIDE.md" ]; then
                    xdg-open "/home/rosie/projects/fae-intelligence/html-blog/SHARED-COMPONENTS-GUIDE.md"
                    echo -e "${GREEN}✅ Guide opened in default application${NC}"
                else
                    echo -e "${RED}❌ Guide not found at expected location${NC}"
                fi
                echo ""
                ;;
            5)
                echo -e "\n${YELLOW}🔍 Checking Editor Server Status...${NC}"
                echo -e "${CYAN}Option 1 (Port 8085):${NC}"
                if curl -s http://localhost:8085 > /dev/null 2>&1; then
                    echo -e "   ${GREEN}✅ JavaScript Includes server is running${NC}"
                else
                    echo -e "   ${RED}❌ JavaScript Includes server is not running${NC}"
                fi
                
                echo -e "${CYAN}Option 2 (Port 8086):${NC}"
                if curl -s http://localhost:8086 > /dev/null 2>&1; then
                    echo -e "   ${GREEN}✅ Server-Side Includes server is running${NC}"
                else
                    echo -e "   ${RED}❌ Server-Side Includes server is not running${NC}"
                fi
                echo ""
                ;;
            6)
                echo -e "\n${YELLOW}🛑 Stopping Editor Servers...${NC}"
                # Stop JavaScript server
                if lsof -Pi :8085 -sTCP:LISTEN -t >/dev/null; then
                    pkill -f "serve.*8085" 2>/dev/null && echo -e "   ${GREEN}✅ Stopped JavaScript Includes server (port 8085)${NC}"
                    rm -f /tmp/serve-8085.log
                else
                    echo -e "   ${YELLOW}⚠️ No JavaScript Includes server found${NC}"
                fi
                # Stop SSI server  
                if lsof -Pi :8086 -sTCP:LISTEN -t >/dev/null; then
                    pkill -f "node.*ssi-server" 2>/dev/null && echo -e "   ${GREEN}✅ Stopped SSI server (port 8086)${NC}"
                    rm -f /tmp/ssi-8086.log
                else
                    echo -e "   ${YELLOW}⚠️ No SSI server found${NC}"
                fi
                echo ""
                ;;
            0)
                break
                ;;
            *)
                echo -e "\n${RED}❌ Invalid option. Please try again.${NC}\n"
                ;;
        esac
        
        if [ "$editor_choice" != "0" ]; then
            read -p "$(echo -e "${BLUE}Press Enter to continue...${NC}")"
        fi
    done
}

# Function: Display main menu
show_menu() {
    display_header
    echo -e "${BLUE}┌─ Available Tools ──────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}1)${NC}  Knowledge Management    ${CYAN}(Obsidian + Neo4j)${NC}          ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}2)${NC}  Consultancy Dashboard   ${CYAN}(React + Backend)${NC}           ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}3)${NC} ⚙️  Automation Platform     ${CYAN}(n8n + Docker)${NC}            ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}4)${NC}  Development Environment ${CYAN}(VS Code + Terminal)${NC}      ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}5)${NC}  Web Dashboard           ${CYAN}(Local HTTP)${NC}              ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}6)${NC}  Project Explorer        ${CYAN}(File Manager)${NC}            ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}7)${NC}  System Status           ${CYAN}(Health Check)${NC}            ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}8)${NC}  Launch Everything       ${CYAN}(Full Stack)${NC}              ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}9)${NC}  View Documentation      ${CYAN}(This Guide)${NC}              ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}10)${NC} 📥 Ingest Video Analysis ${CYAN}(Original Script)${NC}         ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}11)${NC} 🎨 Visual Content Editors ${CYAN}(JS + SSI Options)${NC}        ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}12)${NC} 🎯 RAG Service Management ${CYAN}(AI Query System)${NC}          ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}0)${NC}  Exit                                              ${BLUE}│${NC}"
    echo -e "${BLUE}└────────────────────────────────────────────────────────────┘${NC}"
}

# Handle command line arguments for direct access
case "$1" in
    "knowledge"|"k") launch_knowledge; exit 0 ;;
    "consultancy"|"c") launch_consultancy_dashboard; exit 0 ;;
    "automation"|"a") launch_automation; exit 0 ;;
    "development"|"d") launch_development; exit 0 ;;
    "dashboard"|"w") launch_dashboard; exit 0 ;;
    "explorer"|"e") launch_project_explorer; exit 0 ;;
    "status"|"s") show_status; exit 0 ;;
    "all") launch_all; exit 0 ;;
    "docs") show_documentation; exit 0 ;;
    "ingest"|"i") ingest_video_analysis; exit 0 ;; # Kept for direct access to original video ingest
    "editors"|"edit"|"e") launch_visual_editors; exit 0 ;; # Visual Content Editors Hub
    "rag"|"r") launch_rag_service; exit 0 ;; # RAG Service Management Hub
    "help"|"--help"|"-h")
        echo "Fae Intelligence Tool Hub"
        echo "Usage: fae-tools [command]"
        echo ""
        echo "Commands:"
        echo "  knowledge, k    - Launch knowledge management"
        echo "  consultancy, c  - Launch consultancy dashboard"
        echo "  automation, a   - Launch automation platform"
        echo "  development, d  - Launch development environment"
        echo "  dashboard, w    - Launch web dashboard"
        echo "  explorer, e     - Launch project explorer"
        echo "  status, s       - Show system status"
        echo "  all             - Launch everything"
        echo "  docs            - View documentation"
        echo "  ingest, i       - Ingest video analysis into knowledge graph (Original Script)"
        echo "  editors, edit, e - Visual Content Editors Hub (JS + SSI options)"
        echo "  rag, r          - RAG Service Management Hub (AI Query System)"
        echo "  help            - Show this help"
        echo ""
        echo "Without arguments: Show interactive menu"
        exit 0
        ;;
esac

# Main interactive menu loop
while true; do
    show_menu
    echo ""
    read -p "$(echo -e "${GREEN}Enter your choice [0-12]: ${NC}")" choice

    case $choice in
        1) launch_knowledge ;;
        2) launch_consultancy_dashboard ;;
        3) launch_automation ;;
        4) launch_development ;;
        5) launch_dashboard ;;
        6) launch_project_explorer ;;
        7) show_status ;;
        8) launch_all ;;
        9) show_documentation ;;
        10) ingest_video_analysis ;; # Kept for direct access to original video ingest
        11) launch_visual_editors ;; # Visual Content Editors Hub
        12) launch_rag_service ;; # RAG Service Management Hub
        0)
            echo -e "\n${CYAN}👋 Thanks for using Fae Intelligence Tool Hub!${NC}\n"
            exit 0
            ;;
        *)
            echo -e "\n${RED}❌ Invalid option. Please try again.${NC}\n"
            ;;
    esac

    echo ""
    read -p "$(echo -e "${BLUE}Press Enter to continue...${NC}")"
done
