# RAG System Log Rotation Script

**Source:** `/home/rosie/projects/rag-system-v2/scripts/maintenance/rotate_logs.sh`

This script automates the rotation, compression, and cleanup of log files for the RAG system, helping to manage disk space and maintain log hygiene.

## Usage

```bash
./scripts/maintenance/rotate_logs.sh
```

## Key Actions Performed

- **Delete old logs:** Deletes `.log` and `.log.*` files older than `RETENTION_DAYS` (default: 30 days) in the `logs/` directory.
- **Compress old logs:** Compresses `.log` files older than 7 days using `gzip`.

## Configuration

- `LOG_DIR`: The directory where log files are located (automatically determined relative to the script).
- `RETENTION_DAYS`: The number of days after which log files are deleted (default: 30).

## Important Notes

- This script is intended to be run periodically (e.g., via a cron job) to ensure continuous log management.
- Ensure the script has execute permissions (`chmod +x`).
