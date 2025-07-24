# Autonomous Conversation Processing Execution Script

**Source:** `/home/rosie/projects/fae-conversations/automation/run_autonomous_processing.sh`

This script orchestrates the autonomous processing of Fae Intelligence conversations, enabling data extraction, analysis, and knowledge base generation. It supports various modes and priorities for flexible execution.

## Usage

```bash
./run_autonomous_processing.sh {full|analysis|knowledge|status|emergency} [priority] [--input-path <path>]
```

### Commands:

- `full`: Run complete processing pipeline (default priority: medium)
- `analysis`: Run analysis only (no knowledge base generation)
- `knowledge`: Generate knowledge base from existing processed data
- `status`: Check current processing status
- `emergency`: Run high-priority, full pipeline emergency processing

### Priority Levels:
- `high`, `medium`, `low` (used with `full`, `analysis`, `knowledge`)

### Options:
- `--input-path <path>`: Optional. Specify a direct path to process, overriding config `data_sources`.

### Examples:
```bash
./run_autonomous_processing.sh full high --input-path /home/rosie/my_new_data/  # Full pipeline from a specific directory
./run_autonomous_processing.sh analysis --input-path /home/rosie/projects/fae-conversations/raw-exports/gemini/
./run_autonomous_processing.sh status
```

## Configuration

- **`SCRIPT_DIR`**: Path to the directory where this script resides.
- **`PROCESSING_SCRIPT`**: Path to the main Python processing script (`processing-scripts/autonomous_conversation_processor.py`).
- **`CONFIG_FILE`**: Path to the main automation configuration file (`automation_config.json`).
- **`LOG_DIR`**: Directory for logs (`logs/`).
- **`GCP_CREDENTIALS_FILE`**: Path to your Google Cloud Service Account JSON key file (e.g., `/home/rosie/gcp-service-accounts/faeintelligence-3694435137e5.json`).
- **`VENV_PYTHON_EXEC`**: Path to your Python Virtual Environment's Python interpreter (e.g., `/home/rosie/projects/mcp-servers/.venv/bin/python3`).

## Pre-flight Checks

The script performs checks to ensure:
- The main processing script exists.
- The configuration file exists.
- The GCP credentials file exists.
- The virtual environment Python executable exists.
- The specified input path (if any) exists and is a directory.
- The log directory exists (creates it if not).

## Execution Logic

- Sets `GOOGLE_APPLICATION_CREDENTIALS` environment variable for the Python script.
- Constructs arguments for the Python script based on the provided mode, priority, and input path.
- Executes the Python script using the explicit virtual environment Python executable.
- Logs the processing status (SUCCESS/FAILED) and exit code.

## Debugging Information

The script includes debugging output for:
- Current working directory.
- Value of `PROCESSING_SCRIPT`.
- Used Python executable.
- Python import test for `vertexai` and `GenerativeModel`.
