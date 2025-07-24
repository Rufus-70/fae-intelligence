# Fae Intelligence - Project Hub

**Welcome to the central hub for the Fae Intelligence initiative.**

This repository serves as the master project directory. All work, from technical development to strategic planning, is managed and tracked from here.

## ⚠️ **CRITICAL: Desktop Commander Path Requirements**

**🚨 FOR ALL AI FILE OPERATIONS:** When using Desktop Commander MCP, **ALWAYS** use `/host/` prefix:

```bash
# ❌ WRONG: /home/rosie/projects/file.txt
# ✅ CORRECT: /host/home/rosie/projects/file.txt
```

Desktop Commander runs in Docker container with your real `/home/rosie/` mounted at `/host/home/rosie/` inside the container. **Documentation:** `/docs/CLAUDE_DESKTOP_MCP_DOCKER_SETUP.md`

## 🎯 Master Strategy

The official project charter, vision, strategy, and task list are maintained in the `PROJECT_BRAIN.md` document. This is the single source of truth for all project activities.

*   **[View the Master Strategy: PROJECT_BRAIN.md](./PROJECT_BRAIN.md)**

## 📂 Sub-Projects & Components

This project is composed of several key components, each with its own dedicated directory:

*   **`/docs`**: Contains detailed documentation, working notes, and historical project management files. While it contains useful context, the master strategy is always in `PROJECT_BRAIN.md`.
*   **`/rag-system-v2`**: (External Project) The core technical asset for our Retrieval-Augmented Generation (RAG) capabilities. This system is being developed to support both internal analysis and future client offerings.
*   **`/n8n-workflows`**: (Placeholder) This directory will house the n8n workflows for automation tasks, as outlined in the Integration Track.
*   **`/marketing-assets`**: (Placeholder) This directory will contain marketing materials, such as the "Internal AI Usage Policy Template" lead magnet.
*   **`/prompt-library-system`**: (Local Tool) A client-side web application for personal prompt management and drafting of project documentation. Data is stored locally in your browser's `localStorage`. Regular export is recommended for backup.
    *   **Purpose:** Personal prompt iteration, quick documentation drafting.
    *   **Usage:** Open `index.html` in your web browser or serve with a local HTTP server (e.g., `python3 -m http.server 8000`).
    *   **Data Persistence:** Browser `localStorage`. Use the "Export" feature to save data.
*   **`/knowledge-assets`**: (Centralized Repository) The authoritative, version-controlled repository for all Fae Intelligence knowledge assets, including prompts, workflow descriptions, tool configurations, and project documentation.
    *   **Purpose:** Robust, collaborative, and discoverable storage for all project knowledge.
    *   **Structure:**
        *   `/prompts/`: Standardized Markdown files for prompts.
        *   `/workflows/`: Markdown files describing workflows.
        *   `/tools-configs/`: Markdown or YAML/JSON files for tool configurations.
        *   `/project-docs/`: Markdown files for project-specific documentation.
    *   **Data Flow:** Prompts can be exported from the local `prompt-library-system` and converted to Markdown for inclusion here.
*   **`/consultancy-dashboard`**: A React-based AI Studio application for client engagement and data visualization.
    *   **Purpose:** Provides a dashboard for interacting with AI models and visualizing data for client projects.
    *   **Documentation:** See `/docs/05-APPLICATIONS/consultancy-dashboard/README.md` for setup and usage.

## 📜 Guiding Principle

All work conducted within this project ecosystem must align with the goals and tasks outlined in the `PROJECT_BRAIN.md`. Every sub-project's `README.md` must contain a "Strategic Alignment" section that explicitly links it back to the master strategy.