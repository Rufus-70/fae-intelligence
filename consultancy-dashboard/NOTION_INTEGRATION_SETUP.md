# Notion Integration Setup for Consultancy Dashboard 📝

## Overview
The consultancy dashboard now supports automatic expense tracking to Notion. When you create new expenses, they will be automatically logged to your Notion workspace.

## Setup Instructions

### 1. Create Notion Integration
1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name it "Consultancy Dashboard"
4. Select your workspace
5. Copy the "Internal Integration Token" (starts with `secret_`)

### 2. Create Expenses Database in Notion
1. Create a new database in Notion called "Expenses"
2. Add these properties:
   - **Name** (Title) - Auto-generated from description + amount
   - **Category** (Select) - Add all expense categories:
     - Software & Subscriptions
     - Marketing & Advertising  
     - Travel & Accommodation
     - Office Supplies & Equipment
     - Contractors & Freelancers
     - Utilities
     - Bank Fees
     - Professional Development
     - Other
   - **Amount** (Number) - Dollar amount
   - **Date** (Date) - When expense occurred
   - **Project** (Rich Text) - Associated project name
   - **Description** (Rich Text) - Full expense description

### 3. Share Database with Integration
1. Open your Expenses database in Notion
2. Click "Share" button (top right)
3. Click "Invite" and search for your integration name
4. Give it "Edit" permissions
5. Copy the database ID from the URL (after the last slash, before the `?`)

### 4. Configure Environment Variables
Create a `.env.local` file in the consultancy-dashboard directory:

```bash
# Notion Integration
REACT_APP_NOTION_API_KEY=secret_your_integration_token_here
REACT_APP_NOTION_EXPENSES_DB_ID=your_database_id_here
```

### 5. Enable Integration in Code
In `App.tsx`, uncomment the actual Notion API call section (lines 121-136):

```typescript
// Uncomment this section:
const response = await fetch('https://api.notion.com/v1/pages', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_NOTION_API_KEY}`,
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
  },
  body: JSON.stringify(notionData)
});

if (response.ok) {
  const result = await response.json();
  console.log('Notion page created:', result.url);
}
```

## How It Works

When you create a new expense in the dashboard:

1. **Local Storage**: Expense is immediately saved to the dashboard
2. **Notion Creation**: A new page is created in your Expenses database
3. **Data Sync**: All expense details are populated in Notion properties

## Expense Page Format in Notion

Each expense creates a page with this structure:
- **Title**: `[Description] - $[Amount]`
- **Properties**: All expense metadata (category, date, project, etc.)
- **Content**: Full description and any additional notes

## Testing the Integration

1. Set up the integration as described above
2. Create a test expense in the dashboard
3. Check your browser console for "Creating Notion expense page:" log
4. If properly configured, you should see the page appear in your Notion database
5. Check for any error messages in the console

## Troubleshooting

### Common Issues:
- **Database ID Error**: Make sure you copied the correct database ID from the URL
- **Permission Error**: Ensure the integration has edit access to the database  
- **API Key Error**: Verify the integration token is correct and properly formatted
- **Property Mismatch**: Ensure all database properties match exactly (case-sensitive)

### Debug Steps:
1. Check browser console for error messages
2. Verify environment variables are loaded: `console.log(process.env.REACT_APP_NOTION_API_KEY)`
3. Test API key with a simple Notion API call
4. Ensure database properties exist and are correctly named

## Future Enhancements

- **Bidirectional Sync**: Update dashboard when Notion expenses are modified
- **Receipt Attachments**: Upload receipt images to Notion pages
- **Project Integration**: Link to project databases in Notion
- **Expense Categories**: Auto-suggest categories based on description
- **Bulk Import**: Import existing expenses from spreadsheets

---

**Status**: Basic integration implemented ✅  
**Next Step**: Configure environment variables and test integration  
**Documentation**: Complete setup guide ready for use