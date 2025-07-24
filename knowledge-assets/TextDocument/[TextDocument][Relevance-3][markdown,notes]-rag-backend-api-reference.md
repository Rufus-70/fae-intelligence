# RAG Backend API Reference

**Source:** `/home/rosie/projects/rag-system-v2/docs/backend/backend_docs.adoc`

This document outlines the key API endpoints for the RAG system's backend, providing details on their purpose and parameters.

## Connect to Neo4j Graph Database

### `POST /connect`

This API is used to authenticate and connect the frontend to the backend using Neo4j database credentials.

**Parameters:** `uri`, `userName`, `password`, `database`, `email`

## Upload Files from Local

### `POST /upload`

This API handles the uploading of large files by breaking them into smaller chunks.

**Parameters:** `file`, `chunkNumber`, `totalChunks`, `originalname`, `model`, `uri`, `userName`, `password`, `database`, `email`

## User Defined Schema

### `POST /schema`

This API gets the labels and relationships from existing Neo4j database data. Users can set the schema for graph generation (i.e., nodes and relationship labels) in the settings panel.

**Parameters:** `uri`, `userName`, `password`, `database`, `email`

## Graph Schema from Input Text

### `POST /populate_graph_schema`

The API is used to populate a graph schema based on the provided input text, model, and schema description flag.

**Parameters:** `input_text`, `model`, `is_schema_description_checked`, `is_local_storage`, `email`

## Unstructured Sources Scan (Other than Local)

### `POST /url/scan`

This API creates Document source nodes for all supported sources, including S3 buckets, GCS buckets, Wikipedia, web pages, YouTube videos, and local files.

**Parameters:** `uri`, `userName`, `password`, `database`, `model`, `source_url`, `aws_access_key_id`, `aws_secret_access_key`, `wiki_query`, `gcs_project_id`, `gcs_bucket_name`, `gcs_bucket_folder`, `source_type`, `access_token`, `email`

## Extraction of Nodes and Relations from Content

### `POST /extract`

This API is responsible for reading content, dividing it into chunks, extracting nodes and relations, updating embeddings, and creating vector indexes.

**Parameters:** `uri`, `userName`, `password`, `database`, `model`, `file_name`, `source_url`, `aws_access_key_id`, `aws_secret_access_key`, `wiki_query`, `gcs_project_id`, `gcs_bucket_name`, `gcs_bucket_folder`, `gcs_blob_filename`, `source_type`, `allowedNodes`, `allowedRelationship`, `token_chunk_size`, `chunk_overlap`, `chunks_to_combine`, `language`, `retry_condition`, `additional_instructions`, `email`

## Get List of Sources

### `POST /sources_list`

List all sources (Document nodes) present in Neo4j graph database.

**Parameters:** `uri`, `userName`, `password`, `database`, `email`

## Post Processing After Graph Generation

### `POST /post_processing`

This API is called at the end of document processing to create k-nearest neighbor relationships, compute community clusters, generate community summaries, and recreate a full-text index.

**Parameters:** `uri`, `userName`, `password`, `database`, `tasks`, `email`

## Chat with Data

### `POST /chat_bot`

This API provides a chatbot system leveraging multiple AI models and a Neo4j graph database to answer user queries.

**Parameters:** `uri`, `userName`, `password`, `model`, `question`, `session_id`, `mode`, `document_names`, `email`

## Get Entities from Chunks

### `/chunk_entities`

This API is used to get the entities and relations associated with a particular chunk and chunk metadata.

**Parameters:** `uri`, `userName`, `password`, `database`, `nodedetails`, `entities`, `email`

## View Graph for a File

### `POST /graph_query`

This API is used to visualize graphs for a particular document or list of multiple documents.

**Parameters:** `uri`, `userName`, `password`, `database`, `document_names`, `email`

## Get Neighbour Nodes

### `POST /get_neighbours`

This API is used to get the nearby nodes and relationships based on the element id of the node for graph visualization of details of specific nodes.

**Parameters:** `uri`, `userName`, `password`, `database`, `elementId`, `email`

## Clear Chat History

### `POST /clear_chat_bot`

This API is used to clear the chat history which is saved in Neo4j DB.

**Parameters:** `uri`, `userName`, `password`, `database`, `session_id`, `email`

## SSE Event to Update Processing Status

### `GET /update_extract_status`

The API provides a continuous update on the extraction status of a specified file. It uses Server-Sent Events (SSE) to stream updates to the client.

**Parameters:** `file_name`, `uri`, `userName`, `password`, `database`

## Delete Selected Documents

### `POST /delete_document_and_entities`

Deletion of nodes and relations for multiple files is done through this API.

**Parameters:** `uri`, `userName`, `password`, `database`, `filenames`, `source_types`, `deleteEntities`, `email`

## Cancel Processing Job

### `/cancelled_job`

This API is responsible for cancelling an in process job.

**Parameters:** `uri`, `userName`, `password`, `database`, `filenames`, `source_types`, `email`

## Get the List of Orphan Nodes

### `POST /get_unconnected_nodes_list`

The API retrieves a list of nodes in the graph database that are not connected to any other entity nodes.

**Parameters:** `uri`, `userName`, `password`, `database`, `email`

## Deletion of Orphan Nodes

### `POST /delete_unconnected_nodes`

The API is used to delete unconnected entities from the neo4j database with the input provided as selection from the user.

**Parameters:** `uri`, `userName`, `password`, `database`, `unconnected_entities_list`, `email`

## Get Duplicate Nodes

### `POST /get_duplicate_nodes`

The API is used to fetch duplicate entities from database.

**Parameters:** `uri`, `userName`, `password`, `database`, `email`

## Merge Duplicate Nodes

### `POST /merge_duplicate_nodes`

The API is used to merge duplicate entities from database selected by user.

**Parameters:** `uri`, `userName`, `password`, `database`, `duplicate_nodes_list`, `email`

## Drop and Create Vector Index

### `POST /drop_create_vector_index`

The API is used to drop and create the vector index when vector index dimensions are different.

**Parameters:** `uri`, `userName`, `password`, `database`, `isVectorIndexExist`, `email`

## Reprocessing of Sources

### `POST /retry_processing`

This API is used to reprocess canceled, completed or failed file sources.

**Parameters:** `uri`, `userName`, `password`, `database`, `file_name`, `retry_condition`, `email`

## Evaluate Response

### `POST /metric`

The API responsible for evaluating the chatbot response for the different retrievers on the basis of different metrics.

**Parameters:** `question`, `context`, `answer`, `model`, `mode`

## Evaluate Response with Ground Truth

### `POST /additional_metrics`

The API responsible for evaluating chatbot responses on the basis of different metrics such as context entity recall, semantic score, rouge score.

**Parameters:** `question`, `context`, `answer`, `reference`, `model`, `mode`

## Fetch Chunk Text

### `POST /fetch_chunktext`

The API responsible for fetching text associated with a particular chunk and chunk metadata.

**Parameters:** `uri`, `userName`, `password`, `database`, `document_name`, `page no`, `email`

## Backend Database Connection

### `POST /backend_connection_configuation`

The API responsible for creating the connection object from Neo4j DB based on environment variables and returning the status for showing/hiding the login dialog on UI.

**Parameters:** (None explicitly listed, implies configuration-based)

## Visualize Graph DB Schema

### `POST /schema_visualization`

User can visualize schema of the db through this API.

**Parameters:** `uri`, `userName`, `password`, `database`, `email`
