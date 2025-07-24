import json
import os

# This script requires the neo4j library.
# You can install it with: pip install neo4j
from neo4j import GraphDatabase

# --- Configuration ---
# TODO: Replace with your actual Neo4j connection details
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "password" # Replace with your password

INPUT_FILE = "/home/rosie/projects/fae-intelligence/scripts/triage_output.json"

class Neo4jIngestor:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def ingest_data(self, data):
        with self.driver.session() as session:
            for item in data:
                file_path = item.get("file_path")
                entities = item.get("entities", [])
                relationships = item.get("relationships", [])

                if not entities and not relationships:
                    continue

                print(f"Ingesting data from: {file_path}")

                # Ingest a source node for the document itself
                session.write_transaction(self._create_source_node, file_path)

                # Ingest entities
                for entity in entities:
                    session.write_transaction(self._create_entity_node, entity)
                    # Link the source document to the entity it contains
                    session.write_transaction(self._create_relationship, 
                                              source_node=('Source', os.path.basename(file_path)), 
                                              target_node=(entity['type'], entity['name']),
                                              rel_type='CONTAINS')

                # Ingest relationships
                for rel in relationships:
                    source_entity = next((e for e in entities if e['name'] == rel['source']), None)
                    target_entity = next((e for e in entities if e['name'] == rel['target']), None)
                    if source_entity and target_entity:
                        session.write_transaction(self._create_relationship, 
                                                  source_node=(source_entity['type'], source_entity['name']),
                                                  target_node=(target_entity['type'], target_entity['name']),
                                                  rel_type=rel['type'])

    @staticmethod
    def _create_source_node(tx, file_path):
        # Using MERGE to avoid creating duplicate nodes
        query = (
            "MERGE (s:Source {name: $name}) "
            "ON CREATE SET s.filePath = $path"
        )
        tx.run(query, name=os.path.basename(file_path), path=file_path)

    @staticmethod
    def _create_entity_node(tx, entity):
        # Using MERGE to avoid creating duplicate nodes
        # Note the dynamic label construction, which is a powerful feature
        query = f"MERGE (n:{entity['type']} {{name: $name}})"
        tx.run(query, name=entity['name'])

    @staticmethod
    def _create_relationship(tx, source_node, target_node, rel_type):
        source_type, source_name = source_node
        target_type, target_name = target_node
        
        query = (
            f"MATCH (a:{source_type} {{name: $source_name}}), (b:{target_type} {{name: $target_name}}) "
            f"MERGE (a)-[r:{rel_type}]->(b)"
        )
        tx.run(query, source_name=source_name, target_name=target_name)

def extract_schema_from_content_with_llm(content):
    """
    **Simulated LLM for schema extraction based on refined v1 Schema.**

    This function simulates a Gemini 1.5 Flash call, extracting entities and relationships
    from the content based on keywords that align with our v1 schema.

    Args:
        content (str): The text content of a document.

    Returns:
        dict: A dictionary with extracted 'entities' and 'relationships'.
    """
    entities = []
    relationships = []

    # --- Entity and Relationship Extraction Rules (Simulated LLM Logic) ---
    # This is a significantly expanded set of rules to better simulate a real LLM
    # and cover more of the expected entities and relationships from your documents.

    # General Concepts
    if "AI" in content or "artificial intelligence" in content:
        entities.append({"name": "Artificial Intelligence", "type": "Concept"})
    if "LLM" in content or "Large Language Model" in content or "Gemini" in content or "Claude" in content or "ChatGPT" in content or "Perplexity" in content:
        entities.append({"name": "Large Language Models", "type": "Concept"})
        if {"name": "Artificial Intelligence", "type": "Concept"} in entities:
            relationships.append({"source": "Large Language Models", "target": "Artificial Intelligence", "type": "IS_A"})
    if "automation" in content:
        entities.append({"name": "Automation", "type": "Concept"})
    if "project management" in content:
        entities.append({"name": "Project Management", "type": "Concept"})
    if "data quality" in content:
        entities.append({"name": "Data Quality", "type": "Concept"})
    if "data governance" in content:
        entities.append({"name": "Data Governance", "type": "Concept"})
    if "semantic" in content:
        entities.append({"name": "Semantic Understanding", "type": "Concept"})
    if "containerization" in content or "containers" in content:
        entities.append({"name": "Containerization", "type": "Concept"})
    if "business process automation" in content:
        entities.append({"name": "Business Process Automation", "type": "Concept"})

    # Methodologies
    if "BMAD Method" in content or "Breakthrough Method for Agile AI Driven Development" in content:
        entities.append({"name": "BMAD Method", "type": "Methodology"})
    if "Agile" in content or "Agile Development" in content:
        entities.append({"name": "Agile Development", "type": "Methodology"})
        if {"name": "BMAD Method", "type": "Methodology"} in entities:
            relationships.append({"source": "BMAD Method", "target": "Agile Development", "type": "IMPLEMENTS"})
    if "KATA Methodology" in content or "KATA cycle" in content:
        entities.append({"name": "KATA Methodology", "type": "Methodology"})
        if {"name": "Project Management", "type": "Concept"} in entities:
            relationships.append({"source": "KATA Methodology", "target": "Project Management", "type": "APPLIES_TO"})

    # Tools
    if "Neo4j" in content:
        entities.append({"name": "Neo4j", "type": "Tool"})
    if "Obsidian" in content:
        entities.append({"name": "Obsidian", "type": "Tool"})
    if "Docker" in content:
        entities.append({"name": "Docker", "type": "Tool"})
        if {"name": "Containerization", "type": "Concept"} in entities:
            relationships.append({"source": "Docker", "target": "Containerization", "type": "FACILITATES"})
    if "N8N" in content:
        entities.append({"name": "N8N", "type": "Tool"})
        if {"name": "Business Process Automation", "type": "Concept"} in entities:
            relationships.append({"source": "N8N", "target": "Business Process Automation", "type": "FACILITATES"})
    if "PyTorch" in content:
        entities.append({"name": "PyTorch", "type": "Tool"})
    if "Git" in content or "GitHub" in content:
        entities.append({"name": "Git", "type": "Tool"})
    if "VS Code" in content:
        entities.append({"name": "VS Code", "type": "Tool"})
    if "Firecrawl" in content:
        entities.append({"name": "Firecrawl", "type": "Tool"})
    if "ElevenLabs" in content:
        entities.append({"name": "ElevenLabs", "type": "Tool"})
    if "Pip" in content:
        entities.append({"name": "Pip", "type": "Tool"})
    if "Gemini" in content:
        entities.append({"name": "Google Gemini", "type": "Tool"})
    if "Claude" in content:
        entities.append({"name": "Claude", "type": "Tool"})
    if "ChatGPT" in content:
        entities.append({"name": "ChatGPT", "type": "Tool"})
    if "Perplexity" in content:
        entities.append({"name": "Perplexity", "type": "Tool"})
    if "Jetson Orin Nano" in content:
        entities.append({"name": "Jetson Orin Nano", "type": "Tool"})

    # Client Pain Points
    if "high cloud infrastructure costs" in content or "cloud costs" in content:
        entities.append({"name": "High Cloud Costs", "type": "ClientPainPoint"})
    if "difficulty attracting skilled IT staff" in content or "talent shortage" in content:
        entities.append({"name": "Talent Shortage", "type": "ClientPainPoint"})
    if "data fragmentation" in content or "data silos" in content:
        entities.append({"name": "Data Fragmentation", "type": "ClientPainPoint"})
    if "process inefficiencies" in content:
        entities.append({"name": "Process Inefficiencies", "type": "ClientPainPoint"})
    if "security concerns" in content or "vulnerabilities" in content:
        entities.append({"name": "General Security Concerns", "type": "ClientPainPoint"})
    if "client pain point" in content:
        entities.append({"name": "Client Pain Point", "type": "ClientPainPoint"})

    # Security Concerns
    if "Ransomware Attack" in content or "ransomware risk" in content:
        entities.append({"name": "Ransomware Attack Risk", "type": "SecurityConcern"})
    if "Data Breach Vulnerability" in content or "data breach" in content:
        entities.append({"name": "Data Breach Vulnerability", "type": "SecurityConcern"})
    if "Unauthorized Access Threat" in content or "unauthorized access" in content:
        entities.append({"name": "Unauthorized Access Threat", "type": "SecurityConcern"})
    if "zero-day vulnerability" in content:
        entities.append({"name": "Zero-Day Vulnerability", "type": "SecurityConcern"})
    if "security threat" in content:
        entities.append({"name": "Security Threat", "type": "SecurityConcern"})

    # Solutions
    if "Cloud Cost Optimization" in content:
        entities.append({"name": "Cloud Cost Optimization", "type": "Solution"})
        if any(e['name'] == "High Cloud Costs" for e in entities):
            relationships.append({"source": "High Cloud Costs", "target": "Cloud Cost Optimization", "type": "ADDRESSED_BY"})
    if "Digital Transformation" in content:
        entities.append({"name": "Digital Transformation", "type": "Solution"})
        if any(e['name'] == "Talent Shortage" for e in entities):
            relationships.append({"source": "Talent Shortage", "target": "Digital Transformation", "type": "ADDRESSED_BY"})
    if "Multi-Factor Authentication" in content or "MFA" in content:
        entities.append({"name": "Multi-Factor Authentication", "type": "Solution"})
        if any(e['name'] == "Unauthorized Access Threat" for e in entities):
            relationships.append({"source": "Multi-Factor Authentication", "target": "Unauthorized Access Threat", "type": "MITIGATES"})
    if "Knowledge Graph Consulting" in content:
        entities.append({"name": "Knowledge Graph Consulting", "type": "Solution"})
    if "Automated Content Generation" in content:
        entities.append({"name": "Automated Content Generation", "type": "Solution"})
    if "Conversation Intelligence" in content:
        entities.append({"name": "Conversation Intelligence", "type": "Solution"})
    if "System Monitoring" in content or "monitoring scripts" in content:
        entities.append({"name": "System Monitoring", "type": "Solution"})
    if "Project Structure Methodology" in content or "project structure" in content:
        entities.append({"name": "Project Structure Methodology", "type": "Solution"})
    if "Data Retention Strategy" in content or "long-term retention" in content:
        entities.append({"name": "Data Retention Strategy", "type": "Solution"})
    if "Conversation Analysis" in content or "conversation processing" in content:
        entities.append({"name": "Conversation Analysis", "type": "Solution"})
    if "Troubleshooting Guide" in content:
        entities.append({"name": "Troubleshooting Guide", "type": "Solution"})

    # Business Situations/Challenges
    if "Northwest Tech Boom" in content:
        entities.append({"name": "Northwest Tech Boom", "type": "BusinessSituation"})
    if "market trends" in content or "market analysis" in content:
        entities.append({"name": "Market Trends", "type": "BusinessSituation"})
    if "supply chain" in content or "supply chain management" in content:
        entities.append({"name": "Supply Chain Optimization", "type": "BusinessChallenge"})
    if "regional economic report" in content or "regional factors" in content:
        entities.append({"name": "Regional Economic Factors", "type": "BusinessSituation"})
    if "industry trends" in content:
        entities.append({"name": "Industry Trends", "type": "BusinessSituation"})
    if "business challenges" in content:
        entities.append({"name": "General Business Challenges", "type": "BusinessChallenge"})
    if "strategic imperative" in content:
        entities.append({"name": "Strategic Imperative", "type": "BusinessSituation"})

    # Relationships between extracted entities (more complex inference)
    # Example: If a Solution utilizes a Tool
    if any(e['name'] == "Cloud Cost Optimization" for e in entities) and any(e['name'] == "Microsoft Azure" for e in entities):
        relationships.append({"source": "Cloud Cost Optimization", "target": "Microsoft Azure", "type": "UTILIZES"})
    if any(e['name'] == "Automated Content Generation" for e in entities) and any(e['name'] == "Google Gemini" for e in entities):
        relationships.append({"source": "Automated Content Generation", "target": "Google Gemini", "type": "UTILIZES"})
    if any(e['name'] == "Automated Content Generation" for e in entities) and any(e['name'] == "Perplexity" for e in entities):
        relationships.append({"source": "Automated Content Generation", "target": "Perplexity", "type": "UTILIZES"})
    if any(e['name'] == "Conversation Intelligence" for e in entities) and any(e['name'] == "Claude" for e in entities):
        relationships.append({"source": "Conversation Intelligence", "target": "Claude", "type": "UTILIZES"})
    if any(e['name'] == "Conversation Analysis" for e in entities) and any(e['name'] == "Google Gemini" for e in entities):
        relationships.append({"source": "Conversation Analysis", "target": "Google Gemini", "type": "UTILIZES"})
    if any(e['name'] == "Conversation Analysis" for e in entities) and any(e['name'] == "Claude" for e in entities):
        relationships.append({"source": "Conversation Analysis", "target": "Claude", "type": "UTILIZES"})

    # Example: If a Tool mitigates a SecurityConcern
    if any(e['name'] == "Multi-Factor Authentication" for e in entities) and any(e['name'] == "Unauthorized Access Threat" for e in entities):
        relationships.append({"source": "Multi-Factor Authentication", "target": "Unauthorized Access Threat", "type": "MITIGATES"})
    if any(e['name'] == "Troubleshooting Guide" for e in entities) and any(e['name'] == "General Security Concerns" for e in entities):
        relationships.append({"source": "Troubleshooting Guide", "target": "General Security Concerns", "type": "ADDRESSES"})

    # Example: If a BusinessSituation leads to a BusinessChallenge
    if any(e['name'] == "Northwest Tech Boom" for e in entities) and any(e['name'] == "Talent Shortage" for e in entities):
        relationships.append({"source": "Northwest Tech Boom", "target": "Talent Shortage", "type": "LEADS_TO"})
    if any(e['name'] == "Industry Trends" for e in entities) and any(e['name'] == "General Business Challenges" for e in entities):
        relationships.append({"source": "Industry Trends", "target": "General Business Challenges", "type": "LEADS_TO"})

    # Deduplicate entities and relationships before returning
    unique_entities = list({frozenset(item.items()): item for item in entities}.values())
    unique_relationships = list({frozenset(item.items()): item for item in relationships}.values())

    return {"entities": unique_entities, "relationships": unique_relationships}

def main():
    """
    Main function to drive the knowledge ingestion process.
    """
    print("Starting knowledge ingestion process...")
    
    # 1. Load the processed data from triage_output.json
    with open(INPUT_FILE, 'r') as f:
        processed_data = json.load(f)
    
    # 2. Extract structured data using the (simulated) LLM
    print("Extracting entities and relationships using LLM...")
    structured_data = []
    for item in processed_data:
        content = item.get('content', '')
        if not content:
            print(f"Warning: No content found for {item.get('file_path', 'unknown file')}. Skipping.")
            continue
        extracted_schema = extract_schema_from_content_with_llm(content)
        if extracted_schema['entities'] or extracted_schema['relationships']:
            structured_data.append({
                "file_path": item["file_path"],
                "entities": extracted_schema["entities"],
                "relationships": extracted_schema["relationships"]
            })

    if not structured_data:
        print("No structured data was extracted. Halting ingestion.")
        return

    # 3. Ingest the structured data into Neo4j
    print("Connecting to Neo4j and ingesting data...")
    try:
        ingestor = Neo4jIngestor(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD)
        ingestor.ingest_data(structured_data)
        ingestor.close()
        print("--- Ingestion Complete ---")
        print(f"Successfully processed {len(structured_data)} documents into Neo4j.")
        print(f"You can now explore the graph in the Neo4j Browser at {NEO4J_URI.replace('bolt', 'http').replace('7687', '7474')}")
    except Exception as e:
        print(f"\nAn error occurred during Neo4j ingestion.")
        print("Please check the following:")
        print("1. Is the Neo4j database running?")
        print("2. Are the connection details (URI, user, password) in the script correct?")
        print("3. Have you installed the neo4j library? (pip install neo4j)")
        print(f"\nError details: {e}")

if __name__ == "__main__":
    main()
