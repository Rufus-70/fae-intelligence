# How to Manage Blog Content with a Hybrid Approach (Local Markdown + Live Firestore)

This guide outlines the workflow for managing blog content using local Markdown files for writing and editing, and a live Firestore database for the deployed application.

## Overview

This hybrid approach provides the best of both worlds:
-   **Local-First Content Creation:** Use your favorite text editor to write blog posts in Markdown. This is fast, efficient, and works offline.
-   **Dynamic, Live Blog:** The deployed application fetches content from Firestore, allowing for updates without needing to rebuild and redeploy the entire site.

The core of this workflow is a script that reads your local Markdown files and uploads them to your Firestore `blog_posts` collection.

## Part 1: Checking Firestore Data During Local Development

When you run `npm run dev`, your Next.js application is running locally but is configured to communicate with your **live** Firebase project. You can verify the data it's fetching in several ways:

### 1. Use the Firebase Console

This is the most direct way to see your data.
-   Go to the [Firebase Console](https://console.firebase.google.com/).
-   Navigate to your project.
-   Under the "Build" menu, click on **Firestore Database**.
-   Here you can browse your `blog_posts` collection, inspect individual documents, and even manually edit data to test your application's reactivity.

### 2. Check Your Firebase Configuration

Ensure your local environment is pointing to the correct Firebase project.
-   Your project should have a `.env.local` file in the root directory.
-   This file should contain the necessary Firebase configuration variables, for example:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    ```
-   These variables are used in your Firebase initialization file (e.g., `src/lib/firebase.ts`) to connect to the database.

### 3. Inspect Network Requests

You can see the live data being fetched from Firestore in your browser.
-   Open your browser's Developer Tools (F12).
-   Go to the **Network** tab.
-   When you load a blog page, look for requests made to `firestore.googleapis.com`.
-   You can inspect the response of these requests to see the exact data returned from Firestore.

### 4. Use `console.log` for Debugging

Add temporary `console.log` statements in your data-fetching functions to see the data as it arrives in your application.
-   **Example (in your `BlogService`):**
    ```typescript
    // in lib/blog.ts
    async getPostBySlug(slug: string): Promise<BlogPost | null> {
      // ...
      if (!querySnapshot.empty) {
        const post = { id: querySnapshot.docs[0].id, ...docData } as BlogPost;
        console.log("Fetched from Firestore:", post); // Logs in the browser/server console
        return post;
      }
      // ...
    }
    ```

### 5. Firestore Composite Indexes

For complex queries involving multiple `where` clauses or `orderBy` clauses, Firestore requires composite indexes. If you encounter errors like "The query requires an index," Firebase will provide a direct link in the console to create the necessary index. You must create these indexes for your blog posts to load correctly.

## Part 2: Syncing Local Markdown to Firestore

To get your local Markdown posts into Firestore, you will use a local Node.js script.

### Step 1: Create the Ingestion Script

A script file will be created at `scripts/ingest-blog-posts.js`. This script will:
1.  Read all `.md` files from your configured blog posts directory.
2.  Parse the YAML front matter and Markdown content from each file using `gray-matter`.
3.  Connect to your Firestore database using the Firebase Admin SDK.
4.  For each post, it will check if a post with the same `slug` already exists.
    -   If it exists, the script will update it.
    -   If it doesn't exist, the script will create a new one.

### Step 2: Set Up Firebase Admin Credentials for the Ingestion Script

The ingestion script needs administrative access to your Firestore database, which is granted via a "service account".

1.  **Generate a Service Account Key:**
    -   Go to your Firebase Console -> Project Settings -> Service accounts.
    -   Select "Node.js" and click **Generate new private key**.
    -   A JSON file will be downloaded. **Treat this file like a password. Do not commit it to Git.**

2.  **Store the Key Securely:**
    -   Place the downloaded JSON file in the root directory of your project (e.g., `/home/rosie/projects/fae-intelligence/your-service-account-key.json`).
    -   **IMPORTANT:** Add the filename of your service account key (e.g., `your-service-account-key.json`) to your `.gitignore` file to prevent it from being committed.

3.  **Point to the Key in your Environment (`.env.local`):**
    -   Create or open the `.env.local` file in your project root (`/home/rosie/projects/fae-intelligence/.env.local`).
    -   Add the following line, replacing `your-service-account-key.json` with the **exact filename** of your downloaded key:
        ```
        GOOGLE_APPLICATION_CREDENTIALS=./your-service-account-key.json
        ```
    -   The `dotenv` package, which is used by the ingestion script, will load this environment variable.

### Step 3: Install Dependencies

The script requires two packages: `firebase-admin` to talk to Firestore and `gray-matter` to parse Markdown files, and `dotenv` to load environment variables. These will be added to your `package.json`. You will need to run `npm install` after these are added.

### Step 4: Ensure Pure Markdown Content

It is **critical** that your Markdown files contain **only Markdown syntax** and no embedded HTML tags (e.g., `<div>`, `<p>`, `<i>`, `<strong>`, `<ol>`, `<li>`). The `ReactMarkdown` component on the front-end expects pure Markdown to convert into HTML. If it receives pre-formatted HTML, it will display it as raw HTML.

*   **Example of incorrect Markdown (contains HTML):**
    ```markdown
    ### <i class="ri-chat-1-line"></i> ChatGPT Data Analysis
    ```
*   **Example of correct Markdown (pure Markdown):**
    ```markdown
    ### ChatGPT Data Analysis
    ```
    Or, if you want to indicate an icon for later processing:
    ```markdown
    ### ChatGPT Data Analysis (icon: ri-chat-1-line)
    ```
    (The `blog-prompt-template.txt` file provides a recommended format for this.)

### Step 5: Run the Ingestion Script

Whenever you want to sync your local posts to Firestore, run the following command in your terminal:

```bash
node scripts/ingest-blog-posts.js
```

This will upload all new and updated content, making it live in your Firestore database.
