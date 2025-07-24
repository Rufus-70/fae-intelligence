# Health Check Procedures for Multi-LLM RAG System

**Source:** `/home/rosie/projects/rag-system-v2/docs/operations/health_check_procedures.md`

**Version:** 1.0  
**Created:** July 15, 2025  
**Purpose:** Automated health monitoring and system verification  

---

## Overview

The health check system provides comprehensive monitoring of all system components to ensure optimal performance for multi-LLM access.

## Health Check Components

### 1. Master Health Check Script
Location: `/tmp/master_health_check.sh`

**Components Verified:**
- Container status (backend, frontend, database, claude-llm-proxy)
- API endpoints health
- File system integrity
- Projects directory accessibility
- Storage space availability

**Usage:**
```bash
# Run comprehensive health check
docker exec claude-llm-proxy /tmp/master_health_check.sh

# Expected output: 8/8 checks PASSED
```

### 2. Emergency Recovery System
Location: `/tmp/emergency_recovery.sh`

**Capabilities:**
- Automatic container restart for failed services
- File index rebuilding if corrupted
- Proxy container library restoration
- Post-recovery health verification

**Automatic Triggers:**
- Backend API unresponsive
- File index corruption detected
- Proxy container library failures

### 3. Scheduled Health Monitoring
Location: `/tmp/scheduled_health_runner.sh`

**Features:**
- Automated health checks every 5 minutes
- Failure threshold monitoring (3 failures = recovery trigger)
- Comprehensive logging and history tracking
- Background service operation

## Health Check Results Interpretation

### Success Indicators
- ✅ Container_[name]: Running normally
- ✅ Backend_API: API responding correctly
- ✅ Frontend_Web: Web interface accessible
- ✅ File_Index: Index file exists
- ✅ Projects_Directory: RAG directory accessible

### Failure Indicators
- ❌ Container_[name]: Container not found/failed
- ❌ Backend_API: API not responding or timeout
- ❌ File_Index: Index file missing
- ❌ Projects_Directory: Directory not found

### System Health Status
- HEALTHY: All checks passed (100% success rate)
- DEGRADED: 1-2 checks failed (<90% success rate)
- CRITICAL: 3+ checks failed (<70% success rate)

## Troubleshooting Common Issues

### Backend API Not Responding
```bash
# Check container status
docker ps | grep backend

# Check container logs
docker logs backend --tail 50

# Restart if needed
docker-compose restart backend
```

### File Index Missing or Corrupted
```bash
# Run emergency recovery
docker exec claude-llm-proxy /tmp/emergency_recovery.sh

# Or manually rebuild
docker exec claude-llm-proxy python3 /tmp/build_file_index.py
```

### Proxy Container Issues
```bash
# Verify proxy functionality
docker exec claude-llm-proxy curl http://backend:8000/health
docker exec claude-llm-proxy python3 -c "import requests"

# Redeploy if needed (see container update procedures)
```

## Health Check Logs

### Log Locations
- Main log: `/tmp/health_check.log`
- Failed checks: `/tmp/failed_health_checks.log`
- Scheduled runs: `/tmp/scheduled_health.log`

### Log Rotation
- Automatic rotation at 1000 lines for main log
- Failed checks limited to 500 entries
- Scheduled log limited to 1000 entries

## Integration with Other Systems
- **Performance Dashboard:** Health check results are integrated into the performance monitoring dashboard for real-time status display.
- **Backup System:** Health checks run automatically after backup operations to verify system integrity.
- **Update Procedures:** Mandatory health checks before and after container updates ensure system stability.

## Maintenance Schedule
- **Real-time:** Continuous monitoring via scheduled runner
- **Manual:** Run `/tmp/master_health_check.sh` as needed
- **Post-operations:** Automatic after backups, updates, recovery
