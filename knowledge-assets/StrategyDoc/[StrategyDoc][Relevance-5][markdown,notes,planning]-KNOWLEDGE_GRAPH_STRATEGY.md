# The Fae Intelligence Consultancy Knowledge Graph

---

### 1. What This System Is: A Digital Brain for Your Consultancy

Think of this system not as a database, but as a **digital brain for your consultancy**.

This "brain" doesn't just store lists of information; it understands the *relationships* between them. It's a **Knowledge Graph** that maps your entire strategic landscape:

*   **Client Problems:** What are the specific `PainPoints` your target market faces?
*   **Available Solutions:** What are the `Tools` (AI and otherwise) that can solve these problems?
*   **Your Expertise:** Which of your `FaeService` offerings are the perfect solution for a given `PainPoint`?
*   **Market Intelligence:** Which `Videos` and content are discussing these topics, and how?

The script `consultancy_graph_builder.py` is the tool that feeds this brain. It takes the raw analysis from a video (the JSON file) and translates it into structured knowledge, creating and connecting the nodes in your graph.

### 2. How It Works for Your Business: From Data to Revenue

This knowledge graph is a strategic asset that directly supports the core functions outlined in your business plan.

#### **A. For Sales & Client Engagement (The "Blueprint for Excellence")**

This is its most powerful, immediate use.

*   **The Scenario:** You are in a meeting with a potential client, a manufacturing firm in Oregon. The owner says, "We're struggling to get found online by local customers, and our reputation is suffering because we don't know how to handle online reviews."
*   **Your Action:** Instead of just talking about solutions, you can query your knowledge graph. You run a query like:
    ```cypher
    MATCH (pp:PainPoint)<-[:ADDRESSES_PAIN_POINT]-(t:Tool)
    WHERE pp.name CONTAINS 'reputation' OR pp.name CONTAINS 'local search'
    RETURN pp.name AS PainPoint, t.name AS RecommendedTool
    ```
*   **The Result:** The graph instantly shows you that "Google Business Profile" and "Podium" are tools that address these exact pain points.
*   **The Business Impact:** You can immediately say, "We can solve that. We'll start by optimizing your Google Business Profile, which directly impacts local search visibility. For managing reviews, we can implement a system using a tool like Podium." You have moved from a generic conversation to a specific, high-value proposal in seconds. You can then pivot to your **"AI Operational Assessment"** service as the perfect first step.

#### **B. For Marketing & Content Strategy ("The PNW Business AI Navigator")**

Your business plan emphasizes becoming an authority through high-value content. The graph is your content engine.

*   **The Scenario:** You need to write a blog post for your website that will attract manufacturing clients.
*   **Your Action:** You query the graph to see what problems are most connected to the tools you've analyzed.
    ```cypher
    MATCH (t:Tool {name: 'Google Business Profile'})-[:ADDRESSES_PAIN_POINT]->(pp:PainPoint)
    RETURN t.name AS Tool, collect(pp.name) AS SolvedPainPoints
    ```
*   **The Result:** The query returns "Google Business Profile" and a list of pain points it solves: "Low local search visibility," "Struggling to attract local customers," "Poor online reputation."
*   **The Business Impact:** You now have the exact outline for a highly relevant blog post: **"Three Critical Problems Every PNW Manufacturer Can Solve for Free with Google Business Profile."** This directly supports your goal of proving value and building trust before a sale.

#### **C. For Business Strategy & Service Development**

The graph helps you identify gaps in the market and refine your service offerings.

*   **The Scenario:** After analyzing 20 videos, you want to know which client problems are being discussed most often.
*   **Your Action:** You run a query to see which `PainPoint` nodes have the most incoming `HIGHLIGHTS_PAIN_POINT` relationships from videos.
*   **The Business Impact:** If you discover that "supply chain visibility" is a frequently mentioned pain point, but you have few tools or services linked to it, you've identified a **strategic opportunity**. You can now research tools in that area and consider developing a new workshop or service offering, keeping your consultancy ahead of the curve.

### 3. Work Instruction: Leveraging the Fae Intelligence Knowledge Graph

**Objective:** To continuously populate and use the Fae Intelligence Knowledge Graph to support sales, marketing, and strategic decision-making.

**Prerequisites:**
*   Neo4j Desktop application is open and the database is running.
*   The `consultancy_graph_builder.py` script is available in `/home/rosie/projects/fae-intelligence-data/`.

---

#### **Workflow Steps**

**Step 1: Analyze New Content (Input)**

1.  Identify a new piece of content to analyze (e.g., a YouTube video, an article, a webinar).
2.  Using the `PROMPT_TEMPLATE_VIDEO_ANALYSIS.md` file, generate the structured **JSON analysis** for that content.
3.  Ensure the JSON is complete and accurate, paying special attention to the `targetPainPoints` and `toolsMentioned` sections.

**Step 2: Ingest the Analysis into the Graph (Process)**

1.  Open the `consultancy_graph_builder.py` script in a text editor.
2.  Carefully **replace the content** of the `VIDEO_ANALYSIS_JSON` variable with the new JSON you generated in Step 1.
3.  Save the script.
4.  Open your terminal and run the script:
    ```bash
    cd /home/rosie/projects/fae-intelligence-data/
    python3 consultancy_graph_builder.py
    ```
5.  Verify that the terminal output confirms a successful ingestion.

**Step 3: Query the Graph for Business Insights (Output)**

1.  Open the Neo4j Browser for your database.
2.  Use Cypher queries to extract actionable intelligence.

    *   **For a Client Meeting (Sales):**
        *   *Goal:* Find tools that solve a client's stated problem.
        *   *Query:*
            ```cypher
            // Replace 'search visibility' with the client's actual pain point
            MATCH (pp:PainPoint)<-[:ADDRESSES_PAIN_POINT]-(t:Tool)
            WHERE pp.name CONTAINS 'search visibility'
            RETURN t.name AS RecommendedTool
            ```

    *   **For Your Next Blog Post (Marketing):**
        *   *Goal:* Find all the problems a specific, interesting tool can solve.
        *   *Query:*
            ```cypher
            // Replace 'Podium' with the tool you want to write about
            MATCH (t:Tool {name: 'Podium'})-[:ADDRESSES_PAIN_POINT]->(pp:PainPoint)
            RETURN pp.name AS SolvedPainPoint
            ```

    *   **For Your Monthly Strategy Review (Strategy):**
        *   *Goal:* See which of your services are most aligned with the problems you're seeing in the market.
        *   *Query:*
            ```cypher
            MATCH (s:FaeService)-[:SOLVES]->(pp:PainPoint)
            RETURN s.name AS FaeService, count(pp) AS ProblemsSolved
            ORDER BY ProblemsSolved DESC
            ```
