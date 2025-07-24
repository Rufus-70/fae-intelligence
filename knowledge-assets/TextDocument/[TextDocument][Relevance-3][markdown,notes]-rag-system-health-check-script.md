# RAG System Health Check Script

**Source:** `/home/rosie/projects/rag-system-v2/scripts/monitoring/health_check.sh`

This script performs a quick health check of the RAG system, providing an overview of service status, health endpoints, and resource usage.

## Usage

```bash
./scripts/monitoring/health_check.sh
```

## Key Actions Performed

- **Service Status:** Displays the status of Docker Compose services (`docker-compose ps`).
- **Health Endpoints:** Checks the health endpoints of specified services (web-interface, document-processor, mcp-server).
- **Resource Usage:** Shows CPU, memory usage, and memory percentage for running Docker containers (`docker stats`).

## Important Notes

- This script assumes the RAG system is managed by `docker-compose`.
- The health check endpoints and ports (`web-interface:5001`, `document-processor:8001`, `mcp-server:8081`) are hardcoded and may need adjustment based on your specific deployment.
- Ensure the script has execute permissions (`chmod +x`).
