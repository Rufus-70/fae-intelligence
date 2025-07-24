# RAG Search and Query Workflow

**Source:** `/home/rosie/projects/_rag-system/rag_work_instructions.md`

## Basic Search Operations

### Simple Text Search

#### Access Search Interface
```bash
http://localhost:3000/search
```

#### Basic Search Steps
- [ ] Enter search terms in main search box
- [ ] Select search scope (all documents/specific project)
- [ ] Choose result limit (10, 25, 50, 100)
- [ ] Click "Search"

### Search Result Interpretation
- Relevance Score: 0.0-1.0 (higher = more relevant)
- Document Snippet: Highlighted matching text
- Metadata: Author, date, project, tags
- Chunk Information: Section/page where match found

## Advanced Search Features

### Semantic Search
```bash
# API endpoint for semantic search
curl -X POST http://localhost:3000/api/semantic-search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "machine learning algorithms for text analysis",
    "limit": 20,
    "threshold": 0.7
  }'
```

### Filtered Search

#### Filter Options
- [ ] Date range (from/to dates)
- [ ] Document type (PDF, transcript, code)
- [ ] Project association
- [ ] Author/source
- [ ] Tags and categories
- [ ] Relevance threshold

### Advanced Query Syntax
```bash
# Boolean operators
"machine learning" AND "neural networks"
"AI" OR "artificial intelligence"
"data science" NOT "statistics"

# Phrase search
"exact phrase match"

# Wildcard search
"comput*" (matches computer, computing, computation)
```

## Search Result Management

### Exporting Search Results

#### Export Options
- CSV format for analysis
- JSON format for API integration
- PDF report for sharing
- Markdown for documentation

#### Export Process
```bash
# Via web interface
Click "Export Results" → Select format → Download

# Via API
curl -X GET "http://localhost:3000/api/search/export?format=csv&query_id=12345"
```

### Saving Search Queries

#### Create Saved Search
- [ ] Name the search query
- [ ] Set up automatic alerts
- [ ] Schedule periodic execution
- [ ] Share with team members

### Search History Management
```bash
# View recent searches
curl http://localhost:3000/api/search-history

# Replay previous search
curl http://localhost:3000/api/search/replay/12345
```
