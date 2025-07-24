# How to Use Your Knowledge Graph in Obsidian

This guide explains how to view, add to, and customize your knowledge graph to find insights.

---

## 1. Viewing and Getting Information

Your primary tool for this is the **Graph View**, which shows your entire vault as a network of notes.

### How to Use It:

1.  **Open the Graph View:**
    *   Click the **Graph View** icon in the left-hand ribbon, or
    *   Use the Command Palette (`Ctrl+P`) and type "Graph View".

2.  **Filter for Insights:** The real power comes from filtering. In the Graph View pane, open the **Filters** tab.
    *   **Tags:** Type `tag:#project` to see only your project-related notes.
    *   **Folders:** Type `path:"docs/how-to"` to see only your "how-to" guides.
    *   **Text:** Search for any term to see all notes containing it.

3.  **Use the Local Graph:** To understand the context of a *single note*, open that note and use the Command Palette (`Ctrl+P`) to select **"Open local graph"**. This shows only the note and its direct connections.

---

## 2. Adding Items to Your Graph

Adding items is simple: you create notes and link them together. The links create the connections in the graph.

### Practical Exercise: Create a Test Note

1.  **Create a New Note:** Create a file named `My Test Note.md`.
2.  **Add a Link:** In that new note, type the following text:

    `This note is a test. It is related to the [[Visual Thinking Guide]].`

3.  **See the Connection:** Now, go to the Graph View. You will see `My Test Note` as a new dot (node), with a line connecting it directly to the `Visual Thinking Guide` node. You have successfully added to the graph!

---

## 3. Grouping and Coloring Items

This is how you can "see items grouped differently." You can create rules to color-code your graph based on tags or folders.

### Practical Exercise: Color-Code Your Documentation

1.  **Open Graph View Settings:** In the Graph View pane, click the **Settings** gear icon.
2.  **Go to the "Groups" Tab.**
3.  **Create a New Group:** Click "New group".
4.  **Define the Rule:** In the text box that appears, type `path:"docs"`.
5.  **Choose a Color:** Click the colored circle next to your new rule to pick a color (e.g., blue).

Now, every note inside your `/docs` folder will be colored blue in the graph, giving you an instant visual grouping of all your documentation. You can create as many groups as you like for different tags, projects, or topics.
