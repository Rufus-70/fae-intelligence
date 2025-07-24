# Autonomous Conversation Processor for Fae Intelligence

**Source:** `/home/rosie/projects/fae-conversations/automation/processing-scripts/autonomous_conversation_processor.py`

This Python script is the core of the Fae Intelligence conversation management system. It's an autonomous processor designed to handle conversation exports from multiple AI platforms, integrate with Google Gemini for summarization, and manage the overall processing pipeline.

## Key Features

- **Multi-Platform Processing:** Handles conversation exports from Claude, ChatGPT, Gemini, and Perplexity.
- **Gemini Integration:** Uses Google Gemini for summarizing conversations.
- **Configurable Processing Modes:** Supports `full_pipeline`, `analysis_only`, `knowledge_base_only`, and `status_check`.
- **Flexible Input:** Can process from configured data sources or an explicitly provided input path.
- **Error Handling & Logging:** Includes robust error handling and logs processing results.
- **Directory Management:** Ensures necessary output directories exist.

## Configuration (via `automation_config.json` and environment variables)

- `base_directory`: Base directory for conversation data.
- `raw_exports_dir`: Directory for raw conversation exports.
- `processed_dir`: Directory for processed summaries.
- `knowledge_base_dir`: Directory for the final knowledge base.
- `automation_dir`: Directory for automation scripts and configs.
- `log_dir`: Directory for processing logs.
- `gcp_project_id`: Google Cloud Project ID.
- `gcp_region`: Google Cloud Region.
- `gemini_model_name`: Gemini model to use for summarization.

## Usage

This script is typically run via the `run_autonomous_processing.sh` wrapper script, but can be executed directly:

```bash
python3 autonomous_conversation_processor.py --mode <mode> --config <config_file> [--priority <priority>] [--input-path <path>]
```

### Arguments:

- `--mode`: Processing mode (`full_pipeline`, `analysis_only`, `knowledge_base_only`, `status_check`).
- `--config`: Path to the automation configuration JSON file.
- `--priority`: (Optional) Processing priority (`high`, `medium`, `low`).
- `--input-path`: (Optional) Specific path to process, overriding configured data sources.

## Workflow

1.  **Initialization:** Loads configuration, sets up directories, and initializes the Gemini model.
2.  **File Processing:** Reads conversation files, summarizes them using Gemini, and saves the summaries.
3.  **Platform Iteration:** Iterates through configured or specified platforms, processing conversation files from each.
4.  **Status Check:** Provides a quick status overview of processed and raw files.
5.  **Results Logging:** Saves detailed processing results to a JSON log file.

## Dependencies

- `vertexai` library for Google Gemini integration.
- `json` for configuration parsing.
- `pathlib` for path manipulation.
