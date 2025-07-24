#!/bin/bash

# Fae Intelligence Development Tool Hub
# Version: 1.3 (Restored and Corrected)
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
KNOWLEDGE_VAULT="~/projects/fae-intelligence/fae-intelligence-data"
N8N_URL="http://localhost:5678"
NEO4J_URL="http://localhost:7474"
DASHBOARD_PORT="8080"
PROJECT_DIR="~/projects/fae-intelligence"
DOCS_PATH="~/projects/fae-intelligence/docs/unified-frontend-documentation.md"

# Function to display header
display_header() {
    clear
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}                   ${CYAN}Fae Intelligence Tool Hub${NC}                   ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}              ${YELLOW}Enhanced Host Machine Version${NC}              ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

# Function: Display main menu
show_menu() {
    display_header
    echo -e "${BLUE}┌─ Available Tools ──────────────────────────────────────────┐${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}1)${NC}  Knowledge Management    ${CYAN}(Obsidian + Neo4j)${NC}         ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}2)${NC}  Consultancy Dashboard   ${CYAN}(React + Backend)${NC}         ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}3)${NC} ⚙️  Automation Platform     ${CYAN}(n8n + Docker)${NC}           ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}4)${NC}  Development Environment ${CYAN}(VS Code + Terminal)${NC}      ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}5)${NC}  Web Dashboard           ${CYAN}(Local HTTP)${NC}             ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}6)${NC}  Project Explorer        ${CYAN}(File Manager)${NC}           ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}7)${NC}  System Status           ${CYAN}(Health Check)${NC}           ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}8)${NC}  Launch Everything       ${CYAN}(Full Stack)${NC}             ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}9)${NC}  View Documentation      ${CYAN}(This Guide)${NC}             ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}0)${NC}  Exit                                                ${BLUE}│${NC}"
    echo -e "${BLUE}└────────────────────────────────────────────────────────────┘${NC}"
}

# Function to launch Consultancy Dashboard
launch_consultancy_dashboard() {
    echo -e "\n${YELLOW}🚀 Launching Consultancy Dashboard...${NC}"
    gnome-terminal -- bash -c "/home/rosie/projects/fae-intelligence/start_fae_dashboard.sh; exec bash"
    echo -e "${GREEN}✅ Consultancy Dashboard launched in a new terminal.${NC}"
}

# Function to launch Project Explorer
launch_project_explorer() {
    echo -e "\n${YELLOW}📂 Opening Project Explorer...${NC}"
    xdg-open "${PROJECT_DIR}" > /dev/null 2>&1
    echo -e "${GREEN}✅ Project Explorer opened.${NC}"
}

# Function: Show documentation
show_documentation() {
    if [ -f "${DOCS_PATH}" ]; then
        less -R "${DOCS_PATH}"
    else
        echo -e "  ${RED}❌ Documentation file not found at ${DOCS_PATH}${NC}"
    fi
}

# Function: Launch knowledge management tools
launch_knowledge() {
    echo -e "\n${YELLOW}🧠 Starting Knowledge Management...${NC}"
    eval "${OBSIDIAN_PATH} --no-sandbox" > /dev/null 2>&1 &
    xdg-open "${NEO4J_URL}" > /dev/null 2>&1 &
}

# Function: Launch automation platform
launch_automation() {
    echo -e "\n${YELLOW}⚙️ Starting Automation Platform...${NC}"
    xdg-open "${N8N_URL}" > /dev/null 2>&1 &
}

# Function: Launch development environment
launch_development() {
    echo -e "\n${YELLOW}💻 Starting Development Environment...${NC}"
    code "${PROJECT_DIR}" > /dev/null 2>&1 &
    gnome-terminal --working-directory="${PROJECT_DIR}" > /dev/null 2>&1 &
}

# Function: Launch web dashboard
launch_dashboard() {
    echo -e "\n${YELLOW}🌐 Starting Web Dashboard...${NC}"
    cd ~/fae-dashboard && python3 -m http.server ${DASHBOARD_PORT} > /dev/null 2>&1 &
    xdg-open "http://localhost:${DASHBOARD_PORT}" > /dev/null 2>&1 &
}

# Function: Show system status
show_status() {
    echo -e "\n${YELLOW}📊 System Status Dashboard${NC}"
    # This is a placeholder. The actual advanced status check should be used if available.
    echo "Status check placeholder"
}

# Function: Launch everything
launch_all() {
    echo -e "\n${YELLOW}🚀 Launching Complete Development Stack...${NC}"
    launch_knowledge
    launch_consultancy_dashboard
    launch_automation
    launch_development
    launch_dashboard
}

# Main interactive menu loop
while true; do
    show_menu
    read -p "$(echo -e "${GREEN}Enter your choice [0-9]: ${NC}")" choice

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
        0) echo -e "\n${CYAN}👋 Thanks for using Fae Intelligence Tool Hub!${NC}"; exit 0 ;;
        *) echo -e "\n${RED}❌ Invalid option. Please try again.${NC}" ;;
    esac
    echo ""
    read -p "$(echo -e "${BLUE}Press Enter to continue...${NC}")"
 done
