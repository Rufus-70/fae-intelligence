#!_bin_bash
# -- Fae Intelligence Automated Knowledge Graph Ingestion Script ---
BASE_VAULT_PATH="_home_rosie_projects_fae-intelligence"

# -- Populated Video Note_ How to Make Claude Code 10x Better ---
FILENAME_VIDEO_1="video_how_to_make_claude_code_10x_better.md"
mkdir -p "$BASE_VAULT_PATH_Resources_Videos"
cat > "$BASE_VAULT_PATH_Resources_Videos_$FILENAME_VIDEO_1" <<'EOF_VIDEO_1'
## type_ Video
content_source_ YouTube
source_channel_ AI Labs
video_url_ https___www.youtube.com_watch?v=your_video_id_here
last_reviewed_ 2024-07-22
# Video_ How to Make Claude Code 10x Better (Inferred)
## Description
This technical video explains that AI coding assistants like Anthropic's Claude Code are often used inefficiently due to "context window clutter." It introduces two open-source tools to solve this_ **Serena**, an MCP server that uses semantic search (RAG) to provide the AI with only the most relevant codebase context, and the **Claude Code Usage Monitor**, a real-time terminal dashboard for tracking token and cost usage. The core argument is that by combining these tools, developers can make their AI assistant faster, more accurate, and more cost-effective.
## Key Concepts Covered
- **Context Window Clutter_** The problem of an AI processing thousands of lines of irrelevant code, which degrades performance and increases costs.
- **Textual vs. Semantic Search_** The video contrasts basic textual search with more advanced semantic search, which understands the meaning and relationships within code to retrieve only relevant information.
- **Retrieval-Augmented Generation (RAG) for Code_** The underlying technique used by Serena to index a codebase and provide relevant context to the LLM on the fly.
- **Model Context Protocol (MCP)_** The standard used by tools like Claude Code and Cursor to communicate with external context providers like Serena.
- **Real-time Usage Monitoring_** The importance of tracking token consumption and costs to optimize AI usage and avoid unexpected bills.
## Demonstrates Tools (Links to Tool Notes)
- [[Tool_ Claude Code]]
- [[Tool_ Serena]]
- [[Tool_ Claude Code Usage Monitor]]
- [[Tool_ Cursor IDE]]
## Explains Solutions (Links to Solution Notes)
- [[Solution_ Semantic Codebase Indexing and Retrieval (RAG)]]
- [[Solution_ Real-time AI Usage Monitoring]]
## Addresses Pain Points (Links to Pain Point Notes)
- [[Customer Pain Point_ Inefficient AI Code Assistant Performance]]
- [[Customer Pain Point_ Unpredictable AI Usage Costs]]
## Notes
This video is an excellent, practical guide for a technical SMB audience (e.g., dev shops, startups). It clearly articulates a common problem and presents tangible, open-source solutions.
EOF_VIDEO_1

# -- Populated Pain Point Note_ Inefficient AI Code Assistant Performance ---
FILENAME_PAIN_POINT_1="customer_pain_point_inefficient_ai_code_assistant_performance.md"
mkdir -p "$BASE_VAULT_PATH_Consultancy_Pain Points"
cat > "$BASE_VAULT_PATH_Consultancy_Pain Points_$FILENAME_PAIN_POINT_1" <<'EOF_PAIN_POINT_1'
## type_ Pain Point
category_ [Development, Technology, Operations]
severity_ High
common_symptoms_ [Slow response times from AI, Inaccurate or irrelevant code suggestions, High token consumption and cost, AI making mistakes or missing connections]
impact_ [Reduced developer productivity, Wasted budget on AI API calls, Frustration with AI tools, Suboptimal code quality]
last_reviewed_ 2024-07-22
# Customer Pain Point_ Inefficient AI Code Assistant Performance
## Description
This pain point describes the degradation in performance and accuracy of AI coding assistants when they operate on large or complex codebases. The root cause, as explained in the video, is "context window clutter" (00_22). The AI is forced to read and process thousands of lines of code that are irrelevant to the specific task, making it slower, more expensive, and more error-prone. The speaker estimates that this can lead to the tool working at only 30% of its potential (00_03).
## Manifestations & Examples
- **Example 1_** A developer asks the AI to fix a bug in a specific component, but the AI spends a long time (and many tokens) reading unrelated files before providing a solution, if it finds one at all.
- **Example 2_** An AI assistant provides code that breaks other parts of the application because it missed a key dependency in a file it didn't prioritize correctly.
- **Example 3_** A small dev shop sees its monthly AI bill skyrocket because every simple query requires the model to process a massive amount of context from their entire project.
## Related Solutions (Links to Solution Notes)
- [[Solution_ Semantic Codebase Indexing and Retrieval (RAG)]]
## Related Tools (Links to Tool Notes)
- [[Tool_ Claude Code]]
- [[Tool_ Serena]]
## Related Videos_Content (Links to Video Notes)
- [[Video_ How to Make Claude Code 10x Better (Inferred)]]
## Related Market Trends (Links to Market Trend Notes)
- [[Market Trend_ Rise of RAG for Codebases]]
## Related Client Personas (Links to Client Persona Notes)
- [[Client Persona_ Tech Startup Founder]]
- [[Client Persona_ Small Software Agency Owner]]
## Notes
Fae Intelligence can frame this as "getting the full ROI from your AI tools." Most businesses are paying for the full power of models like Claude but are handicapped by inefficient context management. This is a classic operational inefficiency problem applied to a modern tech stack.
EOF_PAIN_POINT_1

echo ""
echo "✅ Fae Intelligence knowledge graph ingestion complete!"
echo "Generated files for 'How to Make Claude Code 10x Better' analysis."
echo "Please check your Obsidian vault at $BASE_VAULT_PATH"
