# RAG Project Organization Workflow

**Source:** `/home/rosie/projects/_rag-system/rag_work_instructions.md`

## Document Tagging and Categorization

### Tagging Best Practices

#### Hierarchical Tag Structure
- Level 1: Domain (research, business, technical)
- Level 2: Subdomain (ml, finance, frontend)
- Level 3: Specific (tensorflow, accounting, react)

#### Tag Management Commands
```bash
# Add tags to document
curl -X POST http://localhost:3000/api/documents/123/tags \
  -d '{"tags": ["research", "ml", "tensorflow"]}'

# Bulk tag update
curl -X POST http://localhost:3000/api/bulk-tag \
  -d '{"document_ids": [123, 124, 125], "tags": ["Q1-2024"]}'
```

### Category Management

#### Create Document Categories
- [ ] Research Papers
- [ ] Meeting Transcripts
- [ ] Code Documentation
- [ ] Business Reports
- [ ] Training Materials

#### Auto-Categorization Rules
```json
{
  "rules": [
    {
      "condition": "file_extension == 'pdf' AND contains('abstract')",
      "category": "research_paper"
    },
    {
      "condition": "file_name contains 'meeting' OR contains('transcript')",
      "category": "meeting_transcript"
    }
  ]
}
```

## Project Collections

### Creating Project Collections

#### New Project Setup
```bash
# Create new project via API
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Q1-2024-AI-Research",
    "description": "First quarter AI research initiative",
    "start_date": "2024-01-01",
    "end_date": "2024-03-31",
    "tags": ["research", "ai", "q1-2024"]
  }'
```

### Project Organization Structure
```
Project: Q1-2024-AI-Research
├── Documents/
│   ├── Research Papers (15 docs)
│   ├── Meeting Notes (8 docs)
│   └── Code Samples (12 docs)
├── Tags: [research, ai, q1-2024]
└── Collaborators: [user1, user2, user3]
```

### Managing Project Membership
```bash
# Add documents to project
curl -X POST http://localhost:3000/api/projects/123/documents \
  -d '{"document_ids": [456, 789, 101]}'

# Remove documents from project
curl -X DELETE http://localhost:3000/api/projects/123/documents/456

# List project documents
curl http://localhost:3000/api/projects/123/documents
```

## Version Control and Metadata Management

### Document Version Tracking

#### Version Control Workflow
- [ ] Upload new version with version tag
- [ ] Maintain version history
- [ ] Track changes and updates
- [ ] Link related versions

#### Version Management Commands
```bash
# Upload new version
curl -X POST http://localhost:3000/api/documents/123/versions \
  -F "file=@document_v2.pdf" \
  -F "version=2.0" \
  -F "changes=Updated analysis section"

# Get version history
curl http://localhost:3000/api/documents/123/versions
```

### Metadata Standards
```json
{
  "document_id": "doc_123",
  "title": "AI Research Findings Q1 2024",
  "version": "2.1",
  "author": "Research Team",
  "created_date": "2024-01-15T10:30:00Z",
  "modified_date": "2024-01-20T14:45:00Z",
  "project": "Q1-2024-AI-Research",
  "tags": ["research", "ai", "findings", "q1-2024"],
  "status": "final",
  "confidentiality": "internal",
  "file_type": "pdf",
  "file_size": 2048576,
  "page_count": 25,
  "language": "en",
  "checksum": "sha256:abc123..."
}
```
