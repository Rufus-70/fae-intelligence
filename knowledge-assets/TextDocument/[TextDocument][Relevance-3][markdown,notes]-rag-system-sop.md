RAG System Standard Operating Procedure (SOP)

**Source:** `/home/rosie/projects/rag-system-v2/docs/sop/rag-system-sop-v2.md`

**Service:** RAG System v2 - Knowledge Processing & Retrieval  
**Containers:** frontend, backend, database  
**Ports:** Frontend (8080), Backend (8000), Database (7474/7687)  
**Project Location:** `/home/rosie/projects/rag-system-v2`  
**Multi-LLM Access:** claude-llm-proxy container (enterprise-scale integration)

**⚠️ CRITICAL: ALWAYS VERIFY DIRECTORY BEFORE OPERATIONS**  
**YOU ARE PROBABLY IN THE WRONG DIRECTORY - CHECK FIRST**

---

## 1. STARTUP PROCEDURES

### 1.1 Standard Startup
```bash
# Navigate to correct directory (CRITICAL STEP)
cd /home/rosie/projects/rag-system-v2

# Verify you are in the right location
pwd
ls docker-compose.yml

# Start all services
docker-compose up -d

# Wait for services to initialize (60 seconds recommended for database)
sleep 60
```

### 1.2 Startup with Build
```bash
cd /home/rosie/projects/rag-system-v2

# Start with rebuild (if code changes made)
docker-compose up -d --build

# Wait for initialization
sleep 60
```

### 1.3 Cold Start (after system reboot)
```bash
cd /home/rosie/projects/rag-system-v2

# Ensure network is clean
docker network prune -f

# Start services
docker-compose up -d

# Extended wait for cold start
sleep 90
```

### 1.4 Startup Status Verification
```bash
# Quick status check
docker-compose ps

# Expected output: All services "Up" status
# frontend: Up, 8080->8080/tcp
# backend: Up, 8000->8000/tcp  
# database: Up (healthy), 7474->7474/tcp
```

### 1.5 MULTI-LLM PROXY ACCESS

#### 1.5.1 Deploy Multi-LLM Proxy Container
```bash
# Navigate to correct directory
cd /home/rosie/projects/rag-system-v2

# Deploy proxy container for LLM access (includes docker-cli)
docker run -dit --name claude-llm-proxy \
  --network rag-system-v2_net \
  --add-host host.docker.internal:host-gateway \
  -v /home/rosie/projects:/projects:rw \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  alpine:latest sh -c "
    apk add --no-cache curl python3 py3-pip jq git bash nano vim wget \
    findutils grep sed gawk procps util-linux coreutils docker-cli &&
    pip3 install --break-system-packages --no-cache-dir requests pandas numpy matplotlib seaborn &&
    echo \"Proxy container ready for LLM access\" &&
    sleep infinity
  "

# Wait for initialization
sleep 60
```

#### 1.5.2 Verify Multi-LLM Access
```bash
# Test RAG system access through proxy
docker exec claude-llm-proxy curl http://backend:8000/health
# Expected: {"healthy":true}

# Test file system access
docker exec claude-llm-proxy ls -la /projects/rag-system-v2/
# Expected: RAG system directory listing

# Test Python data analysis capabilities
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy; print(\"LLM access ready\")"
# Expected: "LLM access ready"

# Test container management
docker exec claude-llm-proxy docker ps --format "table {{.Names}}\t{{.Status}}"
# Expected: All containers visible
```

#### 1.5.3 LLM Integration Capabilities
Through the proxy container, any LLM system can:

- Access 100,000+ files across 48+ project directories
- Use 21+ RAG API endpoints for knowledge processing
- Execute Python data analysis with full scientific stack
- Monitor real-time system health and performance
- Manage Docker containers and infrastructure
- Integrate with n8n workflows and MCP server

See Multi-LLM Integration Guide for complete usage patterns

## 2. STATUS CHECKING

### 2.1 Container Status Verification
```bash
# Quick overview - RAG system containers
docker ps | grep -E "(frontend|backend|database)"

# Include proxy container status
docker ps | grep -E "(frontend|backend|database|claude-llm-proxy)"

# Detailed compose status
cd /home/rosie/projects/rag-system-v2
docker-compose ps

# Expected output: All containers "Up" status
```

### 2.2 Service Health Checks
```bash
# Backend API health
curl http://localhost:8000/health
# Expected: {"healthy":true}

# Frontend web interface
curl -I http://localhost:8080
# Expected: HTTP 200 response

# Database connectivity
curl -I http://localhost:7474
# Expected: Neo4j browser interface

# Proxy container health (if deployed)
docker exec claude-llm-proxy curl http://backend:8000/health 2>/dev/null
# Expected: {"healthy":true}
```

### 2.3 Multi-LLM Access Verification
```bash
# Verify proxy container operational
docker exec claude-llm-proxy /tmp/verify_access.sh 2>/dev/null || echo "Proxy verification script not found"

# Test comprehensive system access
docker exec claude-llm-proxy sh -c "
echo \"=== MULTI-LLM ACCESS VERIFICATION ===\"
curl -s http://backend:8000/health > /dev/null && echo \"✅ RAG API accessible\" || echo \"❌ RAG API failed\"
[ -d \"/projects/rag-system-v2\" ] && echo \"✅ File system accessible\" || echo \"❌ File system failed\"
python3 -c \"import requests, pandas, numpy\" 2>/dev/null && echo \"✅ Python libraries working\" || echo \"❌ Python libraries failed\"
docker ps >/dev/null 2>&1 && echo \"✅ Container management working\" || echo \"❌ Container management failed\"
echo \"=== VERIFICATION COMPLETE ===\"
"
```

### 2.4 Troubleshooting Failed Health Checks
```bash
# If backend health fails
docker logs backend --tail 20

# If frontend fails
docker logs frontend --tail 20

# If database fails
docker logs database --tail 20
docker exec database cypher-shell -u neo4j -p password "RETURN 1"

# If proxy access fails
docker logs claude-llm-proxy --tail 20
```

## 3. SHUTDOWN PROCEDURES

### 3.1 Graceful System Shutdown
```bash
# Navigate to project directory
cd /home/rosie/projects/rag-system-v2

# Stop RAG system gracefully
docker-compose down

# Stop proxy container (if running)
docker stop claude-llm-proxy 2>/dev/null || echo "Proxy container not running"

# Verify shutdown complete
docker ps | grep -E "(frontend|backend|database|claude-llm-proxy)"
# Expected: No output (all containers stopped)
```

### 3.2 Individual Container Shutdown
```bash
# Stop containers in reverse dependency order
docker stop frontend    # Web interface (stop first)
docker stop backend     # API server
docker stop database    # Database (stop last)

# Stop proxy container separately
docker stop claude-llm-proxy
```

### 3.3 Force Shutdown (Emergency)
```bash
cd /home/rosie/projects/rag-system-v2

# Force stop all RAG containers
docker-compose kill

# Force stop proxy container
docker kill claude-llm-proxy 2>/dev/null

# Nuclear option - remove everything
docker-compose down --remove-orphans --volumes
docker rm -f claude-llm-proxy 2>/dev/null
```

### 3.4 Maintenance Shutdown
```bash
cd /home/rosie/projects/rag-system-v2

# Stop with network cleanup
docker-compose down --remove-orphans

# Clean proxy container
docker stop claude-llm-proxy 2>/dev/null
docker rm claude-llm-proxy 2>/dev/ll

# Network cleanup
docker network prune -f
```

## 4. VERIFICATION & TESTING

### 4.1 Quick Functional Test
```bash
# Basic system functionality
curl http://localhost:8000/health | jq .
curl -I http://localhost:8080
curl -I http://localhost:7474

# Expected: All return successful HTTP status codes
```

### 4.2 API Endpoint Testing
```bash
# Test core API functionality
curl http://localhost:8000/health
curl http://localhost:8000/sources_list
curl http://localhost:8000/schema

# Test with sample query
curl -X POST http://localhost:8000/chat_bot \
  -H "Content-Type: application/json" \
  -d "{\"message\": \"test connection\"}"
```

### 4.3 Database Connectivity Testing
```bash
# Test Neo4j direct connection
docker exec database cypher-shell -u neo4j -p password "MATCH (n) RETURN count(n) LIMIT 1"

# Test through API
curl -X POST http://localhost:8000/graph_query \
  -H "Content-Type: application/json" \
  -d "{\"query\": \"MATCH (n) RETURN count(n) as total\"}"
```

### 4.4 Multi-LLM Integration Testing
```bash
# Test comprehensive LLM capabilities
docker exec claude-llm-proxy sh -c "
echo \"=== MULTI-LLM CAPABILITY TESTING ===\"

# Test file system scale
FILE_COUNT=\$(find /projects -name \"*.py\" 2>/dev/null | wc -l)
echo \"Python files accessible: \$FILE_COUNT\"

# Test RAG API endpoints
curl -s http://backend:8000/docs >/dev/null && echo \"✅ API documentation accessible\" || echo \"❌ API docs failed\"
curl -s http://backend:8000/openapi.json >/dev/null && echo \"✅ OpenAPI spec accessible\" || echo \"❌ OpenAPI failed\"

# Test advanced analysis
python3 -c \"\
import requests, json\
try:\
    response = requests.get(\"http://backend:8000/health\")\
    health = response.json()\
    print(f\\\"✅ Python analysis working: {health}\\\")\
except Exception as e:\
    print(f\\\"❌ Python analysis failed: {e}\\\")\
\"

# Test container management
CONTAINER_COUNT=\$(docker ps | wc -l)
echo \"✅ Container management: \$((CONTAINER_COUNT-1)) containers visible\"

echo \"=== TESTING COMPLETE ===\"
"
```

### 4.5 API Endpoint Verification
```bash
# Test core RAG API functionality
docker exec claude-llm-proxy curl -s http://backend:8000/health | jq . 2>/dev/null || echo "Health endpoint working"
docker exec claude-llm-proxy curl -s http://backend:8000/sources_list | head -5
docker exec claude-llm-proxy curl -s http://backend:8000/schema | head -10

# Test API documentation access
docker exec claude-llm-proxy curl -s http://backend:8000/openapi.json | jq ".paths | keys" 2>/dev/null | head -10 || echo "OpenAPI available"
```

### 4.6 Performance Verification
```bash
# Check system performance under LLM load
docker exec claude-llm-proxy sh -c "
echo \"=== PERFORMANCE VERIFICATION ===\"

# Response time test
echo \"API Response Time:\"
time curl -s http://backend:8000/health >/dev/null

# Resource usage
echo \"Container Resource Usage:\"
docker stats --no-stream --format \"table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\" | head -7

# Storage status
echo \"Storage Status:\"
df -h | grep projects

echo \"=== PERFORMANCE CHECK COMPLETE ===\"
"
```

### 4.7 Success Criteria Checklist

- All containers show "Up" status
- Backend health returns `{"healthy":true}`
- Frontend loads at `localhost:8080`
- Database accessible at `localhost:7474`
- No critical errors in container logs
- Local Python scripts present and accessible
- ChromaDB storage directory exists
- Multi-LLM proxy access functional (if deployed)
- API endpoints responding correctly
- File system access working through proxy

## 5. TROUBLESHOOTING

### 5.1 Container Startup Issues
Issue: Containers fail to start or exit immediately
```bash
# Check container logs
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database

# Common fixes:
cd /home/rosie/projects/rag-system-v2  # Ensure correct directory
docker-compose down
docker-compose up -d --build
```

Issue: Port conflicts
```bash
# Check port usage
sudo netstat -tulpn | grep -E ":8000|:8080|:7474"

# Kill conflicting processes
sudo lsof -ti:8000 | xargs kill -9
sudo lsof -ti:8080 | xargs kill -9
sudo lsof -ti:7474 | xargs kill -9
```

### 5.2 Network Connectivity Issues
Issue: Containers cannot communicate
```bash
# Check network status
docker network ls
docker network inspect rag-system-v2_net

# Recreate network
docker-compose down
docker network prune -f
docker-compose up -d
```

Issue: API endpoints unreachable
```bash
# Test internal connectivity
docker exec backend curl http://database:7474
docker exec frontend curl http://backend:8000/health

# Check firewall
sudo ufw status
```

### 5.3 Database Connection Issues
Issue: Backend cannot connect to Neo4j
```bash
# Check Neo4j status
docker exec database cypher-shell -u neo4j -p password "RETURN 1"

# Check connection string in backend
docker exec backend env | grep NEO4J

# Reset database connection
docker restart database
sleep 30
docker restart backend
```

Issue: Neo4j authentication problems
```bash
# Reset Neo4j password
docker exec database cypher-shell -u neo4j -p neo4j "ALTER CURRENT USER SET PASSWORD FROM 'neo4j' TO 'password'"

# Or rebuild with clean data
docker-compose down
docker volume rm rag-system-v2_neo4j_data
docker-compose up -d
```

### 5.4 Performance Issues
Issue: Slow API responses
```bash
# Check resource usage
docker stats

# Check available memory and CPU
free -h
top

# Optimize containers
docker system prune -f
docker-compose restart
```

Issue: High memory usage
```bash
# Check memory consumption
docker stats --format "table {{.Name}}\t{{.MemUsage}}\t{{.MemPerc}}"

# Restart heavy containers
docker restart backend
docker restart database
```

### 5.5 Data/Storage Issues
Issue: ChromaDB connection errors
```bash
# Check ChromaDB directory
ls -la /home/rosie/projects/rag-system-v2/chroma_db_optimized/

# Verify permissions
sudo chown -R $(id -u):$(id -g) /home/rosie/projects/rag-system-v2/chroma_db_optimized/

# Test ChromaDB script
cd /home/rosie/projects/rag-system-v2
python3 inspect_chroma.py
```

Issue: Neo4j data corruption
```bash
# Check Neo4j logs
docker logs database

# Backup and reset (DESTRUCTIVE)
docker-compose down
cp -r /var/lib/docker/volumes/rag-system-v2_neo4j_data /tmp/neo4j_backup
docker volume rm rag-system-v2_neo4j_data
docker-compose up -d
```

### 5.6 Multi-LLM Proxy Issues
Issue: Proxy container not accessible to LLMs
Cause: Container not running or network issues
```bash
# Check proxy container status
docker ps | grep claude-llm-proxy

# If not running, redeploy
cd /home/rosie/projects/rag-system-v2
# [Use deployment command from Section 1.5.1]

# Test basic connectivity
docker exec claude-llm-proxy curl http://backend:8000/health
```

Issue: LLM cannot access file system
Cause: Volume mount issues or permissions
```bash
# Check volume mounts
docker inspect claude-llm-proxy | grep -A 10 "Mounts"

# Test file access
docker exec claude-llm-proxy ls -la /projects/

# Fix permissions if needed (rare)
sudo chown -R $(id -u):$(id -g) /home/rosie/projects/
```

Issue: Python libraries not working for LLM analysis
Cause: Library installation failed or corrupted
```bash
# Test library availability
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy"

# Reinstall if needed
docker exec claude-llm-proxy pip3 install --break-system-packages requests pandas numpy matplotlib seaborn
```

Issue: Container management not working
Cause: Docker CLI missing or socket access issues
```bash
# Check Docker CLI availability
docker exec claude-llm-proxy docker --version

# If missing, install (should not happen with current deployment)
docker exec claude-llm-proxy apk add --no-cache docker-cli

# Test socket access
docker exec claude-llm-proxy docker ps
```

### 5.7 Integration Testing Issues
Issue: RAG API endpoints not responding through proxy
Cause: Network connectivity or API service issues
```bash
# Test network connectivity
docker exec claude-llm-proxy ping backend
docker exec claude-llm-proxy nslookup backend

# Check API service status
docker logs backend --tail 20

# Test specific endpoints
docker exec claude-llm-proxy curl -v http://backend:8000/health
```

Issue: Large file operations timing out
Cause: Resource limits or network issues
```bash
# Check resource usage
docker stats claude-llm-proxy --no-stream

# Check available storage
docker exec claude-llm-proxy df -h | grep projects

# Optimize for large operations
docker exec claude-llm-proxy sh -c "
# Use find with limits for large searches
find /projects -name \"*.py\" | head -1000
"
```

## ADVANCED TROUBLESHOOTING

### System Recovery Procedures

#### Complete System Reset
```bash
# WARNING: This will destroy all data - backup first!

# 1. Stop all containers
cd /home/rosie/projects/rag-system-v2
docker-compose down --volumes --remove-orphans
docker stop claude-llm-proxy 2>/dev/null
docker rm claude-llm-proxy 2>/dev/null

# 2. Clean Docker system
docker system prune -af
docker network prune -f
docker volume prune -f

# 3. Rebuild everything
docker-compose up -d --build --force-recreate

# Wait for RAG system to be ready
sleep 60

# 4. Redeploy proxy container
# [Use deployment command from Section 1.5.1]

# 5. Verify system
curl http://localhost:8000/health
curl http://localhost:8080
curl http://localhost:7474

# Test multi-LLM access
docker exec claude-llm-proxy curl http://backend:8000/health
docker exec claude-llm-proxy ls /projects/rag-system-v2/
```

#### Partial Recovery (RAG System Only)
```bash
# Restart just the RAG system components
cd /home/rosie/projects/rag-system-v2
docker-compose restart

# Wait for services
sleep 60

# Test functionality
curl http://localhost:8000/health
docker exec claude-llm-proxy curl http://backend:8000/health
```

#### Proxy Container Recovery
```bash
# Reset just the proxy container
docker stop claude-llm-proxy
docker rm claude-llm-proxy

# Redeploy with verified command
cd /home/rosie/projects/rag-system-v2
# [Use latest deployment command with all tools]

# Verify proxy functionality
docker exec claude-llm-proxy curl http://backend:8000/health
docker exec claude-llm-proxy ls /projects/rag-system-v2/
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy; print('Ready')"
docker exec claude-llm-proxy docker ps
```

### Diagnostic Data Collection

#### System Information Gathering
```bash
# Collect comprehensive diagnostic information
docker exec claude-llm-proxy sh -c "
echo \"=== COMPREHENSIVE SYSTEM DIAGNOSTICS ===\"
echo \"Timestamp: \$(date)\"
echo

echo \"1. CONTAINER STATUS:\"
docker ps --format \"table {{.Names}}\t{{.Status}}\t{{.Ports}}\t{{.Image}}\"
echo

echo \"2. NETWORK CONFIGURATION:\"
docker network ls
echo

echo \"3. VOLUME MOUNTS:\"
docker inspect claude-llm-proxy | grep -A 10 \"Mounts\"
echo

echo \"4. SYSTEM RESOURCES:\"
docker stats --no-stream --format \"table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}\"
echo

echo \"5. API HEALTH CHECKS:\"
echo \"Backend: \$(curl -s http://backend:8000/health | jq -r '.healthy' 2>/dev/null || echo 'ERROR')\"
echo \"Frontend: \$(curl -s -o /dev/null -w '%{http_code}' http://frontend:8080)\"
echo \"Database: \$(curl -s -o /dev/null -w '%{http_code}' http://database:7474)\"
echo

echo \"6. FILE SYSTEM STATUS:\"
echo \"Projects dir: \$(ls /projects | wc -l) items\"
echo \"RAG system: \$(ls /projects/rag-system-v2 2>/dev/null | wc -l) items\"
echo \"Disk usage: \$(df -h | grep projects)\"
echo

echo \"7. PYTHON ENVIRONMENT:\"
python3 --version
pip3 --version
python3 -c \"\
try:\
    import requests, pandas, numpy, matplotlib, seaborn\
    print('✅ All Python libraries available')\
except ImportError as e:\
    print(f'❌ Python library issues: {e}')\
\"
echo

echo \"8. DOCKER ENVIRONMENT:\"
docker --version
echo \"Socket access: \$(docker ps >/dev/null 2>&1 && echo 'OK' || echo 'FAILED')\"
echo

echo \"=== DIAGNOSTICS COMPLETE ===\"
" > /tmp/system_diagnostics.log

# Display diagnostics
docker exec claude-llm-proxy cat /tmp/system_diagnostics.log
```

#### Log Analysis

##### Centralized Log Collection
```bash
mkdir -p /tmp/troubleshooting_logs/$(date +%Y%m%d_%H%M)
LOG_DIR="/tmp/troubleshooting_logs/$(date +%Y%m%d_%H%M)"

# RAG system logs
docker logs backend --tail 100 > "$LOG_DIR/backend.log" 2>&1
docker logs frontend --tail 100 > "$LOG_DIR/frontend.log" 2>&1
docker logs database --tail 100 > "$LOG_DIR/database.log" 2>&1

# Proxy container logs
docker logs claude-llm-proxy --tail 100 > "$LOG_DIR/proxy.log" 2>&1

# System logs
docker exec claude-llm-proxy cat /tmp/system_diagnostics.log > "$LOG_DIR/diagnostics.log" 2>/dev/null || echo "No diagnostics available" > "$LOG_DIR/diagnostics.log"

echo "Logs collected in: $LOG_DIR"
ls -la "$LOG_DIR"
```

## PREVENTION & MONITORING

### Proactive Monitoring Setup
```bash
# Create monitoring script for regular health checks
docker exec claude-llm-proxy sh -c 'cat > /tmp/health_monitor.sh << "MONITOR_EOF"
#!/bin/bash
LOG_FILE="/tmp/health_monitor.log"
echo "$(date): Starting health check" >> "$LOG_FILE"

# Check all critical components
BACKEND=$(curl -s http://backend:8000/health | jq -r ".healthy" 2>/dev/null || echo "error")
FRONTEND=$(curl -s -o /dev/null -w "%{\http_code}" http://frontend:8080)
DATABASE=$(curl -s -o /dev/null -w "%{\http_code}" http://database:7474)

# Log results
echo "$(date): Backend=$BACKEND, Frontend=$FRONTEND, Database=$DATABASE" >> "$LOG_FILE"

# Alert on failures
if [ "$BACKEND" != "true" ] || [ "$FRONTEND" != "200" ] || [ "$DATABASE" != "200" ]; then
    echo "$(date): ALERT - System health issue detected!" >> "$LOG_FILE"
    echo "Backend: $BACKEND, Frontend: $FRONTEND, Database: $DATABASE" >> "$LOG_FILE"
fi

# Keep only last 100 lines
tail -100 "$LOG_FILE" > "$LOG_FILE.tmp" && mv "$LOG_FILE.tmp" "$LOG_FILE"
MONITOR_EOF

chmod +x /tmp/health_monitor.sh
'

# Run health monitor
docker exec claude-llm-proxy /tmp/health_monitor.sh
```

### Best Practices for Stability
- Regular Health Checks: Run monitoring script daily
- Resource Monitoring: Check container stats weekly
- Log Rotation: Clear old logs monthly
- Backup Procedures: Regular configuration backups
- Update Management: Planned container updates
- Documentation Updates: Keep troubleshooting guide current


## QUICK REFERENCE

### Essential Commands
```bash
# System health check
docker exec claude-llm-proxy curl http://backend:8000/health

# Container status
docker ps | grep -E "(backend|frontend|database|proxy)"

# File system test
docker exec claude-llm-proxy ls /projects/rag-system-v2/

# Python environment test
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy; print('OK')"

# Docker access test
docker exec claude-llm-proxy docker ps --format "table {{.Names}}\t{{.Status}}"

# Complete diagnostics
docker exec claude-llm-proxy /tmp/system_diagnostics.log 2>/dev/null || echo "Run diagnostics first"
```

### Emergency Contacts
- Documentation: /projects/rag-system-v2/docs/
- Configuration: /projects/rag-system-v2/docker-compose.yml
- Logs Location: docker logs [container-name]
- Backup Location: /backup/ (if configured)
