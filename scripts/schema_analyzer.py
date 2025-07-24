

import json
from collections import defaultdict

def analyze_parsed_data(input_file):
    """
    Analyzes the parsed markdown data to propose a knowledge graph schema.

    Args:
        input_file (str): The path to the parsed markdown data JSON file.
    """
    with open(input_file, 'r') as f:
        data = json.load(f)

    entity_types = set()
    relationship_types = defaultdict(int)

    for item in data:
        metadata = item.get('data', {}).get('metadata', {})
        if 'type' in metadata:
            entity_types.add(metadata['type'])

        links = item.get('data', {}).get('links', [])
        for link in links:
            # This is a simplistic way to infer relationship types.
            # In a real scenario, we would use more sophisticated methods.
            relationship_types[f"related_to"] += 1

    print("--- Proposed Knowledge Graph Schema ---")
    print("\n## Entity Types (Nodes):")
    for entity_type in sorted(list(entity_types)):
        print(f"- {entity_type}")

    print("\n## Relationship Types (Edges):")
    for rel_type, count in relationship_types.items():
        print(f"- {rel_type} (found {count} times)")

def main():
    """
    Main function to run the schema analysis.
    """
    input_file = "/home/rosie/projects/fae-intelligence/scripts/parsed_markdown_data.json"
    analyze_parsed_data(input_file)

if __name__ == "__main__":
    main()

