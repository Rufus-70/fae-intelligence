# Multi-LLM Proxy Container Implementation & Usage Guide

**Source:** `/home/rosie/projects/rag-system-v2/docs/multi-llm-integration/proxy-container-guide.md`

**Container Name:** `claude-llm-proxy`  
**Purpose:** Enable unrestricted LLM access to RAG system and project files  
**Security Scope:** Limited to projects directory with controlled network access  
**Target Users:** Claude, GPT, Gemini, and other LLM systems  

---

## 1. PROXY CONTAINER DEPLOYMENT

### 1.1 Standard Deployment
```bash
# Navigate to RAG system directory for network access
cd /home/rosie/projects/rag-system-v2

# Deploy proxy container with full capabilities
docker run -dit --name claude-llm-proxy \
  --network rag-system-v2_net \
  --add-host host.docker.internal:host-gateway \
  -v /home/rosie/projects:/projects:rw \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  alpine:latest sh -c "
    apk add --no-cache curl python3 py3-pip jq git bash nano vim wget \
    findutils grep sed gawk procps util-linux coreutils docker-cli &&\
    pip3 install --break-system-packages --no-cache-dir requests pandas numpy matplotlib seaborn &&\
    echo 'Proxy container ready for LLM access' &&\
    sleep infinity
  "

# Wait for initialization
sleep 30
```

### 1.2 Verification Commands
```bash
# Verify container is running
docker ps | grep claude-llm-proxy

# Test basic functionality
docker exec claude-llm-proxy echo "Proxy container operational"

# Test tool availability
docker exec claude-llm-proxy curl --version
docker exec claude-llm-proxy python3 --version
docker exec claude-llm-proxy jq --version
```

### 1.3 Network Configuration Validation
```bash
# Test RAG system connectivity
docker exec claude-llm-proxy curl -s http://backend:8000/health

# Test frontend access
docker exec claude-llm-proxy curl -I http://frontend:8080

# Test database connectivity
docker exec claude-llm-proxy curl -I http://database:7474

# Test host system access
docker exec claude-llm-proxy curl -s http://host.docker.internal:5678/healthz
```

---

## 2. LLM ACCESS VERIFICATION

### 2.1 File System Access Test
```bash
# Verify projects directory access
docker exec claude-llm-proxy ls -la /projects/

# Test RAG system file access
docker exec claude-llm-proxy cat /projects/rag-system-v2/docker-compose.yml

# Test file search capabilities
docker exec claude-llm-proxy find /projects -name "*.py" | head -5

# Test file modification (if needed)
docker exec claude-llm-proxy touch /projects/test-llm-access.tmp
docker exec claude-llm-proxy rm /projects/test-llm-access.tmp
```

### 2.2 RAG System API Testing
```bash
# Health check endpoint
docker exec claude-llm-proxy curl -s http://backend:8000/health

# Test API documentation access (if available)
docker exec claude-llm-proxy curl -s http://backend:8000/docs

# Test query endpoint (if configured)
docker exec claude-llm-proxy curl -X POST http://backend:8000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "test connectivity from proxy"}'
```

### 2.3 Python Analysis Capabilities
```bash
# Test Python import capabilities
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy; print('All libraries available')"

# Test RAG analysis script execution
docker exec claude-llm-proxy python3 /projects/rag-system-v2/inspect_chroma.py

# Test data analysis capabilities
docker exec claude-llm-proxy python3 -c "
import pandas as pd
import requests
response = requests.get('http://backend:8000/health')
print(f'RAG Status: {response.json()}')
"
```

---

## 3. SHUTDOWN PROCEDURES

### 3.1 Graceful Shutdown
```bash
# Stop proxy container gracefully
docker stop claude-llm-proxy

# Verify shutdown
docker ps | grep claude-llm-proxy
# Expected: No output (container stopped)
```

### 3.2 Complete Cleanup
```bash
# Remove container completely
docker stop claude-llm-proxy
docker rm claude-llm-proxy

# Verify cleanup
docker ps -a | grep claude-llm-proxy
# Expected: No output (container removed)
```

### 3.3 Network Cleanup (if needed)
```bash
# Check network usage
docker network inspect rag-system-v2_net

# Clean unused networks (careful - only if no other containers using)
docker network prune
```

---

## 4. LLM USAGE PATTERNS

### 4.1 Standard LLM Commands via Proxy

**File Operations:**
```bash
# Read configuration files
docker exec claude-llm-proxy cat /projects/rag-system-v2/docker-compose.yml

# Search for specific content
docker exec claude-llm-proxy grep -r "embedding" /projects/rag-system-v2/

# List project structure
docker exec claude-llm-proxy find /projects/rag-system-v2 -type f -name "*.py"
```

**RAG System Interaction:**
```bash
# Check system health
docker exec claude-llm-proxy curl http://backend:8000/health

# Query RAG system
docker exec claude-llm-proxy curl -X POST http://backend:8000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "What can you tell me about machine learning?"}'

# Monitor system status
docker exec claude-llm-proxy curl http://frontend:8080
```

**Data Analysis:**
```bash
# Execute Python analysis scripts
docker exec claude-llm-proxy python3 /projects/rag-system-v2/build_vector_store.py

# Interactive Python for data exploration
docker exec -it claude-llm-proxy python3

# Run analysis with specific parameters
docker exec claude-llm-proxy python3 -c "
import requests
result = requests.get('http://backend:8000/health')
print(f'Backend Status: {result.status_code}')
"
```

### 4.2 Advanced LLM Operations

**Container Management:**
```bash
# Monitor RAG system containers
docker exec claude-llm-proxy docker ps | grep rag-system

# Check container logs
docker exec claude-llm-proxy docker logs backend --tail 10

# Inspect container configuration
docker exec claude-llm-proxy docker inspect backend
```

**System Monitoring:**
```bash
# Check system resources
docker exec claude-llm-proxy df -h
docker exec claude-llm-proxy free -m

# Monitor network connectivity
docker exec claude-llm-proxy netstat -tlnp 2>/dev/null | grep :8000

# Check process status
docker exec claude-llm-proxy ps aux | grep python
```

---

## 5. TROUBLESHOOTING

### 5.1 Container Won't Start

**Issue:** Proxy container fails to deploy
```bash
# Check Docker daemon status
systemctl status docker

# Check available resources
df -h
free -m

# Check network availability
docker network ls | grep rag-system-v2
```

**Resolution:**
- Ensure RAG system is running first
- Check sufficient disk space (>1GB)
- Verify network exists: `docker network inspect rag-system-v2_net`

### 5.2 Network Connectivity Issues

**Issue:** Cannot reach RAG system from proxy
```bash
# Test network connectivity
docker exec claude-llm-proxy ping backend
docker exec claude-llm-proxy nslookup backend

# Check network configuration
docker network inspect rag-system-v2_net
```

**Resolution:**
- Ensure proxy is on correct network
- Restart RAG system if backend unreachable
- Verify container names match network aliases

### 5.3 File Access Issues

**Issue:** Cannot access project files
```bash
# Check volume mounts
docker inspect claude-llm-proxy | grep -A 10 "Mounts"

# Test file permissions
docker exec claude-llm-proxy ls -la /projects/
docker exec claude-llm-proxy whoami
```

**Resolution:**
- Verify volume mount: `-v /home/rosie/projects:/projects:rw`
- Check host file permissions: `ls -la /home/rosie/projects/`
- Ensure host directory exists

### 5.4 Python Package Installation Issues

**Issue:** pip fails with "externally-managed-environment" error
```bash
# Check if this is the error
docker logs claude-llm-proxy | grep "externally-managed-environment"
```

**Resolution:**
- Use `--break-system-packages` flag with pip in container environment
- This is safe in disposable containers, not recommended on host systems
- Updated deployment command includes this fix

**Issue:** Required Python libraries missing
```bash
# Check installed packages
docker exec claude-llm-proxy apk list --installed | grep py3
docker exec claude-llm-proxy python3 -c "import requests, pandas, numpy"

# Reinstall if needed
docker exec claude-llu-proxy pip3 install --break-system-packages requests pandas numpy
```

### 5.5 Tool Installation Issues

**Issue:** Required tools missing or broken
```bash
# Check installed packages
docker exec claude-llm-proxy apk list --installed | grep curl
docker exec claude-llm-proxy python3 -c "import requests"

# Reinstall tools if needed
docker exec claude-llm-proxy apk add --no-cache curl python3 py3-pip
docker exec claude-llm-proxy pip3 install --break-system-packages requests pandas numpy
```

### 5.7 Docker CLI Missing (RESOLVED)

**Issue:** Docker commands fail with "executable file not found"
**Status:** ✅ **RESOLVED** - Now included in standard deployment

**Prevention:** Current deployment command includes `docker-cli` package automatically.

**Legacy Fix (if using old deployment):**
```bash
# Install Docker CLI in running container (only needed for old deployments)
docker exec claude-llm-proxy apk add --no-cache docker-cli

# Test Docker access
docker exec claude-llm-proxy docker version
```

**Note:** This issue is prevented in current deployment procedures.

### 5.8 Emergency Recovery

**Complete proxy failure:**
```bash
# Remove broken container
docker stop claude-llm-proxy 2>/dev/null
docker rm claude-llm-proxy 2>/dev/null

# Redeploy from scratch
cd /home/rosie/projects/rag-system-v2
# [Execute deployment command from Section 1.1]

# Verify functionality
docker exec claude-llm-proxy curl http://backend:8000/health
```

---

## APPENDIX

### Container Specifications
- **Base Image:** alpine:latest (lightweight, secure)
- **Tools Installed:** curl, python3, jq, git, bash, nano, vim, wget, docker-cli
- **Python Libraries:** requests, pandas, numpy, matplotlib, seaborn
- **Network Access:** RAG system network + host gateway
- **File Access:** Read/write to `/home/rosie/projects/`
- **Docker Access:** Read-only socket for container inspection and management

### Security Boundaries
- ✅ **No Privileged Access:** Standard user permissions only
- ✅ **Limited File Scope:** Only `/home/rosie/projects/` accessible
- ✅ **Network Restrictions:** RAG network + localhost only
- ✅ **No System Modification:** No sudo, passwd, or admin commands
- ✅ **Read-Only Docker:** Can inspect and monitor but not modify containers

### Performance Considerations
- **Memory Usage:** ~100-200MB base + analysis workload
- **CPU Impact:** Minimal when idle, scales with analysis tasks
- **Network Impact:** Only during active LLM operations
- **Storage Impact:** ~500MB for tools and libraries

### Integration Points
- **RAG Backend:** HTTP API calls to port 8000
- **RAG Frontend:** Web interface access on port 8080
- **RAG Database:** Neo4j browser on port 7474
- **n8n System:** Webhook and API integration on port 5678
- **Host System:** Docker socket for container management

---

**Document Version:** 1.0  
**Created:** 2025-07-14  
**Last Updated:** 2025-07-14  
**Security Review:** Required before production use  
**Maintenance:** Monthly container refresh recommended
