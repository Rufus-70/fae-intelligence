# RAG Troubleshooting Guide

**Source:** `/home/rosie/projects/_rag-system/rag_work_instructions.md`

## Common Issues and Quick Fixes

### Container Startup Issues
Problem: Containers fail to start

```bash
# Check Docker daemon status
sudo systemctl status docker

# Check container logs
docker logs rag-chroma
docker logs rag-neo4j
docker logs rag-web

# Common fixes
docker system prune -f  # Clean up unused resources
docker-compose down && docker-compose up -d  # Restart services
```

### Database Connection Issues
Problem: Cannot connect to databases

```bash
# Check port availability
netstat -tulpn | grep :8000  # Chroma
netstat -tulpn | grep :7474  # Neo4j

# Test connectivity
curl -f http://localhost:8000/api/v1/heartbeat
curl -f http://localhost:7474/browser/

# Reset database connections
docker restart rag-chroma rag-neo4j
```

## Document Processing Errors

### Upload Failures
Problem: Documents fail to upload or process

#### Check File Format Support
```bash
# Verify supported formats
curl http://localhost:3000/api/supported-formats
```

#### File Size Limitations
```bash
# Check file size limits
ls -lh /path/to/document.pdf
# Default limit: 50MB per file
```

### Processing Queue Issues
```bash
# Check processing queue
curl http://localhost:3000/api/processing-queue

# Clear stuck jobs
curl -X DELETE http://localhost:3000/api/processing-queue/clear-stuck
```

### Text Extraction Problems
Problem: Poor text extraction quality

#### PDF-Specific Issues
```bash
# Force OCR for scanned PDFs
curl -X POST http://localhost:3000/api/documents/reprocess/123 \
  -d '{"force_ocr": true, "ocr_language": "en"}'
```

#### Encoding Issues
```bash
# Check file encoding
file -i document.txt

# Convert encoding if needed
iconv -f ISO-8859-1 -t UTF-8 document.txt > document_utf8.txt
```

## Search and Query Issues

### Poor Search Results
Problem: Search returns irrelevant results

#### Adjust Relevance Threshold
```bash
# Increase threshold for more precise results
curl -X POST http://localhost:3000/api/search \
  -d '{"query": "machine learning", "threshold": 0.8}'
```

#### Rebuild Search Indexes
```bash
# Rebuild Chroma embeddings
curl -X POST http://localhost:8000/api/v1/collections/documents/rebuild-index

# Rebuild Neo4j text indexes
docker exec rag-neo4j cypher-shell "CALL db.index.fulltext.drop('document_search')"
docker exec rag-neo4j cypher-shell "CALL db.index.fulltext.createNodeIndex('document_search', ['Document'], ['title', 'content'])"
```

### Slow Query Performance
Problem: Searches take too long to complete

#### Check System Resources
```bash
# Monitor resource usage during search
docker stats
htop
```

#### Optimize Database Queries
```bash
# Enable query profiling in Neo4j
docker exec rag-neo4j cypher-shell "CALL dbms.setConfigValue('dbms.logs.query.enabled', 'true')"
```

## System Performance Issues

### High Memory Usage
Problem: System consuming too much memory

#### Identify Memory-Heavy Containers
```bash
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
```

#### Optimize Memory Settings
```bash
# Adjust Neo4j heap size
docker exec rag-neo4j neo4j-admin memrec --memory=8g

# Restart with new memory limits
docker-compose down
docker-compose up -d
```

### Disk Space Issues
Problem: Running out of storage space

#### Check Disk Usage
```bash
df -h
du -sh /var/lib/docker/
docker system df
```

#### Clean Up Storage
```bash
# Remove unused Docker resources
docker system prune -a -f

# Clean up old backups
find /backups -name "*.tar.gz" -mtime +30 -delete

# Archive old documents
curl -X POST http://localhost:3000/api/documents/archive \
  -d '{"older_than": "2023-01-01"}'
```

```