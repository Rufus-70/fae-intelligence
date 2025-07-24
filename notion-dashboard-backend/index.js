require('dotenv').config();
const express = require('express');
const { Client } = require('@notionhq/client');

const app = express();
const port = process.env.PORT || 3001;

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

app.use(express.json());

// Basic test endpoint
app.get('/', (req, res) => {
  res.send('Notion Dashboard Backend is running!');
});

// Clients Endpoints
app.get('/api/clients', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-81ae-a0d0-c0ac1fa2a915'; // Fae Intelligence Clients Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const clients = response.results.map(page => ({
      id: page.id,
      clientName: page.properties['Client Name']?.title[0]?.plain_text || '',
      contactPerson: page.properties['Contact Person']?.rich_text[0]?.plain_text || '',
      email: page.properties['Email']?.email || '',
      phone: page.properties['Phone']?.phone_number || '',
      status: page.properties['Status']?.select?.name || '',
      lastInteraction: page.properties['Last Interaction']?.date?.start || '',
    }));

    res.json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// Example endpoint to list databases (for testing Notion API connection)
app.get('/databases', async (req, res) => {
  try {
    const response = await notion.databases.list({});
    res.json(response);
  } catch (error) {
    console.error('Error listing databases:', error);
    res.status(500).json({ error: 'Failed to list databases' });
  }
});

// Clients Endpoints
app.post('/api/clients', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-81ae-a0d0-c0ac1fa2a915'; // Fae Intelligence Clients Database ID
    const { clientName, contactPerson, email, phone, status } = req.body;

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        'Client Name': {
          title: [
            {
              text: { content: clientName },
            },
          ],
        },
        'Contact Person': {
          rich_text: [
            {
              text: { content: contactPerson || '' },
            },
          ],
        },
        'Email': {
          email: email || null,
        },
        'Phone': {
          phone_number: phone || null,
        },
        'Status': {
          select: { name: status },
        },
      },
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

app.patch('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { clientName, contactPerson, email, phone, status } = req.body;

    const properties = {};
    if (clientName) properties['Client Name'] = { title: [{ text: { content: clientName } }] };
    if (contactPerson) properties['Contact Person'] = { rich_text: [{ text: { content: contactPerson } }] };
    if (email) properties['Email'] = { email: email };
    if (phone) properties['Phone'] = { phone_number: phone };
    if (status) properties['Status'] = { select: { name: status } };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ error: 'Failed to update client' });
  }
});

app.delete('/api/clients/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

// Projects Endpoints
app.get('/api/projects', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-810b-941e-e81c7f932dd4'; // Fae Intelligence Projects Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const projects = response.results.map(page => ({
      id: page.id,
      projectName: page.properties['Project Name']?.title[0]?.plain_text || '',
      description: page.properties['Description']?.rich_text[0]?.plain_text || '',
      clientId: page.properties['Client']?.relation[0]?.id || undefined,
      status: page.properties['Status']?.select?.name || '',
      startDate: page.properties['Start Date']?.date?.start || '',
      dueDate: page.properties['Due Date']?.date?.start || '',
      teamMembers: page.properties['Team Members']?.multi_select.map(member => member.name) || [],
    }));

    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-810b-941e-e81c7f932dd4'; // Fae Intelligence Projects Database ID
    const { projectName, description, clientId, status, startDate, dueDate, teamMembers } = req.body;

    const properties = {
      'Project Name': {
        title: [
          {
            text: { content: projectName },
          },
        ],
      },
      'Description': {
        rich_text: [
          {
            text: { content: description || '' },
          },
        ],
      },
      'Status': {
        select: { name: status },
      },
    };

    if (clientId) {
      properties['Client'] = {
        relation: [{
          id: clientId
        }]
      };
    }
    if (startDate) {
      properties['Start Date'] = {
        date: { start: startDate }
      };
    }
    if (dueDate) {
      properties['Due Date'] = {
        date: { start: dueDate }
      };
    }
    if (teamMembers && teamMembers.length > 0) {
      properties['Team Members'] = {
        multi_select: teamMembers.map(member => ({ name: member }))
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.patch('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, description, clientId, status, startDate, dueDate, teamMembers } = req.body;

    const properties = {};
    if (projectName) properties['Project Name'] = { title: [{ text: { content: projectName } }] };
    if (description) properties['Description'] = { rich_text: [{ text: { content: description } }] };
    if (clientId) properties['Client'] = { relation: [{ id: clientId }] };
    if (status) properties['Status'] = { select: { name: status } };
    if (startDate) properties['Start Date'] = { date: { start: startDate } };
    if (dueDate) properties['Due Date'] = { date: { start: dueDate } };
    if (teamMembers) properties['Team Members'] = { multi_select: teamMembers.map(member => ({ name: member })) };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Tasks Endpoints
app.get('/api/tasks', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-810c-a347-f04a0443879b'; // Fae Intelligence Tasks Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const tasks = response.results.map(page => ({
      id: page.id,
      title: page.properties['Title']?.title[0]?.plain_text || '',
      description: page.properties['Description']?.rich_text[0]?.plain_text || '',
      projectId: page.properties['Project']?.relation[0]?.id || undefined,
      status: page.properties['Status']?.select?.name || '',
      priority: page.properties['Priority']?.select?.name || '',
      assignedTo: page.properties['Assigned To']?.multi_select.map(member => member.name) || [],
      startDate: page.properties['Start Date']?.date?.start || '',
      dueDate: page.properties['Due Date']?.date?.start || '',
      estimatedCost: page.properties['Estimated Cost']?.number || 0,
      actualCost: page.properties['Actual Cost']?.number || 0,
      potentialRevenue: page.properties['Potential Revenue']?.number || 0,
      linkedBlueprintActivityId: page.properties['Linked Blueprint Activity']?.rich_text[0]?.plain_text || '',
      crmInfoSnippet: page.properties['CRM Info Snippet']?.rich_text[0]?.plain_text || '',
    }));

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-810c-a347-f04a0443879b'; // Fae Intelligence Tasks Database ID
    const { title, description, projectId, status, priority, assignedTo, startDate, dueDate, estimatedCost, actualCost, potentialRevenue, linkedBlueprintActivityId, crmInfoSnippet } = req.body;

    const properties = {
      'Title': {
        title: [
          {
            text: { content: title },
          },
        ],
      },
      'Description': {
        rich_text: [
          {
            text: { content: description || '' },
          },
        ],
      },
      'Status': {
        select: { name: status },
      },
      'Priority': {
        select: { name: priority },
      },
    };

    if (projectId) {
      properties['Project'] = {
        relation: [{
          id: projectId
        }]
      };
    }
    if (assignedTo && assignedTo.length > 0) {
      properties['Assigned To'] = {
        multi_select: assignedTo.map(member => ({ name: member }))
      };
    }
    if (startDate) {
      properties['Start Date'] = {
        date: { start: startDate }
      };
    }
    if (dueDate) {
      properties['Due Date'] = {
        date: { start: dueDate }
      };
    }
    if (estimatedCost) {
      properties['Estimated Cost'] = {
        number: estimatedCost
      };
    }
    if (actualCost) {
      properties['Actual Cost'] = {
        number: actualCost
      };
    }
    if (potentialRevenue) {
      properties['Potential Revenue'] = {
        number: potentialRevenue
      };
    }
    if (linkedBlueprintActivityId) {
      properties['Linked Blueprint Activity'] = {
        rich_text: [{ text: { content: linkedBlueprintActivityId } }]
      };
    }
    if (crmInfoSnippet) {
      properties['CRM Info Snippet'] = {
        rich_text: [{ text: { content: crmInfoSnippet } }]
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

app.patch('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, projectId, status, priority, assignedTo, startDate, dueDate, estimatedCost, actualCost, potentialRevenue, linkedBlueprintActivityId, crmInfoSnippet } = req.body;

    const properties = {};
    if (title) properties['Title'] = { title: [{ text: { content: title } }] };
    if (description) properties['Description'] = { rich_text: [{ text: { content: description } }] };
    if (projectId) properties['Project'] = { relation: [{ id: projectId }] };
    if (status) properties['Status'] = { select: { name: status } };
    if (priority) properties['Priority'] = { select: { name: priority } };
    if (assignedTo) properties['Assigned To'] = { multi_select: assignedTo.map(member => ({ name: member })) };
    if (startDate) properties['Start Date'] = { date: { start: startDate } };
    if (dueDate) properties['Due Date'] = { date: { start: dueDate } };
    if (estimatedCost) properties['Estimated Cost'] = { number: estimatedCost };
    if (actualCost) properties['Actual Cost'] = { number: actualCost };
    if (potentialRevenue) properties['Potential Revenue'] = { number: potentialRevenue };
    if (linkedBlueprintActivityId) properties['Linked Blueprint Activity'] = { rich_text: [{ text: { content: linkedBlueprintActivityId } }] };
    if (crmInfoSnippet) properties['CRM Info Snippet'] = { rich_text: [{ text: { content: crmInfoSnippet } }] };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Deals Endpoints
app.get('/api/deals', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-810f-8593-d31823cfd8b5'; // Fae Intelligence Deals Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const deals = response.results.map(page => ({
      id: page.id,
      dealName: page.properties['Deal Name']?.title[0]?.plain_text || '',
      clientId: page.properties['Client']?.relation[0]?.id || undefined,
      value: page.properties['Value']?.number || 0,
      stage: page.properties['Stage']?.select?.name || '',
      expectedCloseDate: page.properties['Expected Close Date']?.date?.start || '',
      assignedTo: page.properties['Assigned To']?.multi_select.map(member => member.name) || [],
      notes: page.properties['Notes']?.rich_text[0]?.plain_text || '',
    }));

    res.json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

app.post('/api/deals', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-810f-8593-d31823cfd8b5'; // Fae Intelligence Deals Database ID
    const { dealName, clientId, value, stage, expectedCloseDate, assignedTo, notes } = req.body;

    const properties = {
      'Deal Name': {
        title: [
          {
            text: { content: dealName },
          },
        ],
      },
      'Value': {
        number: value,
      },
      'Stage': {
        select: { name: stage },
      },
    };

    if (clientId) {
      properties['Client'] = {
        relation: [{
          id: clientId
        }]
      };
    }
    if (expectedCloseDate) {
      properties['Expected Close Date'] = {
        date: { start: expectedCloseDate }
      };
    }
    if (assignedTo && assignedTo.length > 0) {
      properties['Assigned To'] = {
        multi_select: assignedTo.map(member => ({ name: member }))
      };
    }
    if (notes) {
      properties['Notes'] = {
        rich_text: [{ text: { content: notes } }]
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating deal:', error);
    res.status(500).json({ error: 'Failed to create deal' });
  }
});

app.patch('/api/deals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { dealName, clientId, value, stage, expectedCloseDate, assignedTo, notes } = req.body;

    const properties = {};
    if (dealName) properties['Deal Name'] = { title: [{ text: { content: dealName } }] };
    if (clientId) properties['Client'] = { relation: [{ id: clientId }] };
    if (value) properties['Value'] = { number: value };
    if (stage) properties['Stage'] = { select: { name: stage } };
    if (expectedCloseDate) properties['Expected Close Date'] = { date: { start: expectedCloseDate } };
    if (assignedTo) properties['Assigned To'] = { multi_select: assignedTo.map(member => ({ name: member })) };
    if (notes) properties['Notes'] = { rich_text: [{ text: { content: notes } }] };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating deal:', error);
    res.status(500).json({ error: 'Failed to update deal' });
  }
});

app.delete('/api/deals/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(500).json({ error: 'Failed to delete deal' });
  }
});

// Expenses Endpoints
app.get('/api/expenses', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8164-ae8a-ed9cadaea0f2'; // Fae Intelligence Expenses Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const expenses = response.results.map(page => ({
      id: page.id,
      expenseName: page.properties['Expense Name']?.title[0]?.plain_text || '',
      date: page.properties['Date']?.date?.start || '',
      category: page.properties['Category']?.select?.name || '',
      description: page.properties['Description']?.rich_text[0]?.plain_text || '',
      amount: page.properties['Amount']?.number || 0,
      projectId: page.properties['Project']?.relation[0]?.id || undefined,
      receiptUrl: page.properties['Receipt URL']?.url || '',
    }));

    res.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
});

app.post('/api/expenses', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8164-ae8a-ed9cadaea0f2'; // Fae Intelligence Expenses Database ID
    const { expenseName, date, category, description, amount, projectId, receiptUrl } = req.body;

    const properties = {
      'Expense Name': {
        title: [
          {
            text: { content: expenseName },
          },
        ],
      },
      'Date': {
        date: { start: date },
      },
      'Category': {
        select: { name: category },
      },
      'Description': {
        rich_text: [
          {
            text: { content: description || '' },
          },
        ],
      },
      'Amount': {
        number: amount,
      },
    };

    if (projectId) {
      properties['Project'] = {
        relation: [{
          id: projectId
        }]
      };
    }
    if (receiptUrl) {
      properties['Receipt URL'] = {
        url: receiptUrl
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Failed to create expense' });
  }
});

app.patch('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { expenseName, date, category, description, amount, projectId, receiptUrl } = req.body;

    const properties = {};
    if (expenseName) properties['Expense Name'] = { title: [{ text: { content: expenseName } }] };
    if (date) properties['Date'] = { date: { start: date } };
    if (category) properties['Category'] = { select: { name: category } };
    if (description) properties['Description'] = { rich_text: [{ text: { content: description } }] };
    if (amount) properties['Amount'] = { number: amount };
    if (projectId) properties['Project'] = { relation: [{ id: projectId }] };
    if (receiptUrl) properties['Receipt URL'] = { url: receiptUrl };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Failed to update expense' });
  }
});

app.delete('/api/expenses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
});

// Revenue Items Endpoints
app.get('/api/revenue-items', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-81c0-8623-cd02bafe03e0'; // Fae Intelligence Revenue Items Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const revenueItems = response.results.map(page => ({
      id: page.id,
      revenueName: page.properties['Revenue Name']?.title[0]?.plain_text || '',
      date: page.properties['Date']?.date?.start || '',
      source: page.properties['Source']?.select?.name || '',
      description: page.properties['Description']?.rich_text[0]?.plain_text || '',
      amount: page.properties['Amount']?.number || 0,
      projectId: page.properties['Project']?.relation[0]?.id || undefined,
      clientId: page.properties['Client']?.relation[0]?.id || undefined,
    }));

    res.json(revenueItems);
  } catch (error) {
    console.error('Error fetching revenue items:', error);
    res.status(500).json({ error: 'Failed to fetch revenue items' });
  }
});

app.post('/api/revenue-items', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-81c0-8623-cd02bafe03e0'; // Fae Intelligence Revenue Items Database ID
    const { revenueName, date, source, description, amount, projectId, clientId } = req.body;

    const properties = {
      'Revenue Name': {
        title: [
          {
            text: { content: revenueName },
          },
        ],
      },
      'Date': {
        date: { start: date },
      },
      'Source': {
        select: { name: source },
      },
      'Description': {
        rich_text: [
          {
            text: { content: description || '' },
          },
        ],
      },
      'Amount': {
        number: amount,
      },
    };

    if (projectId) {
      properties['Project'] = {
        relation: [{
          id: projectId
        }]
      };
    }
    if (clientId) {
      properties['Client'] = {
        relation: [{
          id: clientId
        }]
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating revenue item:', error);
    res.status(500).json({ error: 'Failed to create revenue item' });
  }
});

app.patch('/api/revenue-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { revenueName, date, source, description, amount, projectId, clientId } = req.body;

    const properties = {};
    if (revenueName) properties['Revenue Name'] = { title: [{ text: { content: revenueName } }] };
    if (date) properties['Date'] = { date: { start: date } };
    if (source) properties['Source'] = { select: { name: source } };
    if (description) properties['Description'] = { rich_text: [{ text: { content: description } }] };
    if (amount) properties['Amount'] = { number: amount };
    if (projectId) properties['Project'] = { relation: [{ id: projectId }] };
    if (clientId) properties['Client'] = { relation: [{ id: clientId }] };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating revenue item:', error);
    res.status(500).json({ error: 'Failed to update revenue item' });
  }
});

app.delete('/api/revenue-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting revenue item:', error);
    res.status(500).json({ error: 'Failed to delete revenue item' });
  }
});

// Invoices Endpoints
app.get('/api/invoices', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8117-b973-df42438aad2a'; // Fae Intelligence Invoices Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const invoices = response.results.map(page => ({
      id: page.id,
      invoiceNumber: page.properties['Invoice Number']?.title[0]?.plain_text || '',
      clientId: page.properties['Client']?.relation[0]?.id || undefined,
      projectId: page.properties['Project']?.relation[0]?.id || undefined,
      issueDate: page.properties['Issue Date']?.date?.start || '',
      dueDate: page.properties['Due Date']?.date?.start || '',
      status: page.properties['Status']?.select?.name || '',
      subtotal: page.properties['Subtotal']?.number || 0,
      taxRate: page.properties['Tax Rate']?.number || 0,
      taxAmount: page.properties['Tax Amount']?.number || 0,
      totalAmount: page.properties['Total Amount']?.number || 0,
      notes: page.properties['Notes']?.rich_text[0]?.plain_text || '',
      paymentDate: page.properties['Payment Date']?.date?.start || '',
    }));

    res.json(invoices);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

app.post('/api/invoices', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8117-b973-df42438aad2a'; // Fae Intelligence Invoices Database ID
    const { invoiceNumber, clientId, projectId, issueDate, dueDate, status, subtotal, taxRate, taxAmount, totalAmount, notes, paymentDate } = req.body;

    const properties = {
      'Invoice Number': {
        title: [
          {
            text: { content: invoiceNumber },
          },
        ],
      },
      'Client': {
        relation: [{
          id: clientId
        }]
      },
      'Issue Date': {
        date: { start: issueDate },
      },
      'Due Date': {
        date: { start: dueDate },
      },
      'Status': {
        select: { name: status },
      },
      'Subtotal': {
        number: subtotal,
      },
      'Tax Rate': {
        number: taxRate,
      },
      'Tax Amount': {
        number: taxAmount,
      },
      'Total Amount': {
        number: totalAmount,
      },
    };

    if (projectId) {
      properties['Project'] = {
        relation: [{
          id: projectId
        }]
      };
    }
    if (notes) {
      properties['Notes'] = {
        rich_text: [{ text: { content: notes } }]
      };
    }
    if (paymentDate) {
      properties['Payment Date'] = {
        date: { start: paymentDate }
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

app.patch('/api/invoices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { invoiceNumber, clientId, projectId, issueDate, dueDate, status, subtotal, taxRate, taxAmount, totalAmount, notes, paymentDate } = req.body;

    const properties = {};
    if (invoiceNumber) properties['Invoice Number'] = { title: [{ text: { content: invoiceNumber } }] };
    if (clientId) properties['Client'] = { relation: [{ id: clientId }] };
    if (projectId) properties['Project'] = { relation: [{ id: projectId }] };
    if (issueDate) properties['Issue Date'] = { date: { start: issueDate } };
    if (dueDate) properties['Due Date'] = { date: { start: dueDate } };
    if (status) properties['Status'] = { select: { name: status } };
    if (subtotal) properties['Subtotal'] = { number: subtotal };
    if (taxRate) properties['Tax Rate'] = { number: taxRate };
    if (taxAmount) properties['Tax Amount'] = { number: taxAmount };
    if (totalAmount) properties['Total Amount'] = { number: totalAmount };
    if (notes) properties['Notes'] = { rich_text: [{ text: { content: notes } }] };
    if (paymentDate) properties['Payment Date'] = { date: { start: paymentDate } };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating invoice:', error);
    res.status(500).json({ error: 'Failed to update invoice' });
  }
});

app.delete('/api/invoices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting invoice:', error);
    res.status(500).json({ error: 'Failed to delete invoice' });
  }
});

// Invoice Line Items Endpoints
app.get('/api/invoice-line-items', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-81fe-88aa-f3fd74e9ef8a'; // Fae Intelligence Invoice Line Items Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const lineItems = response.results.map(page => ({
      id: page.id,
      description: page.properties['Description']?.title[0]?.plain_text || '',
      quantity: page.properties['Quantity']?.number || 0,
      unitPrice: page.properties['Unit Price']?.number || 0,
      invoiceId: page.properties['Invoice']?.relation[0]?.id || undefined,
    }));

    res.json(lineItems);
  } catch (error) {
    console.error('Error fetching invoice line items:', error);
    res.status(500).json({ error: 'Failed to fetch invoice line items' });
  }
});

app.post('/api/invoice-line-items', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-81fe-88aa-f3fd74e9ef8a'; // Fae Intelligence Invoice Line Items Database ID
    const { description, quantity, unitPrice, invoiceId } = req.body;

    const properties = {
      'Description': {
        title: [
          {
            text: { content: description },
          },
        ],
      },
      'Quantity': {
        number: quantity,
      },
      'Unit Price': {
        number: unitPrice,
      },
    };

    if (invoiceId) {
      properties['Invoice'] = {
        relation: [{
          id: invoiceId
        }]
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating invoice line item:', error);
    res.status(500).json({ error: 'Failed to create invoice line item' });
  }
});

app.patch('/api/invoice-line-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, quantity, unitPrice, invoiceId } = req.body;

    const properties = {};
    if (description) properties['Description'] = { title: [{ text: { content: description } }] };
    if (quantity) properties['Quantity'] = { number: quantity };
    if (unitPrice) properties['Unit Price'] = { number: unitPrice };
    if (invoiceId) properties['Invoice'] = { relation: [{ id: invoiceId }] };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating invoice line item:', error);
    res.status(500).json({ error: 'Failed to update invoice line item' });
  }
});

app.delete('/api/invoice-line-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting invoice line item:', error);
    res.status(500).json({ error: 'Failed to delete invoice line item' });
  }
});

// Communication Log Endpoints
app.get('/api/communication-log', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8165-9ac1-e29d21d900bb'; // Fae Intelligence Communication Log Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const communicationLog = response.results.map(page => ({
      id: page.id,
      summary: page.properties['Summary']?.title[0]?.plain_text || '',
      date: page.properties['Date']?.date?.start || '',
      clientId: page.properties['Client']?.relation[0]?.id || undefined,
      type: page.properties['Type']?.select?.name || '',
      notes: page.properties['Notes']?.rich_text[0]?.plain_text || '',
      recordedBy: page.properties['Recorded By']?.multi_select.map(member => member.name) || [],
    }));

    res.json(communicationLog);
  } catch (error) {
    console.error('Error fetching communication log:', error);
    res.status(500).json({ error: 'Failed to fetch communication log' });
  }
});

app.post('/api/communication-log', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8165-9ac1-e29d21d900bb'; // Fae Intelligence Communication Log Database ID
    const { summary, date, clientId, type, notes, recordedBy } = req.body;

    const properties = {
      'Summary': {
        title: [
          {
            text: { content: summary },
          },
        ],
      },
      'Date': {
        date: { start: date },
      },
      'Client': {
        relation: [{
          id: clientId
        }]
      },
      'Type': {
        select: { name: type },
      },
    };

    if (notes) {
      properties['Notes'] = {
        rich_text: [{ text: { content: notes } }]
      };
    }
    if (recordedBy && recordedBy.length > 0) {
      properties['Recorded By'] = {
        multi_select: recordedBy.map(member => ({ name: member }))
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating communication log entry:', error);
    res.status(500).json({ error: 'Failed to create communication log entry' });
  }
});

app.patch('/api/communication-log/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { summary, date, clientId, type, notes, recordedBy } = req.body;

    const properties = {};
    if (summary) properties['Summary'] = { title: [{ text: { content: summary } }] };
    if (date) properties['Date'] = { date: { start: date } };
    if (clientId) properties['Client'] = { relation: [{ id: clientId }] };
    if (type) properties['Type'] = { select: { name: type } };
    if (notes) properties['Notes'] = { rich_text: [{ text: { content: notes } }] };
    if (recordedBy) properties['Recorded By'] = { multi_select: recordedBy.map(member => ({ name: member })) };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating communication log entry:', error);
    res.status(500).json({ error: 'Failed to update communication log entry' });
  }
});

app.delete('/api/communication-log/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting communication log entry:', error);
    res.status(500).json({ error: 'Failed to delete communication log entry' });
  }
});

// Phases Endpoints
app.get('/api/phases', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8184-bac7-c47503489863'; // Fae Intelligence Phases Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const phases = response.results.map(page => ({
      id: page.id,
      title: page.properties['Title']?.title[0]?.plain_text || '',
      duration: page.properties['Duration']?.rich_text[0]?.plain_text || '',
      objective: page.properties['Objective']?.rich_text[0]?.plain_text || '',
    }));

    res.json(phases);
  } catch (error) {
    console.error('Error fetching phases:', error);
    res.status(500).json({ error: 'Failed to fetch phases' });
  }
});

app.post('/api/phases', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-8184-bac7-c47503489863'; // Fae Intelligence Phases Database ID
    const { title, duration, objective } = req.body;

    const properties = {
      'Title': {
        title: [
          {
            text: { content: title },
          },
        ],
      },
      'Duration': {
        rich_text: [
          {
            text: { content: duration || '' },
          },
        ],
      },
      'Objective': {
        rich_text: [
          {
            text: { content: objective || '' },
          },
        ],
      },
    };

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating phase:', error);
    res.status(500).json({ error: 'Failed to create phase' });
  }
});

app.patch('/api/phases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration, objective } = req.body;

    const properties = {};
    if (title) properties['Title'] = { title: [{ text: { content: title } }] };
    if (duration) properties['Duration'] = { rich_text: [{ text: { content: duration } }] };
    if (objective) properties['Objective'] = { rich_text: [{ text: { content: objective } }] };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating phase:', error);
    res.status(500).json({ error: 'Failed to update phase' });
  }
});

app.delete('/api/phases/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting phase:', error);
    res.status(500).json({ error: 'Failed to delete phase' });
  }
});

// Activities Endpoints
app.get('/api/activities', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-812f-b077-ec0a5831ee36'; // Fae Intelligence Activities Database ID
    const response = await notion.databases.query({
      database_id: databaseId,
    });

    const activities = response.results.map(page => ({
      id: page.id,
      title: page.properties['Title']?.title[0]?.plain_text || '',
      phaseId: page.properties['Phase']?.relation[0]?.id || undefined,
      prompt: page.properties['Prompt']?.rich_text[0]?.plain_text || '',
      outcome: page.properties['Outcome']?.rich_text[0]?.plain_text || '',
      status: page.properties['Status']?.select?.name || '',
      priority: page.properties['Priority']?.select?.name || '',
      planningNotes: page.properties['Planning Notes']?.rich_text[0]?.plain_text || '',
      assignedTo: page.properties['Assigned To']?.multi_select.map(member => member.name) || [],
      startDate: page.properties['Start Date']?.date?.start || '',
      dueDate: page.properties['Due Date']?.date?.start || '',
      dependencies: page.properties['Dependencies']?.rich_text[0]?.plain_text || '',
      isCrmActivity: page.properties['Is CRM Activity']?.checkbox || false,
      leadSource: page.properties['Lead Source']?.rich_text[0]?.plain_text || '',
      customerName: page.properties['Customer Name']?.rich_text[0]?.plain_text || '',
      dealStage: page.properties['Deal Stage']?.select?.name || '',
      estimatedValue: page.properties['Estimated Value']?.number || 0,
      crmNotes: page.properties['CRM Notes']?.rich_text[0]?.plain_text || '',
      linkedTasks: page.properties['Linked Tasks']?.relation.map(task => task.id) || [],
    }));

    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.post('/api/activities', async (req, res) => {
  try {
    const databaseId = '2376b641-7ac1-812f-b077-ec0a5831ee36'; // Fae Intelligence Activities Database ID
    const { title, phaseId, prompt, outcome, status, priority, planningNotes, assignedTo, startDate, dueDate, dependencies, isCrmActivity, leadSource, customerName, dealStage, estimatedValue, crmNotes, linkedTasks } = req.body;

    const properties = {
      'Title': {
        title: [
          {
            text: { content: title },
          },
        ],
      },
      'Status': {
        select: { name: status },
      },
      'Priority': {
        select: { name: priority },
      },
      'Is CRM Activity': {
        checkbox: isCrmActivity || false,
      },
    };

    if (phaseId) {
      properties['Phase'] = {
        relation: [{
          id: phaseId
        }]
      };
    }
    if (prompt) {
      properties['Prompt'] = {
        rich_text: [{ text: { content: prompt } }]
      };
    }
    if (outcome) {
      properties['Outcome'] = {
        rich_text: [{ text: { content: outcome } }]
      };
    }
    if (planningNotes) {
      properties['Planning Notes'] = {
        rich_text: [{ text: { content: planningNotes } }]
      };
    }
    if (assignedTo && assignedTo.length > 0) {
      properties['Assigned To'] = {
        multi_select: assignedTo.map(member => ({ name: member }))
      };
    }
    if (startDate) {
      properties['Start Date'] = {
        date: { start: startDate }
      };
    }
    if (dueDate) {
      properties['Due Date'] = {
        date: { start: dueDate }
      };
    }
    if (dependencies) {
      properties['Dependencies'] = {
        rich_text: [{ text: { content: dependencies } }]
      };
    }
    if (leadSource) {
      properties['Lead Source'] = {
        rich_text: [{ text: { content: leadSource } }]
      };
    }
    if (customerName) {
      properties['Customer Name'] = {
        rich_text: [{ text: { content: customerName } }]
      };
    }
    if (dealStage) {
      properties['Deal Stage'] = {
        select: { name: dealStage }
      };
    }
    if (estimatedValue) {
      properties['Estimated Value'] = {
        number: estimatedValue
      };
    }
    if (crmNotes) {
      properties['CRM Notes'] = {
        rich_text: [{ text: { content: crmNotes } }]
      };
    }
    if (linkedTasks && linkedTasks.length > 0) {
      properties['Linked Tasks'] = {
        relation: linkedTasks.map(taskId => ({ id: taskId }))
      };
    }

    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
    });
    res.status(201).json({ id: response.id, ...req.body });
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

app.patch('/api/activities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, phaseId, prompt, outcome, status, priority, planningNotes, assignedTo, startDate, dueDate, dependencies, isCrmActivity, leadSource, customerName, dealStage, estimatedValue, crmNotes, linkedTasks } = req.body;

    const properties = {};
    if (title) properties['Title'] = { title: [{ text: { content: title } }] };
    if (phaseId) properties['Phase'] = { relation: [{ id: phaseId }] };
    if (prompt) properties['Prompt'] = { rich_text: [{ text: { content: prompt } }] };
    if (outcome) properties['Outcome'] = { rich_text: [{ text: { content: outcome } }] };
    if (status) properties['Status'] = { select: { name: status } };
    if (priority) properties['Priority'] = { select: { name: priority } };
    if (planningNotes) properties['Planning Notes'] = { rich_text: [{ text: { content: planningNotes } }] };
    if (assignedTo) properties['Assigned To'] = { multi_select: assignedTo.map(member => ({ name: member })) };
    if (startDate) properties['Start Date'] = { date: { start: startDate } };
    if (dueDate) properties['Due Date'] = { date: { start: dueDate } };
    if (dependencies) properties['Dependencies'] = { rich_text: [{ text: { content: dependencies } }] };
    if (isCrmActivity !== undefined) properties['Is CRM Activity'] = { checkbox: isCrmActivity };
    if (leadSource) properties['Lead Source'] = { rich_text: [{ text: { content: leadSource } }] };
    if (customerName) properties['Customer Name'] = { rich_text: [{ text: { content: customerName } }] };
    if (dealStage) properties['Deal Stage'] = { select: { name: dealStage } };
    if (estimatedValue) properties['Estimated Value'] = { number: estimatedValue };
    if (crmNotes) properties['CRM Notes'] = { rich_text: [{ text: { content: crmNotes } }] };
    if (linkedTasks) properties['Linked Tasks'] = { relation: linkedTasks.map(taskId => ({ id: taskId })) };

    await notion.pages.update({
      page_id: id,
      properties: properties,
    });
    res.json({ id, ...req.body });
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

app.delete('/api/activities/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await notion.pages.update({
      page_id: id,
      archived: true,
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

app.listen(port, () => {
  console.log(`Notion Dashboard Backend listening at http://localhost:${port}`);
});
