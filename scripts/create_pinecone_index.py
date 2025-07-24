import os
from pinecone import Pinecone, ServerlessSpec

# --- Configuration ---
# Replace with your actual Pinecone API key and environment
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
PINECONE_ENVIRONMENT = os.environ.get("PINECONE_ENVIRONMENT") # e.g., "gcp-starter"

INDEX_NAME = "seo-writer"
DIMENSION = 3072  # From Gemini embedding model
METRIC = "cosine" # Common for embeddings

def create_pinecone_index():
    if not PINECONE_API_KEY or not PINECONE_ENVIRONMENT:
        print("Error: Pinecone API key or environment not set. Please set PINECONE_API_KEY and PINECONE_ENVIRONMENT environment variables.")
        return

    try:
        pc = Pinecone(api_key=PINECONE_API_KEY, environment=PINECONE_ENVIRONMENT)

        if INDEX_NAME not in pc.list_indexes().names():
            print(f"Creating Pinecone index '{INDEX_NAME}' with dimension {DIMENSION} and metric '{METRIC}'...")
            pc.create_index(
                name=INDEX_NAME,
                dimension=DIMENSION,
                metric=METRIC,
                spec=ServerlessSpec(cloud='aws', region='us-west-2') # Default to AWS US-West-2, can be changed
            )
            print(f"Index '{INDEX_NAME}' created successfully.")
        else:
            print(f"Index '{INDEX_NAME}' already exists. Skipping creation.")

    except Exception as e:
        print(f"An error occurred while interacting with Pinecone: {e}")

if __name__ == "__main__":
    create_pinecone_index()
