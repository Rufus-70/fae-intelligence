# Smart PDF Processor for Problem Files

**Source:** `/home/rosie/projects/fae-conversations/automation/smart_pdf_processor.py`

This Python script is a "smart" PDF processor that attempts regular summarization first and falls back to a chunked approach if the initial attempt fails (e.g., due to token limits). It uses Google's Vertex AI (Gemini model) for summarization and is designed to handle specific "problem files."

## Key Features

- **Adaptive Processing:** Tries full document summarization first, then falls back to chunked processing if needed.
- **LLM Integration:** Uses `gemini-1.5-flash` for summarization.
- **Chunking Strategy:** For fallback, it uses a more conservative chunking method, splitting by paragraphs and then by character limit.
- **Local File Processing:** Reads PDF content from a specified local directory.
- **Output:** Saves summaries (master and chunk-level) to text files.
- **Error Handling:** Includes error handling for file reading and Gemini API calls.

## Configuration (within script)

- `project_id`: "faeintelligence"
- `region`: "us-central1"
- `model_name`: "gemini-1.5-flash"
- `problem_files`: List of specific PDF filenames to process.
- `input_dir`: `/home/rosie/projects/fae-conversations/raw-exports/perplexity` (hardcoded for problem files).
- `output_dir`: `/home/rosie/projects/fae-conversations/processed/summaries/perplexity`.

## Usage

This script is intended to be run directly as a Python script.

```bash
python3 smart_pdf_processor.py
```

## Workflow

1.  **Initialization:** Sets up Vertex AI with specified project and region.
2.  **File Reading:** Reads the content of the target PDF file.
3.  **Initial Summarization Attempt:** Tries to summarize the entire document using the Gemini model.
4.  **Fallback Chunked Processing (if initial fails):**
    *   Splits the document into smaller chunks (more conservatively than `simple_chunk_processor.py`).
    *   Summarizes each chunk using the Gemini model.
    *   Creates a master summary from the chunk summaries.
5.  **Results Saving:** Saves the generated summary (or master summary) to a text file.
6.  **Logging:** Records processing results and any errors to a JSON log file.

## Limitations

- Hardcoded file paths and problem files. Not a general-purpose PDF processor.
- Relies on external Vertex AI service for summarization.
