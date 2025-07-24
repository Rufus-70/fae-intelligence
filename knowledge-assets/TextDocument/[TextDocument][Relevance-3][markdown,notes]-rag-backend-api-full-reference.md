# RAG System API Endpoint Documentation

**Source:** `/home/rosie/projects/rag-system-v2/docs/multi-llm-integration/api-endpoint-documentation.md`

**Base URL:** `http://backend:8000`  
**Documentation:** `http://backend:8000/docs` (Interactive Swagger UI)  
**OpenAPI Spec:** `http://backend:8000/openapi.json`  
**Access Method:** Via claude-llm-proxy container for multi-LLM integration  
**Total Endpoints:** 21+ enterprise-grade API endpoints

---

## CORE SYSTEM ENDPOINTS

### `/health` - System Health Check
**Method:** GET  
**Purpose:** Monitor system health and availability  
**Parameters:** None  

**Usage:**
```bash
# Basic health check
docker exec claude-llm-proxy curl http://backend:8000/health

# With error handling
docker exec claude-llm-proxy curl -f http://backend:8000/health || echo "System unhealthy"
```

**Response:**
```json
{
  "healthy": true
}
```

**Use Cases:**
- System monitoring and alerting
- Load balancer health checks
- Integration testing verification
- Automated deployment validation

---

### `/metric` - System Metrics
**Method:** GET  
**Purpose:** Retrieve system performance metrics  
**Parameters:** None  

**Usage:**
```bash
# Get current system metrics
docker exec claude-llm-proxy curl http://backend:8000/metric

# Monitor metrics over time
docker exec claude-llm-proxy sh -c "
for i in {1..5}; do
  echo \"Metrics check \$i:\"
  curl -s http://backend:8000/metric | jq . 2>/dev/null || curl -s http://backend:8000/metric
  sleep 10
done
"
```

**Response Format:**
```json
{
  "timestamp": "2025-07-15T17:00:00Z",
  "system_metrics": {
    "cpu_usage": "15.2%",
    "memory_usage": "710.7MiB",
    "active_connections": 3,
    "response_time_avg": "125ms"
  }
}
```

---

### `/additional_metrics` - Extended Performance Data
**Method:** GET  
**Purpose:** Detailed system performance and usage statistics  
**Parameters:** None  

**Usage:**
```bash
# Get extended metrics
docker exec claude-llm-proxy curl http://backend:8000/additional_metrics

# Performance analysis
docker exec claude-llm-proxy python3 -c "
import requests, json
try:
    response = requests.get(\"http://backend:8000/additional_metrics\")
    metrics = response.json()
    print(\"Extended Metrics Analysis:\")
    print(json.dumps(metrics, indent=2))
except Exception as e:
    print(f\"Error: {e}\")
"
```

---

### `/backend_connection_configuration` - Configuration Status
**Method:** GET  
**Purpose:** Retrieve backend connection and configuration information  
**Parameters:** None  

**Usage:**
```bash
# Check backend configuration
docker exec claude-llm-proxy curl http://backend:8000/backend_connection_configuration

# Validate configuration settings
docker exec claude-llm-proxy curl -s http://backend:8000/backend_connection_configuration | jq ".connections" 2>/dev/null || echo "Configuration retrieved"
```

---

## CHAT & INTERACTION ENDPOINTS

### `/chat_bot` - Interactive Chat Interface
**Method:** POST  
**Purpose:** Interactive conversation with the RAG system  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "message": "string",      // Required: User message/query
  "context": "string",      // Optional: Additional context
  "max_results": number,    // Optional: Maximum results to return
  "temperature": number     // Optional: Response creativity (0.0-1.0)
}
```

**Usage:**
```bash
# Basic chat interaction
docker exec claude-llm-proxy curl -X POST http://backend:8000/chat_bot \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"What can you tell me about artificial intelligence?\",
    \"max_results\": 5
  }"

# Complex query with context
docker exec claude-llm-proxy curl -X POST http://backend:8000/chat_bot \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"Explain machine learning algorithms\",
    \"context\": \"Focus on practical applications in business\",
    \"max_results\": 10,
    \"temperature\": 0.7
  }"

# Python integration example
docker exec claude-llm-proxy python3 -c "
import requests, json

query = {
    \"message\": \"Tell me about knowledge graphs\",
    \"max_results\": 3
}

try:
    response = requests.post(
        \"http://backend:8000/chat_bot\",
        headers={\"Content-Type\": \"application/json\"},
        json=query,
        timeout=30
    )

    if response.status_code == 200:
        result = response.json()
        print(\"RAG Response:\", result.get(\"response\", \"No response\"))
        print(\"Sources:\", result.get(\"sources\", []))
    else:
        print(f\"Error: {response.status_code}\")
except Exception as e:
    print(f\"Error: {e}\")
"
```

**Response Format:**
```json
{
  "response": "Artificial Intelligence (AI) refers to...",
  "sources": [
    {
      "document": "ai_overview.pdf",
      "relevance_score": 0.95,
      "chunk_id": "chunk_123"
    }
  ],
  "confidence": 0.87,
  "processing_time": "0.45s"
}
```

---

### `/clear_chat_bot` - Reset Chat History
**Method:** POST  
**Purpose:** Clear chat history and reset conversation context  
**Parameters:** None  

**Usage:**
```bash
# Clear chat history
docker exec claude-llm-proxy curl -X POST http://backend:8000/clear_chat_bot

# Reset and start new conversation
docker exec claude-llm-proxy sh -c "
curl -X POST http://backend:8000/clear_chat_bot
echo \"Chat history cleared\"
curl -X POST http://backend:8000/chat_bot \
  -H \"Content-Type: application/json\" \
  -d \"{\\\"message\\\": \\\"Hello, starting fresh conversation\\\"}\"
"
```

---

## KNOWLEDGE PROCESSING ENDPOINTS

### `/extract` - Entity and Relationship Extraction
**Method:** POST  
**Purpose:** Extract entities and relationships from text  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "text": "string",           // Required: Text to process
  "extract_entities": bool, // Optional: Enable entity extraction
  "extract_relations": bool,// Optional: Enable relationship extraction
  "model": "string"         // Optional: Specify extraction model
}
```

**Usage:**
```bash
# Basic entity extraction
docker exec claude-llm-proxy curl -X POST http://backend:8000/extract \
  -H "Content-Type: application/json" \
  -d "{
    \"text\": \"Apple Inc. was founded by Steve Jobs in Cupertino, California in 1976.\",
    \"extract_entities\": true,
    \"extract_relations\": true
  }"

# Large text processing
docker exec claude-llm-proxy python3 -c "
import requests

# Read a document and extract entities
try:
    with open(\"/projects/rag-system-v2/README.md\", \"r\") as f:
        content = f.read()[:2000]  # First 2000 characters

    response = requests.post(
        \"http://backend:8000/extract\",
        json={
            \"text\": content,
            \"extract_entities\": True,
            \"extract_relations\": True
        },
        timeout=30
    )

    if response.status_code == 200:
        result = response.json()
        print(\"Entities found:\", len(result.get(\"entities\", [])))
        print(\"Relations found:\", len(result.get(\"relations\", [])))
    else:
        print(f\"Error: {response.status_code}\")
except Exception as e:
    print(f\"Error: {e}\")
"
```

**Response Format:**
```json
{
  "entities": [
    {
      "text": "Apple Inc.",
      "type": "ORGANIZATION",
      "confidence": 0.99,
      "start": 0,
      "end": 10
    },
    {
      "text": "Steve Jobs",
      "type": "PERSON",
      "confidence": 0.95,
      "start": 25,
      "end": 35
    }
  ],
  "relations": [
    {
      "subject": "Apple Inc.",
      "predicate": "founded_by",
      "object": "Steve Jobs",
      "confidence": 0.92
    }
  ],
  "processing_time": "1.2s"
}
```

---

### `/upload` - File Upload Interface
**Method:** POST  
**Purpose:** Upload documents for processing and indexing  
**Content-Type:** multipart/form-data  

**Parameters:**
- `file`: File to upload (PDF, TXT, DOCX, etc.)
- `metadata`: Optional JSON metadata
- `process_immediately`: Boolean flag for immediate processing

**Usage:**
```bash
# Upload a document
docker exec claude-llm-proxy curl -X POST http://backend:8000/upload \
  -F "file=@/projects/rag-system-v2/README.md" \
  -F "metadata={\"source\": \"documentation\", \"category\": \"technical\"}"

# Upload with immediate processing
docker exec claude-llm-proxy curl -X POST http://backend:8000/upload \
  -F "file=@/projects/rag-system-v2/docker-compose.yml" \
  -F "process_immediately=true"

# Batch upload multiple files
docker exec claude-llm-proxy sh -c "
for file in /projects/rag-system-v2/*.md; do
  echo \"Uploading \$file\"
  curl -X POST http://backend:8000/upload \
    -F \"file=@\$file\" \
    -F \"metadata={\\\"batch\\\": \\\"documentation_upload\\\"}\"
  sleep 2
done
"
```

**Response Format:**
```json
{
  "file_id": "doc_abc123",
  "filename": "README.md",
  "size": 24108,
  "status": "uploaded",
  "processing_status": "queued",
  "estimated_processing_time": "2-5 minutes"
}
```

---

### `/upload_markdown` - Markdown Content Upload
**Method:** POST  
**Purpose:** Upload markdown content directly as text  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "content": "string",     // Required: Markdown content
  "title": "string",      // Required: Document title
  "metadata": object,     // Optional: Additional metadata
  "tags": ["string"]      // Optional: Document tags
}
```

**Usage:**
```bash
# Upload markdown content
docker exec claude-llm-proxy curl -X POST http://backend:8000/upload_markdown \
  -H "Content-Type: application/json" \
  -d "{
    \"content\": \"# AI Documentation\\n\\nThis document explains...\",
    \"title\": \"AI Fundamentals\",
    \"metadata\": {\"author\": \"AI System\", \"category\": \"education\"},
    \"tags\": [\"ai\", \"documentation\", \"fundamentals\"]
  }"

# Dynamic content upload
docker exec claude-llm-proxy python3 -c "
import requests, json, datetime

# Generate dynamic content
content = f\"\"\
# System Status Report
Generated: {datetime.datetime.now().isoformat()}

## Current Status
- System: Operational
- Containers: Running
- API: Accessible

## Metrics
- Response Time: <2s
- Memory Usage: Optimized
\"\"\"

try:
    response = requests.post(
        \"http://backend:8000/upload_markdown\",
        json={
            \"content\": content,
            \"title\": f\"Status Report {datetime.datetime.now().strftime(\"%Y%m%d_%H%M\")}\",
            \"metadata\": {\"type\": \"automated_report\", \"generator\": \"monitoring_system\"},
            \"tags\": [\"status\", \"automated\", \"system\"]
        },
        timeout=30
    )

    print(\"Upload status:\", response.status_code)
    if response.status_code == 200:
        print(\"Response:\", response.json())
    else:
        print(\"Upload failed\")
except Exception as e:
    print(f\"Error: {e}\")
"
```

---

## GRAPH DATABASE ENDPOINTS

### `/graph_query` - Direct Graph Database Queries
**Method:** POST  
**Purpose:** Execute Cypher queries against the knowledge graph  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "query": "string",        // Required: Cypher query
  "parameters": object,     // Optional: Query parameters
  "limit": number,          // Optional: Result limit
  "format": "string"        // Optional: Response format (json, csv)
}
```

**Usage:**
```bash
# Basic graph query
docker exec claude-llm-proxy curl -X POST http://backend:8000/graph_query \
  -H "Content-Type: application/json" \
  -d "{
    \"query\": \"MATCH (n) RETURN count(n) as total_nodes\",
    \"limit\": 1
  }"

# Complex relationship query
docker exec claude-llm-proxy curl -X POST http://backend:8000/graph_query \
  -H "Content-Type: application/json" \
  -d "{
    \"query\": \"MATCH (a)-[r]->(b) RETURN type(r) as relationship_type, count(r) as count ORDER BY count DESC\",
    \"limit\": 10
  }"

# Parameterized query
docker exec claude-llm-proxy curl -X POST http://backend:8000/graph_query \
  -H "Content-Type: application/json" \
  -d "{
    \"query\": \"MATCH (n) WHERE n.name CONTAINS \\$search_term RETURN n LIMIT \\$limit\",
    \"parameters\": {\"search_term\": \"artificial\", \"limit\": 5}
  }"

# Python analysis example
docker exec claude-llm-proxy python3 -c "
import requests, json

# Analyze graph structure
queries = [
    \"MATCH (n) RETURN count(n) as nodes\",
    \"MATCH ()-[r]->() RETURN count(r) as relationships\",
    \"MATCH (n) RETURN labels(n) as labels, count(n) as count ORDER BY count DESC LIMIT 5\"
]

print(\"=== GRAPH ANALYSIS ===\")
for query in queries:
    try:
        response = requests.post(
            \"http://backend:8000/graph_query\",
            json={\"query\": query},
            timeout=15
        )
        if response.status_code == 200:
            result = response.json()
            print(f\"Query: {query}\")
            print(f\"Result: {json.dumps(result, indent=2)}\")
            print(\"-\" * 50)
    except Exception as e:
        print(f\"Query failed: {e}\")
"
```

**Response Format:**
```json
{
  "results": [
    {
      "total_nodes": 15847
    }
  ],
  "execution_time": "0.15s",
  "query_type": "read",
  "columns": ["total_nodes"]
}
```

---

### `/schema` - Graph Schema Information
**Method:** GET  
**Purpose:** Retrieve graph database schema and structure  
**Parameters:** None  

**Usage:**
```bash
# Get graph schema
docker exec claude-llm-proxy curl http://backend:8000/schema

# Analyze schema structure
docker exec claude-llm-proxy curl -s http://backend:8000/schema | jq .node_types 2>/dev/null || echo "Schema retrieved"

# Schema-based queries
docker exec claude-llm-proxy python3 -c "
import requests, json

try:
    # Get schema information
    response = requests.get(\"http://backend:8000/schema\", timeout=10)
    if response.status_code == 200:
        schema = response.json()
        print(\"Available Node Types:\")
        for node_type in schema.get(\"node_types\", []):
            print(f\"  - {node_type}\")
        
        print(\"Available Relationship Types:\")
        for rel_type in schema.get(\"relationship_types\", []):
            print(f\"  - {rel_type}\")
    else:
        print(f\"Error: {response.status_code}\")
except Exception as e:
    print(f\"Error: {e}\")
"
```

---

### `/schema_visualization` - Visual Schema Representation
**Method:** GET  
**Purpose:** Generate visual representation of graph schema  
**Parameters:** None  

**Usage:**
```bash
# Get schema visualization
docker exec claude-llm-proxy curl http://backend:8000/schema_visualization

# Save visualization data
docker exec claude-llm-proxy curl -s http://backend:8000/schema_visualization > /tmp/schema_viz.json 2>/dev/null || echo "Visualization data retrieved"
```

---

### `/populate_graph_schema` - Initialize Graph Schema
**Method:** POST  
**Purpose:** Initialize or update graph database schema  
**Content-Type:** application/json  

**Usage:**
```bash
# Initialize graph schema
docker exec claude-llm-proxy curl -X POST http://backend:8000/populate_graph_schema \
  -H "Content-Type: application/json"

# Schema initialization with options
docker exec claude-llm-proxy curl -X POST http://backend:8000/populate_graph_schema \
  -H "Content-Type: application/json" \
  -d "{
    \"force_refresh\": true,
    \"create_indexes\": true
  }"
```

---

## DATA MANAGEMENT ENDPOINTS

### `/sources_list` - Available Data Sources
**Method:** GET  
**Purpose:** List all available data sources and their status  
**Parameters:** None  

**Usage:**
```bash
# List all sources
docker exec claude-llm-proxy curl http://backend:8000/sources_list

# Analyze sources
docker exec claude-llm-proxy python3 -c "
import requests, json

try:
    response = requests.get(\"http://backend:8000/sources_list\", timeout=10)
    if response.status_code == 200:
        sources = response.json()
        print(f\"Total Sources: {len(sources)}\")
        
        # Group by type
        by_type = {}
        for source in sources:
            source_type = source.get(\"type\", \"unknown\")
            by_type[source_type] = by_type.get(source_type, 0) + 1
        
        print(\"Sources by Type:\")
        for source_type, count in sorted(by_type.items()):
            print(f\"  {source_type}: {count}\")
    else:
        print(f\"Error: {response.status_code}\")
except Exception as e:
    print(f\"Error: {e}\")
"
```

**Response Format:**
```json
{
  "sources": [
    {
      "id": "source_001",
      "name": "Technical Documentation",
      "type": "markdown",
      "status": "processed",
      "last_updated": "2025-07-15T10:30:00Z",
      "document_count": 45
    }
  ],
  "total_sources": 12,
  "last_refresh": "2025-07-15T17:00:00Z"
}
```

---

### `/chunk_entities` - Entity Information from Chunks
**Method:** POST  
**Purpose:** Retrieve entity information from specific text chunks  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "chunk_id": "string",    // Required: Chunk identifier
  "include_relations": bool // Optional: Include relationship data
}
```

**Usage:**
```bash
# Get entities from a specific chunk
docker exec claude-llm-proxy curl -X POST http://backend:8000/chunk_entities \
  -H "Content-Type: application/json" \
  -d "{
    \"chunk_id\": \"chunk_123\",
    \"include_relations\": true
  }"
```

---

### `/fetch_chunktext` - Retrieve Chunk Content
**Method:** POST  
**Purpose:** Fetch the actual text content of chunks  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "chunk_ids": ["string"], // Required: List of chunk IDs
  "include_metadata": bool  // Optional: Include chunk metadata
}
```

**Usage:**
```bash
# Fetch multiple chunks
docker exec claude-llm-proxy curl -X POST http://backend:8000/fetch_chunktext \
  -H "Content-Type: application/json" \
  -d "{
    \"chunk_ids\": [\"chunk_001\", \"chunk_002\", \"chunk_003\"],
    \"include_metadata\": true
  }"
```

---

### `/delete_document_and_entities` - Document Cleanup
**Method:** DELETE  
**Purpose:** Remove documents and associated entities from the system  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "document_id": "string",     // Required: Document identifier
  "cascade_delete": bool,      // Optional: Delete related entities
  "confirm_deletion": bool     // Required: Confirmation flag
}
```

**Usage:**
```bash
# Delete a document and its entities
docker exec claude-llm-proxy curl -X DELETE http://backend:8000/delete_document_and_entities \
  -H "Content-Type: application/json" \
  -d "{
    \"document_id\": \"doc_abc123\",
    \"cascade_delete\": true,
    \"confirm_deletion\": true
  }"
```

---

## GRAPH MAINTENANCE ENDPOINTS

### `/get_duplicate_nodes` - Find Duplicate Entities
**Method:** GET  
**Purpose:** Identify duplicate nodes in the knowledge graph  
**Parameters:** Query parameters for filtering  

**Usage:**
```bash
# Find all duplicate nodes
docker exec claude-llm-proxy curl "http://backend:8000/get_duplicate_nodes"

# Find duplicates with similarity threshold
docker exec claude-llm-proxy curl "http://backend:8000/get_duplicate_nodes?similarity_threshold=0.8"

# Analysis of duplicates
docker exec claude-llm-proxy python3 -c "
import requests

try:
    response = requests.get(\"http://backend:8000/get_duplicate_nodes\", timeout=15)
    if response.status_code == 200:
        duplicates = response.json()
        print(f\"Found {len(duplicates)} duplicate groups\")
        for group in duplicates[:5]:  # Show first 5
            print(f\"Group: {group.get(\"representative\", \"unknown\")} ({len(group.get(\"duplicates\", []))} duplicates)\")
    else:
        print(f\"Error: {response.status_code}\")
except Exception as e:
    print(f\"Error: {e}\")
"
```

---

### `/merge_duplicate_nodes` - Merge Duplicate Entities
**Method:** POST  
**Purpose:** Merge identified duplicate nodes  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "node_ids": ["string"],      // Required: Nodes to merge
  "target_node_id": "string",  // Optional: Target node for merge
  "merge_strategy": "string"   // Optional: Merge strategy
}
```

**Usage:**
```bash
# Merge specific duplicate nodes
docker exec claude-llm-proxy curl -X POST http://backend:8000/merge_duplicate_nodes \
  -H "Content-Type: application/json" \
  -d "{
    \"node_ids\": [\"node_001\", \"node_002\", \"node_003\"],
    \"target_node_id\": \"node_001\",
    \"merge_strategy\": \"combine_properties\"
  }"
```

---

### `/get_unconnected_nodes_list` - Find Orphaned Nodes
**Method:** GET  
**Purpose:** Identify nodes with no relationships  
**Parameters:** None  

**Usage:**
```bash
# Find orphaned nodes
docker exec claude-llm-proxy curl http://backend:8000/get_unconnected_nodes_list

# Analyze unconnected nodes
docker exec claude-llm-proxy python3 -c "
import requests

try:
    response = requests.get(\"http://backend:8000/get_unconnected_nodes_list\", timeout=15)
    if response.status_code == 200:
        orphans = response.json()
        print(f\"Unconnected nodes: {len(orphans)}\")
        
        # Group by type
        by_type = {}
        for node in orphans:
            node_type = node.get(\"type\", \"unknown\")
            by_type[node_type] = by_type.get(node_type, 0) + 1
        
        print(\"Orphans by type:\")
        for node_type, count in sorted(by_type.items()):
            print(f\"  {node_type}: {count}\")
    else:
        print(f\"Error: {response.status_code}\")
except Exception as e:
    print(f\"Error: {e}\")
"
```

---

### `/delete_unconnected_nodes` - Remove Orphaned Nodes
**Method:** DELETE  
**Purpose:** Remove nodes that have no relationships  
**Content-Type:** application/json  

**Usage:**
```bash
# Delete all unconnected nodes
docker exec claude-llm-proxy curl -X DELETE http://backend:8000/delete_unconnected_nodes \
  -H "Content-Type: application/json" \
  -d "{\"confirm_deletion\": true}"
```

---

### `/get_neighbours` - Find Node Relationships
**Method:** POST  
**Purpose:** Get neighboring nodes and relationships  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "node_id": "string",     // Required: Node identifier
  "max_depth": number,     // Optional: Maximum relationship depth
  "relationship_types": ["string"] // Optional: Filter by relationship types
}
```

**Usage:**
```bash
# Get node neighbors
docker exec claude-llm-proxy curl -X POST http://backend:8000/get_neighbours \
  -H "Content-Type: application/json" \
  -d "{
    \"node_id\": \"node_123\",
    \"max_depth\": 2,
    \"relationship_types\": [\"RELATED_TO\", \"PART_OF\"]
  }"
```

---

## VECTOR OPERATIONS

### `/drop_create_vector_index` - Vector Index Management
**Method:** POST  
**Purpose:** Manage vector indexes for similarity search  
**Content-Type:** application/json  

**Usage:**
```bash
# Recreate vector indexes
docker exec claude-llm-proxy curl -X POST http://backend:8000/drop_create_vector_index \
  -H "Content-Type: application/json" \
  -d "{
    \"force_recreate\": true,
    \"index_type\": \"embedding\"
  }"
```

---

## PROCESSING & STATUS ENDPOINTS

### `/document_status/{file_name}` - Document Processing Status
**Method:** GET  
**Purpose:** Check processing status of uploaded documents  
**Parameters:** file_name in URL path  

**Usage:**
```bash
# Check document status
docker exec claude-llm-proxy curl "http://backend:8000/document_status/README.md"

# Monitor processing progress
docker exec claude-llm-proxy sh -c "
filename=\"README.md\"
while true; do
  status=\$(curl -s \"http://backend:8000/document_status/\$filename\" | jq -r \".status\" 2>/dev/null || echo \"unknown\")
  echo \"Status: \$status\"
  if [ \"\$status\" = \"completed\" ] || [ \"\$status\" = \"failed\" ]; then
    break
  fi
  sleep 5
done
"
```

---

### `/update_extract_status/{file_name}` - Update Processing Status
**Method:** POST  
**Purpose:** Update the extraction status of a document  
**Content-Type:** application/json  

**Usage:**
```bash
# Update document status
docker exec claude-llm-proxy curl -X POST "http://backend:8000/update_extract_status/README.md" \
  -H "Content-Type: application/json" \
  -d "{
    \"status\": \"processing\",
    \"progress\": 75,
    \"message\": \"Extracting entities...\"
  }"
```

---

### `/post_processing` - Post-Processing Operations
**Method:** POST  
**Purpose:** Trigger post-processing operations on documents  
**Content-Type:** application/json  

**Usage:**
```bash
# Trigger post-processing
docker exec claude-llm-proxy curl -X POST http://backend:8000/post_processing \
  -H "Content-Type: application/json" \
  -d "{
    \"operation\": \"entity_linking\",
    \"target\": \"all_documents\"
  }"
```

---

### `/retry_processing` - Retry Failed Processing
**Method:** POST  
**Purpose:** Retry processing for failed documents  
**Content-Type:** application/json  

**Usage:**
```bash
# Retry failed processing
docker exec claude-llm-proxy curl -X POST http://backend:8000/retry_processing \
  -H "Content-Type: application/json" \
  -d "{
    \"document_ids\": [\"doc_001\", \"doc_002\"],
    \"reset_status\": true
  }"
```

---

### `/cancelled_job` - Job Cancellation
**Method:** POST  
**Purpose:** Cancel running processing jobs  
**Content-Type:** application/json  

**Usage:**
```bash
# Cancel specific job
docker exec claude-llm-proxy curl -X POST http://backend:8000/cancelled_job \
  -H "Content-Type: application/json" \
  -d "{
    \"job_id\": \"job_123\",
    \"reason\": \"user_requested\"
  }"
```

---

## EXTERNAL CONTENT

### `/url/scan` - URL Content Analysis
**Method:** POST  
**Purpose:** Analyze and extract content from URLs  
**Content-Type:** application/json  

**Parameters:**
```json
{
  "url": "string",           // Required: URL to analyze
  "extract_text": bool,      // Optional: Extract text content
  "follow_links": bool,      // Optional: Follow internal links
  "max_depth": number        // Optional: Maximum crawl depth
}
```

**Usage:**
```bash
# Analyze URL content
docker exec claude-llm-proxy curl -X POST http://backend:8000/url/scan \
  -H "Content-Type: application/json" \
  -d "{
    \"url\": \"https://example.com/article\",
    \"extract_text\": true,
    \"follow_links\": false
  }"

# Batch URL analysis
docker exec claude-llm-proxy python3 -c "
import requests

urls = [
    \"https://docs.python.org/3/\",
    \"https://pandas.pydata.org/docs/\",
    \"https://numpy.org/doc/\"
]

for url in urls:
    try:
        response = requests.post(
            \"http://backend:8000/url/scan\",
            json={
                \"url\": url,
                \"extract_text\": True,
                \"follow_links\": False
            },
            timeout=30
        )
        print(f\"URL: {url}\")
        print(f\"Status: {response.status_code}\")
        if response.status_code == 200:
            result = response.json()
            print(f\"Content length: {len(result.get(\"content\", \"\"))}\")
        print(\"-\" * 50)
    except Exception as e:
        print(f\"Error for {url}: {e}\")
"
```

---

### `/connect` - External System Connections
**Method:** POST  
**Purpose:** Establish connections to external systems  
**Content-Type:** application/json  

**Usage:**
```bash
# Connect to external system
docker exec claude-llm-proxy curl -X POST http://backend:8000/connect \
  -H "Content-Type: application/json" \
  -d "{
    \"system_type\": \"database\",
    \"connection_string\": \"neo4j://localhost:7687\",
    \"credentials\": {\"username\": \"neo4j\", \"password\": \"password\"}
  }"
```

---

## USAGE PATTERNS & INTEGRATION EXAMPLES

### Complete Document Processing Workflow
```bash
# Multi-step document processing
docker exec claude-llm-proxy sh -c "
echo \"=== COMPLETE DOCUMENT WORKFLOW ===\"

# 1. Upload document
echo \"Step 1: Uploading document...\"
UPLOAD_RESULT=\$(curl -s -X POST http://backend:8000/upload \
  -F \"file=@/projects/rag-system-v2/README.md\")
DOC_ID=\$(echo \$UPLOAD_RESULT | jq -r \".file_id\" 2>/dev/null || echo \"uploaded\")
echo \"Document ID: \$DOC_ID\"

# 2. Check processing status
echo \"Step 2: Checking status...\"
sleep 5
STATUS=\$(curl -s \"http://backend:8000/document_status/README.md\" | jq -r \".status\" 2>/dev/null || echo \"processing\")
echo \"Status: \$STATUS\"

# 3. Extract entities
echo \"Step 3: Extracting entities...\"
curl -s -X POST http://backend:8000/extract \
  -H \"Content-Type: application/json\" \
  -d \"{\\\"text\\\": \\\"Sample text for entity extraction\\\"}\" | jq . 2>/dev/null || echo \"Entities extracted\"

# 4. Query the processed content
echo \"Step 4: Querying content...\"
RESPONSE=\$(curl -s -X POST http://backend:8000/chat_bot \
  -H \"Content-Type: application/json\" \
  -d \"{\\\"message\\\": \\\"Tell me about the RAG system\\\"}\")
echo \"Response received: \$(echo \$RESPONSE | jq -r \".response\" 2>/dev/null || echo \"Query successful\")\"

echo \"=== WORKFLOW COMPLETE ===\"
"
```

### System Health Monitoring
```bash
# Comprehensive system monitoring
docker exec claude-llm-proxy python3 -c "
import requests, json, time

def monitor_system():
    endpoints = [
        (\"health\", \"http://backend:8000/health\"),
        (\"metrics\", \"http://backend:8000/metric\"),
        (\"sources\", \"http://backend:8000/sources_list\"),
        (\"schema\", \"http://backend:8000/schema\")
    ]
    
    print(\"=== SYSTEM MONITORING ===\")
    print(f\"Timestamp: {time.strftime(\"%Y-%m-%d %H:%M:%S\")}\")
    print()
    
    for name, url in endpoints:
        try:
            response = requests.get(url, timeout=5)
            status = \"✅ OK\" if response.status_code == 200 else f\"❌ {response.status_code}\"
            response_time = response.elapsed.total_seconds()
            print(f\"{name}: {status} ({response_time:.3f}s)\")
        except Exception as e:
            print(f\"{name}: ❌ ERROR - {str(e)}\")
    
    print()
    print(\"=== MONITORING COMPLETE ===\")

monitor_system()
"
```

### Graph Analysis and Maintenance
```bash
# Complete graph maintenance workflow
docker exec claude-llm-proxy python3 -c "
import requests, json

def graph_maintenance():
    print(\"=== GRAPH MAINTENANCE WORKFLOW ===\")
    
    # 1. Get graph statistics
    stats_query = \"MATCH (n) RETURN count(n) as nodes\"
    try:
        response = requests.post(
            \"http://backend:8000/graph_query\",
            json={\"query\": stats_query},
            timeout=15
        )
        if response.status_code == 200:
            nodes = response.json()[\"results\"][0][\"nodes\"]
            print(f\"Total nodes: {nodes}\")
    except Exception as e:
        print(f\"Graph query error: {e}\")
    
    # 2. Find duplicates
    try:
        response = requests.get(\"http://backend:8000/get_duplicate_nodes\", timeout=15)
        if response.status_code == 200:
            duplicates = response.json()
            print(f\"Duplicate groups: {len(duplicates)}\")
    except Exception as e:
        print(f\"Duplicates check error: {e}\")
    
    # 3. Find orphaned nodes
    try:
        response = requests.get(\"http://backend:8000/get_unconnected_nodes_list\", timeout=15)
        if response.status_code == 200:
            orphans = response.json()
            print(f\"Orphaned nodes: {len(orphans)}\")
    except Exception as e:
        print(f\"Orphans check error: {e}\")
    
    # 4. Get schema info
    try:
        response = requests.get(\"http://backend:8000/schema\", timeout=10)
        if response.status_code == 200:
            schema = response.json()
            print(f\"Node types: {len(schema.get(\"node_types\", []))}\")
            print(f\"Relationship types: {len(schema.get(\"relationship_types\", []))}\")
    except Exception as e:
        print(f\"Schema check error: {e}\")
    
    print(\"=== MAINTENANCE COMPLETE ===\")

graph_maintenance()
"
```

---

## ERROR HANDLING & BEST PRACTICES

### Standard Error Responses
```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Missing required parameter \"message\"",
    "details": "The \"message\" field is required for chat_bot requests"
  },
  "status_code": 400,
  "timestamp": "2025-07-15T17:00:00Z"
}
```

### Best Practices

1. **Always Check Response Status:**
```bash
response=$(docker exec claude-llm-proxy curl -s -w "%{\http_code}" http://backend:8000/health)
http_code="${response: -3}"
if [ "$http_code" = "200" ]; then
    echo "Success"
else
    echo "Error: HTTP $http_code"
fi
```

2. **Use Timeouts for Long Operations:**
```bash
# Set timeout for potentially long operations
docker exec claude-llm-proxy curl --max-time 30 -X POST http://backend:8000/extract \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"large text content...\"}"
```

3. **Implement Retry Logic:**
```bash
# Retry with exponential backoff
for i in {1..3}; do
    if docker exec claude-llm-proxy curl -f http://backend:8000/health; then
        break
    else
        echo "Attempt $i failed, retrying in $((i*2)) seconds..."
        sleep $((i*2))
    fi
done
```

4. **Monitor Rate Limits:**
```bash
# Check system load before making requests
load=$(docker exec claude-llm-proxy curl -s http://backend:8000/metric | jq -r ".cpu_usage" 2>/dev/null || echo "unknown")
if [[ "${load%.*}" -gt 80 ]] 2>/dev/null; then
    echo "System under high load, waiting..."
    sleep 5
fi
```

---

## APPENDIX

### Quick Reference Command Summary
```bash
# Health & Status
curl http://backend:8000/health
curl http://backend:8000/metric
curl http://backend:8000/sources_list

# Chat & Interaction
curl -X POST http://backend:8000/chat_bot -H "Content-Type: application/json" -d "{\"message\": \"query\"}"
curl -X POST http://backend:8000/clear_chat_bot

# Document Processing
curl -X POST http://backend:8000/upload -F "file=@filename"
curl -X POST http://backend:8000/extract -H "Content-Type: application/json" -d "{\"text\": \"content\"}"

# Graph Operations
curl -X POST http://backend:8000/graph_query -H "Content-Type: application/json" -d "{\"query\": \"MATCH (n) RETURN n LIMIT 10\"}"
curl http://backend:8000/schema

# Maintenance
curl http://backend:8000/get_duplicate_nodes
curl http://backend:8000/get_unconnected_nodes_list
```

### Performance Considerations
- **Concurrent Requests:** System handles multiple simultaneous requests
- **Large Files:** Use streaming for files >10MB
- **Complex Queries:** Graph queries may take longer, use appropriate timeouts
- **Batch Operations:** Group multiple operations when possible

### Security Notes
- All API access is through the secure proxy container
- No authentication required for internal network access
- File uploads are scoped to allowed directories
- Graph queries have built-in safety limits

---

**Document Version:** 1.0  
**Created:** 2025-07-15  
**Target:** Multi-LLM Integration  
**Compatibility:** Claude, GPT, Gemini, Custom AI Systems  
**Dependencies:** claude-llm-proxy container, RAG system v2, Docker infrastructure
