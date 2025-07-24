# Projects JSON Processor for Fae Intelligence

**Source:** `/home/rosie/projects/fae-conversations/automation/processing-scripts/projects_json_processor.py`

This Python script is a specialized processor for large `projects.json` files, designed to extract business intelligence from Claude project data. It includes intelligent chunking, detailed analysis of project structure, and generation of comprehensive master business intelligence reports using Gemini.

## Key Features

- **Intelligent Chunking:** Chunks large JSON files while preserving project integrity, splitting individual projects if necessary.
- **Business Intelligence Extraction:** Analyzes project data to identify key themes, strategic patterns, technology usage, client engagement, and operational efficiency indicators.
- **LLM Integration:** Uses Google Gemini (`gemini-2.0-flash-001`) for detailed analysis of project chunks and synthesis of a master report.
- **Structured Output:** Generates comprehensive Markdown reports with executive summaries, portfolio analysis, technology insights, business development opportunities, operational recommendations, and risk assessments.
- **Data Structure Analysis:** Provides an overview of the JSON data structure, including total projects, date ranges, and conversation counts.

## Configuration (via `automation_config.json` and environment variables)

- `base_directory`: Base directory for conversation data.
- `processed_dir`: Directory for processed project analyses.
- `log_dir`: Directory for processing logs.
- `gcp_project_id`: Google Cloud Project ID.
- `gcp_region`: Google Cloud Region.
- `gemini_model_name`: Gemini model to use for analysis.
- `max_tokens`: Conservative token limit for chunking.
- `chars_per_token`: Rough estimate for character-to-token conversion.

## Usage

This script is typically run via the `run_projects_processor.sh` wrapper script, but can be executed directly:

```bash
python3 projects_json_processor.py <file_path> --config <config_file>
```

### Arguments:

- `file_path`: Path to the `projects.json` file to process.
- `--config`: Path to the automation configuration JSON file.

## Workflow

1.  **Initialization:** Loads configuration, sets up directories, and initializes the Gemini model.
2.  **JSON Loading & Analysis:** Reads and parses the `projects.json` file, then performs an initial structural analysis.
3.  **Intelligent Chunking:** Chunks the project data based on size, ensuring related project information stays together.
4.  **Chunk Analysis:** Each chunk is sent to the Gemini model for detailed business intelligence analysis.
5.  **Master Report Generation:** All chunk analyses are synthesized by Gemini into a comprehensive master business intelligence report.
6.  **Results Saving:** The master report and individual chunk data are saved to the `processed/projects/` directory.
7.  **Logging:** Records processing results and any errors.

## Dependencies

- `vertexai` library for Google Gemini integration.
- `json` for JSON parsing and manipulation.
- `pathlib` for path manipulation.
- `argparse` for command-line argument parsing.
