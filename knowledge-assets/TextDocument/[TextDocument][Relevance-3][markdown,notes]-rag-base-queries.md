# RAG System Base Queries

**Source:** `/home/rosie/projects/rag-system-v2/graph-base-queries.md`

## Quick Document Inventory Queries

### 1. Complete Document List
```cypher
MATCH (c:Chunk)
RETURN DISTINCT c.fileName AS document_name,
       count(c) AS total_chunks,
       count(DISTINCT c.page_number) AS pages,
       round(sum(c.length)/1000.0) AS content_kb
ORDER BY total_chunks DESC;
```

### 2. Document Types & Categories
```cypher
MATCH (c:Chunk)
WITH c.fileName AS doc_name,
     CASE 
       WHEN c.fileName CONTAINS '.docx' THEN 'Word Document'
       WHEN c.fileName CONTAINS '.md' THEN 'Markdown'
       WHEN c.fileName CONTAINS '.pdf' THEN 'PDF'
       ELSE 'Other'
     END AS doc_type,
     CASE
       WHEN c.fileName CONTAINS 'Training' THEN 'Training Material'
       WHEN c.fileName CONTAINS 'Tools' THEN 'Tool Documentation'
       WHEN c.fileName CONTAINS 'Project' THEN 'Project Documentation'
       WHEN c.fileName CONTAINS 'AI' THEN 'AI/Technology'
       ELSE 'General'
     END AS content_category
RETURN doc_type,
       content_category,
       count(DISTINCT doc_name) AS document_count,
       collect(DISTINCT doc_name)[0..3] AS sample_documents
ORDER BY document_count DESC;
```

### 3. Business Intelligence by Document
```cypher
MATCH (c:Chunk)-[:HAS_ENTITY]-(e:__Entity__)
WITH c.fileName AS document,
     count(DISTINCT e) AS total_entities,
     count(DISTINCT CASE WHEN e:Process THEN e END) AS processes,
     count(DISTINCT CASE WHEN e:Tool OR e:Software THEN e END) AS tools,
     count(DISTINCT CASE WHEN e:Task THEN e END) AS tasks
WHERE total_entities > 5
RETURN document,
       total_entities,
       processes,
       tools,
       tasks,
       CASE 
         WHEN total_entities > 50 THEN 'High Value'
         WHEN total_entities > 20 THEN 'Medium Value'
         ELSE 'Basic'
       END AS business_intelligence_level
ORDER BY total_entities DESC;
```

## Better Content Reading Queries

### 4. Read Complete Sections (Not Fragments)
```cypher
// Replace 'YOUR_DOCUMENT.docx' with actual filename
MATCH (c:Chunk)
WHERE c.fileName = 'YOUR_DOCUMENT.docx'
RETURN c.page_number AS page,
       c.position AS order,
       c.text AS full_content
ORDER BY c.position
LIMIT 15;
```

### 5. Search for Complete Topics
```cypher
// Find complete sections about a topic
MATCH (c:Chunk)
WHERE toLower(c.text) CONTAINS 'YOUR_TOPIC'
RETURN c.fileName AS document,
       c.page_number AS page,
       c.text AS complete_section,
       length(c.text) AS content_length
ORDER BY content_length DESC
LIMIT 10;
```

### 6. Document Content Summary
```cypher
// Get overview of what each document contains
MATCH (c:Chunk)-[:HAS_ENTITY]-(e:__Entity__)
WITH c.fileName AS document,
     collect(DISTINCT labels(e)[1]) AS entity_types,
     collect(DISTINCT e.id)[0..10] AS sample_entities
RETURN document,
     entity_types,
     sample_entities
ORDER BY size(sample_entities) DESC;
```

## Document Quality Assessment

### 7. Find Your Most Valuable Documents
```cypher
// Documents with the most business intelligence
MATCH (c:Chunk)-[:HAS_ENTITY]-(e:__Entity__)
WHERE e:Process OR e:Task OR e:Tool OR e:Software
WITH c.fileName AS document,
     count(DISTINCT e) AS business_entities,
     count(DISTINCT c) AS total_chunks,
     round(count(DISTINCT e) * 1.0 / count(DISTINCT c), 2) AS entity_density
WHERE business_entities > 10
RETURN document,
       business_entities,
       total_chunks,
       entity_density,
       CASE
         WHEN entity_density > 2.0 THEN 'Very High'
         WHEN entity_density > 1.0 THEN 'High'
         WHEN entity_density > 0.5 THEN 'Medium'
         ELSE 'Low'
       END AS intelligence_quality
ORDER BY entity_density DESC;
```

### 8. Find Documents Missing from RAG
```cypher
// Check if you have documents that aren't fully processed
MATCH (c:Chunk)
WHERE NOT EXISTS((c)-[:HAS_ENTITY]-())
RETURN c.fileName AS document_without_entities,
       count(c) AS chunks_without_entities
ORDER BY chunks_without_entities DESC;
```

## Maintenance Queries

### 9. Document Processing Status
```cypher
MATCH (c:Chunk)
OPTIONAL MATCH (c)-[:HAS_ENTITY]-(e:__Entity__)
WITH c.fileName AS document,
     count(c) AS total_chunks,
     count(e) AS total_entities,
     CASE WHEN count(e) > 0 THEN 'Processed' ELSE 'Not Processed' END AS status
RETURN document,
       total_chunks,
       total_entities,
       status,
       round(count(e) * 1.0 / count(c), 1) AS entities_per_chunk
ORDER BY status, total_chunks DESC;
```

### 10. Export Document List
```cypher
// Create a simple list for external tracking
MATCH (c:Chunk)
WITH c.fileName AS document,
     count(c) AS chunks,
     min(c.page_number) AS first_page,
     max(c.page_number) AS last_page
RETURN document + ' | ' + 
       toString(chunks) + ' chunks | ' + 
       'Pages ' + toString(first_page) + '-' + toString(last_page) AS document_summary
ORDER BY document;
```

## Usage Tips

**For Document Inventory:**
- Run Query #1 first to see all your documents
- Use Query #3 to find your most valuable content
- Query #7 shows which documents have the richest business intelligence

**For Better Content Reading:**
- Use Query #4 instead of entity searches when you want to read full content
- Query #5 gives you complete sections about topics instead of fragments
- Always ORDER BY position or page_number for logical reading order

**For Maintenance:**
- Query #8 helps find content that might need reprocessing
- Query #9 shows processing status across all documents
- Query #10 creates a simple export for external tracking
