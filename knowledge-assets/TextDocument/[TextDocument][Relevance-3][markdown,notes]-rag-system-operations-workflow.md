# RAG System Operations Workflow

**Source:** `/home/rosie/projects/_rag-system/rag_work_instructions.md`

## Daily Startup Procedures

### Morning System Startup Checklist
- [ ] Verify Docker Desktop is running
- [ ] Start all RAG system containers
- [ ] Perform system health checks
- [ ] Verify web interface accessibility
- [ ] Check MCP server connectivity

### Step-by-Step Startup Process

#### Start Docker Desktop
```bash
# On Windows/Mac: Launch Docker Desktop application
# On Linux: Start Docker service
sudo systemctl start docker
```

#### Launch RAG System Containers
```bash
# Navigate to your RAG system directory
cd /path/to/rag-system

# Start all services using docker-compose
docker-compose up -d

# Verify all containers are running
docker ps
```

### Expected Running Containers
- Chroma vector database
- Neo4j knowledge graph
- Web interface service
- MCP server
- Any additional processing services

## System Health Checks

### Quick Health Check Commands
```bash
# Check container status
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check Chroma database health
curl -f http://localhost:8000/api/v1/heartbeat

# Check Neo4j connectivity
curl -f http://localhost:7474/browser/

# Check web interface
curl -f http://localhost:3000/health
```

### Health Check Checklist
- [ ] All containers show "Up" status
- [ ] Chroma responds to heartbeat (200 OK)
- [ ] Neo4j browser accessible
- [ ] Web interface loads properly
- [ ] MCP server responds to ping
- [ ] No error logs in container outputs

## Daily Shutdown Procedures

### Evening Shutdown Checklist
- [ ] Complete any running document processing
- [ ] Export daily activity logs
- [ ] Gracefully stop all services
- [ ] Verify clean shutdown

### Step-by-Step Shutdown Process

#### Check for Active Processes
```bash
# Check for running ingestion jobs
docker logs rag-processor

# Wait for completion or safely interrupt
```

#### Graceful Service Shutdown
```bash
# Stop all RAG services
docker-compose down

# Verify all containers stopped
docker ps -a
```

#### Optional: Stop Docker Desktop
Close Docker Desktop application if not needed for other projects

```