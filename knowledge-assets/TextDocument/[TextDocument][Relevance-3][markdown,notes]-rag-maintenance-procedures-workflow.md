# RAG Maintenance Procedures Workflow

**Source:** `/home/rosie/projects/_rag-system/rag_work_instructions.md`

## Weekly Maintenance Tasks

### Weekly Maintenance Checklist
- [ ] Database optimization and cleanup
- [ ] Index rebuilding and maintenance
- [ ] Log file rotation and cleanup
- [ ] Backup verification
- [ ] Performance monitoring review
- [ ] Security updates check

### Database Maintenance Commands
```bash
# Chroma database optimization
curl -X POST http://localhost:8000/api/v1/collections/optimize

# Neo4j maintenance
docker exec rag-neo4j cypher-shell "CALL db.indexes()"
docker exec rag-neo4j cypher-shell "CALL apoc.periodic.commit('MATCH (n) WHERE n.last_updated < date() - duration(\"P30D\") DELETE n RETURN count(*)', {limit: 1000})"

# Clean up old log files
docker exec rag-processor find /logs -name "*.log" -mtime +7 -delete
```

## Backup and Restore Procedures

### Daily Backup Process

#### Automated Backup Script
```bash
#!/bin/bash
# daily_backup.sh

DATE=$(date +%Y%m%d)
BACKUP_DIR="/backups/$DATE"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup Chroma database
docker exec rag-chroma chroma backup --output /backups/chroma_$DATE.tar.gz

# Backup Neo4j database
docker exec rag-neo4j neo4j-admin dump --database=neo4j --to=/backups/neo4j_$DATE.dump

# Backup configuration files
cp -r /config $BACKUP_DIR/

# Compress and upload to cloud storage
tar -czf $BACKUP_DIR.tar.gz $BACKUP_DIR
aws s3 cp $BACKUP_DIR.tar.gz s3://rag-backups/
```

#### Schedule Daily Backups
```bash
# Add to crontab
0 2 * * * /scripts/daily_backup.sh
```

### Restore Procedures

#### Emergency Restore Process
```bash
# Stop all services
docker-compose down

# Restore from backup
DATE=20240115  # Replace with backup date

# Restore Chroma
docker run --rm -v chroma_data:/data -v /backups:/backups \
  chromadb/chroma chroma restore --input /backups/chroma_$DATE.tar.gz

# Restore Neo4j
docker run --rm -v neo4j_data:/data -v /backups:/backups \
  neo4j:latest neo4j-admin load --from=/backups/neo4j_$DATE.dump

# Restart services
docker-compose up -d
```

## Performance Monitoring

### Key Performance Metrics

#### System Metrics to Monitor
- Container CPU and memory usage
- Database query response times
- Search operation latency
- Document processing throughput
- Storage usage and growth

#### Monitoring Commands
```bash
# Container resource usage
docker stats

# Database performance
curl http://localhost:8000/api/v1/metrics
curl http://localhost:7474/db/manage/server/jmx/domain/org.neo4j

# Search performance
curl http://localhost:3000/api/metrics/search-performance
```

### Performance Optimization
```bash
# Optimize Chroma collections
curl -X POST http://localhost:8000/api/v1/collections/documents/optimize

# Rebuild Neo4j indexes
docker exec rag-neo4j cypher-shell "CALL db.indexes()"
docker exec rag-neo4j cypher-shell "CALL db.index.fulltext.createNodeIndex('document_search', ['Document'], ['title', 'content'])"

# Clear application caches
curl -X POST http://localhost:3000/api/cache/clear
```