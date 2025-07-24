#!/bin/bash

# Fae Intelligence Knowledge Ingestion Tools Orchestrator
# Purpose: Provides a unified interface to run various knowledge ingestion scripts.

# Color definitions for UI
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Script paths
TRIAGE_SCRIPT="/home/rosie/projects/fae-intelligence/scripts/triage_and_tag.py"
PARSE_DOCUMENTS_SCRIPT="/home/rosie/projects/fae-intelligence/scripts/parse_documents.py"
INGEST_SCRIPT="/home/rosie/projects/fae-intelligence/scripts/ingest_to_neo4j.py"

# Neo4j configuration (ensure this matches your ingest_to_neo4j.py and docker setup)
NEO4J_USER="neo4j"
NEO4J_PASSWORD="password"
NEO4J_CONTAINER_NAME="database" # As identified from your docker ps output

# Function to display header
display_header() {
    clear
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║${NC}         ${CYAN}Knowledge Ingestion Orchestrator${NC}           ${PURPLE}║${NC}"
    echo -e "${PURPLE}║${NC}           ${YELLOW}Fae Intelligence Project Tools${NC}             ${PURPLE}║${NC}"
    echo -e "${PURPLE}╚════════════════════════════════════════════━━━━━━━━━━━━━━━━━━━╝${NC}"
    echo ""
}

# Function to reset Neo4j Database
reset_neo4j_db() {
    echo -e "\n${YELLOW}⚠️ Clearing Neo4j Database... This will delete ALL data!${NC}"
    read -p "$(echo -e "${RED}Are you sure you want to proceed? (yes/no): ${NC}")" confirm
    if [[ "$confirm" == "yes" ]]; then
        docker exec "${NEO4J_CONTAINER_NAME}" cypher-shell -u "${NEO4J_USER}" -p "${NEO4J_PASSWORD}" "MATCH (n) DETACH DELETE n;"
        echo -e "${GREEN}✅ Neo4j database cleared. ${NC}"
    else
        echo -e "${CYAN}❌ Neo4j database clear cancelled. ${NC}"
    fi
}

# Main menu loop
while true; do
    display_header
    echo -e "${BLUE}┌─ Ingestion Pipeline Steps ─────────────────────────────────┐${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}1)${NC}  Run Triage & Tagging Script (Phase 1)              ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}2)${NC}  Run Document Parsing Script (PDF, JSON, DOCX)      ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}3)${NC}  Run Neo4j Ingestion Script (Phase 2)               ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}4)${NC}  Reset Neo4j Database ${RED}(DANGER ZONE)${NC}           ${BLUE}│${NC}"
    echo -e "${BLUE}│${NC} ${GREEN}0)${NC}  Exit                                               ${BLUE}│${NC}"
    echo -e "${BLUE}└────────────────────────────────────────────────────────────┘${NC}"
    echo ""
    read -p "$(echo -e "${GREEN}Enter your choice [0-4]: ${NC}")" choice

    case $choice in
        1)
            echo -e "\n${YELLOW}Running Triage & Tagging Script...${NC}"
            python3 "${TRIAGE_SCRIPT}"
            ;;
        2)
            echo -e "\n${YELLOW}Running Document Parsing Script...${NC}"
            python3 "${PARSE_DOCUMENTS_SCRIPT}"
            ;;
        3)
            echo -e "\n${YELLOW}Running Neo4j Ingestion Script...${NC}"
            python3 "${INGEST_SCRIPT}"
            ;;
        4) reset_neo4j_db ;;
        0)
            echo -e "\n${CYAN}👋 Exiting Ingestion Orchestrator!${NC}\n"
            exit 0
            ;;
        *)
            echo -e "\n${RED}❌ Invalid option. Please try again. ${NC}\n"
            ;;
    esac

    echo ""
    read -p "$(echo -e "${BLUE}Press Enter to continue...${NC}")"
done
