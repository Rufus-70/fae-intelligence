# Simplified Large PDF Chunking Script

**Source:** `/home/rosie/projects/fae-conversations/automation/simple_chunk_processor.py`

This Python script is a simplified processor for chunking and summarizing large PDF files using Google's Vertex AI (Gemini model). It's designed to handle files that exceed typical token limits by splitting them into smaller chunks, summarizing each chunk, and then creating a master summary.

## Key Features

- **Chunking Strategy:** Simple character-based chunking to manage large file sizes.
- **LLM Integration:** Uses `gemini-2.0-flash-001` for summarizing individual chunks and creating a master summary.
- **Local File Processing:** Reads PDF content from a specified local directory.
- **Output:** Saves chunked summaries and a master summary to a text file.
- **Error Handling:** Includes basic error handling for file reading and Gemini API calls.

## Configuration (within script)

- `project_id`: "faeintelligence"
- `region`: "us-central1"
- `model_name`: "gemini-2.0-flash-001"
- `max_chars`: `800000 * 4` (conservative token limit for chunking)
- `input_dir`: `/home/rosie/projects/fae-conversations/raw-exports/perplexity` (hardcoded for problem files)
- `output_dir`: `base_dir / "processed" / "summaries" / "perplexity"`

## Usage

This script is intended to be run directly as a Python script. It contains hardcoded paths and file names for specific problem files.

```bash
python3 simple_chunk_processor.py
```

## Workflow

1.  **Initialization:** Sets up Vertex AI with specified project and region.
2.  **File Reading:** Reads the content of large PDF files.
3.  **Chunking:** Splits the file content into smaller, manageable chunks based on `max_chars`.
4.  **Chunk Summarization:** Iterates through each chunk, sends it to the Gemini model for summarization, and collects the results.
5.  **Master Summary Generation:** Combines all chunk summaries and sends them to Gemini to create a comprehensive master summary.
6.  **Results Saving:** Saves the master summary and individual chunk summaries to a text file in the specified output directory.
7.  **Logging:** Records processing results and any errors to a JSON log file.

## Limitations

- Hardcoded file paths and problem files. Not a general-purpose chunking tool.
- Simple chunking strategy may not be optimal for all document types.
- Relies on external Vertex AI service for summarization.
