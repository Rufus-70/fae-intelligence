# RAG Frontend API Interactions

**Source:** `/home/rosie/projects/rag-system-v2/docs/frontend/frontend_docs.adoc`

This document outlines the key API endpoints that the RAG system's frontend interacts with, providing details on their purpose and parameters.

## Connection Modal

### `POST /connect`

Neo4j database connection on frontend is done with this API.

**Parameters:** `uri`, `userName`, `password`, `database`

## Backend Database Connection

### `POST /backend_connection_configuation`

The API responsible for creating the connection object from Neo4j DB based on environment variables and returning the status for show/hide login dialog on UI.

**Parameters:** (None explicitly listed, implies configuration-based)

## Upload Files from Local

### `POST /upload`

The upload endpoint is designed to handle the uploading of large files by breaking them into smaller chunks.

**Parameters:** `file`, `chunkNumber`, `totalChunks`, `originalname`, `model`, `uri`, `userName`, `password`, `database`

## User Defined Schema

### `POST /schema`

User can set schema for graph generation (i.e. Nodes and relationship labels) in settings panel or get existing db schema through this API.

**Parameters:** `uri`, `userName`, `password`, `database`

## Graph Schema from Input Text

### `POST /populate_graph_schema`

The API is used to populate a graph schema based on the provided input text, model, and schema description flag.

**Parameters:** `input_text`, `model`, `is_schema_description_checked`

## Unstructured Sources

### `POST /url/scan`

Create Document node for other sources - s3 bucket, gcs bucket, wikipedia, youtube url and web pages.

**Parameters:** `uri`, `userName`, `password`, `database`, `model`, `source_url`, `aws_access_key_id`, `aws_secret_access_key`, `wiki_query`, `gcs_project_id`, `gcs_bucket_name`, `gcs_bucket_folder`, `source_type`, `access_token`

## Extraction of Nodes and Relations from Data

### `POST /extract`

This API is responsible for reading the content of source, dividing it into multiple chunks, extracting nodes and relations, updating embeddings, and creating vector indexes.

**Parameters:** `uri`, `userName`, `password`, `database`, `model`, `file_name`, `source_url`, `aws_access_key_id`, `aws_secret_access_key`, `wiki_query`, `gcs_project_id`, `gcs_bucket_name`, `gcs_bucket_folder`, `gcs_blob_filename`, `source_type`, `allowedNodes`, `allowedRelationship`, `language`

## Get List of Sources

### `GET /sources_list`

List all sources (Document nodes) present in Neo4j graph database.

**Parameters:** `uri`, `userName`, `password`, `database`

## Post Processing After Graph Generation

### `POST /post_processing`

This API is called at the end of processing of whole document to get create k-nearest neighbor relations between similar chunks of document and to drop and create a full text index on db labels.

**Parameters:** `uri`, `userName`, `password`, `database`, `tasks`

## Chat with Data

### `POST /chat_bot`

This API provides a chatbot system designed to leverage multiple AI models and a Neo4j graph database, providing answers to user queries.

**Parameters:** `uri`, `userName`, `password`, `model`, `question`, `session_id`

## Get Entities from Chunks

### `POST /chunk_entities`

This API is used to get the entities and relations associated with a particular chunk and chunk metadata.

**Parameters:** `uri`, `userName`, `password`, `database`, `chunk_ids`

## Clear Chat History

### `POST /clear_chat_bot`

This API is used to clear the chat history which is saved in Neo4j DB.

**Parameters:** `uri`, `userName`, `password`, `database`, `session_id`

## View Graph for a File

### `POST /graph_query`

This API is used to view graph for a particular file.

**Parameters:** `uri`, `userName`, `password`, `query_type`, `document_names`

## Get Neighbour Nodes

### `POST /get_neighbours`

This API is used to retrieve the neighbor nodes of the given element id of the node.

**Parameters:** `uri`, `userName`, `password`, `database`, `elementId`

## SSE Event to Update Processing Status

### `GET /update_extract_status`

The API provides a continuous update on the extraction status of a specified file. It uses Server-Sent Events (SSE) to stream updates to the client.

**Parameters:** `file_name`, `uri`, `userName`, `password`, `database`

## Document Status

### `GET /document_status`

The API gives the extraction status of a specified file. It uses Server-Sent Events (SSE) to stream updates to the client.

**Parameters:** `file_name`, `uri`, `userName`, `password`, `database`

## Delete Selected Documents

### `POST /delete_document_and_entities`

Deletion of nodes and relations for multiple files is done through this API.

**Parameters:** `uri`, `userName`, `password`, `database`, `filenames`, `source_types`, `deleteEntities`

## Cancel Processing Job

### `POST /cancelled_job`

This API is responsible for cancelling an in process job.

**Parameters:** `uri`, `userName`, `password`, `database`, `filenames`, `source_types`

## Deletion of Orphan Nodes

### `POST /delete_unconnected_nodes`

The API is used to delete unconnected entities from database.

**Parameters:** `uri`, `userName`, `password`, `database`, `unconnected_entities_list`

## Get the List of Orphan Nodes

### `POST /get_unconnected_nodes_list`

The API retrieves a list of nodes in the graph database that are not connected to any other nodes.

**Parameters:** `uri`, `userName`, `password`, `database`

## Get Duplicate Nodes

### `POST /get_duplicate_nodes`

The API is used to fetch duplicate entities from database.

**Parameters:** `uri`, `userName`, `password`, `database`

## Merge Duplicate Nodes

### `POST /merge_duplicate_nodes`

The API is used to merge duplicate entities from database selected by user.

**Parameters:** `uri`, `userName`, `password`, `database`, `duplicate_nodes_list`

## Drop and Create Vector Index

### `POST /drop_create_vector_index`

The API is used to drop and create the vector index when vector index dimensions are different.

**Parameters:** `uri`, `userName`, `password`, `database`, `isVectorIndexExist`

## Reprocessing of Sources

### `POST /retry_processing`

This API is used to Ready to Reprocess cancelled, completed or failed file sources.

**Parameters:** `uri`, `userName`, `password`, `database`, `file_name`, `retry_condition`

