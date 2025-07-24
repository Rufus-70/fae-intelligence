# Notion Integration Details for Consultancy Dashboard

This document captures the key decisions, database schemas, and IDs related to integrating the `consultancy-dashboard` with Notion.

## 1. Integration Strategy

The `consultancy-dashboard` will use Notion as its primary data backend. A new Node.js/Express backend service will act as an intermediary, handling all communication between the dashboard (frontend) and the Notion API.

### Deviation from `PROJECT_BRAIN.md`

**Rationale:** The `PROJECT_BRAIN.md` states that "When interacting with Notion, always use the functions provided by the `mcp-desktop-commander`." However, `mcp-desktop-commander` is designed for AI-driven, higher-level interactions and does not provide a programmatic API for granular CRUD (Create, Read, Update, Delete) operations required by a full-fledged application like the `consultancy-dashboard`.

**Decision:** For the operational data of the `consultancy-dashboard` (Projects, Tasks, Clients, etc.), we will use a **direct Notion API integration via a dedicated backend service**. This is the most practical and efficient approach for continuous data synchronization and management. `mcp-desktop-commander` will continue to be used for AI-orchestrated Notion interactions as intended.

## 2. Notion API Key

*   **API Key:** `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`
    *   **Note:** This key should be stored securely in environment variables and never hardcoded in application code.

## 3. Parent Page for Databases

All new Notion databases for the `consultancy-dashboard` are created as children of the following Notion page:

*   **Page Name:** `Fae OS: Databases`
*   **Page ID:** `22f6b641-7ac1-80d5-8b96-ef3e680ca943`
*   **Link:** `https://www.notion.so/Fae-OS-Databases-22f6b6417ac180d58b96ef3e680ca943`

## 4. Newly Created Notion Databases and Schemas

The following databases have been created in Notion to support the `consultancy-dashboard`'s data model:

---

### 4.1. Fae Intelligence Clients

*   **Database ID:** `2376b641-7ac1-81ae-a0d0-c0ac1fa2a915`
*   **Purpose:** To manage all client information.
*   **Properties:**
    *   `Client Name`: **Title** (Text)
    *   `Contact Person`: **Text**
    *   `Email`: **Email**
    *   `Phone`: **Phone Number**
    *   `Status`: **Select** (Options: `Active`, `Prospect`, `Lead`, `Inactive`)
    *   `Last Interaction`: **Date**
    *   `Projects`: **Relation** to `Fae Intelligence Projects`
    *   `Deals`: **Relation** to `Fae Intelligence Deals`
    *   `Communication Log`: **Relation** to `Fae Intelligence Communication Log`
    *   `Revenue Items`: **Relation** to `Fae Intelligence Revenue Items`
    *   `Invoices`: **Relation** to `Fae Intelligence Invoices`

---

### 4.2. Fae Intelligence Projects

*   **Database ID:** `2376b641-7ac1-810b-941e-e81c7f932dd4`
*   **Purpose:** To track all projects undertaken.
*   **Properties:**
    *   `Project Name`: **Title** (Text)
    *   `Description`: **Text**
    *   `Client`: **Relation** to `Fae Intelligence Clients`
    *   `Status`: **Select** (Options: `Planning`, `Active`, `On Hold`, `Completed`, `Cancelled`)
    *   `Start Date`: **Date**
    *   `Due Date`: **Date**
    *   `Team Members`: **Multi-select**
    *   `Tasks`: **Relation** to `Fae Intelligence Tasks`
    *   `Expenses`: **Relation** to `Fae Intelligence Expenses`
    *   `Revenue Items`: **Relation** to `Fae Intelligence Revenue Items`
    *   `Invoices`: **Relation** to `Fae Intelligence Invoices`

---

### 4.3. Fae Intelligence Tasks

*   **Database ID:** `2376b641-7ac1-810c-a347-f04a0443879b`
*   **Purpose:** To manage individual tasks within projects or standalone.
*   **Properties:**
    *   `Title`: **Title** (Text)
    *   `Description`: **Text**
    *   `Project`: **Relation** to `Fae Intelligence Projects`
    *   `Status`: **Select** (Options: `To Do`, `In Progress`, `Review`, `Done`, `Blocked`)
    *   `Priority`: **Select** (Options: `Urgent`, `High`, `Medium`, `Low`)
    *   `Assigned To`: **Multi-select**
    *   `Start Date`: **Date**
    *   `Due Date`: **Date**
    *   `Estimated Cost`: **Number** (Currency)
    *   `Actual Cost`: **Number** (Currency)
    *   `Potential Revenue`: **Number** (Currency)
    *   `Linked Blueprint Activity`: **Text** (Rich Text, for now)
    *   `CRM Info Snippet`: **Text** (Rich Text, for now)

---

### 4.4. Fae Intelligence Deals

*   **Database ID:** `2376b641-7ac1-810f-8593-d31823cfd8b5`
*   **Purpose:** To track sales opportunities and their progress.
*   **Properties:**
    *   `Deal Name`: **Title** (Text)
    *   `Client`: **Relation** to `Fae Intelligence Clients`
    *   `Value`: **Number** (Currency)
    *   `Stage`: **Select** (Options: `Lead`, `Contacted`, `Proposal`, `Negotiation`, `Closed Won`, `Closed Lost`)
    *   `Expected Close Date`: **Date**
    *   `Assigned To`: **Multi-select**
    *   `Notes`: **Text**
    *   `Linked Activities`: **Relation** to `Fae Intelligence Activities`

---

### 4.5. Fae Intelligence Expenses

*   **Database ID:** `2376b641-7ac1-8164-ae8a-ed9cadaea0f2`
*   **Purpose:** To record and categorize business expenses.
*   **Properties:**
    *   `Expense Name`: **Title** (Text)
    *   `Date`: **Date**
    *   `Category`: **Select** (Options: `Software & Subscriptions`, `Marketing & Advertising`, `Travel & Accommodation`, `Office Supplies & Equipment`, `Contractors & Freelancers`, `Utilities`, `Bank Fees`, `Professional Development`, `Other`)
    *   `Description`: **Text**
    *   `Amount`: **Number** (Currency)
    *   `Project`: **Relation** to `Fae Intelligence Projects`
    *   `Receipt URL`: **URL**

---

### 4.6. Fae Intelligence Revenue Items

*   **Database ID:** `2376b641-7ac1-81c0-8623-cd02bafe03e0`
*   **Purpose:** To track all incoming revenue.
*   **Properties:**
    *   `Revenue Name`: **Title** (Text)
    *   `Date`: **Date**
    *   `Source`: **Select** (Options: `Project Payment`, `Consulting Retainer`, `Product Sale`, `Affiliate Income`, `Invoice Payment`, `Other`)
    *   `Description`: **Text**
    *   `Amount`: **Number** (Currency)
    *   `Project`: **Relation** to `Fae Intelligence Projects`
    *   `Client`: **Relation** to `Fae Intelligence Clients`

---

### 4.7. Fae Intelligence Invoices

*   **Database ID:** `2376b641-7ac1-8117-b973-df42438aad2a`
*   **Purpose:** To manage invoices issued to clients.
*   **Properties:**
    *   `Invoice Number`: **Title** (Text)
    *   `Client`: **Relation** to `Fae Intelligence Clients`
    *   `Project`: **Relation** to `Fae Intelligence Projects`
    *   `Issue Date`: **Date**
    *   `Due Date`: **Date**
    *   `Status`: **Select** (Options: `Draft`, `Sent`, `Paid`, `Overdue`, `Cancelled`)
    *   `Subtotal`: **Number** (Currency)
    *   `Tax Rate`: **Number** (Percentage)
    *   `Tax Amount`: **Number** (Currency)
    *   `Total Amount`: **Number** (Currency)
    *   `Notes`: **Text**
    *   `Payment Date`: **Date**
    *   `Line Items`: **Relation** to `Fae Intelligence Invoice Line Items`

---

### 4.8. Fae Intelligence Invoice Line Items

*   **Database ID:** `2376b641-7ac1-81fe-88aa-f3fd74e9ef8a`
*   **Purpose:** To detail the individual items on each invoice.
*   **Properties:**
    *   `Description`: **Title** (Text)
    *   `Quantity`: **Number**
    *   `Unit Price`: **Number** (Currency)
    *   `Invoice`: **Relation** to `Fae Intelligence Invoices`
    *   `Total`: (Formula property, to be added manually in Notion or calculated in backend)

---

### 4.9. Fae Intelligence Communication Log

*   **Database ID:** `2376b641-7ac1-8165-9ac1-e29d21d900bb`
*   **Purpose:** To record interactions with clients.
*   **Properties:**
    *   `Summary`: **Title** (Text)
    *   `Date`: **Date**
    *   `Client`: **Relation** to `Fae Intelligence Clients`
    *   `Type`: **Select** (Options: `Email`, `Call`, `Meeting`, `Note`)
    *   `Notes`: **Text**
    *   `Recorded By`: **Multi-select**

---

### 4.10. Fae Intelligence Phases

*   **Database ID:** `2376b641-7ac1-8184-bac7-c47503489863`
*   **Purpose:** To organize the strategic blueprint into distinct phases.
*   **Properties:**
    *   `Title`: **Title** (Text)
    *   `Duration`: **Text**
    *   `Objective`: **Text**
    *   `Key Activities`: **Relation** to `Fae Intelligence Activities`

---

### 4.11. Fae Intelligence Activities

*   **Database ID:** `2376b641-7ac1-812f-b077-ec0a5831ee36`
*   **Purpose:** To store the key activities from the Strategic Blueprint, potentially linking to CRM and project tasks.
*   **Properties:**
    *   `Title`: **Title** (Text)
    *   `Phase`: **Relation** to `Fae Intelligence Phases`
    *   `Prompt`: **Text**
    *   `Outcome`: **Text**
    *   `Status`: **Select** (Options: `To Do`, `In Progress`, `Done`, `Blocked`, `On Hold`)
    *   `Priority`: **Select** (Options: `High`, `Medium`, `Low`)
    *   `Planning Notes`: **Text**
    *   `Assigned To`: **Multi-select**
    *   `Start Date`: **Date**
    *   `Due Date`: **Date**
    *   `Dependencies`: **Text**
    *   `Is CRM Activity`: **Checkbox**
    *   `Lead Source`: **Text**
    *   `Customer Name`: **Text**
    *   `Deal Stage`: **Select** (Options: `Lead`, `Contacted`, `Proposal`, `Negotiation`, `Closed Won`, `Closed Lost`)
    *   `Estimated Value`: **Number** (Currency)
    *   `CRM Notes`: **Text**
    *   `Linked Tasks`: **Relation** to `Fae Intelligence Tasks`

---
