#!/bin/bash

# Fae Intelligence Full Knowledge Ingestion Pipeline
# Purpose: Automates the complete process of triaging, tagging, and ingesting documents into Neo4j.

# Color definitions for UI
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

TRIAGE_SCRIPT="/home/rosie/projects/fae-intelligence/scripts/triage_and_tag.py"
INGEST_SCRIPT="/home/rosie/projects/fae-intelligence/scripts/ingest_to_neo4j.py"

echo -e "${CYAN}Starting the full knowledge ingestion pipeline...${NC}"

echo -e "\n${GREEN}Step 1: Running Triage & Tagging Script (Phase 1)...${NC}"
python3 "${TRIAGE_SCRIPT}"

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Triage & Tagging Script failed. Aborting ingestion.${NC}"
    exit 1
fi

echo -e "\n${GREEN}Step 2: Running Neo4j Ingestion Script (Phase 2)...${NC}"
python3 "${INGEST_SCRIPT}"

if [ $? -ne 0 ]; then
    echo -e "${RED}Error: Neo4j Ingestion Script failed. Please check Neo4j connection and script logs.${NC}"
    exit 1
fi

echo -e "\n${CYAN}Full knowledge ingestion pipeline completed successfully!${NC}\n"
