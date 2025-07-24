# RAG System Cleanup Script

**Source:** `/home/rosie/projects/rag-system-v2/scripts/maintenance/cleanup.sh`

This script automates the cleanup of various temporary and old files, as well as Docker resources, to maintain system hygiene and free up disk space.

## Usage

```bash
./scripts/maintenance/cleanup.sh
```

## Key Actions Performed

- **Clean up temporary files:** Deletes files older than 1 day in the `temp/` directory.
- **Clean up old cache files:** Deletes files older than 7 days in the `cache/` directory.
- **Clean up Docker:** Executes `docker system prune -f` (removes all stopped containers, unused networks, dangling images, and build cache) and `docker volume prune -f` (removes all unused local volumes).
- **Clean up old backups:** Deletes backup files older than 30 days in the `backups/` directory.

## Important Notes

- This script performs aggressive cleanup of Docker resources. Ensure you understand the implications before running it, especially `docker system prune -f` and `docker volume prune -f`.
- It's recommended to back up any critical data before running this script.
