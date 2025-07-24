# System Startup Guide

This guide provides the step-by-step commands to start the entire Fae Intelligence system and begin processing documents.

---

### Step 1: Start the Core System (Backend, Database, Frontend)

These services run in Docker. You only need to do this once after starting your computer.

1.  **Navigate to the correct directory:**

    ```bash
    cd /home/rosie/projects/rag-system-v2/
    ```

2.  **Start all services in the background:**

    ```bash
    docker-compose up -d
    ```

    *This command reads the `docker-compose.yml` file and starts the `backend`, `frontend`, and `database` containers. The `-d` flag runs them in the background so your terminal is free to use.*

---

### Step 2: Process New Documents

Once the core system is running, you can process new documents.

1.  **Navigate to the data processing directory:**

    ```bash
    cd /home/rosie/projects/fae-intelligence-data/
    ```

2.  **Activate the Python virtual environment:**

    ```bash
    source neo4j_ingest_venv/bin/activate
    ```

    *This command activates the specific Python environment that has the necessary libraries (`requests`, etc.) to run your scripts.*

3.  **Run the batch processing script:**

    ```bash
    python3 batch_process_documents.py
    ```

    *This will find up to 5 new documents in the directory and process them into the Neo4j database.*

---

### Summary of Commands

```bash
# From any directory, first start the services
cd /home/rosie/projects/rag-system-v2/
docker-compose up -d

# Then, from any directory, run the processing script
cd /home/rosie/projects/fae-intelligence-data/
source neo4j_ingest_venv/bin/activate
python3 batch_process_documents.py
```
