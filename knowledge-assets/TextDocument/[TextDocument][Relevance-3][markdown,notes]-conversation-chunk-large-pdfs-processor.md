# Large PDF Chunking Script for Fae Intelligence

**Source:** `/home/rosie/projects/fae-conversations/automation/processing-scripts/chunk_large_pdfs.py`

This Python script is a dedicated processor for chunking and summarizing large PDF files that exceed LLM token limits. It uses Google's Vertex AI (Gemini model) to summarize individual chunks and then create a master summary.

## Key Features

- **Large File Handling:** Designed to process PDF files that are too large for direct LLM summarization.
- **Intelligent Chunking:** Splits large text into smaller, manageable chunks based on character limits.
- **LLM Summarization:** Utilizes Google Gemini (`gemini-2.0-flash-001`) to summarize each chunk and then synthesize a master summary from these individual summaries.
- **Output Management:** Saves master summaries and individual chunk content to organized directories.
- **Error Handling:** Includes mechanisms to report errors during file reading or LLM processing.

## Configuration (within script and via `automation_config.json`)

- `gcp_project_id`: Google Cloud Project ID (e.g., `faeintelligence`).
- `gcp_region`: Google Cloud Region (e.g., `us-central1`).
- `gemini_model_name`: Gemini model to use (e.g., `gemini-2.0-flash-001`).
- `max_tokens`: Conservative token limit for chunks (e.g., `800000`).
- `chars_per_token`: Rough estimate for character-to-token conversion (e.g., `4`).
- `base_dir`: Base directory for conversation data (e.g., `/home/rosie/projects/fae-conversations`).
- `processed_dir`: Directory for processed summaries.
- `log_dir`: Directory for processing logs.
- `failed_files`: List of specific PDF filenames to process (hardcoded for problem files).
- `input_dir`: Directory where the problem files are located (e.g., `/home/rosie/projects/fae-conversations/raw-exports/perplexity`).

## Usage

This script is intended to be run directly as a Python script.

```bash
python3 chunk_large_pdfs.py
```

## Workflow

1.  **Initialization:** Loads configuration, sets up Vertex AI, and initializes the Gemini model.
2.  **File Reading:** Reads the content of the specified large PDF files.
3.  **Chunking:** Splits the file content into smaller chunks based on character limits.
4.  **Chunk Summarization:** Iterates through each chunk, sends it to the Gemini model for summarization, and collects the results.
5.  **Master Summary Generation:** Combines all chunk summaries and sends them to Gemini to create a comprehensive master summary.
6.  **Results Saving:** Saves the master summary and individual chunks to designated output directories.
7.  **Logging:** Records processing results and any errors to a JSON log file.

## Dependencies

- `vertexai` library for Google Gemini integration.
- `json` for configuration parsing.
- `pathlib` for path manipulation.
