# The BMAD (Breakthrough Method for Agile AI Driven Development) Workflow

**Source:** `/home/rosie/projects/rag-system-v2/this_ai_development_method_is_insane_full_workflow.md`

## Process Description

The BMAD Method is a comprehensive framework for building production-ready software using a team of specialized AI agents. It applies the principles of the Agile Software Development Lifecycle (SDLC) to AI-powered coding. The process moves sequentially through distinct roles (Product Owner, Scrum Master, Developer, QA) to take a project from initial brainstorming and requirements gathering (PRD) to developing, testing, and approving individual software stories. This structured approach aims to overcome the common pitfalls of unstructured AI coding, such as a lack of context, poor code quality, and unsuitability for real-world applications.

## Target Audience

- Software Developers using AI tools
- Startup Founders and CTOs
- Tech-Savvy SMB owners looking to build custom applications
- Solo developers aiming to increase productivity and structure

## Step-by-Step Guide

### Step 1: Brainstorming and Requirements Gathering

**Action:** Use a foundational AI model (like ChatGPT or Claude) to brainstorm the application's features, constraints, and goals. This is done by loading a "full stack team" bundle file and using the *brainstorm command.

**Tools Mentioned:** ChatGPT, Claude, Gemini

### Step 2: Product Requirements Document (PRD) & Architecture Creation

**Action:** Switch to the Product Manager (*pm) agent role. Use the *create-doc command to generate a detailed PRD based on the brainstorming session. Then, switch to the Architect (*architect) agent to create a corresponding architecture document.

**Tools Mentioned:** ChatGPT, Claude, Gemini

### Step 3: Project Installation

**Action:** In a local project folder, run the npx bmad-method install command in the terminal. This installs the core framework, including the necessary agent role files and configurations for the chosen IDEs.

**Tools Mentioned:** NPX, Terminal, IDE (Cursor, Claude Code, etc.)

### Step 4: Document Sharding (Product Owner)

**Action:** Initialize the Product Owner (@po.mdc) agent in the IDE. Use the *shard-doc command to feed the PRD and architecture files to the agent, which then breaks them down into indexed, manageable chunks (Epics and Stories).

**Tools Mentioned:** IDE (Cursor, Claude Code, Windsurf)

### Step 5: Story Creation (Scrum Master)

**Action:** Initialize the Scrum Master (@sm.mdc) agent. The agent analyzes the sharded PRD and generates individual story files for development, each with a "Draft" status.

**Tools Mentioned:** IDE (Cursor, Claude Code, Windsurf)

### Step 6: Story Approval (Human-in-the-Loop)

**Action:** A human user must manually review a story file and change its status from Draft to Approved. This is a critical control point before development begins.

**Tools Mentioned:** IDE (Cursor, Claude Code, Windsurf)

### Step 7: Development (Developer Agent)

**Action:** Initialize the Developer (@dev.mdc) agent and point it to an approved story. The agent reads the story requirements and writes the necessary code, breaking the work into tasks and subtasks. Upon completion, it changes the story status to Ready for Review.

**Tools Mentioned:** IDE (Cursor, Claude Code, Windsurf)

### Step 8: Quality Assurance (QA Agent)

**Action:** Initialize the QA (@qa.mdc) agent. Use the *review command. The agent reviews the implemented code against the story's acceptance criteria, performs refactoring if needed, and validates completion.

**Tools Mentioned:** IDE (Cursor, Claude Code, Windsurf)

### Step 9: Final Approval

**Action:** After a successful review, the QA agent changes the story status from Ready for Review to Done, completing the lifecycle for that specific story. The process then repeats for the next story.

**Tools Mentioned:** IDE (Cursor, Claude Code, Windsurf)
