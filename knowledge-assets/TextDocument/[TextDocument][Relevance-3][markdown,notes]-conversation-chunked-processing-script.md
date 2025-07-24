# Chunked Processing Script for Large PDFs

**Source:** `/home/rosie/projects/fae-conversations/automation/run_chunked_processing.sh`

This script is designed to process large PDF files by chunking them, specifically targeting files that previously failed due to token limits. It activates a virtual environment, sets environment variables, and then runs a Python script for chunking.

## Usage

```bash
./run_chunked_processing.sh
```

## Configuration

- **`SCRIPT_DIR`**: Path to the directory where this script resides.
- **`PROCESSING_SCRIPT`**: Path to the main Python processing script (`processing-scripts/chunk_large_pdfs.py`).
- **`GCP_CREDENTIALS_FILE`**: Path to your Google Cloud Service Account JSON key file (e.g., `/home/rosie/.ssh/faeintelligence-firebase-adminsdk-5c9r7-9a6e9ba3e6.json`).
- **`GCP_PROJECT_ID`**: Your Google Cloud Project ID (e.g., `faeintelligence`).
- **`GCP_REGION`**: Your Google Cloud Region (e.g., `us-central1`).
- **`GEMINI_MODEL_NAME`**: The Gemini model to use for processing (e.g., `gemini-1.5-flash`).

## Key Actions Performed

- **Activates Virtual Environment:** Ensures necessary Python dependencies are available.
- **Sets Environment Variables:** Configures Google Cloud credentials and Gemini model.
- **Runs Chunking Processor:** Executes the `chunk_large_pdfs.py` script to perform the chunking and processing.

## Expected Output

- On success, it will indicate that large PDFs have been chunked and processed, and where to find the results.
- On failure, it will provide an exit code and prompt to check console output for details.
