# BMAD Plan: Epics and User Stories

Assumption: "stopris" means "stories".

Scope: Full execution across the 12 integrated systems of Fae Intelligence [[memory:5632863]].

Method: BMAD roles (Analyst, PM/PO, Architect, Dev, QA, SM) drive sequential, story-sized increments with clear AC and DoD.

## Epic 1: BMAD Orchestration & Governance
- Goal: Enable BMAD workflows and cadence; standardize handoffs and artifacts.
- Stories:
  1. BMAD roles and ceremonies documented and adopted
     - AC: Roles, workflows, and artifacts referenced in `BMAD/` agents and team bundles; cadence calendar created.
     - DoD: Checked into repo; accessible from dashboard.
  2. Definition of Done and AC templates standardized
     - AC: Single template used across stories; linted in PRs.
     - DoD: Template stored in `docs/` and referenced by all new stories.
  3. Sprint board initialized with priorities and dependencies
     - AC: Board lists all epics/stories with owners; dependencies tracked.
     - DoD: Board link recorded in status tracker.

## Epic 2: Knowledge Graph (Neo4j)
- Goal: Stand up Neo4j and ingest core assets.
- Stories:
  1. Provision Neo4j service
     - AC: Instance reachable; creds in `.env.local`.
     - DoD: Health endpoint returns 200.
  2. Ingest sample dataset
     - AC: `neo/ingest_neo4j.py` loads `neo/sample_data/` nodes/edges.
     - DoD: 100% of sample visible in Neo4j Browser.
  3. Ingest selected `knowledge-assets/`
     - AC: Mappings defined; at least 100 assets ingested.
     - DoD: Query examples added to `knowledge-integration/`.

## Epic 3: Obsidian Knowledge Vault
- Goal: Link vault and clarify sync boundaries.
- Stories:
  1. Vault path and sync policy documented
     - AC: Path and sync rules captured.
     - DoD: Added to status tracker and onboarding docs.

## Epic 4: RAG Service
- Goal: Operational RAG service aligned to KG.
- Stories:
  1. Bring RAG service into repo or connect remote
     - AC: Service runs locally or remote with endpoint URL configured.
     - DoD: Health endpoint verified.
  2. Index selected assets; query roundtrip
     - AC: Top-k retrieval works on test prompts.
     - DoD: Example notebook saved.

## Epic 5: Consultancy Dashboard (React)
- Goal: Operate dashboard and expose content tools.
- Stories:
  1. Start dev server
     - AC: Runs on :5173 with no errors.
     - DoD: Basic smoke test passes.
  2. Link to visual editor and blog
     - AC: Buttons/links open :8085 and :8086 as per docs.
     - DoD: Cross-window flow verified.

## Epic 6: Notion Backend
- Goal: Run backend and expose simple endpoint to dashboard.
- Stories:
  1. Install and run service
     - AC: `node index.js` serves on configured port.
     - DoD: GET /health (or minimal route) returns 200.
  2. Wire one dashboard call
     - AC: Dashboard fetches data from backend.
     - DoD: UI shows response.

## Epic 7: Visual Content Editors
- Goal: Serve and integrate editor.
- Stories:
  1. Serve visual editor static site
     - AC: Served on :8085.
     - DoD: Editor loads main canvas and properties panel.

## Epic 8: Blog Management System
- Goal: Build/serve static blog and verify publishing loop.
- Stories:
  1. Serve static blog
     - AC: Served on :8086.
     - DoD: Sample post visible.
  2. Optional build step
     - AC: `html-blog/scripts/build.js` runs without errors.
     - DoD: Outputs appear in `generated-posts/`.

## Epic 9: Next.js Web Platform
- Goal: Decide and enable run path for `src/app/` site.
- Stories:
  1. Create runnable Next.js app wrapper
     - AC: `package.json` + scripts run `src/app/`.
     - DoD: Site available locally; basic routes work.

## Epic 10: Automation Platform (n8n)
- Goal: Provision n8n locally.
- Stories:
  1. Compose file and basic flow
     - AC: n8n runs locally; one flow executes.
     - DoD: Flow exported and committed.

## Epic 11: Firebase Integration
- Goal: Configure and verify minimal calls.
- Stories:
  1. Add `.env.local` and SDK init
     - AC: Config present; auth/read succeeds in test page.
     - DoD: Test plan updated.

## Epic 12: Development Tools & Launcher
- Goal: Container-safe launcher to replace host-only script.
- Stories:
  1. Create `scripts/launch_local_stack.sh`
     - AC: Starts dashboard, editor, blog, backend.
     - DoD: One command brings up stack.

---

## Sprint 1 (Execution Now)
- E5-S1 Start dashboard (:5173)
- E7-S1 Serve visual editor (:8085)
- E8-S1 Serve static blog (:8086)
- E6-S1 Run Notion backend

DoD for Sprint 1: All four services are reachable; smoke tests logged in status tracker.