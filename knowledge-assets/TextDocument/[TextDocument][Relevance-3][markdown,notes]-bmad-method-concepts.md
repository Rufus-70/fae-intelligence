# BMAD Method Key Concepts and Entities

**Source:** `/home/rosie/projects/rag-system-v2/this_ai_development_method_is_insane_full_workflow.md`

## Identified Entities

| Entity | Type |
|---|---|
| BMAD Method | BusinessStrategy / Framework |
| Agile Development | Concept / Methodology |
| AI Agent | Concept |
| Product Requirements Document (PRD) | Concept / Document |
| Cursor | SoftwareTool / IDE |
| Claude Code | SoftwareTool / IDE |
| Windsurf | SoftwareTool / IDE |
| Product Owner (PO) | AI Agent Role |
| Scrum Master (SM) | AI Agent Role |
| Developer (Dev) | AI Agent Role |
| Quality Assurance (QA) | AI Agent Role |
| Story (Software) | Concept |
| Epic (Software) | Concept |
| GitIngest | SoftwareTool |
| GitHub | Platform |

## Identified Relationships

- [BMAD Method] → [IMPLEMENTS] → [Agile Development]
- [AI Agent] → [EXECUTES] → [BMAD Method]
- [Cursor] → [FACILITATES_STRATEGY] → [BMAD Method]
- [Claude Code] → [FACILITATES_STRATEGY] → [BMAD Method]
- [Scrum Master] → [CREATES] → [Story (Software)]
- [Product Owner] → [BREAKS_DOWN] → [Product Requirements Document (PRD)]
- [Developer (Dev)] → [IMPLEMENTS] → [Story (Software)]
- [Quality Assurance (QA)] → [TESTS] → [Story (Software)]

## Key Concepts and Definitions

### Concept: BMAD Method

**Definition from Video:** "Breakthrough Method for Agile AI Driven Development." A framework that enables an entire software development team of AI agents to work inside an IDE, following a structured process to build production-ready software.

**Relevance to SMBs:** Provides a structured, low-cost way for SMBs to approach custom software development, mitigating the risks associated with unstructured, purely generative AI coding. It mimics a professional team they might not be able to afford.

### Concept: Agile Development

**Definition from Video:** The standard approach software engineers use, involving building software in small, tested, incremental chunks. The process starts with a PRD, which is broken into smaller tasks, worked on, tested, and shipped iteratively.

**Relevance to SMBs:** An agile approach allows SMBs to build and adapt products quickly based on customer feedback, reducing wasted effort and ensuring the final product meets market needs.

### Concept: Product Requirements Document (PRD)

**Definition from Video:** A document listing the features that need to be built without technical details. It's the main list of features that the development team will break down into smaller tasks.

**Relevance to SMBs:** Crucial for ensuring clarity and alignment on what needs to be built before investing significant time and money into development. It helps separate the "what" from the "how."
