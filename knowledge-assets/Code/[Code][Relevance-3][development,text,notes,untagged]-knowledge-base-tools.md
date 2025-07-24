# Knowledge Base Tools & Operations

This document provides a centralized guide for managing and interacting with the Fae Intelligence Knowledge Graph.

## 1. Neo4j Database

Neo4j is the graph database powering our knowledge base. It stores all entities and their relationships.

*   **Access Neo4j Browser:** Open your web browser and navigate to `http://localhost:7474`
    *   **Username:** `neo4j`
    *   **Password:** `password`

*   **Basic Cypher Queries:**
    *   **View all nodes and relationships:**
        ```cypher
        MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 100
        ```
    *   **List all document (Source) nodes:**
        ```cypher
        MATCH (s:Source) RETURN s.name AS DocumentName, s.filePath AS FilePath ORDER BY DocumentName
        ```
    *   **List all Tools:**
        ```cypher
        MATCH (t:Tool) RETURN t LIMIT 100
        ```
    *   **List all Solutions:**
        ```cypher
        MATCH (sol:Solution) RETURN sol LIMIT 100
        ```
    *   **List all Client Pain Points:**
        ```cypher
        MATCH (c:ClientPainPoint) RETURN c LIMIT 100
        ```
    *   **List all Security Concerns:**
        ```cypher
        MATCH (s:SecurityConcern) RETURN s LIMIT 100
        ```
    *   **List all Business Challenges:**
        ```cypher
        MATCH (bc:BusinessChallenge) RETURN bc LIMIT 100
        ```
    *   **List all Business Situations:**
        ```cypher
        MATCH (bs:BusinessSituation) RETURN bs LIMIT 100
        ```
    *   **List all Methodologies:**
        ```cypher
        MATCH (m:Methodology) RETURN m LIMIT 100
        ```
    *   **List all Concepts:**
        ```cypher
        MATCH (con:Concept) RETURN con LIMIT 100
        ```
    *   **Entities linked to their Source Documents:**
        ```cypher
        MATCH (s:Source)-[r:CONTAINS]->(e)
        RETURN s.name AS Document, type(r) AS Relationship, labels(e) AS ExtractedEntityType, e.name AS ExtractedEntityName
        LIMIT 100
        ```

*   **Reset Neo4j Database (DANGER ZONE - Deletes ALL data!):**
    ```bash
    docker exec database cypher-shell -u neo4j -p password "MATCH (n) DETACH DELETE n;"
    ```

## 2. Obsidian Integration

Obsidian is used for note-taking and can be integrated with Neo4j for visual exploration of the knowledge graph. Ensure you have the Neo4j plugin installed and configured in Obsidian.

*   **Launch Obsidian:**
    ```bash
    # This command is typically handled by the fae-tools script
    ~/Downloads/Obsidian-1.8.10.AppImage --no-sandbox
    ```

## 3. Knowledge Ingestion Options

This section details how to ingest new data into the knowledge graph.

*   **Phase 1: Triage & Organization (using `triage_and_tag.py`)
    *   **Purpose:** Automatically categorize, tag, and organize raw documents from the staging area.
    *   **Staging Directory:** `/home/rosie/projects/fae-intelligence/knowledge-staging`
    *   **Command:**
        ```bash
        python3 /home/rosie/projects/fae-intelligence/scripts/triage_and_tag.py
        ```

*   **Phase 2: Automated Ingestion & Enrichment (using `ingest_to_neo4j.py`)
    *   **Purpose:** Extract entities and relationships from organized documents and load them into Neo4j.
    *   **Command:**
        ```bash
        python3 /home/rosie/projects/fae-intelligence/scripts/ingest_to_neo4j.py
        ```

## 4. Continuous Maintenance & Curation

This involves ongoing review and refinement of the knowledge graph.

*   **Human-in-the-Loop (HITL) Review:** Regularly review ingested data in Neo4j Browser or Obsidian.
*   **Automated Enrichment Agent:** (Future development) An LLM-powered agent to propose new connections and insights.
