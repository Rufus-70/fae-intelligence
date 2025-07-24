import json
from collections import defaultdict

def extract_schema_from_content_with_llm(content):
    """
    **Placeholder for LLM-based schema extraction using the refined v1 Schema.**

    This function simulates an LLM call with a more sophisticated prompt, guiding it
    to extract entities and relationships based on our agreed-upon v1 schema.

    Args:
        content (str): The text content of a document.

    Returns:
        dict: A dictionary with extracted 'entities' and 'relationships'.
    """
    # --- LLM Simulation with Refined v1 Schema ---
    # This simulation checks for keywords and returns structured data
    # that aligns with our v1 schema. A real LLM would use NLP to understand
    # the context and extract these far more accurately.

    entities = []
    relationships = []

    # Example rule 1: Identify BMAD Method content
    if "BMAD Method" in content and "Agile" in content:
        entities.append({"name": "BMAD Method", "type": "Methodology"})
        entities.append({"name": "Agile Development", "type": "Methodology"})
        relationships.append({"source": "BMAD Method", "target": "Agile Development", "type": "IMPLEMENTS"})

    # Example rule 2: Identify a Pain Point and a potential Solution
    if "high cloud infrastructure costs" in content and "Cloud Cost Optimization" in content:
        entities.append({"name": "High Cloud Costs", "type": "ClientPainPoint"})
        entities.append({"name": "Cloud Cost Optimization", "type": "Solution"})
        relationships.append({"source": "High Cloud Costs", "target": "Cloud Cost Optimization", "type": "ADDRESSED_BY"})

    # Example rule 3: Identify a Security Concern and a Tool
    if "Ransomware Attack" in content and "Multi-Factor Authentication" in content:
        entities.append({"name": "Ransomware Attack Risk", "type": "SecurityConcern"})
        entities.append({"name": "Multi-Factor Authentication", "type": "Tool"})
        relationships.append({"source": "Multi-Factor Authentication", "target": "Ransomware Attack Risk", "type": "MITIGATES"})

    # Deduplicate entities before returning
    unique_entities = list({frozenset(item.items()): item for item in entities}.values())

    return {
        "entities": unique_entities,
        "relationships": relationships
    }

def main():
    """
    Main function to drive the LLM-based schema extraction process.
    """
    input_file = "/home/rosie/projects/fae-intelligence/scripts/parsed_markdown_data.json"
    with open(input_file, 'r') as f:
        data = json.load(f)

    # Using sets to store unique entity and relationship types
    entity_types = set()
    relationship_types = set()

    print("Analyzing document content with simulated LLM to propose schema...")

    for item in data:
        content = item.get('data', {}).get('content', '')
        
        # Skip if content is empty
        if not content:
            continue

        # Call our placeholder LLM extraction function
        extracted_schema = extract_schema_from_content_with_llm(content)

        for entity in extracted_schema.get("entities", []):
            entity_types.add(entity['type'])
        
        for relationship in extracted_schema.get("relationships", []):
            relationship_types.add(relationship['type'])

    print("\n--- LLM-Powered Proposed Knowledge Graph Schema ---")
    print("\n## Entity Types (Nodes):")
    if entity_types:
        for entity_type in sorted(list(entity_types)):
            print(f"- {entity_type}")
    else:
        print("No entity types extracted.")

    print("\n## Relationship Types (Edges):")
    if relationship_types:
        for rel_type in sorted(list(relationship_types)):
            print(f"- {rel_type}")
    else:
        print("No relationship types extracted.")

if __name__ == "__main__":
    main()
