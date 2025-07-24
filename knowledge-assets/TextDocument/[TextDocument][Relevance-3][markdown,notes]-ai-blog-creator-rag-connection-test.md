# AI Blog Creator - RAG Connection Test Script

**Source:** `/home/rosie/projects/ai-blog-creator-v2/test_rag_connection.py`

This Python script is a simple utility for verifying the connection and basic functionality of the `rag-system-v2` backend from the perspective of the AI Blog Creator. It sends a sample query to the `/chat_bot` endpoint and checks the response.

## Configuration

- `RAG_SYSTEM_URL`: The base URL of your `rag-system-v2` backend (default: `http://localhost:8000`).
- `NEO4J_URI`: Neo4j connection URI (default: `bolt://localhost:7687`).
- `NEO4J_USERNAME`: Neo4j username (default: `neo4j`).
- `NEO4J_PASSWORD`: Neo4j password (default: `password`).
- `NEO4J_DATABASE`: Neo4j database name (default: `neo4j`).

## Usage

To run the connection test, execute the script directly:

```bash
python3 test_rag_connection.py
```

## Expected Output

- **Successful Connection:**
  ```
  Attempting to connect to rag-system-v2...
  Connection successful!
  Response Status Code: 200
  Response Body: {'status': 'Success', ...}
  rag-system-v2 returned a successful response.
  ```
- **Connection Error:**
  ```
  Error: Could not connect to rag-system-v2 at http://localhost:8000. Is the server running?
  Details: ...
  ```
- **HTTP Error:**
  ```
  HTTP Error: 404 - Not Found
  ```
- **JSON Decode Error:**
  ```
  Error: Could not decode JSON response. Raw response: ...
  ```

## Functionality

- Sends a `POST` request to the `/chat_bot` endpoint with sample Neo4j credentials and a test question.
- Checks the HTTP status code and the `status` field in the JSON response.
- Provides informative messages for various connection and response errors.

## Dependencies

- `requests` library for making HTTP requests.
- `json` for handling JSON responses.
