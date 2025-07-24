# RAG System Setup Script

**Source:** `/home/rosie/projects/rag-system-v2/scripts/setup_system.sh`

This script automates the setup of the RAG system's directory structure, creates essential configuration files, and sets up basic monitoring and maintenance scripts.

## Usage

```bash
./scripts/setup_system.sh [--systemd]
```

*   `--systemd`: Create systemd service file (requires root).

## Key Actions Performed

### 1. Directory Structure Creation

Creates the following directories:

*   **Data:** `data/neo4j/data`, `data/neo4j/logs`, `data/neo4j/import`, `data/neo4j/plugins`, `data/chroma`, `data/sessions`
*   **Configuration:** `config/nginx`, `config/nginx/conf.d`, `config/chroma`, `config/neo4j`, `config/web`, `config/processor`, `config/mcp`, `config/fluentd`, `config/backup`, `config/ssl`
*   **Logs:** `logs/nginx`, `logs/web`, `logs/processor`, `logs/mcp`, `logs/neo4j`, `logs/chroma`, `logs/fluentd`
*   **Backups:** `backups/neo4j`, `backups/chroma`, `backups/documents`, `backups/emergency`
*   **Cache & Temporary:** `cache/nginx`, `temp/processing`, `temp/uploads`
*   **Scripts:** `scripts/backup`, `scripts/monitoring`, `scripts/maintenance`

### 2. Configuration File Creation

Creates default configuration files:

*   `config/neo4j/neo4j.conf`: Neo4j database configuration.
*   `config/chroma/chroma.conf`: Chroma database configuration.
*   `config/fluentd/fluent.conf`: Fluentd logging configuration.
*   `.env.template`: Environment variable template for the RAG system.
*   `.dockerignore`: Docker ignore file.

### 3. Basic Monitoring Script Creation

Creates `scripts/monitoring/health_check.sh` for basic system health checks.

### 4. Maintenance Script Creation

Creates:

*   `scripts/maintenance/rotate_logs.sh`: Script for log rotation.
*   `scripts/maintenance/cleanup.sh`: Script for system cleanup.

### 5. Permissions Setup

Sets appropriate permissions for directories and scripts.

### 6. Systemd Service Creation (Optional)

Can create a `systemd` service file (`/etc/systemd/system/rag-system.service`) for managing the RAG system as a service.

## Next Steps After Running Setup

1.  **Copy `.env.template` to `.env` and configure your settings:**
    ```bash
    cp .env.template .env
    nano .env
    ```
2.  **Review and customize configuration files in `config/`**
3.  **Make scripts executable:**
    ```bash
    chmod +x scripts/graceful_shutdown.sh
    chmod +x scripts/monitoring/health_check.sh
    ```
4.  **Start the system:**
    ```bash
    docker-compose up -d
    ```
5.  **Check system health:**
    ```bash
    ./scripts/monitoring/health_check.sh
    ```
6.  **Access the system:**
    *   Web Interface: `http://localhost`
    *   Neo4j Browser: `http://localhost:7474`
    *   Chroma API: `http://localhost:8000`

## Important Security Notes

- Change all default passwords in `.env`
- Generate new `SECRET_KEY` for production
- Configure SSL certificates for HTTPS
- Review firewall settings
