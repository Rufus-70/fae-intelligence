# AI Policy: Neo4j Graph Model and Simple Tools

**Purpose:** This document outlines a proposed Neo4j graph model for representing the company's AI Policy, enabling structured querying and the creation of "simple tools" (Cypher queries) for policy interaction and enforcement.

## Proposed AI Policy Graph Model

### Nodes:

*   `(p:Policy)`: Represents the entire AI Policy document.
    *   **Properties:** `title`, `version`, `lastUpdated`

*   `(s:Section)`: Represents a major section of the policy (e.g., "Introduction and Purpose", "Scope", "General Principles").
    *   **Properties:** `title`, `number`, `content` (summary of section)

*   `(pr:Principle)`: Represents a core principle (e.g., "Innovation & Efficiency", "Accountability", "Security", "Ethics & Compliance").
    *   **Properties:** `name`, `description`

*   `(r:Rule)`: Represents a specific guideline or rule within a section.
    *   **Properties:** `text`, `number` (e.g., 4.1, 4.2)

*   `(ro:Role)`: Represents a role with responsibilities (e.g., "Company Name", "Managers", "Employees and Users").
    *   **Properties:** `name`

*   `(t:Tool)`: Represents an AI tool mentioned.
    *   **Properties:** `name`, `status` (e.g., "Approved", "Unapproved")

*   `(dc:DataCategory)`: Represents a category of data (e.g., "Confidential", "Proprietary", "Sensitive", "PII").
    *   **Properties:** `name`, `sensitivityLevel`

### Relationships:

*   `(p)-[:HAS_SECTION]->(s)`: A Policy has multiple Sections.
*   `(s)-[:DEFINES_PRINCIPLE]->(pr)`: A Section defines a Principle.
*   `(s)-[:CONTAINS_RULE]->(r)`: A Section contains a Rule.
*   `(r)-[:APPLIES_TO_ROLE]->(ro)`: A Rule applies to a specific Role.
*   `(r)-[:GOVERNS_TOOL]->(t)`: A Rule governs the use of a Tool.
*   `(r)-[:RESTRICTS_DATA]->(dc)`: A Rule restricts the use of a DataCategory.
*   `(ro)-[:HAS_RESPONSIBILITY]->(r)`: A Role has responsibility for a Rule.
*   `(t)-[:HANDLES_DATA]->(dc)`: A Tool handles a specific DataCategory.
*   `(t)-[:IS_APPROVED_BY]->(ro)`: A Tool is approved by a specific Role (e.g., IT/Security Department).

## Example Cypher Queries for "Simple Tools"

These queries can be executed against the Neo4j database (e.g., via the RAG Backend's `/graph_query` endpoint) to retrieve specific policy information.

### Tool 1: Policy Rule Lookup by Keyword
**Purpose:** Quickly find policy rules related to a specific keyword (e.g., "confidential data").

```cypher
MATCH (r:Rule)
WHERE r.text CONTAINS 'confidential data'
RETURN r.number, r.text
```

### Tool 2: Approved Tool Checker
**Purpose:** Check if a specific AI tool is approved and what data categories it can handle.

```cypher
MATCH (t:Tool {name: 'ChatGPT'})-[:HANDLES_DATA]->(dc:DataCategory)
WHERE t.status = 'Approved'
RETURN t.name, t.status, collect(dc.name) AS handles_data_categories
```

### Tool 3: Role Responsibilities
**Purpose:** List all responsibilities for a given role.

```cypher
MATCH (ro:Role {name: 'Employees and Users'})-[:HAS_RESPONSIBILITY]->(r:Rule)
RETURN r.number, r.text
```

### Tool 4: Data Sensitivity Check
**Purpose:** Identify rules related to a specific data sensitivity level.

```cypher
MATCH (dc:DataCategory {sensitivityLevel: 'Confidential'})<-[:RESTRICTS_DATA]-(r:Rule)
RETURN r.number, r.text
```

## Next Steps

To implement this, the AI Policy document would need to be ingested into the Neo4j database, mapping its content to the defined graph model. This could involve extending the existing Markdown ingestion script or developing a specialized parser for policy documents.
