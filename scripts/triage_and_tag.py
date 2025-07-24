import os
import shutil
import json
from parse_documents import parse_document # Import the new parsing utility

# --- Configuration ---
STAGING_DIR = "/home/rosie/projects/fae-intelligence/knowledge-staging"
DESTINATION_DIR = "/home/rosie/projects/fae-intelligence/knowledge-assets"
PROCESSED_DATA_OUTPUT = "/home/rosie/projects/fae-intelligence/scripts/triage_output.json"

def triage_file_with_llm(file_path):
    """
    **Placeholder for LLM-based file triage.**

    Simulates using Gemini 1.5 Flash to analyze a file and return metadata.
    This function now uses parse_document to get content and simulates LLM analysis.

    Args:
        file_path (str): The absolute path to the file.

    Returns:
        tuple: A tuple containing (dict: metadata, str: content_text).
    """
    file_name = os.path.basename(file_path)
    file_extension = os.path.splitext(file_path)[1].lower()

    # Use the parse_document function to get parsed data (dict with 'content', 'metadata', 'links')
    parsed_data = parse_document(file_path)

    if not parsed_data:
        return {"type": "Unknown", "relevance": 0, "tags": ["error"]}, ""

    # Extract content and initial metadata from parsed_data
    content_text = parsed_data.get('content', '')
    initial_metadata = parsed_data.get('metadata', {})
    links = parsed_data.get('links', []) # Keep links for potential future use in ingestion

    # Default values for LLM-derived metadata
    suggested_type = initial_metadata.get('type', 'Document') # Use type from frontmatter if available
    relevance = 3
    tags = initial_metadata.get('tags', ["untagged"]) # Use tags from frontmatter if available

    # --- SIMULATED LLM ANALYSIS ---
    if content_text:
        if "strategy" in content_text.lower() or "plan" in content_text.lower():
            suggested_type = "StrategyDoc"
            relevance = 5
            tags.append("planning")
        if "report" in content_text.lower() or "analysis" in content_text.lower():
            suggested_type = "Report"
            relevance = 4
            tags.append("analysis")
        if "code" in content_text.lower() or "script" in content_text.lower():
            suggested_type = "Code"
            relevance = 3
            tags.append("development")

    # Fallback/refinement based on file extension if content analysis is not specific enough
    if file_extension == '.md':
        if suggested_type == "Document": suggested_type = "Markdown"
        tags.extend(["text", "notes"])
    elif file_extension == '.pdf':
        if suggested_type == "Document": suggested_type = "PDF"
        tags.extend(["document", "external"])
    elif file_extension == '.json':
        if suggested_type == "Document": suggested_type = "JSON"
        tags.extend(["data", "configuration"])
    elif file_extension == '.docx':
        if suggested_type == "Document": suggested_type = "WordDocument"
        tags.extend(["document", "office"])
    elif file_extension in ('.sh', '.py'):
        if suggested_type == "Document": suggested_type = "Script"
        tags.extend(["automation", "code"])

    # Remove duplicates from tags
    tags = list(set(tags))

    # Combine initial metadata with LLM-derived metadata
    final_metadata = {
        **initial_metadata, # Preserve original metadata from frontmatter etc.
        "type": suggested_type,
        "relevance": relevance,
        "tags": tags,
        "links": links # Add extracted wiki links to metadata
    }

    return final_metadata, content_text

def main():
    """
    Main function to drive the triage and organization process.
    """
    print(f"Starting triage process for directory: {STAGING_DIR}")

    if not os.path.exists(STAGING_DIR):
        print(f"Error: Staging directory not found at {STAGING_DIR}")
        print("Please create it and place files there for triage.")
        return

    files_to_process = [f for f in os.listdir(STAGING_DIR) if os.path.isfile(os.path.join(STAGING_DIR, f))]

    if not files_to_process:
        print("No files found in the staging directory. Nothing to do.")
        return

    print(f"Found {len(files_to_process)} files to triage...")

    processed_data_for_ingestion = []

    for file_name in files_to_process:
        source_path = os.path.join(STAGING_DIR, file_name)
        
        # 1. Get AI-powered metadata and content
        metadata, content = triage_file_with_llm(source_path)
        
        # Store data for later ingestion
        processed_data_for_ingestion.append({
            "file_path": source_path,
            "metadata": metadata,
            "content": content
        })

        # 2. Create the new, organized file name
        tag_str = ",".join(metadata['tags'])
        new_file_name = f"[{metadata['type']}][Relevance-{metadata['relevance']}][{tag_str}]-{file_name}"
        
        # 3. Create the destination directory based on type
        type_dir = os.path.join(DESTINATION_DIR, metadata['type'])
        os.makedirs(type_dir, exist_ok=True)
        
        # 4. Move and rename the file
        destination_path = os.path.join(type_dir, new_file_name)
        print(f"  - Moving {file_name} -> {destination_path}")
        shutil.move(source_path, destination_path)

    # Write the processed data to a JSON file for the ingestion script
    with open(PROCESSED_DATA_OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(processed_data_for_ingestion, f, indent=2)
    print(f"\nProcessed data saved to: {PROCESSED_DATA_OUTPUT}")

    print("\n--- Triage Complete ---")
    print(f"Successfully organized {len(files_to_process)} files.")
    print(f"Files have been moved and renamed in: {DESTINATION_DIR}")

if __name__ == "__main__":
    main()
