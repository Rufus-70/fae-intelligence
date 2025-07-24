# Blog Workflow Fix - Manual Review Implementation

**Source:** `/home/rosie/projects/workflows/BLOG_WORKFLOW_FIX.md`

## Current Issue
Your "Blog Outline" workflow stops after generating high search volume keywords because the topic selection isn't properly connected to continue the flow.

## Solution: Add Manual Review Gate

### Option 1: Wait Node with Manual Trigger
Add a **Wait node** after "High search volume keywords" that:
1. Pauses the workflow
2. Sends you a notification with the keywords
3. Lets you manually approve/reject
4. Continues to topic selection only after approval

### Option 2: Split into Two Workflows
**Workflow 1:** Keyword Research & Review
- Google Trends → High Volume Keywords → Save to Sheet
- Manual review happens in the sheet
- Trigger Workflow 2 when ready

**Workflow 2:** Content Creation
- Triggered manually after keyword approval
- Topic Selection → Research → Content Generation

## Recommended Fix (Option 1)

### Step 1: Enable the Workflow
In N8N interface:
1. Open "Blog Outline" workflow
2. Click the toggle to make it **Active**

### Step 2: Fix the Topic Chooser Connection
1. Connect "Topic Chooser 2" output to "Research Topic- Perplexity"
2. Remove connection from disabled "Choosing Topic" node

### Step 3: Add Review Gate
Add new nodes between "High search volume keywords" and topic selection:

**New Node 1: Send Email Notification**
- Trigger: After "High search volume keywords"
- Action: Email you the keywords for review
- Include: Keywords list + approval webhook link

**New Node 2: Wait for Webhook** 
- Trigger: Manual webhook call
- Action: Resume workflow when you approve
- Timeout: 24 hours

## Implementation Steps

1. **Activate the workflow** in N8N
2. **Fix the disabled nodes** or connections
3. **Add manual review nodes** as described above
4. **Test with manual trigger** before enabling schedule
