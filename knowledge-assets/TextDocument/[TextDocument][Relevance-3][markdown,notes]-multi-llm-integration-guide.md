# Multi-LLM RAG System Integration Guide

**Source:** `/home/rosie/projects/rag-system-v2/multi-llm-integration-guide.md`

**Target Audience:** LLM systems (Claude, GPT, Gemini, custom AI applications)  
**Integration Method:** Proxy container with full RAG ecosystem access  
**Capabilities:** 100,000+ files, 21+ API endpoints, real-time monitoring  
**Security Level:** Controlled access with documented boundaries  

---

## QUICK START FOR LLM SYSTEMS

### Step 1: Verify Proxy Container Running
Check proxy container status:
```bash
docker ps | grep claude-llm-proxy
```
Expected output: Container showing "Up X minutes/hours"

### Step 2: Test Basic Access
Test RAG system health:
```bash
docker exec claude-llm-proxy curl http://backend:8000/health
```
Expected: {"healthy":true}

Test file system access:
```bash
docker exec claude-llm-proxy ls /projects/rag-system-v2/
```
Expected: Directory listing with RAG system files

Test Python capabilities:
```bash
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy; print(\"Ready\")"
```
Expected: "Ready"

### Step 3: Your LLM is Ready for Integration!
Once the above tests pass, your LLM system has full access to the enterprise RAG ecosystem.

---

## INTEGRATION CAPABILITIES

### File System Access
**Scope:** 100,000+ files across 48+ project directories

**Available Project Types:**
- **QMS System:** 100,448 files (enterprise quality management)
- **D&D Projects:** 83,633 + 19,134 files (gaming systems)  
- **Archive:** 41,724 files (historical data)
- **RAG System:** Core knowledge processing system
- **AI Blog Creator:** Content generation tools
- **Fae Intelligence:** AI analysis systems

**Basic Access Patterns:**
```bash
# List all projects
docker exec claude-llm-proxy ls /projects/

# Access specific project files
docker exec claude-llm-proxy cat /projects/rag-system-v2/docker-compose.yml

# Search across projects
docker exec claude-llm-proxy find /projects -name "*.py" | head -10

# Project analysis
docker exec claude-llm-proxy sh -c "
for dir in /projects/*/; do
  if [ -d \"$dir\" ]; then
    count=$(find \"$dir\" -type f | wc -l)
    echo "$(basename \"$dir\"): $count files"
  fi
done | head -10
"
```

### RAG API Access
**Base URL:** `http://backend:8000`  
**Documentation:** `http://backend:8000/docs` (Swagger UI)  
**API Specification:** `http://backend:8000/openapi.json`

**Core Endpoints (21+ available):**

#### Chat & Interaction
```bash
# Chat with RAG system
docker exec claude-llm-proxy curl -X POST http://backend:8000/chat_bot \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"What can you tell me about AI?\"}"

# Clear chat history
docker exec claude-llm-proxy curl -X POST http://backend:8000/clear_chat_bot
```

#### Knowledge Processing
```bash
# Extract entities and relationships
docker exec claude-llm-proxy curl -X POST http://backend:8000/extract \
  -H "Content-Type: application/json" \
  -d "{\"text\": \"Your knowledge text here\"}"

# Upload documents
docker exec claude-llm-proxy curl -X POST http://backend:8000/upload \
  -H "Content-Type: multipart/form-data" \
  -F "file=@/projects/rag-system-v2/README.md"

# Upload markdown content
docker exec claude-llm-proxy curl -X POST http://backend:8000/upload_markdown \
  -H "Content-Type: application/json" \
  -d "{\"content\": \"# Your markdown content\", \"title\": \"Document Title\"}"
```

#### Graph Operations
```bash
# Query knowledge graph
docker exec claude-llm-proxy curl -X POST http://backend:8000/graph_query \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"MATCH (n) RETURN n LIMIT 10\"}"

# Get graph schema
docker exec claude-llm-proxy curl http://backend:8000/schema

# Visualize schema
docker exec claude-llm-proxy curl http://backend:8000/schema_visualization
```

#### Data Management
```bash
# List data sources
docker exec claude-llm-proxy curl http://backend:8000/sources_list

# Get system metrics
docker exec claude-llm-proxy curl http://backend:8000/metric

# Backend configuration
docker exec claude-llm-proxy curl http://backend:8000/backend_connection_configuration
```

### Python Data Analysis
**Available Libraries:** requests, pandas, numpy, matplotlib, seaborn

**Basic Analysis Pattern:**
```bash
docker exec claude-llm-proxy python3 -c "
import requests
import pandas as pd
import json
import os

# Get RAG system health
response = requests.get(\"http://backend:8000/health\")
print(\"RAG System Status:\", response.json())

# Analyze project structure
projects = []
for item in os.listdir(\"/projects\"):
    path = f\"/projects/{item}\"
    if os.path.isdir(path):
        try:
            file_count = sum(len(files) for _, _, files in os.walk(path))
            projects.append({\"name\": item, \"files\": file_count})
        except:
            pass

df = pd.DataFrame(projects)
print(\"\nTop 10 Projects by File Count:\")
print(df.nlargest(10, \"files\"))
"
```

### Container Management
**Monitor Infrastructure:**
```bash
# Check all containers
docker exec claude-llm-proxy docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Monitor specific containers
docker exec claude-llm-proxy docker stats --no-stream frontend backend database

# Check container logs
docker exec claude-llm-proxy docker logs backend --tail 20

# Inspect container configuration
docker exec claude-llm-proxy docker inspect backend --format="{{.State.Status}}"
```

### Integration with Other Systems

#### n8n Workflow Integration
```bash
# Test n8n connectivity
docker exec claude-llm-proxy curl http://host.docker.internal:5678/healthz

# Send data to n8n webhook (requires active workflow)
docker exec claude-llm-proxy curl -X POST http://host.docker.internal:5678/webhook/your-webhook \
  -H "Content-Type: application/json" \
  -d "{
    \"source\": \"rag_system\",
    \"data\": {\"query\": \"your query\", \"results\": \"your results\"},
    \"timestamp\": \"$(date -Iseconds)\"
  }"
```

#### MCP Server Coordination
```bash
# Test MCP server file coordination
docker exec claude-llm-proxy curl -X POST http://host.docker.internal:5678/webhook/mcp-coordination \
  -H "Content-Type: application/json" \
  -d "{
    \"file_path\": \"/projects/rag-system-v2/README.md\",
    \"operation\": \"analyze\",
    \"timestamp\": \"$(date -Iseconds)\"
  }"
```

---

## ADVANCED USAGE PATTERNS

### Multi-Step Analysis Workflow
```bash
# Complete analysis workflow
docker exec claude-llm-proxy sh -c "
echo \"=== MULTI-STEP RAG ANALYSIS ===\"

# Step 1: Check system health
echo \"Step 1: System Health Check\"
curl -s http://backend:8000/health | jq . 2>/dev/null || curl -s http://backend:8000/health

# Step 2: Analyze available data sources
echo \"Step 2: Data Sources\"
curl -s http://backend:8000/sources_list | jq \"length\" 2>/dev/null || echo \"Sources endpoint available\"

# Step 3: Query knowledge graph
echo \"Step 3: Graph Statistics\"
curl -s -X POST http://backend:8000/graph_query \
  -H \"Content-Type: application/json\" \
  -d \"{\\\"query\\\": \\\"MATCH (n) RETURN count(n) as total_nodes\\\"}\"

# Step 4: File system analysis
echo \"Step 4: File System Scale\"
find /projects -name \"*.py\" 2>/dev/null | wc -l

echo \"=== ANALYSIS COMPLETE ===\"
"
```

### Real-Time Monitoring Dashboard
```bash
# Create monitoring script
docker exec claude-llm-proxy sh -c "cat > /tmp/llm_monitor.sh << \"MONITOR_EOF\"
#!/bin/bash
echo \"=== LLM INTEGRATION MONITORING ===\"
echo \"Timestamp: $(date)\"
echo

# System Health
BACKEND_STATUS=$(curl -s http://backend:8000/health | jq -r '.healthy' 2>/dev/null || echo \"error\")
FRONTEND_STATUS=$(curl -s -o /dev/null -w \"%{http_code}\" http://frontend:8080)
DATABASE_STATUS=$(curl -s -o /dev/null -w \"%{http_code}\" http://database:7474)

echo \"RAG Backend: $BACKEND_STATUS\"
echo \"Frontend: HTTP $FRONTEND_STATUS\"
echo \"Database: HTTP $DATABASE_STATUS\"
echo

# Container Status
echo \"Container Status:\"
docker ps --format \"table {{.Names}}\t{{.Status}}\" | grep -E \"(backend|frontend|database|n8n|mcp)\"
echo

# Resource Usage
echo \"Resource Usage:\"
docker stats --no-stream --format \"table {{.Names}}\t{{.CPUPerc}}\t{{.MemUsage}}\" | head -7
echo
MONITOR_EOF

chmod +x /tmp/llm_monitor.sh
/tmp/llm_monitor.sh
"
```

---

## SECURITY BOUNDARIES

### What Your LLM CAN Access
- **File System:** /projects/** directory (100,000+ files)
- **Network:** RAG system containers (backend, frontend, database)
- **HTTP APIs:** All 21+ RAG API endpoints  
- **Python Libraries:** requests, pandas, numpy, matplotlib, seaborn
- **Container Management:** Read-only Docker operations (ps, logs, inspect, stats)
- **System Monitoring:** Real-time health and performance data

### What Your LLM CANNOT Access
- **System Administration:** No sudo, passwd, or admin commands
- **Host File System:** Limited to /projects/** directory only
- **Network:** No external internet access beyond localhost services
- **Container Modification:** Cannot create, delete, or modify containers
- **Sensitive Data:** No access to system credentials or private keys
- **Host System:** No direct host system access

### Security Best Practices
- All access is logged and auditable
- File access is scoped to project directories only
- Network access is limited to internal services
- No privileged operations allowed
- Container isolation maintained
- Read-only Docker socket access

---

## PERFORMANCE CONSIDERATIONS

### Resource Usage
- **Proxy Container:** ~100-200MB base + analysis workload
- **CPU Impact:** Minimal when idle, scales with analysis complexity
- **Network Impact:** Only during active LLM operations
- **Storage Impact:** Read-only access, no additional storage used

### Optimization Tips
- **Batch Operations:** Group multiple API calls when possible
- **Cache Results:** Store frequently accessed data locally in memory
- **Limit Scope:** Use specific queries rather than broad searches
- **Monitor Usage:** Use the monitoring dashboard to track performance

### Concurrent Access
- Multiple LLM systems can access simultaneously
- Resource usage scales linearly with active LLMs
- Network bandwidth shared across all LLM operations
- Container maintains state across multiple LLM sessions

---

## TROUBLESHOOTING

### Common Issues

#### Proxy Container Not Running
```bash
# Check container status
docker ps -a | grep claude-llm-proxy

# If stopped, restart
docker start claude-llm-proxy

# If missing, redeploy using deployment guide
```

#### RAG System Unreachable
```bash
# Test network connectivity
docker exec claude-llm-proxy ping backend
docker exec claude-llm-proxy curl http://backend:8000/health

# Check RAG system status
docker ps | grep -E "(backend|frontend|database)"

# Check logs
docker exec claude-llm-proxy docker logs backend --tail 10
```

#### Python Libraries Missing
```bash
# Check library availability
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy"

# Reinstall if needed
docker exec claude-llm-proxy pip3 install --break-system-packages requests pandas numpy
```

#### File Access Issues
```bash
# Check mount points
docker exec claude-llm-proxy | grep -A 5 "Mounts"

# Test file access
docker exec claude-llm-proxy ls -la /projects/

# Verify specific project access
docker exec claude-llm-proxy ls -la /projects/rag-system-v2/

# Check permissions
docker exec claude-llm-proxy whoami
```

### Getting Help
- **System Monitoring:** Use /tmp/llm_monitor.sh for real-time status
- **API Documentation:** Access http://backend:8000/docs for interactive API docs
- **Container Logs:** Use docker logs commands for detailed error information
- **Health Checks:** Regular monitoring of all system components

---

## INTEGRATION EXAMPLES

### Example 1: Knowledge Query and Analysis
```bash
# Query RAG system and analyze response
docker exec claude-llm-proxy python3 -c "
import requests, json

try:
    response = requests.post(
        \"http://backend:8000/chat_bot\",
        headers={\"Content-Type\": \"application/json\"},
        json={\"message\": \"Tell me about machine learning\"},
        timeout=10
    )
    
    if response.status_code == 200:
        result = response.json()
        print(\"RAG Response:\", result.get(\"response\", \"No response\"))
        print(\"Sources:\", len(result.get(\"sources\", [])))
    else:
        print(f\"Error: {response.status_code}\")
except Exception as e:
    print(f\"Connection Error: {e}\")
"
```

### Example 2: Cross-System Integration
```bash
# Get RAG data and send to n8n
docker exec claude-llm-proxy sh -c "
# Get system health
HEALTH=$(curl -s http://backend:8000/health)

# Send to n8n workflow (requires active webhook)
curl -X POST http://host.docker.internal:5678/webhook/system-status \
  -H \"Content-Type: application/json\" \
  -d \"{
    \\\"source\\\": \\\"rag_system\\\",
    \\\"health\\\": $HEALTH,
    \\\"timestamp\\\": \\\"$(date -Iseconds)\\\"
  }\" 2>/dev/null && echo \"Data sent to n8n\" || echo \"n8n webhook not configured\"
"
```

### Example 3: File Analysis and Reporting
```bash
# Generate comprehensive system report
docker exec claude-llm-proxy python3 -c "
import os, requests, json, datetime

# Analyze project structure
projects = {}
for item in os.listdir(\"/projects\"):
    path = f\"/projects/{item}\"
    if os.path.isdir(path):
        try:
            file_count = sum(len(files) for _, _, files in os.walk(path))
            projects[item] = file_count
        except:
            projects[item] = 0

# Get RAG system status
try:
    rag_health = requests.get(\"http://backend:8000/health\", timeout=5).json()
except:
    rag_health = {\"healthy\": False}

# Generate report
report = {
    \"timestamp\": datetime.datetime.now().isoformat(),
    \"rag_status\": rag_health,
    \"project_analysis\": projects,
    \"total_projects\": len(projects),
    \"total_files\": sum(projects.values()),
    \"top_projects\": sorted(projects.items(), key=lambda x: x[1], reverse=True)[:5]
}

print(\"=== SYSTEM ANALYSIS REPORT ===\")
print(json.dumps(report, indent=2))
"
```

---

## APPENDIX

### Quick Reference Commands
```bash
# Health & Status
docker exec claude-llm-proxy curl http://backend:8000/health
docker exec claude-llm-proxy docker ps | grep -E "(backend|frontend|database)"

# File Analysis
docker exec claude-llm-proxy find /projects -name "*.py" | wc -l
docker exec claude-llm-proxy ls /projects/ | wc -l

# API Interaction
docker exec claude-llm-proxy curl -X POST http://backend:8000/chat_bot \
  -H "Content-Type: application/json" -d "{\"message\": \"test\"}"

# System Monitoring
docker exec claude-llm-proxy /tmp/llm_monitor.sh 2>/dev/null || echo "Monitor script not found"
```

### Performance Benchmarks
- **Container Startup:** ~60 seconds (including package installation)
- **API Response Time:** <2 seconds for health checks
- **File Search:** ~1 second for 100,000+ files
- **Docker Operations:** <1 second for container status
- **Python Analysis:** Variable based on complexity

---

**Document Version:** 1.0  
**Created:** 2025-07-15  
**Target:** Multi-LLM Integration  
**Compatibility:** Claude, GPT, Gemini, Custom AI Systems  
**Dependencies:** claude-llm-proxy container, RAG system v2, Docker infrastructure
