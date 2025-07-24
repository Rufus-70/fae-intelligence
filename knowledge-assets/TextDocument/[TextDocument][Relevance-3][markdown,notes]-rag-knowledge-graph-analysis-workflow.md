# RAG Knowledge Graph Analysis Workflow

**Source:** `/home/rosie/projects/_rag-system/rag_work_instructions.md`

## Visualizing Document Relationships

### Accessing Neo4j Browser

#### Open Neo4j Interface
```bash
http://localhost:7474/browser/
```

#### Basic Connection Queries
```cypher
// View all document nodes
MATCH (d:Document) RETURN d LIMIT 25

// Show relationships between documents
MATCH (d1:Document)-[r]->(d2:Document) 
RETURN d1, r, d2 LIMIT 50
```

### Common Graph Queries

#### Find Related Documents
```cypher
// Documents sharing common concepts
MATCH (d1:Document)-[:CONTAINS]->(c:Concept)<-[:CONTAINS]-(d2:Document)
WHERE d1 <> d2
RETURN d1.title, d2.title, c.name, count(*) as shared_concepts
ORDER BY shared_concepts DESC
```

#### Identify Key Concepts
```cypher
// Most frequently mentioned concepts
MATCH (d:Document)-[:CONTAINS]->(c:Concept)
RETURN c.name, count(d) as document_count
ORDER BY document_count DESC
LIMIT 20
```

## Business Intelligence Queries

### Project Overlap Analysis
```cypher
// Find documents appearing in multiple projects
MATCH (d:Document)-[:BELONGS_TO]->(p:Project)
WITH d, collect(p.name) as projects
WHERE size(projects) > 1
RETURN d.title, projects
```

### Knowledge Gap Identification
```cypher
// Find isolated documents (potential knowledge gaps)
MATCH (d:Document)
WHERE NOT (d)-[:RELATES_TO]-(:Document)
RETURN d.title, d.project, d.date_created
ORDER BY d.date_created DESC
```

### Expertise Mapping
```cypher
// Map authors to their areas of expertise
MATCH (a:Author)-[:AUTHORED]->(d:Document)-[:CONTAINS]->(c:Concept)
RETURN a.name, collect(DISTINCT c.name) as expertise_areas, count(d) as document_count
ORDER BY document_count DESC
```

## Relationship Report Generation

### Weekly Relationship Analysis

#### Generate Connection Report
```bash
# Run relationship analysis script
docker exec rag-neo4j cypher-shell -f /scripts/weekly_analysis.cypher > weekly_relationships.csv
```

### Key Metrics to Track
- Number of new document connections
- Emerging concept clusters
- Cross-project knowledge sharing
- Isolated documents requiring attention

### Automated Insights
```cypher
// Create automated insight queries
MATCH (d:Document)
WHERE d.date_created >= date() - duration('P7D')
WITH count(d) as new_docs
MATCH (d1:Document)-[r:RELATES_TO]->(d2:Document)
WHERE r.created >= date() - duration('P7D')
WITH new_docs, count(r) as new_connections
RETURN new_docs, new_connections, 
       round(toFloat(new_connections)/new_docs, 2) as connection_ratio
```
