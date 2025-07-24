# RAG Document Management Workflow

**Source:** `/home/rosie/projects/_rag-system/rag_work_instructions.md`

## Document Upload Procedures

### Supported File Types
- Text Documents: .txt, .md, .rtf
- PDFs: .pdf (text-based and scanned with OCR)
- Office Documents: .docx, .xlsx, .pptx
- Google Docs: Via export or API integration
- Code Files: .py, .js, .java, .cpp, etc.
- Transcripts: .srt, .vtt, .txt
- Structured Data: .json, .csv, .xml

### Single Document Upload Process

#### Access Web Interface
```bash
# Open browser to web interface
http://localhost:3000/upload
```

#### Upload Steps
- [ ] Click "Upload Document" button
- [ ] Select file from local system
- [ ] Add document metadata:
    - Title (auto-filled from filename)
    - Description
    - Tags/Categories
    - Project association
    - Author/Source
- [ ] Choose processing options:
    - Text extraction method
    - Chunking strategy
    - Embedding model
- [ ] Click "Process Document"

### Batch Upload Process

#### Prepare Batch Directory
```bash
# Create organized directory structure
mkdir -p /data/batch_upload/2024-01-15
cd /data/batch_upload/2024-01-15

# Organize by document type
mkdir pdfs transcripts code research
```

#### Batch Processing Command
```bash
# Use batch processing script
docker exec rag-processor python batch_ingest.py \
  --input-dir /data/batch_upload/2024-01-15 \
  --project "Q1-2024-Research" \
  --tags "quarterly,research,analysis"
```

#### Monitor Batch Progress
```bash
# Watch processing logs
docker logs -f rag-processor

# Check processing status via API
curl http://localhost:3000/api/batch-status
```

## Document Type-Specific Workflows

### PDF Documents

#### Pre-Processing Checks
- [ ] Verify PDF is not password-protected
- [ ] Check if text-based or requires OCR
- [ ] Validate file size (<50MB recommended)

#### Processing Options
```bash
# For text-based PDFs
--extraction-method text

# For scanned PDFs (OCR required)
--extraction-method ocr --ocr-language en
```

### Video Transcripts

#### Transcript Preparation
- [ ] Ensure timestamps are included
- [ ] Verify speaker identification
- [ ] Check for formatting consistency

#### Metadata Requirements
- Video title and date
- Speaker names and roles
- Meeting/event context
- Duration and key topics

### Research Papers

#### Academic Document Workflow
- [ ] Extract abstract and keywords
- [ ] Identify authors and institutions
- [ ] Note publication date and journal
- [ ] Tag by research domain

#### Citation Tracking
```bash
# Enable citation extraction
--extract-citations true
--citation-format apa
```

## Document Organization Best Practices

### Naming Conventions
Format: YYYY-MM-DD_DocumentType_ProjectCode_Version
Examples:
- 2024-01-15_Research_PROJ001_v1.pdf
- 2024-01-15_Transcript_MEET002_final.txt
- 2024-01-15_Code_REPO001_main.py

### Tagging Strategy
- Project Tags: PROJ001, PROJ002, etc.
- Content Tags: research, meeting, code, analysis
- Priority Tags: high, medium, low
- Status Tags: draft, review, final, archived

### Metadata Standards
```json
{
  "title": "Document Title",
  "author": "Author Name",
  "date_created": "2024-01-15",
  "project": "PROJ001",
  "tags": ["research", "analysis", "high"],
  "version": "1.0",
  "source": "internal/external",
  "confidentiality": "public/internal/confidential"
}
```