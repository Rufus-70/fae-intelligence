# Projects JSON Processor Runner for Fae Intelligence

**Source:** `/home/rosie/projects/fae-conversations/automation/run_projects_processor.sh`

This script processes large `projects.json` files, performing intelligent chunking and business analysis to extract project-related information from conversation data.

## Usage

```bash
./run_projects_processor.sh <projects.json file path>
```

### Examples:
```bash
./run_projects_processor.sh /home/rosie/projects/fae-conversations/history/data-2025-06-22-20-16-45/projects.json
./run_projects_processor.sh ./projects.json
```

## Configuration

- **`SCRIPT_DIR`**: Directory containing the Python processor script (`processing-scripts/projects_json_processor.py`).
- **`CONFIG_FILE`**: Path to the main automation configuration file (`automation_config.json`).
- **`LOG_DIR`**: Directory for logs.

## Pre-flight Checks

The script performs checks to ensure:
- A file path is provided.
- The provided file exists and is a JSON file.
- The processor script exists.
- The configuration file exists.
- The `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set (warns if not).

## Key Actions Performed

- **File Validation:** Ensures the input is a valid JSON file.
- **Logging:** Creates a timestamped log file for each run.
- **Execution:** Runs the `projects_json_processor.py` script with the specified file and configuration.
- **Status Reporting:** Provides clear success or failure messages with log file location.

## Output

- Processed results are expected to be in `/home/rosie/projects/fae-conversations/processed/projects/`.
- Full log available at the generated log file path.
